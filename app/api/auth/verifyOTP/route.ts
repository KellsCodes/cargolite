import { verifyOTP } from "@/services/token.service";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, otp, otpType } = body;

    // Validate input
    if (!email || !otp || !otpType) {
      return new Response(
        JSON.stringify({ error: "Email and OTP are required" }),
        { status: 400 }
      );
    }

    // Call the service to verify OTP
    const result = await verifyOTP(email, otp, otpType);
    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error: any) {
    if (error.message === "OTP_INVALID") {
      return new Response(JSON.stringify({ error: "Invalid OTP" }), {
        status: 400,
      });
    }
    
    if (error.message === "OTP_VERIFICATION_FAILED") {
      return new Response(JSON.stringify({ error: "Verification Failed. Please try again later." }), {
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
