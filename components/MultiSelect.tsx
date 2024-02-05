import React, { useState } from "react";
import { Badge } from "./ui/badge";
import { productSuggestions, suggestions } from "@/data/watchlistValues";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import { Item, watchlistAtom } from "@/features/watchlist/state/watchlistState";
import { useAtom } from "jotai";
import ProductBadge from "./ProductBadge";
import { Watchlist, useWatchlist } from "@/features/watchlist/useWatchlist";
import { Button } from "./ui/button";
import { CheckSquare } from "lucide-react";
import useItems from "@/features/item/useItems";

const MultiSelect = () => {
  // queries
  const {
    data,
    error,
    isLoading,
    createOrUpdateWatchlistMutation,
    user,
    watchlist,
    setWatchlist,
  } = useWatchlist();
  const { data: itemsResponse, error: itemsError } = useItems();

  // state
  const [items, setItems] = useState(itemsResponse);
  const popSuggestion = (item: Item) => {
    setItems(items?.filter((watch) => watch !== item));
  };

  // methods
  const addProduct = (item: Item) => {
    popSuggestion(item);
    setWatchlist([...watchlist, item]);
  };
  const deleteProduct = (item: Item) => {
    setWatchlist(watchlist.filter((watch) => watch.itemName !== item.itemName));
    setItems(
      [...(items ?? []), { id: item.id, itemName: item.itemName }].sort(
        sortSuggestions
      )
    );
  };

  // mutations
  const editWatchlist = () => {
    const preparedData: Watchlist = {
      userId: user?.id as string,
      items: watchlist.map((item) => ({ id: item.id })),
    };
    console.log("Prepared data", preparedData);
    return createOrUpdateWatchlistMutation.mutate(preparedData);
  };

  // error and loading states
  if (error) {
    return <div>{JSON.stringify(error.message)}</div>;
  }
  if (itemsError) {
    return <div>{JSON.stringify(itemsError.message)}</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // jsx
  return (
    <div className="flex-1">
      {watchlist.length > 0 && (
        <Button onClick={() => editWatchlist()}>
          <CheckSquare size={18} className="mr-1" /> Save Changes
        </Button>
      )}
      <div className="my-2">
        {
          //   watchlist.length > 0 &&
          watchlist.map((item) => {
            return (
              <ProductBadge
                label={item.itemName}
                key={item.id}
                onDelete={() => deleteProduct(item)}
              />
            );
          })
        }
      </div>
      <Command className="rounded-lg border shadow-md">
        <CommandInput placeholder="Add product" />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Products">
            {items &&
              items.map((suggestion) => {
                return (
                  <CommandItem
                    key={suggestion.id}
                    onSelect={() => addProduct(suggestion)}
                  >
                    {suggestion.itemName}
                  </CommandItem>
                );
              })}
          </CommandGroup>
        </CommandList>
      </Command>
    </div>
  );
};

export default MultiSelect;

const sortSuggestions = (a: Item, b: Item) => {
  if (a.itemName < b.itemName) {
    return -1;
  }
  if (a.itemName > b.itemName) {
    return 1;
  }
  return 0;
};
