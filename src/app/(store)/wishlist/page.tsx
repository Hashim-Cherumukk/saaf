"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Heart, ArrowLeft } from "lucide-react";
import { useWishlistStore } from "@/store/useWishlistStore";
import ProductCard from "@/components/ProductCard";

export default function WishlistPage() {
  const { wishlist } = useWishlistStore();
  
  // Hydration state check to prevent Next.js crashes
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <main className="min-h-screen w-full bg-white pb-32 pt-6 md:pt-12">
      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        
        {/* Back Navigation */}
        <Link
          href="/shop"
          className="mb-8 hidden md:flex w-fit items-center gap-2 font-sans text-[10px] font-bold uppercase tracking-widest text-black/40 transition-colors hover:text-black"
        >
          <ArrowLeft size={14} /> Back to Shop
        </Link>

        {/* Page Header */}
        <div className="mb-10 flex items-end justify-between border-b border-black/10 pb-6">
          <div>
            <h1 className="font-sans text-2xl font-bold uppercase tracking-widest text-black md:text-3xl lg:text-4xl">
              Saved Items
            </h1>
            <p className="mt-2 font-sans text-[10px] font-bold uppercase tracking-widest text-black/40">
              {wishlist.length} {wishlist.length === 1 ? "Item" : "Items"} Saved
            </p>
          </div>
        </div>

        {/* Wishlist Grid or Empty State */}
        {wishlist.length === 0 ? (
          <div className="flex min-h-[40vh] flex-col items-center justify-center border border-dashed border-black/10 text-center">
            <Heart size={48} strokeWidth={1} className="mb-6 text-black/20" />
            <p className="font-sans text-xs font-bold uppercase tracking-widest text-black/40">
              Your wishlist is currently empty
            </p>
            <Link
              href="/shop"
              className="mt-6 border-b border-black pb-1 font-sans text-[10px] font-bold uppercase tracking-widest text-black transition-opacity hover:opacity-60"
            >
              Explore Collection
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-x-3 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 lg:gap-x-6 xl:gap-x-8 xl:gap-y-16">
            {wishlist.map((product) => (
              // Reusing your powerful ProductCard component here!
              <ProductCard key={product.id} product={product as any} />
            ))}
          </div>
        )}

      </div>
    </main>
  );
}