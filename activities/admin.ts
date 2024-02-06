"use server";

import { currentRoleAuth } from "@/lib/auth";
import { UserRole } from "@prisma/client";

export const admin = async() => {
    const role = await currentRoleAuth();

    if (role === UserRole.ADMIN) {
        return { success: "Allowed" }
    }
    return { error: "Forbidden" }
}