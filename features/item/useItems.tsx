import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

const useItems = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["items"],
    queryFn: async () => {
      try {
        const response = await axios.get(`/api/item`);
        return response.data;
      } catch (error) {
        const errResponse = error as any;
        throw errResponse.response;
      }
    },
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: 0,
    // cache for an hour
    gcTime: 3600000,
  });

  return { data, error, isLoading };
};

export default useItems;
