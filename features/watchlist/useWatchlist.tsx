import { useQuery } from "@tanstack/react-query";

export const useWatchlist = () => {
  const { data } = useQuery({});
  return <div>useWatchlist</div>;
};
