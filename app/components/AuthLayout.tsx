'use client'
import React, { ReactNode } from "react";
import LogoText from "./LogoText";
import Link from "next/link";
import { BellIcon, Icon, LogOut, Search, TextAlignStart } from "lucide-react";
import { authMenu } from "@/lib/authMenu";
import { usePathname } from "next/navigation";

interface AuthLayoutProps {
    children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
    const pathname = usePathname()
    return (
        <div className="h-screen flex flex-col md:flex-row bg-white relative overflow-x-hidden">
            <aside className="hidden md:block md:w-64 shrink-0 border-r-3 border-r-black/3">
                <div className="h-16 border-b-3 border-b-black/3 flex items-center pl-7">
                    <Link href="/dashboard">
                        <LogoText />
                    </Link>
                </div>
                <div className="h-[90%] flex flex-col justify-between">
                    <div className="flex flex-col gap-y-0 p-5 px-0 overflow-y-auto">
                        {
                            authMenu.map((item, i) => (
                                <button key={i} className={`border-l-3 ${!pathname.startsWith(item.link) ? "border-l-white text-black/70" : "border-l-main-primary/70 text-main-primary"}`}>
                                    <Link href={item.link} className={`flex items-center gap-x-2 h-13 pl-6 text-sm hover:text-chart-5/90 ${pathname.startsWith(item.link) && "bg-main-primary/2"} transition-all duration-300 ease-in-out`}>
                                        {item.icon}
                                        {item.name}
                                    </Link>
                                </button>
                            ))
                        }
                    </div>
                    <div className="pl-0">
                        <button className="cursor-pointer border-l-3 border-l-white w-full flex items-center gap-x-2 h-13 pl-6 text-sm hover:text-chart-5/90 transition-all duration-300 ease-in-out">
                            <LogOut className="w-5" />
                            Log Out
                        </button>

                    </div>

                </div>
            </aside>
            <div className="flex-1 flex flex-col min-w-0">
                <nav className="h-16 border-b-3 border-b-black/3 flex items-center justify-between px-4 md:px-6 bg-white">
                    {/* Search Area */}
                    <div className="hidden md:flex items-center gap-x-0 border border-black/10 rounded-lg px-3 shadow-sm bg-transparent">
                        <Search className="w-4 text-black/50" />
                        <input
                            type="search"
                            placeholder="Search something here"
                            className="p-2 outline-0 text-black/60 text-sm w-64 focus:w-80 transition-all duration-300"
                        />
                    </div>

                    <button className="md:hidden">
                        <TextAlignStart className="text-black/70" />
                    </button>

                    {/* Notification */}
                    <div className="flex items-center gap-x-6">
                        <div className="w-8 h-8 border border-black/10 rounded-full relative flex items-center justify-center cursor-pointer hover:bg-black/5 transition-colors">
                            <BellIcon className="w-4 text-black/70" />
                            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border border-white" />
                        </div>

                        {/* Welcome Message */}
                        <div className="pl-6 border-l-2 border-black/5 hidden md:flex flex-col justify-center h-10">
                            <p className="text-[10px] uppercase font-bold text-black/40 tracking-widest leading-none">Account</p>
                            <p className="text-sm font-semibold text-black/80">Hello, Joshua</p>
                        </div>
                    </div>
                </nav>


                <main className="hidden md:block p-6 flex-1 min-w-0 bg-[#F4F6F8]/40">
                    {children}
                </main>

            </div>

            <div className="hidden md:block absolute bottom-0 left-0 right-0 h-12 bg-white" />

            {/* Mobile menu */}
            <div className="md:hidden absolute bottom-0 left-0 right-0 py-2 bg-white border-t-2 border-t-black/3 grid grid-cols-4 gap-x-0 z-50">
                {
                    [...authMenu.slice(0, 3), authMenu[7]].map((item, i) => (
                        <button key={i} className={`${!pathname.startsWith(item.link) ? "text-black/70" : "text-main-primary"}`}>
                            <Link href={item.link} className={`flex flex-col gap-y-1 items-center text-xs hover:text-chart-5/90 transition-all duration-300 ease-in-out`}>
                                {item.icon}
                                {item.name}
                            </Link>
                        </button>
                    ))
                }
            </div>
        </div>
    )
}