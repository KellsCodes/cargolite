'use client'
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { addMonths, format } from "date-fns"
import { ArrowDown, ArrowRight, CalendarIcon, ChevronUp } from "lucide-react"
import React from "react"



export default function RevenueDisplay() {
    const [from, setFrom] = React.useState(addMonths(new Date(), -1))
    const [to, setTo] = React.useState((new Date()))

    // 2. Separate states for the "Display" month of each calendar
    const [fromDisplay, setFromDisplay] = React.useState(from)
    const [toDisplay, setToDisplay] = React.useState(to)
    return (
        <div className="flex flex-col h-full relative">
            <div className="flex items-center justify-between">
                <h2 className="font-medium">Shipment revenue</h2>
                <Popover>
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
                            <span className="text-xs font-semiboldm text-muted-foreground px-3">TO</span>
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
            <div className="mt-3 space-y-2">
                <p className="text-sm text-gray-500 mt-1">Total revenue</p>
                <p className="text-md font-bold flex items-center gap-x-2">
                    $45,600
                    <span className={`flex items-center justify-center border  border-green-500/30 bg-green-500/3 text-green-700 w-15 rounded-full text-xs`}>
                        <ArrowDown className={`w-4 rotate-180`} />12%
                    </span>
                </p>
            </div>

            <div className="mt-10 space-y-6">
                <div className="flex items-center gap-x-3">
                    <p className="text-xs w-8">Jan</p>
                    <div className="w-full h-6 bg-gray-100 rounded-full relative">
                        <div className="bg-blue-500 h-full w-[80%] rounded-full" />
                        <div className="absolute text-xs flex items-center justify-between top-0 left-0 bottom-0 right-0 p-2">
                            <span className="text-white">$8,200</span>
                            <span>80%</span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-x-3">
                    <p className="text-xs w-8">Dec</p>
                    <div className="w-full h-6 bg-gray-100 rounded-full relative">
                        <div className="bg-gray-300 h-full w-[40%] rounded-full" />
                        <div className="absolute text-xs flex items-center justify-evenly top-0 left-0 bottom-0 right-0 p-2">
                            <span>$2,400</span>
                            <span>40%</span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-x-3">
                    <p className="text-xs w-8">Nov</p>
                    <div className="w-full h-6 bg-gray-100 rounded-full relative">
                        <div className="bg-gray-300 h-full w-[65%] rounded-full" />
                        <div className="absolute text-xs flex items-center justify-evenly top-0 left-0 bottom-0 right-0 p-2">
                            <span>$6,800</span>
                            <span>65%</span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-x-3">
                    <p className="text-xs w-8">Oct</p>
                    <div className="w-full h-6 bg-gray-100 rounded-full relative">
                        <div className="bg-gray-300 h-full w-[78%] rounded-full" />
                        <div className="absolute text-xs flex items-center justify-evenly top-0 left-0 bottom-0 right-0 p-2">
                            <span>$10,000</span>
                            <span>78%</span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-x-3">
                    <p className="text-xs w-8">Sept</p>
                    <div className="w-full h-6 bg-gray-100 rounded-full relative">
                        <div className="bg-gray-300 h-full w-[28%] rounded-full" />
                        <div className="absolute text-xs flex items-center justify-between top-0 left-0 bottom-0 right-0 p-2">
                            <span>$1,100</span>
                            <span>28%</span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-x-3">
                    <p className="text-xs w-8">Aug</p>
                    <div className="w-full h-6 bg-gray-100 rounded-full relative">
                        <div className="bg-gray-300 h-full w-[0%] rounded-full" />
                        <div className="absolute text-xs flex items-center justify-between top-0 left-0 bottom-0 right-0 p-2">
                            <span>$0</span>
                            <span>0%</span>
                        </div>
                    </div>
                </div>

            </div>

            <div className="absolute bottom-2 left-0 right-0 px-0">
                <button className="h-10 w-full bg-white border rounded-sm text-sm font-medium cursor-pointer">
                    View details
                    <ArrowRight className="w-4 inline-block ml-2" />
                </button>
            </div>
        </div>
    )
}