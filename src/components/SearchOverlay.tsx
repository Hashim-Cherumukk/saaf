// src/components/SearchOverlay.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, X } from "lucide-react";
import { products } from "@/lib/data";

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      setQuery("");
    }
  }, [isOpen]);

  const results = query.trim() === "" 
    ? [] 
    : products.filter(p => p.name.toLowerCase().includes(query.toLowerCase())).slice(0, 5);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex flex-col bg-white/95 backdrop-blur-md transition-all duration-300 dark:bg-[#050505]/95">
      <div className="flex h-24 items-center justify-between px-6 md:px-12">
        <div className="w-10"></div>
        <button onClick={onClose} className="p-2 opacity-50 transition-opacity hover:opacity-100">
          <X size={32} strokeWidth={1} />
        </button>
      </div>

      <div className="mx-auto mt-10 w-full max-w-4xl px-6">
        <div className="relative flex items-center border-b-2 border-black/10 pb-4 dark:border-white/10">
          <Search size={40} strokeWidth={1} className="mr-6 opacity-30" />
          <input
            ref={inputRef}
            type="text"
            placeholder="What are you looking for?"
            className="w-full bg-transparent font-sans text-4xl font-bold tracking-tight outline-none placeholder:text-black/20 dark:placeholder:text-white/20 md:text-6xl"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <div className="mt-12">
          {query.length > 0 && results.length > 0 && (
            <div className="flex flex-col gap-6">
              {results.map((product) => (
                <Link 
                  key={product.id} 
                  href={`/shop/${product.id}`} 
                  onClick={onClose}
                  className="group flex items-center justify-between border-b border-black/5 pb-6 dark:border-white/5"
                >
                  <div className="flex items-center gap-8">
                    <div className="relative h-20 w-16 bg-gray-100 dark:bg-zinc-900">
                      <Image src={product.image} alt={product.name} fill className="object-cover transition-transform group-hover:scale-105" />
                    </div>
                    <h4 className="font-sans text-xl font-bold transition-transform group-hover:translate-x-2">{product.name}</h4>
                  </div>
                  <p className="font-sans text-lg font-medium opacity-50">${product.price.toFixed(2)}</p>
                </Link>
              ))}
            </div>
          )}

          {query.length > 0 && results.length === 0 && (
            <p className="font-sans text-xl font-medium opacity-40">No results found for "{query}"</p>
          )}
        </div>
      </div>
    </div>
  );
}