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
import { Shipment } from "./types"
import { format } from "date-fns"
import { ShipmentStatus } from "@/generated/prisma/enums"
import { useRouter } from "next/navigation" 
import Link from "next/link"

const statusStyles: Record<string, string> = {
    // Critical / Negative
    [ShipmentStatus.CANCELLED]: "bg-red-50 text-red-700 border-red-200",
    [ShipmentStatus.RETURNED]: "bg-rose-50 text-rose-700 border-rose-200",

    // Warning / Waiting
    [ShipmentStatus.DELAYED]: "bg-amber-50 text-amber-700 border-amber-200",

    // In Progress
    [ShipmentStatus.IN_TRANSIT]: "bg-blue-100 text-blue-700 border-blue-200",

    // Logistics Steps (Differentiated)
    [ShipmentStatus.PICKED_UP]: "bg-purple-100 text-purple-700 border-purple-200",
    [ShipmentStatus.WAREHOUSE_ARRIVED]: "bg-slate-100 text-slate-700 border-slate-300",
    [ShipmentStatus.OUT_FOR_DELIVERY]: "bg-purple-50 text-purple-700 border-purple-200",

    // Completed
    [ShipmentStatus.DELIVERED]: "bg-emerald-50 text-emerald-700 border-emerald-200",
};

const formatStatus = (status: string): string => {
    if (!status) return "";

    if (status.includes("_")) {
        return status
            .split("_")
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(" ");
    }

    return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
};


export function DataTable({ data = [] }: { data?: Shipment[] }) {
    const router = useRouter();
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Shipping ID</TableHead>
                    <TableHead>Customer Name</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Origin</TableHead>
                    <TableHead>Destination</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.map((shipment) => (
                    // {/* {shippingData.map((shipment) => ( */}
                    <TableRow key={shipment.id}>
                        <TableCell className="font-medium text-blue-700">
                            <Link href={`/tracking?${shipment.shipmentID}`}>
                                {shipment.shipmentID}
                            </Link>
                        </TableCell>
                        <TableCell className="max-w-[200px] truncate">{shipment.clientName}</TableCell>
                        <TableCell>{format(new Date(shipment.createdAt), "LLL dd, yyyy")}</TableCell>
                        <TableCell className="max-w-[200px] truncate">{shipment.dropLocation}</TableCell>
                        <TableCell className="max-w-[200px] truncate">{shipment.pickupLocation}</TableCell>
                        <TableCell>
                            {Number(shipment.amount).toLocaleString("en-US", {
                                style: "currency",
                                currency: "USD"
                            })}
                        </TableCell>
                        <TableCell>
                            <span className={cn(
                                "px-2.5 py-0.5 rounded-full text-xs font-medium border",
                                statusStyles[shipment.trackingHistory[0].status] || "bg-gray-100 text-gray-700"
                            )}>
                                {formatStatus(shipment.trackingHistory[0].status)}
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
                                    <DropdownMenuItem
                                        onClick={() => {
                                            if (ShipmentStatus.PICKED_UP !== shipment.trackingHistory[0].status) return
                                            // navigate to update page
                                            router.push(`/shipping/updateshipment/${shipment.shipmentID}`)
                                        }}
                                        className={`${ShipmentStatus.PICKED_UP !== shipment.trackingHistory[0].status && "cursor-not-allowed"}`}>Edit</DropdownMenuItem>
                                    {/* <DropdownMenuItem>Duplicate</DropdownMenuItem> */}
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem variant="destructive" className={`${ShipmentStatus.PICKED_UP !== shipment.trackingHistory[0].status && "cursor-not-allowed"}`}>
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
