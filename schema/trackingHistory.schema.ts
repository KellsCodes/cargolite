import { z } from "zod";
import { ShipmentStatus } from "@/generated/prisma/enums";

export const TrackingHistorySchema = z.object({
  shipmentId: z.number().int().positive(),
  status: z.nativeEnum(ShipmentStatus),
  location: z
    .string()
    .min(3, "Location must be at least 3 characters long")
    .max(150),
  notes: z.string().max(500).optional().nullable(),
});
