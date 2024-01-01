"use client";

import Image from "next/image";
import fallback from "@/public/fallback.png";
import { showCardProps } from "@/app/types/showResultProps";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { useShowStore } from "@/app/utils/useShowStore";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { v } from "convex/values";
import { Id } from "@/convex/_generated/dataModel";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@radix-ui/react-popover";
import { AddShowPopover } from "../AddShow/AddShowPopover";
import { useState } from "react";

export const ShowCard = ({ show, link, id }: showCardProps) => {
  // const { showLibrary, addShow, removeShow } = useShowStore();
  const remove = useMutation(api.showLibrary.remove);
  const [popoverOpen, setPopoverOpen] = useState(false);

  function handleRemoveShow() {
    const promise = remove({ id: id });
    promise.then((res) => {
      console.log(res);
    });
  }

  return (
    // <AspectRatio ratio={1 / 1}>
    //42/59
    <div className="relative flex flex-col-reverse pt-[13rem] pb-[1rem] bg-none mx-auto group aspect-[206/289]">
      <a href={link}>
        <Image
          src={show.image == "fallback" ? fallback : show.image}
          alt={show.name}
          width={210}
          height={295}
          className="absolute inset-0 object-cover object-center w-full h-full transition-all rounded-md hover:opacity-80 hover:shadow-lg"
          priority={true}
        />
      </a>
      <div className="flex justify-center transition-all opacity-0 group-hover:opacity-100">
        <div className="relative z-[100] flex flex-row rounded-md p-2 bg-black/80 max-w-[10rem] justify-center gap-1 mb-2">
          <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
            <PopoverTrigger>
              <Button
                variant="outline"
                size="icon"
                onClick={() => {
                  console.log("sdfd");
                }}
                className="w-[2rem] h-[2rem] bg-transparent border-none text-white hover:bg-transparent hover:text-red-500"
              >
                <Pencil width={20} />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="h-80">
              <AddShowPopover
                show={show}
                setPopoverOpen={setPopoverOpen}
                updateShow={true}
                convexId={id}
              />
            </PopoverContent>
          </Popover>
          <Button
            variant="outline"
            size="icon"
            className="w-[2rem] h-[2rem] bg-transparent border-none text-white hover:bg-transparent hover:text-red-500"
            onClick={() => {
              handleRemoveShow();
            }}
          >
            <Trash2 width={20} />
          </Button>
        </div>
        {/* <div className="absolute inset-0 z-10 rounded-md bg-gradient-to-t from-gray-900 via-gray-900/40"></div> */}
      </div>
      {/* <h1>{show.name}</h1>
        <a href={link}>watch</a> */}
    </div>
    // </AspectRatio>
  );
};
