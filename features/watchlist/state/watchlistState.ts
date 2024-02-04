import { atom } from "jotai";

export type Item = { id: string; itemName: string };

const watchAtom = atom<Array<Item>>([]);

export const watchlistAtom = atom(
  (get) => get(watchAtom),
  (get, set, newWatchlist: Array<Item>) => {
    set(watchAtom, newWatchlist);
  }
);
