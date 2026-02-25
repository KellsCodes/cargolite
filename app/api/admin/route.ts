import { EmailAttachmentType } from "@/generated/prisma/enums";
import { authError, getUserSession } from "@/lib/authUtils";
import { sendMessageByAdmin } from "@/services/admin.service";
import { processImage } from "@/services/image.service";
import { NextResponse } from "next/server";

const MAX_SIZE = 2 * 1024 * 1024; // 2MB
const ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "application/pdf",
];

export async function POST(req: Request) {
  const admin = await getUserSession();
  if (!admin) return authError();
  try {
    const formData = await req.formData();

    const subject = formData.get("subject") as string;
    const body = formData.get("body") as string;
    const recipientId = formData.get("recipientId") as string;

    const rawFiles = formData.getAll("attachmentUrls") as File[];
    // check file size error
    if (rawFiles.some((file) => file.size > MAX_SIZE)) {
      return NextResponse.json(
        { error: "One or more files exceed 2MB limit" },
        { status: 400 }
      );
    }

    if (rawFiles.some((file) => !ALLOWED_TYPES.includes(file.type))) {
      return NextResponse.json(
        {
          error:
            "Invalid file type. Only Images (JPG, PNG, WebP) and PDFs are allowed.",
        },
        { status: 400 }
      );
    }

    const processedAttachments = await Promise.all(
      rawFiles.map(async (file) => {
        // Upload file to cloud storage and return the public URL
        let url;
        url = await processImage(file, admin.id, "admin_messages/attachments");

        return {
          url: url as string,
          fileName: `${file.name
            .trim()
            .toLowerCase()
            .replace(/\s+/g, "-")}_${Date.now()}`,
          fileType:
            file.type === "image/jpeg"
              ? EmailAttachmentType.IMAGE
              : EmailAttachmentType.DOC,
        };
      })
    );

    const sendMail = await sendMessageByAdmin({
      subject,
      body,
      recipientId: Number(recipientId),
      adminId: admin.id,
      adminName: admin?.name || "",
      attachmentUrls: processedAttachments,
    });

    return NextResponse.json({ data: sendMail });
  } catch (error: any) {
    console.log(error);
    if (error.message === "INVALID_RECIPIENT") {
      return NextResponse.json(
        { error: "Invalid recipient ID" },
        { status: 400 }
      );
    }

    if (error.message === "EMAIL_SENDING_FAILED") {
      return NextResponse.json(
        { error: "Email sending failed" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
