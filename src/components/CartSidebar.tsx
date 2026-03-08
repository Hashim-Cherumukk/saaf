"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Minus, Plus, ShoppingBag, MessageCircle } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartSidebar({ isOpen, onClose }: CartSidebarProps) {
  const { cart, removeFromCart, updateQuantity } = useCartStore();
  
  // FIX 1: Hydration state to prevent Next.js server/client mismatch
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  /* LOCK BACKGROUND SCROLL */
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

  // If the component hasn't mounted in the browser yet, don't render the cart contents
  if (!isMounted) return null;

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * (item.quantity || 1),
    0
  );

  const handleWhatsAppCheckout = () => {
    const phoneNumber = "9778461263";

    // FIX 3: Using %0A for perfectly formatted WhatsApp line breaks
    let message = `*NEW ORDER | SAAF COUTURE*%0A%0A`;

    cart.forEach((item, index) => {
      message += `${index + 1}. *${item.name}*%0A`;
      message += `Qty: ${item.quantity}%0A`;
      // FIX 2: Updated to ₹
      message += `Price: ₹${(item.price * (item.quantity || 1)).toFixed(2)}%0A%0A`;
    });

    message += `*TOTAL: ₹${totalPrice.toFixed(2)}*%0A%0APlease confirm my order.`;

    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
  };

  return (
    <>
      {/* BACKDROP */}
      <div
        className={`fixed inset-0 z-[100] bg-black/40 backdrop-blur-[2px] transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
      />

      {/* CART DRAWER */}
      <aside
        className={`fixed right-0 top-0 z-[110] flex h-screen w-full max-w-[420px] flex-col bg-white shadow-[0_10px_40px_rgba(0,0,0,0.15)] transition-transform duration-500  ease-[cubic-bezier(0.32,0.72,0,1)] ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* HEADER */}
        <div className="flex h-20 shrink-0 items-center justify-between border-b border-black/5 px-8">
          <div className="flex items-center gap-3">
            <span className="font-sans text-[11px] font-bold uppercase tracking-[0.2em]">
              Your Bag
            </span>

            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-black text-[9px] font-bold text-white">
              {cart.reduce((acc, item) => acc + (item.quantity || 1), 0)}
            </span>
          </div>

          <button
            onClick={onClose}
            className="group flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-black/40 transition hover:text-black"
          >
            Close
            <X
              size={18}
              strokeWidth={1.5}
              className="transition-transform group-hover:rotate-90"
            />
          </button>
        </div>

        {/* SCROLLABLE AREA */}
        <div
          className="flex-1 min-h-0 overflow-y-auto px-8 py-10 overscroll-contain"
          onWheel={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
        >
          {cart.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <ShoppingBag size={40} strokeWidth={1} className="text-black/10 mb-6"/>

              <p className="text-[11px] font-bold uppercase tracking-widest text-black/40">
                Your bag is empty
              </p>

              <Link
                href="/shop"
                onClick={onClose}
                className="mt-6 border-b border-black pb-1 text-[10px] font-bold uppercase tracking-widest hover:text-black/60 transition-colors"
              >
                Shop Collection
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-10">
              {cart.map((item) => (
                <div key={item.id} className="flex gap-6">

                  {/* PRODUCT IMAGE */}
                  <div className="relative aspect-[3/4] w-24 shrink-0 overflow-hidden bg-gray-50">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* PRODUCT INFO */}
                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <h3 className="text-[11px] font-bold uppercase tracking-wider line-clamp-2">
                        {item.name}
                      </h3>

                      <p className="mt-1 text-[11px] text-black/40">
                        ₹{item.price.toFixed(2)}
                      </p>
                    </div>

                    <div className="mt-4 flex items-end justify-between">
                      {/* QTY */}
                      <div className="flex h-9 w-24 items-center justify-between border border-black/10 px-2">
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.id,
                              Math.max(1, (item.quantity || 1) - 1)
                            )
                          }
                          className="p-1 hover:text-black/60"
                        >
                          <Minus size={12} />
                        </button>

                        <span className="text-[11px] font-bold">
                          {item.quantity}
                        </span>

                        <button
                          onClick={() =>
                            updateQuantity(item.id, (item.quantity || 1) + 1)
                          }
                          className="p-1 hover:text-black/60"
                        >
                          <Plus size={12} />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
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

        {/* FOOTER */}
        {cart.length > 0 && (
          <div className="shrink-0 border-t border-black/5 bg-white p-8">
            <div className="mb-8 flex items-center justify-between">
              <span className="text-[11px] uppercase tracking-[0.2em] text-black/40">
                Subtotal
              </span>

              <span className="text-sm font-bold">
                ₹{totalPrice.toFixed(2)}
              </span>
            </div>

            <div className="flex flex-col gap-3">
              <Link
                href="/checkout"
                onClick={onClose}
                className="flex items-center justify-center bg-black py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-white transition-opacity hover:bg-black/90"
              >
                Checkout
              </Link>

              <button
                onClick={handleWhatsAppCheckout}
                className="flex items-center justify-center gap-2 border border-black/10 py-4 text-[10px] font-bold uppercase tracking-[0.2em] transition-colors hover:bg-zinc-50"
              >
                <MessageCircle size={14} />
                WhatsApp Order
              </button>
            </div>

            <p className="mt-6 text-center text-[9px] tracking-widest text-black/30">
              SHIPPING & TAXES CALCULATED AT CHECKOUT
            </p>
          </div>
        )}
      </aside>
    </>
  );
}