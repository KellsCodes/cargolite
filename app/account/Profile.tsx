import { Camera, Edit3, MapPin, Mail, Phone, Briefcase } from "lucide-react";

export default function Profile() {
    return (
        <div className="space-y-6">
            {/* Top Identity Card */}
            <div className="relative overflow-hidden bg-white border border-slate-200 rounded-2xl shadow-sm">
                <div className="h-24 bg-gradient-to-r from-main-primary to-main-primary/80" /> {/* Decorative Banner */}
                <div className="px-10 pb-8 flex items-end gap-x-6 -mt-10">
                    <div className="relative group">
                        <div className="w-32 h-32 rounded-2xl border-4 border-white bg-white shadow-lg overflow-hidden">
                            <img src="/author.png" alt="avatar" className="h-full w-full object-cover transition group-hover:scale-105" />
                        </div>
                        <button className="absolute bottom-2 right-2 bg-white shadow-xl border border-slate-100 p-2 rounded-xl hover:text-blue-600 transition-all">
                            <Camera className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="pb-2">
                        <h2 className="text-2xl font-bold text-slate-900">Joshua Nikeldon</h2>
                        <div className="flex items-center gap-x-4 mt-1 text-sm text-slate-500">
                            <span className="flex items-center gap-1"><Briefcase className="w-3.5 h-3.5" /> Admin</span>
                            <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> Leeds, UK</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Information Sections */}
            <div className="grid grid-cols-1 gap-8">
                {/* Personal Info Card */}
                <section className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
                    <div className="px-8 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                        <h3 className="font-semibold text-slate-800">Personal Information</h3>
                        <button className="flex items-center gap-2 text-sm font-medium text-blue-600 hover:bg-blue-50 px-3 py-1.5 rounded-lg transition">
                            <Edit3 className="w-4 h-4" /> Edit
                        </button>
                    </div>

                    <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-8 gap-x-12">
                        <InfoItem label="Full Name" value="Joshua Nikeldon" />
                        <InfoItem label="Display Name" value="Joshua Nik" />
                        <InfoItem label="Email Address" value="info@cargolite.com" icon={<Mail className="w-3 h-3" />} />
                        <InfoItem label="Phone Number" value="(+62) 821 2554-2551" icon={<Phone className="w-3 h-3" />} />
                        <InfoItem label="User Role" value="Administrator" isTag />
                    </div>
                </section>

                {/* Address Card */}
                <section className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
                    <div className="px-8 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                        <h3 className="font-semibold text-slate-800">Office Address</h3>
                        <button className="flex items-center gap-2 text-sm font-medium text-blue-600 hover:bg-blue-50 px-3 py-1.5 rounded-lg transition">
                            <Edit3 className="w-4 h-4" /> Edit
                        </button>
                    </div>

                    <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                        <InfoItem label="Country" value="United Kingdom" />
                        <InfoItem label="City" value="Leeds, East London" />
                        <InfoItem label="Postal Code" value="ERT 1254" />
                    </div>
                </section>
            </div>
        </div>
    );
}

// 1. Define an interface for the props
interface InfoItemProps {
    label: string;
    value: string;
    icon?: React.ReactNode; // Optional prop
    isTag?: boolean;        // Optional prop
}

// 2. Apply the interface to the component
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

