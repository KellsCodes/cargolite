import { authError, getUserSession } from "@/lib/authUtils";
import { getDashboardStats } from "@/services/dashboardStat.service";
import { NextResponse } from "next/server";

export async function GET() {
  const admin = await getUserSession();
  if (!admin) return authError();
  try {
    const res = await getDashboardStats();
    return NextResponse.json(res);
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(
      {
        error: error.message || "An internal server error occurred.",
      },
      { status: 500 }
    );
  }
}
