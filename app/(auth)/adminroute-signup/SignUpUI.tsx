"use client"
import api from "@/lib/axios";
import { validatePassword } from "@/lib/passwordValidator";
import { motion } from "framer-motion";
import { Mail, Lock, ArrowRight, Loader2, ShieldCheck, User, Phone, Globe, EyeClosed, Eye } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useEffect, FormEvent } from "react";
import { toast } from "react-toastify";

interface Particle {
    id: number;
    size: number;
    x: number;
    y: number;
    duration: number;
    delay: number;
}

export default function SignupUI() {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [particles, setParticles] = useState<Particle[]>([]);
    const [mounted, setMounted] = useState(false);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        phone: "",
        region: ""
    });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const router = useRouter()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setErrors(prev => ({ ...prev, [name]: "" })); // Clear error on change
    }

    useEffect(() => {
        setMounted(true);
        const generated = [...Array(30)].map((_, i) => ({
            id: i,
            size: Math.random() * 8 + 3,
            x: Math.random() * 100,
            y: Math.random() * 100,
            duration: Math.random() * 5 + 3, // Faster speed as requested
            delay: Math.random() * 2,
        }));
        setParticles(generated);
    }, []);

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};
        if (!formData.firstName || formData.firstName.trim().length <= 3) newErrors.firstName = "First name must be at least 3 characters long";
        if (!formData.lastName || formData.lastName.trim().length <= 3) newErrors.lastName = "Last name must be at least 3 characters long";
        if (!formData.email || formData.email.trim().length <= 3) newErrors.email = "Email must be at least 3 characters long";
        if (!validatePassword(formData.password)) newErrors.password = "Min 8 characters: 1 upper, 1 lower, 1 digit, 1 special, no spaces.";
        if (!formData.phone || formData.phone.trim().length <= 5) newErrors.phone = "Phone number must be at least 5 characters long";
        if (!formData.region) newErrors.region = "Country is missing.";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsLoading(true);
        try {
            const response = await api.post("/auth/register", formData);
            if (response.status === 200 || response.status === 201) {
                toast.success("Account created successfully! Please check your email.");
                localStorage.setItem("email", formData.email)
                setTimeout(() => {
                    router.push("/user-verification")
                }, 2000)
            } else {
                toast.info("Please check your email for verification instructions.");
            }

        } catch (error: any) {
            console.error("Submission Error:", error);
            // Handle non-5xx errors rewritten as instances of Error by interceptor
            if (error.details) {
                toast.error(error?.message || "Server error. Please try again later.");
                Object.keys(error.details).forEach((field) => {
                    const fieldErrors = error.details[field];
                    if (Array.isArray(fieldErrors)) {
                        fieldErrors.forEach((errMsg: string) => {
                            setErrors(prev => ({ ...prev, [field]: errMsg }))
                        });
                    }
                });
                return;
            }

            if (error?.message === "Email already exists") {
                toast.error(error?.message);
                return
            }

            // Handle raw 5xx Axios errors passed through by your interceptor
            const status = error.response?.status;
            if (status >= 500) {
                toast.error("Server error. Please try again later.");
                return;
            }

            // Fallback for network disconnects or unexpected errors
            toast.error("An error occurred. Please try again");

        } finally {
            setIsLoading(false);
        }
    };


    return (
        <div className="relative h-full w-screen overflow-hidden bg-white flex items-center justify-center selection:bg-chart-5/50">

            {/* --- Animated Sparks (Bubbles) --- */}
            {/* {mounted && (
                <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                    {particles.map((p) => (
                        <motion.div
                            key={p.id}
                            initial={{ opacity: 0 }}
                            animate={{
                                opacity: [0, 0.4, 0],
                                y: [`${p.y}%`, `${p.y - 40}%`], // Increased drift height
                                x: [`${p.x}%`, `${p.x + (Math.random() * 10 - 5)}%`]
                            }}
                            transition={{
                                duration: p.duration,
                                repeat: Infinity,
                                delay: p.delay,
                                ease: "linear"
                            }}
                            style={{
                                width: p.size,
                                height: p.size,
                                left: `${p.x}%`,
                                top: `${p.y}%`,
                                backgroundColor: '#034460',
                                filter: 'blur(1px)',
                                boxShadow: '0 0 10px rgba(3, 68, 96, 0.3)'
                            }}
                            className="absolute rounded-full"
                        />
                    ))}
                </div>
            )} */}

            {/* --- Ambient Background Blobs --- */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(at_top_right,_#034460_0%,_transparent_40%)] opacity-5" />
                <motion.div
                    animate={{ y: [0, -40, 0], scale: [1, 1.1, 1] }}
                    transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute bottom-[5%] left-[5%] w-[500px] h-[500px] bg-[#034460]/5 rounded-full blur-[120px]"
                />
            </div>

            {/* --- SIGNUP CARD --- */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="relative z-20 w-[95%] md:[w-90%] max-w-[420px] p-5 md:p-8 rounded-3xl border border-black/5 bg-white/70 backdrop-blur-3xl shadow-2xl shadow-black/10 my-10 overflow-y-auto"
            >
                <div className="flex flex-col items-center space-y-8">
                    {/* Brand Branding */}
                    <div className="flex flex-col items-center gap-y-4 mt-4">
                        {/* <motion.div
                            whileHover={{ rotate: 12, scale: 1.1 }}
                            className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-[#034460] border border-black/10 shadow-sm"
                        >
                            <ShieldCheck size={36} />
                        </motion.div> */}
                        <div className="text-center">
                            <Link href="/">
                                <h1 className="font-black text-3xl tracking-tighter text-[#034460] uppercase leading-none">
                                    Cargo<span className="text-[#ffa800]">lite</span>
                                </h1>
                            </Link>
                            <p className="text-[10px] text-black/40 font-bold uppercase tracking-[0.5em] mt-2">
                                Create Partner Account
                            </p>
                        </div>
                    </div>

                    <form className="w-full space-y-5" onSubmit={handleSubmit}>
                        {/* Name Fields Row */}
                        <div className="grid md:grid-cols-1 gap-4">
                            <div className="space-y-1">
                                <label className="text-[10px] font-bold text-black/50 uppercase tracking-widest ml-1">First Name</label>
                                <div className="relative group">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-black/30 group-focus-within:text-[#034460] transition-colors" />
                                    <input
                                        type="text"
                                        placeholder="Your first name"
                                        className="w-full bg-black/5 border border-black/10 p-3 pl-11 rounded-xl outline-none focus:border-[#034460]/40 focus:bg-white text-[#034460] text-sm transition-all"
                                        required
                                        onChange={handleChange}
                                        name="firstName"
                                    />
                                </div>
                                {errors.firstName && (<p className="text-red-500 text-xs">{errors.firstName}</p>)}
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] font-bold text-black/50 uppercase tracking-widest ml-1">Last Name</label>
                                <input
                                    type="text"
                                    placeholder="Your last name"
                                    className="w-full bg-black/5 border border-black/10 p-3 px-4 rounded-xl outline-none focus:border-[#034460]/40 focus:bg-white text-[#034460] text-sm transition-all"
                                    required
                                    onChange={handleChange}
                                    name="lastName"
                                />
                                {errors.lastName && (<p className="text-red-500 text-xs">{errors.lastName}</p>)}
                            </div>
                        </div>

                        {/* Email Field */}
                        <div className="space-y-1">
                            <label className="text-[10px] font-bold text-black/50 uppercase tracking-widest ml-1">Corporate Email</label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-black/30 group-focus-within:text-[#034460] transition-colors" />
                                <input
                                    type="email"
                                    placeholder="name@email.com"
                                    className="w-full bg-black/5 border border-black/10 p-3 pl-11 rounded-xl outline-none focus:border-[#034460]/40 focus:bg-white text-[#034460] text-sm transition-all"
                                    required
                                    onChange={handleChange}
                                    name="email"
                                />
                            </div>
                            {errors.email && (<p className="text-red-500 text-xs">{errors.email}</p>)}
                        </div>

                        {/* Contact & Country Row */}
                        <div className="grid md:grid-cols-1 gap-4">
                            <div className="space-y-1">
                                <label className="text-[10px] font-bold text-black/50 uppercase tracking-widest ml-1">Phone Number</label>
                                <div className="relative group">
                                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-black/30 group-focus-within:text-[#034460] transition-colors" />
                                    <input
                                        type="tel"
                                        placeholder="+1..."
                                        className="w-full bg-black/5 border border-black/10 p-3 pl-11 rounded-xl outline-none focus:border-[#034460]/40 focus:bg-white text-[#034460] text-sm transition-all"
                                        required
                                        onChange={handleChange}
                                        name="phone"
                                    />
                                </div>
                                {errors.phone && (<p className="text-red-500 text-xs">{errors.phone}</p>)}
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] font-bold text-black/50 uppercase tracking-widest ml-1">Region</label>
                                <div className="relative group">
                                    <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-black/30 group-focus-within:text-[#034460] transition-colors" />
                                    <select
                                        value={formData.region || ""}
                                        onChange={(e) => setFormData((prev) => ({ ...prev, region: e.target.value }))}
                                        name="region"
                                        className="w-full bg-black/5 border border-black/10 p-3 pl-11 rounded-xl outline-none focus:border-[#034460]/40 focus:bg-white text-[#034460] text-sm transition-all appearance-none cursor-pointer">
                                        <option value="" disabled hidden>Select Country</option>
                                        <option value="UK">United Kingdom</option>
                                        <option value="US">United States</option>
                                        <option value="Germany">Germany</option>
                                        <option value="Singapore">Singapore</option>
                                    </select>

                                </div>
                                {errors.region && (<p className="text-red-500 text-xs">{errors.region}</p>)}
                            </div>
                        </div>

                        {/* Password Field */}
                        <div className="space-y-1">
                            <label className="text-[10px] font-bold text-black/50 uppercase tracking-widest ml-1">Create Password</label>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-black/30 group-focus-within:text-[#034460] transition-colors" />
                                {showPassword ?
                                    <EyeClosed onClick={() => setShowPassword(false)} className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-black/30 group-focus-within:text-[#034460] transition-colors" />
                                    :
                                    <Eye onClick={() => setShowPassword(true)} className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-black/30 group-focus-within:text-[#034460] transition-colors" />
                                }
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    className="w-full bg-black/5 border border-black/10 p-3 pl-11 rounded-xl outline-none focus:border-[#034460]/40 focus:bg-white text-[#034460] text-sm transition-all"
                                    required
                                    onChange={handleChange}
                                    name="password"
                                />
                            </div>
                            {errors.password && (<p className="text-red-500 text-xs">{errors.password}</p>)}
                        </div>

                        {/* Signup Button */}
                        <motion.button
                            type="submit"
                            whileHover={{ scale: 1.01, backgroundColor: "#ffb732" }}
                            whileTap={{ scale: 0.98 }}
                            disabled={isLoading}
                            className="h-14 w-full bg-[#ffa800] text-[#034460] font-black uppercase tracking-widest text-xs rounded-2xl flex items-center justify-center gap-3 transition-all shadow-xl shadow-[#ffa800]/20 disabled:opacity-50 mt-2"
                        >
                            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                                <>
                                    Create Account
                                    <ArrowRight size={16} />
                                </>
                            )}
                        </motion.button>
                    </form>

                    <div className="pt-6 border-t border-black/5 w-full text-center">
                        <p className="text-xs text-black/40 font-medium">
                            Already a partner? <Link href="/login" className="text-[#034460] font-bold hover:underline underline-offset-4 decoration-2">Sign In</Link>
                        </p>
                    </div>
                </div>
            </motion.div>

            <div className="absolute bottom-6 text-[9px] uppercase tracking-[0.6em] text-black/40 font-semibold">
                Authorized Logistics Portal © 2026
            </div>
        </div>
    );
}
