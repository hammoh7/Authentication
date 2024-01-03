"use client";
import { useRouter } from "next/navigation";

interface LoginButton {
  children: React.ReactNode;
  mode?: "modal" | "redirect";
  asChild?: boolean;
}

export const LoginBtn = ({
  children,
  mode = "redirect",
  asChild,
}: LoginButton) => {
    const router = useRouter();
  const onClick = () => {
    router.push("/Login");
  };
  if (mode === "modal") {
    return <span>Implementing modal</span>;
  }
  return (
    <span onClick={onClick} className="cursor-pointer">
      {children}
    </span>
  );
};
