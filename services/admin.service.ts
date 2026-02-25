import { deleteCloudImage } from "@/app/api/utils/uploadImage.utils";
import { EmailAttachmentType, Prisma } from "@/generated/prisma/client";
import { sendAdminMessageByEmail } from "@/lib/mail";
import prisma from "@/lib/prisma";

interface Attachment {
  url: string;
  fileType: EmailAttachmentType;
  fileName: string;
}

export const sendMessageByAdmin = async (data: {
  subject: string;
  body: string;
  recipientId: number;
  adminId: number;
  adminName: string;
  attachmentUrls?: Attachment[];
}) => {
  const recipient = await prisma.client.findUnique({
    where: { id: data.recipientId },
  });
  if (!recipient) throw new Error("INVALID_RECIPIENT");

  const emailAttachments = data.attachmentUrls?.map((item) => item.url) || [];

  const res = await sendAdminMessageByEmail(
    recipient.email,
    data.subject,
    data.body,
    data.adminName,
    emailAttachments
  );

  // if response, proceed to save the log
  if (res.error) {
    // Delete any uploaded attachments
    await Promise.all(
      emailAttachments.map(async (url) => await deleteCloudImage(url))
    );
    throw new Error("EMAIL_SENDING_FAILED");
  }

  const newMessage = await prisma.adminMessage.create({
    data: {
      subject: data.subject,
      body: data.body,
      recipientId: data.recipientId,
      adminId: data.adminId,
      attachmentsUrls: {
        create: (data.attachmentUrls || []).map((item) => ({
          url: item.url,
          fileType: item.fileType as EmailAttachmentType,
          fileName: item.fileName,
        })),
      },
    },
    include: {
      attachmentsUrls: true,
    },
  });

  return newMessage;
};
