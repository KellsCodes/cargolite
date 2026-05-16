"use client"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { MoreHorizontalIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { APIResponse, InvoicePayload } from "./types"
import { format } from "date-fns"
import { InvoiceStatus } from "@/generated/prisma/enums"
import { AnimateSpin } from "../components/AnimateSpin"
import { useState } from "react"
import api from "@/lib/axios"
import { toast } from "react-toastify"
import { handleDownloadInvoice } from "@/lib/api/invoice"
import { ActionModal } from "../components/ActionModal"
import SendReminderModal from "./Reminder"

const statusStyles: Record<string, string> = {
    // Active: Matches "Delivered" (Green) - Positive/Healthy state
    [InvoiceStatus.PAID]: "bg-green-100 text-green-700 border-green-200",

    // Inactive: Matches "Pending" (Amber) - Dormant/Needs attention
    [InvoiceStatus.UNPAID]: "bg-amber-100 text-amber-700 border-amber-200",

    // Suspended: Matches "Cancelled" (Red) - Blocked/Action required
    [InvoiceStatus.REFUND]: "bg-red-100 text-red-700 border-red-200",

    // Flagged: Matches "Picked Up" (Purple) - Special case/Warning
    [InvoiceStatus.OVERDUE]: "bg-purple-100 text-purple-700 border-purple-200",
};


interface DataTableProps {
    data: InvoicePayload[];
    setTransactions: React.Dispatch<React.SetStateAction<APIResponse | null>>;
    isLoading?: boolean;
}

export function DataTable({ data = [], setTransactions, isLoading }: DataTableProps) {
    const [isDownloading, setIsDownloading] = useState(false)
    const [isUpdatingStatus, setIsUpdatingStatus] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [invoiceData, setInvoiceData] = useState<InvoicePayload | null>(null)

    const handleUpdateInvoiceStatus = async (id: number, status: InvoiceStatus) => {
        if (isUpdatingStatus || InvoiceStatus.PAID || InvoiceStatus.REFUND) return

        setIsUpdatingStatus(true)
        try {
            await api.patch(`/transaction/${id}`, {
                invoiceStatus: status
            })
            setTransactions((prev) => {
                if (!prev) return null;
                return {
                    ...prev,
                    data: prev.data.map((invoice) =>
                        invoice.id === id ? { ...invoice, invoiceStatus: status } : invoice
                    )
                };
            });

            toast.success("Invoice updated successfully!")
        } catch (error) {
            toast.error("Invoice update failed!")

        } finally {
            setIsUpdatingStatus(false)
        }
    }

    const onSend = async (message: string) => {
        if (!invoiceData) return
        const formData = new FormData();
        formData.append("body", message)
        formData.append("recipientId", invoiceData?.clientId.toString())
        formData.append("subject", "Payment Due")
        // append attachment(in v2)
        // formData.append("attachmentUrls", FileName)
        try {
            await api.post("/admin", formData)

        } catch (error) {

        }
    }
    const onClose = () => {
        setInvoiceData(null)
        setIsModalOpen(false)
    }

    return (
        <>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Transaction/Invoice ID</TableHead>
                        <TableHead>Client Name</TableHead>
                        <TableHead>Shipment ID</TableHead>
                        <TableHead>Date Issued</TableHead>
                        <TableHead>Amount Due</TableHead>
                        <TableHead>Payment Method</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {!isLoading && !data.length ? (
                        <TableRow>
                            <TableCell colSpan={8} className="h-64 text-center">
                                <div className="flex flex-col items-center justify-center gap-2">
                                    <span className="text-sm">No record found.</span>
                                </div>
                            </TableCell>
                        </TableRow>
                    ) : isLoading ? (
                        <TableRow>
                            <TableCell colSpan={8} className="h-64 text-center">
                                <div className="flex flex-col items-center justify-center gap-2">
                                    <AnimateSpin />
                                    <span className="text-sm">Loading invoice...</span>
                                </div>
                            </TableCell>
                        </TableRow>
                    ) : (
                        data.map((transaction) => (
                            <TableRow key={transaction.id}>
                                <TableCell className="font-medium">{transaction.transactionID}</TableCell>
                                <TableCell className="max-w-[200px] truncate">{transaction.client.name}</TableCell>
                                <TableCell>{transaction.shipment.shipmentID}</TableCell>
                                <TableCell>{format(new Date(transaction.createdAt), "LLL dd, yyyy")}</TableCell>
                                <TableCell>{Number(transaction.amount).toLocaleString("en-us", {
                                    style: "currency",
                                    currency: "USD"
                                })}</TableCell>
                                <TableCell>{transaction.paymentMethod}</TableCell>
                                <TableCell>
                                    <span className={cn(
                                        "px-2.5 py-0.5 rounded-full text-xs font-medium border",
                                        statusStyles[transaction.invoiceStatus] || "bg-gray-100 text-gray-700"
                                    )}>
                                        {transaction.invoiceStatus}
                                    </span>
                                </TableCell>

                                {/* DROP DOWN MENU */}
                                <TableCell className="text-right">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="icon" className="size-8">
                                                <MoreHorizontalIcon />
                                            </Button>
                                        </DropdownMenuTrigger>

                                        <DropdownMenuContent align="end" className="w-44">
                                            {/* Download always available unless refunded */}
                                            {transaction.invoiceStatus !== InvoiceStatus.REFUND && (
                                                <DropdownMenuItem onClick={() => handleDownloadInvoice(transaction.id, isDownloading, setIsDownloading)}>
                                                    Download Invoice
                                                </DropdownMenuItem>
                                            )}

                                            {/* Send reminder if client still owes money and shipment is overdue */}
                                            {(transaction.invoiceStatus === InvoiceStatus.OVERDUE) && (
                                                <DropdownMenuItem onClick={() => {
                                                    setInvoiceData(transaction)
                                                    setIsModalOpen(true)
                                                }}>
                                                    Send Reminder
                                                </DropdownMenuItem>
                                            )}

                                            {/* Only show "Mark as Paid" if current status is exactly UNPAID or OVERDUE */}
                                            {(transaction.invoiceStatus === InvoiceStatus.UNPAID || transaction.invoiceStatus === InvoiceStatus.OVERDUE) && (
                                                <DropdownMenuItem
                                                    onClick={() => handleUpdateInvoiceStatus(transaction.id, InvoiceStatus.PAID)}
                                                    className="text-emerald-600 focus:text-emerald-700 focus:bg-emerald-50 font-medium"
                                                >
                                                    Mark as Paid
                                                </DropdownMenuItem>
                                            )}

                                            <>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem variant="destructive" className="cursor-not-allowed opacity-50">
                                                    Delete
                                                </DropdownMenuItem>
                                            </>

                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>

                            </TableRow>
                        )))}
                </TableBody>
            </Table>
            {/* MODAL */}
            {isModalOpen && invoiceData && (
                <ActionModal
                    title={`Send ${invoiceData?.client.name} Payment Reminder`}
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    isLocked={false}
                >
                    <SendReminderModal
                        onClose={onClose}
                        onSend={onSend}
                        transaction={invoiceData}
                    />
                </ActionModal>
            )}
        </>
    )
}
