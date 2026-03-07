// src/app/(store)/layout.tsx
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";

export default function StoreLayout({ children }: { children: React.ReactNode }) {
  return (
    <SmoothScroll>
      <Navbar />
      <div className="flex-grow">{children}</div>
      <Footer />
    </SmoothScroll>
  );
}