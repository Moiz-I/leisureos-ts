"use client";

import { getShowLinks } from "@/app/utils/getShowLinks";
import { Button } from "@/components/ui/button";
import { useState, useEffect, use, Dispatch, SetStateAction } from "react";
import { showProps } from "@/app/types/showResultProps";
import axios from "axios";
import { ShowState, useShowStore } from "@/app/utils/useShowStore";
import scrapeShowTitles from "@/app/scraper";
import { useUser } from "@clerk/clerk-react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import {
  AddShowPopoverProps,
  Offer,
  serviceProps,
} from "@/app/types/addShowProps";
import { serviceMapping } from "@/app/utils/constants";

export const AddShowPopover = ({
  show,
  setPopoverOpen,
  updateShow = false,
  convexId,
}: AddShowPopoverProps) => {
  const [services, setServices] = useState<serviceProps[]>([]);
  const { showLibrary, addShow, removeShow } = useShowStore();
  const { name } = show;
  const { user } = useUser();
  const create = useMutation(api.showLibrary.create);
  const modify = useMutation(api.showLibrary.update);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getShowLinks({ showQuery: name, region: "en_GB" });
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
        const res = await axios.get(
          `https://www.omdbapi.com/?type=series&t=${name}&apikey=d41d2e9e`
        );
        console.log("res ", res.data.imdbID);

        if (isMounted && res.data.imdbID) {
          const stremioLink = `stremio://detail/series/${res.data.imdbID}/?autoPlay={true}`;
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
      const response = await fetch(
        `http://localhost:3000/api/aniwave?showName=${showName}`
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
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

  const addShowToLibrary = (show: showProps, service: serviceProps) => {
    console.log("show ", show);
    console.log("link ", service);
    // addShow(show, service.link);
    if (updateShow && convexId) {
      modify({
        id: convexId,
        idx: show.idx,
        name: show.name,
        link: service.link,
        image: show.image,
      });
    } else {
      const promise = create({
        idx: show.idx,
        name: show.name,
        link: service.link,
        image: show.image,
      });
      promise.then((result) => {
        console.log("result ", result);
      });
    }
    setPopoverOpen(false);
  };

  return (
    <div className="flex p-5 bg-white border shadow-sm">
      <h1 className="flex flex-col">
        {name}
        {services.map((service, index) => (
          <Button
            key={index}
            variant="link"
            onClick={() => addShowToLibrary(show, service)}
          >
            <p>{service.serviceName}</p>
          </Button>
        ))}
      </h1>
    </div>
  );
};
