import React, { ReactNode } from "react";
// import { BellIcon, Search, TextAlignStart } from "lucide-react";
// import { MobileBottomAuthMenu, MobileNav, Sidebar } from "../Sidebar";
// import { auth } from "@/services/auth.service";
// import { redirect } from "next/navigation";
import Layout from "./Layout";
import { getRequiredSession } from "@/lib/auth-session";

interface AuthLayoutProps {
    children: ReactNode;
}

export default async function AuthLayout({ children }: AuthLayoutProps) {
    await getRequiredSession()

    return <Layout children={children} />
}