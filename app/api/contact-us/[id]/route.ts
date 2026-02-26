import { authError, getUserSession } from "@/lib/authUtils";
import { updateEnquiry } from "@/services/enquiry.service";
import { NextResponse } from "next/server";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = await getUserSession();
  if (!admin) return authError();
  try {
    const { id } = await params;
    if (!id) {
      return NextResponse.json("Invalid request data", { status: 400 });
    }
    const { messageStatus } = await request.json();
    if (messageStatus !== 1 && messageStatus !== 2 && messageStatus !== 3) {
      return NextResponse.json("Invalid message status", { status: 400 });
    }
    const res = await updateEnquiry(Number(id), messageStatus);
    return NextResponse.json(res, { status: 200 });
  } catch (error: any) {
    console.log("Error processing contact us form:", error);
    if (error.message === "INVALID_STATUS") {
      return NextResponse.json(
        { error: "Invalid message status" },
        { status: 400 }
      );
    }

    if (error.message === "ENQUIRY_NOT_FOUND") {
      return NextResponse.json({ error: "Invalid message" }, { status: 404 });
    }

    if (error.message === "ENQUIRY_STATUS_UNCHANGED") {
      return NextResponse.json({ error: "Status not updated." }, { status: 400 });
    }
    return NextResponse.json("Internal server error", { status: 500 });
  }
}
