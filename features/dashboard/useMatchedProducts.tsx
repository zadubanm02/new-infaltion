import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

const useMatchedProducts = () => {
  const { user } = useKindeBrowserClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["matched"],
    queryFn: async () => {
      try {
        const response = await axios.get(`/api/dashboard/`, {
          params: {
            userId: user?.id,
          },
        });
        console.log("Response data", response.data.items);
        return response.data;
      } catch (error) {
        const errResponse = error as any;
        throw errResponse.response;
      }
    },
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: 0,
    enabled: !!user,
  });
  return { data, error, isLoading };
};

export default useMatchedProducts;
