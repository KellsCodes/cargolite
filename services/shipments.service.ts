import { paginate } from "@/app/api/utils/pagination.utils";
import prisma from "@/lib/prisma";
import { randomInt } from "crypto";

export const processNewShipment = async (data: any, adminID: number) => {
  return await prisma.$transaction(async (tx) => {
    // Upsert Sender & Receiver (Same as before)
    const sender = await tx.client.upsert({
      where: { email: data.senderEmail },
      update: { telephone: data.senderPhone }, // Update phone if it changed
      create: {
        name: data.senderName,
        email: data.senderEmail,
        telephone: data.senderPhone,
        clientType: "SENDER",
      },
    });

    const receiver = await tx.client.upsert({
      where: { email: data.receiverEmail },
      update: { telephone: data.receiverPhone },
      create: {
        name: data.receiverName,
        email: data.receiverEmail,
        telephone: data.receiverPhone,
        clientType: "RECEIVER",
      },
    });

    // Determine who is paying
    // If 'payer' is 'RECEIVER', we link the invoice to the receiver's ID
    const payerId = data.payerRole === "RECEIVER" ? receiver.id : sender.id;

    // Generate IDs (INV... and AWP...)
    const year = new Date().getFullYear();
    const count = await tx.invoice.count();
    const transactionID = `INV-${year}-${(count + 1)
      .toString()
      .padStart(3, "0")}`;
    const shipmentID = `AWP${randomInt(1000000000, 9999999999)}`;

    // Create Invoice linked to the ACTUAL Payer
    const invoice = await tx.invoice.create({
      data: {
        transactionID,
        amount: data.amount,
        paymentMethod: data.paymentMethod,
        payerRole: data.payerRole, // e.g., "RECEIVER"
        clientId: payerId, // Points to either sender.id or receiver.id
      },
    });

    // Create Shipment
    return await tx.shipment.create({
      data: {
        shipmentID,
        weight: data.weight,
        packageType: data.packageType,
        courierType: data.courierType,
        dropLocation: data.dropLocation,
        pickupLocation: data.pickupLocation,
        arrival: new Date(data.arrival),
        senderId: sender.id,
        receiverId: receiver.id,
        invoiceId: invoice.id,
        packageImage: data.packageImage || null,
        trackingHistory: {
          create: {
            status: "PICKED_UP",
            location: data.pickupLocation,
            notes: "Shipment record created and picked up.",
            updatedById: adminID,
          },
        },
      },
      include: { invoice: true, sender: true, receiver: true },
    });
  });
};

export const updateShipmentRecord = async (id: number, data: any) => {
  return await prisma.shipment.update({
    where: { id },
    data: {
      // Partial Update of Shipment fields
      weight: data.weight,
      packageType: data.packageType,
      courierType: data.courierType,
      dropLocation: data.dropLocation,
      pickupLocation: data.pickupLocation,
      arrival: data.arrival ? new Date(data.arrival) : undefined,
      packageImage: data.packageImage,

      // Nested Update for the Invoice (if amount or method changed)
      invoice: {
        update: {
          amount: data.amount,
          paymentMethod: data.paymentMethod,
        },
      },

      // Nested Update for Client details (if needed)
      sender: {
        update: {
          name: data.senderName,
          telephone: data.senderPhone,
        },
      },
    },
    include: {
      invoice: true,
      sender: true,
      receiver: true,
    },
  });
};

export const getShipmentByID = async (id: number) => {
  return await prisma.shipment.findUnique({
    where: { id },
  });
};

export const getAllShipments = async (
  page: number,
  limit: number,
  search?: string
) => {
  // Build the search filter
  const where = search
    ? {
        OR: [
          { shipmentID: { contains: search } }, // Search the shipmentID AWP
          { sender: { name: { contains: search } } }, // Search Sender Name
          { receiver: { name: { contains: search } } }, // Search Reciever Name
        ],
      }
    : {};
  const result = await paginate<any>(prisma.shipment, {
    page,
    limit,
    where, // Search filter is passed here
    include: {
      sender: { select: { name: true } },
      receiver: { select: { name: true } },
      invoice: { select: { amount: true, payerRole: true } },
      trackingHistory: {
        orderBy: { createdAt: "desc" },
        take: 1, // Get only the latest tracking status
        select: {
          status: true,
          id: true,
        },
      },
    },
  });

  // Map the generic result to include custom clientName
  const formattedData = result.data.map((shipment) => ({
    ...shipment,
    clientName:
      shipment.invoice.payerRole === "RECEIVER"
        ? shipment.receiver.name
        : shipment.sender.name,
    amount: shipment.invoice.amount,
  }));

  return {
    ...result,
    data: formattedData,
  };
};
