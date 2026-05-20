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
import { cn } from "@/lib/utils"
import { PaginatedUserResponse, UserActivityData } from "./types"
import { AnimateSpin } from "../components/AnimateSpin"
import { format } from "date-fns"
import { useState } from "react"
import api from "@/lib/axios"
import { toast } from "react-toastify"
import { useRouter } from "next/navigation"
import { ActionModal } from "../components/ActionModal"
import SendReminderModal from "./Reminder"

const statusStyles: Record<string, string> = {
    // Active: Matches "Delivered" (Green) - Positive/Healthy state
    1: "bg-green-100 text-green-700 border-green-200",

    // Inactive: Matches "Pending" (Amber) - Dormant/Needs attention
    2: "bg-amber-100 text-amber-700 border-amber-200",

    // Suspended: Matches "Cancelled" (Red) - Blocked/Action required
    3: "bg-red-100 text-red-700 border-red-200",

    // Flagged: Matches "Picked Up" (Purple) - Special case/Warning
    4: "bg-purple-100 text-purple-700 border-purple-200",
};

interface DataTableProps {
    data: UserActivityData[];
    setClients: React.Dispatch<React.SetStateAction<PaginatedUserResponse | null>>;
    isLoading?: boolean;
}

export function DataTable({ data, setClients, isLoading }: DataTableProps) {
    const [isUpdatingStatus, setIsUpdatingStatus] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [clientData, setClientData] = useState<UserActivityData | null>(null)
    const router = useRouter()

    const handleUpdateClientStatus = async (id: number, status: number) => {
        if (isUpdatingStatus) return

        setIsUpdatingStatus(true)
        try {
            await api.patch(`/clients`, {
                status,
                clientId: id
            })
            setClients((prev) => {
                if (!prev) return null;
                return {
                    ...prev,
                    data: prev.data.map((client) =>
                        client.id === id ? { ...client, status } : client
                    )
                };
            });
            let msg = status === 1 ? "Client reactivated successfully!" : "Client is now suspended!";
            toast.success(msg);
        } catch (error) {
            toast.error("Client update failed!")

        } finally {
            setIsUpdatingStatus(false)
        }
    }

    const onSend = async (message: string) => {
        if (!clientData) return
        const formData = new FormData();
        formData.append("body", message)
        formData.append("recipientId", clientData?.id.toString())

        const subjectLine = `We've missed you, ${clientData.name.split(' ')[0]}! 👋`;
        formData.append("subject", subjectLine)

        try {
            await api.post("/admin", formData)
        } catch (error) {
            // error already sent on the child component
        }
    }

    const onClose = () => {
        setClientData(null)
        setIsModalOpen(false)
    }

    return (
        <>
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
                                    <span className="text-sm">Loading Clients...</span>
                                </div>
                            </TableCell>
                        </TableRow>
                    ) : (
                        data.map((client) => (
                            <TableRow key={client.id}>
                                <TableCell className="font-medium">{client.name}</TableCell>
                                <TableCell>{client.email}</TableCell>
                                <TableCell>{client.telephone}</TableCell>
                                <TableCell>{client.shipmentCount}</TableCell>
                                <TableCell>{client.lastActivity ? format(new Date(client.lastActivity), "LLL dd, yyyy") : "Not Available"}</TableCell>
                                <TableCell>{client.lastLocation || "Not Available"}</TableCell>
                                <TableCell>
                                    <span className={cn(
                                        "px-2.5 py-0.5 rounded-full text-xs font-medium border",
                                        statusStyles[client.status] || "bg-gray-100 text-gray-700"
                                    )}>
                                        {client.status === 1 ? "Active" : client.status === 2 ? "Inactive" : "Suspended"}
                                    </span>
                                </TableCell>
                                <TableCell className="text-right">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="icon" className="size-8">
                                                <MoreHorizontalIcon />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end" className="w-40">
                                            <DropdownMenuItem onClick={() => {
                                                router.push(`/shipping?search=${client.name.split(" ").join("+")}&page=1`);
                                            }}>
                                                View History
                                            </DropdownMenuItem>
                                            <DropdownMenuItem
                                                onClick={() => {
                                                    setIsModalOpen(true)
                                                    setClientData(client)
                                                }
                                                }
                                            >
                                                Message
                                            </DropdownMenuItem>

                                            <DropdownMenuItem
                                                onSelect={(e) => e.preventDefault()}
                                                className="flex items-center justify-between cursor-default"
                                            >
                                                {/* Text changes dynamically based on current status */}
                                                <Label htmlFor={`suspend-${client.id}`} className="font-normal cursor-pointer flex-1 py-1">
                                                    {client.status === 3 ? "Suspended" : "Suspend"}
                                                </Label>
                                                <Switch
                                                    id={`suspend-${client.id}`}
                                                    // Switch shows ON (checked) if status is 3 (Suspended)
                                                    checked={client.status === 3}
                                                    onCheckedChange={() => {
                                                        // Logic: If currently suspended (3), toggle reactivates them to Active (1).
                                                        // If currently active (1) or inactive (2), toggle changes them to Suspended (3).
                                                        const nextStatus = client.status === 3 ? 1 : 3;
                                                        handleUpdateClientStatus(client.id, nextStatus);
                                                    }}
                                                />
                                            </DropdownMenuItem>

                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem variant="destructive" className="cursor-not-allowed opacity-50">
                                                Delete
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>


                            </TableRow>
                        )
                        ))}
                </TableBody>
            </Table>
            {/* MODAL */}
            {isModalOpen && clientData && (
                <ActionModal
                    title={`Send ${clientData?.name} Inactivity Reminder`}
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    isLocked={false}
                >
                    <SendReminderModal
                        clientData={clientData}
                        onClose={onClose}
                        onSend={onSend}
                    />
                </ActionModal>
            )}
        </>
    )
}
