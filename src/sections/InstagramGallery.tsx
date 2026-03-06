// src/sections/InstagramGallery.tsx
import Image from "next/image";
import Link from "next/link";

// Using fresh, reliable Unsplash IDs that won't 404
const lifestyleImages = [
  { id: 1, src: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=600&auto=format&fit=crop", alt: "Saaf Couture Editorial" },
  { id: 2, src: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=600&auto=format&fit=crop", alt: "Saaf Couture Lifestyle" },
  { id: 3, src: "https://images.unsplash.com/photo-1485230405346-71acb9518d9c?q=80&w=600&auto=format&fit=crop", alt: "Saaf Couture Detail" },
  { id: 4, src: "https://images.unsplash.com/photo-1550614000-4b95f1711200?q=80&w=600&auto=format&fit=crop", alt: "Saaf Couture Archive" },
  { id: 5, src: "https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?q=80&w=600&auto=format&fit=crop", alt: "Saaf Couture Campaign" },
];

export default function InstagramGallery() {
  return (
    <section className="w-full bg-white py-16 md:py-24 border-b border-black/5">
      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        
        {/* 1. HEADER */}
        <div className="mb-10 flex flex-col items-center text-center md:mb-12">
          <h2 className="font-sans text-2xl font-bold uppercase tracking-widest text-black md:text-3xl">
            The Lifestyle
          </h2>
          <p className="mt-3 font-sans text-xs font-medium text-black/50 md:text-sm">
            Curated moments from the Saaf Couture community.
          </p>
        </div>

        {/* 2. TEASER GRID (Mobile: 2 cols, Desktop: 5 cols) */}
        <div className="grid grid-cols-2 gap-3 md:grid-cols-5 md:gap-4">
          {lifestyleImages.map((image, index) => (
            <div 
              key={image.id} 
              className={`group relative aspect-[4/5] w-full overflow-hidden bg-gray-50 
                ${index === 4 ? "hidden md:block" : ""}
              }`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 768px) 50vw, 20vw"
                className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          ))}
        </div>

        {/* 3. BOTTOM BUTTON FUNNELING TO FULL PAGE */}
        <div className="mt-12 flex justify-center md:mt-16">
          <Link
            href="/community"
            className="flex items-center justify-center border border-black px-10 py-4 font-sans text-xs font-semibold uppercase tracking-widest text-black transition-colors hover:bg-black hover:text-white"
          >
            Explore Full Archive
          </Link>
        </div>

      </div>
    </section>
  );
}