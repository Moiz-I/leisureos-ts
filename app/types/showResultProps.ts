import { Id } from "@/convex/_generated/dataModel";

export type showProps = {
  idx: number;
  name: string;
  image: string;
};

export type showCardProps = {
  show: showProps;
  link: string;
  id: Id<"showLibrary">;
  tags: string[];
};
