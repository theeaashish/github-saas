import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import NavBar from "./_components/Navbar";

export default function Home() {
  return (
    <>
      <NavBar />
      <div className="p-10 text-3xl">
        <Link href={"/dashboard"} className={buttonVariants()}>
          Click Me
        </Link>
      </div>
    </>
  );
}
