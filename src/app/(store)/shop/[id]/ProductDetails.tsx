"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, Truck, RefreshCcw, ChevronRight, MessageCircle, X } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { useWishlistStore } from "@/store/useWishlistStore";
import type { Product } from "@prisma/client";
import { useState, useEffect } from "react";

export default function ProductDetails({ product }: { product: Product }) {
  const addToCart = useCartStore((state) => state.addToCart);
  const { toggleWishlist, isInWishlist } = useWishlistStore();
  
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [error, setError] = useState(false);
  const [activeTab, setActiveTab] = useState("description");

  const productImages = [product.image, ...(product.gallery || [])];
  
  // Desktop Active Image
  const [activeImage, setActiveImage] = useState(productImages[0]);

  // Mobile Swipe Tracking (for the dots)
  const [activeIndex, setActiveIndex] = useState(0);

  // Desktop Zoom Tracking
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Full Screen / Native App State
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [touchStartY, setTouchStartY] = useState(0);

  useEffect(() => {
    if (isFullScreen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [isFullScreen]);


  const hasSizes = product.sizes && product.sizes.length > 0;
  const isFavorite = isInWishlist(product.id);

  const handleAddToCart = () => {
    if (hasSizes && !selectedSize) {
      setError(true);
      return;
    }
    setError(false);
    
    const cartItemId = selectedSize ? `${product.id}-${selectedSize}` : product.id;
    const cartItemName = selectedSize ? `${product.name} (Size: ${selectedSize})` : product.name;

    // @ts-ignore
    addToCart({
      ...product,
      id: cartItemId,
      name: cartItemName,
      quantity: quantity,
    });
  };

  const handleBuyNow = () => {
    if (hasSizes && !selectedSize) {
      setError(true);
      return;
    }
    setError(false);

    const itemName = selectedSize ? `${product.name} (Size: ${selectedSize})` : product.name;
    const totalPrice = product.price * quantity;

    const message = `*INSTANT ORDER | SAAF COUTURE*%0A%0AI would like to purchase:%0A1x *${itemName}*%0AQuantity: ${quantity}%0ATotal: ₹${totalPrice.toFixed(2)}%0A%0APlease let me know the next steps for payment and delivery.`;
    
    window.open(`https://wa.me/9778461263?text=${message}`, "_blank");
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setMousePosition({ x, y });
  };

  // Tracks which image is currently in view during a swipe
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    if (!e.currentTarget) return;
    const scrollPosition = e.currentTarget.scrollLeft;
    const width = e.currentTarget.clientWidth;
    const currentIndex = Math.round(scrollPosition / width);
    setActiveIndex(currentIndex);
  };

  // Native swipe-down-to-close logic
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartY(e.touches[0].clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const touchCurrentY = e.touches[0].clientY;
    // If they swipe down more than 100px, close the full screen
    if (touchCurrentY - touchStartY > 100) {
      setIsFullScreen(false);
    }
  };

  return (
    <>
      <main className="min-h-screen w-full bg-white pb-32 pt-6 md:pt-8">
        <div className="mx-auto max-w-[1200px] px-6 md:px-12">
          
          <nav className="mb-6 hidden items-center gap-2 font-sans text-[10px] font-bold uppercase tracking-widest text-black/40 md:flex">
            <Link href="/" className="transition-colors hover:text-black">Home</Link>
            <ChevronRight size={12} />
            <Link href="/shop" className="transition-colors hover:text-black">Shop</Link>
            <ChevronRight size={12} />
            <span className="text-black line-clamp-1">{product.name}</span>
          </nav>

          <div className="flex flex-col gap-4 md:flex-row md:items-start md:gap-12 lg:gap-16">
            
            {/* LEFT: Image Gallery */}
            <div className="flex w-full md:w-[45%] md:max-w-[400px] lg:max-w-[450px] md:flex-row gap-4">
              
              {/* Desktop Vertical Thumbnails */}
              {productImages.length > 1 && (
                <div className="hidden w-14 shrink-0 flex-col gap-3 md:flex lg:w-16">
                  {productImages.map((img, index) => (
                    <button 
                      key={index}
                      onClick={() => setActiveImage(img)}
                      className={`relative aspect-[3/4] w-full bg-gray-50 transition-all ${
                        activeImage === img ? "ring-1 ring-black ring-offset-1" : "opacity-50 hover:opacity-100"
                      }`}
                    >
                      <Image src={img} alt={`Thumbnail ${index + 1}`} fill className="object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* DESKTOP MAIN IMAGE (Hover Zoom) */}
              <div className="hidden md:flex w-full flex-col gap-4">
                <div 
                  className="relative aspect-[3/4] w-full bg-gray-50 overflow-hidden cursor-crosshair"
                  onMouseMove={handleMouseMove}
                  onMouseEnter={() => setIsZoomed(true)}
                  onMouseLeave={() => setIsZoomed(false)}
                  onClick={() => setIsFullScreen(true)}
                >
                  <Image
                    src={activeImage}
                    alt={product.name}
                    fill
                    priority
                    sizes="50vw"
                    className={`object-cover transition-transform duration-200 ease-out ${
                      isZoomed ? "scale-[2.5]" : "scale-100"
                    }`}
                    style={{
                      transformOrigin: isZoomed ? `${mousePosition.x}% ${mousePosition.y}%` : "center center",
                    }}
                  />
                  <button 
                    onClick={(e) => { e.stopPropagation(); toggleWishlist(product as any); }}
                    className={`absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm transition-all active:scale-90 hover:scale-105 ${isZoomed ? "opacity-0" : "opacity-100"}`}
                  >
                    <Heart size={18} strokeWidth={1.5} className={isFavorite ? "fill-red-500 text-red-500" : "text-black"} />
                  </button>
                  {product.compareAtPrice && (
                    <div className={`absolute left-4 top-4 z-10 bg-amber-600 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 shadow-sm transition-opacity ${isZoomed ? "opacity-0" : "opacity-100"}`}>
                      Sale
                    </div>
                  )}
                </div>
              </div>

 {/* MOBILE MAIN IMAGE (Smooth Swipe + Dots) */}
              <div className="flex md:hidden w-full flex-col gap-3">
                
                {/* Added a relative wrapper to hold the floating buttons */}
                <div className="relative w-full aspect-[3/4]">
                  
                  {/* The Sale Badge (Fixed in top left) */}
                  {product.compareAtPrice && (
                    <div className="absolute left-4 top-4 z-10 bg-amber-600 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 shadow-sm pointer-events-none">
                      Sale
                    </div>
                  )}

                  {/* The Wishlist Button (Fixed in top right) */}
                  <button 
                    onClick={(e) => { e.stopPropagation(); toggleWishlist(product as any); }}
                    className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow-sm transition-all active:scale-90"
                  >
                    <Heart size={18} strokeWidth={1.5} className={isFavorite ? "fill-red-500 text-red-500" : "text-black"} />
                  </button>

                  {/* The Swiper */}
                  <div 
                    className="flex w-full h-full overflow-x-auto snap-x snap-mandatory [&::-webkit-scrollbar]:hidden" 
                    style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                    onScroll={handleScroll}
                  >
                    {productImages.map((img, idx) => (
                      <div 
                        key={idx} 
                        className="relative h-full w-full shrink-0 snap-center bg-gray-50 cursor-pointer"
                        onClick={() => setIsFullScreen(true)}
                      >
                        <Image src={img} alt={`${product.name} ${idx + 1}`} fill className="object-cover" priority={idx === 0} sizes="100vw" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Dynamic Mobile Dots */}
                {productImages.length > 1 && (
                  <div className="flex justify-center gap-1.5">
                    {productImages.map((_, idx) => (
                      <div 
                        key={idx} 
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          activeIndex === idx ? "w-5 bg-black" : "w-1.5 bg-black/20"
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>

            </div>

            {/* RIGHT: Product Info */}
            <div className="w-full md:w-[55%] md:max-w-md pt-4 md:pt-0">
              <div className="flex flex-col">

                <h1 className="mt-2 font-sans text-2xl font-bold uppercase tracking-tight text-black md:text-3xl lg:text-4xl">
                  {product.name}
                </h1>
                
                {product.compareAtPrice ? (
                  <div className="flex items-end gap-3 mt-4">
                    <p className="font-sans text-xl font-medium text-amber-700">
                      ₹{product.price.toFixed(2)}
                    </p>
                    <p className="font-sans text-sm font-medium text-black/40 line-through mb-1">
                      ₹{product.compareAtPrice.toFixed(2)}
                    </p>
                  </div>
                ) : (
                  <p className="mt-4 font-sans text-xl font-medium text-black/70">
                    ₹{product.price.toFixed(2)}
                  </p>
                )}
              </div>

              <div className="mt-8 h-px w-full bg-black/5" />

              {hasSizes && (
                <div className="mt-8 flex flex-col gap-4">
                  <div className="flex items-end justify-between">
                    <h3 className="font-sans text-[10px] font-bold uppercase tracking-widest text-black">
                      Select Size
                    </h3>
                    <button className="border-b border-black/20 pb-0.5 font-sans text-[10px] font-bold uppercase tracking-widest text-black/50 transition-colors hover:border-black hover:text-black">
                      Size Guide
                    </button>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => { setSelectedSize(size); setError(false); }}
                        className={`flex h-12 w-12 items-center justify-center border font-sans text-xs font-bold transition-colors ${
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

              {/* Actions: Dynamic based on Stock Status */}
              {product.inStock ? (
                <div className="mt-8 flex flex-col gap-4">
                  <div className="flex gap-4">
                    <div className="flex h-14 w-28 items-center justify-between border border-black/10 px-4 shrink-0">
                      <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-2 text-black/50 transition-colors hover:text-black">−</button>
                      <span className="font-sans text-sm font-bold text-black">{quantity}</span>
                      <button onClick={() => setQuantity(quantity + 1)} className="p-2 text-black/50 transition-colors hover:text-black">+</button>
                    </div>

                    <button
                      onClick={handleAddToCart}
                      className="flex-1 bg-black font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-white transition-opacity hover:bg-black/80 active:scale-[0.98]"
                    >
                      Add To Bag
                    </button>
                  </div>

                  <button
                    onClick={handleBuyNow}
                    className="w-full flex items-center justify-center gap-2 bg-[#25D366] h-14 font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-white transition-opacity hover:bg-[#25D366]/90 active:scale-[0.98]"
                  >
                    <MessageCircle size={16} /> Buy Now
                  </button>
                </div>
              ) : (
                <div className="mt-8">
                  <div className="bg-zinc-100 p-4 mb-4 border border-zinc-200 text-center">
                    <p className="font-sans text-xs font-bold uppercase tracking-widest text-black/60">Currently Out of Stock</p>
                  </div>
                  <button
                    onClick={() => {
                      const message = `Hello, I saw that *${product.name}* is currently out of stock. Could you let me know when it will be available again?`;
                      window.open(`https://wa.me/9778461263?text=${message}`, "_blank");
                    }}
                    className="w-full flex items-center justify-center gap-2 border border-black h-14 font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-black transition-colors hover:bg-black hover:text-white active:scale-[0.98]"
                  >
                    <MessageCircle size={16} /> Inquire About Restock
                  </button>
                </div>
              )}

              <div className="mt-12 flex flex-col">
                <div className="flex gap-6 border-b border-black/10 md:gap-8 overflow-x-auto [&::-webkit-scrollbar]:hidden">
                  {["description", "details", "shipping"].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`pb-4 font-sans text-[10px] font-bold uppercase tracking-widest transition-colors whitespace-nowrap ${
                        activeTab === tab 
                          ? "border-b-2 border-black text-black" 
                          : "text-black/40 hover:text-black/70"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
                
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

      {/* NEW: THE NATIVE APP FULL-SCREEN VIEWER */}
      {isFullScreen && (
        <div 
          className="fixed inset-0 z-[200] bg-white flex flex-col animate-in slide-in-from-bottom-2 duration-200"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
        >
          {/* Header */}
          <div className="flex justify-between items-center p-4 z-10 text-black w-full absolute top-0 bg-gradient-to-b from-white to-transparent">
            <span className="font-sans text-[10px] font-bold uppercase tracking-widest line-clamp-1 pr-4">
              {product.name}
            </span>
            <button 
              onClick={() => setIsFullScreen(false)} 
              className="p-2 text-black/60 hover:text-black transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          {/* Swipeable Gallery */}
          <div 
            className="flex-1 w-full overflow-x-auto snap-x snap-mandatory flex [&::-webkit-scrollbar]:hidden" 
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            onScroll={handleScroll}
          >
            {productImages.map((img, idx) => (
              <div key={idx} className="relative w-full h-full shrink-0 snap-center flex items-center justify-center bg-gray-50/50">
                <Image 
                  src={img} 
                  alt={`${product.name} full view`} 
                  fill 
                  className="object-contain p-0 md:p-8" 
                  sizes="100vw"
                  priority
                />
              </div>
            ))}
          </div>
          
          {/* Dynamic Dots at the bottom */}
          {productImages.length > 1 && (
            <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2 pointer-events-none">
              {productImages.map((_, idx) => (
                <div 
                  key={idx} 
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    activeIndex === idx ? "w-5 bg-black" : "w-1.5 bg-black/20"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}