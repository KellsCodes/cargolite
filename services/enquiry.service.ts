import { paginate } from "@/app/api/utils/pagination.utils";
import { sendAdminMessageByEmail } from "@/lib/mail";
import prisma from "@/lib/prisma";

interface Enquiry {
  senderName: string;
  senderEmail: string;
  subject: string;
  body: string;
  packageHeight?: string;
  packageWeight?: string;
}

export const sendEnquiry = async (enquiry: Enquiry) => {
  const newEnquiry = await prisma.clientEnquiryMessage.create({
    data: enquiry,
  });
  return newEnquiry;
};

export const updateEnquiry = async (id: number, status: number) => {
  const currentMessageStatus = await prisma.clientEnquiryMessage.findUnique({
    where: { id },
    select: { messageStatus: true },
  });
  if (!currentMessageStatus) {
    throw new Error("ENQUIRY_NOT_FOUND");
  }

  // message status can change from 1=unread to 2=read and 3=replied but can't be changed from replied to read after being replied
  if (
    currentMessageStatus?.messageStatus !== 4 && // For archiving messages
    (((currentMessageStatus?.messageStatus === 2 ||
      currentMessageStatus?.messageStatus === 3) &&
      status === 1) ||
      (currentMessageStatus?.messageStatus === 3 && status === 2))
  ) {
    throw new Error("INVALID_STATUS");
  }

  if (currentMessageStatus?.messageStatus === status) {
    throw new Error("ENQUIRY_STATUS_UNCHANGED");
  }
  const updatedEnquiry = await prisma.clientEnquiryMessage.update({
    where: { id },
    data: { messageStatus: status },
  });
  return updatedEnquiry;
};

export const deleteEnquiry = async (id: number) => {
  const deletedMessage = await prisma.clientEnquiryMessage.delete({
    where: { id },
  });
  return deletedMessage;
};

export const getMessage = async (id: number) => {
  return await prisma.$transaction(async (tx) => {
    const message = await tx.clientEnquiryMessage.findUnique({
      where: { id },
      include: {
        replies: true,
      },
    });
    if (!message) {
      throw new Error("MESSAGE_NOT_FOUND");
    }

    if (message.messageStatus === 1) {
      await tx.clientEnquiryMessage.update({
        where: { id },
        data: { messageStatus: 2 },
      });
    }
    return message;
  });
};

export const getAllEnquiries = async (
  page: number,
  limit: number,
  search?: string,
  messageStatus?: number
) => {
  // Build the search filter
  const where: any = {
    AND: [],
  };

  // Add search filter
  if (search) {
    where.AND.push({
      OR: [
        { senderName: { contains: search } }, // Search the sender name
        { senderEmail: { contains: search } }, // Search Sender Email
      ],
    });
  }

  // Add message status filter
  if (messageStatus) {
    where.AND.push({ messageStatus: { equals: messageStatus } });
  }

  const result = await paginate<any>(prisma.clientEnquiryMessage, {
    page,
    limit,
    where, // Search filter is passed here
    orderBy: { createdAt: "desc" },
  });
  return result;
};

export const adminReplyToEnquiry = async (
  id: number,
  adminId: number,
  replyBody: string,
  adminName = "Admin"
) => {
  console.log({ id });
  const enquiry = await prisma.clientEnquiryMessage.findUnique({
    where: { id },
    include: {
      replies: true,
    },
  });

  if (!enquiry) {
    throw new Error("ENQUIRY_NOT_FOUND");
  }

  if (enquiry.replies.length > 0) {
    throw new Error("ENQUIRY_ALREADY_REPLIED");
  }

  const email = await sendAdminMessageByEmail(
    enquiry.senderEmail,
    `Re: ${enquiry.subject}`,
    replyBody,
    adminName
  );

  if (email.error) throw new Error("EMAIL_SENDING_FAILED");

  // Save Reply & Set Status to Replied (3)
  return await prisma.$transaction(async (tx) => {
    const reply = await tx.repliedEnquiryMessage.create({
      data: {
        clientEnquiryMessageId: id,
        adminId,
        body: replyBody,
      },
      include: {
        enquiry: true,
      },
    });
    await tx.clientEnquiryMessage.update({
      where: { id },
      data: { messageStatus: 3 },
    });
    return reply;
  });
};

export const deleteReply = async (id: number) => {
  const deletedReply = await prisma.repliedEnquiryMessage.delete({
    where: { id },
  });
  return deletedReply;
};

export const getSingleReply = async (id: number) => {
  const reply = await prisma.repliedEnquiryMessage.findUnique({
    where: { id },
    include: {
      enquiry: true,
    },
  });
  if (!reply) {
    throw new Error("REPLY_NOT_FOUND");
  }
  return reply;
};
