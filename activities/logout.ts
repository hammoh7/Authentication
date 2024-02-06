"use server";

import { signOut } from "@/auth";

export const Logout = async () => {
    // server logic for Logout
    await signOut();
}