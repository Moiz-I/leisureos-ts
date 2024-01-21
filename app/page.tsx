import { useConvexAuth } from "convex/react";
import { ShowLibrary } from "../components/ShowLibrary/ShowLibrary";
import { ThemeToggle } from "@/components/ThemeToggle";
import { SignInButton } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Library } from "@/components/ShowLibrary/Library";

export default function Home() {
  return (
    <div className="">
      
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div>
      <div className="flex px-4">
        <Library />
        <Navbar />
        {/* <div className="flex py-[35px]">Login</div>
        <ThemeToggle /> */}
      </div>
      {/* <SearchModal /> */}
    </div>
  );
}
