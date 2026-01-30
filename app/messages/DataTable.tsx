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
import { messageMockData } from "./mockdata"
import { cn } from "@/lib/utils"

const statusStyles: Record<string, string> = {
    // Active: Matches "Delivered" (Green) - Positive/Healthy state
    "Read": "bg-green-100 text-green-700 border-green-200",

    // Inactive: Matches "Pending" (Amber) - Dormant/Needs attention
    "Unread": "bg-amber-100 text-amber-700 border-amber-200",

    // Flagged: Matches "Picked Up" (Purple) - Special case/Warning
    "Replied": "bg-purple-100 text-purple-700 border-purple-200",
};

export function DataTable() {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Sender</TableHead>
                    <TableHead>email</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Message Brief</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                </TableRow>
            </TableHeader>

            <TableBody>
                {messageMockData.map((message) => (
                    <TableRow key={message.id}>
                        <TableCell className="font-medium">{message.name}</TableCell>
                        <TableCell>{message.email}</TableCell>
                        <TableCell>{message.subject}</TableCell>
                        <TableCell>{message.snippet}</TableCell>
                        <TableCell>{message.date}</TableCell>
                        <TableCell>
                            <span className={cn(
                                "px-2.5 py-0.5 rounded-full text-xs font-medium border",
                                statusStyles[message.status] || "bg-gray-100 text-gray-700"
                            )}>
                                {message.status}
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
                                    <DropdownMenuItem>Open</DropdownMenuItem>
                                    <DropdownMenuItem>Reply</DropdownMenuItem>
                                    <DropdownMenuItem>Mark as Read</DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>Archive</DropdownMenuItem>
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
