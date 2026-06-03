"use client";

import Placeholder from "@tiptap/extension-placeholder";
import React, { useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import LinkExtension from "@tiptap/extension-link";
import { Send, Sparkles, Bold, Italic, Link, List } from "lucide-react";
import { toast } from "react-toastify";
import api from "@/lib/axios";

export default function SendMessageUI() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [recipient, setRecipient] = useState("");
    const [subject, setSubject] = useState("");
    const [body, setBody] = useState("");
    const [errors, setErrors] = useState<{ recipient?: string; subject?: string; body?: string }>({});

    const editor = useEditor({
        extensions: [
            StarterKit,
            LinkExtension.configure({
                openOnClick: false,
                autolink: true,
                HTMLAttributes: {
                    style: "color: #034460; text-decoration: underline;",
                },
            }),
            Placeholder.configure({
                placeholder: "Write your email here...",
            }),
        ],
        content: body,
        onUpdate: ({ editor }) => {
            setBody(editor.getHTML());
            setErrors((prev) => ({ ...prev, body: "" }));
        },
    });


    const handleLinkClick = () => {
        if (!editor) return;

        if (editor.isActive("link")) {
            editor.chain().focus().unsetLink().run();
            return;
        }

        const url = prompt("Enter the URL:", "https://");
        if (url === null) return;
        if (url === "") {
            editor.chain().focus().unsetLink().run();
            return;
        }

        editor.chain().focus().setLink({ href: url }).run();
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (isSubmitting) return;
        let count = 0;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(recipient.trim())) {
            setErrors((prev) => ({ ...prev, recipient: "Please enter a valid email address." }));
            count++;
        }
        if (!subject.trim()) {
            setErrors((prev) => ({ ...prev, subject: "Subject is required." }));
            count++;
        } else if (subject.trim().length > 100) {
            setErrors((prev) => ({ ...prev, subject: "Subject cannot exceed 100 characters." }));
            count++;
        }
        if (!editor || editor.isEmpty || !editor.getText().trim()) {
            setErrors((prev) => ({ ...prev, body: "Body is required." }));
            count++;
        }
        if (count > 0) {
            return;
        }
        setIsSubmitting(true);
        try {
            const formData = new FormData();
            formData.append("recipient", recipient.trim());
            formData.append("subject", subject.trim());
            formData.append("body", body.trim());
            // formData.append("attachmentUrls", new Blob([], { type: "text/plain" }), "empty.txt");
            const res = await api.post("/admin/emailPotentialClients", formData);
            if (res.status === 200 || res.status === 201) {
                toast.success("Message sent successfully!");
                setTimeout(() => {
                    setRecipient("");
                    setSubject("");
                    setBody("");
                    editor?.commands.clearContent();
                }, 3500);
            }
        } catch (error) {
            console.error("Error sending message:", error);
            toast.error("Failed to send message. Please try again.", {
                position: "bottom-left",
            });
        } finally {
            setIsSubmitting(false);
        }

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
                            <h2 className="text-sm lg:text-lg font-semibold text-slate-900 dark:text-slate-50 tracking-tight">New Message</h2>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Send a client an email</p>
                        </div>
                    </div>
                </div>

                {/* Form Body */}
                <div className="space-y-4 p-0">
                    {/* Recipient Input */}
                    <div className="space-y-1.5 px-4 lg:px-8 mt-4 ">
                        <label htmlFor="recipient" className="text-xs lg:text-[13px] font-medium text-slate-700 dark:text-slate-300 tracking-wide">
                            Recipient Email <span className="text-indigo-500">*</span>
                        </label>
                        <input
                            type="email"
                            id="recipient"
                            required
                            value={recipient}
                            onChange={(e) => {
                                setRecipient(e.target.value)
                                setErrors((prev) => ({ ...prev, recipient: "" }));
                            }}
                            placeholder="e.g. recipientemail@email.com"
                            className="w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 px-4 py-3 text-xs lg:text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-600 shadow-inner focus:border-main-primary/60 dark:focus:border-main-primary/70 focus:outline-none focus:ring-2 focus:ring-indigo-500/10 dark:focus:ring-indigo-500/5 transition-all duration-200"
                        />
                        {errors.recipient && (
                            <p className="text-xs text-red-500">{errors.recipient}</p>
                        )}
                    </div>

                    {/* Subject Input */}
                    <div className="space-y-1.5 px-4 lg:px-8 ">
                        <label htmlFor="subject" className="text-xs lg:text-[13px] font-medium text-slate-700 dark:text-slate-300 tracking-wide">
                            Subject Line <span className="text-indigo-500">*</span>
                        </label>
                        <input
                            type="text"
                            id="subject"
                            required
                            value={subject}
                            onChange={(e) => {
                                setSubject(e.target.value)
                                setErrors((prev) => ({ ...prev, subject: "" }));
                            }}
                            placeholder="e.g. System upgrade notifications and updates"
                            className="w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 px-4 py-3 text-xs lg:text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-600 shadow-inner focus:border-main-primary/60 dark:focus:border-main-primary/70 focus:outline-none focus:ring-2 focus:ring-indigo-500/10 dark:focus:ring-indigo-500/5 transition-all duration-200"
                        />
                        {errors.subject && (
                            <p className="text-xs text-red-500">{errors.subject}</p>
                        )}
                    </div>

                    <div>
                        {/* Rich Editor Container */}
                        <div className="space-y-1.5 px-4 lg:px-8 pb-2">
                            <label htmlFor="body" className="text-xs lg:text-[13px] font-medium text-slate-700 dark:text-slate-300 tracking-wide">
                                Email Message <span className="text-indigo-500">*</span>
                            </label>
                            <div className="group border border-slate-200 dark:border-slate-800 rounded-xl bg-slate-50/50 dark:bg-slate-950 focus-within:border-main-primary dark:focus-within:border-main-primary focus-within:ring-2 focus-within:ring-main-primary/20 dark:focus-within:ring-indigo-500/5 transition-all duration-200 overflow-hidden shadow-inner">

                                {/* Editor Toolbar */}
                                <div className="flex items-center gap-1 px-3 py-2 bg-white dark:bg-slate-900 border-b border-slate-200/60 dark:border-slate-800/60">
                                    <button
                                        type="button"
                                        onClick={() => editor?.chain().focus().toggleBold().run()}
                                        className={`p-1.5 rounded-md transition-colors ${editor?.isActive("bold") ? "bg-slate-100 dark:bg-slate-800 text-indigo-500" : "hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400"}`}
                                    >
                                        <Bold className="w-3.5 h-3.5" />
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => editor?.chain().focus().toggleItalic().run()}
                                        className={`p-1.5 rounded-md transition-colors ${editor?.isActive("italic") ? "bg-slate-100 dark:bg-slate-800 text-indigo-500" : "hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400"}`}
                                    >
                                        <Italic className="w-3.5 h-3.5" />
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleLinkClick}
                                        className={`p-1.5 rounded-md transition-colors ${editor?.isActive("link") ? "bg-slate-100 dark:bg-slate-800 text-indigo-500" : "hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400"}`}
                                    >
                                        <Link className="w-3.5 h-3.5" />
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => editor?.chain().focus().toggleBulletList().run()}
                                        className={`p-1.5 rounded-md transition-colors ${editor?.isActive("bulletList") ? "bg-slate-100 dark:bg-slate-800 text-indigo-500" : "hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400"}`}
                                    >
                                        <List className="w-3.5 h-3.5" />
                                    </button>
                                    <div className="h-4 w-px bg-slate-200 dark:bg-slate-800 mx-1" />
                                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 dark:text-slate-500 pl-1">Rich Text Active</span>
                                </div>

                                {/* Headless Content Layer Container */}
                                <EditorContent
                                    editor={editor}
                                    className="w-full min-h-[120px] lg:min-h-[200px] max-h-[250px] overflow-y-auto px-4 py-3 text-xs lg:text-sm text-slate-900 dark:text-slate-100 font-mono leading-relaxed [&_.tiptap]:outline-none [&_.tiptap]:min-h-[200px] [&_.tiptap]:max-h-[280px] [&_.is-editor-empty]:before:content-[attr(data-placeholder)] [&_.is-editor-empty]:before:text-slate-400 dark:[&_.is-editor-empty]:before:text-slate-600 [&_.is-editor-empty]:before:float-left [&_.is-editor-empty]:before:pointer-events-none [&_.is-editor-empty]:before:h-0"
                                />
                            </div>
                            {errors.body && (
                                <p className="text-xs text-red-500">{errors.body}</p>
                            )}
                        </div>
                        <div className="flex items-center justify-end gap-3 bg-white lg:bg-slate-50 dark:bg-slate-900/40 border-t border-slate-100 dark:border-slate-800/60 px-6 sm:px-8 py-4">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="cursor-pointer inline-flex items-center gap-1.5 rounded-sm bg-main-primary/90 px-4 py-2.5 text-xs font-semibold text-white hover:bg-main-primary/50 active:scale-[0.98] transition-all duration-150 focus:outline-none disabled:opacity-50 disabled:pointer-events-none"
                            >
                                {isSubmitting ? "Sending..." : "Send Message"}
                                <Send className="w-3.5 h-3.5" />
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}


// return (
//     <div className="w-full lg:max-w-2xl mx-auto bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/60 dark:border-slate-800/60 rounded-2xl shadow-xl shadow-slate-100/40 dark:shadow-none overflow-hidden transition-all duration-300">
//         <form onSubmit={handleSubmit} className="flex flex-col pb-35 md:pb-0">
//             {/* Header */}
//             <div className="relative p-6 sm:p-8 sm:py-6 border-b border-slate-100 dark:border-slate-800/60 overflow-hidden">
//                 <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-indigo-500/5 dark:bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
//                 <div className="absolute bottom-0 left-1/3 w-24 h-24 bg-sky-500/5 dark:bg-sky-500/10 rounded-full blur-2xl pointer-events-none" />

//                 <div className="flex items-center gap-2.5">
//                     <div className="p-2 bg-indigo-50 dark:bg-indigo-950/40 rounded-xl text-indigo-600 dark:text-indigo-400">
//                         <Sparkles className="w-4 h-4" />
//                     </div>
//                     <div>
//                         <h2 className="text-sm lg:text-lg font-semibold text-slate-900 dark:text-slate-50 tracking-tight">New Message</h2>
//                         <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Send email to clients</p>
//                     </div>
//                 </div>
//             </div>

//             {/* Form Body */}
//             <div className="p-4 sm:p-8 sm:py-6 space-y-4">
//                 {/* Recipient Input */}
//                 <div className="space-y-1.5">
//                     <label htmlFor="recipient" className="text-xs lg:text-[13px] font-medium text-slate-700 dark:text-slate-300 tracking-wide">
//                         Recipient Email <span className="text-indigo-500">*</span>
//                     </label>
//                     <input
//                         type="email"
//                         id="recipient"
//                         required
//                         value={recipient}
//                         onChange={(e) => setRecipient(e.target.value)}
//                         placeholder="e.g. recipientemail@email.com"
//                         className="w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 px-4 py-3 text-xs lg:text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-600 shadow-inner focus:border-main-primary/60 dark:focus:border-main-primary/70 focus:outline-none focus:ring-2 focus:ring-indigo-500/10 dark:focus:ring-indigo-500/5 transition-all duration-200"
//                     />
//                 </div>

//                 {/* Subject Input */}
//                 <div className="space-y-1.5">
//                     <label htmlFor="subject" className="text-xs lg:text-[13px] font-medium text-slate-700 dark:text-slate-300 tracking-wide">
//                         Subject Line <span className="text-indigo-500">*</span>
//                     </label>
//                     <input
//                         type="text"
//                         id="subject"
//                         required
//                         value={subject}
//                         onChange={(e) => setSubject(e.target.value)}
//                         placeholder="e.g. System upgrade notifications and updates"
//                         className="w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 px-4 py-3 text-xs lg:text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-600 shadow-inner focus:border-main-primary/60 dark:focus:border-main-primary/70 focus:outline-none focus:ring-2 focus:ring-indigo-500/10 dark:focus:ring-indigo-500/5 transition-all duration-200"
//                     />
//                 </div>

//                 {/* Rich Editor Container */}
//                 <div className="space-y-1.5">
//                     <label htmlFor="body" className="text-xs lg:text-[13px] font-medium text-slate-700 dark:text-slate-300 tracking-wide">
//                         Email Message <span className="text-indigo-500">*</span>
//                     </label>
//                     <div className="group border border-slate-200 dark:border-slate-800 rounded-xl bg-slate-50/50 dark:bg-slate-950 focus-within:border-main-primary dark:focus-within:border-main-primary focus-within:ring-2 focus-within:ring-main-primary/20 dark:focus-within:ring-indigo-500/5 transition-all duration-200 overflow-hidden shadow-inner">
//                         {/* Editor Toolbar Aesthetic */}
//                         <div className="flex items-center gap-1 px-3 py-2 bg-white dark:bg-slate-900 border-b border-slate-200/60 dark:border-slate-800/60">
//                             <button type="button" className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 rounded-md transition-colors"><Bold className="w-3.5 h-3.5" /></button>
//                             <button type="button" className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 rounded-md transition-colors"><Italic className="w-3.5 h-3.5" /></button>
//                             <button type="button" className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 rounded-md transition-colors"><Link className="w-3.5 h-3.5" /></button>
//                             <button type="button" className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 rounded-md transition-colors"><List className="w-3.5 h-3.5" /></button>
//                             <div className="h-4 w-px bg-slate-200 dark:bg-slate-800 mx-1" />
//                             <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 dark:text-slate-500 pl-1">HTML Supported</span>
//                         </div>
//                         <textarea
//                             id="body"
//                             rows={8}
//                             required
//                             value={body}
//                             onChange={(e) => setBody(e.target.value)}
//                             placeholder="Write your email here..."
//                             className="w-full bg-transparent border-0 px-4 py-3 text-xs lg:text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:ring-0 resize-y font-mono leading-relaxed"
//                         />
//                     </div>
//                 </div>
//             </div>

//             {/* Fixed: Completed Footer Action Bar layout and tags */}
//             <div className="flex items-center justify-end gap-3 bg-white lg:bg-slate-50 dark:bg-slate-900/40 border-t border-slate-100 dark:border-slate-800/60 px-6 sm:px-8 py-4">
//                 <button
//                     type="submit"
//                     disabled={isSubmitting}
//                     className="cursor-pointer inline-flex items-center gap-1.5 rounded-sm bg-main-primary/90 px-4 py-2.5 text-xs font-semibold text-white hover:bg-main-primary/50 active:scale-[0.98] transition-all duration-150 focus:outline-none disabled:opacity-50 disabled:pointer-events-none"
//                 >
//                     {isSubmitting ? "Sending..." : "Send Message"}
//                     <Send className="w-3.5 h-3.5" />
//                 </button>
//             </div>
//         </form>
//     </div>
// );