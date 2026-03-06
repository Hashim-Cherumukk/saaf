// src/app/about/page.tsx
import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="min-h-screen w-full bg-white pb-20 pt-6 md:pt-12">
      <div className="mx-auto max-w-[1200px] px-6 md:px-12">
        
        {/* 1. COMPACT, ELEGANT HEADER */}
        <div className="mb-10 flex flex-col items-center text-center md:mb-16">
          <h1 className="font-sans text-3xl font-bold uppercase tracking-widest text-black md:text-4xl">
            About The Atelier
          </h1>
          <p className="mt-4 max-w-xl font-sans text-sm font-medium text-black/50">
            A return to the essence of true elegance.
          </p>
        </div>

        {/* 2. HERO IMAGE (Using your specific story.png, properly scaled) */}
        <div className="mx-auto mb-16 w-full max-w-4xl">
          <div className="relative aspect-[3/2] w-full overflow-hidden bg-gray-50">
            <Image
              src="/story.png"
              alt="Saaf Couture Story"
              fill
              priority
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 900px"
            />
          </div>
        </div>

        {/* 3. CONTENT (Tightened spacing, highly readable text) */}
        <div className="mx-auto flex max-w-2xl flex-col gap-12">
          
          {/* Philosophy Section */}
          <div className="flex flex-col gap-4">
            <h2 className="font-sans text-sm font-bold uppercase tracking-widest text-black">
              The Philosophy
            </h2>
            <div className="flex flex-col gap-4 font-sans text-sm leading-relaxed text-black/70 md:text-base">
              <p>
                "Saaf" translates to pure. We established Saaf Couture to strip away the excess of modern fast fashion and return to the essence of true elegance. 
              </p>
              <p>
                We believe that luxury is not defined by loud logos or fleeting trends, but by the weight of the fabric, the precision of the cut, and the longevity of the silhouette. Every piece we create is designed to be a permanent fixture in your wardrobe.
              </p>
            </div>
          </div>

          {/* Craft Section */}
          <div className="flex flex-col gap-4">
            <h2 className="font-sans text-sm font-bold uppercase tracking-widest text-black">
              The Craft
            </h2>
            <div className="flex flex-col gap-4 font-sans text-sm leading-relaxed text-black/70 md:text-base">
              <p>
                Whether we are selecting raw textiles for our Qamees collections or sourcing high-grade, undiluted oils for our fragrances, we never compromise on our materials. 
              </p>
              <p>
                Our tailoring respects traditional Eastern silhouettes while modernizing them for global, everyday wear. The result is an uncompromising standard of comfort, durability, and quiet confidence.
              </p>
            </div>
          </div>

        </div>

        {/* 4. BOTTOM CTA */}
        <div className="mt-20 flex justify-center border-t border-black/10 pt-12 md:mt-24">
          <Link
            href="/shop"
            className="border border-black px-10 py-4 font-sans text-[11px] font-bold uppercase tracking-widest text-black transition-colors hover:bg-black hover:text-white"
          >
            Explore The Collection
          </Link>
        </div>

      </div>
    </main>
  );
}