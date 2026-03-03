import React from "react"; // 1. Must have React import
import { authError, getUserSession } from "@/lib/authUtils";
import { downloadTransactionInvoice } from "@/services/transaction.service";
import { renderToStream } from "@react-pdf/renderer";
import { NextResponse } from "next/server";
import { InvoicePDF } from "@/app/api/utils/InvoicePDF"; // 2. Ensure this points to the .tsx file

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> } // 3. Next.js 15 async params
) {
  const admin = await getUserSession();
  if (!admin) return authError();

  try {
    const { id: rawId } = await params;
    const id = Number(rawId);

    // Fetch data (Ensure this includes 'client' and 'shipment' relations)
    const transaction = await downloadTransactionInvoice(id);

    // Create the Stream
    const stream = await renderToStream(<InvoicePDF invoice={transaction} />);

    // Return the PDF as a Blob/Stream
    return new Response(stream as any, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="Invoice-${transaction.transactionID}.pdf"`,
      },
    });
  } catch (error: any) {
    console.error("PDF Generation Error:", error);
    if (error.message === "INVOICE_NOT_FOUND") {
      return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
    }
    return NextResponse.json(
      { error: "Failed to generate invoice PDF" },
      { status: 500 }
    );
  }
}
