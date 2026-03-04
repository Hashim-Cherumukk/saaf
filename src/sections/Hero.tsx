// src/sections/Hero.tsx
"use client";

import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative w-full bg-white overflow-hidden border-b border-black/5">
      
      {/* 1. BACKGROUND TEXT (Fixed to layout) */}
      <div className="absolute top-[10%] left-[-2%] z-0 select-none pointer-events-none">
        <h2 className="font-sans text-[22vw] font-black leading-none tracking-tighter text-[#f7f7f7] uppercase">
          Saaf
        </h2>
      </div>

      {/* The items-stretch flexbox guarantees the text column grows to match the image height */}
      <div className="relative mx-auto flex w-full max-w-[1800px] flex-row items-stretch">
        
        {/* 2. LEFT CONTENT (Forced Left Side) */}
        <div className="relative z-20 flex w-[45%] lg:w-[40%] flex-col justify-center pl-6 pr-2 py-8 lg:pl-16 lg:py-16">
          <div className="space-y-1 lg:space-y-2">
            <p className="font-sans text-[8px] lg:text-[10px] font-bold uppercase tracking-[0.4em] lg:tracking-[0.6em] text-black">
              Drop 01 / 2026
            </p>
            <h1 className="font-sans text-[6.5vw] lg:text-7xl xl:text-8xl font-black uppercase tracking-tighter text-black leading-[0.9]">
              Unbound <br />
              <span className="text-transparent [webkit-text-stroke:1px_black]">Forms</span>
            </h1>
          </div>

          <div className="mt-4 lg:mt-10 max-w-[180px] lg:max-w-xs space-y-4 lg:space-y-8">
            <p className="font-sans text-[9px] sm:text-[10px] lg:text-sm font-medium leading-relaxed text-black/60">
              The intersection of traditional silhouette and brutalist architecture. 
              Designed for the modern nomad.
            </p>
            
            <div className="flex flex-col gap-4">
              <Link
                href="/shop"
                className="w-fit border-b border-black pb-0.5 lg:border-b-2 lg:py-1 font-sans text-[9px] lg:text-sm font-black uppercase tracking-widest text-black transition-transform hover:translate-x-2"
              >
                Shop Collection —
              </Link>
            </div>
          </div>
        </div>

        {/* 3. RIGHT IMAGE (Proportional Aspect Ratio Box) */}
        <div className="relative z-10 flex w-[55%] lg:w-[60%] items-center justify-end pr-4 py-6 lg:pr-12 lg:py-12">
          
          {/* THIS is the magic. The aspect ratio forces the height naturally based on the screen width.
            No more vh calculations. The image will never break or crop awkwardly.
          */}
          <div className="relative w-full aspect-[3/4] sm:aspect-square lg:aspect-[16/9] bg-gray-50 overflow-hidden">
            <Image
              src="/hero.png"
              alt="SAAF Couture Main"
              fill
              priority
              className="object-cover object-center"
            />
            
            {/* Minimalist Overlay Label */}
            <div className="absolute bottom-4 left-4 lg:bottom-10 lg:left-10 overflow-hidden">
               <div className="bg-white/95 px-3 py-1.5 lg:px-4 lg:py-2 text-[7px] lg:text-[10px] font-bold uppercase tracking-[0.3em] text-black">
                 Articulated Seams
               </div>
            </div>
          </div>
        </div>

      </div>

      {/* 4. VERTICAL NAVIGATION/STATS */}
      <div className="absolute right-4 lg:right-6 top-1/2 hidden -translate-y-1/2 flex-col items-center gap-8 lg:gap-12 md:flex">
        <div className="h-16 lg:h-24 w-[1px] bg-black/10" />
        <p className="rotate-90 font-sans text-[8px] lg:text-[9px] font-black uppercase tracking-[0.5em] text-black/30 whitespace-nowrap">
          SC — GLOBAL ATELIER
        </p>
        <div className="h-16 lg:h-24 w-[1px] bg-black/10" />
      </div>

    </section>
  );
}