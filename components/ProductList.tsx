"use client";
import { useProducts } from "@/features/sales/hooks/useProducts";
import React from "react";
import ProductCard from "./ProductCard";
import { z } from "zod";
import { productSchema } from "@/prisma/zod";
import usePagination from "@/features/common/hooks/usePagination";
import Search from "./Search";
import { useDebounce } from "@uidotdev/usehooks";
import { Button } from "./ui/button";
import {
  PaginationContent,
  PaginationItem,
  Pagination,
  PaginationPrevious,
  PaginationLink,
  PaginationEllipsis,
  PaginationNext,
} from "./ui/pagination";

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

  if (error) {
    return <div>Error</div>;
  }

  if (isLoading) {
    return <div>Loading ...</div>;
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
                originalPrice={product.discountedPrice}
                discountedPrice={product.originalPrice}
                imageUrl={product.imageUrl}
              />
            );
          })}

        {data && countQuery.data && filters.searchTerm === "" && (
          // <div className="flex flex-row w-full justify-end items-center">
          //   <p className="text-sm font-semibold mr-2">
          //     Dalsie produkty ( {countQuery.data.count} )
          //   </p>
          <PaginationComponent nextPage={offset + 6 < countQuery.data.count} />
          // </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;
