"use server";
import { signIn } from "@/services/auth.service";
import { AuthError } from "next-auth";

export const loginAction = async (formData: any) => {
  try {
    await signIn("credentials", {
      email: formData.email,
      password: formData.password,
      redirect: false, // Essential to catch the error here
    });
    return { success: true };
  } catch (error) {
    if (error instanceof AuthError) {
      // Auth.js wraps your custom 'code' inside the error object
      const errorCode = error.cause?.err || error.type;

      return {
        success: false,
        error: errorCode, // Returns "USER_NOT_VERIFIED" or "INVALID_CREDENTIALS"
      };
    }
    throw error;
  }
};
