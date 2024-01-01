"use client";

import Image from "next/image";
import { instrument_serif } from "@/app/fonts";

import fallback from "@/public/fallback.png";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@radix-ui/react-popover";
import { AddShowPopover } from "../AddShow/AddShowPopover";
import { showProps } from "@/app/types/showResultProps";
import { cn } from "@/app/lib/utils";
import { useShowStore } from "@/app/utils/useShowStore";
import { useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

interface SearchResultCardProps {
  show: showProps;
}

export const SearchResultCard = ({ show }: SearchResultCardProps) => {
  const { name, idx, image } = show;
  // const { showLibrary, addShow, removeShow } = useShowStore();
  const isInLibrary = useQuery(api.showLibrary.isInLibrary, { idx });
  // const isShowInLibrary = showLibrary.some((show) => show.show.idx === idx);
  const [popoverOpen, setPopoverOpen] = useState(false);

  return (
    <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
      <PopoverTrigger disabled={isInLibrary}>
        <span className="flex p-3 rounded-md bg-zinc-100">
          <Image
            src={image == "fallback" ? fallback : image}
            alt={name}
            width={50}
            height={200}
            className="w-auto h-auto rounded-md"
          />
          <div className="flex flex-col justify-center ml-4">
            <div
              className={cn(
                "leading-none text-2xl italic",
                instrument_serif.className
              )}
            >
              {name}
            </div>
            <div className="text-xs text-left text-neutral-500">{idx}</div>
          </div>
        </span>
      </PopoverTrigger>
      <PopoverContent className="h-80">
        <AddShowPopover show={show} setPopoverOpen={setPopoverOpen} />
      </PopoverContent>
    </Popover>
  );
};
