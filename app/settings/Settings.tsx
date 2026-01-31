import { UserRound, ShieldCheck, Camera } from "lucide-react";

export default function Settings() {
    return (
        <div className="max-w-5xl mx-auto bg-white p-8 lg:p-12">
            {/* Header */}
            <div className="flex items-center justify-between border-b pb-6 mb-10">
                <div className="flex items-center gap-x-3">
                    <div className="bg-blue-50 p-2 rounded-lg">
                        <UserRound className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                        <h1 className="text-xl font-semibold text-slate-900">Account Settings</h1>
                        <p className="text-sm text-slate-500">Manage your profile and security preferences</p>
                    </div>
                </div>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg text-sm font-medium transition-all">
                    Save Changes
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                {/* Profile Section */}
                <div className="lg:col-span-7 space-y-8">
                    <div>
                        <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-6">Profile Information</h2>
                        
                        {/* Avatar Upload */}
                        <div className="flex items-center gap-x-6 mb-8 group">
                            <div className="relative w-24 h-24">
                                <img src="/author.png" alt="avatar" className="h-full w-full rounded-2xl object-cover border-2 border-slate-100" />
                                <button className="absolute -bottom-2 -right-2 bg-white shadow-md border p-1.5 rounded-full hover:bg-slate-50 transition-colors">
                                    <Camera className="w-4 h-4 text-slate-600" />
                                </button>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-slate-700">Profile Picture</p>
                                <p className="text-xs text-slate-500 mt-1">JPG, GIF or PNG. Max size of 2MB</p>
                            </div>
                        </div>

                        {/* Form Fields */}
                        <div className="grid grid-cols-1 gap-y-5">
                            {[
                                { label: "Full Name", placeholder: "e.g. John Doe", type: "text" },
                                { label: "Display Name", placeholder: "johndoe_shipping", type: "text" },
                                { label: "Email Address", placeholder: "john@example.com", type: "email" },
                                { label: "Office Location", placeholder: "Lagos, Nigeria", type: "text" },
                            ].map((field) => (
                                <div key={field.label} className="flex flex-col gap-y-1.5">
                                    <label className="text-sm font-medium text-slate-700">{field.label}</label>
                                    <input 
                                        type={field.type} 
                                        className="h-11 w-full rounded-lg border border-slate-200 bg-slate-50/30 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" 
                                        placeholder={field.placeholder} 
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Security Section */}
                <div className="lg:col-span-5">
                    <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
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
                                        className="h-11 w-full rounded-lg border border-slate-200 bg-white px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" 
                                        placeholder="••••••••••••" 
                                    />
                                </div>
                            ))}
                            <button className="w-full mt-2 text-sm text-blue-600 font-medium hover:text-blue-700 underline underline-offset-4">
                                Enable Two-Factor Auth
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
