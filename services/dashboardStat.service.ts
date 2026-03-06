import { ShipmentStatus } from "@/generated/prisma/enums";
import prisma from "@/lib/prisma";
import { endOfMonth, startOfMonth, subMonths } from "date-fns";

export const getDashboardStats = async () => {
  const now = new Date();

  // Date Ranges
  const currentStart = startOfMonth(now);
  const currentEnd = endOfMonth(now);
  const prevStart = startOfMonth(subMonths(now, 1));
  const prevEnd = endOfMonth(subMonths(now, 1));

  // Fetch metrics for both months
  const [currentMonth, previousMonth] = await Promise.all([
    getMonthlyMetrics(currentStart, currentEnd),
    getMonthlyMetrics(prevStart, prevEnd),
  ]);

  // Percentage Calculation Helper
  const calcChange = (current: number, previous: number) => {
    if (previous === 0) return current > 0 ? 100 : 0; // Handle division by zero
    return Math.round(((current - previous) / previous) * 100);
  };

  // Helper to format the final data for each category
  const formatStat = (currentValue: number, previousValue: number) => ({
    currentMonth: currentValue,
    previousMonth: previousValue,
    percentage: calcChange(currentValue, previousValue),
  });

  return {
    totalDelivery: formatStat(currentMonth.delivered, previousMonth.delivered),
    totalInTransit: formatStat(currentMonth.inTransit, previousMonth.inTransit),
    totalCancelled: formatStat(currentMonth.cancelled, previousMonth.cancelled),
    totalReturned: formatStat(currentMonth.returned, previousMonth.returned),
  };
};

// Monthly Metrics Fetching
async function getMonthlyMetrics(startDate: Date, endDate: Date) {
  const shipments = await prisma.shipment.findMany({
    where: {
      createdAt: {
        gte: startDate,
        lte: endDate,
      },
    },
    include: {
      trackingHistory: {
        orderBy: {
          createdAt: "desc",
        },
        take: 1, // Only retrieve the most recent status update
      },
    },
  });

  const stats = { delivered: 0, inTransit: 0, cancelled: 0, returned: 0 };

  shipments.forEach((s) => {
    const latestStatus = s.trackingHistory[0]?.status; //

    // Define the in-transit group explicitly as the Enum type
    const inTransitGroup: ShipmentStatus[] = [
      ShipmentStatus.PICKED_UP,
      ShipmentStatus.IN_TRANSIT,
      ShipmentStatus.WAREHOUSE_ARRIVED,
      ShipmentStatus.OUT_FOR_DELIVERY,
    ];

    if (latestStatus === ShipmentStatus.DELIVERED) {
      stats.delivered++;
    } else if (latestStatus && inTransitGroup.includes(latestStatus)) {
      stats.inTransit++;
    } else if (latestStatus === ShipmentStatus.CANCELLED) {
      stats.cancelled++;
    } else if (latestStatus === ShipmentStatus.RETURNED) {
      stats.returned++;
    }
  });

  return stats;
}

// Shipment Monthly Analytics
export const getShipmentMonthlyAnalytics = async (params: {
  startMonth?: Date;
  endMonth?: Date;
  status?: ShipmentStatus;
}) => {
  const now = new Date();

  // Default range: Last 3 months + Current month
  const defaultStart = new Date(now.getFullYear(), now.getMonth() - 3, 1);
  const defaultEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0); // End of current month

  const startDate = params.startMonth || defaultStart;
  const endDate = params.endMonth || defaultEnd;

  if (startDate > endDate) {
    throw new Error("INVALID_DATE_RANGE");
  }

  const results = await prisma.$queryRawUnsafe<any[]>(
    `
    WITH RECURSIVE months_series AS (
      SELECT LAST_DAY(?) + INTERVAL 1 DAY - INTERVAL 1 MONTH as month_date
      UNION ALL
      SELECT month_date + INTERVAL 1 MONTH
      FROM months_series
      WHERE month_date < LAST_DAY(?) - INTERVAL 1 MONTH
    )
    SELECT 
      YEAR(m.month_date) as year, 
      MONTH(m.month_date) as month, 
      DATE_FORMAT(m.month_date, '%M %Y') as label, 
      COALESCE(COUNT(s.id), 0) as count
    FROM months_series m
    LEFT JOIN Shipment s ON 
      YEAR(s.createdAt) = YEAR(m.month_date) AND 
      MONTH(s.createdAt) = MONTH(m.month_date)
      ${
        params.status
          ? `AND s.id IN (
        SELECT th.shipmentId FROM TrackingHistory th 
        WHERE th.status = '${params.status}' 
        AND th.id = (SELECT MAX(id) FROM TrackingHistory WHERE shipmentId = th.shipmentId)
      )`
          : ""
      }
    GROUP BY year, month, label
    ORDER BY year DESC, month DESC
  `,
    startDate,
    endDate
  );

  // Convert BigInt to Number for JSON serialization
  return results.map((row) => ({
    ...row,
    count: Number(row.count),
  }));
};
