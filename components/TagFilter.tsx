import {
  MoonIcon,
  StarFilledIcon,
  StarIcon,
  SunIcon,
} from "@radix-ui/react-icons";
import { Dispatch, SetStateAction, useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";
import { tagIconMap } from "@/app/utils/constants";

interface TagFilterProps {
  activeTags: string[];
  setActiveTags: Dispatch<SetStateAction<string[]>>;
}

export const TagFilter = ({ activeTags, setActiveTags }: TagFilterProps) => {
  // const [activeTags, setActiveTags] = useState<string[]>([]);

  const handleToggleChange = (value: string[]) => {
    setActiveTags(value);
  };

  const isToggleActive = (value: string) => {
    return activeTags.includes(value);
  };

  return (
    <div className="flex pb-2 justify-left">
      <TooltipProvider>
        <ToggleGroup
          type="multiple"
          size="sm"
          variant={"outline"}
          value={activeTags}
          onValueChange={handleToggleChange}
        >
          {Object.keys(tagIconMap).map((tag) => (
            <Tooltip key={tag}>
              <TooltipTrigger>
                <ToggleGroupItem value={tag} aria-pressed={isToggleActive(tag)}>
                  {tagIconMap[tag]}
                </ToggleGroupItem>
              </TooltipTrigger>
              <TooltipContent sideOffset={5} side="top">
                <p>{tag.toUpperCase()}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </ToggleGroup>
      </TooltipProvider>
    </div>
  );
};
