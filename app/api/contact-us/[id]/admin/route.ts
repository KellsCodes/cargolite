import { authError, getUserSession } from "@/lib/authUtils";
import {
  adminReplyToEnquiry,
  deleteReply,
  getSingleReply,
} from "@/services/enquiry.service";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

export async function POST(req: Request) {
  const admin = await getUserSession();
  if (!admin) return authError();

  try {
    const body = await req.json();
    const res = await adminReplyToEnquiry(body.id, admin.id, body.replyBody);
    return NextResponse.json(res, { status: 200 });
  } catch (error: any) {
    console.log(error);
    if (error instanceof ZodError) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    if (error.message === "ENQUIRY_NOT_FOUND") {
      return NextResponse.json(
        { error: "Enquiry message not found" },
        { status: 404 }
      );
    }

    if (error.message === "EMAIL_SENDING_FAILED") {
      return NextResponse.json(
        { error: "Failed to send email" },
        { status: 400 }
      );
    }
    
    if (error.message === "ENQUIRY_ALREADY_REPLIED") {
      return NextResponse.json(
        { error: "This enquiry has already been replied to." },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const admin = await getUserSession();
  if (!admin) return authError();
  try {
    const id = parseInt((await params).id);
    await deleteReply(id);
    return NextResponse.json(
      { message: "Message deleted successfully." },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = await getUserSession();
  if (!admin) return authError();

  try {
    const id = parseInt((await params).id);
    console.log("Fetching reply with ID:", id);

    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    const reply = await getSingleReply(id);

    return NextResponse.json(reply, { status: 200 });
  } catch (error: any) {
    if (error.message === "REPLY_NOT_FOUND") {
      return NextResponse.json({ error: "Reply not found" }, { status: 404 });
    }
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}