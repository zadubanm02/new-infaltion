import ProductList from "@/components/ProductList";
import InlineStoreFilter from "@/components/inline-store-filter";
import React from "react";

const Discounts = () => {
  return (
    <div className="flex-1">
      <div className="flex flex-row">
        <h1 className="text-xl font-semibold mb-4">Discounts</h1>

        {/* <InlineStoreFilter /> */}
      </div>
      <ProductList />
    </div>
  );
};

export default Discounts;
