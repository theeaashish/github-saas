"use client";
// import MainLogo from "@/components/main-logo";
import { buttonVariants } from "@/components/ui/button";
// import { ThemeToggle } from "@/components/ui/themeToggle";
import Link from "next/link";
import { UserDropDown } from "../(protected)/_components/UserDropdown";
import { authClient } from "@/lib/authClient";
import { ModeToggle } from "@/components/ui/ModeToggle";

export default function NavBar() {
  const { data: session, isPending } = authClient.useSession();
  interface NavigationItemProps {
    name: string;
    href: string;
  }

  const navigationItems: NavigationItemProps[] = [
    { name: "Home", href: "/" },
    { name: "Courses", href: "/courses" },
    { name: "Dashboard", href: "/dashboard" },
  ];
  return (
    <header className="bg-background/95 backdrop-blur-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b">
      <div className="container mx-auto flex min-h-16 items-center px-4 md:px-6 lg:px-8">
        {/* desktop navigation */}
        <nav className="flex flex-1 items-center justify-between">
          <Link href="/">{/* <MainLogo /> */}</Link>
          <div className="hidden md:flex md:items-center md:space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="hover:text-primary text-sm font-medium transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-4">
            {/* <ThemeToggle /> */}
            {isPending ? null : session ? (
              <UserDropDown />
            ) : (
              <>
                <Link
                  href="/login"
                  className={buttonVariants({
                    variant: "outline",
                    className: "max-sm:hidden",
                  })}
                >
                  Login
                </Link>
                <Link
                  href="/login"
                  className={buttonVariants({
                    className: "max-sm:px-2 max-sm:text-xs",
                  })}
                >
                  Get Started
                </Link>
              </>
            )}

            <ModeToggle />
          </div>
        </nav>
      </div>
    </header>
  );
}
