// src/components/WishlistSidebar.tsx
"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Heart } from "lucide-react";
import { useWishlistStore } from "@/store/useWishlistStore";
import { useCartStore } from "@/store/useCartStore";

interface WishlistSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function WishlistSidebar({ isOpen, onClose }: WishlistSidebarProps) {
  const { wishlist, toggleWishlist } = useWishlistStore();
  const { addToCart } = useCartStore();

  // Lock background scroll when wishlist is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen]);

  const handleMoveToCart = (item: any) => {
    // Note: If you have sizes, you might want to redirect them to the product page instead,
    // but for quick-add, this works perfectly.
    addToCart({ ...item, quantity: 1 });
    toggleWishlist(item); // Remove from wishlist after adding to cart
  };

  return (
    <>
      {/* Background Overlay */}
      <div 
        className={`fixed inset-0 z-[100] bg-black/20 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
      />

      {/* Sidebar Panel */}
      <div 
        className={`fixed inset-y-0 right-0 z-[110] flex w-full max-w-[400px] flex-col bg-white shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex h-20 shrink-0 items-center justify-between border-b border-black/5 px-6">
          <h2 className="font-sans text-sm font-bold uppercase tracking-widest text-black">
            Saved Items ({wishlist.length})
          </h2>
          <button 
            onClick={onClose}
            className="flex items-center gap-2 font-sans text-[10px] font-bold uppercase tracking-widest text-black/50 transition-colors hover:text-black"
          >
            Close <X size={16} strokeWidth={1.5} />
          </button>
        </div>

        {/* Wishlist Items / Empty State */}
        <div className="flex-1 overflow-y-auto px-6 py-8 [&::-webkit-scrollbar]:hidden">
          {wishlist.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <Heart size={48} strokeWidth={1} className="mb-6 text-black/20" />
              <p className="font-sans text-sm font-medium text-black/60">Your wishlist is currently empty.</p>
              <Link 
                href="/shop" 
                onClick={onClose}
                className="mt-8 border-b border-black pb-1 font-sans text-[10px] font-bold uppercase tracking-widest text-black transition-opacity hover:opacity-60"
              >
                Explore Collection
              </Link>
            </div>
          ) : (
            <ul className="flex flex-col gap-8">
              {wishlist.map((item) => (
                <li key={item.id} className="flex gap-6">
                  {/* Product Image */}
                  <Link 
                    href={`/shop/${item.id}`} 
                    onClick={onClose} 
                    className="relative aspect-[3/4] w-24 shrink-0 overflow-hidden bg-gray-50 transition-transform hover:scale-105"
                  >
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                  </Link>
                  
                  {/* Product Details */}
                  <div className="flex flex-1 flex-col justify-between py-1">
                    <div className="flex flex-col items-start justify-between gap-2">
                      <Link 
                        href={`/shop/${item.id}`} 
                        onClick={onClose}
                        className="font-sans text-xs font-bold uppercase leading-tight text-black hover:underline underline-offset-4"
                      >
                        {item.name}
                      </Link>
                      <p className="font-sans text-xs font-medium text-black/60">
                        ${item.price.toFixed(2)}
                      </p>
                    </div>
                    
                    {/* Controls (Move to Bag & Remove) */}
                    <div className="mt-4 flex flex-col items-start gap-3">
                      <button 
                        onClick={() => handleMoveToCart(item)}
                        className="w-full bg-black py-2.5 text-center font-sans text-[10px] font-bold uppercase tracking-widest text-white transition-opacity hover:bg-black/90 active:scale-[0.98]"
                      >
                        Move to Bag
                      </button>
                      
                      <button 
                        onClick={() => toggleWishlist(item)}
                        className="border-b border-black/20 pb-0.5 font-sans text-[9px] font-bold uppercase tracking-widest text-black/40 transition-colors hover:border-black hover:text-black"
                      >
                        Remove
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