"use client"
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import { ChartNoAxesColumnIncreasing, ChevronLeft, Search, Settings2 } from "lucide-react";
import { DataTable } from "./DataTable";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import api from "@/lib/axios";
import { APIResponse, Shipment } from "./types";
import { generatePaginationLinks } from "@/lib/paginationUtils";
import { ShipmentStatus } from "@/generated/prisma/enums";

interface Params {
    search: string;
    page: number;
    limit: number;
    status: string;
}

export default function ShippingTable() {
    const [isLoading, setIsloading] = useState<boolean>(false)
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter()
    const limit = 2
    const [localSearch, setLocalSearch] = useState<string>(searchParams.get("search") || "");
    const [shipments, setShipments] = useState<APIResponse | null>(null)
    console.log(shipments)

    const handleFetchShipments = async () => {
        if (isLoading) return
        setIsloading(true)

        const currentPage = searchParams.get("page") || 1;
        const currentSearch = searchParams.get("search") || "";
        const currentStatus = searchParams.get("status")?.toUpperCase() || "";
        try {
            const response = await api.get(`/shipment?page=${currentPage}&search=${currentSearch}&status=${currentStatus}&limit=${limit}`);
            if (response.status === 200) {
                setShipments(response.data);
            } else {
                toast.error("Failed to fetch shipments. Please try again.")
            }

        } catch (error) {
            toast.error("Failed to fetch shipments. Please try again.")
            console.error(error)
        } finally {
            setIsloading(false)
        }
    }

    const handlePagination = (direction: 'next' | 'prev') => {
        if (isLoading) return
        if (direction === "next" && (shipments?.meta?.currentPage ?? 0) >= (shipments?.meta?.totalPages ?? 0)) return
        if (direction === "prev" && (shipments?.meta?.currentPage ?? 0) <= 1) return
        let pageNumber;
        if (direction === "next") {
            pageNumber = (shipments?.meta?.currentPage ?? 1) + 1;
        } else {
            pageNumber = (shipments?.meta?.currentPage ?? 1) - 1;
        }
        const paginationLink = generatePaginationLinks(
            pageNumber,
            pathname,
            searchParams
        );
        router.push(paginationLink, { scroll: false });
    }

    const handleStatusChange = (status: string) => {
        if (isLoading) return
        const newSearchParams = new URLSearchParams(searchParams.toString());
        newSearchParams.set("status", status.toLowerCase());
        newSearchParams.set("page", "1"); // Reset to first page when status changes
        newSearchParams.delete("search")
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
        handleFetchShipments()
    }, [searchParams.toString()])
    return (
        <div className="h-full bg-white rounded-lg relative p-0 flex flex-col">
            <div className="flex items-center justify-between px-3 md:px-5 pt-5 bg-blue-5000">
                <h1 className="font-medium flex items-center gap-x-2">
                    <span className="border-main-primary/30 bg-main-primary/3 p-1 h-8 w-9 rounded flex items-center justify-center">
                        <ChartNoAxesColumnIncreasing className="w-4 stroke-3 text-blue-600" />
                    </span>
                    <span className="hidden md:inline-block text-sm">
                        Shipments Activities
                    </span>
                </h1>

                <div className="flex items-center gap-x-2">
                    <div className="hidden sm:flex items-center gap-x-2 h-10 w-[250px] border rounded-md px-2">
                        <Search className="w-5 opacity-30" />
                        <input
                            onChange={e => setLocalSearch(e.target.value)}
                            onKeyDown={handleKeyDown}
                            type="text"
                            className="h-full w-full focus:outline-none focus:ring-0 text-xs text-black/60"
                            placeholder="Search something here"
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
                                <DropdownMenuItem onSelect={() => handleStatusChange(ShipmentStatus.PICKED_UP)}>
                                    Picked up
                                </DropdownMenuItem>
                                <DropdownMenuItem onSelect={() => handleStatusChange(ShipmentStatus.IN_TRANSIT)}>
                                    In Transit
                                </DropdownMenuItem>
                                <DropdownMenuItem onSelect={() => handleStatusChange(ShipmentStatus.DELIVERED)}>
                                    Delivered
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                            <DropdownMenuGroup>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onSelect={() => handleStatusChange(ShipmentStatus.CANCELLED)}>
                                    Cancelled
                                </DropdownMenuItem>
                                <DropdownMenuItem onSelect={() => handleStatusChange(ShipmentStatus.RETURNED)}>
                                    Returned
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                        </DropdownMenuContent>

                    </DropdownMenu>

                    <div className="flex items-center gap-x-1">
                        <button
                            onClick={() => handlePagination('prev')}
                            className="h-9 w-9 flex items-center justify-center p-1 border rounded-sm hover:bg-gray-100"
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button
                            className="h-9 w-9 flex items-center justify-center p-1 border rounded-sm  hover:bg-gray-100"
                            onClick={() => handlePagination('next')}
                        >
                            <ChevronLeft className="w-4 h-4 rotate-180" />
                        </button>
                    </div>
                </div>
            </div>

            <div className="mt-4 flex-1 overflow-hidden flex flex-col">
                <div className="flex-1 overflow-y-auto">
                    <DataTable data={shipments?.data ?? []} setShipments={setShipments} isLoading={isLoading} />
                </div>
            </div>

            {shipments?.data.length ?
                <div className="mt-auto min-h-[3.5rem] py-3 border-t flex flex-col sm:flex-row items-center justify-center sm:justify-between bg-white flex-shrink-0 px-3 sm:px-7 gap-y-2">
                    <p className="text-xs text-black/60">
                        Showing {shipments?.meta.from} to {shipments?.meta.to} of {shipments?.meta.totalItems} entries
                    </p>
                    <div className="flex gap-x-2">
                        <Pagination>
                            <PaginationContent>
                                <PaginationItem><PaginationPrevious href="#" /></PaginationItem>
                                <PaginationItem><PaginationLink href="#">1</PaginationLink></PaginationItem>
                                <PaginationItem><PaginationLink href="/?page=2" isActive>2</PaginationLink></PaginationItem>
                                <PaginationItem><PaginationLink href="#">3</PaginationLink></PaginationItem>
                                <PaginationItem><PaginationEllipsis /></PaginationItem>
                                <PaginationItem><PaginationNext href="#" /></PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    </div>
                </div> : null
            }
        </div>
    )
}