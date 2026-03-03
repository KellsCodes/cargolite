import { authError, getUserSession } from "@/lib/authUtils";
import {
  getTransactionById,
  updateInvoiceStatus,
} from "@/services/transaction.service";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = await getUserSession();
  if (!admin) return authError();
  try {
    const id = Number((await params).id);
    const { invoiceStatus } = await req.json();
    const res = await updateInvoiceStatus(id, invoiceStatus);
    return NextResponse.json({
      message: `Transaction ${id} updated successfully`,
      data: { ...res },
    });
  } catch (error: any) {
    console.error("Transaction Route Error:", error);
    if (error.message === "INVALID_INVOICE") {
      return NextResponse.json(
        {
          error: "Invalid invoice",
        },
        { status: 500 }
      );
    }

    if (error.message === "INVALID_INVOICE_STATUS") {
      return NextResponse.json(
        {
          error: "Invalid invoice status",
        },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { error: "Failed to update transaction" },
      { status: 500 }
    );
  }
}

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = await getUserSession();
  if (!admin) return authError();
  const id = Number((await params).id);
  try {
    const transaction = await getTransactionById(id);
    if (!transaction) {
      return NextResponse.json(
        { error: "Transaction not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ data: transaction }, { status: 200 });
  } catch (error) {
    console.error("Transaction Route Error:", error);
    return NextResponse.json(
      { error: "Failed to retrieve transaction" },
      { status: 500 }
    );
  }
}
