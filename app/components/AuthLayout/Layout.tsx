"use client"
import { BellIcon, Search } from "lucide-react";
import { MobileBottomAuthMenu, MobileNav, Sidebar } from "../Sidebar";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import api from "@/lib/axios";

export default function Layout({ children, userSession }: { children: React.ReactNode, userSession: any }) {
    const [notification, setNotification] = useState<number | null>(null)

    useEffect(() => {
        // Fetch notifications for the user
        const fetchNotifications = async () => {
            const response = await api.get(`/contact-us/unread`);
            setNotification(response.data.count);
        };

        fetchNotifications();
    }, [])
    return (
        <div className="h-screen flex flex-col md:flex-row bg-white relative overflow-x-hidden">
            <Sidebar />
            <div className="flex-1 flex flex-col min-w-0">
                <nav className="h-16 shrink-0 border-b-3 border-b-black/3 flex items-center justify-between px-4 md:px-6 bg-white">
                    {/* Search Area */}
                    <div className="hidden md:flex items-center gap-x-0 border border-black/10 rounded-lg px-3 shadow-sm bg-transparent">
                        <Search className="w-4 text-black/50" />
                        <input
                            type="search"
                            placeholder="Search something here"
                            className="p-2 outline-0 text-black/60 text-sm w-64 focus:w-80 transition-all duration-300"
                        />
                    </div>

                    <div className="md:hidden">
                        <MobileNav />
                    </div>

                    {/* Notification */}
                    <div className="flex items-center gap-x-6">
                        <div className="w-8 h-8 border border-black/10 rounded-full relative flex items-center justify-center cursor-pointer hover:bg-black/5 transition-colors">
                            <Link href="/messages">
                                <BellIcon className="w-4 text-black/70" />
                            </Link>
                            {
                                notification && notification > 0 ?
                                    <span className="absolute -top-2 right-0 text-xs bg-white rounded-full text-red-500 p-[3px]">{notification > 100 ? `99+` : notification}</span>
                                    :
                                    <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border border-white" />
                            }
                        </div>

                        {/* Welcome Message */}
                        <div className="pl-6 border-l-2 border-black/5 hidden md:flex flex-col justify-center h-10">
                            <p className="text-[10px] uppercase font-bold text-black/40 tracking-widest leading-none">Account</p>
                            <p className="text-sm font-semibold text-black/80">Hello, {userSession?.name?.split(" ")[0]}</p>
                        </div>
                    </div>
                </nav>


                <main className="hidden md:block p-0 flex-1 min-w-0 bg-[#F4F6F8]/40">
                    {React.Children.map(children, child => {
                        // Check if the child is a valid React element AND NOT a string (like a div/span)
                        if (React.isValidElement(child) && typeof child.type !== 'string') {
                            return React.cloneElement(child, { userSession } as any);
                        }
                        return child;
                    })}
                </main>

            </div>

            <div className="hidden md:block absolute bottom-0 left-0 right-0 h-12 bg-white" />

            {/* Mobile menu */}
            <MobileBottomAuthMenu />
        </div>
    )
}