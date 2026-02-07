import { Resend } from "resend";
import { OtpEmail } from "@/app/api/emails/OtpTemplate";
import { render } from "@react-email/components";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendOtpEmail = async (to: string, otp: string, type: string) => {
  try {
    // Render React component to HTML string
    const emailHtml = await render(OtpEmail({ otp, type }));

    const { data, error } = await resend.emails.send({
      from: "Cargolite <onboarding@resend.dev>", // Replace with your domain once verified
      to: [to],
      subject: "Verification Code - Cargolite",
      html: emailHtml,
    });

    if (error) {
      console.error("Resend Error:", error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (err) {
    console.error("Mail Service Error:", err);
    return { success: false, error: err };
  }
};
