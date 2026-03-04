// src/components/Footer.tsx
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-black py-16 text-white transition-colors duration-300 dark:bg-[#001a11] dark:text-[#FFD700]">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 md:grid-cols-4 md:px-12">
        
        {/* Brand Info */}
        <div className="md:col-span-2">
          <Link href="/" className="mb-6 inline-block font-serif text-2xl font-bold uppercase tracking-widest">
            Saaf Couture
          </Link>
          <p className="mb-6 max-w-sm font-sans text-sm text-gray-400 dark:text-[#FFD700]/70">
            Elegance in every detail. Premium Qamees and exclusive Perfumes designed for the modern standard.
          </p>
          <div className="flex gap-4 font-sans text-sm">
            <a href="https://instagram.com" className="transition-opacity hover:opacity-70" target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href="https://wa.me/1234567890" className="transition-opacity hover:opacity-70" target="_blank" rel="noopener noreferrer">WhatsApp</a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="mb-6 font-sans text-sm font-semibold uppercase tracking-wider">Shop</h3>
          <ul className="space-y-4 font-sans text-sm text-gray-400 dark:text-[#FFD700]/70">
            <li><Link href="/shop" className="transition-colors hover:text-white dark:hover:text-[#FFD700]">All Products</Link></li>
            <li><Link href="/shop?category=qamees" className="transition-colors hover:text-white dark:hover:text-[#FFD700]">Qamees Collection</Link></li>
            <li><Link href="/shop?category=perfumes" className="transition-colors hover:text-white dark:hover:text-[#FFD700]">Perfume Collection</Link></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="mb-6 font-sans text-sm font-semibold uppercase tracking-wider">Support</h3>
          <ul className="space-y-4 font-sans text-sm text-gray-400 dark:text-[#FFD700]/70">
            <li><Link href="/contact" className="transition-colors hover:text-white dark:hover:text-[#FFD700]">Contact Us</Link></li>
            <li><Link href="/faq" className="transition-colors hover:text-white dark:hover:text-[#FFD700]">FAQ & Shipping</Link></li>
          </ul>
        </div>

      </div>

      {/* Bottom Copyright */}
      <div className="mx-auto mt-16 flex max-w-7xl flex-col items-center justify-between gap-4 border-t border-gray-800 px-6 pt-8 font-sans text-xs text-gray-500 dark:border-[#FFD700]/20 dark:text-[#FFD700]/50 md:flex-row md:px-12">
        <p>&copy; {new Date().getFullYear()} Saaf Couture. All rights reserved.</p>
        <div className="flex gap-4">
          <Link href="/privacy" className="hover:text-white dark:hover:text-[#FFD700]">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-white dark:hover:text-[#FFD700]">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}