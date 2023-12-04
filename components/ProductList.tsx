"use client";
import { useProducts } from "@/features/sales/hooks/useProducts";
import React from "react";
import ProductCard from "./ProductCard";
import { z } from "zod";
import { productSchema } from "@/prisma/zod";

type ProductSchema = z.infer<typeof productSchema>;

const ProductList = () => {
  const { data, isLoading, error } = useProducts({});

  if (error) {
    return <div>Error</div>;
  }

  if (isLoading) {
    return <div>Loading ...</div>;
  }
  return (
    <div className="flex flex-row flex-wrap">
      {data &&
        data.data.products.map((product: ProductSchema) => {
          return (
            <ProductCard
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
    </div>
  );
};

export default ProductList;
