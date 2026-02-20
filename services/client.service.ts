import { paginate } from "@/app/api/utils/pagination.utils";
import { ClientType } from "@/generated/prisma/enums";
import prisma from "@/lib/prisma";

export const getClients = async (
  role: ClientType,
  page: number,
  limit: number,
  search?: string,
  status?: number
) => {
  // identify which relation to count based on the clientType
  const relationKey =
    role === ClientType.SENDER ? "sentShipments" : "receivedShipments";

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
        take: 1, // Only get the latest shipment for activity/location
      },
      _count: {
        select: {
          [relationKey]: true,
        },
      },
    },
  });

  // Map data for the Frontend Table
  const formattedData = result.data.map((client: any) => ({
    id: client.id,
    name: client.name,
    email: client.email,
    telephone: client.telephone,
    status: client.status,
    latestShipment: client[relationKey]?.[0],
    shipmentCount: client._count[relationKey],
    lastLocation: role === ClientType.RECEIVER ? client[relationKey]?.[0]?.dropLocation : client[relationKey]?.[0]?.pickupLocation,
  }));

  return { ...result, data: formattedData };
};
