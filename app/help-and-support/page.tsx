import AuthLayout from "../components/AuthLayout";
import AdminSupportContent from "./AdminSupportContent";
import { LifeBuoy, Plus } from "lucide-react";
// import SupportContent from "./SupportContent";

export default function AdminSupportPage() {
    return (
        <AuthLayout>
            <div className="max-w-6xl mx-auto h-[calc(90vh-40px)] flex flex-col space-y-6 overflow-hidden p-6">
                {/* Admin Header */}
                <div className="flex items-center justify-between shrink-0">
                    <div className="flex items-center gap-x-3">
                        <div className="bg-slate-900 p-2 rounded-lg">
                            <LifeBuoy className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-slate-900">System Support Hub</h1>
                            <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mt-0.5">Admin Management Console</p>
                        </div>
                    </div>
                    <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all shadow-sm shadow-blue-200">
                        <Plus className="w-4 h-4" /> Create Internal Ticket
                    </button>
                </div>

                {/* Scrollable Support Console */}
                <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                    {/* <SupportContent /> */}
                    <AdminSupportContent />
                </div>
            </div>
        </AuthLayout>
    );
}
