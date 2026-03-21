// import api from "../axios";
import { signIn } from "next-auth/react";
export const Auth = {
  login: async (email: string, password: string) => {
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false, // Prevents automatic redirect so we can handle errors manually
      callbackUrl: "/dashboard",
    });
    return result
  },
  // api.post("/auth/callback/credentials", data),
};
