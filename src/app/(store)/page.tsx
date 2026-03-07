// src/app/page.tsx
import Hero from "@/sections/Hero";
import Featured from "@/sections/Featured";
import BestSellers from "@/sections/BestSellers";
import Reviews from "@/sections/Reviews";
import InstagramGallery from "@/sections/InstagramGallery";
import BrandStory from "@/sections/BrandStory";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-black">
      <Hero />
      <Featured />
      <BestSellers />
      <Reviews />
      <InstagramGallery />
      <BrandStory />
    </main>
  );
}