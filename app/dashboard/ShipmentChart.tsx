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

// --- DUMMY DATA ---
const dummyData = [
    { date: "2025-12-01", revenue: 18600 },
    { date: "2026-01-01", revenue: 30500 },
]

// --- CHART CONFIG ---
const chartConfig = {
    revenue: {
        label: "Revenue",
        color: "#2563eb", // Your primary blue
    },
} satisfies ChartConfig

export default function ShipmentChart({ data = dummyData }) {
    const processedData = useMemo(() => {
        // 1. Find the reference point (last available data point or today)
        const referenceDate = data.length > 0
            ? startOfMonth(parseISO(data[data.length - 1].date))
            : startOfMonth(new Date())

        // 2. Generate exactly 12 months looking backwards from the reference
        const rawList = Array.from({ length: 12 }).map((_, i) => {
            const currentDate = addMonths(referenceDate, -i)
            const dateStr = format(currentDate, "yyyy-MM-01")

            const existingEntry = data.find((d) => d.date === dateStr)

            return existingEntry
                ? { ...existingEntry, isPlaceholder: false }
                : {
                    date: dateStr,
                    // Random height for gray bars to maintain visual rhythm
                    revenue: 6000 + Math.random() * 4000,
                    isPlaceholder: true,
                }
        })

        // 3. SORT: Placeholders on the left (index 0+), Actual data on right (index 11)
        // This logic ensures chronological order within their respective groups
        return rawList.sort((a, b) => {
            if (a.isPlaceholder !== b.isPlaceholder) {
                // Placeholders (true/1) come before actual data (false/0)
                return b.isPlaceholder ? 1 : -1
            }
            // Within groups, sort by date ascending
            return parseISO(a.date).getTime() - parseISO(b.date).getTime()
        })
    }, [data])

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
                        content={({ active, payload }) => {
                            if (active && payload && payload.length > 0) {
                                const dataPoint = payload[0].payload;
                                if (dataPoint.isPlaceholder) return null;

                                return (
                                    <ChartTooltipContent
                                        hideLabel
                                        active={active}
                                        payload={payload}
                                    />
                                );
                            }
                            return null;
                        }}
                    />

                    <Bar dataKey="revenue" radius={0} barSize={40} isAnimationActive={true}>
                        {processedData.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={entry.isPlaceholder ? "#E2E8F0" : "var(--color-revenue)"}
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
