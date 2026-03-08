"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { getMenuFeaturedProducts } from "@/app/actions";
import type { Product } from "@prisma/client";

const demoCategories = {
  qamees: [
    { name: "Classic Tailoring", href: "/shop?category=qamees" },
    { name: "Everyday Essentials", href: "/shop?category=qamees" },
    { name: "Luxury Silk Blend", href: "/shop?category=qamees" },
  ],
  perfumes: [
    { name: "Oud Signatures", href: "/shop?category=perfumes" },
    { name: "Floral & Fresh", href: "/shop?category=perfumes" },
    { name: "Gift Sets", href: "/shop?category=perfumes" },
  ]
};

export default function MegaMenu() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [campaigns, setCampaigns] = useState<Product[]>([]);

  // 1. Fetch the real database items when the menu loads
  useEffect(() => {
    getMenuFeaturedProducts().then((data) => {
      if (data && data.length > 0) {
        setCampaigns(data);
      }
    });
  }, []);

  // 2. Only run the slider timer if we actually have products to slide!
  useEffect(() => {
    if (campaigns.length <= 1) return;
    const timer = setInterval(() => {
      setActiveIndex((current) => (current + 1) % campaigns.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [campaigns.length]);

  return (
    <div className="absolute left-1/2 top-full -translate-x-1/2 pt-8 opacity-0 translate-y-4 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto z-50">
      <div className="w-[950px] bg-white p-10 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.15)] border border-black/5">
        <div className="flex gap-12">
          
          <div className="flex w-1/4 flex-col gap-6">
            <h4 className="font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-black/40">Discover</h4>
            <div className="flex flex-col gap-5">
              <Link href="/shop" className="group/link flex items-center font-sans text-xl font-semibold tracking-tight text-black transition-colors hover:text-black/60">
                Shop All <ArrowRight size={16} className="ml-2 opacity-0 transition-all group-hover/link:translate-x-1 group-hover/link:opacity-100" />
              </Link>
              <Link href="/shop?filter=new" className="group/link flex items-center font-sans text-xl font-semibold tracking-tight text-black transition-colors hover:text-black/60">
                New Arrivals <ArrowRight size={16} className="ml-2 opacity-0 transition-all group-hover/link:translate-x-1 group-hover/link:opacity-100" />
              </Link>
              <Link href="/shop?filter=bestsellers" className="group/link flex items-center font-sans text-xl font-semibold tracking-tight text-black transition-colors hover:text-black/60">
                Best Sellers <ArrowRight size={16} className="ml-2 opacity-0 transition-all group-hover/link:translate-x-1 group-hover/link:opacity-100" />
              </Link>
            </div>
          </div>

          <div className="flex w-1/4 flex-col gap-10 border-l border-black/5 pl-12">
            <div className="flex flex-col gap-5">
              <h4 className="font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-black/40">Qamees</h4>
              <div className="flex flex-col gap-3">
                {demoCategories.qamees.map((item) => (
                  <Link key={item.name} href={item.href} className="font-sans text-sm font-medium text-black/70 transition-all hover:translate-x-1 hover:text-black">
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-5">
              <h4 className="font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-black/40">Perfumes</h4>
              <div className="flex flex-col gap-3">
                {demoCategories.perfumes.map((item) => (
                  <Link key={item.name} href={item.href} className="font-sans text-sm font-medium text-black/70 transition-all hover:translate-x-1 hover:text-black">
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="w-2/4 pl-6 relative overflow-hidden bg-gray-50 min-h-[300px]">
            {campaigns.length > 0 ? (
              <>
                {campaigns.map((product, index) => (
                  <Link 
                    key={product.id} 
                    href={`/shop/${product.id}`} 
                    className={`group absolute inset-0 block h-full w-full transition-opacity duration-1000 ease-in-out ${
                      activeIndex === index ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                    }`}
                  >
                    <Image 
                      src={product.image} 
                      alt={product.name} 
                      fill 
                      className={`object-cover transition-transform duration-[10s] ease-linear ${
                        activeIndex === index ? "scale-110" : "scale-100"
                      }`} 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80" />
                    <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between text-white">
                      <div>
                        <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-white/70">
                          {product.category}
                        </span>
                        <h3 className="mt-1 font-sans text-2xl font-bold tracking-tight line-clamp-1">
                          {product.name}
                        </h3>
                      </div>
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-black transition-transform group-hover:scale-110 shrink-0 ml-4">
                        <ArrowRight size={18} strokeWidth={2} />
                      </div>
                    </div>
                  </Link>
                ))}
                
                {/* Dynamic Pagination Dots */}
                {campaigns.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 gap-2">
                    {campaigns.map((_, index) => (
                      <div key={index} className={`h-1 rounded-full transition-all duration-500 ${activeIndex === index ? "w-6 bg-white" : "w-2 bg-white/40"}`} />
                    ))}
                  </div>
                )}
              </>
            ) : (
               <div className="flex h-full w-full items-center justify-center border border-dashed border-black/10">
                 <p className="font-sans text-xs font-bold uppercase tracking-widest text-black/40">New Collections Coming Soon</p>
               </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}