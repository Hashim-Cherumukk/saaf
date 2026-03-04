// src/components/AnnouncementBar.tsx
"use client";

import { useState } from "react";
import { X } from "lucide-react";

export default function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="relative flex h-10 w-full items-center justify-center bg-black px-4 font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-white dark:bg-[#FFD700] dark:text-[#013220]">
      <span className="text-center">Complimentary Global Shipping on Orders over $500</span>
      <button 
        onClick={() => setIsVisible(false)} 
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 opacity-50 transition-opacity hover:opacity-100"
        aria-label="Close announcement"
      >
        <X size={14} strokeWidth={2} />
      </button>
    </div>
  );
}