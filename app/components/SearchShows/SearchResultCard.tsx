"use client";

import Image from "next/image";

import fallback from "../../../public/fallback.png";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@radix-ui/react-popover";
import { AddShowPopover } from "../AddShow/AddShowPopover";

interface SearchResultCardProps {
  show: showProps;
}

export const SearchResultCard = ({ show }: SearchResultCardProps) => {
  const { name, id, image } = show;

  return (
    <Popover>
      <PopoverTrigger>
        <span className="flex">
          <Image
            src={image ? image.medium : fallback}
            alt={name}
            width={50}
            height={200}
            className="w-auto h-auto"
          />
          <p>{name}</p>
        </span>
      </PopoverTrigger>
      <PopoverContent className="h-80">
        <AddShowPopover name={name} />
      </PopoverContent>
    </Popover>
  );
};
