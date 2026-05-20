import { useState } from 'react';
import { Mail, Clock, FileText, AlertCircle } from 'lucide-react';
import { UserActivityData } from './types';
import { toast } from 'react-toastify';

interface SendReminderModalProps {
    clientData: UserActivityData;
    onSend: (message: string) => Promise<void>;
    onClose: () => void;
}

export default function SendReminderModal({ clientData, onSend, onClose }: SendReminderModalProps) {
    const [isSending, setIsSending] = useState(false);
    const [emailBody, setEmailBody] = useState(
        `Hi ${clientData.name.split(' ')[0]},\n\n` +
        `It has been a while since your last shipment with us, and we wanted to check in to see how you are doing. We have missed partnering with you to handle your logistics needs.\n\n` +
        `Our team has recently streamlined our shipping processes to ensure your packages arrive faster and more securely than ever. Whether you have a personal delivery or a business shipment coming up, we are fully ready to assist you.\n\n` +
        `Please let us know if there is anything we can do to help with your next shipment. We look forward to welcoming you back soon!`
        // `Warm regards,\n` +
        // `The Operations Team`
        
    );

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (isSending) return
        setIsSending(true);

        try {
            await onSend(emailBody);
            toast.success(`Email reminder sent to ${clientData.name} successfully.`)
            setTimeout(() => {
                onClose()
            }, 2000)
        } catch (error) {
            console.error(error);
            toast.error("Email sending failed. Plese try again.")
        } finally {
            setIsSending(false);
        }
    };

    return (
        <div className="w-full max-w-lg bg-white rounded-2xl overflow-hidden">
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
                {/* Recipient Field */}
                <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider block">Recipient Email</label>
                    <div className="relative">
                        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            type="text"
                            readOnly
                            value={clientData.email}
                            className="w-full bg-slate-50 border border-slate-200 text-slate-500 rounded-xl p-3 pl-11 text-sm outline-none cursor-not-allowed"
                        />
                    </div>
                </div>

                {/* Message Editor */}
                <div className="space-y-1.5">
                    <div className="flex justify-between items-center">
                        <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider block">Email Message</label>
                        <span className="text-xs text-slate-400 flex items-center gap-1">
                            <AlertCircle className="w-3.5 h-3.5" /> Editable preview
                        </span>
                    </div>
                    <textarea
                        value={emailBody}
                        onChange={(e) => setEmailBody(e.target.value)}
                        rows={6}
                        className="w-full border border-slate-200 rounded-xl p-3 text-sm outline-none focus:border-chart-5/50 focus:ring-2 focus:ring-chart-5/10 transition-all font-sans leading-relaxed text-slate-700 resize-none"
                        placeholder="Type your reminder message..."
                        required
                    />
                </div>

                {/* Modal Action Footer */}
                <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-100">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={isSending}
                        className="px-5 py-2.5 bg-main-primary text-white font-medium text-sm rounded-md hover:bg-main-primary/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-main-primary80 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
                    >
                        {isSending ? "Sending..." : "Send Reminder"}
                    </button>
                </div>
            </form>
        </div>
    );
}
