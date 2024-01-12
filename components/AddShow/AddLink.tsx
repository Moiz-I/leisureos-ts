"use client";

import { getShowLinks } from "@/app/utils/getShowLinks";
import { Button } from "@/components/ui/button";
import { useState, useEffect, use, Dispatch, SetStateAction } from "react";
import { showProps } from "@/app/types/showResultProps";
import axios from "axios";
import scrapeShowTitles from "@/app/scraper";
import { useUser } from "@clerk/clerk-react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { AddLinkProps, Offer, serviceProps } from "@/app/types/addShowProps";
import { serviceMapping } from "@/app/utils/constants";
import { useShowStore } from "@/app/utils/useShowStore";
import { useStepStore } from "@/app/utils/useStepStore";
import { useTagStore } from "@/app/utils/useTagStore";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const AddLink = ({
  // show,
  // setPopoverOpen,
  updateShow = false,
  convexId,
  setModalOpen,
}: AddLinkProps) => {
  const [services, setServices] = useState<serviceProps[]>([]);
  const [customLink, setCustomLink] = useState<string>("");
  // const { name } = show;
  const { user } = useUser();
  const create = useMutation(api.showLibrary.create);
  const modify = useMutation(api.showLibrary.update);
  const { show, setShow } = useShowStore();
  const { name } = show;
  const { setStep } = useStepStore();
  const { tags } = useTagStore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const data = await getShowLinks({ showQuery: name, region: "en_GB" });
        const apiUrl =
          process.env.NODE_ENV === "development"
            ? "http://localhost:3000/api/justwatch"
            : "https://leisureos-ts.vercel.app/api/justwatch";
        const response = await fetch(`${apiUrl}?showName=${name}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        // console.log("data ", data);
        if (data !== undefined) {
          const newServices = data.map((offer: Offer) => ({
            serviceName:
              serviceMapping[offer.package.shortName] || "Unknown Service",
            link: offer.deeplinkURL,
          }));
          setServices(newServices);

          // Filter out unknown services and duplicates
          const filteredNewServices = newServices.filter(
            (newService: serviceProps) =>
              newService.serviceName !== "Unknown Service"
            // &&
            // !newServices.some(
            //   (existingService: serviceProps) =>
            //     existingService.serviceName === newService.serviceName
            // )
          );
          const uniqueServices: serviceProps[] = [];
          for (const service of filteredNewServices) {
            if (
              !uniqueServices.some((s) => s.serviceName === service.serviceName)
            ) {
              uniqueServices.push(service);
            }
          }
          const animeflix = `https://animeflix.live/search/?anime=${name
            .toLowerCase()
            .replace(" ", "-")
            .replace(/[^a-zA-Z0-9]/g, "")}`;
          uniqueServices.push({ serviceName: "Animeflix", link: animeflix });
          setServices(uniqueServices);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [name]);

  useEffect(() => {
    const isMounted = true;

    const fetchStremioId = async () => {
      try {
        const apiUrl =
          process.env.NODE_ENV === "development"
            ? "http://localhost:3000/api/omdb"
            : "https://leisureos-ts.vercel.app/api/omdb";

        const response = await fetch(`${apiUrl}?showName=${name}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log("res ", data.imdbID);

        if (isMounted && data.imdbID) {
          const stremioLink = `stremio://detail/series/${data.imdbID}/?autoPlay={true}`;
          setServices((prevServices) => [
            ...prevServices,
            { serviceName: "Stremio", link: stremioLink },
          ]);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchStremioId();
  }, []);

  useEffect(() => {
    // const isMounted = true;

    // const fetchAniwaveLink = async () => {
    //   try {
    //     const res = await scrapeShowTitles(name);

    //     if (isMounted && res) {
    //       setServices((prevServices) => [
    //         ...prevServices,
    //         { serviceName: "Aniwave", link: res[0].link },
    //       ]);
    //     }
    //   } catch (error) {
    //     console.error(error);
    //   }
    // };

    // fetchAniwaveLink();
    async function callAniwaveApi(showName: string) {
      const apiUrl =
        process.env.NODE_ENV === "development"
          ? "http://localhost:3000/api/aniwave"
          : "https://leisureos-ts.vercel.app/api/aniwave"; // Replace with your production URL

      console.log("apiUrl ", apiUrl);
      const response = await fetch(`${apiUrl}?showName=${showName}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("aniwave data ", data);
      return data;
    }

    callAniwaveApi(name)
      .then((data) => {
        console.log(data[0]); // Handle the data from the API
        if (data[0]) {
          setServices((prevServices) => [
            ...prevServices,
            {
              serviceName: "Aniwave",
              link: `https://aniwave.to${data[0].link}`,
            },
          ]);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error); // Handle the error
      });
  }, []);

  const addShowToLibrary = (show: showProps, service: string) => {
    console.log("show ", show);
    console.log("link ", service);
    if (!(service.includes("https://") || service.includes("http://"))) {
      service = "https://" + service;
    }
    // addShow(show, service.link);
    if (updateShow && convexId) {
      modify({
        id: convexId,
        idx: show.idx,
        name: show.name,
        link: service,
        tags: tags,
        image: show.image,
      });
    } else {
      const promise = create({
        idx: show.idx,
        name: show.name,
        link: service,
        tags: tags,
        image: show.image,
      });
      promise.then((result) => {
        console.log("result ", result);
      });
    }
    // setPopoverOpen(false);
    setShow({
      idx: 0,
      name: "",
      image: "",
    });
    updateShow ? setModalOpen(false) : setStep(0);
  };

  return (
    <div className="flex p-5 bg-white border shadow-sm">
      <h1 className="flex flex-col">
        {name}
        {services.map((service, index) => (
          <TooltipProvider key={index}>
            <Tooltip>
              <TooltipTrigger>
                <Button
                  key={index}
                  variant="link"
                  onClick={() => addShowToLibrary(show, service.link)}
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
        {!services.some((service) => service.serviceName === "Aniwave") && (
          <Button variant="link" className="font-mono">
            <a href="https://aniwave.to/filter?keyword=naruto">
              Aniwave select link
            </a>
          </Button>
        )}
        <form onSubmit={() => addShowToLibrary(show, customLink)}>
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
