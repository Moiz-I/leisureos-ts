"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import axios from "axios";
import { SearchResults } from "./SearchResults";

interface returnedShowsProps {
  show: showProps;
}

export const SearchModal = () => {
  const [query, setQuery] = useState<string>("");
  const [returnedShows, setReturnedShows] = useState<showProps[]>([]);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const res = await axios.get(
          `https://api.tvmaze.com/search/shows?q=${query}`
        );

        if (isMounted) {
          setReturnedShows(
            res.data.map((showArr: returnedShowsProps) => showArr.show)
          );
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();

    // Cleanup function to handle unmounting
    return () => {
      isMounted = false;
    };
  }, [query]);

  return (
    <Dialog>
      <DialogTrigger>Open</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
          <Input
            onChange={(event) => setQuery(event.target.value)}
            value={query}
          />
        </DialogHeader>
        <SearchResults shows={returnedShows} />
      </DialogContent>
    </Dialog>
  );
};
