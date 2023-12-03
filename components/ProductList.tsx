"use client";
import { useProducts } from "@/features/sales/hooks/useProducts";
import React from "react";
import ProductCard from "./ProductCard";

type Item = {
  title: string;
  discountedPrice: number;
  originalPrice: number;
  discount: number;
  store: string;
  imageUrl: string;
};

type ItemCardProps = {
  item: Item;
};

const ProductList = () => {
  const { data, isLoading, error } = useProducts({});

  if (error) {
    return <div>Error</div>;
  }

  if (isLoading) {
    return <div>Loading ...</div>;
  }
  return (
    <div>
      {data &&
        data.data.products.map((product: Item) => {
          return (
            <ProductCard
              discount={product.discount}
              store={product.store}
              name={product.title}
              priceAfter={product.discountedPrice}
              priceBefore={product.originalPrice}
            />
          );
        })}
    </div>
  );
};

export default ProductList;
