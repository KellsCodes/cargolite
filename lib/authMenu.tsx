import { CircleDollarSign, CircleUser, Headset, LayoutGrid, MessageSquareDot, Package, Settings, Truck, Users } from "lucide-react";

export const authMenu = [
    {
        name: "Dashboard",
        icon: <LayoutGrid className="w-5" />,
        link: "/dashboard"
    },
    {
        name: "Shipping",
        icon: <Truck className="w-5" />,
        link: "/shipping"
    },
    {
        name: "Tracking",
        icon: <Package className="w-5" />,
        link: "/tracking"
    },
    {
        name: "Clients",
        icon: <Users className="w-5" />,
        link: "/clients"
    },
    {
        name: "Payments",
        icon: <CircleDollarSign className="w-5" />,
        link: "/payments"
    },
    {
        name: "Message",
        icon: <MessageSquareDot className="w-5" />,
        link: "/messages"
    },
    {
        name: "Settings",
        icon: <Settings className="w-5" />,
        link: "/settings"
    },
    {
        name: "My Account",
        icon: <CircleUser className="w-5" />,
        link: "/account"
    },
    {
        name: "Help & Support",
        icon: <Headset className="w-5" />,
        link: "/help-and-support"
    }
]