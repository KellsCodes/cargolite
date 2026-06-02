"use client"

import { Camera, Edit3, MapPin, Mail, Phone, Briefcase, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { UserProfileDataUpdate, UserProfileResponse } from "../types/profile";
import { toast } from "react-toastify";
import { ProfileAPI } from "@/lib/api/profile";
import { AnimateSpin } from "../components/AnimateSpin";
import { ActionModal } from "../components/ActionModal";
import { ProfileEditForm } from "./ProfileEditForm";

export default function Profile() {
    const [profileData, setProfileData] = useState<UserProfileResponse | null>(null);
    const [isLoading, setIsLoading] = useState(false)
    const [updatedData, setUpdatedData] = useState<UserProfileDataUpdate | null>(null)
    const [isUpdating, setIsUpdating] = useState(false)
    const [isUpdatingImg, setIsUpdatingImg] = useState(false)
    const [profileUpdateSection, setProfileUpdateSection] = useState<"personal" | "address" | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)

    const handleGetProfile = async () => {
        if (profileData) return; // Avoid refetching if data already exists
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
            if (cleanedData.profileImage) {
                toast.success("Profile image updated successfully")
                setIsUpdatingImg(false)
            } else {
                toast.success("Profile updated successfully")
            }
        } catch (error) {
            toast.error("Error updating profile")
        } finally {
            setIsUpdating(false)
            setIsUpdatingImg(false)
            setProfileUpdateSection(null)
            if (isModalOpen) {
                setTimeout(() => {
                    setIsModalOpen(false)
                }, 5000)
            }
        }
    }

    useEffect(() => {
        handleGetProfile()
    }, [])

    useEffect(() => {
        if (isUpdatingImg) {
            handleSaveChanges()
        }
    }, [isUpdatingImg])


    return (
        <>
            {isLoading || !profileData ? (
                <div className="h-64 text-center">
                    <div className="h-full flex flex-col items-center justify-center gap-2">
                        <AnimateSpin />
                        <span className="text-sm">Loading profile...</span>
                    </div>
                </div>
            ) : (
                <div className="space-y-4 pb-32 xl:pb-0">
                    {/* Top Identity Card */}
                    <div className="relative overflow-hidden bg-white border border-slate-200 rounded-2xl shadow-sm">
                        {/* Decorative Banner */}
                        <div className="h-24 bg-gradient-to-r from-main-primary to-main-primary/80" />

                        {/* Content Wrapper - row on desktop, centered column on mobile */}
                        <div className="px-6 md:px-10 pb-6 md:pb-8 flex flex-col md:flex-row items-center md:items-end gap-y-4 md:gap-x-6 -mt-16 md:-mt-10">

                            {/* Avatar Container */}
                            <div className="relative group shrink-0">
                                <div className="w-28 h-28 md:w-32 md:h-32 rounded-2xl border-4 border-white bg-white shadow-lg overflow-hidden">
                                    <img
                                        src={!profileData?.profileImage ? "/author.png" : typeof profileData.profileImage === "string" ? profileData.profileImage : URL.createObjectURL(profileData.profileImage)}
                                        alt="avatar"
                                        className="h-full w-full object-cover transition group-hover:scale-105"
                                    />
                                </div>
                                <label
                                    className={`absolute bottom-2 right-2 bg-white shadow-xl border border-slate-100 p-2 rounded-xl hover:text-blue-600 transition-all
                                            ${isUpdating && profileData && typeof profileData.profileImage === "object"
                                            ? 'opacity-70 cursor-not-allowed'
                                            : 'hover:bg-slate-50 cursor-pointer'
                                        }`}
                                >
                                    {isUpdating && profileData && typeof profileData.profileImage === "object" ? (
                                        <Loader2 className="w-4 h-4 text-slate-600 animate-spin" />
                                    ) : (
                                        <Camera className="w-5 h-5" />
                                    )}
                                    <input
                                        type="file"
                                        disabled={isUpdating}
                                        accept="image/webp, image/jpeg, image/png"
                                        className="hidden"
                                        onChange={async (e) => {
                                            const file = e.target.files?.[0];
                                            if (!file) return;

                                            const isValidType = ['image/webp', 'image/jpeg', 'image/png'].includes(file.type);
                                            const isValidSize = file.size <= 1 * 1024 * 1024;

                                            if (!isValidType || !isValidSize) {
                                                toast.error("Invalid image. Must be PNG/JPEG/WebP and under 1MB.");
                                                return;
                                            }

                                            try {
                                                setProfileData((prev) => {
                                                    if (!prev) return prev
                                                    return { ...prev, profileImage: file }
                                                });
                                                setUpdatedData((prev) => {
                                                    if (!prev) return { profileImage: file }
                                                    return { ...prev, profileImage: file }
                                                });
                                                setIsUpdatingImg(true);
                                            } catch (error) {
                                                console.error("Upload failed:", error);
                                                alert("Failed to upload image. Please try again.");
                                            } finally {
                                                e.target.value = '';
                                            }
                                        }}
                                    />
                                </label>
                            </div>

                            {/* Text Details Container */}
                            <div className="pb-2 text-center md:text-left w-full md:w-auto">
                                <h2 className="text-xl md:text-2xl font-bold text-slate-900">
                                    {`${profileData?.firstName} ${profileData?.lastName}`}
                                </h2>
                                <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-4 gap-y-1 mt-1 text-sm text-slate-500">
                                    <span className="flex items-center gap-1"><Briefcase className="w-3.5 h-3.5" /> Admin</span>
                                    <span className="flex items-center gap-1">
                                        <MapPin className="w-3.5 h-3.5" />
                                        {profileData?.city || "Not available"}{profileData?.region ? `, ${profileData.region}` : ""}
                                    </span>
                                </div>
                            </div>

                        </div>
                    </div>


                    {/* Information Sections */}
                    <div className="grid grid-cols-1 gap-4">
                        {/* Personal Info Card */}
                        <section className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
                            <div className="px-8 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                                <h3 className="font-semibold text-slate-800">Personal Information</h3>
                                <button
                                    onClick={() => {
                                        setProfileUpdateSection("personal")
                                        setIsModalOpen(true)
                                    }}
                                    className="cursor-pointer flex items-center gap-2 text-sm font-medium text-blue-600 hover:bg-blue-50 px-3 py-1.5 rounded-lg transition"
                                >
                                    <Edit3 className="w-4 h-4" /> Edit
                                </button>
                            </div>

                            <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-8 gap-x-12">
                                <InfoItem label="Full Name" value={`${profileData?.firstName} ${profileData?.lastName}`} />
                                <InfoItem label="Display Name" value={profileData?.displayName || "Not available"} />
                                <InfoItem label="Email Address" value={profileData.user.email || "Not available"} icon={<Mail className="w-3 h-3" />} />
                                <InfoItem label="Phone Number" value={profileData.telephone || "Not available"} icon={<Phone className="w-3 h-3" />} />
                                <InfoItem label="User Role" value="Administrator" isTag />
                            </div>
                        </section>

                        {/* Address Card */}
                        <section className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
                            <div className="px-8 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                                <h3 className="font-semibold text-slate-800">Office Address</h3>
                                <button
                                    onClick={() => {
                                        setProfileUpdateSection("address")
                                        setIsModalOpen(true)
                                    }}
                                    className="cursor-pointer flex items-center gap-2 text-sm font-medium text-blue-600 hover:bg-blue-50 px-3 py-1.5 rounded-lg transition"
                                >
                                    <Edit3 className="w-4 h-4" /> Edit
                                </button>
                            </div>

                            <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                                <InfoItem label="Country" value={profileData.region || "Not available"} />
                                <InfoItem label="City" value={profileData.city || "Not available"} />
                                <InfoItem label="Postal Code" value={profileData.postalCode || "Not available"} />
                            </div>
                        </section>
                    </div>
                </div>)}

            {/* MODAL */}
            {isModalOpen && profileData && profileUpdateSection && (
                <ActionModal
                    title={`Edit ${profileUpdateSection === "personal" ? "Personal Profile" : "Office Address"}`}
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    isLocked={profileUpdateSection && isUpdating}
                >
                    <ProfileEditForm
                        section={profileUpdateSection}
                        initialData={{
                            firstName: profileData.firstName,
                            lastName: profileData.lastName,
                            displayName: profileData.displayName || undefined,
                            telephone: profileData.telephone,
                            region: profileData.region,
                            city: profileData.city || undefined,
                            postalCode: profileData.postalCode || undefined,
                        }}
                        setUpdatedData={setUpdatedData}
                        onClose={() => setIsModalOpen(false)}
                        onSave={handleSaveChanges}
                    />
                </ActionModal>
            )}

        </>
    );
}

// Define an interface for the props
interface InfoItemProps {
    label: string;
    value: string;
    icon?: React.ReactNode;
    isTag?: boolean;
}

// Apply the interface to the component
function InfoItem({ label, value, icon, isTag }: InfoItemProps) {
    return (
        <div className="space-y-1.5">
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                {label}
            </p>
            {isTag ? (
                <span className="inline-flex px-2 py-0.5 rounded-md text-[11px] font-semibold bg-blue-50 text-blue-700 border border-blue-100">
                    {value}
                </span>
            ) : (
                <div className="flex items-center gap-2">
                    {icon && <span className="text-slate-400">{icon}</span>}
                    <p className="text-sm font-semibold text-slate-700">{value}</p>
                </div>
            )}
        </div>
    );
}

