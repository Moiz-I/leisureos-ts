"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import { SearchModal } from "./SearchShows/SearchModal";

interface SearchLibraryProps {
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
}

export const SearchLibrary = ({ query, setQuery }: SearchLibraryProps) => {
  // const [query, setQuery] = useState("");
  return (
    <div className="flex gap-2 py-5 mt-2">
      <Input
        type="text"
        placeholder="type to search"
        autoFocus
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <SearchModal />
    </div>
  );
};
