import { create } from "zustand";
// import { devtools, persist } from "zustand/middleware";
// import type {} from "@redux-devtools/extension"; // required for devtools typing
import { showCardProps, showProps } from "../types/showResultProps";

// Define the state shape
export interface ShowState {
  showLibrary: showCardProps[];
  addShow: (show: showProps, link: string) => void;
  removeShow: (show: showProps) => void;
}

// Create the store
export const useShowStore = create<ShowState>((set) => ({
  showLibrary: [], // initial state
  addShow: (show, link) =>
    set((state) => ({
      showLibrary: [...state.showLibrary, { show, link }],
    })),
  removeShow: (show) => {
    set((state) => ({
      showLibrary: state.showLibrary.filter((s) => s.show.id !== show.id),
    }));
  },
}));
