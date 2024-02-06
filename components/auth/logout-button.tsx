"use client";

import { Logout } from "@/activities/logout";

interface LogoutProps {
    children?: React.ReactNode;
}

export const LogoutBtn = ({
    children
}: LogoutProps) => {
    const onClick = () => {
        Logout()
    }
    return (
        <span onClick={onClick} className="cursor-pointer">
            {children}
        </span>
    )
}