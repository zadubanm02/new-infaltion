import { itemSchema } from "@/prisma/zod";
import { watchlistSchema } from "@/prisma/zod/watchlist";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";
import { z } from "zod";
import { watchlistAtom } from "./state/watchlistState";
import { useAtom } from "jotai";

type WatchlistBase = z.infer<typeof watchlistSchema>;
export type ItemBase = z.infer<typeof itemSchema>;

type CreateWatchlist = Omit<WatchlistBase, "id">;

export type Watchlist = {
  userId: string;
  items: Array<{ id: string }>;
};

export const useWatchlist = () => {
  const { user } = useKindeBrowserClient();
  const queryClient = useQueryClient();
  const [watchlist, setWatchlist] = useAtom(watchlistAtom);

  const { data, error, isLoading } = useQuery({
    queryKey: ["watchlist"],
    queryFn: async () => {
      try {
        const response = await axios.get(`/api/watchlist/`, {
          params: {
            userId: user?.id,
          },
        });
        console.log("Response data", response.data.watchlist);
        setWatchlist(response.data.watchlist.items);
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

  const createOrUpdateWatchlistMutation = useMutation({
    mutationKey: ["createWatchlist"],
    mutationFn: async (data: Watchlist) => {
      try {
        const response = await axios.post("api/watchlist", {
          data,
        });
        return response.data;
      } catch (error) {
        const errResponse = error as any;
        throw errResponse.response;
      }
    },
    onSuccess(data, variables, context) {
      queryClient.invalidateQueries({ queryKey: ["watchlist"] });
      toast("Watchlist has been saved", {
        description: `${new Date().toISOString()}`,
      });
    },
    onError(error) {
      toast("Error saving watchlist", {
        description: `${new Date().toISOString()}`,
      });
    },
  });

  return {
    user,
    data,
    error,
    isLoading,
    createOrUpdateWatchlistMutation,
    watchlist,
    setWatchlist,
  };
};
