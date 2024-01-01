"use client";

import { useShowStore } from "@/app/utils/useShowStore";
import { Button } from "@/components/ui/button";
import { ShowCard } from "./ShowCard";
import { useEffect, useState } from "react";
import { SearchLibrary } from "../SearchLibrary";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export const ShowLibrary = () => {
  const { showLibrary, addShow, removeShow } = useShowStore();
  const [query, setQuery] = useState("");
  const [isMounted, setIsMounted] = useState(false);
  const showLibraryConvex = useQuery(api.showLibrary.getLibrary);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);
  if (!isMounted) return null;
  return (
    // <div className="w-[100%] mx-auto px-[10rem] container ">
    <div className="w-[100%] px-[5rem] container">
      <SearchLibrary query={query} setQuery={setQuery} />
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {showLibraryConvex?.map(
          (show) =>
            show.name.toLowerCase().includes(query.toLowerCase()) && (
              <ShowCard
                show={show}
                link={show.link}
                key={show.idx}
                id={show._id}
              />
            )
        )}
        {/* {showLibrary.map(
          (show) =>
            show.show.name.toLowerCase().includes(query.toLowerCase()) && (
              <ShowCard show={show.show} link={show.link} key={show.show.idx} />
            )
        )} */}
      </div>
    </div>
  );
};
