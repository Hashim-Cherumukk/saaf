"use client";

// src/components/Footer.tsx
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-black pb-8 pt-16 text-white md:pt-24">
      <div className="mx-auto max-w-[1400px] px-6 md:px-12">

        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-8">

          {/* 1. BRAND & LOGO COLUMN */}
          <div className="md:col-span-4 lg:col-span-5">
            <Link href="/" className="inline-block">
              {/* Using the Logo image instead of text.
                The 'invert' class magically turns a black logo white for this dark footer!
              */}
              <Image
                src="/logo.jpg"
                alt="Saaf Couture"
                width={150}
                height={60}
                className="invert object-contain"
              />
            </Link>

            <p className="mt-6 max-w-sm font-sans text-xs leading-relaxed text-white/60 md:text-sm">
              Elegance in every detail. Premium Qamees and exclusive Perfumes designed for the modern standard.
            </p>

            {/* Added Direct Email Contact */}
            <div className="mt-6 flex flex-col gap-2 font-sans text-xs font-medium text-white/80">
              <a href="mailto:info@saafcouture.com" className="transition-colors hover:text-white">
                info@saafcouture.com
              </a>
            </div>

            <div className="mt-6 flex gap-6 font-sans text-[10px] font-bold uppercase tracking-widest text-white">
              <a href="https://instagram.com" className="transition-opacity hover:opacity-70" target="_blank" rel="noopener noreferrer">Instagram</a>
              <a href="https://wa.me/1234567890" className="transition-opacity hover:opacity-70" target="_blank" rel="noopener noreferrer">WhatsApp</a>
            </div>
          </div>

          {/* 2. SHOP LINKS */}
          <div className="md:col-span-3 lg:col-span-2">
            <h3 className="mb-6 font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">Shop</h3>
            <ul className="flex flex-col gap-4 font-sans text-xs font-medium text-white/70">
              <li><Link href="/shop" className="transition-colors hover:text-white">All Products</Link></li>
              <li><Link href="/shop?category=qamees" className="transition-colors hover:text-white">Qamees Collection</Link></li>
              <li><Link href="/shop?category=perfumes" className="transition-colors hover:text-white">Perfume Collection</Link></li>
            </ul>
          </div>

          {/* 3. SUPPORT LINKS */}
          <div className="md:col-span-2 lg:col-span-2">
            <h3 className="mb-6 font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">Support</h3>
            <ul className="flex flex-col gap-4 font-sans text-xs font-medium text-white/70">
              <li><Link href="/contact" className="transition-colors hover:text-white">Contact Us</Link></li>
              <li><Link href="/faq" className="transition-colors hover:text-white">FAQ & Shipping</Link></li>
              <li><Link href="/returns" className="transition-colors hover:text-white">Returns</Link></li>
            </ul>
          </div>

          {/* 4. NEWSLETTER */}
          <div className="md:col-span-3 lg:col-span-3">
            <h3 className="mb-6 font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">Newsletter</h3>
            <p className="mb-6 font-sans text-xs leading-relaxed text-white/70">
              Subscribe to receive updates, access to exclusive deals, and more.
            </p>
            <form 
              action={async (formData) => {
                const { subscribeToNewsletter } = await import("@/app/actions/newsletter");
                const result = await subscribeToNewsletter(formData);
                if (result.success) {
                  alert("Welcome to the inner circle. You're subscribed!");
                } else {
                  alert(result.error);
                }
              }}
              className="relative flex w-full items-center border-b border-white/30 pb-2 transition-colors focus-within:border-white"
            >
              <input
                type="email"
                name="email"
                placeholder="Enter your email address"
                className="w-full bg-transparent font-sans text-xs text-white placeholder-white/40 outline-none pr-16"
                required
              />
  
              {/* Refined 'Join' Button */}
              <button 
                type="submit" 
                className="absolute right-0 flex items-center gap-2 group"
              >
                <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-white/60 group-hover:text-white transition-colors">
                  Join
                </span>
                <ArrowRight size={14} className="text-white/60 group-hover:text-white group-hover:translate-x-1 transition-all" />
              </button>
            </form>
          </div>

        </div>

        {/* BOTTOM COPYRIGHT */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 font-sans text-[10px] font-medium uppercase tracking-widest text-white/40 md:mt-24 md:flex-row">
          <p>&copy; {new Date().getFullYear()} Saaf Couture. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="transition-colors hover:text-white">Privacy Policy</Link>
            <Link href="/terms" className="transition-colors hover:text-white">Terms of Service</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}