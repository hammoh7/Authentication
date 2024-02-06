"use client";

import { GitHub, Google } from "@mui/icons-material";
import { Button } from "../ui/button";
import { signIn } from "@/auth";
import { Default_Login_Redirect } from "@/routes";

export const SocialIcons = () => {
  const onClick = (provider: "google" | "github") => {
    signIn(provider, {
      callbackUrl: Default_Login_Redirect,
    });
  };
  return (
    <div className="flex items-center w-full gap-x-3">
      <Button
        size="lg"
        className="w-full"
        variant="outline"
        onClick={() => onClick("google")}
      >
        <Google className="h-5 w-5 " />
      </Button>
      <Button
        size="lg"
        className="w-full"
        variant="outline"
        onClick={() => onClick("github")}
      >
        <GitHub className="h-5 w-5 " />
      </Button>
    </div>
  );
};
