// import 'server-only';
import { auth } from "@/services/auth.service";
import { redirect } from "next/navigation";

export async function getRequiredSession() {
  const session = await auth();
  if (!session) {
    redirect("/");
  }
  return session;
}
