"use client";
import useMatchedProducts from "@/features/dashboard/useMatchedProducts";
import React from "react";
import ProductCard from "./ProductCard";
import { z } from "zod";
import { productSchema } from "@/prisma/zod/product";
import StatCard from "./StatCard";
import { DollarSignIcon, ScanBarcodeIcon } from "lucide-react";

type ProductSchema = z.infer<typeof productSchema>;

const DashboardProductList = () => {
  const { data, error, isLoading } = useMatchedProducts();
  const itemsInSale = data.items.length;
  const sale = data.items.reduce((acc: number, item: ProductSchema) => {
    return acc + (item.originalPrice - item.discountedPrice);
  }, 0);

  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <>
      <div className="flex flex-row">
        <StatCard
          title="Total usetrene"
          value={`$ ${sale}`}
          description={`Za svoje produkty zaplatis o ${sale} eura menej`}
          icon={<DollarSignIcon />}
        />
        <StatCard
          title="Produkty v zlave"
          value={itemsInSale}
          description={`${itemsInSale} produktov ktore sledujes je momentalne v zlave`}
          icon={<ScanBarcodeIcon />}
        />
      </div>

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
    </>
  );
};

export default DashboardProductList;