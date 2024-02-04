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
import { useWatchlist } from "@/features/watchlist/useWatchlist";
import { Button } from "./ui/button";
import { CheckSquare } from "lucide-react";
import useItems from "@/features/item/useItems";

const MultiSelect = () => {
  const { data, error, isLoading, createOrUpdateWatchlistMutation } =
    useWatchlist();
  const { data: itemsResponse, error: itemsError } = useItems();
  const [watchlist, setWatchlist] = useAtom(watchlistAtom);
  const [items, setItems] = useState(itemsResponse);
  const popSuggestion = (item: Item) => {
    setItems(items?.filter((watch) => watch !== item));
  };
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

  if (error) {
    return <div>{JSON.stringify(error)}</div>;
  }
  if (itemsError) {
    return <div>{JSON.stringify(itemsError)}</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="flex-1">
      {watchlist.length > 0 && (
        <Button>
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
