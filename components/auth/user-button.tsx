"use client";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { ExitToApp, Person } from "@mui/icons-material";
import { currentUser } from "@/hooks/current-user";
import { LogoutBtn } from "./logout-button";

export const UserBtn = () => {
    const user = currentUser();
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Avatar>
                    <AvatarImage src={user?.image || ""} />
                    <AvatarFallback>
                        <Person />
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <LogoutBtn>
                    <DropdownMenuItem>
                        <ExitToApp className="mr-2" />
                        Logout
                    </DropdownMenuItem>
                </LogoutBtn>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
