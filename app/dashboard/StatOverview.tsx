"use client"
import { statCardData } from "./statCardData";
import StatCard from "./StatCards";
import { useEffect, useState } from "react";
import api from "@/lib/axios";

interface OverviewStructure {
  currentMonth: number;
  previousMonth: number;
  percentage: number;
}
interface StatOverviewData {
  totalDelivery: OverviewStructure;
  totalInTransit: OverviewStructure;
  totalCancelled: OverviewStructure;
  totalReturned: OverviewStructure;
}
const initialOverview: StatOverviewData = {
  totalDelivery: { currentMonth: 0, previousMonth: 0, percentage: 0 },
  totalInTransit: { currentMonth: 0, previousMonth: 0, percentage: 0 },
  totalCancelled: { currentMonth: 0, previousMonth: 0, percentage: 0 },
  totalReturned: { currentMonth: 0, previousMonth: 0, percentage: 0 },
};

export default function StatOverview() {
  const [overviewStat, setOverviewStat] = useState<StatOverviewData>(initialOverview);
  useEffect(() => {
    // Fetch notifications for the user
    const fetchOverviewStat = async () => {
      const response = await api.get(`/dashboard-stat`);
      setOverviewStat(response.data);
    };

    fetchOverviewStat();
  }, [])
  return (
    <div className="grid grid-cols-2 2xl:grid-cols-4 gap-x-5 gap-y-5 2xl:gap-y-0 mt-5">
      {statCardData.map((item, i) => {
        const cardStat = overviewStat[item.id as keyof typeof overviewStat]
        return (
          <StatCard key={i} item={item} data={cardStat} />
        )
      })}
    </div>
  )
}
