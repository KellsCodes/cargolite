import { Search, LifeBuoy, BookOpen, MessageCircle, FileText, ArrowRight, Mail, Phone } from "lucide-react";

export default function SupportContent() {
    return (
        <div className="space-y-10 pb-10">
            {/* Search Section */}
            <div className="bg-blue-600 rounded-2xl p-8 text-white relative overflow-hidden shadow-lg">
                <div className="relative z-10 space-y-4 max-w-lg">
                    <h2 className="text-xl font-semibold">How can we help you today?</h2>
                    <div className="relative">
                        <Search className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search for articles, tracking info..."
                            className="w-full bg-white text-slate-900 h-11 pl-10 pr-4 rounded-xl border-none focus:ring-2 focus:ring-blue-300 transition-all text-sm"
                        />
                    </div>
                </div>
                <LifeBuoy className="absolute -right-8 -bottom-8 w-48 h-48 text-white/10 rotate-12" />
            </div>

            {/* Knowledge Base Categories */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                    { title: "Getting Started", icon: <BookOpen className="text-blue-600" />, desc: "New to the platform? Start here." },
                    { title: "Shipping & Labels", icon: <FileText className="text-orange-600" />, desc: "Everything about creating and printing." },
                    { title: "Tracking & Claims", icon: <Search className="text-green-600" />, desc: "Resolve issues with lost or delayed packages." },
                    { title: "Billing & Plans", icon: <MessageCircle className="text-purple-600" />, desc: "Manage your invoices and subscriptions." },
                ].map((cat) => (
                    <div key={cat.title} className="group p-6 bg-white border border-slate-200 rounded-2xl hover:border-blue-300 hover:shadow-md transition-all cursor-pointer">
                        <div className="flex items-start justify-between">
                            <div className="space-y-3">
                                <div className="p-2 bg-slate-50 rounded-lg w-fit">{cat.icon}</div>
                                <h3 className="font-bold text-slate-900">{cat.title}</h3>
                                <p className="text-sm text-slate-500 leading-relaxed">{cat.desc}</p>
                            </div>
                            <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-blue-500 transition-colors" />
                        </div>
                    </div>
                ))}
            </div>

            {/* Direct Contact Section */}
            <div className="bg-slate-900 rounded-2xl p-8 text-white flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="space-y-2 text-center md:text-left">
                    <h3 className="text-lg font-bold">Still need help?</h3>
                    <p className="text-slate-400 text-sm">Our support team is available 24/7 for premium members.</p>
                </div>
                <div className="flex flex-wrap justify-center gap-4">
                    <button className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-6 py-2.5 rounded-xl text-sm font-medium transition-all">
                        <Mail className="w-4 h-4" /> Email Support
                    </button>
                    <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-6 py-2.5 rounded-xl text-sm font-medium shadow-lg shadow-blue-900/20 transition-all">
                        <Phone className="w-4 h-4" /> Call Agent
                    </button>
                </div>
            </div>
        </div>
    );
}
