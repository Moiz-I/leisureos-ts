"use client";

import { SignInButton, UserButton } from "@clerk/clerk-react";
import { useConvexAuth } from "convex/react";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "./ui/button";
import { Spinner } from "./ui/spinner";

export const Navbar = () => {
  const { isAuthenticated, isLoading } = useConvexAuth();

  return (
    <div>
      {isLoading && <Spinner />}
      {!isAuthenticated && !isLoading && (
        <>
          <SignInButton mode="modal">
            <Button variant="ghost" size="sm" className="">
              Log in
            </Button>
            {/* <div className="flex py-[35px]">Login</div> */}
          </SignInButton>
        </>
      )}
      {isAuthenticated && !isLoading && (
        <>
          <UserButton afterSignOutUrl="/" />
        </>
        //see the user section chapter in anotonio yt vid for custom avatar and settings modal.
      )}
      <ThemeToggle />
    </div>
  );
};
