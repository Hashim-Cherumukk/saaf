// src/components/ProductCard.tsx
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, X, MessageCircle, ShoppingBag, Check } from "lucide-react";
import { Product } from "@/lib/data";
import { useCartStore } from "@/store/useCartStore";
import { useWishlistStore } from "@/store/useWishlistStore";

type Intent = "cart" | "buy" | null;

export default function ProductCard({ product }: { product: Product }) {
  const addToCart = useCartStore((state) => state.addToCart);
  const { toggleWishlist, isInWishlist } = useWishlistStore();
  const isFavorite = isInWishlist(product.id);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [intent, setIntent] = useState<Intent>(null);
  
  // Selection State
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const isQamees = product.category === "qamees";
  const sizes = ["S", "M", "L", "XL", "XXL"];

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [isModalOpen]);

  const openModal = (type: Intent) => {
    setIntent(type);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => {
      setIntent(null);
      setSelectedSize(null);
      setQuantity(1);
      setError(false);
      setIsAdded(false);
    }, 300); // Wait for animation to finish before resetting
  };

  const handleConfirm = () => {
    if (isQamees && !selectedSize) {
      setError(true);
      return;
    }
    setError(false);

    if (intent === "cart") {
      const cartItemId = selectedSize ? `${product.id}-${selectedSize}` : product.id;
      const cartItemName = selectedSize ? `${product.name} (Size: ${selectedSize})` : product.name;

      addToCart({
        ...product,
        id: cartItemId,
        name: cartItemName,
        quantity: quantity,
      });

      setIsAdded(true);
      setTimeout(() => {
        closeModal();
      }, 1500); // Show "Added ✓" for 1.5s then close
    } 
    else if (intent === "buy") {
      const itemName = selectedSize ? `${product.name} (Size: ${selectedSize})` : product.name;
      const totalPrice = product.price * quantity;

      const message = `*INSTANT ORDER | SAAF COUTURE*%0A%0AI would like to purchase:%0A1x *${itemName}*%0AQuantity: ${quantity}%0ATotal: $${totalPrice.toFixed(2)}%0A%0APlease let me know the next steps for payment and delivery.`;
      
      window.open(`https://wa.me/9778461263?text=${message}`, "_blank");
      closeModal();
    }
  };

  return (
    <>
      {/* 1. THE PRODUCT CARD */}
      <div className="group relative flex h-full flex-col">
        <div className="relative aspect-[3/4] w-full overflow-hidden bg-gray-50">
          <Link href={`/shop/${product.id}`} className="block h-full w-full">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
          </Link>
          <button 
            onClick={() => toggleWishlist(product)}
            className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-sm transition-transform active:scale-90 md:right-4 md:top-4 md:h-10 md:w-10 hover:scale-110"
          >
            <Heart size={18} strokeWidth={1.5} className={isFavorite ? "fill-red-500 text-red-500" : "text-black"} />
          </button>
        </div>

        <div className="mt-4 flex flex-1 flex-col items-center text-center">
          <Link href={`/shop/${product.id}`}>
            <h3 className="font-sans text-[11px] font-bold uppercase tracking-widest text-black transition-colors hover:text-black/60 md:text-xs">
              {product.name}
            </h3>
          </Link>
          <p className="mt-1 font-sans text-[11px] font-medium text-black/60 md:text-xs">
            ${product.price.toFixed(2)}
          </p>
          
          {/* Standard Action Buttons */}
          <div className="mt-auto flex w-full gap-2 pt-4">
            <button
              onClick={() => openModal("cart")}
              className="flex-1 border border-black/10 bg-transparent py-2.5 font-sans text-[9px] font-bold uppercase tracking-widest text-black transition-colors hover:border-black hover:bg-black hover:text-white md:text-[10px]"
            >
              Add to Bag
            </button>
            <button
              onClick={() => openModal("buy")}
              className="flex-1 bg-black py-2.5 font-sans text-[9px] font-bold uppercase tracking-widest text-white transition-opacity hover:bg-black/80 md:text-[10px]"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* 2. THE GLOBAL POPUP MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center bg-black/40 p-4 backdrop-blur-sm transition-opacity sm:items-center sm:p-6">
          
          {/* Modal Content Box */}
          <div className="relative w-full max-w-sm bg-white p-6 shadow-2xl animate-in slide-in-from-bottom-4 sm:slide-in-from-bottom-0 sm:zoom-in-95">
            
            {/* Close Button */}
            <button 
              onClick={closeModal}
              className="absolute right-4 top-4 p-2 text-black/40 transition-colors hover:text-black"
            >
              <X size={18} />
            </button>

            {/* Header: Intent & Product Summary */}
            <h2 className="mb-4 pr-8 font-sans text-sm font-bold uppercase tracking-widest text-black border-b border-black/10 pb-4">
              {intent === "cart" ? "Add to Bag" : "Instant Checkout"}
            </h2>

            <div className="mb-6 flex items-center gap-4">
              <div className="relative h-16 w-12 shrink-0 bg-gray-50">
                <Image src={product.image} alt={product.name} fill className="object-cover" />
              </div>
              <div>
                <h3 className="font-sans text-[11px] font-bold uppercase text-black line-clamp-1">{product.name}</h3>
                <p className="mt-1 font-sans text-[11px] text-black/60">${product.price.toFixed(2)}</p>
              </div>
            </div>

            {/* Size Selector */}
            {isQamees && (
              <div className="mb-6">
                <label className="mb-2 block font-sans text-[9px] font-bold uppercase tracking-widest text-black/60">
                  Select Size
                </label>
                <div className="flex flex-wrap gap-2">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => { setSelectedSize(size); setError(false); }}
                      className={`flex h-10 w-10 items-center justify-center border font-sans text-xs font-bold transition-colors ${
                        selectedSize === size ? "border-black bg-black text-white" : "border-black/10 text-black hover:border-black"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
                {error && <p className="mt-2 font-sans text-[9px] font-bold uppercase tracking-widest text-red-500">Size is required.</p>}
              </div>
            )}

            {/* Quantity Selector */}
            <div className="mb-8">
              <label className="mb-2 block font-sans text-[9px] font-bold uppercase tracking-widest text-black/60">
                Quantity
              </label>
              <div className="flex h-10 w-28 items-center justify-between border border-black/10 px-2">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-2 text-black/50 hover:text-black">−</button>
                <span className="font-sans text-xs font-bold text-black">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="p-2 text-black/50 hover:text-black">+</button>
              </div>
            </div>

            {/* Confirm Button */}
            <button
              onClick={handleConfirm}
              className={`flex w-full items-center justify-center gap-2 py-4 font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-white transition-all active:scale-[0.98] ${
                isAdded 
                  ? "bg-green-600" 
                  : intent === "buy" 
                    ? "bg-[#25D366] hover:bg-[#25D366]/90" 
                    : "bg-black hover:bg-black/90"
              }`}
            >
              {isAdded ? (
                <><Check size={16} /> Added to Bag</>
              ) : intent === "buy" ? (
                <><MessageCircle size={16} /> Buy Now</>
              ) : (
                <><ShoppingBag size={16} /> Confirm Add</>
              )}
            </button>

          </div>
        </div>
      )}
    </>
  );
}