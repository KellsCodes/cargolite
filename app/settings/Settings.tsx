"use client"

import { ProfileAPI } from "@/lib/api/profile";
import { UserRound, ShieldCheck, Camera, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { UserProfileDataUpdate, UserProfileResponse } from "../types/profile";
import { toast } from "react-toastify";
import { AnimateSpin } from "../components/AnimateSpin";

export default function Settings() {
    const [profileData, setProfileData] = useState<UserProfileResponse | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [updatedData, setUpdatedData] = useState<UserProfileDataUpdate | null>(null)
    const [isUpdating, setIsUpdating] = useState(false)

    const handleGetProfile = async () => {
        if (isLoading) return
        setIsLoading(true)
        try {
            const res = await ProfileAPI.getUserProfile()
            console.log(res.data)
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

    useEffect(() => {
        handleGetProfile()
    }, [])

    return (
        <div className="max-w-5xl mx-auto bg-white p-8 lg:p-12 h-screen flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between border-b pb-6 mb-10 shrink-0">
                <div className="flex items-center gap-x-3">
                    <div className="bg-blue-50 p-2 rounded-lg">
                        <UserRound className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                        <h1 className="text-xl font-semibold text-slate-900">Account Settings</h1>
                        <p className="hidden md:inline-block text-sm text-slate-500">Manage your profile and security preferences</p>
                    </div>
                </div>
                <button
                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg text-sm font-medium transition-all"
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
                <div className="grid grid-cols-1 xl:grid-cols-12 gap-16 overflow-y-auto md:max-h-[calc(100vh-240px)] pr-2 pb-46 xl:pb-0">
                    {/* Profile Section */}
                    <div className="xl:col-span-7 space-y-8">
                        <div>
                            <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-6">Profile Information</h2>

                            {/* Avatar Upload */}
                            <div className="flex items-center gap-x-6 mb-8 group">
                                <div className="relative w-24 h-24">
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
                    <div className="xl:col-span-5">
                        <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 sticky top-0">
                            <div className="flex items-center gap-x-2 mb-6">
                                <ShieldCheck className="w-5 h-5 text-slate-400" />
                                <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400">Security</h2>
                            </div>

                            <div className="space-y-5">
                                {[
                                    { label: "Current Password" },
                                    { label: "New Password" },
                                    { label: "Confirm New Password" },
                                ].map((field) => (
                                    <div key={field.label} className="flex flex-col gap-y-1.5">
                                        <label className="text-sm font-medium text-slate-700">{field.label}</label>
                                        <input
                                            type="password"
                                            className="h-11 w-full rounded-lg border border-slate-200 bg-white px-4 text-sm focus:outline-none focus:ring-1 focus:ring-main-primary/20 focus:border-main-primary transition-all"
                                            placeholder="••••••••••••"
                                        />
                                    </div>
                                ))}
                                <button className="w-full mt-2 text-sm text-blue-600 font-medium hover:text-blue-700 underlinee underline-offset-4 cursor-pointer">
                                    Change Password
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>

    );
}
