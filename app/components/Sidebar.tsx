'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";
import LogoText from "./LogoText";
import { authMenu } from "@/lib/authMenu";
import { LogOut } from "lucide-react";
// ... other imports

export function Sidebar() {
    const pathname = usePathname();
    return (
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
    );
}


export function MobileAuthMenu() {
    const pathname = usePathname()
    return (
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
    )
}