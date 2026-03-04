// src/app/shop/page.tsx
"use client";

import { useState } from "react";
import ProductCard from "@/components/ProductCard";
import { products } from "@/lib/data";

export default function ShopPage() {
  const [activeFilter, setActiveFilter] = useState<"all" | "qamees" | "perfumes">("all");

  // Filter the products array based on the selected category
  const filteredProducts = products.filter(
    (product) => activeFilter === "all" || product.category === activeFilter
  );

  return (
    <div className="min-h-screen bg-white pb-24 pt-12 transition-colors duration-300 dark:bg-[#013220]">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        
        {/* Header & Filters */}
        <div className="mb-12 flex flex-col items-center justify-between gap-6 border-b border-gray-200 pb-8 dark:border-[#FFD700]/20 md:flex-row">
          <h1 className="font-serif text-3xl font-bold text-black dark:text-[#FFD700] md:text-4xl">
            The Collection
          </h1>
          
          {/* Filter Buttons */}
          <div className="flex gap-2 rounded-md bg-gray-100 p-1 dark:bg-[#012818]">
            <button
              onClick={() => setActiveFilter("all")}
              className={`rounded px-6 py-2 font-sans text-sm font-medium transition-colors ${
                activeFilter === "all" 
                  ? "bg-white text-black shadow-sm dark:bg-[#FFD700] dark:text-[#013220]" 
                  : "text-gray-600 hover:text-black dark:text-[#FFD700]/70 dark:hover:text-[#FFD700]"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setActiveFilter("qamees")}
              className={`rounded px-6 py-2 font-sans text-sm font-medium transition-colors ${
                activeFilter === "qamees" 
                  ? "bg-white text-black shadow-sm dark:bg-[#FFD700] dark:text-[#013220]" 
                  : "text-gray-600 hover:text-black dark:text-[#FFD700]/70 dark:hover:text-[#FFD700]"
              }`}
            >
              Qamees
            </button>
            <button
              onClick={() => setActiveFilter("perfumes")}
              className={`rounded px-6 py-2 font-sans text-sm font-medium transition-colors ${
                activeFilter === "perfumes" 
                  ? "bg-white text-black shadow-sm dark:bg-[#FFD700] dark:text-[#013220]" 
                  : "text-gray-600 hover:text-black dark:text-[#FFD700]/70 dark:hover:text-[#FFD700]"
              }`}
            >
              Perfumes
            </button>
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="py-20 text-center font-sans text-lg text-gray-500 dark:text-[#FFD700]/70">
            No products found in this category.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}