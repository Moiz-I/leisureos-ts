import { useShowStore } from "@/app/utils/useShowStore";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";
import {
  MoonIcon,
  StarFilledIcon,
  StarIcon,
  SunIcon,
} from "@radix-ui/react-icons";
import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useTagStore } from "@/app/utils/useTagStore";
import { tagIconMap } from "@/app/utils/constants";

interface AddTagsProps {
  currentTagsIfModify?: string[];
}

export const AddTags: React.FC<AddTagsProps> = ({
  currentTagsIfModify = [],
}) => {
  const { show } = useShowStore();
  const [activeToggles, setActiveToggles] = useState<string[]>([]);
  const { tags, setTags } = useTagStore();
  // setTags(currentTagsIfModify);

  const handleToggleChange = (value: string[]) => {
    setTags(value);
    console.log(tags);
  };

  const isToggleActive = (value: string) => {
    console.log(value, tags.includes(value));
    return tags.includes(value);
  };

  return (
    <div>
      <p>tags for {show.name}</p>
      <p>tags: {tags.join(", ")}</p>
      <TooltipProvider>
        <ToggleGroup
          type="multiple"
          size="sm"
          value={tags}
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

// export const AddTags = () => {
//   const { show } = useShowStore();
//   // State to keep track of active toggles
//   const [activeToggles, setActiveToggles] = useState<string[]>([]);

//   // Handler to update the active toggles state
//   const handleToggleChange = (value: string[]) => {
//     setActiveToggles(value);
//     console.log(activeToggles);
//   };

//   // Check if a toggle is active
//   const isToggleActive = (value: string) => {
//     return activeToggles.includes(value);
//   };

//   return (
// <div>
//   <p>tags for {show.name}</p>
//   <p>tags: {activeToggles}</p>
//   <TooltipProvider>
//     <ToggleGroup
//       type="multiple"
//       size="sm"
//       value={activeToggles}
//       onValueChange={handleToggleChange}
//     >
//       <Tooltip>
//         <TooltipTrigger>
//           <ToggleGroupItem
//             value="a"
//             aria-pressed={isToggleActive("a")}
//             className="cursor-pointer"
//           >
//             A
//           </ToggleGroupItem>
//         </TooltipTrigger>
//         <TooltipContent sideOffset={5} side="bottom">
//           <p>Tooltip content</p>
//         </TooltipContent>
//       </Tooltip>
//       <ToggleGroupItem
//         value="favourite"
//         aria-pressed={isToggleActive("favourite")}
//       >
//         <StarFilledIcon />
//       </ToggleGroupItem>
//       <ToggleGroupItem value="b" aria-pressed={isToggleActive("b")}>
//         B
//       </ToggleGroupItem>
//       <ToggleGroupItem value="c" aria-pressed={isToggleActive("c")}>
//         C
//       </ToggleGroupItem>
//     </ToggleGroup>
//   </TooltipProvider>
// </div>
//   );
// };
