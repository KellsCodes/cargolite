import { redirect } from "next/navigation";
import { auth } from "@/services/auth.service";
import EmailOtpVerification from "./UserVerification";

export default async function UserVerification() {
    const session = await auth()

    if (session) {
        redirect("/dashboard")
    }
    return <EmailOtpVerification />
}