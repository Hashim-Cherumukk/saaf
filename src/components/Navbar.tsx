// src/components/Navbar.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, Heart, ShoppingBag, Menu, ChevronDown } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { useWishlistStore } from "@/store/useWishlistStore";
import CartSidebar from "./CartSidebar";
import WishlistSidebar from "./WishlistSidebar";
import SearchOverlay from "./SearchOverlay";
import MobileMenu from "./MobileMenu";
import MegaMenu from "./MegaMenu";

export default function Navbar() {
  const [mounted, setMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const cart = useCartStore((state) => state.cart);
  const wishlist = useWishlistStore((state) => state.wishlist);
  const totalItems = cart.reduce((acc, item) => acc + (item.quantity || 1), 0);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`sticky top-0 z-40 w-full transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${isScrolled
            ? "bg-white/90 py-3 backdrop-blur-md border-b border-black/5 shadow-sm"
            : "bg-white py-5 border-b border-transparent"
          }`}
      >
        <div className="relative mx-auto flex max-w-7xl items-center justify-between px-6 md:px-12">

          {/* Mobile Left: Menu Toggle */}
          <div className="flex flex-1 items-center justify-start md:hidden">
            <button onClick={() => setIsMobileMenuOpen(true)} className="p-2 -ml-2 text-black transition-transform active:scale-90">
              <Menu size={24} strokeWidth={1.5} />
            </button>
          </div>

          {/* Desktop Left: Logo */}
          <div className="hidden flex-1 items-center justify-start md:flex">
            <Link href="/" className="transition-transform duration-300 hover:scale-[1.02]">
              {mounted && (
                <Image
                  src="/logo.jpg"
                  alt="Saaf Couture"
                  width={280} height={160}
                  className={`w-auto object-contain transition-all duration-500 ${isScrolled ? "h-[45px]" : "h-[60px]"}`}
                  priority
                />
              )}
            </Link>
          </div>

          {/* Center: Mobile Logo & Desktop Links */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center">

            {/* Mobile Logo */}
            <Link href="/" className="md:hidden">
              {mounted && (
                <Image
                  src="/logo.jpg"
                  alt="Saaf Couture"
                  width={150} height={80}
                  className="h-10 w-auto object-contain"
                  priority
                />
              )}
            </Link>

            {/* Desktop Links with Animated Underlines & Mega Menu */}
            <div className="hidden md:flex gap-12">
              <div className="group relative flex items-center">
                <Link href="/shop" className="group/link relative flex items-center gap-1.5 py-6 font-sans text-[12px] font-semibold uppercase tracking-[0.15em] text-black transition-opacity hover:opacity-80">
                  Shop
                  <ChevronDown size={14} className="transition-transform duration-300 group-hover:rotate-180" />
                  {/* Hover Line */}
                  <span className="absolute bottom-4 left-0 h-[1px] w-full origin-right scale-x-0 bg-black transition-transform duration-300 group-hover/link:origin-left group-hover/link:scale-x-100" />
                </Link>
                <MegaMenu />
              </div>

              <Link href="/about" className="group/link relative flex items-center py-6 font-sans text-[12px] font-semibold uppercase tracking-[0.15em] text-black transition-opacity hover:opacity-80">
                About
                {/* Hover Line */}
                <span className="absolute bottom-4 left-0 h-[1px] w-full origin-right scale-x-0 bg-black transition-transform duration-300 group-hover/link:origin-left group-hover/link:scale-x-100" />
              </Link>

              <Link href="/contact" className="group/link relative flex items-center py-6 font-sans text-[12px] font-semibold uppercase tracking-[0.15em] text-black transition-opacity hover:opacity-80">
                Contact
                {/* Hover Line */}
                <span className="absolute bottom-4 left-0 h-[1px] w-full origin-right scale-x-0 bg-black transition-transform duration-300 group-hover/link:origin-left group-hover/link:scale-x-100" />
              </Link>
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex flex-1 items-center justify-end gap-4 md:gap-6">

            {/* Mobile: Search icon moved next to Cart */}
            <button onClick={() => setIsSearchOpen(true)} className="md:hidden p-2 text-black transition-transform active:scale-90">
              <Search size={22} strokeWidth={1.5} />
            </button>

            {/* Desktop: Icons */}
            <button onClick={() => setIsSearchOpen(true)} className="hidden text-black transition-transform hover:scale-110 md:block">
              <Search size={20} strokeWidth={1.5} />
            </button>

            <button onClick={() => setIsWishlistOpen(true)} className="relative hidden text-black transition-transform hover:scale-110 md:block">
              <Heart size={20} strokeWidth={1.5} />
              {mounted && wishlist.length > 0 && (
                <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-red-500" />
              )}
            </button>

            {/* Cart Button */}
            <button onClick={() => setIsCartOpen(true)} className="flex items-center gap-2 rounded-full bg-black px-4 py-2.5 text-white transition-transform active:scale-95 hover:bg-black/90 md:px-5 hover:scale-[1.02]">
              <ShoppingBag size={16} strokeWidth={2} />
              <span className="font-sans text-[12px] font-semibold tracking-wide">
                {mounted ? totalItems : 0}
              </span>
            </button>
          </div>

        </div>
      </nav>

      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <WishlistSidebar isOpen={isWishlistOpen} onClose={() => setIsWishlistOpen(false)} />
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}