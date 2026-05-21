"use client"
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion"
import { Mail, MailOpen, Inbox, Reply } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronLeft, MessagesSquare, Search, Settings2, Users } from "lucide-react";
import { DataTable } from "./DataTable";
import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import api from "@/lib/axios";
import { APIResponse } from "./types";
import CustomPagination from "../components/CustomPagination";
import { handleNextPrevPagination } from "@/lib/paginationUtils";

const tabs = [
    { id: 'all', label: 'Messages' },
    { id: 'unread', label: 'Unread' },
    { id: 'read', label: 'Read' },
    { id: 'replied', label: 'Replied' },
];

function retrieveMessageStatus(status: string) {
    if (status === "all") return ""
    if (status === "unread") return 1
    if (status === "read") return 2
    if (status === "replied") return 3
    if (status === "archive") return 4
}

export type ActiveTab = "all" | "unread" | "read" | "replied";

export default function MessageTable() {
    const [isLoading, setIsloading] = useState(false)

    const [messages, setMessages] = useState<APIResponse | null>(null)
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();
    const limit = 10;
    const [localSearch, setLocalSearch] = useState<string>(searchParams.get("search") || "");
    const activeTab = (!searchParams.get("message-status") || searchParams.get("message-status") === "all") ? "all"
        : searchParams.get("message-status") === "unread" ? "unread"
            : searchParams.get("message-status") === "read" ? "read"
                : "replied"

    const handleGetMessagesWithStatus = (tabID: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.delete("search");
        params.delete("status");
        params.set("message-status", tabID)
        params.set("page", "1");
        router.push(`${pathname}?${params.toString()}`);
    }

    const handleGeMessages = async () => {
        if (isLoading) return
        setIsloading(true)

        const currentPage = searchParams.get("page") || 1;
        const currentSearch = searchParams.get("search") || "";
        const currentStatus = retrieveMessageStatus(searchParams.get("message-status") || "");
        try {
            const response = await api.get(`/contact-us?page=${currentPage}&role=${activeTab}&messageStatus=${currentStatus}&search=${currentSearch}&limit=${limit}`)
            setMessages(response.data)
        } catch (error) {
            console.error(error)
            toast.error("Fetching clients failed. Please Try again.")
        } finally {
            setIsloading(false)
        }

    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            const params = new URLSearchParams(searchParams.toString());

            if (localSearch) {
                params.set("search", localSearch);
            } else {
                params.delete("search");
            }

            // delete filter key when running the first search
            params.delete("status");

            params.set("page", "1"); // Always reset to page 1 on new search
            router.push(`${pathname}?${params.toString()}`);
        }
    };

    useEffect(() => {
        handleGeMessages()
    }, [searchParams.toString(), activeTab])
    return (
        <div className="h-full bg-white rounded-lg relative p-0 flex flex-col min-w-0">
            <div className="flex items-center justify-between px-5 pt-5">
                <h1 className="font-medium flex items-center gap-x-2">
                    <span className="border-main-primary/30 bg-main-primary/3 p-1 h-8 w-9 rounded flex items-center justify-center">
                        <MessagesSquare className="w-4 stroke-3 text-blue-600" />
                    </span>
                    <span className="hidden md:inline-block text-sm">
                        Inquiry Messages
                    </span>
                </h1>

                <div className="flex items-center gap-x-2">
                    <div className="hidden sm:flex items-center gap-x-2 h-10 w-[250px] border rounded-md px-2">
                        <Search className="w-5 opacity-30" />
                        <input
                            onChange={e => setLocalSearch(e.target.value)}
                            onKeyDown={handleKeyDown}
                            type="text"
                            className="h-full w-full focus:outline-none focus:ring-0 text-xs text-black/60" placeholder="Search something here"
                        />
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 font-light opacity-70" >
                                <Settings2 className="w-4 h-4" />
                                Filters
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent onCloseAutoFocus={(e) => e.preventDefault()}>
                            <DropdownMenuGroup className="p-1.5 space-y-0.5">
                                {/* Clean, muted label to give context */}
                                <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                    Filter Messages
                                </div>

                                <DropdownMenuItem
                                    onClick={() => handleGetMessagesWithStatus("all")}
                                    className="flex items-center gap-2.5 px-2.5 py-2 text-sm rounded-md transition-colors cursor-pointer data-[disabled]:pointer-events-none data-[disabled]:opacity-50 hover:bg-accent hover:text-accent-foreground"
                                >
                                    <Inbox className="h-4 w-4 text-muted-foreground group-hover:text-foreground" />
                                    <span className="font-medium">All Messages</span>
                                </DropdownMenuItem>

                                <DropdownMenuItem
                                    onClick={() => handleGetMessagesWithStatus("unread")}
                                    className="flex items-center gap-2.5 px-2.5 py-2 text-sm rounded-md transition-colors cursor-pointer hover:bg-accent hover:text-accent-foreground"
                                >
                                    <Mail className="h-4 w-4 text-amber-500 fill-amber-500/10" />
                                    <span className="font-medium">Unread</span>
                                </DropdownMenuItem>

                                <DropdownMenuItem
                                    onClick={() => handleGetMessagesWithStatus("read")}
                                    className="flex items-center gap-2.5 px-2.5 py-2 text-sm rounded-md transition-colors cursor-pointer hover:bg-accent hover:text-accent-foreground"
                                >
                                    <MailOpen className="h-4 w-4 text-muted-foreground" />
                                    <span className="font-medium">Read</span>
                                </DropdownMenuItem>

                                <DropdownMenuItem
                                    onClick={() => handleGetMessagesWithStatus("replied")}
                                    className="flex items-center gap-2.5 px-2.5 py-2 text-sm rounded-md transition-colors cursor-pointer hover:bg-accent hover:text-accent-foreground"
                                >
                                    <Reply className="h-4 w-4 text-blue-500" />
                                    <span className="font-medium">Replied</span>
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <div className="flex items-center gap-x-1">
                        <button
                            onClick={() => {
                                handleNextPrevPagination({
                                    direction: "prev",
                                    isLoading,
                                    meta: {
                                        currentPage: Number(messages?.meta.currentPage),
                                        pageLength: Number(messages?.meta.pageLength),
                                        totalItems: Number(messages?.meta.totalItems),
                                        totalPages: Number(messages?.meta.totalPages),
                                        from: Number(messages?.meta.from),
                                        to: Number(messages?.meta.to),
                                    },
                                    pathname,
                                    searchParams,
                                    router,
                                })
                            }}
                            className="h-9 w-9 flex items-center justify-center p-1 border rounded-sm hover:bg-gray-100"
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => {
                                handleNextPrevPagination({
                                    direction: "next",
                                    isLoading,
                                    meta: {
                                        currentPage: Number(messages?.meta.currentPage),
                                        pageLength: Number(messages?.meta.pageLength),
                                        totalItems: Number(messages?.meta.totalItems),
                                        totalPages: Number(messages?.meta.totalPages),
                                        from: Number(messages?.meta.from),
                                        to: Number(messages?.meta.to),
                                    },
                                    pathname,
                                    searchParams,
                                    router,
                                })
                            }}
                            className="h-9 w-9 flex items-center justify-center p-1 border rounded-sm  hover:bg-gray-100"
                        >
                            <ChevronLeft className="w-4 h-4 rotate-180" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Tab Switching */}
            <div className="px-5 mt-5 border-b border-gray-100">
                <div className="flex items-center gap-x-8 ">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => {
                                handleGetMessagesWithStatus(tab.id)
                            }}
                            className={`cursor-pointer relative pb-3 text-sm font-medium transition-colors duration-200 ${activeTab === tab.id ? "text-blue-600" : "text-gray-500 hover:text-gray-900"
                                }`}
                        >
                            {tab.label}

                            {/* This div only renders for the active tab, but motion slides it */}
                            {activeTab === tab.id && (
                                <motion.div
                                    layoutId="active-pill"
                                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"
                                    transition={{ type: "spring", stiffness: 380, damping: 35 }}
                                />
                            )}
                        </button>
                    ))}
                </div>
            </div>

            <div className="mt-4 flex-1 overflow-hidden flex flex-col relative">
                {/* <div className="absolute h-full w-5 bg-white left-0" /> */}
                <div className="flex-1 overflow-y-auto overflow-x-auto">
                    <DataTable
                        data={messages?.data ?? []}
                        setMessages={setMessages}
                        isLoading={isLoading}
                        activeTab={activeTab}
                    />
                </div>
            </div>

            {messages?.data.length ?
                <div className="mt-auto h-14 border-t flex items-center justify-between bg-white flex-shrink-0 px-7">
                    <p className="text-xs text-black/60">
                        Showing {messages?.meta.from} to {messages.meta.to} of {messages.meta.totalItems} entries
                    </p>
                    <div className="flex gap-x-2">
                        <CustomPagination
                            currentPage={messages.meta.currentPage}
                            totalPages={messages.meta.totalPages}
                            pathname={pathname}
                            searchParams={searchParams}
                        />
                    </div>
                </div> : null
            }

        </div>
    )
}