// src/sections/BestSellers.tsx
"use client";

import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { products } from "@/lib/data";

export default function BestSellers() {
  // Grab exactly 4 items for a clean row
  const bestSellers = [...products].reverse().slice(0, 4);

  return (
    <section className="w-full bg-white py-16 md:py-24 border-b border-black/5">
      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        
        {/* 1. SIMPLE, ELEGANT HEADER */}
        <div className="mb-12 flex flex-col items-center text-center md:mb-16">
          <h2 className="font-sans text-3xl font-bold tracking-tight text-black md:text-4xl">
            Best Sellers
          </h2>
          <p className="mt-3 max-w-lg font-sans text-sm text-black/60">
            The most sought-after silhouettes from the Saaf Couture archive.
          </p>
        </div>

        {/* 2. STANDARD FASHION GRID (Mobile: 2 cols, Desktop: 4 cols) */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4 md:gap-x-6 md:gap-y-12">
          {bestSellers.map((product) => (
            <div key={product.id}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {/* 3. BOTTOM BUTTON (Dead center, no distractions) */}
        <div className="mt-12 flex justify-center md:mt-16">
          <Link
            href="/shop?sort=bestselling"
            className="flex items-center justify-center bg-black px-10 py-4 font-sans text-[11px] font-bold uppercase tracking-widest text-white transition-transform active:scale-95 hover:bg-black/80 md:text-xs"
          >
            View All Best Sellers
          </Link>
        </div>

      </div>
    </section>
  );
}