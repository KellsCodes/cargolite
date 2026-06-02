"use client";

import React, { useState } from "react";
import { Send, Sparkles, Bold, Italic, Link, List } from "lucide-react";

export default function SendMessageUI() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    // Fixed: Added controlled form states
    const [recipient, setRecipient] = useState("all");
    const [subject, setSubject] = useState("");
    const [body, setBody] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Example logic using the state values
        console.log({ recipient, subject, body });

        setTimeout(() => {
            setIsSubmitting(false);
            // Optional: Reset form fields after submission
            setSubject("");
            setBody("");
        }, 1500);
    };

    return (
        <div className="w-full lg:max-w-2xl mx-auto bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/60 dark:border-slate-800/60 rounded-2xl shadow-xl shadow-slate-100/40 dark:shadow-none overflow-hidden transition-all duration-300">
            <form onSubmit={handleSubmit} className="flex flex-col pb-35 md:pb-0">
                {/* Header */}
                <div className="relative p-6 sm:p-8 sm:py-6 border-b border-slate-100 dark:border-slate-800/60 overflow-hidden">
                    <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-indigo-500/5 dark:bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
                    <div className="absolute bottom-0 left-1/3 w-24 h-24 bg-sky-500/5 dark:bg-sky-500/10 rounded-full blur-2xl pointer-events-none" />

                    <div className="flex items-center gap-2.5">
                        <div className="p-2 bg-indigo-50 dark:bg-indigo-950/40 rounded-xl text-indigo-600 dark:text-indigo-400">
                            <Sparkles className="w-4 h-4" />
                        </div>
                        <div>
                            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-50 tracking-tight">New Message</h2>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Send email to clients</p>
                        </div>
                    </div>
                </div>

                {/* Form Body */}
                <div className="p-4 sm:p-8 sm:py-6 space-y-4">
                    {/* Recipient Input */}
                    <div className="space-y-1.5">
                        <label htmlFor="recipient" className="text-[13px] font-medium text-slate-700 dark:text-slate-300 tracking-wide">
                            Recipient Email <span className="text-indigo-500">*</span>
                        </label>
                        <input
                            type="text"
                            id="subject"
                            required
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            placeholder="e.g. client@email.com"
                            className="w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 px-4 py-3 text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-600 shadow-inner focus:border-main-primary/60 dark:focus:border-main-primary/70 focus:outline-none focus:ring-2 focus:ring-indigo-500/10 dark:focus:ring-indigo-500/5 transition-all duration-200"
                        />
                    </div>

                    {/* Subject Input */}
                    <div className="space-y-1.5">
                        <label htmlFor="subject" className="text-[13px] font-medium text-slate-700 dark:text-slate-300 tracking-wide">
                            Subject Line <span className="text-indigo-500">*</span>
                        </label>
                        <input
                            type="text"
                            id="subject"
                            required
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            placeholder="e.g. System upgrade notifications and updates"
                            className="w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 px-4 py-3 text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-600 shadow-inner focus:border-main-primary/60 dark:focus:border-main-primary/70 focus:outline-none focus:ring-2 focus:ring-indigo-500/10 dark:focus:ring-indigo-500/5 transition-all duration-200"
                        />
                    </div>

                    {/* Rich Editor Container */}
                    <div className="space-y-1.5">
                        <label htmlFor="body" className="text-[13px] font-medium text-slate-700 dark:text-slate-300 tracking-wide">
                            Email Message <span className="text-indigo-500">*</span>
                        </label>
                        <div className="group border border-slate-200 dark:border-slate-800 rounded-xl bg-slate-50/50 dark:bg-slate-950 focus-within:border-main-primary dark:focus-within:border-main-primary focus-within:ring-2 focus-within:ring-main-primary/20 dark:focus-within:ring-indigo-500/5 transition-all duration-200 overflow-hidden shadow-inner">
                            {/* Editor Toolbar Aesthetic */}
                            <div className="flex items-center gap-1 px-3 py-2 bg-white dark:bg-slate-900 border-b border-slate-200/60 dark:border-slate-800/60">
                                <button type="button" className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 rounded-md transition-colors"><Bold className="w-3.5 h-3.5" /></button>
                                <button type="button" className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 rounded-md transition-colors"><Italic className="w-3.5 h-3.5" /></button>
                                <button type="button" className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 rounded-md transition-colors"><Link className="w-3.5 h-3.5" /></button>
                                <button type="button" className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 rounded-md transition-colors"><List className="w-3.5 h-3.5" /></button>
                                <div className="h-4 w-px bg-slate-200 dark:bg-slate-800 mx-1" />
                                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 dark:text-slate-500 pl-1">HTML Supported</span>
                            </div>
                            <textarea
                                id="body"
                                rows={8}
                                required
                                value={body}
                                onChange={(e) => setBody(e.target.value)}
                                placeholder="Write your email here..."
                                className="w-full bg-transparent border-0 px-4 py-3 text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:ring-0 resize-y font-mono leading-relaxed"
                            />
                        </div>
                    </div>
                </div>

                {/* Fixed: Completed Footer Action Bar layout and tags */}
                <div className="flex items-center justify-end gap-3 bg-slate-50 dark:bg-slate-900/40 border-t border-slate-100 dark:border-slate-800/60 px-6 sm:px-8 py-4">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="cursor-pointer inline-flex items-center gap-1.5 rounded-sm bg-main-primary/90 px-4 py-2.5 text-xs font-semibold text-white hover:bg-main-primary/50 active:scale-[0.98] transition-all duration-150 focus:outline-none disabled:opacity-50 disabled:pointer-events-none"
                    >
                        {isSubmitting ? "Sending..." : "Send Message"}
                        <Send className="w-3.5 h-3.5" />
                    </button>
                </div>
            </form>
        </div>
    );
}
