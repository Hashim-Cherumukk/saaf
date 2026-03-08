import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import type { Product } from "@prisma/client";

// We receive the real data from page.tsx via the 'products' prop
export default function BestSellers({ products }: { products: Product[] }) {
  // Always restrict to exactly 4 items max to protect the grid design
  const displayProducts = products.slice(0, 4);

  return (
    <section className="w-full bg-white py-16 md:py-24">
      <div className="mx-auto max-w-[1400px] px-5 md:px-12">
        
        <div className="mb-10 flex flex-col items-center text-center md:mb-16">
          <h2 className="font-sans text-2xl font-bold uppercase tracking-widest text-black md:text-3xl">
            Best Sellers
          </h2>
        </div>

        {/* Dynamic Grid: Adapts cleanly if there are only 1, 2, or 3 products */}
        <div className="grid grid-cols-2 gap-x-3 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-x-8 md:gap-y-16">
          {displayProducts.map((product) => (
            <div key={product.id}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>

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