import { authError, getUserSession } from "@/lib/authUtils";
import { getRevenueMonthlyAnalytics } from "@/services/dashboardStat.service";
import { NextResponse } from "next/server";


export async function GET(req: Request){
    const admin = await getUserSession();
    if (!admin) return authError();

    try {
        const { searchParams } = new URL(req.url);
        const startMonth = searchParams.get("start")
            ? new Date(searchParams.get("start")!)
            : undefined;
        const endMonth  = searchParams.get("end")
            ? new Date(searchParams.get("end")!)
            : undefined;

        const data = await getRevenueMonthlyAnalytics({
            start: startMonth,
            end: endMonth,
        });
        return NextResponse.json(data);
    } catch (error: any) {
        console.log(error);
        if (error.message === "INVALID_DATE_RANGE")
            return NextResponse.json(
                {
                    error: "Invalid date range selection.",
                },
                { status: 400 }
            );
        return NextResponse.json(
            {
                error: "An internal server error occurred.",
            },
            { status: 500 }
        );
    }
}
