import prisma from "@/lib/prisma";

export const trackingHistory = async (data: any, userId: number) => {
  const shipment = await prisma.shipment.findUnique({
    where: { id: data.shipmentId },
  });
  if (!shipment) {
    throw new Error("INVALID_SHIPMENT");
  }

  // Fetch current status to prevent illegal jumps
  const latestUpdate = await prisma.trackingHistory.findFirst({
    where: { shipmentId: data.shipmentId },
    orderBy: { createdAt: "desc" },
  });

  if (latestUpdate?.status === "DELIVERED") {
    throw new Error("CANNOT_UPDATE_DELIVERED_SHIPMENT");
  }
  if (latestUpdate?.status === "CANCELLED") {
    throw new Error("CANNOT_UPDATE_CANCELLED_SHIPMENT");
  }
  return await prisma.trackingHistory.create({
    data: { ...data, updatedBy: userId },
  });
};

export const updateTrackingRecord = async (id: number, data: any) => {
  return await prisma.trackingHistory.update({
    where: { id },
    data: { location: data.location, notes: data.notes },
    // Don't allow changing the updatedBy field to keep the original scanner
  });
};
