"use client";

import { useState, useEffect } from "react";
import { useCartStore } from "@/store/useCartStore";
import Image from "next/image";
import Link from "next/link";
import { MessageCircle, ArrowLeft, ShieldCheck, ShoppingBag } from "lucide-react";

export default function CheckoutPage() {
  const { cart } = useCartStore();
  
  // Hydration state check to prevent Next.js crashes
  const [isMounted, setIsMounted] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const subtotal = cart.reduce((acc, item) => acc + item.price * (item.quantity || 1), 0);
  // Updated free shipping threshold to ₹5000
  const shipping = subtotal > 5000 ? 0 : 250; 
  const total = subtotal + shipping;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleWhatsAppOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.address || !formData.phone || !formData.city) {
      alert("Please fill in all required delivery details.");
      return;
    }

    // Using standard \n because we use encodeURIComponent below!
    let message = `*NEW ORDER | SAAF COUTURE*\n\n`;
    
    message += `*Customer Details:*\n`;
    message += `Name: ${formData.name}\n`;
    message += `Email: ${formData.email || "Not provided"}\n`;
    message += `Phone: ${formData.phone}\n`;
    message += `Address: ${formData.address}, ${formData.city}\n\n`;
    
    message += `*Order Summary:*\n`;
    cart.forEach((item, index) => {
      message += `${index + 1}. *${item.name}*\n`;
      message += `   Qty: ${item.quantity} | ₹${(item.price * (item.quantity || 1)).toFixed(2)}\n`;
    });
    
    message += `\n*Subtotal:* ₹${subtotal.toFixed(2)}\n`;
    message += `*Shipping:* ${shipping === 0 ? "Complimentary" : `₹${shipping.toFixed(2)}`}\n`;
    message += `*Total Amount: ₹${total.toFixed(2)}*\n\n`;
    
    message += `Please confirm my order and provide payment instructions.`;

    const whatsappNumber = "9778461263"; 
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, "_blank");
  };

  if (!isMounted) return null;

  if (cart.length === 0) {
    return (
      <main className="flex min-h-[70vh] w-full flex-col items-center justify-center bg-white px-6">
        <ShoppingBag size={48} strokeWidth={1} className="mb-6 text-black/20" />
        <h2 className="font-sans text-lg font-bold uppercase tracking-widest text-black">Your bag is empty</h2>
        <p className="mt-2 font-sans text-sm font-medium text-black/50">Add items to your bag to proceed to checkout.</p>
        <Link 
          href="/shop" 
          className="mt-8 border-b border-black pb-1 font-sans text-[10px] font-bold uppercase tracking-widest text-black transition-opacity hover:opacity-60"
        >
          Return to Shop
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen w-full bg-white pb-32 pt-6 md:pt-12">
      <div className="mx-auto max-w-[1200px] px-6 md:px-12">
        
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-20">
          
          {/* LEFT: Shipping Details Form */}
          <div className="w-full lg:w-[55%]">
            <Link 
              href="/shop" 
              className="mb-8 hidden md:flex w-fit items-center gap-2 font-sans text-[10px] font-bold uppercase tracking-widest text-black/40 transition-colors hover:text-black"
            >
              <ArrowLeft size={14} /> Back to Shop
            </Link>
            
            <h1 className="font-sans text-2xl font-black uppercase tracking-tight text-black md:text-4xl">
              Secure Checkout
            </h1>
            <p className="mt-2 font-sans text-[10px] font-medium uppercase tracking-widest text-black/40">
              Delivery Information
            </p>
            
            <form id="checkout-form" onSubmit={handleWhatsAppOrder} className="mt-10 flex flex-col gap-8">
              
              <div className="flex flex-col gap-8 md:flex-row">
                <div className="flex w-full flex-col gap-2">
                  <label className="font-sans text-[10px] font-bold uppercase tracking-widest text-black">Full Name *</label>
                  <input 
                    type="text" name="name" required
                    onChange={handleInputChange}
                    className="border-b border-black/20 bg-transparent py-3 font-sans text-sm text-black outline-none transition-colors focus:border-black" 
                  />
                </div>
                <div className="flex w-full flex-col gap-2">
                  <label className="font-sans text-[10px] font-bold uppercase tracking-widest text-black">Email Address</label>
                  <input 
                    type="email" name="email"
                    onChange={handleInputChange}
                    className="border-b border-black/20 bg-transparent py-3 font-sans text-sm text-black outline-none transition-colors focus:border-black" 
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-sans text-[10px] font-bold uppercase tracking-widest text-black">Phone Number (with Country Code) *</label>
                <input 
                  type="tel" name="phone" required
                  onChange={handleInputChange}
                  className="border-b border-black/20 bg-transparent py-3 font-sans text-sm text-black outline-none transition-colors focus:border-black" 
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-sans text-[10px] font-bold uppercase tracking-widest text-black">Shipping Address *</label>
                <textarea 
                  name="address" rows={3} required
                  onChange={handleInputChange}
                  className="resize-none border-b border-black/20 bg-transparent py-3 font-sans text-sm text-black outline-none transition-colors focus:border-black" 
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-sans text-[10px] font-bold uppercase tracking-widest text-black">City / Country *</label>
                <input 
                  type="text" name="city" required
                  onChange={handleInputChange}
                  className="border-b border-black/20 bg-transparent py-3 font-sans text-sm text-black outline-none transition-colors focus:border-black" 
                />
              </div>

            </form>

            <div className="mt-10 flex items-start gap-4 border border-black/10 bg-gray-50 p-6">
              <ShieldCheck size={20} className="shrink-0 text-black/40" />
              <p className="font-sans text-xs font-medium leading-relaxed text-black/60">
                Your order is processed manually. After clicking the button, a WhatsApp chat will open with your order details for final confirmation and secure payment instructions.
              </p>
            </div>
          </div>

          {/* RIGHT: Order Summary Sidebar */}
          <div className="w-full lg:sticky lg:top-32 lg:w-[45%]">
            <div className="bg-gray-50 p-6 md:p-8">
              
              <h2 className="mb-8 font-sans text-sm font-bold uppercase tracking-widest text-black">
                Order Summary
              </h2>
              
              <div className="flex flex-col gap-6">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between gap-4">
                    <div className="flex gap-4">
                      <div className="relative aspect-[3/4] w-16 shrink-0 bg-white">
                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                      </div>
                      <div className="flex flex-col py-1">
                        <p className="font-sans text-xs font-bold uppercase text-black line-clamp-2">{item.name}</p>
                        <p className="mt-1 font-sans text-[10px] font-bold uppercase tracking-widest text-black/50">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <p className="py-1 font-sans text-xs font-medium text-black">
                      ₹{(item.price * (item.quantity || 1)).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-col gap-4 border-t border-black/10 pt-8">
                <div className="flex justify-between font-sans text-xs font-medium text-black/70">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-sans text-xs font-medium text-black/70">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? "Complimentary" : `₹${shipping.toFixed(2)}`}</span>
                </div>
                <div className="mt-2 flex justify-between border-t border-black/10 pt-4 font-sans text-sm font-bold uppercase tracking-widest text-black">
                  <span>Total</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>
              </div>

              <button
                type="submit"
                form="checkout-form"
                className="group mt-10 flex w-full items-center justify-center gap-3 bg-[#25D366] py-5 font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-white transition-all active:scale-[0.98] md:bg-black md:hover:bg-[#25D366]"
              >
                <MessageCircle size={16} className="transition-transform group-hover:scale-110" />
                Confirm Order on WhatsApp
              </button>

            </div>
          </div>

        </div>
      </div>
    </main>
  );
}