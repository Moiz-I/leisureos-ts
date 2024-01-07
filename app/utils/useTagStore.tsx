import { create } from "zustand";

export interface TagState {
  tags: string[];
  setTags: (tags: string[]) => void;
}

export const useTagStore = create<TagState>((set) => ({
  tags: [],
  setTags: (tags: string[]) =>
    set(() => ({
      tags: tags,
    })),
}));
