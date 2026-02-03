import { Info, Search } from "lucide-react";
import Link from "next/link";

export default function TrackingParcel({ trackError }: { trackError: boolean }) {
    return (
        <div
            className="relative w-full rounded-[2.5rem] overflow-hidden bg-slate-900 px-6 py-20 flex flex-col items-center text-center shadow-2xl shadow-blue-900/20"
            style={{
                backgroundImage: `linear-gradient(to bottom, rgba(3, 68, 96, 0.8), rgba(3, 68, 96, 0.95)), url(/banner.png)`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            {/* Subtle Decorative Element */}
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.15),transparent)] pointer-events-none" />

            <div className="relative z-10 max-w-2xl w-full space-y-8">
                {/* Header Section */}
                <div className="space-y-4">
                    <span className="inline-flex items-center gap-x-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-[10px] font-bold uppercase tracking-widest">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                        Live Carrier Sync
                    </span>
                    <h1 className="text-4xl lg:text-5xl font-black text-white tracking-tight">
                        Track Your Shipment
                    </h1>
                    <p className="text-blue-100/70 text-lg lg:text-xl font-medium leading-relaxed">
                        Get real-time updates on your package location, estimated delivery, and current status instantly.
                    </p>
                </div>

                {/* Search Bar Section */}
                <div className="space-y-4">
                    <div className="relative group max-w-xl mx-auto">
                        <div className="absolute inset-0 bg-blue-500/20 rounded-2xl blur-xl group-focus-within:bg-blue-500/30 transition-all duration-500" />

                        <div className="relative flex flex-col md:flex-row items-center gap-3 p-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-inner">
                            <div className="relative flex-1 w-full">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-300/50" />
                                <input
                                    type="text"
                                    className="h-14 w-full bg-transparent pl-12 pr-4 text-white placeholder:text-blue-100/40 focus:outline-none font-medium text-base"
                                    placeholder="Enter tracking ID (e.g., EDF123456789)"
                                />
                            </div>
                            <button className="h-14 w-full md:w-44 bg-white hover:bg-blue-50 text-slate-900 rounded-xl font-bold text-sm transition-all shadow-lg active:scale-95 cursor-pointer">
                                Track Parcel
                            </button>
                        </div>
                    </div>

                    {/* Helper/Error Messaging */}
                    <div className="min-h-[24px]">
                        {!trackError ? (
                            <p className="flex items-center justify-center gap-2 text-blue-100/60 text-xs font-semibold uppercase tracking-tight">
                                <Info className="w-3.5 h-3.5" />
                                Ready to track?
                                <Link href="/contact-us" className="text-blue-300 hover:text-blue-200 underline underline-offset-4 decoration-blue-500/30">
                                    Contact Support
                                </Link>
                            </p>
                        ) : (
                            <div className="flex items-center justify-center gap-2 text-rose-300 text-xs font-bold animate-in fade-in slide-in-from-top-2 duration-300">
                                <div className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                                Tracking ID not recognized. Please allow 24 hours for system sync.
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Quick Stats/Trust Indicators */}
            {/* <div className="mt-12 flex items-center gap-x-8 opacity-40 grayscale group-hover:grayscale-0 transition-all">
                <p className="text-[10px] font-black text-white uppercase tracking-[0.2em]">Trusted by Global Carriers:</p>
                <div className="flex gap-x-4 text-white font-bold text-xs">
                    <span>FEDEX</span>
                    <span>DHL</span>
                    <span>UPS</span>
                </div>
            </div> */}
        </div>
    );
}