"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

const useUser = () => {
  const user = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const response = await axios.get("/api/user/userID");
      return response.data;
    },
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: 0,
  });
  return {
    dbUser: user,
  };
};

export default useUser;
