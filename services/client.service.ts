import { paginate } from "@/app/api/utils/pagination.utils";
import { ClientType } from "@/generated/prisma/enums";
import prisma from "@/lib/prisma";
import { isBefore, subMonths } from "date-fns";

export const getClientsByRole = async (
  role: ClientType,
  page: number,
  limit?: number,
  search?: string,
  status?: number
) => {
  const sixMonthsAgo = subMonths(new Date(), 6);

  // Establish the Pagination parameters with an absolute fallback default of 10 if missing
  const parsedLimit = Number(limit) || 10;
  const parsedPage = Number(page) || 1;

  // Build the database filter criteria (Removed PostgreSQL 'mode: insensitive' modifiers)
  const where: any = {
    AND: [
      { clientType: role },
      status ? { status: Number(status) } : {},
      search
        ? {
            OR: [
              { name: { contains: search } },
              { email: { contains: search } },
              { telephone: { contains: search } },
            ],
          }
        : {},
    ],
  };

  const relationKey =
    role === ClientType.SENDER ? "sentShipments" : "receivedShipments";

  // Fetch raw records matching parameters from MySQL
  const rawClients = await prisma.client.findMany({
    where,
    include: {
      [relationKey]: {
        include: {
          trackingHistory: { orderBy: { createdAt: "desc" } },
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  // First Pass: Group records by unique email address to isolate the true combined lifespan
  const emailAggregations = new Map<
    string,
    { oldestCreatedAt: Date; newestActivityDate: Date | null }
  >();

  for (const client of rawClients) {
    const emailKey = client.email.toLowerCase().trim();
    const lastShipment = client[relationKey] as any;
    let activityDate: Date | null = null;

    if (role === ClientType.SENDER) {
      if (lastShipment) {
        activityDate = new Date(lastShipment.createdAt);
      }
    } else {
      const deliveredStatus = await prisma.trackingHistory.findFirst({
        where: {
          shipmentId: lastShipment?.id,
          status: "DELIVERED",
        },
        orderBy: { createdAt: "desc" },
      });
      if (deliveredStatus) {
        activityDate = new Date(deliveredStatus.createdAt);
      }
    }

    if (!emailAggregations.has(emailKey)) {
      emailAggregations.set(emailKey, {
        oldestCreatedAt: new Date(client.createdAt),
        newestActivityDate: activityDate,
      });
    } else {
      const agg = emailAggregations.get(emailKey)!;

      // Isolate the earliest creation date across all duplicate records
      if (isBefore(new Date(client.createdAt), agg.oldestCreatedAt)) {
        agg.oldestCreatedAt = new Date(client.createdAt);
      }
      // Isolate the latest operational activity date across all duplicate records
      if (
        activityDate &&
        (!agg.newestActivityDate || activityDate > agg.newestActivityDate)
      ) {
        agg.newestActivityDate = activityDate;
      }
    }
  }

  // Second Pass: Process, sync database flags safely, and build table result structure
  const groupedMap = new Map<string, any>();

  for (const client of rawClients) {
    const emailKey = client.email.toLowerCase().trim();
    const lastShipment = client[relationKey] as any;

    const aggInfo = emailAggregations.get(emailKey)!;

    // CRITICAL AGE LOGIC: Account must be >= 6 months old AND last activity must be >= 6 months old (or never occurred)
    const isAccountOldEnough = isBefore(aggInfo.oldestCreatedAt, sixMonthsAgo);
    const isActivityOverdue =
      !aggInfo.newestActivityDate ||
      isBefore(aggInfo.newestActivityDate, sixMonthsAgo);

    const shouldBeInactive = isAccountOldEnough && isActivityOverdue;

    // Synchronize individual MySQL rows only if they are not Suspended (3)
    if (client.status !== 3) {
      if (shouldBeInactive && client.status === 1) {
        await prisma.client.update({
          where: { id: client.id },
          data: { status: 2 },
        });
        client.status = 2;
      } else if (!shouldBeInactive && client.status === 2) {
        await prisma.client.update({
          where: { id: client.id },
          data: { status: 1 },
        });
        client.status = 1;
      }
    }

    // Allocate grouped row state baseline
    if (!groupedMap.has(emailKey)) {
      groupedMap.set(emailKey, {
        id: client.id,
        name: client.name,
        email: client.email,
        telephone: client.telephone,
        status: client.status,
        role: client.clientType,
        shipmentCount: 0,
        lastActivity: aggInfo.newestActivityDate,
        // Fallback structural location context assignment
        lastLocation:
          role === ClientType.SENDER
            ? lastShipment?.dropLocation || null
            : null,
      });
    }

    const group = groupedMap.get(emailKey)!;

    if (lastShipment) {
      group.shipmentCount += 1;
    }

    // If this specific loop item represents the latest activity point, sync row descriptors
    if (aggInfo.newestActivityDate && lastShipment) {
      const currentShipmentDate =
        role === ClientType.SENDER ? new Date(lastShipment.createdAt) : null; // Receiver dates are resolved via secondary table checks below

      if (
        role === ClientType.SENDER &&
        currentShipmentDate &&
        currentShipmentDate.getTime() === aggInfo.newestActivityDate.getTime()
      ) {
        group.lastLocation = lastShipment.dropLocation || null;
        group.status = client.status;
        group.id = client.id;
      } else if (role === ClientType.RECEIVER) {
        // Fetch specific tracking location string matching the master activity date
        const trackingPoint = await prisma.trackingHistory.findFirst({
          where: {
            shipmentId: lastShipment.id,
            status: "DELIVERED",
            createdAt: aggInfo.newestActivityDate,
          },
          select: { location: true },
        });
        if (trackingPoint) {
          group.lastLocation = trackingPoint.location;
          group.status = client.status;
          group.id = client.id;
        }
      }
    }
  }

  // Convert the map data back into standard arrays
  const allGroupedRecords = Array.from(groupedMap.values()).map((item) => ({
    ...item,
    lastActivity: item.lastActivity ? item.lastActivity.toISOString() : null,
  }));

  // Manual Pagination Math execution calculations
  const totalItems = allGroupedRecords.length;
  const totalPages = Math.ceil(totalItems / parsedLimit) || 1;

  const startIndex = (parsedPage - 1) * parsedLimit;
  const endIndex = startIndex + parsedLimit;
  const paginatedData = allGroupedRecords.slice(startIndex, endIndex);

  return {
    data: paginatedData,
    meta: {
      totalItems,
      totalPages,
      currentPage: parsedPage,
      pageLength: paginatedData.length,
      from: totalItems === 0 ? 0 : startIndex + 1,
      to: Math.min(endIndex, totalItems),
    },
  };
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
