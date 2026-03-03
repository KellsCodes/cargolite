import { authError, getUserSession } from "@/lib/authUtils";
import { getAllTransactions } from "@/services/transaction.service";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const admin = await getUserSession();
  if (!admin) return authError();

  try {
    const { searchParams } = new URL(request.url);
    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 10;
    const search = searchParams.get("search") || "";
    const invoiceStatus = searchParams.get("invoiceStatus") || "";

    const transactions = await getAllTransactions(
      page,
      limit,
      search,
      invoiceStatus
    );

    return NextResponse.json(transactions);
  } catch (error) {
    console.error("Transaction Route Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch transactions" },
      { status: 500 }
    );
  }
}
