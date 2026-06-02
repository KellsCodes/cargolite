"use client"
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronLeft, Search, Settings2, Users } from "lucide-react";
import { DataTable } from "./DataTable";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "@/lib/axios";
import { PaginatedUserResponse } from "./types";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { ClientType } from "@/generated/prisma/enums";
import CustomPagination from "../components/CustomPagination";
import { handleNextPrevPagination } from "@/lib/paginationUtils";

const tabs = [
    { id: ClientType.SENDER, label: 'Senders' },
    { id: ClientType.RECEIVER, label: 'Receivers' }
];

export default function ClientsTable() {
    const [isLoading, setIsloading] = useState(false)
    const [clients, setClients] = useState<PaginatedUserResponse | null>(null)
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter()
    const limit = 10
    const [localSearch, setLocalSearch] = useState<string>(searchParams.get("search") || "");
    const activeTab = (!searchParams.get("client-role") || searchParams.get("client-role") === ClientType.SENDER) ? ClientType.SENDER : ClientType.RECEIVER


    const handleGetClients = async () => {
        if (isLoading) return
        setIsloading(true)

        const currentPage = searchParams.get("page") || 1;
        const currentSearch = searchParams.get("search") || "";
        const currentStatus = searchParams.get("status")?.toUpperCase() || "";
        try {
            const response = await api.get(`/clients?page=${currentPage}&role=${activeTab}&status=${currentStatus}&search=${currentSearch}&limit=${limit}`)
            setClients({ data: response.data.data, pagination: response.data.meta })
        } catch (error) {
            console.error(error)
            toast.error("Fetching clients failed. Please Try again.")
        } finally {
            setIsloading(false)
        }

    }

    const handleStatusChange = (status: number) => {
        if (isLoading) return
        const newSearchParams = new URLSearchParams(searchParams.toString());
        newSearchParams.set("status", `${status}`);
        newSearchParams.set("page", "1"); // Reset to first page when status changes
        newSearchParams.delete("search"); // Clear search when applying a new filter
        router.push(`${pathname}?${newSearchParams.toString()}`, { scroll: false });
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
        handleGetClients()
    }, [searchParams.toString(), activeTab])

    return (
        <div className="h-full bg-white rounded-lg relative p-0 flex flex-col">
            <div className="flex items-center justify-between px-5 pt-5 bg-blue-5000">
                <h1 className="font-medium flex items-center gap-x-2">
                    <span className="border-main-primary/30 bg-main-primary/3 p-1 h-8 w-9 rounded flex items-center justify-center">
                        <Users className="w-4 stroke-3 text-blue-600" />
                    </span>
                    <span className="hidden md:inline-block text-sm">
                        Client Directory
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
                            <DropdownMenuGroup>
                                <DropdownMenuItem onClick={() => handleStatusChange(1)}>Active</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleStatusChange(2)}>Inactive</DropdownMenuItem>
                            </DropdownMenuGroup>
                            <DropdownMenuGroup>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={() => handleStatusChange(3)}>Suspended</DropdownMenuItem>
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
                                        currentPage: Number(clients?.pagination.currentPage),
                                        pageLength: Number(clients?.pagination.pageLength),
                                        totalItems: Number(clients?.pagination.totalItems),
                                        totalPages: Number(clients?.pagination.totalPages),
                                        from: Number(clients?.pagination.from),
                                        to: Number(clients?.pagination.to),
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
                                        currentPage: Number(clients?.pagination.currentPage),
                                        pageLength: Number(clients?.pagination.pageLength),
                                        totalItems: Number(clients?.pagination.totalItems),
                                        totalPages: Number(clients?.pagination.totalPages),
                                        from: Number(clients?.pagination.from),
                                        to: Number(clients?.pagination.to),
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
                                const params = new URLSearchParams(searchParams.toString());
                                params.delete("search");
                                params.delete("status");
                                params.set("page", "1");
                                params.set("client-role", tab.id)
                                router.push(`${pathname}?${params.toString()}`);
                            }}
                            className={`cursor-pointer relative pb-3 text-xs lg:text-sm font-medium transition-colors duration-200 ${activeTab === tab.id ? "text-blue-600" : "text-gray-500 hover:text-gray-900"
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

            <div className="mt-4 flex-1 overflow-hidden flex flex-col">
                <div className="flex-1 overflow-y-auto">
                    <DataTable data={clients?.data ?? []} setClients={setClients} isLoading={isLoading} />
                </div>
            </div>

            {clients?.data.length ? (
                <div className="mt-auto h-14 border-t flex items-center justify-between bg-white flex-shrink-0 px-7">
                    <p className="text-xs text-black/60">
                        Showing {clients?.pagination.from} to {clients?.pagination.to} of {clients?.pagination.totalItems} entries
                    </p>
                    <div className="flex gap-x-2">
                        <CustomPagination
                            currentPage={clients?.pagination.currentPage}
                            totalPages={clients?.pagination.totalPages}
                            pathname={pathname}
                            searchParams={searchParams}
                        />
                    </div>
                </div>
            ) : null}
        </div>
    )
}