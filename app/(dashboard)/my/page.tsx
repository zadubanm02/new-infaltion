import { ProductSelect } from "@/components/product-select";
import React from "react";

const My = () => {
  return (
    <div>
      <h1 className="text-xl font-semibold mb-4">My watchlist</h1>
      <ProductSelect />
    </div>
  );
};

export default My;
