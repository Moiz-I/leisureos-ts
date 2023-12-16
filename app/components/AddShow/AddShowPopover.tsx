"use client";

import { getShowLinks } from "@/app/utils/getShowLinks";
import { useState, useEffect } from "react";

export const AddShowPopover = (show: showProps) => {
  const [showData, setShowData] = useState<Offer[]>();
  const { name } = show;

  // type showService = "nfx" | "dnp" | "amp" | "bbc" | "cru";

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Call getShow with the required props
        const data = await getShowLinks({ showQuery: name, region: "en_GB" });
        console.log("data ", data);
        if (data !== undefined) {
          setShowData(data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [name]);

  // interface Offer {
  //   package_short_name: string;
  //   urls: {
  //     standard_web: string;
  //   };
  // }

  // const offers: Offer[] | undefined = showData?.data.items[0].offers;
  // // .filter((offer: any) => offer.a)
  // // .map((offer: any) => offer.urls.standard_web);

  // console.log("offers ", offers);

  // const uniquePackageShortNames = new Set();

  // const uniquePackageShortNameList = offers
  //   .map((offer) => {
  //     const { package_short_name } = offer;

  //     // Check if the package_short_name is not in the Set, then add it
  //     if (!uniquePackageShortNames.has(package_short_name)) {
  //       uniquePackageShortNames.add(package_short_name);
  //       return package_short_name;
  //     }

  //     // If it's a duplicate, you can return null or an empty string if you want
  //     return null;
  //   })
  //   .filter(Boolean); // Filter out null values if you used null for duplicates

  // console.log(uniquePackageShortNameList);

  // Define the mapping from short names to streaming service names
  const serviceMapping: { [key: string]: string } = {
    nfx: "Netflix",
    amp: "Prime",
    dnp: "Disney",
    bbc: "BBC",
    hbo: "HBO",
    cru: "Crunchyroll",
    now: "NowTV",
    al4: "Channel4",
  };

  // Define the type for the package within the offer
  interface Package {
    id: string;
    packageId: number;
    shortName: string;
    __typename: string;
  }

  // Define the type for the offer
  interface Offer {
    monetizationType: string;
    presentationType: string;
    standardWebURL: string;
    deeplinkURL: string;
    package: Package;
    __typename: string;
  }

  // Define the type for the props expected by the StreamingServices component
  interface StreamingServicesProps {
    offerArr: Offer[];
  }

  // The StreamingServices component
  // return (
  //   <>
  // {showData?.map((offer, index) => {
  //   const serviceName =
  //     serviceMapping[offer.package.shortName] || "Unknown Service";
  //   return (
  //     <p key={index}>
  //       {serviceName}: <a href={offer.standardWebURL}>Watch here</a>
  //     </p>
  //   );
  // })}
  //   </>
  // );

  return (
    <div className="flex p-5 bg-white border shadow-sm">
      <h1>
        {name}
        {showData?.map((offer, index) => {
          const serviceName =
            serviceMapping[offer.package.shortName] || "Unknown Service";
          console.log("serviceName ", serviceName);
          return (
            <p key={index}>
              {serviceName}: <a href={offer.standardWebURL}>Watch here</a>
            </p>
          );
        })}
      </h1>
    </div>
  );
};
