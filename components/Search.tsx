import React from "react";
import { Input } from "./ui/input";
import { Search as SearchIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Search: React.FC<InputProps> = (props) => {
  return (
    <div className="flex flex-1 items-center relative" cmdk-input-wrapper="">
      <SearchIcon className="h-4 w-4 bottom-3 left-4 opacity-50 absolute" />
      <Input
        className={cn(
          "flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
          props.className
        )}
        {...props}
      />
    </div>
  );
};

export default Search;
