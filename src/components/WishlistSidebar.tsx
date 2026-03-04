// src/components/WishlistSidebar.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { X, ShoppingBag } from "lucide-react";
import { useWishlistStore } from "@/store/useWishlistStore";
import { useCartStore } from "@/store/useCartStore";

interface WishlistSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function WishlistSidebar({ isOpen, onClose }: WishlistSidebarProps) {
  const { wishlist, toggleWishlist } = useWishlistStore();
  const { addToCart } = useCartStore();

  const handleMoveToCart = (item: any) => {
    addToCart({ ...item, quantity: 1 });
    toggleWishlist(item); // Remove from wishlist after adding to cart
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity" onClick={onClose} />
      )}

      <div className={`fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-white shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] dark:bg-[#0a0a0a] ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}>
        <div className="flex items-center justify-between border-b border-black/10 p-6 dark:border-white/10">
          <h2 className="font-sans text-lg font-bold tracking-tight">Saved Items</h2>
          <button onClick={onClose} className="opacity-50 hover:opacity-100 transition-opacity">
            <X size={24} strokeWidth={1.5} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {wishlist.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center opacity-50">
              <HeartIcon />
              <p className="mt-4 font-sans text-sm font-medium">Your wishlist is empty.</p>
            </div>
          ) : (
            <ul className="space-y-8">
              {wishlist.map((item) => (
                <li key={item.id} className="flex gap-6">
                  <Link href={`/shop/${item.id}`} onClick={onClose} className="relative h-28 w-20 flex-shrink-0 bg-gray-100 dark:bg-zinc-900">
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                  </Link>
                  <div className="flex flex-1 flex-col justify-between py-1">
                    <div>
                      <h3 className="font-sans text-sm font-bold">{item.name}</h3>
                      <p className="mt-1 font-sans text-sm opacity-60">${item.price.toFixed(2)}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <button 
                        onClick={() => toggleWishlist(item)}
                        className="font-sans text-xs underline opacity-50 hover:opacity-100"
                      >
                        Remove
                      </button>
                      <button 
                        onClick={() => handleMoveToCart(item)}
                        className="flex items-center gap-2 rounded-full bg-black px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-white transition-transform active:scale-95 dark:bg-white dark:text-black"
                      >
                        <ShoppingBag size={12} /> Add
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}

function HeartIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
    </svg>
  );
}