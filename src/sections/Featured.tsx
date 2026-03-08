"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Product } from "@prisma/client";

// Accept the live data from the database
export default function Featured({ products }: { products: Product[] }) {
  // Grab up to 8 products for a smooth loop
  const featuredProducts = products.slice(0, 8);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = window.innerWidth < 768 ? 200 : 300;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;

    // Only auto-scroll if we have enough products to actually fill the screen (usually 3 or more)
    if (!isPaused && featuredProducts.length > 3) {
      interval = setInterval(() => {
        if (scrollRef.current) {
          const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
          const maxScroll = scrollWidth - clientWidth;
          const scrollAmount = window.innerWidth < 768 ? 200 : 300;

          if (scrollLeft >= maxScroll - 10) {
            scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
          } else {
            scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
          }
        }
      }, 3000);
    }

    return () => clearInterval(interval);
  }, [isPaused, featuredProducts.length]);

  return (
    <section className="w-full bg-white py-16 md:py-24 border-b border-black/5">
      <div className="mx-auto max-w-[1400px]">
        
        <div className="mb-8 flex flex-col items-center justify-between gap-6 px-6 md:mb-12 md:flex-row md:px-12">
          <div className="text-center md:text-left">
            <h2 className="font-sans text-3xl font-bold tracking-tight text-black md:text-4xl">
              New Arrivals
            </h2>
            <p className="mt-2 font-sans text-sm font-medium text-gray-500">
              Explore our latest additions to the collection.
            </p>
          </div>

          <div className="hidden items-center gap-2 md:flex">
            <button onClick={() => scroll("left")} className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-black transition-transform active:scale-90 hover:bg-gray-200">
              <ArrowLeft size={18} />
            </button>
            <button onClick={() => scroll("right")} className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-black transition-transform active:scale-90 hover:bg-gray-200">
              <ArrowRight size={18} />
            </button>
          </div>
        </div>

        <div
          className="relative w-full overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
        >
          <div
            ref={scrollRef}
            className="flex w-full snap-x snap-mandatory overflow-x-auto scroll-smooth px-6 pb-8 md:px-12 [&::-webkit-scrollbar]:hidden"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            <div className="flex gap-4 md:gap-6">
              {featuredProducts.map((product) => (
                <div
                  key={product.id}
                  className="min-w-[45vw] snap-start sm:min-w-[200px] md:min-w-[260px] lg:min-w-[280px]"
                >
                  <ProductCard product={product} />
                </div>
              ))}
              <div className="min-w-[4vw] shrink-0 md:min-w-[2vw]"></div>
            </div>
          </div>
        </div>

        <div className="mt-4 flex justify-center px-6 md:mt-8">
          <Link href="/shop" className="flex items-center gap-3 rounded-full bg-black px-8 py-4 font-sans text-xs font-semibold uppercase tracking-widest text-white transition-transform active:scale-95 hover:bg-black/80">
            View All Products
            <ArrowRight size={16} />
          </Link>
        </div>

      </div>
    </section>
  );
}