import { Noto_Sans } from "next/font/google";
import { cn } from "@/lib/utils";

const font = Noto_Sans({
  subsets: ["latin"],
  weight: ["500"],
});

interface HeaderProps {
  label: string;
}

export const Header = ({ label }: HeaderProps) => {
  return (
    <div className="w-full flex flex-col gap-y-5 items-center justify-center">
      <h1 className={cn("text-3xl")}>ConfirmAuth</h1>
      <p className="text-muted-foreground text-sm">{label}</p>
    </div>
  );
};
