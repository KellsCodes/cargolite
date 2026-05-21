import React, { useState } from "react";
import { Mail, AlertCircle, Send, CheckCircle2, Archive, CornerUpLeft, MessageSquare, Eye } from "lucide-react";
import { AdminReplyProps, MessageStatus } from "./types";
import { toast } from "react-toastify";

type ViewMode = "read" | "reply" | "readReply";
interface AdminReplyCardProps {
    message: {
        id: number;
        senderEmail: string;
        senderName: string;
        subject: string;
        body: string;
        messageStatus: MessageStatus | string | number; // 1=unread, 2=read, 3=replied, 4=archived
    };
    adminReply: AdminReplyProps | null;
    mode?: ViewMode; // Override prop to set default layout on open
    setMode: React.Dispatch<React.SetStateAction<ViewMode>>;
    onClose: () => void;
    onSendReply?: (messageId: number, body: string) => Promise<void>;
}

export const AdminReplyCard: React.FC<AdminReplyCardProps> = ({
    message,
    adminReply,
    mode = "read",
    setMode,
    onClose,
    onSendReply
}) => {
    const [emailBody, setEmailBody] = useState("");
    const [isSending, setIsSending] = useState(false);

    // Normalize status values to numbers to prevent comparison bugs
    const statusNum = Number(message.messageStatus);
    const canReplyStatus = statusNum === 1 || statusNum === 2;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!canReplyStatus || mode !== "reply" || isSending || !emailBody) return;

        try {
            setIsSending(true);
            if (onSendReply) {
                await onSendReply(message.id, emailBody);
            }
            toast.success(`Email sent to ${message.senderName} successfully.`)
            setTimeout(() => {
                setEmailBody("");
                setMode("read"); // Snap back to read mode view upon success
                onClose()
            }, 2000)
        } catch (error) {
            console.error("Failed to send reply:", error);
        } finally {
            setIsSending(false);
        }
    };

    return (
        <div className="w-full max-w-lg bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <form onSubmit={handleSubmit} className="p-6 space-y-5">

                {/* Header Block */}
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                        {mode === "reply" ? (
                            <CornerUpLeft className="w-4 h-4 text-slate-500" />
                        ) : (
                            <Eye className="w-4 h-4 text-slate-500" />
                        )}
                        <h3 className="text-sm font-semibold text-slate-700">
                            {mode === "reply" ? "Respond to Inquiry" : mode === "readReply" ? "Admin Email Reply" : "Review Client Inquiry"}
                        </h3>
                    </div>
                    {/* Mode switching tabs if eligible */}
                    {canReplyStatus && (
                        <div className="flex bg-slate-100 p-0.5 rounded-lg text-xs font-medium">
                            <button
                                type="button"
                                onClick={() => setMode("read")}
                                className={`px-2.5 py-1 rounded-md transition-colors ${mode === "read" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-900"}`}
                            >
                                Read
                            </button>
                            <button
                                type="button"
                                onClick={() => setMode("reply")}
                                className={`px-2.5 py-1 rounded-md transition-colors ${mode === "reply" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-900"}`}
                            >
                                Reply
                            </button>
                        </div>
                    )}
                </div>

                {/* Metadata Fields */}
                <div className="space-y-3">
                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
                            Sender Info
                        </label>
                        <div className="relative">
                            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input
                                type="text"
                                readOnly
                                value={`${message.senderName} (${message.senderEmail})`}
                                className="w-full bg-slate-50 border border-slate-100 text-slate-600 rounded-xl p-2.5 pl-11 text-sm outline-none cursor-not-allowed"
                            />
                        </div>
                    </div>
                </div>

                {/* Dynamic Content Views */}
                {mode === "read" || mode === "readReply" ? (
                    /* READ MODE DISPLAY */
                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
                            {mode === "read" ? "Inquiry Message Body" : "Admin Reply Message Body"}
                        </label>
                        <div className="w-full bg-slate-50/50 border border-slate-100 rounded-xl p-4 text-sm text-slate-700 font-sans leading-relaxed whitespace-pre-wrap max-h-[220px] overflow-y-auto">
                            <div className="font-semibold text-slate-800 mb-2">{mode === "read" ? `Subj: ${message.subject}` : `Re: ${adminReply?.enquiry.subject}`}</div>
                            {mode === "read" ? message.body : adminReply?.body}
                        </div>

                        {/* Static Notice for Locked Statuses */}
                        {!canReplyStatus && (
                            <div className={`p-3.5 rounded-xl flex items-start gap-2.5 border mt-3 ${statusNum === 3
                                ? "bg-emerald-50/50 border-emerald-100 text-emerald-800"
                                : "bg-amber-50/50 border-amber-100 text-amber-800"
                                }`}>
                                {statusNum === 3 ? (
                                    <>
                                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                                        <p className="text-xs">{mode === "read" ? "This inquiry was answered. No further action needed." : "This is an admin reply to the email enquiry. No further action needed"}</p>
                                    </>
                                ) : (
                                    <>
                                        <Archive className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                                        <p className="text-xs">This item is archived. Unarchive it to enable replies.</p>
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                ) : (
                    /* REPLY MODE DISPLAY */
                    <div className="space-y-1.5 animate-in fade-in-50 duration-200">
                        <div className="flex justify-between items-center">
                            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
                                Your Reply Message
                            </label>
                            <span className="text-xs text-slate-400 flex items-center gap-1">
                                <AlertCircle className="w-3.5 h-3.5" /> Outbound support mail
                            </span>
                        </div>
                        <textarea
                            value={emailBody}
                            onChange={(e) => setEmailBody(e.target.value)}
                            rows={6}
                            className="w-full border border-slate-200 rounded-xl p-3 text-sm outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-100 transition-all font-sans leading-relaxed text-slate-700 resize-none"
                            placeholder={`Write your response to ${message.senderName}...`}
                            required
                        />
                    </div>
                )}

                {/* Action Footer */}
                <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-100">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors"
                    >
                        Close Panel
                    </button>

                    {/* Show Reply button if in Read mode but message is actionable */}
                    {mode === "read" && canReplyStatus && (
                        <button
                            type="button"
                            onClick={() => setMode("reply")}
                            className="px-5 py-2.5 bg-slate-900 text-white font-medium text-sm rounded-xl hover:bg-slate-800 transition-all flex items-center gap-2"
                        >
                            <MessageSquare className="w-3.5 h-3.5" />
                            Write Reply
                        </button>
                    )}

                    {/* Show Submit button if in active Reply configuration mode */}
                    {mode === "reply" && (
                        <button
                            type="submit"
                            disabled={isSending}
                            className="px-5 py-2.5 bg-slate-900 text-white font-medium text-sm rounded-xl hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
                        >
                            {isSending ? "Sending..." : "Send Reply"}
                            <Send className="w-3.5 h-3.5" />
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};
