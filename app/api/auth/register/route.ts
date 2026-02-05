import { RegisterSchema } from "@/lib/validations";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsedData = RegisterSchema.safeParse(body);

    if (!parsedData.success) {
      const errors = parsedData.error.format();
      return NextResponse.json({ errors }, { status: 400 });
    }

    const {
      firstname,
      lastname,
      email,
      phone,
      password,
      region,
    } = parsedData.data;
    return NextResponse.json(
      {
        message: "User registered successfully",
        data: { firstname, lastname, email, phone, region },
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
