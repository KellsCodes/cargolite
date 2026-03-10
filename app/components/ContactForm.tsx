"use client"
import { useState } from "react";
import { toast } from "react-toastify"


export function ContactForm({
    className = "grid grid-cols-2 gap-y-8 lg:gap-x-7 mt-6"
}) {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        height: "",
        weight: "",
        message: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(formData);
        toast.success("Form submitted successfully!");
    };
    return (
        <form action="#" className={className} onSubmit={handleSubmit}>
            <input name="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} type="text" className="px-5 h-13 bg-white col-span-2 lg:col-span-1 placeholder:text-xs" placeholder="Your name *" />
            <input name="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} type="email" className="px-5 h-13 bg-white col-span-2 lg:col-span-1 placeholder:text-xs" placeholder="Your email *" />
            <input name="height" value={formData.height} onChange={(e) => setFormData({ ...formData, height: e.target.value })} type="text" className="px-5 h-13 bg-white col-span-2 lg:col-span-1 placeholder:text-xs" placeholder="Height *" />
            <input name="weight" value={formData.weight} onChange={(e) => setFormData({ ...formData, weight: e.target.value })} type="text" className="px-5 h-13 bg-white col-span-2 lg:col-span-1 placeholder:text-xs" placeholder="Weight *" />
            <textarea name="message" value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="resize-none col-span-2 h-36 lg:h-56 bg-white p-5 placeholder:text-xs" placeholder="Message/ Note"></textarea>
            <div className="col-span-2">
                <button className="text-sm text-[#034460] bg-chart-5 h-13 w-30 hover:bg-[#034460] hover:text-white transition-all duration-500 ease-in-out cursor-pointer">Submit Now</button>
            </div>
        </form>
    );
}