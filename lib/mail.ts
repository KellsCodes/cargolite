// import { Resend } from "resend";
import { OtpEmail } from "@/app/api/emails/OtpTemplate";
import { render } from "@react-email/components";
import { AdminMessageEmail } from "@/app/api/emails/AdminMessageTemplate";
import nodemailer from "nodemailer";

// const resend = new Resend(process.env.RESEND_API_KEY);
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
export const sendOtpEmail = async (to: string, otp: string, type: string) => {
  try {
    // Render React component to HTML string
    const emailHtml = await render(OtpEmail({ otp, type }));

    // const { data, error } = await resend.emails.send({
    const { messageId } = await transporter.sendMail({
      from: "Cargolite <support.cargolite@gmail.com>", // Replace with your domain once verified
      to: [to],
      subject: "Verification Code - Cargolite",
      html: emailHtml,
    });

    if (!messageId) {
      // console.error("Resend Error:", error);
      return { success: false, message: "Failed to send email" };
    }

    return { success: true, messageId };
  } catch (err) {
    // console.error("Mail Service Error:", err);
    return { success: false, error: err };
  }
};

export const sendAdminMessageByEmail = async (
  to: string,
  subject: string,
  body: string,
  senderName: string,
  attachmentUrls?: string[],
  potentialClient?: boolean
) => {
  // return await resend.emails.send({
  return await transporter.sendMail({
    from: "Cargolite <support.cargolite@gmail.com>", // Replace with your domain once verified
    to: [to],
    subject,
    html: await render(AdminMessageEmail({ body, subject, senderName, potentialClient })),
    attachments: attachmentUrls?.length
      ? attachmentUrls.map((url) => ({
          path: url,
          filename: url.split("/").pop() || "attachment",
        }))
      : [],
  });
};
