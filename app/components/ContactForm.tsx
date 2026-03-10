"use client"
import { EnquiryAPI } from "@/lib/api/enquiry";
import { EnquirySchema } from "@/schema/contactUsSchema";
import { useState } from "react";
import { toast } from "react-toastify"
import { AnimateSpin } from "./AnimateSpin";


export function ContactForm({
    className = "grid grid-cols-2 gap-y-8 lg:gap-x-7 mt-6"
}) {
    const [formData, setFormData] = useState({
        senderName: "",
        senderEmail: "",
        packageHeight: "",
        packageWeight: "",
        body: "",
        subject: ""
    });
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true)
        const validation = EnquirySchema.safeParse(formData)

        if (!validation.success) {
            // Get the first error message and show it
            toast.error(validation.error.issues[0].message || "Invalid input")
            setLoading(false)
            return
        }
        try {
            await EnquiryAPI.send(formData)
            setFormData({
                senderName: "",
                senderEmail: "",
                packageHeight: "",
                packageWeight: "",
                body: "",
                subject: ""
            })
            toast.success("Enquiry submitted successfully!");
        } catch (error: any) {
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    };
    return (
        <form action="#" className={className} onSubmit={handleSubmit}>
            <input value={formData.subject} onChange={(e) => setFormData({ ...formData, subject: e.target.value })} type="text" className="px-5 h-13 bg-white col-span-2 placeholder:text-xs" placeholder="Subject*" />
            <input value={formData.senderName} onChange={(e) => setFormData({ ...formData, senderName: e.target.value })} type="text" className="px-5 h-13 bg-white col-span-2 lg:col-span-1 placeholder:text-xs" placeholder="Your name *" />
            <input value={formData.senderEmail} onChange={(e) => setFormData({ ...formData, senderEmail: e.target.value })} type="email" className="px-5 h-13 bg-white col-span-2 lg:col-span-1 placeholder:text-xs" placeholder="Your email *" />
            <input value={formData.packageHeight} onChange={(e) => setFormData({ ...formData, packageHeight: e.target.value })} type="text" className="px-5 h-13 bg-white col-span-2 lg:col-span-1 placeholder:text-xs" placeholder="Height *" />
            <input value={formData.packageWeight} onChange={(e) => setFormData({ ...formData, packageWeight: e.target.value })} type="text" className="px-5 h-13 bg-white col-span-2 lg:col-span-1 placeholder:text-xs" placeholder="Weight *" />
            <textarea value={formData.body} onChange={(e) => setFormData({ ...formData, body: e.target.value })} className="resize-none col-span-2 h-36 lg:h-56 bg-white p-5 placeholder:text-xs" placeholder="Message/ Note"></textarea>
            <div className="col-span-2">
                <button
                    disabled={loading}
                    className="text-sm text-[#034460] bg-chart-5 h-13 w-30 hover:bg-[#034460] hover:text-white transition-all duration-500 ease-in-out cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                    {loading ? (
                        <span className="flex items-center gap-2">
                            {/* Simple CSS Spinner */}
                            <AnimateSpin />
                            Sending...
                        </span>
                    ) : (
                        "Submit Now"
                    )}
                </button>
            </div>
        </form>
    );
}