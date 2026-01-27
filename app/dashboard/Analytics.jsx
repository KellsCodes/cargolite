"use client"
import { ChartNoAxesColumnIncreasing, ChevronUp } from "lucide-react";
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { format, addMonths } from "date-fns"
import { CalendarIcon } from "lucide-react"
import React from "react";
import ShipmentChart from "./ShipmentChart";

export default function ShipmentAnalytics() {
    // 1. Separate states for the actual values
    const [from, setFrom] = React.useState(addMonths(new Date(), -1))
    const [to, setTo] = React.useState((new Date()))

    // 2. Separate states for the "Display" month of each calendar
    const [fromDisplay, setFromDisplay] = React.useState(from)
    const [toDisplay, setToDisplay] = React.useState(to)

    return (
        <div className="p-6">
            <div className="flex items-center justify-between mb-6">
                <h1 className="font-semibold flex items-center gap-x-2">
                    <span className="border-main-primary/30 bg-main-primary/3 text-main-primary p-1 h-8 w-9 rounded flex items-center justify-center">
                        <ChartNoAxesColumnIncreasing className="w-4 stroke-3" />
                    </span>
                    <span>
                        Shipment Analytics
                    </span>
                </h1>

                <div>
                    <div className="grid gap-2">
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button variant="outline" className="justify-start text-left">
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {format(from, "MMM yyyy")} - {format(to, "MMM yyyy")}
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
                                        month={fromDisplay}
                                        onMonthChange={(newMonth) => {
                                            setFromDisplay(newMonth)
                                            setFrom(newMonth)
                                        }}
                                        captionLayout="dropdown"
                                        fromYear={2024}
                                        toYear={new Date().getFullYear()}
                                    />
                                </div>
                                <div className="h-[1px] w-full bg-main-primary/10 my-2 " />

                                <div className="w-[1px] bg-border" /> {/* Separator Line */}

                                {/* TO CALENDAR */}
                                <div className="flex flex-col gap-2">
                                    <span className="text-xs font-semibold text-muted-foreground px-3">TO</span>
                                    <Calendar
                                        mode="single"
                                        month={toDisplay}
                                        onMonthChange={(newMonth) => {
                                            setToDisplay(newMonth)
                                            setTo(newMonth)
                                        }}
                                        captionLayout="dropdown"
                                        fromYear={2024}
                                        toYear={new Date().getFullYear()}
                                    />
                                </div>
                            </PopoverContent>
                        </Popover>
                    </div>
                </div>
            </div>
            <ShipmentChart />
        </div>
    )
}