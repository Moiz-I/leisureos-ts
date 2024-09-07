"use client";

import { useState, useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { AddLinkProps, serviceProps } from "@/app/types/addShowProps";
import { useShowStore } from "@/app/utils/useShowStore";
import { useStepStore } from "@/app/utils/useStepStore";
import { useTagStore } from "@/app/utils/useTagStore";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  fetchShowLinks,
  fetchStremioId,
  fetchShowWaveId,
  // fetchAniwaveLink,
} from "@/app/utils/dataFetchers";

export const AddLink = ({
  updateShow = false,
  convexId,
  setModalOpen,
}: AddLinkProps) => {
  const [services, setServices] = useState<serviceProps[]>([]);
  const [customLink, setCustomLink] = useState<string>("");
  const { user } = useUser();
  const create = useMutation(api.showLibrary.create);
  const modify = useMutation(api.showLibrary.update);
  const { show, setShow } = useShowStore();
  const { setStep } = useStepStore();
  const { tags } = useTagStore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const showLinks = await fetchShowLinks(show.name);
        const stremioLink = await fetchStremioId(show.name);
        const showWaveLink = await fetchShowWaveId(show.name);
        // const aniwaveLink = await fetchAniwaveLink(show.name);
        setServices([...showLinks, ...stremioLink, ...showWaveLink]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [show.name]);

  const addShowToLibrary = (service: string) => {
    const linkToAdd =
      service.startsWith("http") || service.includes("stremio")
        ? service
        : `https://${service}`;

    const showData = {
      idx: show.idx,
      name: show.name,
      link: linkToAdd,
      tags: tags,
      image: show.image,
    };

    if (updateShow && convexId) {
      modify({ id: convexId, ...showData });
    } else {
      create(showData).then((result) => console.log("result ", result));
    }

    setShow({ idx: 0, name: "", image: "" });
    updateShow ? setModalOpen(false) : setStep(0);
  };

  return (
    <div className="flex p-5 bg-white border shadow-sm">
      <h1 className="flex flex-col">
        {show.name}
        {services
          .filter((service) => service.serviceName !== "HiAnime")
          .map((service, index) => (
            <TooltipProvider key={index}>
              <Tooltip>
                <TooltipTrigger>
                  <Button
                    key={index}
                    variant="link"
                    onClick={() => addShowToLibrary(service.link)}
                  >
                    <p>{service.serviceName}</p>
                  </Button>
                </TooltipTrigger>
                <TooltipContent sideOffset={5} side="top">
                  <p>{service.link}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        {services.some((service) => service.serviceName === "HiAnime") && (
          <Button variant="link" className="font-mono">
            <a
              href={
                services.find((service) => service.serviceName === "HiAnime")
                  ?.link
              }
            >
              HiAnime select link
            </a>
          </Button>
        )}
        <form onSubmit={() => addShowToLibrary(customLink)}>
          <label>
            Enter your link:
            <input
              type="text"
              className="border-2"
              value={customLink}
              onChange={(e) => {
                setCustomLink(e.target.value);
              }}
            />
          </label>
        </form>
      </h1>
    </div>
  );
};
