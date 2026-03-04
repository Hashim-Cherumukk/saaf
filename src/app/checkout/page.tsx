// src/app/checkout/page.tsx
"use client";

import { useState } from "react";
import { useCartStore } from "@/store/useCartStore";
import Image from "next/image";
import Link from "next/link";
import { MessageCircle, ArrowLeft, ShieldCheck } from "lucide-react";

export default function CheckoutPage() {
  const { cart, clearCart } = useCartStore();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
  });

  const subtotal = cart.reduce((acc, item) => acc + item.price * (item.quantity || 1), 0);
  const shipping = subtotal > 500 ? 0 : 25;
  const total = subtotal + shipping;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleWhatsAppOrder = () => {
    if (!formData.name || !formData.address || !formData.phone) {
      alert("Please fill in your delivery details.");
      return;
    }

    // Construct the WhatsApp Message
    const orderItems = cart
      .map((item) => `• ${item.name} (x${item.quantity}) - $${(item.price * (item.quantity || 1)).toFixed(2)}`)
      .join("\n");

    const message = `*New Order from Saaf Couture*%0A%0A` +
      `*Customer Details:*%0A` +
      `Name: ${formData.name}%0A` +
      `Phone: ${formData.phone}%0A` +
      `Address: ${formData.address}, ${formData.city}%0A%0A` +
      `*Order Summary:*%0A${orderItems}%0A%0A` +
      `*Total Amount:* $${total.toFixed(2)}%0A%0A` +
      `Please confirm my order and provide payment instructions.`;

    const whatsappNumber = "1234567890"; // Replace with your actual business number
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, "_blank");
    
    // Optional: Clear cart after redirect
    // clearCart();
  };

  if (cart.length === 0) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center">
        <h2 className="font-serif text-2xl">Your bag is empty.</h2>
        <Link href="/shop" className="mt-4 underline">Return to Shop</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-20 transition-colors duration-300 dark:bg-[#013220]">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
          
          {/* Left: Shipping Details */}
          <div className="lg:col-span-7">
            <Link href="/shop" className="mb-8 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest opacity-50 hover:opacity-100">
              <ArrowLeft size={14} /> Back to Shop
            </Link>
            <h1 className="font-serif text-3xl font-bold text-black dark:text-[#FFD700]">Delivery Information</h1>
            
            <div className="mt-10 space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <input 
                  type="text" name="name" placeholder="Full Name" 
                  onChange={handleInputChange}
                  className="w-full border-b border-zinc-200 bg-transparent py-4 outline-none focus:border-black dark:border-[#FFD700]/20 dark:focus:border-[#FFD700]" 
                />
                <input 
                  type="email" name="email" placeholder="Email Address" 
                  onChange={handleInputChange}
                  className="w-full border-b border-zinc-200 bg-transparent py-4 outline-none focus:border-black dark:border-[#FFD700]/20 dark:focus:border-[#FFD700]" 
                />
              </div>
              <input 
                type="text" name="phone" placeholder="Phone Number (with country code)" 
                onChange={handleInputChange}
                className="w-full border-b border-zinc-200 bg-transparent py-4 outline-none focus:border-black dark:border-[#FFD700]/20 dark:focus:border-[#FFD700]" 
              />
              <textarea 
                name="address" placeholder="Shipping Address" rows={3}
                onChange={handleInputChange}
                className="w-full border-b border-zinc-200 bg-transparent py-4 outline-none focus:border-black dark:border-[#FFD700]/20 dark:focus:border-[#FFD700]" 
              />
              <input 
                type="text" name="city" placeholder="City / Country" 
                onChange={handleInputChange}
                className="w-full border-b border-zinc-200 bg-transparent py-4 outline-none focus:border-black dark:border-[#FFD700]/20 dark:focus:border-[#FFD700]" 
              />
            </div>

            <div className="mt-12 flex items-center gap-4 rounded-sm bg-zinc-50 p-6 dark:bg-[#012818]">
              <ShieldCheck className="text-gray-400" />
              <p className="text-xs text-gray-500 dark:text-[#FFD700]/60">
                Your order is processed manually. After clicking the button, a WhatsApp chat will open with your order details for final confirmation and payment.
              </p>
            </div>
          </div>

          {/* Right: Order Summary Sidebar */}
          <div className="lg:col-span-5">
            <div className="sticky top-32 rounded-sm border border-zinc-100 p-8 dark:border-[#FFD700]/10">
              <h2 className="mb-8 font-serif text-xl font-bold">Order Summary</h2>
              <div className="space-y-6">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between gap-4">
                    <div className="flex gap-4">
                      <div className="relative h-20 w-16 flex-shrink-0 bg-zinc-100 dark:bg-[#013220]">
                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                      </div>
                      <div>
                        <p className="text-sm font-bold">{item.name}</p>
                        <p className="text-xs text-gray-500 uppercase tracking-tighter">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <p className="text-sm font-medium">${(item.price * (item.quantity || 1)).toFixed(2)}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 space-y-4 border-t border-zinc-100 pt-8 dark:border-[#FFD700]/10">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? "Complimentary" : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between border-t border-zinc-100 pt-4 font-serif text-lg font-bold dark:border-[#FFD700]/10">
                  <span>Total</span>
                  <span className="text-[#013220] dark:text-[#FFD700]">${total.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={handleWhatsAppOrder}
                className="mt-10 flex w-full items-center justify-center gap-3 bg-black py-5 font-sans text-[10px] font-bold uppercase tracking-[0.3em] text-white transition-all hover:bg-[#25D366] active:scale-95 dark:bg-[#FFD700] dark:text-[#013220] dark:hover:bg-white"
              >
                <MessageCircle size={18} />
                Order via WhatsApp
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}