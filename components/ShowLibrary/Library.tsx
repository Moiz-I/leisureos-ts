"use client";

import { useConvexAuth } from "convex/react";
import { ShowLibrary } from "./ShowLibrary";

export const Library = () => {
  const { isAuthenticated, isLoading } = useConvexAuth();
  return (
    // <div className="w-[100%] mx-auto px-[10rem] container">
    <div className="w-[100%] px-[5rem] container">
      {isAuthenticated && !isLoading && <ShowLibrary />}
      {!isAuthenticated && !isLoading && (
        <div className="flex py-[35px]">Login</div>
      )}
    </div>
  );
};
