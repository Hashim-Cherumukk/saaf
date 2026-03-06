// src/app/shop/page.tsx
"use client";

import { useState } from "react";
import ProductCard from "@/components/ProductCard";
import { products } from "@/lib/data";

export default function ShopPage() {
  const [activeFilter, setActiveFilter] = useState<"all" | "qamees" | "perfumes">("all");

  const filteredProducts = products.filter(
    (product) => activeFilter === "all" || product.category === activeFilter
  );

  // Dynamic Title Logic
  const pageTitle = 
    activeFilter === "all" ? "All Products" : 
    activeFilter === "qamees" ? "Qamees Collection" : 
    "Signature Perfumes";

  return (
    <main className="min-h-screen w-full bg-white pb-32 pt-6 md:pt-12">
      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        
        <div className="flex flex-col lg:flex-row lg:items-start lg:gap-20">
          
          {/* 1. STICKY SIDEBAR (Filters & Title) */}
          <div className="mb-8 flex flex-col lg:sticky lg:top-32 lg:mb-0 lg:w-1/4 lg:shrink-0">
            
            {/* Dynamic, Simple Title */}
            <h1 className="font-sans text-2xl font-bold uppercase tracking-widest text-black md:text-3xl lg:text-4xl transition-all">
              {pageTitle}
            </h1>

            {/* Filter Menu */}
            <div className="mt-6 flex w-full gap-6 overflow-x-auto border-y border-black/10 py-4 lg:mt-10 lg:flex-col lg:gap-4 lg:overflow-visible lg:border-y-0 lg:border-t lg:py-8 [&::-webkit-scrollbar]:hidden">
              
              <button
                type="button"
                onClick={() => setActiveFilter("all")}
                className={`flex shrink-0 items-center justify-between font-sans text-xs font-bold uppercase tracking-widest transition-colors ${
                  activeFilter === "all" ? "text-black" : "text-black/40 hover:text-black/70"
                }`}
              >
                <span>View All</span>
                <span className="hidden font-sans text-[9px] text-black/30 lg:block">[{products.length}]</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveFilter("qamees")}
                className={`flex shrink-0 items-center justify-between font-sans text-xs font-bold uppercase tracking-widest transition-colors ${
                  activeFilter === "qamees" ? "text-black" : "text-black/40 hover:text-black/70"
                }`}
              >
                <span>Qamees</span>
                <span className="hidden font-sans text-[9px] text-black/30 lg:block">
                  [{products.filter(p => p.category === 'qamees').length}]
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveFilter("perfumes")}
                className={`flex shrink-0 items-center justify-between font-sans text-xs font-bold uppercase tracking-widest transition-colors ${
                  activeFilter === "perfumes" ? "text-black" : "text-black/40 hover:text-black/70"
                }`}
              >
                <span>Perfumes</span>
                <span className="hidden font-sans text-[9px] text-black/30 lg:block">
                  [{products.filter(p => p.category === 'perfumes').length}]
                </span>
              </button>

            </div>
          </div>

          {/* 2. PRODUCT GRID (Right Side) */}
          {/* Added min-h-[100vh] to prevent the footer jump bug */}
          <div className="w-full min-h-[100vh] lg:w-3/4">
            {filteredProducts.length === 0 ? (
              <div className="flex h-[50vh] flex-col items-center justify-center border border-dashed border-black/10 text-center">
                <p className="font-sans text-xs font-bold uppercase tracking-widest text-black/40">
                  No products found in this category.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-x-3 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-6 xl:gap-x-8 xl:gap-y-16">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>

        </div>

      </div>
    </main>
  );
}