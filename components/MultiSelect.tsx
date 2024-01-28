import React, { useState } from "react";
import { Badge } from "./ui/badge";
import { productSuggestions, suggestions } from "@/data/watchlistValues";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "./ui/command";
import { Item, watchlistAtom } from "@/features/watchlist/state/watchlistState";
import { useAtom } from "jotai";
import ProductBadge from "./ProductBadge";

const MultiSelect = () => {
  const [watchlist, setWatchlist] = useAtom(watchlistAtom);
  const [items, setItems] = useState(productSuggestions);
  const popSuggestion = (item: Item) => {
    setItems(items.filter((watch) => watch !== item));
  };
  const addProduct = (item: Item) => {
    popSuggestion(item);
    setWatchlist([...watchlist, item]);
  };
  const deleteProduct = (label: string) => {
    console.log("Deleting", label);
  };
  return (
    <div className="flex-1">
      {
        //   watchlist.length > 0 &&
        watchlist.map((item) => {
          return (
            <ProductBadge
              label={item.label}
              key={item.value}
              onDelete={deleteProduct}
            />
          );
        })
      }
      <Command className="rounded-lg border shadow-md">
        <CommandInput placeholder="Add product" />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Products">
            {items.map((suggestion) => {
              return (
                <CommandItem
                  //   onClick={() => addProduct(suggestion)}
                  key={suggestion.value}
                  onSelect={() => addProduct(suggestion)}
                  //   value={suggestion.value}
                >
                  {suggestion.label}
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
