import React, { useState } from 'react';
import { Loader2, User, Phone, Globe, Building, Hash } from 'lucide-react';

// Explicitly type the incoming component properties
interface ProfileEditFormProps {
    section: "personal" | "address";
    initialData: {
        firstName: string;
        lastName: string;
        displayName?: string;
        telephone?: string;
        region?: string; // used for country
        city?: string;
        postalCode?: string;
    };
    setUpdatedData: React.Dispatch<React.SetStateAction<any>>;
    onClose: () => void;
    onSave: () => Promise<void>;
}

export const ProfileEditForm: React.FC<ProfileEditFormProps> = ({
    section,
    initialData,
    setUpdatedData,
    onClose,
    onSave,
}) => {
    const [formData, setFormData] = useState({ ...initialData });
    const [isSaving, setIsSaving] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setUpdatedData((prev: any) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        try {
            await onSave();
        } catch (error) {
            console.error("Failed to update section:", error);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col h-full space-y-6 p-6">
            {/* Scrollable Content Area Box */}
            <div className="space-y-5 max-h-[60vh] overflow-y-auto px-1">
                {section === "personal" ? (
                    <div className="space-y-5">
                        <div className="flex flex-col gap-y-1.5">
                            <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">First Name</label>
                            <input
                                required
                                type="text"
                                name="firstName"
                                value={formData.firstName || ""}
                                onChange={handleChange}
                                className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm focus:outline-none focus:ring-1 focus:ring-main-primary/10 focus:border-main-primary transition-all"
                            />
                        </div>

                        <div className="flex flex-col gap-y-1.5">
                            <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Last Name</label>
                            <input
                                required
                                type="text"
                                name="lastName"
                                value={formData.lastName || ""}
                                onChange={handleChange}
                                className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm focus:outline-none focus:ring-1 focus:ring-main-primary/10 focus:border-main-primary transition-all"
                            />
                        </div>

                        <div className="flex flex-col gap-y-1.5 sm:col-span-2">
                            <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Display Name</label>
                            <div className="relative w-full">
                                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <input
                                    type="text"
                                    name="displayName"
                                    value={formData.displayName || ""}
                                    onChange={handleChange}
                                    className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-main-primary/10 focus:border-main-primary transition-all"
                                    placeholder="Your username"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-y-1.5 sm:col-span-2">
                            <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Phone Number</label>
                            <div className="relative w-full">
                                <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <input
                                    type="tel"
                                    name="telephone"
                                    value={formData.telephone || ""}
                                    onChange={handleChange}
                                    className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-main-primary/10 focus:border-main-primary transition-all"
                                    placeholder="+1 (555) 000-0000"
                                />
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-y-1.5 sm:col-span-2">
                            <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Country / Region</label>
                            <div className="relative w-full">
                                <Globe className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <input
                                    required
                                    type="text"
                                    name="region"
                                    value={formData.region || ""}
                                    onChange={handleChange}
                                    className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-main-primary/10 focus:border-main-primary transition-all"
                                    placeholder="United States"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-y-1.5">
                            <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">City</label>
                            <div className="relative w-full">
                                <Building className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <input
                                    required
                                    type="text"
                                    name="city"
                                    value={formData.city || ""}
                                    onChange={handleChange}
                                    className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-main-primary/10 focus:border-main-primary transition-all"
                                    placeholder="New York"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-y-1.5">
                            <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Postal Code</label>
                            <div className="relative w-full">
                                <Hash className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <input
                                    required
                                    type="text"
                                    name="postalCode"
                                    value={formData.postalCode || ""}
                                    onChange={handleChange}
                                    className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-main-primary/10 focus:border-main-primary transition-all"
                                    placeholder="10001"
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Sticky Action Footer Buttons */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 bg-white mt-auto">
                <button
                    type="button"
                    onClick={onClose}
                    disabled={isSaving}
                    className="h-11 px-5 rounded-xl border border-slate-200 font-medium text-slate-600 hover:bg-slate-50 transition text-sm cursor-pointer disabled:opacity-50"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={isSaving}
                    className="h-11 px-6 rounded-xl bg-main-primary hover:bg-main-primary/70 font-medium text-white transition text-sm flex items-center justify-center gap-2 min-w-[100px] cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    {isSaving ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                        "Save Changes"
                    )}
                </button>
            </div>
        </form>
    );
};
