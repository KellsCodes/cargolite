export enum MessageStatus {
    READ = 1,
    UNREAD = 2,
    REPLIED = 3,
    ARCHIVE = 4
}

export interface ShippingInquiryMessage {
    id: number;
    senderName: string;
    senderEmail: string;
    subject: string;
    body: string;
    packageHeight: string;
    packageWeight: string;
    messageStatus: MessageStatus | string;
    createdAt: string;
}

export interface APIResponse {
    data: ShippingInquiryMessage[];
    meta: {
        currentPage: number;
        pageLength: number;
        totalItems: number;
        totalPages: number;
        from: number;
        to: number;
    };
}

export interface AdminReplyProps {
    id: number;
    body: string;
    clientEnquiryMessageId: number;
    adminId: number;
    createdAt: string;
    enquiry: ShippingInquiryMessage;
}