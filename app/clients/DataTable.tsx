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
import { shippingData } from "./mockdata"
import { cn } from "@/lib/utils"

const statusStyles: Record<string, string> = {
    "Delivered": "bg-green-100 text-green-700 border-green-200",
    "In Transit": "bg-blue-100 text-blue-700 border-blue-200",
    "Pending": "bg-amber-100 text-amber-700 border-amber-200",
    "Picked Up": "bg-purple-100 text-purple-700 border-purple-200",
    "Cancelled": "bg-red-100 text-red-700 border-red-200",
};

export function DataTable() {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Shipping ID</TableHead>
                    <TableHead>Customer Name</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Pickup Location</TableHead>
                    <TableHead>Drop Location</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {shippingData.map((shipment) => (
                    <TableRow key={shipment.id}>
                        <TableCell className="font-medium">{shipment.tracking}</TableCell>
                        <TableCell>{shipment.customer}</TableCell>
                        <TableCell>{shipment.date}</TableCell>
                        <TableCell>{shipment.pickup}</TableCell>
                        <TableCell>{shipment.drop}</TableCell>
                        <TableCell>{shipment.amount}</TableCell>
                        <TableCell>
                            <span className={cn(
                                "px-2.5 py-0.5 rounded-full text-xs font-medium border",
                                statusStyles[shipment.status] || "bg-gray-100 text-gray-700"
                            )}>
                                {shipment.status}
                            </span>
                        </TableCell>
                        <TableCell className="text-right">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon" className="size-8">
                                        <MoreHorizontalIcon />
                                        <span className="sr-only">Open menu</span>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem>Edit</DropdownMenuItem>
                                    <DropdownMenuItem>Duplicate</DropdownMenuItem>
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
