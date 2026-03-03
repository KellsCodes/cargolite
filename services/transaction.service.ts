import { paginate } from "@/app/api/utils/pagination.utils";
import { Invoice } from "@/generated/prisma/browser";
import { InvoiceStatus } from "@/generated/prisma/enums";
import prisma from "@/lib/prisma";

export const getAllTransactions = async (
  page: number,
  limit: number,
  search: string,
  invoiceStatus: string
) => {
  return await prisma.$transaction(async (tx) => {
    // Persist OVERDUE STATUS
    // Find all UNPAID invoices where shipment arrival is in the past
    await tx.invoice.updateMany({
      where: {
        invoiceStatus: InvoiceStatus.UNPAID,
        shipment: { arrival: { lte: new Date() } },
      },
      data: { invoiceStatus: InvoiceStatus.OVERDUE },
    });

    const where: any = {
      AND: [],
    };

    // Handle Status Filter
    if (invoiceStatus) {
      const status = invoiceStatus.toUpperCase() as InvoiceStatus;
      if (Object.values(InvoiceStatus).includes(status)) {
        where.AND.push({ invoiceStatus: status });
      }
    }

    // Handle Search (TransactionID, Client Name, Shipment ID)
    if (search) {
      where.AND.push({
        OR: [
          { transactionID: { contains: search } }, // Search Invoice
          { client: { name: { contains: search } } }, // Search Client Name
          { shipment: { shipmentID: { contains: search } } }, // Search Shipment ID
        ],
      });
    }

    // Relations to include
    const include = {
      client: {
        select: { name: true, email: true, id: true },
      },
      shipment: {
        select: {
          shipmentID: true,
          pickupLocation: true,
          dropLocation: true,
          id: true,
        },
      },
    };

    return await paginate<Invoice>(tx.invoice, {
      page,
      limit,
      where: where.AND.length ? where : {},
      include,
      orderBy: { createdAt: "desc" },
    });
  });

  // const transactions = await paginate
};
