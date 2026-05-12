'use client'
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import api from "@/lib/axios"
import { addMonths, format } from "date-fns"
import { ArrowDown, ArrowRight, CalendarIcon, ChevronUp } from "lucide-react"
import Link from "next/link"
import React, { useEffect } from "react"
import { toast } from "react-toastify"

interface RevenueData {
    monthlyBreakdown: {
        label: string, month: number, year: number, monthlyRevenue: number, percentOfTotal: number
    }[],
    periodSummary: {
        growthPercentage: number, totalRevenue: number, rangeInMonths: number, previousPeriodTotal: number
    }
}

export default function RevenueDisplay() {
    const [from, setFrom] = React.useState(addMonths(new Date(), -5)) // revenue for the past 6 months
    const [to, setTo] = React.useState((new Date()))
    const [revenueData, setRevenueData] = React.useState<RevenueData>({
        monthlyBreakdown: [],
        periodSummary: {
            growthPercentage: 0,
            totalRevenue: 0,
            rangeInMonths: 6,
            previousPeriodTotal: 0
        }
    })
    const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);

    const fetchRevenueAnalyticsData = async () => {
        if (format(from, "yyyy-MM") > format(to, "yyyy-MM")) {
            toast.error("Start date must be before end date");
            return;
        }
        if (format(from, "yyyy-MM") > format(new Date(), "yyyy-MM") ||
            format(to, "yyyy-MM") > format(new Date(), "yyyy-MM")) {
            toast.error("Date cannot be in the future");
            return;
        }
        const params: Record<string, string> = {};
        if (from) params.start = format(from, "yyyy-MM-dd");
        if (to) params.end = format(to, "yyyy-MM-dd");
        setIsLoading(true);
        try {
            const response = await api.get(`/dashboard-stat/revenue`, { params });
            setRevenueData(response.data);
        } catch (error) {
            toast.error("An error occurred while fetching shipment analytics data");
        } finally {
            setIsLoading(false);
        }

    };

    useEffect(() => {
        fetchRevenueAnalyticsData();
    }, [])

    console.log(revenueData)

    return (
        <div className="flex flex-col h-full relative">
            <div className="flex items-center justify-between">
                <h2 className="text-sm md:font-medium">Shipment revenue</h2>
                <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                    <PopoverTrigger asChild>
                        <Button variant="outline" className="justify-start text-left">
                            <CalendarIcon className="mr-1 h-4 w-4" />
                            {format(from, "MMM yyyy")} - {format(to, "MMM yyyy")}
                            <ChevronUp className="rotate-180 w-4" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-2" align="start">
                        <style>{`.rdp-month_grid { display: none !important; }`}</style>

                        {/* FROM CALENDAR */}
                        <div className="flex flex-col gap-2">
                            <span className="text-xs font-semiboldl text-muted-foreground px-3">FROM</span>
                            <Calendar
                                mode="single"
                                month={from}
                                onMonthChange={setFrom}
                                captionLayout="dropdown"
                                fromYear={2020}
                                // Restricts navigation and dropdowns to nothing past current month
                                toMonth={new Date()}
                                // Disables selection of any future days
                                disabled={(date) => date > new Date()}
                            />
                        </div>
                        <div className="h-[1px] w-full bg-main-primary/10 my-2 " />

                        <div className="w-[1px] bg-border" /> {/* Separator Line */}

                        {/* TO CALENDAR */}
                        <div className="flex flex-col gap-2">
                            <span className="text-xs font-semiboldm text-muted-foreground px-3">TO</span>
                            <Calendar
                                mode="single"
                                month={to}
                                onMonthChange={setTo}
                                captionLayout="dropdown"
                                fromYear={2020}
                                toMonth={new Date()}
                                disabled={(date) => date > new Date()}
                            />

                        </div>

                        <div className="mt-2 pt-2 border-t flex justify-end">
                            <Button
                                size="sm"
                                className="w-full mx-auto text-[13px] bg-main-primary hover:bg-main-primary/90 h-10 transition-colors duration-200 ease-in-out"
                                onClick={() => {
                                    fetchRevenueAnalyticsData();
                                    setIsPopoverOpen(false);
                                }}
                            >
                                Apply Filter
                            </Button>
                        </div>
                    </PopoverContent>
                </Popover>
            </div>
            <div className="mt-3 space-y-2">
                <p className="text-sm text-gray-500 mt-1">Total revenue</p>
                <p className="text-md font-bold flex items-center gap-x-2">
                    {revenueData?.periodSummary.totalRevenue.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                    })}
                    <span
                        className={`flex items-center justify-center border  ${revenueData?.periodSummary?.growthPercentage > 0 ? "border-green-500/30 bg-green-500/3 text-green-700" : "border-red-500/30 bg-red-500/3 text-red-700"} w-15 rounded-full text-xs`}>
                        <ArrowDown className={`w-4 ${revenueData?.periodSummary?.growthPercentage > 0 ? "rotate-180" : ""}`} />{revenueData?.periodSummary.growthPercentage}%
                    </span>
                </p>
            </div>

            <div className="mt-10 space-y-6">
                {revenueData.monthlyBreakdown.slice(0, 6).map((data, i) => {
                    return (
                        <div key={i} className="flex items-center gap-x-3">
                            <p className="text-xs w-17">{data.label}</p>
                            <div className="w-full h-6 bg-gray-100 rounded-full relative">
                                <div
                                    className={`${i === 0 ? "bg-blue-500" : "bg-gray-300"} h-full rounded-full`}
                                    style={{ width: `${data.percentOfTotal}%` }}
                                />
                                <div className="absolute text-xs flex items-center justify-between top-0 left-0 bottom-0 right-0 p-2 px-3">
                                    <span className={`${i === 0 && data.percentOfTotal > 10 ? "text-white" : "text-black/60"}`}>{data.monthlyRevenue.toLocaleString("en-US", {
                                        style: "currency",
                                        currency: "USD",
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                    })}</span>
                                    <span className={`${i === 0 && data.percentOfTotal > 95 ? "text-white" : "text-black/60"}`}>{data.percentOfTotal}%</span>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>

            <div className="mt-5 xl:mt-0 lg:absolute bottom-2 left-0 right-0 px-0">
                <Link
                    href="/transactions"
                    className="flex items-center justify-center h-10 w-full bg-white border border-slate-200 rounded-sm text-sm font-medium cursor-pointer hover:opacity-70 transition-all duration-300 ease-in-out"
                >
                    View details
                    <ArrowRight className="w-4 ml-2" />
                </Link>
            </div>
        </div>
    )
}