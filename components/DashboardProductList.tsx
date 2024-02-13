"use client";
import useMatchedProducts from "@/features/dashboard/useMatchedProducts";
import React from "react";
import ProductCard from "./ProductCard";
import { z } from "zod";
import { productSchema } from "@/prisma/zod/product";

type ProductSchema = z.infer<typeof productSchema>;

const DashboardProductList = () => {
  const { data, error, isLoading } = useMatchedProducts();

  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <div className="flex flex-row flex-wrap">
      {data &&
        data.items.map((product: ProductSchema) => {
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

      {/* {data && countQuery.data && filters.searchTerm === "" && (
    <PaginationComponent nextPage={offset + 6 < countQuery.data.count} />
  )} */}
    </div>
  );
};

export default DashboardProductList;
