import { paginate } from "@/app/api/utils/pagination.utils";
import { ClientType } from "@/generated/prisma/enums";
import prisma from "@/lib/prisma";
import { isBefore, subMonths } from "date-fns";

export const getClientsByRole = async (
  role: ClientType,
  page: number,
  limit: number,
  search?: string,
  status?: number
) => {
  // identify which relation to count based on the clientType
  const relationKey =
    role === ClientType.SENDER ? "sentShipments" : "receivedShipments";
  const sixMonthsAgo = subMonths(new Date(), 6);

  const where: any = {
    AND: [
      { clientType: role },
      status ? { status } : {},
      search
        ? {
            name: { contains: search },
            email: { contains: search },
            telephone: { contains: search },
          }
        : {},
    ],
  };

  const result = await paginate(prisma.client, {
    page,
    limit,
    where,
    include: {
      [relationKey]: {
        orderBy: { createdAt: "desc" },
        // take: 1, // Only get the latest shipment for activity/location
        include: {
          trackingHistory: { orderBy: { createdAt: "desc" } },
        },
      },
      _count: {
        select: {
          [relationKey]: true,
        },
      },
    },
  });

  // Map data for the Frontend Table
  const formattedData = await Promise.all(
    result.data.map(async (client: any) => {
      const shipments = client[relationKey];
      const lastShipment = shipments?.[0];
      let shouldBeInactive = false;

      if (role === "SENDER") {
        // Check the last shipment date
        if (
          !lastShipment ||
          isBefore(new Date(lastShipment.createdAt), sixMonthsAgo)
        ) {
          shouldBeInactive = true;
        }
      } else {
        // Find latest "DELIVERED" status in history for receiver client
        const deliveredStatus = await prisma.trackingHistory.findFirst({
          where: {
            shipmentId: client.id,
            status: "DELIVERED",
          },
          orderBy: {
            createdAt: "desc",
          },
        });

        if (
          !deliveredStatus ||
          isBefore(new Date(deliveredStatus.createdAt), sixMonthsAgo)
        ) {
          shouldBeInactive = true;
        }
      }

      // Update client status if inactive
      if (shouldBeInactive && client.status === 1) {
        await prisma.client.update({
          where: { id: client.id },
          data: { status: 2 },
        });
        client.status = 2; // Update local object to reflect change
      } else if (!shouldBeInactive && client.status === 2) {
        await prisma.client.update({
          where: { id: client.id },
          data: { status: 1 },
        });
        client.status = 1; // Update local object to reflect change
      }

      return {
        id: client.id,
        name: client.name,
        email: client.email,
        telephone: client.telephone,
        status: client.status,
        shipmentCount: client._count[relationKey],
        latestShipment:
          role === "SENDER"
            ? client[relationKey]?.[0]?.createdAt
            : client[relationKey]?.[0]?.trackingHistory?.[0]?.status ===
              "DELIVERED"
            ? client[relationKey]?.[0]?.trackingHistory?.[0]?.createdAt
            : null,
        lastLocation:
          role === ClientType.RECEIVER
            ? client[relationKey]?.[0]?.pickupLocation
            : client[relationKey]?.[0]?.dropLocation,
      };
    })
  );
  return { ...result, data: formattedData };
};

export const clientSuspensionAndActivation = async (
  clientId: number,
  status: number
) => {
  const client = await prisma.client.findUnique({
    where: { id: clientId },
  });

  if (!client) {
    throw new Error("CLIENT_NOT_FOUND");
  }

  await prisma.client.update({
    where: { id: clientId },
    data: { status },
  });

  return {
    message:
      status === 3
        ? "Client suspended successfully."
        : "Client activated successfully.",
  };
};
