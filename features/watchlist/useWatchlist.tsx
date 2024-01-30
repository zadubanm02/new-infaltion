import { itemSchema } from "@/prisma/zod";
import { watchlistSchema } from "@/prisma/zod/watchlist";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";
import { z } from "zod";

type WatchlistBase = z.infer<typeof watchlistSchema>;
type ItemBase = z.infer<typeof itemSchema>;

type Watchlist = Omit<WatchlistBase, "id"> & Array<ItemBase>;

export const useWatchlist = () => {
  const { user } = useKindeBrowserClient();
  const queryClient = useQueryClient();

  const { data, error, isLoading } = useQuery({
    queryKey: ["watchlist"],
    queryFn: async () => {
      try {
        const response = await axios.get(`/api/watchlist/${user?.id}`);
        return response.data;
      } catch (error) {
        const errResponse = error as any;
        throw errResponse.response;
      }
    },
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: 0,
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

  return { data, error, isLoading, createOrUpdateWatchlistMutation };
};
