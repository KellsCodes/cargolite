import { z } from "zod";

export const RegisterSchema = z.object({
  firstName: z.string().min(2, "First name required"),
  lastName: z.string().min(2, "Last name required"),
  email: z.string().email("Invalid email address"),
  phone: z
    .string()
    .regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone format (e.g. +234...)"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[\W_]/, "Password must contain at least one special character"),
  region: z.string().min(2, "Please select your region"),
  role: z.enum(["USER", "ADMIN", "MANAGER"]).optional().default("USER"),
});

export type RegisterInput = z.infer<typeof RegisterSchema>;
