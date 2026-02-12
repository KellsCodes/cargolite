import { newPasswordSchema } from "@/schema/resetPassword.schema";
import { resetPassword } from "@/services/auth.service";

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const validatedData = newPasswordSchema.safeParse(body);
    const { data, error, success } = validatedData;
    if (!success) {
      return new Response(
        JSON.stringify({ error: "Validation failed", details: error.flatten().fieldErrors }),
        { status: 400 }
      );
    }
    await resetPassword(data.code, data.newPassword, data.otpType);
    return new Response(
      JSON.stringify({ success: true, message: "Password reset successful." }),
      { status: 200 }
    );
  } catch (error: any) {
    if (error.message === "INVALID_CODE_OR_PASSWORD") {
      return new Response(
        JSON.stringify({ error: "Invalid code or password." }),
        { status: 400 }
      );
    }

    if (error.message === "INVALID_OTP_CODE") {
      return new Response(JSON.stringify({ error: "Invalid OTP code." }), {
        status: 400,
      });
    }

    if (error instanceof SyntaxError) {
      return new Response(JSON.stringify({ error: "Invalid JSON format" }), {
        status: 400,
      });
    }

    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
};

// return new
