import * as React from "react";

import { ScrollArea } from "@/components/ui/scroll-area";
import { SearchResultCard } from "./SearchResultCard";

export function SearchResults({ shows }: { shows: showProps[] }) {
  return (
    <ScrollArea className="border rounded-md h-72">
      <div className="p-4">
        <h4 className="mb-4 text-sm font-medium leading-none">shows</h4>
        {shows.map((show) => (
          <SearchResultCard show={show} key={show.id} />
        ))}
      </div>
    </ScrollArea>
  );
}
