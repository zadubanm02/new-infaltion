"use client";
import { useProducts } from "@/features/sales/hooks/useProducts";
import React from "react";
import ProductCard from "./ProductCard";
import { z } from "zod";
import { productSchema } from "@/prisma/zod";
import usePagination from "@/features/common/hooks/usePagination";
import Search from "./Search";
import { Button } from "./ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useAtom } from "jotai";
import { Store, filtersAtom } from "@/features/sales/state/filterState";
import { Skeleton } from "./ui/skeleton";

type ProductSchema = z.infer<typeof productSchema>;

const ProductList = () => {
  const { PaginationComponent, offset } = usePagination();
  const {
    data,
    isLoading,
    error,
    handleFiltering,
    handleSearch,
    filters,
    countQuery,
  } = useProducts({ limit: 6, offset: offset });

  const [filtersFromAtom, setFilters] = useAtom(filtersAtom);
  function handleStoreSelect(value: string) {
    const newFilters = { ...filters, store: value as Store };
    setFilters(newFilters);
    handleFiltering();
  }

  if (error) {
    return <div>Error</div>;
  }

  if (isLoading) {
    return (
      <div className="flex items-center space-x-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-row flex-1 items-center align-middle w-full mb-6">
        <Search
          placeholder="Hladat produkty"
          type="text"
          className=" pl-12 mr-4"
          onChange={(e) => handleSearch(e.target.value)}
          value={filters.searchTerm}
        />
        <Select onValueChange={(value) => handleStoreSelect(value)}>
          <SelectTrigger className="w-[100px] mr-2">
            <SelectValue placeholder="Store" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All</SelectItem>
            <SelectItem value="Tesco">Tesco</SelectItem>
            <SelectItem value="Kaufland">Kaufland</SelectItem>
          </SelectContent>
        </Select>
        <Button onClick={handleFiltering}>Search</Button>
      </div>

      <div className="flex flex-row flex-wrap">
        {data &&
          data.data.products.map((product: ProductSchema) => {
            return (
              <ProductCard
                key={product.id}
                id={product.id}
                discount={product.discount}
                store={product.store}
                title={product.title}
                originalPrice={product.originalPrice}
                discountedPrice={product.discountedPrice}
                imageUrl={product.imageUrl}
              />
            );
          })}

        {data && countQuery.data && filters.searchTerm === "" && (
          <PaginationComponent nextPage={offset + 6 < countQuery.data.count} />
        )}
      </div>
    </div>
  );
};

export default ProductList;
