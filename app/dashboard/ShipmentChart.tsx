"use client"

import * as React from "react"
import { useMemo } from "react"
import { addMonths, format, parseISO, startOfMonth } from "date-fns"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Cell } from "recharts"

import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import { ShipmentData } from "./Analytics"

// --- CHART CONFIG ---
const chartConfig = {
    count: {
        label: "Total Shipments",
        color: "#2563eb", // primary blue
    },
} satisfies ChartConfig


export default function ShipmentChart({ data }: { data: ShipmentData[] }) {
    const processedData = useMemo(() => {
        // Sort incoming data chronologically (Oldest -> Newest)
        const sortedData = [...data].sort(
            (a, b) => parseISO(a.date).getTime() - parseISO(b.date).getTime()
        );
        // Get the most recent date from data, or fallback to today
        const lastPoint = sortedData.length > 0 ? parseISO(sortedData[sortedData.length - 1].date) : new Date();
        const referenceDate = startOfMonth(lastPoint);

        // Generate exactly 12 months looking backwards
        const rawList = Array.from({ length: 12 }).map((_, i) => {
            const currentDate = addMonths(referenceDate, -i);
            const dateStr = format(currentDate, "yyyy-MM-01");

            // Find the match by comparing formatted strings
            const existingEntry = sortedData.find((d) => {
                try {
                    return format(parseISO(d.date), "yyyy-MM-01") === dateStr;
                } catch {
                    return false;
                }
            });

            if (existingEntry) {
                return {
                    ...existingEntry,
                    date: dateStr, // Ensure consistent format for XAxis
                    isPlaceholder: false
                };
            }

            // Find the highest count in the actual data
            // Fallback to 6000 if all real data points are 0 or missing
            const realMaxCount = Math.max(...sortedData.map(data => data.count), 0);
            const placeholderHeight = realMaxCount > 0 ? realMaxCount : 6000;
            return {
                date: dateStr,
                count: placeholderHeight * (Math.random() * 0.8 + 0.2), // Visual filler
                isPlaceholder: true,
            };
        });

        // Sort chronological order (Oldest to Newest)
        // This prevents the "jumping" between placeholders and real data
        return rawList.sort((a, b) => parseISO(a.date).getTime() - parseISO(b.date).getTime());
    }, [data]);


    return (
        <div>
            <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
                <BarChart data={processedData} margin={{ top: 20, left: -20 }}> {/* Negative margin helps pull YAxis text closer if needed */}
                    {/* horizontal grids */}
                    <CartesianGrid
                        vertical={false}
                        strokeDasharray="3 3"
                        stroke="#E2E8F0" // Slate-200 for a clean 2026 look
                        opacity={1}
                    />

                    <XAxis
                        dataKey="date"
                        tickLine={false}
                        axisLine={false}
                        tickMargin={10}
                        tickFormatter={(value) => {
                            const date = parseISO(value)
                            return format(date, "MMM ''yy")
                        }}
                        fontSize={12}
                        className="text-muted-foreground"
                    />

                    {/* Numbers on the left vertical axis */}
                    <YAxis
                        tickLine={false}
                        axisLine={false}
                        fontSize={12}
                        className="text-muted-foreground"
                        // Formats the numbers to show as K (thousands) or standard numbers
                        tickFormatter={(value) =>
                            value >= 1000 ? `${value / 1000}k` : value
                        }
                    />

                    <ChartTooltip
                        cursor={false}
                        labelFormatter={(value) => {
                            return format(parseISO(value), "MMMM yyyy");
                        }}
                        content={({ active, payload, label }) => {
                            if (active && payload && payload.length > 0) {
                                const dataPoint = payload[0].payload;
                                if (dataPoint.isPlaceholder) return null;

                                const formattedDate = format(parseISO(label), "MMMM yyyy");

                                return (
                                    <ChartTooltipContent
                                        active={active}
                                        payload={payload}
                                        hideLabel={false}
                                        label={formattedDate}
                                        className="w-40 p-2"
                                        // Custom formatter
                                        formatter={(value, name) => (
                                            <div className="flex w-full items-center justify-between gap-2">
                                                <div className="flex items-center gap-1">
                                                    {/* This creates a small dot that stays left-aligned */}
                                                    <div className="h-2 w-2 rounded-full bg-blue-600" />
                                                    <span className="text-muted-foreground">Total Shipments</span>
                                                </div>
                                                <span className="font-bold tabular-nums">
                                                    {value}
                                                </span>
                                            </div>
                                        )}
                                    />
                                );
                            }
                            return null;
                        }}
                    />

                    <Bar dataKey="count" radius={0} barSize={40} isAnimationActive={true}>
                        {processedData.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={entry.isPlaceholder ? "#E2E8F0" : "#2563eb"}
                                // Added pointerEvents: "none" to gray bars so they don't block the grid hover
                                style={{ pointerEvents: entry.isPlaceholder ? "none" : "auto" }}
                            />
                        ))}
                    </Bar>
                </BarChart>
            </ChartContainer>
        </div>
    )
}
