import { ResendVerificationOtp } from "@/services/auth.service";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = await ResendVerificationOtp(body.email);
    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error: any) {
    if (error.message === "USER_NOT_FOUND") {
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404,
      });
    }

    if (error.message === "USER_ALREADY_VERIFIED") {
      return new Response(
        JSON.stringify({ error: "User is already verified" }),
        { status: 400 }
      );
    }

    if (error.message === "OTP_SEND_FAILED") {
      return new Response(JSON.stringify({ error: "OTP send failed." }), {
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
}
