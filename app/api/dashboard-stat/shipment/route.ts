import { ShipmentStatus } from "@/generated/prisma/enums";
import { authError, getUserSession } from "@/lib/authUtils";
import { getShipmentMonthlyAnalytics } from "@/services/dashboardStat.service";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const admin = await getUserSession();
  if (!admin) return authError();

  try {
    const { searchParams } = new URL(request.url);
    const start = searchParams.get("start")
      ? new Date(searchParams.get("start")!)
      : undefined;
    const end = searchParams.get("end")
      ? new Date(searchParams.get("end")!)
      : undefined;
    const status = (searchParams.get("status") as ShipmentStatus) || undefined;

    const data = await getShipmentMonthlyAnalytics({
      startMonth: start,
      endMonth: end,
      status,
    });
    // return NextResponse.json(JSON.parse(JSON.stringify(data, (key, value) => (typeof value === "bigint" ? value.toString() : value))));
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
        error: error.message,
      },
      { status: 500 }
    );
  }
}
