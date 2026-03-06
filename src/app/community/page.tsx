// src/app/community/page.tsx
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

// Mocking a large database of gallery images for the full page
const fullGallery = [
  { id: 1, src: "https://images.unsplash.com/photo-1610461888750-10bef9747315?q=80&w=800" },
  { id: 2, src: "https://images.unsplash.com/photo-1611080631627-848206149177?q=80&w=800" },
  { id: 3, src: "https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=800" },
  { id: 4, src: "https://images.unsplash.com/photo-1627384113743-6bd5a479fffd?q=80&w=800" },
  { id: 5, src: "https://images.unsplash.com/photo-1594913366159-1832ff18a282?q=80&w=800" },
  { id: 6, src: "https://images.unsplash.com/photo-1584273143981-41c073dfe8f8?q=80&w=800" },
  { id: 7, src: "https://images.unsplash.com/photo-1589465885857-44edb59bbff2?q=80&w=800" },
  { id: 8, src: "https://images.unsplash.com/photo-1615486171448-4fdcfbc1c26f?q=80&w=800" },
  { id: 9, src: "https://images.unsplash.com/photo-1572495532056-8583af1cbfce?q=80&w=800" },
  { id: 10, src: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800" },
  { id: 11, src: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=800" },
  { id: 12, src: "https://images.unsplash.com/photo-1485230405346-71acb9518d9c?q=80&w=800" },
];

export default function CommunityPage() {
  return (
    <main className="min-h-screen bg-white pt-6 pb-32 md:pt-12">
      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        
        {/* PAGE HEADER */}
        <div className="mb-12 flex flex-col items-center text-center md:mb-20">
          <Link 
            href="/" 
            className="mb-8 flex items-center gap-2 font-sans text-[10px] font-bold uppercase tracking-widest text-black/50 transition-colors hover:text-black"
          >
            <ArrowLeft size={14} /> Back to Home
          </Link>
          
          <h1 className="font-sans text-4xl font-black uppercase tracking-tighter text-black md:text-6xl lg:text-7xl">
            Community <br />
            <span className="text-transparent [webkit-text-stroke:1px_black]">Archive.</span>
          </h1>
          <p className="mt-6 max-w-lg font-sans text-sm font-medium leading-relaxed text-black/60">
            A visual diary of Saaf Couture across the globe. Tag @SaafCouture to be featured in the permanent archive.
          </p>
        </div>

        {/* MASSIVE RESPONSIVE GRID 
            Mobile: 2 Columns
            Tablet: 3 Columns
            Desktop: 4 Columns
        */}
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
          {fullGallery.map((image) => (
            <div key={image.id} className="group relative aspect-[4/5] w-full overflow-hidden bg-gray-50">
              <Image
                src={image.src}
                alt="Saaf Couture Community"
                fill
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover object-center transition-transform duration-[2s] group-hover:scale-105"
              />
            </div>
          ))}
        </div>

        {/* LOAD MORE BUTTON */}
        <div className="mt-16 flex justify-center md:mt-24">
          <button className="border-b border-black pb-1 font-sans text-[11px] font-bold uppercase tracking-widest text-black transition-opacity hover:opacity-60">
            Load More Content
          </button>
        </div>

      </div>
    </main>
  );
}