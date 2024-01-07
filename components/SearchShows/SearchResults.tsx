import * as React from "react";

import { ScrollArea } from "@/components/ui/scroll-area";
import { SearchResultCard } from "./SearchResultCard";
import { showProps } from "@/app/types/showResultProps";
import { Separator } from "@/components/ui/separator";

export function SearchResults({
  shows,
  summaries,
}: {
  shows: showProps[];
  summaries: string[];
}) {
  return (
    <ScrollArea className="border rounded-md h-72">
      <div className="p-4">
        {/* <h4 className="mb-4 text-sm font-medium leading-none">shows</h4> */}
        {shows.map((show) => (
          <div className="flex flex-col gap-1" key={show.idx}>
            <SearchResultCard
              show={show}
              key={show.idx}
              summary={summaries[shows.indexOf(show)]}
            />
            <Separator className="my-1" />
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}

{
  /* <Dialog>

        <DialogTrigger>
          <SearchResultCard
            show={show}
            key={show.idx}
            summary={summaries[shows.indexOf(show)]}
          />
        </DialogTrigger>
        <Separator className="my-1" />
      </div>
    ))}
  </div>
</ScrollArea>
<DialogContent>
  <AddShowPopover />
</DialogContent>
</Dialog> 
*/
}
