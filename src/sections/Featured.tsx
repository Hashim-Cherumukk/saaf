"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { ArrowRight } from "lucide-react";
import type { Product } from "@prisma/client";

export default function Featured({ products }: { products: Product[] }) {
  const featuredProducts = products.slice(0, 8);

  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let interval: NodeJS.Timeout;

    if (!isPaused && window.innerWidth < 768 && featuredProducts.length > 2) {
      interval = setInterval(() => {
        const cardWidth = el.firstElementChild?.clientWidth || 200;
        const gap = 16;
        const scrollStep = cardWidth + gap;

        const maxScroll = el.scrollWidth - el.clientWidth;

        if (el.scrollLeft >= maxScroll - 5) {
          el.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          el.scrollBy({ left: scrollStep, behavior: "smooth" });
        }
      }, 3500);
    }

    return () => clearInterval(interval);
  }, [isPaused, featuredProducts.length]);

  return (
    <section className="w-full bg-white py-16 md:py-24 border-b border-black/5">
      <div className="mx-auto max-w-[1400px]">

        {/* HEADER */}
        <div className="mb-8 flex flex-col items-center justify-between gap-6 px-6 md:mb-12 md:flex-row md:px-12">
          <div className="text-center md:text-left">
            <h2 className="font-sans text-3xl font-bold tracking-tight text-black md:text-4xl">
              New Arrivals
            </h2>
            <p className="mt-2 font-sans text-sm font-medium text-gray-500">
              Explore our latest additions to the collection.
            </p>
          </div>
        </div>

        {/* MOBILE SWIPE + AUTO MOVE */}
        <div
          className="md:hidden overflow-hidden"
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
        >
          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory px-6 pb-8 [&::-webkit-scrollbar]:hidden"
          >
            {featuredProducts.map((product) => (
              <div
                key={product.id}
                className="min-w-[45vw] snap-start sm:min-w-[200px]"
              >
                <ProductCard product={product} />
              </div>
            ))}

            <div className="min-w-[4vw] shrink-0" />
          </div>
        </div>

        {/* DESKTOP GRID */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-6 px-12 pb-8">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* CTA */}
        <div className="mt-4 flex justify-center px-6 md:mt-8">
          <Link
            href="/shop"
            className="flex items-center gap-3 rounded-full bg-black px-8 py-4 font-sans text-xs font-semibold uppercase tracking-widest text-white transition-transform active:scale-95 hover:bg-black/80"
          >
            View All Products
            <ArrowRight size={16} />
          </Link>
        </div>

      </div>
    </section>
  );
}