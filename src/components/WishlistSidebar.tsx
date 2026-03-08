"use client";

import { useEffect, useState } from "react";
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
  
  // Hydration state check
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Lock background scroll when wishlist is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
      document.body.style.touchAction = "none";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      document.body.style.touchAction = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      document.body.style.touchAction = "";
    };
  }, [isOpen]);

  const handleMoveToCart = (item: any) => {
    // Note: If you have sizes, you might want to redirect them to the product page instead,
    // but for quick-add, this works perfectly.
    addToCart({ ...item, quantity: 1 });
    toggleWishlist(item); // Remove from wishlist after adding to cart
  };

  if (!isMounted) return null;

  return (
    <>
      {/* Background Overlay */}
      <div 
        className={`fixed inset-0 z-[100] bg-black/40 backdrop-blur-[2px] transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
      />

      {/* Sidebar Panel */}
      <div 
        className={`fixed inset-y-0 right-0 z-[110] flex w-full max-w-[400px] flex-col bg-white shadow-[0_10px_40px_rgba(0,0,0,0.15)] transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex h-20 shrink-0 items-center justify-between border-b border-black/5 px-8">
          <div className="flex items-center gap-3">
            <span className="font-sans text-[11px] font-bold uppercase tracking-[0.2em]">
              Saved Items
            </span>
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-black text-[9px] font-bold text-white">
              {wishlist.length}
            </span>
          </div>
          <button 
            onClick={onClose}
            className="group flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-black/40 transition hover:text-black"
          >
            Close 
            <X size={18} strokeWidth={1.5} className="transition-transform group-hover:rotate-90" />
          </button>
        </div>

        {/* Wishlist Items / Empty State */}
        <div 
          className="flex-1 min-h-0 overflow-y-auto px-8 py-10 overscroll-contain"
          onWheel={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
        >
          {wishlist.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <Heart size={40} strokeWidth={1} className="mb-6 text-black/10" />
              <p className="text-[11px] font-bold uppercase tracking-widest text-black/40">
                Your wishlist is empty
              </p>
              <Link 
                href="/shop" 
                onClick={onClose}
                className="mt-6 border-b border-black pb-1 text-[10px] font-bold uppercase tracking-widest hover:text-black/60 transition-colors"
              >
                Explore Collection
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-10">
              {wishlist.map((item) => (
                <div key={item.id} className="flex gap-6">
                  {/* Product Image */}
                  <Link 
                    href={`/shop/${item.id}`} 
                    onClick={onClose} 
                    className="relative aspect-[3/4] w-24 shrink-0 overflow-hidden bg-gray-50 transition-transform hover:scale-105"
                  >
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                  </Link>
                  
                  {/* Product Details */}
                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <Link 
                        href={`/shop/${item.id}`} 
                        onClick={onClose}
                        className="text-[11px] font-bold uppercase tracking-wider line-clamp-2 hover:underline underline-offset-4"
                      >
                        {item.name}
                      </Link>
                      <p className="mt-1 text-[11px] text-black/40">
                        ₹{item.price.toFixed(2)}
                      </p>
                    </div>
                    
                    {/* Controls (Move to Bag & Remove) */}
                    <div className="mt-4 flex flex-col items-start gap-3">
                      <button 
                        onClick={() => handleMoveToCart(item)}
                        className="w-full bg-black py-2.5 text-center font-sans text-[10px] font-bold uppercase tracking-widest text-white transition-opacity hover:bg-black/80 active:scale-[0.98]"
                      >
                        Move to Bag
                      </button>
                      
                      <button 
                        onClick={() => toggleWishlist(item)}
                        className="text-[9px] uppercase tracking-widest text-black/30 hover:text-red-500 transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
      </div>
    </>
  );
}