"use client";

import { UserBtn } from "@/components/auth/user-button";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Navbar = () => {
    const pathname = usePathname();

    return (
        <div className="bg-slate-300 flex justify-between items-center m-4 p-4 rounded-xl w-[500px] shadow-lg">
            <div className="flex gap-x-2">
                <Button asChild>
                    <Link href="/server">
                        Info
                    </Link>
                </Button>
                <Button asChild>
                    <Link href="/admin">
                        Admin
                    </Link>
                </Button>
                <Button asChild>
                    <Link href="/settings">
                        Settings
                    </Link>
                </Button>
            </div>
            <UserBtn />
        </div>
    )
}