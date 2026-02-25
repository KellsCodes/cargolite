import {
    Body, Container, Head, Heading, Hr, Html, Preview, Section, Tailwind, Text,
} from "@react-email/components";
import * as React from "react";

interface AdminMessageEmailProps {
    body: string;
    senderName: string;
    subject?: string;
}

export const AdminMessageEmail = ({ body, subject, senderName }: AdminMessageEmailProps) => (
    <Html>
        <Head />
        <Preview>Update from Cargolite Support</Preview>
        <Tailwind
            config={{
                theme: {
                    extend: {
                        colors: {
                            primary: "#034460",
                            secondary: "#FFB240",
                        },
                    },
                },
            }}
        >
            <Body className="bg-[#f6f9fc] my-auto mx-auto font-sans">
                <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] w-[465px] bg-white shadow-sm">
                    {/* Brand Logo Header */}
                    <Section className="mt-[32px] text-center">
                        <Text className="font-black text-[28px] m-0 p-0 tracking-tighter leading-none">
                            <span className="text-primary">CARGO</span>
                            <span className="text-secondary">LITE</span>
                        </Text>
                        <Text className="text-[10px] uppercase tracking-[2px] text-[#8898aa] mt-1 font-bold">
                            Logistics Excellence
                        </Text>
                    </Section>

                    <Heading className="text-black text-[24px] font-bold text-center p-0 my-[10px] mx-0">
                        {subject ?? "Update From Cargolite"}
                    </Heading>

                    <Section className="px-[20px]">
                        <Text className="text-[#333] text-[16px] leading-[24px] whitespace-pre-wrap">
                            {body}
                        </Text>

                        <Section className="mt-[32px] mb-[16px]">
                            <Text className="text-[#333] text-[15px] leading-[24px] m-0">
                                Best regards,
                            </Text>
                            <Text className="text-primary font-bold text-[16px] m-0">
                                {senderName}
                            </Text>
                            <Text className="text-[#8898aa] text-[13px] m-0 italic">
                                Administrative Officer, Cargolite
                            </Text>
                        </Section>
                    </Section>

                    <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />

                    <Section className="text-center">
                        <Text className="text-[#b7b7b7] text-[12px] leading-[18px]">
                            © {new Date().getFullYear()} Cargolite Logistics. <br />
                            This is a secure communication from your logistics provider.
                        </Text>
                        <Text className="text-[#b7b7b7] text-[11px] leading-[14px] mt-2">
                            If you have questions, please contact our support team or visit our [Official Portal](https://cargolite.com).
                        </Text>
                    </Section>
                </Container>
            </Body>
        </Tailwind>
    </Html>
);

export default AdminMessageEmail;
