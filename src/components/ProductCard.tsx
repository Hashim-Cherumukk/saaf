// src/components/ProductCard.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import { Product } from "@/lib/data";
import { useCartStore } from "@/store/useCartStore";
import { useWishlistStore } from "@/store/useWishlistStore";

export default function ProductCard({ product }: { product: Product }) {
  const addToCart = useCartStore((state) => state.addToCart);
  const { toggleWishlist, isInWishlist } = useWishlistStore();
  
  const isFavorite = isInWishlist(product.id);

  return (
    <div className="group relative">
      <Link href={`/shop/${product.id}`} className="block">
        <div className="relative aspect-[3/4] overflow-hidden bg-zinc-100 dark:bg-[#012818]">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>
      </Link>

      {/* Wishlist Toggle Button */}
      <button 
        onClick={() => toggleWishlist(product)}
        className="absolute right-4 top-4 z-10 rounded-full bg-white/80 p-2 backdrop-blur-sm transition-all hover:scale-110 dark:bg-black/50"
      >
        <Heart 
          size={18} 
          strokeWidth={1.5} 
          className={isFavorite ? "fill-red-500 text-red-500" : "text-black dark:text-[#FFD700]"} 
        />
      </button>

      <div className="mt-4 flex flex-col items-center text-center">
        <h3 className="font-serif text-sm font-semibold uppercase tracking-widest text-black dark:text-[#FFD700]">
          {product.name}
        </h3>
        <p className="mt-1 font-sans text-xs text-gray-500 dark:text-[#FFD700]/60">
          ${product.price.toFixed(2)}
        </p>
        
        <button
          onClick={() => addToCart(product)}
          className="mt-4 w-full border border-black py-2 font-sans text-[10px] font-bold uppercase tracking-widest transition-colors hover:bg-black hover:text-white dark:border-[#FFD700] dark:text-[#FFD700] dark:hover:bg-[#FFD700] dark:hover:text-[#013220]"
        >
          Quick Add
        </button>
      </div>
    </div>
  );
}