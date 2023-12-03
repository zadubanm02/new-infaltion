import { atom } from "jotai";

const watchAtom = atom<Array<string>>([]);

export const watchlistAtom = atom(
  (get) => get(watchAtom),
  (get, set, newWatchlist: Array<string>) => {
    set(watchAtom, newWatchlist);
  }
);
