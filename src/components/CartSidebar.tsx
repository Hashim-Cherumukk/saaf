// src/components/CartSidebar.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/store/useCartStore";

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartSidebar({ isOpen, onClose }: CartSidebarProps) {
  const { cart, removeFromCart } = useCartStore();

  // Calculate cart total
  const totalPrice = cart.reduce((total, item) => total + item.price * (item.quantity || 1), 0);

  // Generate WhatsApp Order URL
  const handleWhatsAppCheckout = () => {
    const phoneNumber = "9778461263"; // Replace with actual SAAF Couture WhatsApp number
    
    let message = `*Hello SAAF COUTURE!* 👋\nI would like to place an order:\n\n`;
    
    cart.forEach((item, index) => {
      message += `${index + 1}. *${item.name}*\n`;
      message += `   Quantity: ${item.quantity}\n`;
      message += `   Price: $${(item.price * (item.quantity || 1)).toFixed(2)}\n\n`;
    });
    
    message += `*Total Amount: $${totalPrice.toFixed(2)}*\n\n`;
    message += `Please confirm my order and share payment details.`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, "_blank");
  };

  return (
    <>
      {/* Background Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Sidebar Panel */}
      <div 
        className={`fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-white shadow-2xl transition-transform duration-300 ease-in-out dark:bg-[#012818] ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 p-6 dark:border-[#FFD700]/20">
          <h2 className="font-serif text-2xl font-bold text-black dark:text-[#FFD700]">Your Cart</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-black dark:text-[#FFD700]/70 dark:hover:text-[#FFD700]"
          >
            ✕ Close
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {cart.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center opacity-60">
              <p className="font-sans text-lg">Your cart is empty.</p>
              <button onClick={onClose} className="mt-4 underline">Continue Shopping</button>
            </div>
          ) : (
            <ul className="space-y-6">
              {cart.map((item) => (
                <li key={item.id} className="flex gap-4">
                  <div className="relative h-24 w-20 flex-shrink-0 overflow-hidden rounded-md bg-gray-100">
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                  </div>
                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <h3 className="font-serif text-base font-medium text-black dark:text-[#FFD700]">{item.name}</h3>
                      <p className="mt-1 font-sans text-sm text-gray-500 dark:text-gray-400">${item.price.toFixed(2)}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="font-sans text-sm">Qty: {item.quantity}</span>
                      </div>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="font-sans text-xs text-red-500 hover:underline dark:text-red-400"
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

        {/* Footer / Checkout */}
        {cart.length > 0 && (
          <div className="border-t border-gray-200 p-6 dark:border-[#FFD700]/20">
            <div className="mb-4 flex items-center justify-between font-serif text-xl font-bold">
              <span>Total</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            
            <div className="space-y-3">
              <Link 
                href="/checkout" 
                onClick={onClose}
                className="block w-full bg-black py-4 text-center text-[10px] font-bold uppercase tracking-widest text-white transition-opacity hover:opacity-80 dark:bg-[#FFD700] dark:text-[#013220]"
              >
                Proceed to Checkout
              </Link>

              <button
                onClick={handleWhatsAppCheckout}
                className="flex w-full items-center justify-center gap-2 rounded-md bg-[#25D366] px-6 py-4 font-sans text-sm font-bold text-white transition-opacity hover:opacity-90"
              >
                Order via WhatsApp
              </button>
            </div>

            <p className="mt-4 text-center font-sans text-[10px] uppercase tracking-tighter text-gray-500 dark:text-gray-400">
              Shipping & taxes calculated at checkout.
            </p>
          </div>
        )}
      </div>
    </>
  );
}