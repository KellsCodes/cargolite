import { paginate } from "@/app/api/utils/pagination.utils";
import { ShipmentStatus } from "@/generated/prisma/enums";
import prisma from "@/lib/prisma";
import { randomInt } from "crypto";
// import { trackingHistory } from "./tracking";

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
      receiver: {
        update: {
          name: data.receiverName,
          telephone: data.receiverPhone,
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
  search?: string,
  status?: ShipmentStatus
) => {
  // Build the search filter
  // Find the LATEST tracking history entry for EVERY shipment
  const allLatestTracking = await prisma.trackingHistory.findMany({
    distinct: ["shipmentId"],
    orderBy: {
      createdAt: "desc",
    },
    select: {
      shipmentId: true,
      status: true,
    },
  });

  // Filter those results in memory to get IDs where the LATEST status matches
  const shipmentIds = allLatestTracking
    .filter((history) => history.status === status)
    .map((history) => history.shipmentId);

  // Build the where clause using these specific IDs
  const where: any = {
    AND: [
      search
        ? {
            OR: [
              { shipmentID: { contains: search, } },
              { sender: { name: { contains: search, } } },
              { receiver: { name: { contains: search, } } },
            ],
          }
        : {},
      // Only include shipments that are CURRENTLY in this status
      status ? { id: { in: shipmentIds } } : {},
    ],
  };

  const result = await paginate<any>(prisma.shipment, {
    page,
    limit,
    where,
    include: {
      sender: { select: { name: true } },
      receiver: { select: { name: true } },
      invoice: { select: { amount: true, payerRole: true } },
      trackingHistory: {
        orderBy: { createdAt: "desc" },
        take: 1,
        select: { status: true, id: true },
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

export const trackShipment = async (shipmentID: string) => {
  return await prisma.shipment.findUnique({
    where: { shipmentID },
    include: {
      trackingHistory: { orderBy: { createdAt: "desc" } },
      sender: { select: { name: true, email: true, telephone: true } },
      receiver: { select: { name: true, email: true, telephone: true } },
      invoice: {
        select: { amount: true, payerRole: true, paymentMethod: true },
      },
    },
  });
};

export const deleteShipment = async (id: number) => {
  if (!id) throw new Error("Shipment ID is required for deletion.");
  const getShipmentStatus: any = await prisma.shipment.findUnique({
    where: { id },
    select: {
      trackingHistory: {
        orderBy: { createdAt: "desc" },
        take: 1,
        select: { status: true },
      },
    },
  });

  const currentStatus = getShipmentStatus?.trackingHistory[0]?.status;

  if (!currentStatus || currentStatus !== ShipmentStatus.PICKED_UP) {
    throw new Error("Cannot delete a processed shipment.");
  }

  return await prisma.shipment.delete({
    where: { id },
  });
};
