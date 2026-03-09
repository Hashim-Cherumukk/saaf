import Image from "next/image";
import Link from "next/link";
import prisma from "@/lib/prisma";
import { Instagram } from "lucide-react";

export default async function InstagramGallery() {
  // Fetch the 10 newest gallery posts directly from Neon
  const posts = await (prisma as any).instaPost.findMany({
    orderBy: { createdAt: 'desc' },
    take: 10 // <-- Increased to 10!
  });

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

        {/* 2. DYNAMIC 10-GRID */}
        {posts.length === 0 ? (
          <div className="flex h-48 w-full items-center justify-center border border-dashed border-black/10 bg-gray-50">
            <p className="font-sans text-xs font-bold uppercase tracking-widest text-black/40">
              Gallery Coming Soon
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 md:grid-cols-5 md:gap-4">
            {posts.map((post: any) => {
              const gridClasses = "group relative aspect-[4/5] w-full overflow-hidden bg-gray-50";

              const ImageContent = (
                <>
                  <Image
                    src={post.imageUrl}
                    alt="Saaf Couture Lifestyle"
                    fill
                    sizes="(max-width: 768px) 50vw, 20vw"
                    className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Subtle overlay effect on hover */}
                  <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/20" />

                  {/* NEW: On-hover Instagram Icon for realism */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    <Instagram size={32} className="text-white drop-shadow-md" strokeWidth={1.5} />
                  </div>
                </>
              );

              return post.link ? (
                <Link key={post.id} href={post.link} target="_blank" className={gridClasses}>
                  {ImageContent}
                </Link>
              ) : (
                <div key={post.id} className={gridClasses}>
                  {ImageContent}
                </div>
              );
            })}
          </div>
        )}

        {/* 3. AUTHENTIC INSTAGRAM BUTTON */}
        <div className="mt-12 flex justify-center md:mt-16">
          <Link
            href="https://instagram.com/your-profile" // Update this with your real Instagram URL!
            target="_blank"
            className="group flex items-center justify-center gap-3 border border-black px-10 py-4 font-sans text-xs font-semibold uppercase tracking-widest text-black transition-all hover:bg-black hover:text-white"
          >
            <Instagram size={18} className="transition-transform group-hover:scale-110" />
            Follow on Instagram
          </Link>
        </div>

      </div>
    </section>
  );
}