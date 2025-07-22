// import MainLogo from "@/components/main-logo";
import { buttonVariants } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex min-h-svh flex-col items-center justify-center">
      <Link
        href="/"
        className={buttonVariants({
          variant: "outline",
          className: "absolute top-4 left-4",
        })}
      >
        <ArrowLeft className="size-4" />
        Back to Home
      </Link>
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Link href="/" className="flex items-center self-center">
          {/* <MainLogo /> */}
        </Link>
        {children}

        <div className="text-balance text-center text-xs text-muted-foreground">
          By clicking continue, you agree to our{" "}
          <span className="hover:text-primary hover:underline">
            Terms of Service
          </span>{" "}
          and <span>Privacy Policy</span>
        </div>
      </div>
    </div>
  );
}