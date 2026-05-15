"use client";

import React, { useState, useRef, useEffect, FormEvent, ClipboardEvent, KeyboardEvent } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShieldCheck, Loader2, ArrowLeft, RefreshCw } from "lucide-react";
import api from "@/lib/axios";
import { toast } from "react-toastify";
import { OtpType } from "@/generated/prisma/enums";
import { useRouter } from "next/navigation";

export default function EmailOtpVerificationPage() {
    const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
    const [isLoading, setIsLoading] = useState(false);
    const [resendCountdown, setResendCountdown] = useState(0);
    const inputRefs = useRef<HTMLInputElement[]>([]);
    const router = useRouter()
    const [isResendingOTP, setIsResendingOTP] = useState(false)

    const userEmail = typeof window !== "undefined" ? localStorage.getItem("email") : "";

    useEffect(() => {
        if (resendCountdown <= 0) return;
        const timer = setTimeout(() => setResendCountdown(resendCountdown - 1), 1000);
        return () => clearTimeout(timer);
    }, [resendCountdown]);

    const handleChange = (element: HTMLInputElement, index: number) => {
        const value = element.value.replace(/[^0-9]/g, "");
        if (!value) return;

        const newOtp = [...otp];
        newOtp[index] = value.substring(value.length - 1);
        setOtp(newOtp);

        if (value && index < 5 && inputRefs.current[index + 1]) {
            inputRefs.current[index + 1].focus();
        }
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === "Backspace") {
            e.preventDefault();
            const newOtp = [...otp];

            if (otp[index]) {
                newOtp[index] = "";
            } else if (index > 0) {
                newOtp[index - 1] = "";
                if (inputRefs.current[index - 1]) {
                    inputRefs.current[index - 1].focus();
                }
            }
            setOtp(newOtp);
        }
    };

    const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData("text").trim().replace(/[^0-9]/g, "");

        if (pastedData.length >= 6) {
            const pasteArray = pastedData.split("").slice(0, 6);
            setOtp(pasteArray);
            inputRefs.current[5]?.focus();
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const fullOtpString = otp.join("");
        if (fullOtpString.length < 6) return;

        setIsLoading(true);
        try {
            const response = await api.post("/auth/verifyOTP", {
                email: userEmail,
                otp: fullOtpString,
                otpType: OtpType.SIGNUP
            });

            if (response.status === 200 || response.status === 201) {
                toast.success("Account verification successful!");
                router.push('/login')
            }
        } catch (error: any) {
            console.error("Verification Error:", error);
            toast.error(error.message || "Invalid validation token. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleResendAction = async () => {
        if (resendCountdown > 0 || isResendingOTP) return;
        setIsResendingOTP(true)
        try {
            await api.post("/auth/resendOTP", { email: userEmail });
            toast.success("A new activation code was sent to your email.");
            setResendCountdown(30);
            const otp = new Array(6).fill("")
            setOtp(otp)
        } catch (error: any) {
            console.log(error)
            // Handle raw 5xx Axios errors passed through by your interceptor
            const status = error.response?.status;
            if (status >= 500) {
                toast.error("Server error. Please try again later.");
                return;
            }

            // Fallback for network disconnects or unexpected errors
            toast.error(error.message || "Could not complete request. Try again.");
        } finally {
            setIsResendingOTP(false)
        }
    };

    return (
        <div className="relative h-screen w-screen overflow-hidden bg-white flex items-center justify-center selection:bg-[#ffa800]/50">
            {/* Main Panel Card */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="relative z-20 w-[95%] md:w-[90%] max-w-[440px] p-6 md:p-10 rounded-3xl border border-black/5 bg-white/70 backdrop-blur-3xl shadow-md shadow-black/5"
            >
                <Link
                    href="/login"
                    className="inline-flex items-center gap-2 text-xs font-bold text-black/40 hover:text-[#034460] transition-colors mb-8 group"
                >
                    <ArrowLeft className="w-3.5 h-3.5 transform group-hover:-translate-x-0.5 transition-transform" />
                    Back to Login
                </Link>

                <div className="flex flex-col items-center space-y-8">
                    <div className="text-center space-y-3">
                        <h1 className="font-black text-3xl tracking-tighter text-[#034460] uppercase leading-none">
                            <span className="text-main-primary">Cargo</span><span className="text-chart-5">lite</span>
                        </h1>
                        <div className="space-y-1">
                            <h2 className="text-lg font-bold text-[#034460] tracking-tight">Security Verification</h2>
                            <p className="text-xs text-black/50 leading-relaxed max-w-[280px] mx-auto">
                                We sent a 6-digit access code to <span className="font-semibold text-[#034460] break-all">{userEmail}</span>
                            </p>
                        </div>
                    </div>

                    <form className="w-full space-y-8" onSubmit={handleSubmit}>
                        <div className="flex justify-between items-center gap-2" onPaste={handlePaste}>
                            {otp.map((digit, index) => (
                                <input
                                    key={index}
                                    ref={(el) => { if (el) inputRefs.current[index] = el; }}
                                    type="text"
                                    inputMode="numeric"
                                    pattern="[0-9]*"
                                    maxLength={1}
                                    value={digit}
                                    onChange={(e) => handleChange(e.target, index)}
                                    onKeyDown={(e) => handleKeyDown(e, index)}
                                    className="w-1/2 h-14 md:w-1/2 md:h-16 text-center text-xl font-black bg-black/5 border border-main-primary/10 rounded-xl outline-none transition-all text-[#034460] focus:bg-white focus:border-[#034460] focus:ring-4 focus:ring-main-primary/5 shadow-sm"
                                />
                            ))}
                        </div>

                        <div className="space-y-4">
                            <motion.button
                                type="submit"
                                whileHover={otp.join("").length === 6 && !isLoading ? { scale: 1.01, backgroundColor: "#ffb732" } : {}}
                                whileTap={otp.join("").length === 6 && !isLoading ? { scale: 0.99 } : {}}
                                disabled={otp.join("").length < 6 || isLoading}
                                className="h-14 w-full bg-[#ffa800] text-[#034460] font-black uppercase tracking-widest text-xs rounded-2xl flex items-center justify-center gap-3 transition-all shadow-lg shadow-[#ffa800]/10 disabled:opacity-40 disabled:cursor-not-allowed"
                            >
                                {isLoading ? (
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                ) : (
                                    <>
                                        <ShieldCheck className="w-4 h-4" />
                                        Verify Email
                                    </>
                                )}
                            </motion.button>

                            <div className="text-center">
                                {resendCountdown > 0 ? (
                                    <p className="text-[11px] text-black/40 font-medium">
                                        Resend secure code in <span className="font-bold text-[#034460]">{resendCountdown}s</span>
                                    </p>
                                ) : (
                                    <button
                                        type="button"
                                        onClick={handleResendAction}
                                        className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#034460]/70 hover:text-[#034460] transition-colors underline underline-offset-4 decoration-2"
                                    >
                                        <RefreshCw
                                            className={`w-3 h-3 ${isResendingOTP ? "animate-spin" : ""}`}
                                        />

                                        Resend Code via Email
                                    </button>
                                )}
                            </div>
                        </div>
                    </form>
                </div>
            </motion.div>
        </div>
    );
}
