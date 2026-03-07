// src/sections/Hero.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative w-full bg-white md:min-h-[75vh] md:border-b md:border-black/5">

      {/* ========================================= */}
      {/* 1. MOBILE-ONLY DESIGN (Seamless & Native) */}
      {/* ========================================= */}
      <div className="flex min-h-[100dvh] w-full flex-col bg-white md:hidden">
        
        {/* FIX 1: Natural Aspect Ratio & Mix-Blend */}
        {/* 'aspect-[4/3]' ensures the container wraps the image perfectly without leaving dead space. */}
        {/* 'mix-blend-multiply' makes the gray background of your image vanish perfectly into the white. */}
        <div className="relative w-full aspect-[4/3] sm:aspect-[3/2] bg-white">
          <Image
            src="/hero.png"
            alt="SAAF Couture"
            fill
            priority
            className="object-cover object-top mix-blend-multiply"
          />
        </div>
{/* Bottom Half: Centered, Minimalist Text */}
        <div className="flex flex-1 flex-col justify-center px-6 pb-12 text-center z-10 -mt-8 sm:px-10">
          
          <div className="flex flex-col items-center">
            <span className="mb-4 block font-sans text-[9px] font-bold uppercase tracking-[0.5em] text-black/40">
              Signature Collection
            </span>
            
            <h1 className="font-sans text-[13vw] font-light leading-[1.05] tracking-[0.1em] text-black">
              SAAF <br /> COUTURE
            </h1>
            
            <p className="mt-5 font-sans text-[11px] font-medium leading-relaxed tracking-widest text-black/50 max-w-[280px]">
              Perfectly tailored Qamees & premium luxury fragrances.
            </p>
          </div>

          {/* Ultra-Premium Boutique Button (Minimalist, lightweight, high-fashion) */}
          <Link
            href="/shop"
            className="group relative mt-10 flex w-full items-center justify-center border border-black/30 bg-transparent py-4 transition-colors hover:border-black active:bg-black active:text-white"
          >
            <span className="font-sans text-[10px] font-bold uppercase tracking-[0.3em] text-black group-active:text-white">
              Shop The Collection
            </span>
            {/* Absolute positioning pushes the arrow elegantly to the right edge */}
            <ArrowRight size={14} strokeWidth={1.5} className="absolute right-6 text-black transition-transform group-active:translate-x-1 group-active:text-white" />
          </Link>

        </div>
      </div>

      {/* ========================================= */}
      {/* 2. DESKTOP-ONLY DESIGN (Refined & Scaled) */}
      {/* ========================================= */}
      <div className="mx-auto hidden h-full min-h-[85vh] w-full max-w-[1600px] flex-row items-center bg-white md:flex">
        
        {/* Left Text */}
        <div className="relative z-20 flex w-1/2 flex-col justify-center px-12 py-12 lg:pl-20 xl:pl-32">
          
          {/* Editorial Accent Line & Subtitle */}
          <div className="mb-8 flex items-center gap-4">
            <div className="h-[1px] w-4 bg-black" />
            <span className="font-sans text-[9px] font-bold uppercase tracking-[0.4em] text-black/40">
              Signature Collection
            </span>
          </div>
          
          <h1 className="flex flex-col font-sans uppercase text-black">
            {/* Elegant tracking and light weight for that magazine feel */}
            <span className="text-6xl font-light leading-[1.05] tracking-[0.15em] lg:text-[80px]">SAAF</span>
            <span className="text-6xl font-light leading-[1.05] tracking-[0.15em] lg:text-[80px]">COUTURE</span>
          </h1>
          
          <p className="mt-8 max-w-sm font-sans text-xs font-medium leading-relaxed tracking-wide text-black/50 lg:text-sm">
            Discover our signature collection of perfectly tailored Qamees and premium luxury fragrances. Designed for everyday elegance.
          </p>
          
          {/* Boutique Underline Link */}
          <Link
            href="/shop"
            className="group mt-12 flex w-fit items-center gap-4 border-b border-black/20 pb-2 font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-black transition-all hover:border-black"
          >
            Explore Collection
            <ArrowRight size={14} strokeWidth={1.5} className="text-black/40 transition-transform duration-300 group-hover:translate-x-2 group-hover:text-black" />
          </Link>
          
        </div>

        {/* Right Image - No gap, perfectly hugging the edges */}
        <div className="relative z-10 flex h-[75vh] w-1/2 items-center justify-center">
          <div className="relative h-full w-full">
            <Image
              src="/hero.png"
              alt="SAAF Couture"
              fill
              priority
              // mix-blend-multiply ensures it blends beautifully into the white desktop background too
              className="object-cover object-center mix-blend-multiply"
            />
          </div>
        </div>

      </div>

    </section>
  );
}