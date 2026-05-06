import { ClockPlus, History, PackageCheck, PackageX } from "lucide-react";

export const statCardData = [
    {
        name: "Total Delivered",
        icon: <PackageCheck className="w-[18px] opacity-50" />,
        id: "totalDelivery"
    },
    {
        name: "On Delivery",
        icon: <ClockPlus className="w-[18px] opacity-50" />,
        id: "totalInTransit"
    },
    {
        name: "Cancel Delivery",
        icon: <PackageX className="w-[18px] opacity-50" />,
        id: "totalCancelled"
    },
    {
        name: "Return Delivery",
        icon: <History className="w-[18px] opacity-50" />,
        id: "totalReturned"
    },
]
