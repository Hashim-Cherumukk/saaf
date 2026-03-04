// src/sections/BrandStory.tsx
import Image from "next/image";
import Link from "next/link";

export default function BrandStory() {
  return (
    <section className="bg-white py-24 transition-colors duration-300 dark:bg-[#013220]">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-16 px-6 md:flex-row md:px-12">
        
        <div className="md:w-1/2">
          <h2 className="mb-6 font-serif text-3xl font-bold tracking-tight text-black dark:text-[#FFD700] md:text-5xl">
            The Essence of Saaf
          </h2>
          <p className="mb-6 font-sans text-base leading-relaxed text-gray-600 dark:text-[#FFD700]/80">
            "Saaf" translates to pure. We founded Saaf Couture on the belief that true elegance lies in purity—the purity of high-grade perfume oils, the finest fabrics, and an uncompromising attention to detail.
          </p>
          <p className="mb-8 font-sans text-base leading-relaxed text-gray-600 dark:text-[#FFD700]/80">
            Every Qamees is tailored for the modern silhouette while respecting tradition. Every fragrance is crafted to leave a lasting, distinguished impression. This is more than clothing and scent; it is a standard.
          </p>
          <Link 
            href="/about" 
            className="inline-block border-b border-black pb-1 font-sans text-sm font-semibold uppercase tracking-wider text-black transition-opacity hover:opacity-70 dark:border-[#FFD700] dark:text-[#FFD700]"
          >
            Read Our Story
          </Link>
        </div>

        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-md bg-gray-100 dark:bg-[#012818] md:w-1/2 md:aspect-square">
          <Image
            src="https://images.unsplash.com/photo-1574634534894-89d7576c8259?q=80&w=800&auto=format&fit=crop"
            alt="Saaf Couture Craftsmanship"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

      </div>
    </section>
  );
}