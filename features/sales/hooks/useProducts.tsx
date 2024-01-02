import {
  Filters,
  Store,
  filtersAtom,
} from "@/features/sales/state/filterState";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "@uidotdev/usehooks";
import axios from "axios";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";

const initalState: Filters = {
  searchTerm: "",
  store: Store.All,
  priceRange: [0, 1000],
};

export const useProducts = ({
  limit,
  offset,
}: {
  limit?: number;
  offset?: number;
}) => {
  const [localFilters, setLocalFilters] = useState(initalState);
  const [filters, setFilters] = useAtom(filtersAtom);

  const countQuery = useQuery({
    queryKey: ["product-count"],
    queryFn: async () => {
      const response = await axios.get<{ count: number }>(
        "/api/products/count",
        {
          params: {
            limit,
            offset,
            filters: JSON.stringify({
              searchTerm: filters.searchTerm,
              store: filters.store,
              priceRange: filters.priceRange,
            }),
          },
        }
      );
      return response.data;
    },
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: 0,
  });

  const { data, isLoading, error, ...rest } = useQuery({
    queryKey: ["all-items", localFilters, offset],
    queryFn: async () => {
      const response = await axios.get("/api/products", {
        params: {
          limit,
          offset,
          filters: JSON.stringify({
            searchTerm: filters.searchTerm,
            store: filters.store,
            priceRange: filters.priceRange,
          }),
        },
      });
      return response;
    },
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: 1,
    retryDelay: 3000,
  });

  const handleSearch = (searchTerm: string) => {
    const newFilters = { ...filters, searchTerm };
    setFilters(newFilters);
    if (searchTerm === "") {
      setLocalFilters(newFilters);
    }
  };

  const handleFiltering = () => {
    return setLocalFilters(filters);
  };
  return {
    data,
    isLoading,
    error,
    ...rest,
    handleSearch,
    handleFiltering,
    filters,
    countQuery,
  };
};
