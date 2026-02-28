import { authError, getUserSession } from "@/lib/authUtils";
import { EnquirySchema } from "@/schema/contactUsSchema";
import { getAllEnquiries, sendEnquiry } from "@/services/enquiry.service";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = EnquirySchema.safeParse(body);
    if (!parsed.success) {
      const { fieldErrors } = parsed.error.flatten() || "Invalid request data";
      // console.log(Object.values(fieldErrors).flat().join(", "));
      return NextResponse.json(fieldErrors, { status: 400 });
    }
    const enquiryData = await sendEnquiry(parsed.data);
    return NextResponse.json(
      { message: "Enquiry received successfully", data: enquiryData },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error processing contact us form:", error);
    if (error instanceof ZodError) {
      return NextResponse.json("Invalid request data", { status: 400 });
    }
    return NextResponse.json("Internal server error", { status: 500 });
  }
}

export async function GET(req: Request) {
  const admin = await getUserSession();
  if (!admin) return authError();
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const search = searchParams.get("search") || undefined;
    const messageStatus = searchParams.get("messageStatus")
      ? Number(searchParams.get("messageStatus"))
      : undefined;

    const enquiries = await getAllEnquiries(page, limit, search, messageStatus);
    return NextResponse.json(enquiries, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json("Internal server error", { status: 500 });
  }
}
