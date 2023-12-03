import { atom } from "jotai";

export enum Store {
  Kaufland = "Kaufland",
  Lidl = "Lidl",
  Tesco = "Tesco",
  All = "All",
}

export type Filters = {
  searchTerm: string;
  store: Store | null;
  priceRange: number[];
};

const initalState: Filters = {
  searchTerm: "",
  store: Store.All,
  priceRange: [0, 1000],
};

const filterAtom = atom<Filters>(initalState);

export const filtersAtom = atom(
  (get) => get(filterAtom),
  (get, set, newFilters: Filters) => {
    set(filterAtom, newFilters);
  }
);
