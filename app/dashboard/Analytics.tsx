"use client"
import { ChartNoAxesColumnIncreasing, ChevronUp, Ellipsis } from "lucide-react";
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { format, addMonths, startOfMonth } from "date-fns"
import { CalendarIcon } from "lucide-react"
import React, { useEffect } from "react";
import ShipmentChart from "./ShipmentChart";
import api from "@/lib/axios";
import { toast } from "react-toastify";
import { ShipmentStatus } from "@/generated/prisma/enums";

export interface ShipmentData {
    date: string;
    count: number;
    month: number;
    year: number;
}

const defaultShipmentData: ShipmentData[] = [
    {
        date: format(startOfMonth(new Date()), "yyyy-MM-dd"),
        count: 0,
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear()
    },
];

export default function ShipmentAnalytics() {
    // Separate states for the actual values
    const [from, setFrom] = React.useState(addMonths(new Date(), -5)) // previous 6 months
    const [to, setTo] = React.useState((new Date())) // current month
    const [status, setStatus] = React.useState("all")
    const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);

    const [shipmentAnalytics, setShipmentAnalytics] = React.useState<(ShipmentData[])>(defaultShipmentData)

    const fetchShipmentAnalyticsData = async () => {
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
        if (status && status !== "all") params.status = status;

        const response = await api.get(`/dashboard-stat/shipment`, { params });
        if (response.status === 200) {
            setShipmentAnalytics(() => response.data.map((item: ShipmentData) => ({
                date: `${item.year}-${String(item.month).padStart(2, "0")}-01`,
                count: item.count
            })));
        } else {
            toast.error("Failed to fetch shipment analytics data");
        }
    };
    useEffect(() => {
        fetchShipmentAnalyticsData();
    }, [status])
    return (
        <div className="p-6">
            <div className="flex items-center justify-between mb-6">
                <h1 className="font-medium flex items-center gap-x-2">
                    <span className="border-main-primary/30 bg-main-primary/3 p-1 h-8 w-9 rounded flex items-center justify-center">
                        <ChartNoAxesColumnIncreasing className="w-4 stroke-3 text-blue-600" />
                    </span>
                    <span className="text-sm md:text-medium end">
                        Shipment Analytics
                    </span>
                </h1>

                <div className="flex items-center gap-2">
                    <div className="grid gap-2">
                        <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                            <PopoverTrigger asChild>
                                <Button variant="outline" className="justify-start text-left">
                                    <CalendarIcon className="xl:mr-2 h-4 w-4" />
                                    <span className="hidden xl:inline-block">
                                        {format(from, "MMM yyyy")} - {format(to, "MMM yyyy")}
                                    </span>
                                    <ChevronUp className="rotate-180 w-4" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-2" align="start">
                                <style>{`.rdp-month_grid { display: none !important; }`}</style>

                                {/* FROM CALENDAR */}
                                <div className="flex flex-col gap-2">
                                    <span className="text-xs font-semibold text-muted-foreground px-3">FROM</span>
                                    <Calendar
                                        mode="single"
                                        month={from}
                                        onMonthChange={(newMonth) => {
                                            // setFromDisplay(newMonth)
                                            setFrom(newMonth)
                                        }}
                                        captionLayout="dropdown"
                                        fromYear={2020}
                                        toMonth={new Date()}
                                        disabled={(date) => date > new Date()}
                                    />
                                </div>
                                <div className="h-[1px] w-full bg-main-primary/10 my-2 " />

                                <div className="w-[1px] bg-border" /> {/* Separator Line */}

                                {/* TO CALENDAR */}
                                <div className="flex flex-col gap-2">
                                    <span className="text-xs font-semibold text-muted-foreground px-3">TO</span>
                                    <Calendar
                                        mode="single"
                                        month={to}
                                        onMonthChange={(newMonth) => {
                                            // setToDisplay(newMonth)
                                            setTo(newMonth)
                                        }}
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
                                            fetchShipmentAnalyticsData();
                                            setIsPopoverOpen(false);
                                        }}
                                    >
                                        Apply Filters
                                    </Button>
                                </div>
                            </PopoverContent>
                        </Popover>

                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0" >
                                <Ellipsis className="w-4 h-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent onCloseAutoFocus={(e) => e.preventDefault()}>
                            <DropdownMenuGroup>
                                <DropdownMenuItem
                                    onClick={() => setStatus("all")}
                                    className={status === "all" ? "bg-accent font-medium" : ""}
                                >
                                    All Shipments
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    onClick={() => setStatus(ShipmentStatus.DELIVERED)}
                                    className={status === ShipmentStatus.DELIVERED ? "bg-accent font-medium" : ""}
                                >
                                    Total delivery
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    onClick={() => setStatus(ShipmentStatus.IN_TRANSIT)}
                                    className={status === ShipmentStatus.IN_TRANSIT ? "bg-accent font-medium" : ""}
                                >
                                    In Transit
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                            <DropdownMenuGroup>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                    onClick={() => setStatus(ShipmentStatus.CANCELLED)}
                                    className={status === ShipmentStatus.CANCELLED ? "bg-accent font-medium" : ""}
                                >
                                    Cancelled
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    onClick={() => setStatus(ShipmentStatus.RETURNED)}
                                    className={status === ShipmentStatus.RETURNED ? "bg-accent font-medium" : ""}
                                >
                                    Returned
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>


                </div>
            </div>

            <ShipmentChart data={shipmentAnalytics} />
        </div>
    )
}