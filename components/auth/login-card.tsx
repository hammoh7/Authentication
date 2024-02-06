"use client";

import React from "react";
import { Card, CardHeader, CardContent, CardFooter } from "../ui/card";
import { Header } from "@/components/auth/header";
import { SocialIcons } from "@/components/auth/social-icons";
import { BackButton } from "@/components/auth/back-button";

interface LoginProps {
  children: React.ReactNode;
  headerLabel: string;
  backButtonLabel: string;
  backButtonHref: string;
  showSocial?: boolean;
}

export const LoginCard = ({
  children,
  headerLabel,
  backButtonLabel,
  backButtonHref,
  showSocial,
}: LoginProps) => {
  return (
    <Card className="w-[500px] shadow-md">
      <CardHeader>
        <Header label={headerLabel} />
      </CardHeader>
      <CardContent>{children}</CardContent>
      {showSocial && 
        (<CardFooter>
            <SocialIcons /> 
        </CardFooter>)}
        <CardFooter>
            <BackButton
                label={backButtonLabel}
                href={backButtonHref}
            />
        </CardFooter>
    </Card>
  );
};
