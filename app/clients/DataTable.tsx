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
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { MoreHorizontalIcon } from "lucide-react"
import { clientMockData } from "./mockdata"
import { cn } from "@/lib/utils"

const statusStyles: Record<string, string> = {
    // Active: Matches "Delivered" (Green) - Positive/Healthy state
    "Active": "bg-green-100 text-green-700 border-green-200",

    // Inactive: Matches "Pending" (Amber) - Dormant/Needs attention
    "Inactive": "bg-amber-100 text-amber-700 border-amber-200",

    // Suspended: Matches "Cancelled" (Red) - Blocked/Action required
    "Suspended": "bg-red-100 text-red-700 border-red-200",

    // Flagged: Matches "Picked Up" (Purple) - Special case/Warning
    "Flagged": "bg-purple-100 text-purple-700 border-purple-200",
};

export function DataTable() {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Client Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Total Shipments</TableHead>
                    {/* Helps identify if they are a regular or new customer */}
                    <TableHead>Last Activity</TableHead>
                    <TableHead>Location</TableHead>
                    {/* Critical for identifying high-value or problematic clients */}
                    <TableHead>Account Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                </TableRow>
            </TableHeader>

            <TableBody>
                {clientMockData.map((client) => (
                    <TableRow key={client.id}>
                        <TableCell className="font-medium">{client.name}</TableCell>
                        <TableCell>{client.email}</TableCell>
                        <TableCell>{client.phone}</TableCell>
                        <TableCell>{client.totalShipments}</TableCell>
                        <TableCell>{client.lastActivity}</TableCell>
                        <TableCell>{client.location}</TableCell>
                        <TableCell>
                            <span className={cn(
                                "px-2.5 py-0.5 rounded-full text-xs font-medium border",
                                statusStyles[client.status] || "bg-gray-100 text-gray-700"
                            )}>
                                {client.status}
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
                                    <DropdownMenuItem>View History</DropdownMenuItem>
                                    <DropdownMenuItem>Message</DropdownMenuItem>
                                    <div className="flex items-center space-x-2 text-xs px-2">
                                        <Label htmlFor="suspend" className="font-normal">Suspend</Label>
                                        <Switch id="suspend" />
                                    </div>
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
