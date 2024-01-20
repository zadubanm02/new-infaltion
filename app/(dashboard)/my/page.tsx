"use client";

import { ProductSelect } from "@/components/product-select";
import useUser from "@/features/user/useUser";
import React from "react";

const My = () => {
  const { data, error, isLoading } = useUser();

  if (isLoading) {
    return <div>Loading data...</div>;
  }

  if (error) {
    return <div>{JSON.stringify(error)}</div>;
  }

  return (
    <div>
      <h1 className="text-xl font-semibold mb-4">My watchlist</h1>
      {JSON.stringify(data)}
      <ProductSelect />
    </div>
  );
};

export default My;
