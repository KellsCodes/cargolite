import { z } from "zod";

export const ProfileSchema = z.object({
  displayName: z
    .string()
    .max(50, "Display name too long")
    .optional()
    .nullable(),
  firstName: z.string().min(2, "First name is too short").max(50),
  lastName: z.string().min(2, "Last name is too short").max(50),
  region: z.string().min(2, "Region/Country is required"),
  city: z.string().optional().nullable(),
  postalCode: z.string().max(20).optional().nullable(),
  telephone: z
    .string()
    .regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone format")
    .optional()
    .nullable(),
  // We handle profileImage separately usually, but you can include the URL string here
  profileImage: z.string().url().optional().nullable(),
});

export type ProfileInput = z.infer<typeof ProfileSchema>;
