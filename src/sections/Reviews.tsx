// src/sections/Reviews.tsx
"use client";

import { useRef } from "react";
import { Star, ArrowLeft, ArrowRight } from "lucide-react";

// You can add as many reviews as you want here! The layout will never break.
const reviews = [
  {
    id: 1,
    name: "Ahmed K.",
    product: "Midnight Oud Perfume",
    text: "The projection and longevity are unmatched. I get compliments every time I wear this. True premium quality.",
  },
  {
    id: 2,
    name: "Omar S.",
    product: "Royal Black Qamees",
    text: "The fabric feels incredible against the skin, and the tailoring is perfect right out of the box. Highly recommended.",
  },
  {
    id: 3,
    name: "Tariq M.",
    product: "Classic White Qamees",
    text: "Fast shipping, beautiful packaging, and the qamees itself is flawless. Saaf Couture is my new standard.",
  },
  {
    id: 4,
    name: "Zaid R.",
    product: "Signature Oud Blend",
    text: "I've never worn a fragrance that gets this many questions. The presentation alone is worth the price.",
  },
  {
    id: 5,
    name: "Faisal H.",
    product: "Onyx Tailored Thobe",
    text: "The drape of the material is exceptional. You can immediately feel the difference in craftsmanship.",
  },
];

function StarRating() {
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <Star key={i} size={14} className="fill-black text-black" />
      ))}
    </div>
  );
}

export default function Reviews() {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Simple scroll function for desktop arrows
  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = window.innerWidth < 768 ? 300 : 450;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="w-full overflow-hidden bg-[#fafafa] py-20 md:py-32 border-y border-black/5">
      <div className="mx-auto max-w-[1800px]">
        
        {/* 1. HEADER & DESKTOP CONTROLS */}
        <div className="mb-10 flex items-end justify-between px-6 md:mb-16 md:px-12">
          <div>
            <h2 className="font-sans text-3xl font-bold tracking-tight text-black md:text-5xl">
              Client Feedback
            </h2>
            <p className="mt-3 font-sans text-xs font-medium text-black/50 md:text-sm">
              Verified experiences from the Saaf Couture community.
            </p>
          </div>

          {/* Desktop Arrow Buttons (Hidden on mobile) */}
          <div className="hidden gap-3 md:flex">
            <button 
              onClick={() => scroll("left")}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-black/10 bg-white transition-all hover:border-black hover:bg-black hover:text-white active:scale-90"
            >
              <ArrowLeft size={18} />
            </button>
            <button 
              onClick={() => scroll("right")}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-black/10 bg-white transition-all hover:border-black hover:bg-black hover:text-white active:scale-90"
            >
              <ArrowRight size={18} />
            </button>
          </div>
        </div>

        {/* 2. THE SWIPEABLE REVIEW TRACK */}
        <div 
          ref={scrollRef}
          className="flex w-full snap-x snap-mandatory scroll-smooth overflow-x-auto px-6 pb-8 md:px-12 [&::-webkit-scrollbar]:hidden"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <div className="flex gap-4 md:gap-6">
            {reviews.map((review) => (
              <div 
                key={review.id} 
                /* MOBILE: 85vw width so the next card peeks in. 
                   DESKTOP: Fixed 400px width for a sleek, uniform look. */
                className="flex min-w-[85vw] snap-center flex-col justify-between bg-white p-8 border border-black/5 shadow-sm sm:min-w-[350px] md:min-w-[400px] md:p-10"
              >
                <div>
                  <StarRating />
                  <p className="mt-6 font-sans text-sm font-medium leading-relaxed text-black/80 md:text-base md:leading-loose">
                    "{review.text}"
                  </p>
                </div>
                
                <div className="mt-10 flex items-center justify-between border-t border-black/5 pt-6">
                  <div>
                    <p className="font-sans text-xs font-bold uppercase tracking-widest text-black">
                      {review.name}
                    </p>
                    <p className="mt-1 font-sans text-[10px] font-bold uppercase tracking-[0.1em] text-black/40">
                      {review.product}
                    </p>
                  </div>
                  {/* Minimalist Quote Icon purely for visual styling */}
                  <span className="font-serif text-5xl leading-none text-black/5">"</span>
                </div>
              </div>
            ))}
            
            {/* Invisible spacer so the last card can scroll fully into view */}
            <div className="min-w-[4vw] shrink-0 md:min-w-[2vw]"></div>
          </div>
        </div>

      </div>
    </section>
  );
}