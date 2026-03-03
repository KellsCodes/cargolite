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
};

export const getTransactionById = async (id: number) => {
  return await prisma.invoice.findUnique({
    where: { id },
    include: {
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
    },
  });
};

export const updateInvoiceStatus = async (
  id: number,
  status: InvoiceStatus
) => {
  const invoice = await prisma.invoice.findUnique({ where: { id } });
  if (!invoice) throw new Error("INVALID_INVOICE");
  if (
    invoice.invoiceStatus === InvoiceStatus.PAID ||
    invoice.invoiceStatus === InvoiceStatus.REFUND ||
    invoice.invoiceStatus === (status.toUpperCase() as InvoiceStatus)
  ) {
    throw new Error("INVALID_INVOICE_STATUS");
  }
  const invoiceStatus = status.toUpperCase() as InvoiceStatus;
  return await prisma.invoice.update({
    where: { id },
    data: { invoiceStatus },
  });
};
