import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Noto_Sans } from "next/font/google";
import { LoginBtn } from "@/components/auth/login-button";


const font = Noto_Sans({
  subsets: ["latin"],
  weight: ["500"],
});

export default function Home() {
  return (
    <main className="flex flex-col h-full items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-500 to-indigo-900">
      <div className="space-y-5 text-center">
        <h1
          className={cn(
            "text-5xl font-bold text-white drop-shadow-md",
            font.className
          )}
        >
          ConfirmAuth
        </h1>
        <p className="text-white text-xl">
          Security is the prime convenience for us!
        </p>

        <div>
          <LoginBtn>
            <Button variant="outline" size="lg" className="">
              Sign In
            </Button>
          </LoginBtn>
        </div>
      </div>
    </main>
  );
}
