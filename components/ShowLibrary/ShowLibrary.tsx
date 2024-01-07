"use client";

import { Button } from "@/components/ui/button";
import { ShowCard } from "./ShowCard";
import { useEffect, useState } from "react";
import { SearchLibrary } from "../SearchLibrary";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { TagFilter } from "../TagFilter";

export const ShowLibrary = () => {
  const [query, setQuery] = useState("");
  const [isMounted, setIsMounted] = useState(false);
  const showLibraryConvex = useQuery(api.showLibrary.getLibrary);
  const [activeTags, setActiveTags] = useState<string[]>([]);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);
  if (!isMounted) return null;

  const filteredShows = showLibraryConvex?.filter((show) => {
    const hasMatchingQuery = show.name
      .toLowerCase()
      .includes(query.toLowerCase());
    const hasMatchingTags =
      activeTags.length === 0 ||
      activeTags.every((tag) => show.tags?.includes(tag));

    return hasMatchingQuery && hasMatchingTags;
  });
  // Separate the shows with the "favourite" tag from the rest
  const favoriteShows =
    filteredShows?.filter((show) => show.tags?.includes("favourite")) || [];
  const otherShows =
    filteredShows?.filter((show) => !show.tags?.includes("favourite")) || [];

  // Concatenate the two lists to render "favourite" shows first
  const sortedShows = favoriteShows.concat(otherShows);

  return (
    <div className="w-[100%] px-[5rem] container">
      <SearchLibrary query={query} setQuery={setQuery} />
      <TagFilter activeTags={activeTags} setActiveTags={setActiveTags} />
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {sortedShows?.map((show) => (
          <ShowCard
            show={show}
            link={show.link}
            key={show.idx}
            id={show._id}
            tags={show.tags}
          />
        ))}
      </div>
    </div>
  );
};
