"use client"

import { ProfileAPI } from "@/lib/api/profile";
import { UserRound, ShieldCheck, Camera, Loader2, Eye, EyeOff, RefreshCw } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { UserProfileDataUpdate, UserProfileResponse } from "../types/profile";
import { toast } from "react-toastify";
import { AnimateSpin } from "../components/AnimateSpin";
import { validatePassword } from "@/lib/passwordValidator";
import { motion } from "framer-motion";
import api from "@/lib/axios";
import { OtpType } from "@/generated/prisma/enums";

export default function Settings() {
    const [profileData, setProfileData] = useState<UserProfileResponse | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [updatedData, setUpdatedData] = useState<UserProfileDataUpdate | null>(null)
    const [isUpdating, setIsUpdating] = useState(false)
    const [passwordData, setPasswordData] = useState({
        newPassword: "",
        confirmNewPassword: ""
    })
    const [isShowPassword, setIsShowPassword] = useState({
        newPassword: false,
        confirmNewPassword: false
    })
    type PasswordFieldName = keyof typeof isShowPassword

    const [isRequestingOTP, setIsRequestingOTP] = useState(false)
    const [resendCountdown, setResendCountdown] = useState(0);
    const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
    const [otpRequested, setOtpRequested] = useState(false);
    const inputRefs = useRef<HTMLInputElement[]>([]);
    const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);

    const handleGetProfile = async () => {
        if (isLoading) return
        setIsLoading(true)
        try {
            const res = await ProfileAPI.getUserProfile()
            setProfileData(res.data)
        } catch (error) {
            toast.error("Error fetching user profile")
        } finally {
            setIsLoading(false)
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setProfileData((prev) => {
            if (!prev) return prev;
            return { ...prev, [name]: value }
        })
        setUpdatedData((prev) => {
            if (!prev) return { [name]: value };
            return { ...prev, [name]: value }
        })
    }

    const handleSaveChanges = async () => {
        if (isUpdating) {
            toast.error("Please hold on, a request is ongoing.");
            return;
        }

        const cleanedData = Object.fromEntries(
            Object.entries(updatedData || {}).filter(([, value]) => {
                // Filter out null, undefined, and completely empty strings (including spaces)
                return value !== null && value !== undefined && String(value).trim() !== "";
            })
        ) as Partial<UserProfileDataUpdate>; // Cast back to partial interface shape

        if (!updatedData || Object.keys(cleanedData).length === 0) {
            toast.error(`Please make changes before submitting.`);
            return
        }

        setIsUpdating(true)
        try {
            const formData = new FormData();
            for (const [key, value] of Object.entries(cleanedData)) {
                if (value instanceof File) {
                    formData.append(key, value);
                } else {
                    formData.append(key, String(value));
                }
            }
            const res = await ProfileAPI.updateUserProfile(formData)
            const { user } = profileData as UserProfileResponse
            setProfileData({ user, ...res.data })
            setUpdatedData(null)
            toast.success("Profile updated successfully")
        } catch (error) {
            toast.error("Error updating profile")
        } finally {
            setIsUpdating(false)
        }
    }

    const handleRequestOTP = async () => {
        if (isRequestingOTP) {
            toast.error("Please hold on, a request is ongoing.");
            return;
        }
        if (resendCountdown > 0) {
            toast.error("Please check your email inbox or spams for an OTP.");
            return;
        }

        // Validate password strength before sending OTP request
        if (!validatePassword(passwordData.newPassword)) {
            toast.error("Min 8 characters: 1 upper, 1 lower, 1 digit, 1 special, no spaces.");
            return;
        }

        if (passwordData.newPassword !== passwordData.confirmNewPassword) {
            toast.error("Please ensure your passwords match and meet the minimum length requirement.");
            return;
        }

        setIsRequestingOTP(true)
        try {
            await api.post("/auth/forgotPassword", { email: profileData?.user.email });
            setResendCountdown(60);
            toast.success("OTP was sent to your email.")
            const otp = new Array(6).fill("")
            setOtp(otp)
            setOtpRequested(true)
        } catch (error) {
            console.error(error)
            toast.error("Error sending OTP")
        } finally {
            setIsRequestingOTP(false)
        }
    }

    const handleOTPChange = (element: HTMLInputElement, index: number) => {
        const value = element.value.replace(/[^0-9]/g, "");
        if (!value) return;

        const newOtp = [...otp];
        newOtp[index] = value.substring(value.length - 1);
        setOtp(newOtp);

        if (value && index < 5 && inputRefs.current[index + 1]) {
            inputRefs.current[index + 1].focus();
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
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

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData("text").trim().replace(/[^0-9]/g, "");

        if (pastedData.length >= 6) {
            const pasteArray = pastedData.split("").slice(0, 6);
            setOtp(pasteArray);
            inputRefs.current[5]?.focus();
        }
    };

    const handleChangePassword = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const fullOtpString = otp.join("");
        if (fullOtpString.length < 6) return;

        setIsUpdatingPassword(true);
        try {
            await api.post("/auth/resetPassword", {
                newPassword: passwordData.newPassword,
                code: fullOtpString,
                otpType: OtpType.PASSWORD_RESET
            });
            toast.success("Password updated successfully!");
            setTimeout(() => {
                setPasswordData({
                    newPassword: "",
                    confirmNewPassword: ""
                })
                setOtpRequested(false)
                setResendCountdown(0);
                const otp = new Array(6).fill("")
                setOtp(otp)
            }, 3000)
        } catch (error: any) {
            console.error("Verification Error:", error);
            toast.error(error.message || "Invalid validation token. Please try again.");
        } finally {
            setIsUpdatingPassword(false);
        }
    };

    useEffect(() => {
        if (resendCountdown <= 0) return;
        const timer = setTimeout(() => setResendCountdown(resendCountdown - 1), 1000);
        return () => clearTimeout(timer);
    }, [resendCountdown]);

    useEffect(() => {
        handleGetProfile()
    }, [])

    return (
        <div className="w-full lg:max-w-5xl mx-auto bg-white p-5 lg:p-12 h-screen flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between border-b pb-6 mb-10 shrink-0">
                <div className="flex items-center gap-x-3">
                    <div className="bg-blue-50 p-2 rounded-lg">
                        <UserRound className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                        <h1 className="text-xs lg:text-xl font-semibold text-slate-900">Account Settings</h1>
                        <p className="hidden md:inline-block text-sm text-slate-500">Manage your profile and security preferences</p>
                    </div>
                </div>
                <button
                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 lg:px-5 py-2 rounded lg:rounded-lg text-xs lg:text-sm font-medium transition-all"
                    onClick={handleSaveChanges}
                >
                    Save Changes
                </button>
            </div>

            {/* Content Area - Added structural height constraints for vertical scrolling */}
            {isLoading ? (
                <div className="h-64 text-center">
                    <div className="h-full flex flex-col items-center justify-center gap-2">
                        <AnimateSpin />
                        <span className="text-sm">Loading profile...</span>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 lg:gap-16 overflow-y-auto md:max-h-[calc(100vh-240px)] pr-2 pb-46 xl:pb-0">
                    {/* Profile Section */}
                    <div className="xl:col-span-7 space-y-8">
                        <div>
                            <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-6">Profile Information</h2>

                            {/* Avatar Upload */}
                            <div className="flex items-center gap-x-6 mb-8 group">
                                <div className="relative w-30 h-24 lg:w-24 lg:h-24">
                                    <img
                                        src={!profileData?.profileImage ? "/author.png" : typeof profileData.profileImage === "string" ? profileData.profileImage : URL.createObjectURL(profileData.profileImage)}
                                        alt="avatar"
                                        className="h-full w-full rounded-2xl object-cover border-2 border-slate-100"
                                    />
                                    <label
                                        className={`absolute -bottom-2 -right-2 bg-white shadow-md border p-1.5 rounded-full transition-colors 
                                            ${isUpdating && profileData && typeof profileData.profileImage === "object"
                                                ? 'opacity-70 cursor-not-allowed'
                                                : 'hover:bg-slate-50 cursor-pointer'
                                            }`}
                                    >
                                        {isUpdating && profileData && typeof profileData.profileImage === "object" ? (
                                            <Loader2 className="w-4 h-4 text-slate-600 animate-spin" />
                                        ) : (
                                            <Camera className="w-4 h-4 text-slate-600" />
                                        )}

                                        <input
                                            type="file"
                                            disabled={isUpdating} // Prevents file picker from opening while uploading
                                            accept="image/webp, image/jpeg, image/png"
                                            className="hidden"
                                            onChange={async (e) => {
                                                const file = e.target.files?.[0];
                                                if (!file) return;

                                                // Validate type and size (1MB)
                                                const isValidType = ['image/webp', 'image/jpeg', 'image/png'].includes(file.type);
                                                const isValidSize = file.size <= 1 * 1024 * 1024;

                                                if (!isValidType || !isValidSize) {
                                                    toast.error("Invalid image. Must be PNG/JPEG/WebP and under 1MB.");
                                                    return;
                                                }

                                                try {
                                                    setProfileData((prev) => {
                                                        if (!prev) return prev
                                                        return {
                                                            ...prev,
                                                            profileImage: file
                                                        }
                                                    });
                                                    setUpdatedData((prev) => {
                                                        if (!prev) return { profileImage: file }
                                                        return {
                                                            ...prev,
                                                            profileImage: file
                                                        }
                                                    });

                                                } catch (error) {
                                                    console.error("Upload failed:", error);
                                                    alert("Failed to upload image. Please try again.");
                                                } finally {
                                                    e.target.value = ''; // Reset input
                                                }
                                            }}
                                        />
                                    </label>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-slate-700">Profile Picture</p>
                                    <p className="text-xs text-slate-500 mt-1">JPG, WEBP or PNG. Max size of 1MB</p>
                                </div>
                            </div>

                            {/* Form Fields */}
                            <div className="grid grid-cols-1 gap-y-5">
                                {[
                                    { name: "firstName", label: "First Name", placeholder: "e.g. John", type: "text", value: profileData?.firstName || "" },
                                    { name: "lastName", label: "Last Name", placeholder: "e.g. Doe", type: "text", value: profileData?.lastName || "" },
                                    { name: "displayName", label: "Display Name", placeholder: "johndoe_admin", type: "text", value: profileData?.displayName || "" },
                                ].map((field) => (
                                    <div key={field.label} className="flex flex-col gap-y-1.5">
                                        <label className="text-sm font-medium text-slate-700">{field.label}</label>
                                        <input
                                            name={field.name}
                                            type={field.type}
                                            value={field.value}
                                            className="h-11 w-full rounded-lg border border-slate-200 bg-slate-50/30 px-4 text-sm focus:outline-none focus:ring-1 focus:ring-main-primary/20 focus:border-main-primary transition-all"
                                            placeholder={field.placeholder}
                                            onChange={handleChange}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Security Section */}
                    <div className="xl:col-span-5 pb-10 lg:pb-0">
                        <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 sticky top-0">
                            <div className="flex items-center gap-x-2 mb-6">
                                <ShieldCheck className="w-5 h-5 text-slate-400" />
                                <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400">Security</h2>
                            </div>

                            <div className="space-y-5">
                                {[
                                    { label: "New Password", name: "newPassword" as PasswordFieldName, value: passwordData.newPassword },
                                    { label: "Confirm New Password", name: "confirmNewPassword" as PasswordFieldName, value: passwordData.confirmNewPassword },
                                ].map((field) => {
                                    // Check if this specific field is currently toggled to visible
                                    const isVisible = isShowPassword[field.name];

                                    // Pick the right icon component dynamically
                                    const IconComponent = isVisible ? EyeOff : Eye;

                                    return (
                                        <div key={field.label} className="flex flex-col gap-y-1.5">
                                            <label className="text-sm font-medium text-slate-700">{field.label}</label>

                                            <div className="relative w-full">
                                                <input
                                                    name={field.name}
                                                    value={field.value}
                                                    onChange={(e) => {
                                                        setPasswordData({ ...passwordData, [field.name]: e.target.value });
                                                    }}
                                                    // Dynamically changes from "password" to "text"
                                                    type={isVisible ? "text" : "password"}
                                                    className="h-11 w-full rounded-lg border border-slate-200 bg-white pl-4 pr-10 text-xs focus:outline-none focus:ring-1 focus:ring-main-primary/20 focus:border-main-primary transition-all"
                                                    placeholder="••••••••••••"
                                                />

                                                <IconComponent
                                                    onClick={() => {
                                                        // Toggles the specific field name boolean directly
                                                        setIsShowPassword(prev => ({ ...prev, [field.name]: !prev[field.name] }));
                                                    }}
                                                    className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 opacity-50 cursor-pointer hover:opacity-80 transition-opacity"
                                                />
                                            </div>
                                        </div>
                                    );
                                })}

                                {/* OTP INPUT */}
                                {otpRequested && (
                                    <>
                                        <div className="flex justify-between items-center gap-1 lg:gap-2" onPaste={handlePaste}>
                                            {otp.map((digit, index) => (
                                                <input
                                                    key={index}
                                                    ref={(el) => { if (el) inputRefs.current[index] = el; }}
                                                    type="text"
                                                    inputMode="numeric"
                                                    pattern="[0-9]*"
                                                    maxLength={1}
                                                    value={digit}
                                                    onChange={(e) => handleOTPChange(e.target, index)}
                                                    onKeyDown={(e) => handleKeyDown(e, index)}
                                                    className="h-9 md:h-16 xl:h-12 w-1/2 text-center lg:text-xl font-black bg-black/5 border border-main-primary/10 rounded lg:rounded-xl outline-none transition-all text-[#034460] focus:bg-white focus:border-[#034460] focus:ring-4 focus:ring-main-primary/5 shadow-sm"
                                                />
                                            ))}
                                        </div>

                                        <div>
                                            <motion.button
                                                type="submit"
                                                whileHover={otp.join("").length === 6 && !isUpdatingPassword ? { scale: 1.01, backgroundColor: "#ffb732" } : {}}
                                                whileTap={otp.join("").length === 6 && !isUpdatingPassword ? { scale: 0.99 } : {}}
                                                disabled={otp.join("").length < 6 || isUpdatingPassword}
                                                onClick={handleChangePassword}
                                                className="h-12 w-full bg-[#ffa800] text-[#034460] font-black uppercase tracking-widest text-xs rounded-2xl flex items-center justify-center gap-3 transition-all shadow-lg shadow-[#ffa800]/10 disabled:opacity-40 disabled:cursor-not-allowed"
                                            >
                                                {isUpdatingPassword ? (
                                                    <Loader2 className="w-5 h-5 animate-spin" />
                                                ) : (
                                                    <>
                                                        <ShieldCheck className="w-4 h-4" />
                                                        Change Password
                                                    </>
                                                )}
                                            </motion.button>
                                        </div>
                                    </>
                                )}


                                <div className="text-center">
                                    {resendCountdown > 0 ? (
                                        <p className="text-[11px] text-black/40 font-medium">
                                            Resend secure code in <span className="font-bold text-[#034460]">{resendCountdown}s</span>
                                        </p>
                                    ) : (
                                        <button
                                            type="button"
                                            onClick={handleRequestOTP}
                                            className="w-full mt-2 text-sm text-blue-600 font-medium hover:text-blue-700 underline underline-offset-4 cursor-pointer flex items-center justify-center gap-x-2"
                                        >
                                            <RefreshCw
                                                className={`w-3 h-3 ${isRequestingOTP ? "animate-spin" : ""}`}
                                            />

                                            {otpRequested ? "Request New OTP" : isRequestingOTP ? "Requesting OTP..." : "Request OTP"}
                                        </button>
                                    )}

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>

    );
}
