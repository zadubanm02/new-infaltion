import { atom } from "jotai";

export type Item = { value: string; label: string };

const watchAtom = atom<Array<Item>>([]);

export const watchlistAtom = atom(
  (get) => get(watchAtom),
  (get, set, newWatchlist: Array<Item>) => {
    set(watchAtom, newWatchlist);
  }
);
