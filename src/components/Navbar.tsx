"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation"; // 1. IMPORT ROUTER
import { Search, Heart, ShoppingBag, Menu, ChevronDown, X } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { useWishlistStore } from "@/store/useWishlistStore";
import CartSidebar from "./CartSidebar";
import WishlistSidebar from "./WishlistSidebar";
import MobileMenu from "./MobileMenu";
import MegaMenu from "./MegaMenu";

export default function Navbar() {
  const router = useRouter(); // 2. INITIALIZE ROUTER
  const [mounted, setMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  const [desktopSearchOpen, setDesktopSearchOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  
  // 3. ADD SEARCH STATE
  const [searchQuery, setSearchQuery] = useState("");

  // Live Zustand Subscriptions
  const cart = useCartStore((state) => state.cart);
  const wishlist = useWishlistStore((state) => state.wishlist);
  const totalItems = cart.reduce((acc, item) => acc + (item.quantity || 1), 0);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 4. ADD SEARCH HANDLER FUNCTION
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop?search=${encodeURIComponent(searchQuery)}`);
      setDesktopSearchOpen(false);
      setMobileSearchOpen(false);
    }
  };

  return (
    <>
      <nav
        className={`sticky top-0 z-40 w-full transition-all duration-500 ${
          isScrolled
            ? "bg-white/90 py-3 backdrop-blur-md border-b border-black/5 shadow-sm"
            : "bg-white py-5 border-b border-black/5 shadow-[0_2px_8px_rgba(0,0,0,0.03)]"
        }`}
      >
        <div className="relative mx-auto flex max-w-7xl items-center justify-between px-6 md:px-12">

          {/* Mobile Left Menu */}
          <div className="flex flex-1 items-center justify-start md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2 -ml-2 active:scale-90"
            >
              <Menu size={22} strokeWidth={1.5} />
            </button>
          </div>

          {/* Desktop Logo */}  
          <div className="hidden flex-1 items-center justify-start md:flex">
            <Link
              href="/"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              <Image
                src="/logo.jpg"
                alt="Saaf Couture"
                width={280}
                height={160}
                className={`transition-all duration-500 ${
                  isScrolled ? "h-[45px]" : "h-[60px]"
                } w-auto object-contain`}
                priority
              />
            </Link>
          </div>

          {/* Center */}
          <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center">
          {/* Mobile Logo */}
          <Link
            href="/"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="md:hidden"
          >
            <Image
              src="/logo.jpg"
              alt="Saaf Couture"
              width={150}
              height={80}
              className="h-10 w-auto object-contain"
              priority
            />
          </Link>
            {/* Desktop Links */}
            <div className="hidden md:flex gap-12">
              <Link
                href="/"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="group/link relative flex items-center py-6 font-sans text-[12px] font-semibold uppercase tracking-[0.15em]"
              >
                Home
              </Link>

              <div className="group relative flex items-center">
                <Link
                  href="/shop"
                  className="group/link relative flex items-center gap-1.5 py-6 text-[12px] font-semibold uppercase tracking-[0.15em]"
                >
                  Shop
                  <ChevronDown
                    size={14}
                    className="transition-transform duration-300 group-hover:rotate-180"
                  />
                  <span className="absolute bottom-4 left-0 h-[1px] w-full origin-right scale-x-0 bg-black transition-transform duration-300 group-hover/link:origin-left group-hover/link:scale-x-100" />
                </Link>
                <MegaMenu />
              </div>

              <Link
                href="/about"
                className="group/link relative flex items-center py-6 text-[12px] font-semibold uppercase tracking-[0.15em]"
              >
                About
                <span className="absolute bottom-4 left-0 h-[1px] w-full origin-right scale-x-0 bg-black transition-transform duration-300 group-hover/link:origin-left group-hover/link:scale-x-100" />
              </Link>

              <Link
                href="/contact"
                className="group/link relative flex items-center py-6 text-[12px] font-semibold uppercase tracking-[0.15em]"
              >
                Contact
                <span className="absolute bottom-4 left-0 h-[1px] w-full origin-right scale-x-0 bg-black transition-transform duration-300 group-hover/link:origin-left group-hover/link:scale-x-100" />
              </Link>

            </div>
          </div>

          {/* Right Icons */}
          <div className="flex flex-1 items-center justify-end gap-3 md:gap-6">

            {/* Desktop Search */}
            <div className="relative hidden md:flex items-center">
              {/* 5. ADD FORM WRAPPER FOR DESKTOP */}
              <form onSubmit={handleSearchSubmit}>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className={`transition-all duration-300 ease-out ${
                    desktopSearchOpen ? "w-56 opacity-100 px-4 pr-10" : "w-0 opacity-0 px-0"
                  } h-9 rounded-full border border-black/10 outline-none text-sm bg-white`}
                />
              </form>

              {!desktopSearchOpen ? (
                <button
                  type="button"
                  onClick={() => setDesktopSearchOpen(true)}
                  className="ml-2 hover:scale-110 transition"
                >
                  <Search size={20} strokeWidth={1.5} />
                  </button>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setDesktopSearchOpen(false);
                    setSearchQuery("");
                  }}
                  className="absolute right-2 hover:scale-110 transition"
                >
                  <X size={16} strokeWidth={2} />
                 </button>
              )}

            </div>
            {/* Mobile Search */}
            <button
              onClick={() => setMobileSearchOpen(true)}
              className="md:hidden p-2 active:scale-90"
            >
              <Search size={20} strokeWidth={1.5} />
            </button>

            {/* Wishlist Desktop */}
            <button
              onClick={() => setIsWishlistOpen(true)}
              className="relative hidden md:block hover:scale-110 transition"
            >
              <Heart size={20} strokeWidth={1.5} />
              
              {/* LIVE WISHLIST INDICATOR */}
              {mounted && wishlist.length > 0 && (
                <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-red-500" />
              )}
            </button>

            {/* Cart */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center rounded-full bg-black px-3 py-2 text-white md:px-5 hover:bg-black/80 transition-colors"
            >
              <ShoppingBag size={18} strokeWidth={2} />

              {/* Mobile Cart Dot */}
              {mounted && totalItems > 0 && (
                <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-red-500 md:hidden" />
              )}

              {/* Desktop Cart Count */}
              <span className="hidden md:block ml-2 text-[12px] font-semibold">
                {mounted ? totalItems : 0}
              </span>
            </button>

          </div>
        </div>

        {/* Mobile Search Bar */}
        {mobileSearchOpen && (
          <div className="md:hidden border-t bg-white px-4 py-3 animate-[fadeIn_.2s_ease]">
            <div className="flex items-center gap-3">

              {/* 6. ADD FORM WRAPPER FOR MOBILE */}
              <form onSubmit={handleSearchSubmit} className="flex flex-1 items-center gap-2 rounded-full bg-gray-100 px-3 py-2">
                <Search size={18} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Describe what you're looking for..."
                  className="flex-1 bg-transparent outline-none text-sm"
                  autoFocus // Automatically focus input when mobile search opens
                />
              </form>

              <button
                onClick={() => {
                  setMobileSearchOpen(false);
                  setSearchQuery("");
                }}
                className="text-sm font-medium"
              >
                Cancel
              </button>

            </div>
          </div>
        )}
      </nav>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
      />

      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />

      <WishlistSidebar
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
      />
    </>
  );
}