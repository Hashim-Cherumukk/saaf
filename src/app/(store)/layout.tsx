// src/app/(store)/layout.tsx
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import AnnouncementBar from "@/components/AnnouncementBar";
import { Cormorant_Garamond } from "next/font/google";

export const heroFont = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400","600","700"],
});

export default function StoreLayout({ children }: { children: React.ReactNode }) {
  return (
    <SmoothScroll>
      <AnnouncementBar />
      <Navbar />
      <div className="flex-grow">{children}</div>
      <Footer />
    </SmoothScroll>
  );
}