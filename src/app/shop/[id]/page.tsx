// src/app/shop/[id]/page.tsx
"use client";

import { useState, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Heart, ShieldCheck, Truck, RefreshCcw, ChevronRight } from "lucide-react";
import { products } from "@/lib/data";
import { useCartStore } from "@/store/useCartStore";
import { useWishlistStore } from "@/store/useWishlistStore";

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const product = products.find((p) => p.id === resolvedParams.id);

  const addToCart = useCartStore((state) => state.addToCart);
  const { toggleWishlist, isInWishlist } = useWishlistStore();
  
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [error, setError] = useState(false);
  const [activeTab, setActiveTab] = useState("description");

  if (!product) return notFound();

  const isQamees = product.category === "qamees";
  const sizes = ["S", "M", "L", "XL", "XXL"];
  const isFavorite = isInWishlist(product.id);

  const handleAddToCart = () => {
    if (isQamees && !selectedSize) {
      setError(true);
      return;
    }
    setError(false);
    
    const cartItemId = selectedSize ? `${product.id}-${selectedSize}` : product.id;
    const cartItemName = selectedSize ? `${product.name} (Size: ${selectedSize})` : product.name;

    addToCart({
      ...product,
      id: cartItemId,
      name: cartItemName,
      quantity: quantity,
    });
  };

  return (
    <div className="min-h-screen bg-white transition-colors duration-300 dark:bg-[#013220]">
      <div className="mx-auto max-w-7xl px-6 py-12 md:px-12 lg:py-20">
        
        {/* Breadcrumb Navigation */}
        <nav className="mb-10 flex items-center gap-2 font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 dark:text-[#FFD700]/40">
          <Link href="/" className="hover:text-black dark:hover:text-[#FFD700]">Home</Link>
          <ChevronRight size={12} />
          <Link href="/shop" className="hover:text-black dark:hover:text-[#FFD700]">Shop</Link>
          <ChevronRight size={12} />
          <span className="text-black dark:text-[#FFD700]">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
          
          {/* Left: Product Media */}
          <div className="lg:col-span-7">
            <div className="group relative aspect-[3/4] overflow-hidden rounded-sm bg-zinc-100 dark:bg-[#012818]">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
                priority
                sizes="(max-width: 1024px) 100vw, 60vw"
              />
              <button 
                onClick={() => toggleWishlist(product)}
                className="absolute right-6 top-6 rounded-full bg-white/90 p-3 shadow-xl backdrop-blur-md transition-all hover:scale-110 active:scale-90 dark:bg-black/50"
              >
                <Heart 
                  size={20} 
                  strokeWidth={1.5}
                  className={isFavorite ? "fill-red-500 text-red-500" : "text-black dark:text-[#FFD700]"} 
                />
              </button>
            </div>
          </div>

          {/* Right: Product Interaction */}
          <div className="flex flex-col lg:col-span-5">
            <div className="sticky top-32">
              <span className="font-sans text-[10px] font-bold uppercase tracking-[0.4em] text-gray-400">
                {product.category}
              </span>
              <h1 className="mt-4 font-serif text-4xl font-bold text-black dark:text-[#FFD700] md:text-5xl">
                {product.name}
              </h1>
              <p className="mt-6 font-sans text-2xl font-light tracking-tight text-gray-900 dark:text-[#FFD700]">
                ${product.price.toFixed(2)}
              </p>

              <div className="mt-8 h-px w-full bg-zinc-100 dark:bg-[#FFD700]/10" />

              {/* Size Selection */}
              {isQamees && (
                <div className="mt-10">
                  <div className="flex items-center justify-between">
                    <h3 className="text-[10px] font-bold uppercase tracking-widest text-black dark:text-[#FFD700]">Select Size</h3>
                    <button className="font-sans text-[10px] text-gray-400 underline dark:text-[#FFD700]/50">View Size Guide</button>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => { setSelectedSize(size); setError(false); }}
                        className={`h-12 w-14 border text-xs font-bold transition-all ${
                          selectedSize === size
                            ? "border-black bg-black text-white dark:border-[#FFD700] dark:bg-[#FFD700] dark:text-[#013220]"
                            : "border-zinc-200 hover:border-black dark:border-[#FFD700]/20 dark:hover:border-[#FFD700]"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                  {error && <p className="mt-2 font-sans text-[10px] font-bold text-red-500">Please select a size to continue.</p>}
                </div>
              )}

              {/* Action Area */}
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <div className="flex h-14 items-center justify-between border border-zinc-200 bg-white px-4 dark:border-[#FFD700]/20 dark:bg-transparent sm:w-32">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-2 opacity-50 hover:opacity-100">−</button>
                  <span className="font-sans font-bold text-sm">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="p-2 opacity-50 hover:opacity-100">+</button>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-black py-5 font-sans text-[10px] font-bold uppercase tracking-[0.3em] text-white transition-all hover:opacity-80 active:scale-[0.98] dark:bg-[#FFD700] dark:text-[#013220]"
                >
                  Add To Bag
                </button>
              </div>

              {/* Info Tabs */}
              <div className="mt-16">
                <div className="flex gap-8 border-b border-zinc-100 dark:border-[#FFD700]/10">
                  {["description", "details", "shipping"].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`pb-4 text-[10px] font-bold uppercase tracking-widest transition-all ${
                        activeTab === tab 
                          ? "border-b-2 border-black text-black dark:border-[#FFD700] dark:text-[#FFD700]" 
                          : "text-gray-400"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
                <div className="py-8 font-sans text-sm leading-relaxed text-gray-600 dark:text-[#FFD700]/70">
                  {activeTab === "description" && <p>{product.description}</p>}
                  {activeTab === "details" && (
                    <ul className="list-inside list-disc space-y-2">
                      <li>Ethically sourced premium materials</li>
                      <li>Double-stitched seams for durability</li>
                      <li>Signature SAAF Couture engraved details</li>
                    </ul>
                  )}
                  {activeTab === "shipping" && (
                    <p>Standard delivery takes 3-5 business days. Express shipping options available at checkout.</p>
                  )}
                </div>
              </div>

              {/* Trust Section */}
              <div className="mt-8 grid grid-cols-1 gap-6 border-t border-zinc-100 pt-10 dark:border-[#FFD700]/10">
                <div className="flex items-center gap-4 opacity-70">
                  <Truck size={18} strokeWidth={1} />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Global Express Delivery</span>
                </div>
                <div className="flex items-center gap-4 opacity-70">
                  <RefreshCcw size={18} strokeWidth={1} />
                  <span className="text-[10px] font-bold uppercase tracking-widest">14-Day Boutique Exchange</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}