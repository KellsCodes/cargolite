import { redirect } from "next/navigation";
import { auth } from "@/services/auth.service";
import SignupUI from "./SignUpUI";

export default async function Login() {
    const session = await auth()

    if (session) {
        redirect("/dashboard")
    }
    return <SignupUI />
}