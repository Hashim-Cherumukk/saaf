// src/sections/InstagramGallery.tsx
import Image from "next/image";

const galleryImages = [
  { id: 1, src: "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=600&auto=format&fit=crop", alt: "Saaf Couture Perfume Collection" },
  { id: 2, src: "https://images.unsplash.com/photo-1584273143981-41c073dfe8f8?q=80&w=600&auto=format&fit=crop", alt: "Premium Qamees Fabric Detail" },
  { id: 3, src: "https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=600&auto=format&fit=crop", alt: "Saaf Couture Lifestyle" },
  { id: 4, src: "https://images.unsplash.com/photo-1589465885857-44edb59bbff2?q=80&w=600&auto=format&fit=crop", alt: "Classic White Qamees" },
  { id: 5, src: "https://images.unsplash.com/photo-1615486171448-4fdcfbc1c26f?q=80&w=600&auto=format&fit=crop", alt: "Oud Fragrance Notes" },
];

export default function InstagramGallery() {
  return (
    <section className="bg-zinc-50 py-24 transition-colors duration-300 dark:bg-[#012818]">
      <div className="mx-auto flex max-w-7xl flex-col items-center px-6 md:px-12 text-center mb-12">
        <h2 className="font-serif text-3xl font-bold tracking-tight text-black dark:text-[#FFD700] md:text-4xl">
          Join The Lifestyle
        </h2>
        <a 
          href="https://instagram.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="mt-4 font-sans text-sm font-medium text-gray-600 hover:text-black hover:underline dark:text-[#FFD700]/70 dark:hover:text-[#FFD700]"
        >
          @SaafCouture
        </a>
      </div>

      {/* Edge-to-edge grid on mobile, standard grid on desktop */}
      <div className="grid grid-cols-2 md:grid-cols-5 w-full">
        {galleryImages.map((image, index) => (
          <div 
            key={image.id} 
            className={`group relative aspect-square w-full overflow-hidden bg-gray-200 dark:bg-gray-800 ${
              index === 4 ? "hidden md:block" : "" // Hide 5th image on mobile to keep an even grid
            }`}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              sizes="(max-width: 768px) 50vw, 20vw"
            />
            
            {/* Hover Overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <svg 
                className="h-8 w-8 text-white" 
                fill="currentColor" 
                viewBox="0 0 24 24"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
              </svg>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}