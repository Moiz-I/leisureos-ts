import { create } from "zustand";
import { showProps } from "../types/showResultProps";

export interface ShowState {
  show: showProps;
  setShow: (show: showProps) => void;
  link?: string;
  setLink: (link: string) => void;
}

export const useShowStore = create<ShowState>((set) => ({
  show: {
    idx: 0,
    name: "",
    image: "",
  },
  setShow: (show: showProps) =>
    set(() => ({
      show: show,
    })),
  setLink: (link: string) =>
    set(() => ({
      link: link,
    })),
}));
