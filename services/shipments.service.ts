import prisma from "@/lib/prisma";
import { randomInt } from "crypto";

export const processNewShipment = async (data: any) => {
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
      },
      include: { invoice: true, sender: true, receiver: true },
    });
  });
};
