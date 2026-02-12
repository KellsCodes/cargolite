import {
    Body,
    Container,
    Head,
    Heading,
    Html,
    Preview,
    Section,
    Text,
    Tailwind,
} from "@react-email/components";
import * as React from "react";

interface OtpEmailProps {
    otp: string;
    type: string;
}

export const OtpEmail = ({ otp, type }: OtpEmailProps) => {
    const actionText = type === "SIGNUP" ? "verify your account" : type === "PASSWORD_RESET" ? "reset your password" : "confirm your action";

    return (
        <Html>
            <Head />
            <Preview>Cargolite Verification Code</Preview>
            <Tailwind
                config={{
                    theme: {
                        extend: {
                            colors: {
                                primary: "#034460",
                                secondary: "#FFB240", // Hex conversion of oklch(0.769 0.188 70.08)
                            },
                        },
                    },
                }}
            >
                <Body className="bg-white my-auto mx-auto font-sans">
                    <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] w-[465px]">

                        {/* --- REPLICATED LOGO --- */}
                        <Section className="text-center mt-[32px]">
                            <Text className="font-black text-[24px] m-0 p-0 tracking-tighter">
                                <span className="text-primary">CARGO</span>
                                <span className="text-secondary">LITE</span>
                            </Text>
                        </Section>

                        <Heading className="text-black text-[20px] font-semibold text-center p-0 my-[20px] mx-0">
                            Account Verification
                        </Heading>

                        <Text className="text-[#444444] text-[14px] leading-[24px] text-center">
                            Hello, thank you for choosing Cargolite. Please use the verification code below to {actionText}.
                        </Text>

                        <Section className="bg-[#f9fafb] rounded-lg my-[24px] py-[16px] text-center border border-dashed border-[#e5e7eb]">
                            <Text className="text-[36px] font-bold tracking-[10px] text-primary m-0 p-0">
                                {otp}
                            </Text>
                        </Section>

                        <Text className="text-[#666666] text-[12px] leading-[24px] text-center px-[20px]">
                            This code is valid for 10 minutes. If you did not sign up for a Cargolite account, please ignore this email.
                        </Text>

                        <hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />

                        <Text className="text-[#999999] text-[11px] text-center uppercase tracking-widest">
                            © {new Date().getFullYear()} Cargolite Logistics
                        </Text>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    );
};
