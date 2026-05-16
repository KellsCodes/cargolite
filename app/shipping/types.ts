import {
  CourierType,
  PackageType,
  ShipmentStatus,
} from "@/generated/prisma/enums";

export interface TrackingHistory {
  id: number;
  status: ShipmentStatus;
}

export interface ShipmentInvoice {
  amount: string;
  payerRole: "SENDER" | "RECEIVER";
  id: number
}

export interface ShipmentPerson {
  name: string;
}

export interface Shipment {
  id: number;
  shipmentID: string;
  weight: number;
  amount: string;
  arrival: string; // ISO Date String
  clientName: string;
  courierType: CourierType;
  packageCount: number;
  packageType: PackageType;
  pickupLocation: string;
  dropLocation: string;
  packageImage: string; // Cloudinary URL
  createdAt: string;
  updatedAt: string;
  sender: ShipmentPerson;
  receiver: ShipmentPerson;
  invoice: ShipmentInvoice;
  trackingHistory: TrackingHistory[];
  invoiceId: number;
}

export interface APIResponse {
  data: Shipment[];
  meta: {
    currentPage: number;
    pageLength: number;
    totalItems: number;
    totalPages: number;
    from: number;
    to: number;
  };
}
