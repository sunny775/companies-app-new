"use server";

import { signOut } from "@/lib/utils/auth";
import { AuthError } from "next-auth";

export async function logout() {
  try {
    await signOut({ redirectTo: "/" });
  } catch (error) {
    if (error instanceof AuthError) {
      return "Error signing out";
    }
    throw error;
  }
}
