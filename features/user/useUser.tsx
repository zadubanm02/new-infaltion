"use client";

import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { User } from "@prisma/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { revalidatePath, revalidateTag } from "next/cache";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const useUser = () => {
  const queryClient = useQueryClient();
  const { user } = useKindeBrowserClient();

  const [revalidateQuery, setRevalidateQuery] = useState(false);

  const { data, error, isLoading } = useQuery({
    queryKey: ["user", revalidateQuery],
    queryFn: async () => {
      try {
        console.log("Invoking me");
        const response = await axios.get(`/api/user/${user?.id}`);
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

  const createUserMutation = useMutation({
    mutationKey: ["createUser"],
    mutationFn: async (data: User) => {
      try {
        const response = await axios.post("api/user", {
          data,
        });
        return response.data;
      } catch (error) {
        const errResponse = error as any;
        throw errResponse.response;
      }
    },
    // retry query
    onSuccess(data, variables, context) {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      setRevalidateQuery((prev) => !prev);
      toast("User data has been updated", {
        description: `${new Date().toISOString()}`,
      });
    },
  });

  // if error from query fill data about user in db
  useEffect(() => {
    if (user) {
      createUserMutation.mutate({
        id: user?.id as string,
        name: `${user?.given_name} ${user?.family_name}`,
        email: user?.email as string,
      });
    }
  }, [error]);

  return {
    data,
    error,
    isLoading,
  };
};

export default useUser;
