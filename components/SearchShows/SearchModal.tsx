"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ReactNode, useEffect, useState } from "react";
import axios from "axios";
import { SearchResults } from "./SearchResults";
import { showProps } from "@/app/types/showResultProps";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { instrument_serif } from "@/app/fonts";
import { cn } from "@/lib/utils";
import { useStepStore } from "@/app/utils/useStepStore";
import { AddLink } from "../AddShow/AddLink";
import { useShowStore } from "@/app/utils/useShowStore";
import { AddTags } from "../AddShow/AddTags";
import { useTagStore } from "@/app/utils/useTagStore";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

interface oldShowProps {
  id: number;
  name: string;
  image: {
    medium: string;
    original: string;
  };
  summary: string;
}
interface returnedShowsProps {
  show: oldShowProps;
}

interface SearchModalProps {
  modify?: boolean;
  showToModify?: showProps;
  tags?: string[];
  convexId?: Id<"showLibrary">;
  children: ReactNode;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  modify = false,
  showToModify = { idx: 0, name: "", image: "" },
  tags = [],
  convexId,
  children,
}) => {
  const [query, setQuery] = useState<string>("");
  const [returnedShows, setReturnedShows] = useState<showProps[]>([]);
  const [summaries, setSummaries] = useState<string[]>([]);
  const { step, incrementStep, decrementStep, resetStep, setStep } =
    useStepStore();
  const { setShow } = useShowStore();
  const { tags: aliasTags, setTags } = useTagStore();
  const [modalOpen, setModalOpen] = useState(false);
  const modifyConvex = useMutation(api.showLibrary.update);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const res = await axios.get(
          `https://api.tvmaze.com/search/shows?q=${query}`
        );

        if (isMounted) {
          const returned = res.data.map(
            (showArr: returnedShowsProps): showProps => {
              const show = showArr.show;
              const image =
                show.image && show.image.medium
                  ? show.image.medium
                  : "fallback";
              return {
                idx: show.id, // Rename 'id' to 'idx'
                name: show.name,
                image: image, // Use the medium image URL or "fallback"
              };
            }
          );
          // console.log(res.data);
          const summaries = res.data.map(
            (showArr: returnedShowsProps): string => {
              const show = showArr.show;
              const summary =
                show.summary?.replace(/<\/?[^>]+(>|$)/g, "").slice(0, 100) +
                "...";
              return summary;
            }
          );
          setSummaries(summaries);

          setReturnedShows(returned);
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

  const handleNewModal = () => {
    setModalOpen(!modalOpen);
    setQuery("");
    setShow({ idx: 0, name: "", image: "" });
    setTags(tags);
    modify ? (setShow(showToModify), setStep(1)) : resetStep();
  };

  const handleSubmitNewTags = () => {
    if (!convexId) return;
    modifyConvex({
      id: convexId,
      tags: aliasTags,
    });
    console.log("tags ", tags);
  };

  return (
    <Dialog onOpenChange={handleNewModal} open={modalOpen}>
      <DialogTrigger asChild>
        {/* <Button className="p-0 aspect-square">
          <Plus width={20} />
        </Button> */}
        {children}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle
            className={cn("text-3xl flex gap-1", instrument_serif.className)}
          >
            Search<div className="italic">for a</div> show {step}
          </DialogTitle>
          <DialogDescription>And it will appear</DialogDescription>
        </DialogHeader>
        {step === 0 && (
          <>
            <Input
              onChange={(event) => setQuery(event.target.value)}
              value={query}
              className={cn(
                "text-lg text-neutral-600",
                instrument_serif.className
              )}
              placeholder={
                ["Rick and Morty", "One Piece", "The Office"][
                  Math.floor(Math.random() * 3)
                ]
              }
            />
            <SearchResults shows={returnedShows} summaries={summaries} />
          </>
        )}
        {step === 1 && <AddTags />}
        {step === 2 &&
          (modify && convexId ? (
            <AddLink
              updateShow={true}
              convexId={convexId}
              setModalOpen={setModalOpen}
            />
          ) : (
            <AddLink setModalOpen={setModalOpen} />
          ))}
        {step !== 0 && (
          <DialogFooter>
            <Button
              className="w-full"
              variant="outline"
              onClick={() => {
                decrementStep();
              }}
              autoFocus
            >
              Back
            </Button>
            {modify && step === 1 && (
              <Button
                className="w-full bg-green-500 hover:bg-green-600"
                variant="default"
                onClick={() => {
                  handleSubmitNewTags();
                  setModalOpen(false);
                }}
              >
                Submit
              </Button>
            )}
            <Button
              disabled={step === 2}
              className="w-full"
              variant="outline"
              onClick={() => incrementStep()}
            >
              Next
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};
