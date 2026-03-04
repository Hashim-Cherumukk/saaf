// src/components/MobileMenu.tsx
"use client";

import Link from "next/link";
import { X, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity" 
          onClick={onClose} 
        />
      )}

      <div 
        className={`fixed inset-y-0 left-0 z-50 flex w-[300px] flex-col bg-white shadow-2xl transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-black/5 p-6">
          <span className="font-serif text-lg font-bold text-black">Menu</span>
          <button onClick={onClose} className="text-black opacity-50 transition-opacity hover:opacity-100">
            <X size={24} strokeWidth={1.5} />
          </button>
        </div>

        <div className="flex flex-1 flex-col overflow-y-auto py-4">
          <Link href="/shop" onClick={onClose} className="flex items-center justify-between border-b border-black/5 px-6 py-5 font-sans text-sm font-semibold uppercase tracking-widest text-black hover:bg-gray-50">
            Shop <ChevronRight size={16} className="opacity-40" />
          </Link>
          <Link href="/about" onClick={onClose} className="flex items-center justify-between border-b border-black/5 px-6 py-5 font-sans text-sm font-semibold uppercase tracking-widest text-black hover:bg-gray-50">
            About <ChevronRight size={16} className="opacity-40" />
          </Link>
          <Link href="/contact" onClick={onClose} className="flex items-center justify-between border-b border-black/5 px-6 py-5 font-sans text-sm font-semibold uppercase tracking-widest text-black hover:bg-gray-50">
            Contact <ChevronRight size={16} className="opacity-40" />
          </Link>
        </div>
      </div>
    </>
  );
}