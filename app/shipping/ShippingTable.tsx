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

export default function ShippingTable() {
    return (
        <div className="h-full bg-white rounded-lg relative p-0 flex flex-col">
            <div className="flex items-center justify-between px-5 pt-5 bg-blue-5000">
                <h1 className="font-medium flex items-center gap-x-2">
                    <span className="border-main-primary/30 bg-main-primary/3 p-1 h-8 w-9 rounded flex items-center justify-center">
                        <ChartNoAxesColumnIncreasing className="w-4 stroke-3 text-blue-600" />
                    </span>
                    <span>
                        Shipments Activities
                    </span>
                </h1>

                <div className="flex items-center gap-x-2">
                    <div className="h-10 w-[250px] border rounded-md flex items-center gap-x-2 px-2">
                        <Search className="w-5 opacity-30" />
                        <input type="text" className="h-full w-full focus:outline-none focus:ring-0 text-xs text-black/60" placeholder="Search something here" />
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
                                {/* <DropdownMenuLabel>Chart filter</DropdownMenuLabel> */}
                                <DropdownMenuItem>Total delivery</DropdownMenuItem>
                                <DropdownMenuItem>In Transit</DropdownMenuItem>
                            </DropdownMenuGroup>
                            <DropdownMenuGroup>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>Cancelled</DropdownMenuItem>
                                <DropdownMenuItem>Returned</DropdownMenuItem>
                            </DropdownMenuGroup>
                            <DropdownMenuGroup>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>Revenue</DropdownMenuItem>
                            </DropdownMenuGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <div className="flex items-center gap-x-1">
                        <button className="h-9 w-9 flex items-center justify-center p-1 border rounded-sm hover:bg-gray-100">
                            <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button className="h-9 w-9 flex items-center justify-center p-1 border rounded-sm  hover:bg-gray-100">
                            <ChevronLeft className="w-4 h-4 rotate-180" />
                        </button>
                    </div>
                </div>
            </div>

            <div className="mt-4 flex-1 overflow-hidden flex flex-col">
                <div className="flex-1 overflow-y-auto">
                    <DataTable />
                </div>
            </div>

            <div className="mt-auto h-14 border-t flex items-center justify-between bg-white flex-shrink-0 px-7">
                <p className="text-xs text-black/60">Showing 1 to 20 of 100 entries</p>
                <div className="flex gap-x-2">
                    {/* Your Pagination Buttons Here */}
                    <Pagination>
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious href="#" />
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink href="#">1</PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink href="#" isActive>
                                    2
                                </PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink href="#">3</PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationEllipsis />
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationNext href="#" />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
            </div>
        </div>
    )
}