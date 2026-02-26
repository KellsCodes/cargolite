import { EnquirySchema } from "@/schema/contactUsSchema";
import { sendEnquiry } from "@/services/enquiry.service";
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
