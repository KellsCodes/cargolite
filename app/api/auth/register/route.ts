import { registerUser } from "@/services/auth.service";
import { NextResponse } from "next/server";
import z from "zod";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const newUser = await registerUser(body);
    return NextResponse.json(newUser, { status: 201 });
  } catch (error: any) {
    if (error.message === "USER_EXISTS") {
      return NextResponse.json(
        { error: "Email already exists" },
        { status: 409 }
      );
    }

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.flatten().fieldErrors },
        { status: 400 }
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
}
