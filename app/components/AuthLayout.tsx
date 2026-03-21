import React, { ReactNode } from "react";
import { BellIcon, Search, TextAlignStart } from "lucide-react";
import { MobileAuthMenu, Sidebar } from "./Sidebar";
import { auth } from "@/services/auth.service";
import { redirect } from "next/navigation";

interface AuthLayoutProps {
    children: ReactNode;
}

export default async function AuthLayout({ children }: AuthLayoutProps) {
    const session = await auth()

    if (!session) {
        redirect("/login")
    }

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


                <main className="hidden md:block p-0 flex-1 min-w-0 bg-[#F4F6F8]/40">
                    {children}
                </main>

            </div>

            <div className="hidden md:block absolute bottom-0 left-0 right-0 h-12 bg-white" />

            {/* Mobile menu */}
            <MobileAuthMenu />
        </div>
    )
}