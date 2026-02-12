import { ForgotPasswordRequest } from "@/services/auth.service";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    await ForgotPasswordRequest(body.email);
    return NextResponse.json(
      { success: true, message: "Password reset code sent to email." },
      { status: 201 }
    );
  } catch (error: any) {
    if (error.message === "INVALID_EMAIL") {
      return NextResponse.json(
        { error: "Invalid email." },
        { status: 409 }
      );
    }
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: "Invalid JSON format" },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};
