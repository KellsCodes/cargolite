import { z } from "zod";

export const CreateShipmentSchema = z.object({
  // Sender & Receiver Info
  senderName: z.string().min(2),
  senderEmail: z.string().email(),
  senderPhone: z.string().min(10),
  receiverName: z.string().min(2),
  receiverEmail: z.string().email(),
  receiverPhone: z.string().min(10),

  // Shipment Details
  weight: z.number().positive("Weight must be greater than 0"),
  packageType: z.enum(["STANDARD", "FRAGILE", "PERISHABLE", "HAZARDOUS"]),
  courierType: z.enum(["SHIP", "AIRPLANE", "BUS"]),
  packageImage: z.string().url().optional().nullable(),
  dropLocation: z.string().min(5),
  pickupLocation: z.string().min(5),
  arrival: z.string().refine((date) => !isNaN(Date.parse(date)), "Invalid date"),

  // Invoice Details
  amount: z.number().positive(),
  paymentMethod: z.string().min(3),
});


// Reuses the rules above but makes every field optional
export const UpdateShipmentSchema = CreateShipmentSchema.partial();
