"use client";

import Image from "next/image";
import fallback from "@/public/fallback.png";
import { showCardProps } from "@/app/types/showResultProps";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { v } from "convex/values";
import { Id } from "@/convex/_generated/dataModel";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@radix-ui/react-popover";
import { AddLink } from "../AddShow/AddLink";
import { useState } from "react";
import { SearchModal } from "../SearchShows/SearchModal";
import { tagIconMap } from "@/app/utils/constants";
import { StarFilledIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";

export const ShowCard = ({ show, link, id, tags }: showCardProps) => {
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
          className={cn(
            "absolute inset-0 object-cover object-center w-full h-full transition-all rounded-md hover:opacity-80 hover:shadow-lg",
            tags.includes("favourite") && "border-1 border border-yellow-400"
          )}
          priority={true}
        />
      </a>
      {tags.includes("favourite") && (
        <div className=" absolute top-[8px] left-[8px] flex flex-row gap-1 items-center justify-center backdrop-blur-md rounded-md bg-black/20">
          <StarFilledIcon
            color="yellow"
            className="p-1"
            width={23}
            height={23}
          />
        </div>
      )}
      {/* <span className="absolute top-[8px] left-[8px] flex overflow-hidden rounded-full p-[1px] w-[25px] h-[25px]">
        <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
        <div className="z-[100] inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full backdrop-blur-md bg-black/20 p-1">
          <StarFilledIcon color="yellow" width={23} height={23} />
        </div>
      </span> */}
      <div className="flex flex-col items-center justify-center transition-all opacity-0 group-hover:opacity-100">
        <div className="z-[100] absolute top-[5px] flex flex-row gap-1 items-center backdrop-blur-md rounded-md bg-yellow-500/70">
          {tags.map(
            (tag) =>
              tag !== "favourite" && (
                <div key={tag} className="p-1">
                  {tagIconMap[tag]}
                </div>
              )
          )}
        </div>
        <div className="relative z-[100] flex flex-row rounded-md p-2 bg-black/80 max-w-[10rem] justify-center gap-1 mb-2">
          <SearchModal
            modify={true}
            showToModify={show}
            convexId={id}
            tags={tags}
          >
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
          </SearchModal>
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
