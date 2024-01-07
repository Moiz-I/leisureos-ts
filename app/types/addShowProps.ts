import { Dispatch, SetStateAction } from "react";
import { showProps } from "./showResultProps";
import { Id } from "@/convex/_generated/dataModel";

export interface serviceProps {
  serviceName: string;
  link: string;
}

export interface AddLinkProps {
  // show: showProps;
  // setPopoverOpen: Dispatch<SetStateAction<boolean>>;
  updateShow?: boolean;
  convexId?: Id<"showLibrary">;
  setModalOpen: Dispatch<SetStateAction<boolean>>;
}

interface Package {
  id: string;
  packageId: number;
  shortName: string;
  __typename: string;
}

// Define the type for the offer
export interface Offer {
  monetizationType: string;
  presentationType: string;
  standardWebURL: string;
  deeplinkURL: string;
  package: Package;
  __typename: string;
}
