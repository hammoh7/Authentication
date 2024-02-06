import { auth } from "@/auth";

export const currentUserAuth = async () => {
    const session = await auth();

    return session?.user;
}

export const currentRoleAuth = async () => {
    const session = await auth();

    return session?.user?.role;
}