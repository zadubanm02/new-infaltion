import { Store, filtersAtom } from "@/features/sales/state/filterState";
import { useAtom } from "jotai";
import React from "react";
import { Badge } from "./ui/badge";

const InlineStoreFilter = () => {
  const [filters, setFilters] = useAtom(filtersAtom);

  const handleStoreChange = (value: Store) => {
    return setFilters({ ...filters, store: value });
  };
  return (
    <div className="mr-2">
      <h3>Store</h3>
      <div className="flex flex-row my-2 mb-4 items-center align-middle">
        <Badge
          onClick={() => handleStoreChange(Store.All)}
          variant={filters.store === "All" ? "default" : "secondary"}
        >
          All
        </Badge>
        <Badge
          onClick={() => handleStoreChange(Store.Tesco)}
          variant={filters.store === "Tesco" ? "default" : "secondary"}
        >
          Tesco
        </Badge>
        <Badge
          onClick={() => handleStoreChange(Store.Kaufland)}
          variant={filters.store === "Kaufland" ? "default" : "secondary"}
        >
          Kaufland
        </Badge>
        <Badge
          onClick={() => handleStoreChange(Store.Lidl)}
          variant={filters.store === "Lidl" ? "default" : "secondary"}
        >
          Lidl
        </Badge>
      </div>
    </div>
  );
};

export default InlineStoreFilter;
