import {
    Ticket,
    ShieldAlert,
    MessageSquareMore,
    ChevronRight,
    Search
} from "lucide-react";

export default function AdminSupportContent() {
    return (
        <div className="space-y-8 pb-0">
            {/* System Status Banner (Critical for Admins) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <StatusCard label="Active Support Tickets" value="14" status="Warning" color="text-amber-600" />
                <StatusCard label="API System Status" value="Operational" status="Healthy" color="text-emerald-600" />
                <StatusCard label="Avg. Resolution Time" value="2.4 hrs" status="Stable" color="text-blue-600" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left: Active Ticket Queue */}
                <div className="lg:col-span-8 space-y-6">
                    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
                        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                            <h3 className="font-bold text-slate-800 flex items-center gap-2">
                                <Ticket className="w-4 h-4 text-blue-500" /> Recent Tickets
                            </h3>
                            <div className="relative">
                                <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-400" />
                                <input type="text" placeholder="Search Ticket..." className="pl-8 h-8 w-48 text-xs border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500" />
                            </div>
                        </div>

                        <div className="divide-y divide-slate-50">
                            {[
                                { id: "#TK-882", user: "John Logi", subject: "Label API Timeout", priority: "High" },
                                { id: "#TK-881", user: "Sarah Express", subject: "Warehouse Sync Issue", priority: "Med" },
                                { id: "#TK-880", user: "Fleet Manager", subject: "New Driver Verification", priority: "Low" },
                            ].map((ticket) => (
                                <div key={ticket.id} className="p-4 hover:bg-slate-50 transition-colors flex items-center justify-between cursor-pointer">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center font-bold text-slate-400 text-xs">{ticket.priority[0]}</div>
                                        <div>
                                            <p className="text-sm font-semibold text-slate-900">{ticket.subject}</p>
                                            <p className="text-xs text-slate-500">{ticket.user} • {ticket.id}</p>
                                        </div>
                                    </div>
                                    <ChevronRight className="w-4 h-4 text-slate-300" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right: Quick Admin Links */}
                <div className="lg:col-span-4 space-y-6">
                    <section className="bg-slate-900 text-white p-6 rounded-2xl shadow-lg">
                        <h4 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-4">Direct Channels</h4>
                        <div className="space-y-4">
                            <button className="w-full flex items-center gap-3 p-3 bg-white/5 hover:bg-white/10 rounded-xl transition text-left text-sm">
                                <MessageSquareMore className="w-4 h-4 text-blue-400" /> Chat with Tech Support
                            </button>
                            <button className="w-full flex items-center gap-3 p-3 bg-white/5 hover:bg-white/10 rounded-xl transition text-left text-sm">
                                <ShieldAlert className="w-4 h-4 text-rose-400" /> Report Security Breach
                            </button>
                        </div>
                    </section>

                    <div className="p-6 border border-dashed border-slate-300 rounded-2xl">
                        <h4 className="text-xs font-bold text-slate-500 mb-3">ADMIN RESOURCES</h4>
                        <ul className="text-xs space-y-3 text-slate-600 font-medium">
                            <li className="hover:text-blue-600 cursor-pointer">API Integration Documentation</li>
                            <li className="hover:text-blue-600 cursor-pointer">Shipping Carrier Rate-Limits</li>
                            <li className="hover:text-blue-600 cursor-pointer">Server Error Logs</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Sub-component for Admin Metrics
function StatusCard({ label, value, status, color }: { label: string, value: string, status: string, color: string }) {
    return (
        <div className="bg-white p-5 border border-slate-200 rounded-2xl shadow-sm">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-tight">{label}</p>
            <div className="flex items-end justify-between mt-2">
                <h3 className={`text-xl font-bold ${color}`}>{value}</h3>
                <span className="text-[10px] font-bold px-2 py-0.5 bg-slate-100 text-slate-500 rounded-full">{status}</span>
            </div>
        </div>
    );
}
