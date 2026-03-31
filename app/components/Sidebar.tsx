'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";
import LogoText from "./LogoText";
import { authMenu } from "@/lib/authMenu";
import { X, LogOut, TextAlignStart} from "lucide-react";
import { signOut } from "next-auth/react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
// import { X as MotionX } from "lucide-react";
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
                    <button onClick={() => signOut({ callbackUrl: "/" })} className="cursor-pointer border-l-3 border-l-white w-full flex items-center gap-x-2 h-13 pl-6 text-sm hover:text-chart-5/90 transition-all duration-300 ease-in-out">
                        <LogOut className="w-5" />
                        Log Out
                    </button>

                </div>

            </div>
        </aside>
    );
}


export function MobileBottomAuthMenu() {
    const pathname = usePathname()
    return (
        <div className="md:hidden">
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

export function MobileNav() {
    const pathname = usePathname()
    const [showMenu, setShowMenu] = useState<boolean>(false)
    return (
        <>
            <button className="md:hidden cursor-pointer" onClick={() => setShowMenu(true)}>
                <TextAlignStart className="text-black/70" />
            </button>

            {/* The Slide-out Menu */}
            <MobileSlideMenu
                showMenu={showMenu}
                setShowMenu={setShowMenu}
                pathname={pathname}
                authMenu={authMenu}
            />
        </>
    )
}



const MotionX = motion(X)

export function MobileSlideMenu({ showMenu, setShowMenu, pathname, authMenu }: any) {
    return (
        <AnimatePresence>
            {showMenu && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setShowMenu(false)}
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[70] md:hidden"
                    />

                    {/* Slide-out Menu (Now from Left) */}
                    <motion.div
                        initial={{ x: "-100%" }} // Starts off-screen to the left
                        animate={{ x: 0 }}       // 
                        exit={{ x: "-100%" }}    // Slides back to the left
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed left-0 top-0 h-screen w-[90%] sm:w-[50%] bg-white z-[80] shadow-2xl p-6 flex flex-col md:hidden"
                    >
                        <div className="flex items-center justify-between mb-8">
                            <LogoText />
                            <button onClick={() => setShowMenu(false)} className="p-2 cursor-pointer">
                                <MotionX
                                    key="close-icon" // Required for clean re-triggering
                                    size={24}
                                    className="text-[#034460]"
                                    initial={{ rotate: -180, opacity: 0 }}
                                    animate={{ rotate: 0, opacity: 1 }}
                                    exit={{ rotate: 180, opacity: 0 }}
                                    transition={{ duration: 0.5, ease: "easeInOut" }}
                                />
                            </button>
                        </div>

                        {/* Navigation Links */}
                        <div className="flex flex-col gap-y-2 overflow-y-auto">
                            {authMenu.map((item: any, i: number) => (
                                <Link
                                    key={i}
                                    href={item.link}
                                    onClick={() => setShowMenu(false)}
                                    className={`flex items-center gap-x-3 p-4 rounded-xl text-sm font-bold transition-all ${pathname.startsWith(item.link)
                                        ? "bg-main-primary/5 text-main-primary"
                                        : "text-black/60 hover:bg-black/5"
                                        }`}
                                >
                                    {item.icon}
                                    {item.name}
                                </Link>
                            ))}
                        </div>

                        {/* Logout at Bottom */}
                        <div className="mt-auto pt-6 border-t border-black/5">
                            <button
                                onClick={() => signOut({ callbackUrl: "/" })}
                                className="w-full flex items-center justify-center gap-x-2 bg-rose-50 text-rose-600 py-4 rounded-xl font-bold text-sm cursor-pointer"
                            >
                                <LogOut size={18} />
                                Sign Out
                            </button>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
