"use client"

import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"
import { generatePaginationLinks, getPaginationRange } from "@/lib/paginationUtils";
import Link from "next/link";

interface CustomPaginationProps {
    currentPage: number;
    totalPages: number;
    pathname: string;
    searchParams: URLSearchParams;
}

export default function CustomPagination({ currentPage, totalPages, pathname, searchParams }: CustomPaginationProps) {
    const pageNumbers = getPaginationRange(currentPage, totalPages);
    return (
        <Pagination>
            <PaginationContent>
                {/* Previous button */}
                <PaginationItem>
                    <PaginationPrevious
                        href={generatePaginationLinks(currentPage - 1, pathname, searchParams)}
                        className={currentPage <= 1 ? "pointer-events-none opacity-50" : ""}
                    />
                </PaginationItem>
                {pageNumbers.map((page, index) => {
                    const isCurrentPage = page === currentPage;
                    return (
                        <PaginationItem key={index}>
                            {page === "ellipsis" ? (<PaginationEllipsis />) : (
                                <PaginationLink
                                    href={generatePaginationLinks(page, pathname, searchParams)}
                                    isActive={isCurrentPage}
                                    className={isCurrentPage ? "pointer-events-none opacity-60" : ""}
                                >
                                    {page}
                                </PaginationLink>
                            )}
                        </PaginationItem>
                    )
                })}

                {/* Next button */}
                <PaginationItem>
                    <PaginationNext
                        href={generatePaginationLinks(currentPage + 1, pathname, searchParams)}
                        className={currentPage >= totalPages ? "pointer-events-none opacity-50" : ""}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}