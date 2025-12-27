"use client";

import { Facebook, Instagram, Mail, Phone, Twitter, Youtube } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "motion/react"
import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
    const { scrollY } = useScroll();
    const [isSticky, setIsSticky] = useState(false);

    useMotionValueEvent(scrollY, "change", (latest) => {
        // Trigger the transition after 150px of scrolling
        setIsSticky(latest > 150);
    })


    return (
        <div className="min-h-screen flex flex-col">
            <header className="bg-header-top text-white py-3 flex items-center">
                <div className="flex items-center justify-between w-[72vw] mx-auto text-[13px]">
                    <div className="flex items-center gap-x-14">
                        <div className="gap-x-2 flex items-center transition-all ease-in-out duration-300 hover:opacity-80 hover:text-chart-5">
                            <Phone className="text-chart-5 fill-chart-5 hover:fill-chart-5 w-4 h-4" />
                            <a href="tel:+1246357" className="">Phone: +01-246-357 (Any time 24/7)</a>
                        </div>

                        <div className="gap-x-2 flex items-center transition-all ease-in-out duration-300 hover:opacity-80 hover:text-chart-5">
                            <Mail className="text-chart-5 hover:fill-chart-5 w-4 h-4" />
                            <a href="mailto:contact@cargolite.com">contact@cargolite.com</a>
                        </div>
                    </div>

                    <div className="flex items-center gap-x-6">
                        <a href="https://x.com" target="_blank">
                            <Twitter className="fill-white hover:fill-chart-5 w-4 h-4 hover:text-chart-5 transition-all ease-in-out duration-300" />
                        </a>

                        <a href="https://facebook.com" target="_blank">
                            <Facebook className="fill-white hover:fill-chart-5 w-4 h-4 hover:text-chart-5 transition-all ease-in-out duration-300" />
                        </a>

                        <a href="https://instagram.com" target="_blank">
                            <Instagram className="w-4 h-4 hover:text-chart-5 transition-all ease-in-out duration-300" />
                        </a>

                        <a href="https://youtube.com" target="_blank">
                            <Youtube className="w-5 h-5 hover:text-chart-5 transition-all ease-in-out duration-300" />
                        </a>
                    </div>
                </div>
            </header>

            <AnimatePresence>
                {isSticky && (
                    <motion.nav
                        initial={{ y: -100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -100, opacity: 0 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        className="fixed top-0 left-0 right-0 z-50 h-16 bg-white flex items-center justify-center shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)]"
                    >
                        <div className="h-full w-[72vw] flex items-center justify-between">
                            <div className="flex items-center gap-x-14">
                                <a href="/" className="text-chart-5 font-bold text-md">
                                    {/* <img src="logo2.png" alt="logo" loading="lazy" className="w-full h-full rounded-full" /> */}
                                    CARGOLITE
                                </a>
                                <div className="flex items-center gap-x-12 text-sm font-medium text-header-top">
                                    <Link href="/" className="hover:opacity-70 transition-all ease-in-out durtion-300">Home</Link>
                                    <Link href="/about" className="hover:opacity-70 transition-all ease-in-out durtion-300">About Us</Link>
                                    <Link href="/track-parcel" className="hover:opacity-70 transition-all ease-in-out durtion-300">Track Parcel</Link>
                                    <Link href="/contact-us" className="hover:opacity-70 transition-all ease-in-out durtion-300">Contact Us</Link>
                                </div>
                            </div>
                            <button className="text-sm bg-[#E8E9ED] h-11 w-22 text-header-top cursor-pointer hover:bg-chart-5 hover:opacity-90 transition-all duration-300 ease-in-out rounded-xs">Login</button>
                        </div>

                    </motion.nav>)}
            </AnimatePresence>

            {!isSticky && (
                <nav className={`h-16 bg-white flex items-center justify-center`}>
                    <div className="h-full w-[72vw] flex items-center justify-between">
                        <div className="flex items-center gap-x-14">
                            <a href="/" className="text-chart-5 font-bold text-md">
                                {/* <img src="logo2.png" alt="" className="w-full h-full rounded-full" /> */}
                                CARGOLITE
                            </a>
                            <div className="flex items-center gap-x-12 text-sm font-medium text-header-top">
                                <Link href="/" className="hover:opacity-70 transition-all ease-in-out durtion-300">Home</Link>
                                <Link href="/about" className="hover:opacity-70 transition-all ease-in-out durtion-300">About Us</Link>
                                <Link href="/track-parcel" className="hover:opacity-70 transition-all ease-in-out durtion-300">Track Parcel</Link>
                                <Link href="/contact-us" className="hover:opacity-70 transition-all ease-in-out durtion-300">Contact Us</Link>
                            </div>
                        </div>
                        <button className="text-sm bg-[#E8E9ED] h-11 w-22 text-header-top cursor-pointer hover:bg-chart-5 hover:opacity-90 transition-all duration-300 ease-in-out rounded-xs">Login</button>
                    </div>
                </nav>
            )
            }





            <main className="w-full flex-1 mx-auto">{children}</main>

            <footer className="bg-gray-200 text-center p-4">
                &copy; {new Date().getFullYear()} My Application
            </footer>
        </div>
    );
}