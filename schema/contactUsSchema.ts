import { z } from "zod";

export const EnquirySchema = z.object({
  senderName: z.string().min(2, "Name is too short").max(100),
  senderEmail: z.string().email("Invalid email address"),
  subject: z.string().min(5, "Subject is too short").max(200),
  body: z.string().min(10, "Message body is too short"),
  packageHeight: z.string().optional(),
  packageWeight: z.string().optional(),
});

export type EnquiryInput = z.infer<typeof EnquirySchema>;
