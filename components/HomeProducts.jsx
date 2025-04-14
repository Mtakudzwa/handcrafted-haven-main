import React from "react";
import ProductCard from "./ProductCard";
import { useAppContext } from "@/context/AppContext";

const HomeProducts = () => {
  const { products, router } = useAppContext();

  return (
    <section className="flex flex-col items-center pt-14">
      <h2 className="text-2xl font-medium text-left w-full">
        Popular Products
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-6 pb-14 w-full">
        {products.map((product, index) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
          <ProductCard key={index} product={product} />
        ))}
      </div>

      <button
        type="button"
        onClick={() => router.push("/all-products")}
        className="px-12 py-2.5 border rounded text-gray-500/70 hover:bg-slate-50/90 transition"
      >
        See more
      </button>
    </section>
  );
};

export default HomeProducts;
