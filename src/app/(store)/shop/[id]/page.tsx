// src/app/shop/[id]/page.tsx
"use client";

import { useState, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Heart, Truck, RefreshCcw, ChevronRight } from "lucide-react";
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

  // Mocking an image gallery array. Update this when your data.ts supports multiple images!
  const productImages = [product?.image, product?.image, product?.image];
  const [activeImage, setActiveImage] = useState(product?.image);

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
    // FIX 1: Reduced pt-16 to pt-8 on desktop to fix the gap
    <main className="min-h-screen w-full bg-white pb-32 pt-6 md:pt-8">
      <div className="mx-auto max-w-[1200px] px-6 md:px-12">
        
        {/* BREADCRUMBS (Hidden on mobile) */}
        <nav className="mb-6 hidden items-center gap-2 font-sans text-[10px] font-bold uppercase tracking-widest text-black/40 md:flex">
          <Link href="/" className="transition-colors hover:text-black">Home</Link>
          <ChevronRight size={12} />
          <Link href="/shop" className="transition-colors hover:text-black">Shop</Link>
          <ChevronRight size={12} />
          <span className="text-black">{product.name}</span>
        </nav>

        {/* PRODUCT LAYOUT */}
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:gap-12 lg:gap-16">
          
          {/* LEFT: Image Gallery */}
          {/* FIX 2: Reduced max-width so the image isn't massive on desktop */}
          <div className="flex w-full md:w-[45%] md:max-w-[400px] lg:max-w-[450px] md:flex-row gap-4">
            
            {/* Desktop: Vertical Thumbnails */}
            <div className="hidden w-14 shrink-0 flex-col gap-3 md:flex lg:w-16">
              {productImages.map((img, index) => (
                <button 
                  key={index}
                  onClick={() => setActiveImage(img)}
                  className={`relative aspect-[3/4] w-full bg-gray-50 transition-all ${
                    activeImage === img ? "ring-1 ring-black ring-offset-1" : "opacity-50 hover:opacity-100"
                  }`}
                >
                  <Image src={img as string} alt={`Thumbnail ${index + 1}`} fill className="object-cover" />
                </button>
              ))}
            </div>

            {/* Main Image Container */}
            <div className="flex w-full flex-col gap-4">
              <div className="relative aspect-[3/4] w-full bg-gray-50">
                <Image
                  src={activeImage as string}
                  alt={product.name}
                  fill
                  className="object-cover object-center"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                {/* Wishlist Button over Image */}
                <button 
                  onClick={() => toggleWishlist(product)}
                  className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm transition-transform active:scale-90"
                >
                  <Heart 
                    size={18} 
                    strokeWidth={1.5}
                    className={isFavorite ? "fill-red-500 text-red-500" : "text-black"} 
                  />
                </button>
              </div>

              {/* Mobile: Native Dot Indicators */}
              {/* FIX 3: Replaced thumbnails with sleek dots on mobile */}
              <div className="flex justify-center gap-2 md:hidden">
                {productImages.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImage(img as string)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      activeImage === img ? "w-5 bg-black" : "w-1.5 bg-black/20"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: Product Info & Cart Actions */}
          <div className="w-full md:w-[55%] md:max-w-md">
            
            <div className="flex flex-col">
              <span className="font-sans text-[10px] font-bold uppercase tracking-[0.4em] text-black/40">
                {product.category}
              </span>
              <h1 className="mt-2 font-sans text-2xl font-bold uppercase tracking-tight text-black md:text-3xl lg:text-4xl">
                {product.name}
              </h1>
              <p className="mt-4 font-sans text-xl font-medium text-black/70">
                ${product.price.toFixed(2)}
              </p>
            </div>

            <div className="mt-8 h-px w-full bg-black/5" />

            {/* Size Selector */}
            {isQamees && (
              <div className="mt-8 flex flex-col gap-4">
                <div className="flex items-end justify-between">
                  <h3 className="font-sans text-[10px] font-bold uppercase tracking-widest text-black">
                    Select Size
                  </h3>
                  <button className="border-b border-black/20 pb-0.5 font-sans text-[10px] font-bold uppercase tracking-widest text-black/50 transition-colors hover:border-black hover:text-black">
                    Size Guide
                  </button>
                </div>
                
                <div className="grid grid-cols-5 gap-2">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => { setSelectedSize(size); setError(false); }}
                      className={`flex h-12 items-center justify-center border font-sans text-xs font-bold transition-colors ${
                        selectedSize === size
                          ? "border-black bg-black text-white"
                          : "border-black/10 bg-transparent text-black hover:border-black"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
                {error && (
                  <p className="font-sans text-[10px] font-bold uppercase tracking-widest text-red-500">
                    Please select a size to continue.
                  </p>
                )}
              </div>
            )}

            {/* Cart Actions */}
            <div className="mt-8 flex gap-4">
              <div className="flex h-14 w-28 items-center justify-between border border-black/10 px-4">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))} 
                  className="p-2 text-black/50 transition-colors hover:text-black"
                >
                  −
                </button>
                <span className="font-sans text-sm font-bold text-black">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)} 
                  className="p-2 text-black/50 transition-colors hover:text-black"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className="flex-1 bg-black font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-white transition-opacity hover:bg-black/80 active:scale-[0.98]"
              >
                Add To Bag
              </button>
            </div>

            {/* Product Tabs */}
            <div className="mt-12 flex flex-col">
              <div className="flex gap-6 border-b border-black/10 md:gap-8">
                {["description", "details", "shipping"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-4 font-sans text-[10px] font-bold uppercase tracking-widest transition-colors ${
                      activeTab === tab 
                        ? "border-b-2 border-black text-black" 
                        : "text-black/40 hover:text-black/70"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              
              {/* FIX 4: Locked minimum height (min-h-[160px]) to stop the footer from jumping */}
              <div className="min-h-[160px] py-6 font-sans text-sm leading-relaxed text-black/70">
                {activeTab === "description" && <p>{product.description}</p>}
                {activeTab === "details" && (
                  <ul className="flex flex-col gap-2">
                    <li>• Ethically sourced premium materials</li>
                    <li>• Double-stitched seams for durability</li>
                    <li>• Signature SAAF Couture engraved details</li>
                  </ul>
                )}
                {activeTab === "shipping" && (
                  <p>Standard delivery takes 3-5 business days. Express shipping options available at checkout.</p>
                )}
              </div>
            </div>

            {/* Trust Badges */}
            <div className="mt-2 flex flex-col gap-4 border-t border-black/10 pt-6">
              <div className="flex items-center gap-4 text-black/60">
                <Truck size={16} strokeWidth={1.5} />
                <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-black">
                  Global Express Delivery
                </span>
              </div>
              <div className="flex items-center gap-4 text-black/60">
                <RefreshCcw size={16} strokeWidth={1.5} />
                <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-black">
                  14-Day Boutique Exchange
                </span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </main>
  );
}