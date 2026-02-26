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
    ((currentMessageStatus?.messageStatus === 2 ||
      currentMessageStatus?.messageStatus === 3) &&
      status === 1) ||
    (currentMessageStatus?.messageStatus === 3 && status === 2)
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
