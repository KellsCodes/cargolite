import { ClockPlus, History, PackageCheck, PackageX } from "lucide-react";

export const statCardData = [
    {
        name: "Total Delivered",
        icon: <PackageCheck className="w-[18px] opacity-50" />,
        id: "total"
    },
    {
        name: "On Delivery",
        icon: <ClockPlus className="w-[18px] opacity-50" />,
        id: "onDelivery"
    },
    {
        name: "Cancel Delivery",
        icon: <PackageX className="w-[18px] opacity-50" />,
        id: "cancelled"
    },
    {
        name: "Return Delivery",
        icon: <History className="w-[18px] opacity-50" />,
        id: "returned"

    },
]
