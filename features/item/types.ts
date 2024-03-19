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
