import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
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
import { cn } from "@/lib/utils"
import { AdminReplyProps, APIResponse, MessageStatus, ShippingInquiryMessage } from "./types"
import { format, parseISO } from "date-fns"
import { AnimateSpin } from "../components/AnimateSpin"
import { useEffect, useState } from "react"
import {
    MoreHorizontal,
    ExternalLink,
    Reply,
    CheckCheck,
    Archive,
    Trash2,
    Eye
} from "lucide-react";
import api from "@/lib/axios"
import { toast } from "react-toastify"
import { ActionModal } from "../components/ActionModal"
import { AdminReplyCard } from "./AdminReply"
import { ActiveTab } from "./MessagesTable"

const statusStyles: Record<string, string> = {
    // 1: Unread -> High Attention / Alert (Amber / Orange)
    1: "bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-900/50",

    // 2: Read -> Acknowledged / In Progress (Blue / Informational)
    2: "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-950/40 dark:text-blue-400 dark:border-blue-900/50",

    // 3: Replied -> Resolved / Success State (Green)
    3: "bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-900/50",

    // 4: Archived -> Dormant / Past History (Slate / Gray)
    4: "bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700/50",
};



function messageStatusFormat(status: MessageStatus | string) {
    if (status === 1) return "Unread"
    if (status === 2) return "Read"
    if (status === 3) return "Replied"
    if (status === 4) return "Archived"
}

interface DataTableProps {
    data: ShippingInquiryMessage[];
    setMessages: React.Dispatch<React.SetStateAction<APIResponse | null>>;
    isLoading?: boolean;
    activeTab: ActiveTab;
}

export function DataTable({ data = [], setMessages, isLoading, activeTab }: DataTableProps) {
    const [isUpdatingStatus, setIsUpdatingStatus] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [messageData, setMessageData] = useState<ShippingInquiryMessage | null>(null)
    const [mode, setMode] = useState<"read" | "reply" | "readReply">("read");
    const [isLoadingReply, setIsLoadingReply] = useState(false)
    const [adminReply, setAdminReply] = useState<AdminReplyProps | null>(null)

    const handleUpdateMessageStatus = async (id: number, status: MessageStatus | string) => {
        if (isUpdatingStatus) return

        setIsUpdatingStatus(true)
        try {
            await api.patch(`/contact-us/${id}`, {
                messageStatus: Number(status)
            })
            setMessages((prev) => {
                if (!prev) return null;
                return {
                    ...prev,
                    data: status === 4 ? prev.data.filter((message) => message.id !== id) : prev.data.map((message) =>
                        message.id === id ? { ...message, messageStatus: status } : message
                    )
                };
            });
            if (messageData) {
                setMessageData((prev) => {
                    if (!prev) return null;
                    return {
                        ...prev,
                        messageStatus: status
                    }
                })
            } else {
                toast.success("Message updated successfully!")
            }

        } catch (error) {
            toast.error("Message update failed!")

        } finally {
            setIsUpdatingStatus(false)
        }
    }

    const deleteMessage = async (id: number) => {
        if (isUpdatingStatus) return

        setIsUpdatingStatus(true)
        try {
            await api.delete(`/contact-us/${id}`)
            setMessages((prev) => {
                if (!prev) return null;
                return {
                    ...prev,
                    data: prev.data.filter((message) => message.id !== id)
                };
            });

            toast.success("Message deleted successfully!")
        } catch (error) {
            toast.error("Message deletion failed!")

        } finally {
            setIsUpdatingStatus(false)
        }
    }

    const onSendReply = async (messageId: number, body: string) => {
        if (!messageData) return
        try {
            const res = await api.post(`/contact-us/${messageId}/admin`, {
                replyBody: body,
                id: messageId
            })
            setMode("read")
            if (activeTab !== "unread" && activeTab !== "read") {
                // If the active tab is "unread", we need to refresh the messages
                setMessages((prev) => {
                    if (!prev) return null;
                    return {
                        ...prev,
                        data: prev.data.map((message) =>
                            message.id === messageId ? { ...message, messageStatus: 3 } : message
                        )
                    };
                });
            } else {
                setMessages((prev) => {
                    if (!prev) return null;
                    return {
                        ...prev,
                        data: prev.data.filter((message) => message.id !== messageId)
                    };
                });
            }

        } catch (error) {
            console.error("Failed to send reply:", error);
            // error already sent on the child component
        }
    }

    const onClose = () => {
        setMessageData(null)
        setIsModalOpen(false)
    }

    const handleReadSingleReply = async (id: number) => {
        if (isLoadingReply) return
        setIsLoadingReply(true)
        try {
            const res = await api.get(`/contact-us/${id}/admin`)
            const { replies, ...mainMessage } = res.data
            setAdminReply({ ...replies[0], enquiry: { ...mainMessage } })
            setMessageData(mainMessage)
            setIsModalOpen(true)
            setMode("readReply")
        } catch (error) {
            toast.error("Failed to fetch reply")
        } finally {
            setIsLoadingReply(false)
        }
    }


    useEffect(() => {
        if (isModalOpen && messageData && messageData.messageStatus === 1) {
            handleUpdateMessageStatus(messageData.id, 2)
        }
    }, [messageData, isModalOpen])

    return (
        <>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="text-xs md:text-sm">Sender</TableHead>
                        <TableHead className="text-xs md:text-sm">email</TableHead>
                        <TableHead className="text-xs md:text-sm">Subject</TableHead>
                        <TableHead className="text-xs md:text-sm">Message Brief</TableHead>
                        <TableHead className="text-xs md:text-sm">Date</TableHead>
                        <TableHead className="text-xs md:text-sm">Status</TableHead>
                        <TableHead className="text-xs md:text-sm text-right">Actions</TableHead>
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
                                    <span className="text-sm">Loading messages...</span>
                                </div>
                            </TableCell>
                        </TableRow>
                    ) : (
                        data.map((message) => (
                            <TableRow key={message.id}>
                                <TableCell className="font-medium">{message.senderName}</TableCell>
                                <TableCell>{message.senderEmail}</TableCell>
                                <TableCell>{message.subject}</TableCell>
                                <TableCell className="max-w-[300px] truncate" title={message.body}>
                                    {message.body.length > 80
                                        ? `${message.body.substring(0, 80)}...`
                                        : message.body}
                                </TableCell>

                                <TableCell>{format(parseISO(message.createdAt), "MMM d, yyyy, hh:mm a")}</TableCell>
                                <TableCell>
                                    <span className={cn(
                                        "px-2.5 py-0.5 rounded-full text-xs font-medium border",
                                        statusStyles[message.messageStatus] || "bg-gray-100 text-gray-700"
                                    )}>
                                        {messageStatusFormat(message.messageStatus)}
                                    </span>
                                </TableCell>
                                <TableCell className="text-right">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="size-8 h-8 w-8 rounded-md hover:bg-muted data-[state=open]:bg-muted transition-colors"
                                            >
                                                <MoreHorizontal className="size-4 h-4 w-4 text-muted-foreground" />
                                            </Button>
                                        </DropdownMenuTrigger>

                                        <DropdownMenuContent align="end" className="w-[160px] p-1.5 animate-in fade-in-50 slide-in-from-top-1">

                                            {/* Core Actions Group */}
                                            <DropdownMenuGroup className="space-y-0.5">
                                                <DropdownMenuItem
                                                    onClick={() => {
                                                        setIsModalOpen(true)
                                                        setMessageData(message)
                                                        setMode("read")
                                                    }}
                                                    className="flex items-center gap-2 px-2 py-1.5 text-sm font-medium rounded-md cursor-pointer hover:bg-accent"
                                                >
                                                    <ExternalLink className="size-4 h-4 w-4 text-muted-foreground" />
                                                    <span>{message.messageStatus === 1 ? "Open" : "Read"}</span>
                                                </DropdownMenuItem>

                                                {(message.messageStatus === 1 || message.messageStatus === 2) && (
                                                    <DropdownMenuItem
                                                        onClick={() => {
                                                            setIsModalOpen(true)
                                                            setMessageData(message)
                                                            setMode("reply")
                                                        }}
                                                        className="flex items-center gap-2 px-2 py-1.5 text-sm font-medium rounded-md cursor-pointer hover:bg-accent text-primary"
                                                    >
                                                        <Reply className="size-4 h-4 w-4 text-primary" />
                                                        <span>Reply</span>
                                                    </DropdownMenuItem>
                                                )}

                                                {message.messageStatus === 3 && (
                                                    <DropdownMenuItem
                                                        onClick={() => {
                                                            handleReadSingleReply(message.id)
                                                        }}
                                                        className="flex items-center gap-2 px-2 py-1.5 text-sm font-medium rounded-md cursor-pointer hover:bg-accent text-primary"
                                                    >
                                                        <Eye className="size-4 text-primary" />
                                                        <span>Read Reply</span>
                                                    </DropdownMenuItem>
                                                )}

                                                {message.messageStatus === 1 && (
                                                    <DropdownMenuItem
                                                        onClick={() => handleUpdateMessageStatus(message.id, 2)}
                                                        className="text-emerald-600 focus:text-emerald-700 focus:bg-emerald-50 flex items-center gap-2 px-2 py-1.5 text-sm font-medium rounded-md cursor-pointer hover:bg-accent"
                                                    >
                                                        <CheckCheck className="size-4 text-emerald-600 dark:text-emerald-500" />
                                                        <span>Mark as Read</span>
                                                    </DropdownMenuItem>
                                                )}
                                            </DropdownMenuGroup>

                                            <DropdownMenuSeparator className="my-1" />

                                            {/* Management & Destructive Group */}
                                            <DropdownMenuGroup className="space-y-0.5">
                                                <DropdownMenuItem
                                                    onClick={() => handleUpdateMessageStatus(message.id, 4)}
                                                    className="flex items-center gap-2 px-2 py-1.5 text-sm font-medium rounded-md cursor-pointer hover:bg-accent"
                                                >
                                                    <Archive className="size-4 h-4 w-4 text-muted-foreground" />
                                                    <span>Archive</span>
                                                </DropdownMenuItem>

                                                <DropdownMenuItem
                                                    disabled={isUpdatingStatus}
                                                    className={`flex items-center gap-2 px-2 py-1.5 text-sm font-medium rounded-md ${isUpdatingStatus ? "cursor-not-allowed opacity-40" : "cursor-pointer"} focus:bg-destructive/10 focus:text-destructive text-destructive`}
                                                    onClick={() => deleteMessage(message.id)}
                                                >
                                                    <Trash2 className="size-4 h-4 w-4" />
                                                    <span>Delete</span>
                                                </DropdownMenuItem>
                                            </DropdownMenuGroup>

                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        )
                        ))}
                </TableBody>
            </Table>
            {isModalOpen && messageData && (
                <ActionModal
                    title={`Inquiry from ${messageData?.senderName}`}
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    isLocked={false}
                >
                    <AdminReplyCard
                        onClose={onClose}
                        onSendReply={onSendReply}
                        message={messageData}
                        adminReply={adminReply}
                        mode={mode}
                        setMode={setMode}
                    />
                </ActionModal>
            )}
        </>
    )
}
