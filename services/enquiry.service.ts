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
