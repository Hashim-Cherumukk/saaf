"use client"; // Added this because we are using window.confirm!

import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import Link from "next/link";
import Image from "next/image";
import { deleteInstaPost } from "../actions";
import { Trash2 } from "lucide-react";
import GalleryForm from "./GalleryForm";

// We need to fetch data differently since this is now a Client Component
import { useEffect, useState } from "react";

export default function GalleryAdminPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Quick client-side fetcher
  useEffect(() => {
    fetch('/api/gallery')
      .then(res => res.json())
      .then(data => {
        setPosts(data.reverse());
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-[#fafafa] text-zinc-900 font-sans p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="mb-8">
          {/* FIX: Hidden on mobile! */}
          <Link href="/admin" className="hidden md:inline-block text-[10px] uppercase tracking-widest text-zinc-400 hover:text-black mb-4 transition-colors">
            ← Back to Dashboard
          </Link>
          <h1 className="text-3xl font-serif">Lifestyle Gallery</h1>
          <p className="text-zinc-500 text-sm mt-2">Manage the photo grid on your storefront homepage.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
{posts.length >= 10 ? (
  <div className="bg-white border border-red-200 rounded-xl p-8 shadow-sm text-center sticky top-24">
    <h2 className="text-xs uppercase tracking-widest font-bold text-red-500 mb-2">Storage Limit Reached</h2>
    <p className="text-[10px] uppercase tracking-widest text-zinc-500 leading-relaxed">
      You have 10 active photos. Please delete an older photo from the grid before uploading a new one.
    </p>
  </div>
) : (
  <GalleryForm />
)}

          <div className="lg:col-span-2">
            <div className="bg-white border border-zinc-200/60 rounded-xl p-6 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xs uppercase tracking-widest font-semibold">Live Homepage Grid</h2>
                <span className="text-[10px] bg-zinc-100 px-3 py-1 rounded-full">{posts.length} Photos</span>
              </div>

              {loading ? (
                <div className="text-center py-12">Loading gallery...</div>
              ) : posts.length === 0 ? (
                <div className="text-center py-12 border border-dashed border-zinc-200 rounded-lg">
                  <p className="text-sm text-zinc-400">Your gallery is currently empty.</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {posts.map((post: any) => (
                    <div key={post.id} className="group relative aspect-[4/5] bg-zinc-100 rounded-lg overflow-hidden border border-zinc-200/50">
                      <Image 
                        src={post.imageUrl} 
                        alt="Gallery Post" 
                        fill 
                        className="object-cover" 
                      />
                      
                      {/* Hover Overlay with Delete Button */}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                        
                        {/* FIX: Added the confirmation pop-up! */}
                        <form 
                          action={deleteInstaPost}
                          onSubmit={(e) => {
                            if (!window.confirm("Are you sure you want to delete this photo from the live storefront?")) {
                              e.preventDefault();
                            }
                          }}
                        >
                          <input type="hidden" name="id" value={post.id} />
                          <button 
                            type="submit"
                            className="bg-red-500 text-white p-3 rounded-full hover:bg-red-600 transition-colors hover:scale-110 active:scale-95"
                            title="Delete Photo"
                          >
                            <Trash2 size={16} />
                          </button>
                        </form>

                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <p className="text-[10px] uppercase tracking-widest text-zinc-400 mt-6 text-center">
              Note: The storefront displays the newest 5 photos.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}