import { ArrowDown, OctagonAlert, PackageCheck } from "lucide-react";
import React from "react";

interface StatItem {
    name: string,
    icon: React.ReactNode
}

interface StatData {
    total: number,
    currentPerformance: number
}

interface StatCardProps {
    item: StatItem,
    data: StatData
}

export default function StatCard({ item, data }: StatCardProps) {
    return (
        <div className="bg-white rounded-md p-6 space-y-2 relative">
            <div className="w-[30px] h-[30px] rounded-full absolute right-6 top-6 flex items-center justify-center border border-black/20">
                {item.icon}
            </div>
            <div className="flex items-center gap-x-1">
                <span className="text-sm">{item.name}</span>
                <OctagonAlert className="w-4 opacity-40" />
            </div>
            <p className="font-medium text-sm">{data.total.toLocaleString()}</p>
            <div className="flex items-center text-xs gap-x-5">
                <p className="space-x-1">
                    <span className="font-medium">{data.currentPerformance.toLocaleString()}</span>
                    <span className="opacity-60">vs last month</span>
                </p>

                <span className={`flex items-center justify-center border ${data.currentPerformance < 0 ? "border-red-500/30 bg-red-500/3 text-red-700" : "border-green-500/30 bg-green-500/3 text-green-700"} w-15 rounded-full text-xs`}>
                    <ArrowDown className={`w-4 ${data.currentPerformance < 0 ? "rotate-0" : "rotate-180"} `} />12%
                </span>
            </div>
        </div>
    )
}