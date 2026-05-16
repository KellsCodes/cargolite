import { InvoiceStatus } from "@/generated/prisma/enums";

export type PayerRole = "SENDER" | "RECEIVER"; // Expand as needed based on your DB schema
export type PaymentMethod = "TRANSFER" | "CASH" | "CARD" | "POS";

export interface InvoicePayload {
    id: number;
    transactionID: string;
    amount: string | number;
    invoiceStatus: InvoiceStatus;
    payerRole: PayerRole;
    paymentMethod: PaymentMethod;
    createdAt: string;
    updatedAt: string;
    clientId: number;
    client: ClientInfo;
    shipment: ShipmentInfo
}


interface ClientInfo {
    id: number;
    name: string;
    email: string
}

interface ShipmentInfo {
    id: number;
    shipmentID: string;
    pickupLocation: string;
    dropLocation: string;
    arrival: string
}


export interface APIResponse {
    data: InvoicePayload[];
    meta: {
        currentPage: number;
        pageLength: number;
        totalItems: number;
        totalPages: number;
        from: number;
        to: number;
    };
}