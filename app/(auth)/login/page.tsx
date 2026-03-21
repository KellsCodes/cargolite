import { redirect } from "next/navigation";
import LoginUI from "./LoginUI";
import { auth } from "@/services/auth.service";

export default async function Login() {
    const session = await auth()

    if (session) {
        redirect("/dashboard")
    }
    return <LoginUI />
}