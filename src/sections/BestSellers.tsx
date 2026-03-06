// src/sections/BestSellers.tsx
"use client";

import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { products } from "@/lib/data";

export default function BestSellers() {
  // Grab exactly 4 items
  const bestSellers = [...products].reverse().slice(0, 4);

  return (
    <section className="w-full bg-white py-16 md:py-24">
      <div className="mx-auto max-w-[1400px] px-5 md:px-12">
        
        {/* 1. QUIET, STANDARD HEADER */}
        <div className="mb-10 flex flex-col items-center text-center md:mb-16">
          <h2 className="font-sans text-2xl font-bold uppercase tracking-widest text-black md:text-3xl">
            Best Sellers
          </h2>
        </div>

        {/* 2. THE STANDARD RETAIL GRID 
            Mobile: 2 columns, tight horizontal gap (gap-x-3) so images are large.
            Desktop: 4 columns, standard gap (gap-x-8).
        */}
        <div className="grid grid-cols-2 gap-x-3 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-x-8 md:gap-y-16">
          {bestSellers.map((product) => (
            <div key={product.id}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {/* 3. STANDARD BOTTOM BUTTON */}
        <div className="mt-14 flex justify-center md:mt-20">
          <Link
            href="/shop?sort=bestselling"
            className="border border-black px-10 py-4 font-sans text-xs font-semibold uppercase tracking-widest text-black transition-colors hover:bg-black hover:text-white"
          >
            Shop All Best Sellers
          </Link>
        </div>

      </div>
    </section>
  );
}