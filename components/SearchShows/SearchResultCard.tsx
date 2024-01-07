"use client";

import Image from "next/image";
import { instrument_serif } from "@/app/fonts";

import fallback from "@/public/fallback.png";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@radix-ui/react-popover";
import { showProps } from "@/app/types/showResultProps";
import { cn } from "@/lib/utils";
import { useStepStore } from "@/app/utils/useStepStore";
import { useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useShowStore } from "@/app/utils/useShowStore";
import { Button } from "../ui/button";

interface SearchResultCardProps {
  show: showProps;
  summary: string;
}

export const SearchResultCard = ({ show, summary }: SearchResultCardProps) => {
  const { name, idx, image } = show;
  // const { showLibrary, addShow, removeShow } = useShowStore();
  const isInLibrary = useQuery(api.showLibrary.isInLibrary, { idx });
  const { step, incrementStep, decrementStep, setStep } = useStepStore();
  const { setShow } = useShowStore();

  // const isShowInLibrary = showLibrary.some((show) => show.show.idx === idx);
  const [popoverOpen, setPopoverOpen] = useState(false);

  return (
    // <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
    //   <PopoverTrigger disabled={isInLibrary}>
    <button
      onClick={() => {
        if (!isInLibrary) {
          setShow(show);
          setStep(1);
        }
      }}
      disabled={isInLibrary}
    >
      <div
        className={cn(
          "flex p-3 transition-all rounded-md bg-zinc-100 ",
          isInLibrary
            ? "cursor-not-allowed opacity-60"
            : "hover:cursor-pointer hover:bg-zinc-200"
        )} //focus state
      >
        <Image
          src={image == "fallback" ? fallback : image}
          alt={name}
          width={50}
          height={200}
          className="w-auto h-auto rounded-md"
        />
        <div className="flex flex-col justify-center ml-4 text-left">
          <div
            className={cn(
              "leading-none text-2xl mb-2",
              instrument_serif.className
            )}
          >
            {name}
          </div>
          <div className="text-[11px] italic text-left text-neutral-500">
            {summary}
          </div>
        </div>
      </div>
    </button>
    //   </PopoverTrigger>
    //   {/* <PopoverContent className="h-80">
    //     <AddShowPopover show={show} setPopoverOpen={setPopoverOpen} />
    //   </PopoverContent> */}
    // </Popover>
  );
};
