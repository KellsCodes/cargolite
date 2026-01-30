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
import { paymentMockData } from "./mockdata"
import { cn } from "@/lib/utils"

const statusStyles: Record<string, string> = {
    // Active: Matches "Delivered" (Green) - Positive/Healthy state
    "Paid": "bg-green-100 text-green-700 border-green-200",

    // Inactive: Matches "Pending" (Amber) - Dormant/Needs attention
    "Unpaid": "bg-amber-100 text-amber-700 border-amber-200",

    // Suspended: Matches "Cancelled" (Red) - Blocked/Action required
    "Refunded": "bg-red-100 text-red-700 border-red-200",

    // Flagged: Matches "Picked Up" (Purple) - Special case/Warning
    "Overdue": "bg-purple-100 text-purple-700 border-purple-200",
};

export function DataTable() {
    return (
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
                {paymentMockData.map((transaction) => (
                    <TableRow key={transaction.id}>
                        <TableCell className="font-medium">{transaction.id}</TableCell>
                        <TableCell>{transaction.client}</TableCell>
                        <TableCell>{transaction.shipmentId}</TableCell>
                        <TableCell>{transaction.date}</TableCell>
                        <TableCell>{transaction.amount}</TableCell>
                        <TableCell>{transaction.method || "Bank Transfer"}</TableCell>
                        <TableCell>
                            <span className={cn(
                                "px-2.5 py-0.5 rounded-full text-xs font-medium border",
                                statusStyles[transaction.status] || "bg-gray-100 text-gray-700"
                            )}>
                                {transaction.status}
                            </span>
                        </TableCell>
                        <TableCell className="text-right">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon" className="size-8">
                                        <MoreHorizontalIcon />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem>Generate Invoice</DropdownMenuItem>
                                    <DropdownMenuItem>Send Reminder</DropdownMenuItem>
                                    <DropdownMenuItem>Mark as Paid</DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem variant="destructive">
                                        Delete
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}
