// src/sections/BrandStory.tsx
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function BrandStory() {
  return (
    <section className="w-full bg-white py-16 md:py-24 border-b border-black/5">
      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        
        {/*
          Side-by-side flex layout for desktop.
          Vertical stack for mobile.
        */}
        <div className="flex flex-col md:flex-row md:items-center md:gap-20">
          
          {/* 1. IMAGE COLUMN
              Shows first on mobile.
              
              FIX: Changed 'aspect-[4/5]' to 'aspect-[3/2]' (derived from 1536:1024).
              By matching the container ratio to the image ratio,
              the image fills the space completely with NO CROPPING.
          */}
          <div className="relative aspect-[3/2] w-full bg-gray-50 md:w-[50%] shrink-0">
            <Image
              src="/story.png" // User-provided landscape image (1536x1024)
              alt="Saaf Couture Story"
              fill
              className="object-cover object-center"
              // Optimized sizes for landscape layout
              sizes="(max-width: 768px) 100vw, 50vw"
              priority // Since this is near top-of-fold and uses a large specific image
            />
          </div>

          {/* 2. TEXT COLUMN (Balanced on desktop) */}
          <div className="mt-10 md:mt-0 flex flex-col items-start md:w-[50%]">
            <h2 className="font-serif text-3xl font-bold tracking-tight text-black md:text-4xl lg:text-5xl">
              Our Story
            </h2>
            
            {/* Simple language, easy to read */}
            <div className="mt-6 md:mt-8 flex flex-col gap-5">
              <p className="font-sans text-base leading-relaxed text-black/70">
                "Saaf" translates to pure. We started Saaf Couture with a very simple idea: true elegance comes from keeping things pure and simple. 
              </p>
              <p className="font-sans text-base leading-relaxed text-black/70">
                Whether it is the high-quality fabrics we use for our clothing or the rich oils in our perfumes, we focus on the details. We create pieces that are comfortable, timeless, and made to last.
              </p>
            </div>
            
            <Link 
              href="/about" 
              className="mt-10 md:mt-12 flex items-center gap-2 border-b border-black pb-1 font-sans text-xs font-semibold uppercase tracking-widest text-black transition-transform hover:translate-x-2"
            >
              READ MORE
              <ArrowRight size={16} />
            </Link>
          </div>

        </div>

      </div>
    </section>
  );
}