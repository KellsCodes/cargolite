import { OctagonAlert, ArrowUpRight, ArrowDownRight } from "lucide-react";
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
    const isNegative = data.currentPerformance < 0;

    return (
        <div className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
            {/* Top Row: Icon & Name */}
            <div className="flex items-start justify-between mb-4">
                <div className="space-y-1">
                    <div className="flex items-center gap-x-1.5">
                        <span className="text-[13px] font-semibold text-slate-500 tracking-tight uppercase">
                            {item.name}
                        </span>
                        <OctagonAlert className="w-3.5 h-3.5 text-slate-300 hover:text-slate-400 transition-colors cursor-help" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 tracking-tight">
                        {data.total.toLocaleString()}
                    </h3>
                </div>

                {/* Styled Icon Container */}
                <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-600 group-hover:bg-blue-50 group-hover:text-blue-600 transition-all duration-300">
                    {item.icon}
                </div>
            </div>

            {/* Bottom Row: Performance Indicator */}
            <div className="flex items-center justify-between mt-2">
                <div className="flex items-center gap-x-2">
                    <span className={`flex items-center gap-x-0.5 px-2 py-0.5 rounded-full text-[11px] font-bold border ${isNegative
                            ? "bg-rose-50 border-rose-100 text-rose-600"
                            : "bg-emerald-50 border-emerald-100 text-emerald-600"
                        }`}>
                        {isNegative ? <ArrowDownRight className="w-3 h-3" /> : <ArrowUpRight className="w-3 h-3" />}
                        12%
                    </span>
                    <p className="text-[11px] text-slate-400 font-medium">
                        <span className="text-slate-600">{data.currentPerformance.toLocaleString()}</span> vs last month
                    </p>
                </div>
            </div>

            {/* Subtle Decorative Background Element */}
            <div className="absolute -right-2 -bottom-2 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity">
                {item.icon}
            </div>
        </div>
    );
}
