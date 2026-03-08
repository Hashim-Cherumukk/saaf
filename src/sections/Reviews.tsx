"use client";

import { useRef, useEffect, useState } from "react";
import { Star, ArrowLeft, ArrowRight } from "lucide-react";
import { getPublishedReviews } from "@/app/actions";

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1 shrink-0">
      {[...Array(rating)].map((_, i) => (
        <Star key={i} size={14} className="fill-black text-black" />
      ))}
      {[...Array(5 - rating)].map((_, i) => (
        <Star key={i + rating} size={14} className="text-black/10" />
      ))}
    </div>
  );
}

export default function Reviews() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPublishedReviews().then((data) => {
      setReviews(data);
      setLoading(false);
    });
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = window.innerWidth < 768 ? 300 : 450;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  if (!loading && reviews.length === 0) return null;

  return (
    /* FIX: Reduced py-20 md:py-32 to py-12 md:py-16 to kill the massive empty space */
    <section className="w-full overflow-hidden bg-[#fafafa] py-12 md:py-16 border-y border-black/5">
      <div className="mx-auto max-w-[1800px]">
        
        {/* HEADER */}
        {/* FIX: Reduced mb-16 to mb-10 to pull the cards closer to the title */}
        <div className="mb-8 flex items-end justify-between px-6 md:mb-10 md:px-12">
          <div>
            <h2 className="font-sans text-3xl font-bold tracking-tight text-black md:text-5xl">
              Client Feedback
            </h2>
            <p className="mt-3 font-sans text-xs font-medium text-black/50 md:text-sm">
              Verified experiences from the Saaf Couture community.
            </p>
          </div>

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

        {/* CAROUSEL */}
        <div 
          ref={scrollRef}
          /* FIX: Reduced pb-12 to pb-8 (just enough so the drop shadows don't get cut off) */
          className="flex w-full snap-x snap-mandatory scroll-smooth overflow-x-auto px-6 pb-8 md:px-12 [&::-webkit-scrollbar]:hidden"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {loading ? (
             <div className="w-full flex justify-center py-6">
               <div className="animate-pulse flex gap-6">
                 <div className="w-[85vw] md:w-[400px] h-[340px] bg-black/5 rounded-md"></div>
                 <div className="w-[85vw] md:w-[400px] h-[340px] bg-black/5 rounded-md"></div>
               </div>
             </div>
          ) : (
            <div className="flex gap-4 md:gap-6">
              {reviews.map((review) => (
                <div 
                  key={review.id} 
                  className="group relative flex w-[85vw] sm:w-[350px] md:w-[400px] shrink-0 snap-center flex-col justify-between bg-white p-8 md:p-10 border border-black/5 shadow-[0_8px_30px_rgba(0,0,0,0.04)] h-[340px]"
                >
                  <span className="absolute right-8 top-8 font-serif text-7xl leading-none text-black/[0.03] group-hover:text-black/[0.05] transition-colors pointer-events-none">
                    "
                  </span>

                  <div className="flex flex-col gap-6 h-full overflow-hidden">
                    <StarRating rating={review.rating} />

                    <div className="overflow-y-auto [&::-webkit-scrollbar]:hidden flex-grow pr-2">
                      <p className="font-sans text-sm font-medium leading-relaxed text-black/80 md:text-base md:leading-loose whitespace-pre-wrap break-words relative z-10">
                        "{review.comment}"
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-6 pt-5 border-t border-black/5 shrink-0">
                    <p className="font-sans text-xs font-bold uppercase tracking-widest text-black">
                      {review.name}
                    </p>
                    {review.productName && (
                      <p className="mt-1 font-sans text-[10px] font-bold uppercase tracking-[0.1em] text-black/40">
                        {review.productName}
                      </p>
                    )}
                  </div>
                </div>
              ))}
              <div className="min-w-[4vw] shrink-0 md:min-w-[2vw]"></div>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}