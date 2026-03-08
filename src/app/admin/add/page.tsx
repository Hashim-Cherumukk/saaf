"use client";

import { useState } from "react";
import { CldUploadWidget } from "next-cloudinary";
import { createProduct } from "../actions";
import Link from "next/link";
import SubmitButton from "@/components/SubmitButton";

export default function AddProductPage() {
  // CORRECTED: State is now an array to hold multiple image URLs
  const [images, setImages] = useState<string[]>([]);

  return (
    <div className="min-h-screen bg-[#fafafa] text-zinc-900 font-sans p-6 md:p-12">
      <div className="max-w-3xl mx-auto">
        
        {/* Header */}
        <div className="mb-8">
          <Link href="/admin" className="text-[10px] uppercase tracking-widest text-zinc-400 hover:text-black mb-4 inline-block">
            ← Back to Inventory
          </Link>
          <h1 className="text-3xl font-serif">Add New Product</h1>
        </div>

        {/* The Form */}
        <form action={createProduct} className="bg-white border border-zinc-200/60 rounded-xl p-8 shadow-sm space-y-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column: Details */}
            <div className="space-y-6">
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-zinc-500 mb-2">Product Name</label>
                <input required type="text" name="name" className="w-full border-b border-zinc-200 pb-2 text-sm focus:outline-none focus:border-black transition-colors" placeholder="e.g., Signature White Qamees" />
              </div>
              
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-[10px] uppercase tracking-widest text-zinc-500 mb-2">Price (₹)</label>
                  <input required type="number" step="0.01" name="price" className="w-full border-b border-zinc-200 pb-2 text-sm focus:outline-none focus:border-black transition-colors" placeholder="0.00" />
                </div>
                <div className="flex-1">
                  <label className="block text-[10px] uppercase tracking-widest text-zinc-500 mb-2">Category</label>
                  <select name="category" className="w-full border-b border-zinc-200 pb-2 text-sm focus:outline-none focus:border-black transition-colors bg-white">
                    <option value="clothing">Clothing</option>
                    <option value="perfumes">Perfumes</option>
                    <option value="others">Others</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-widest text-zinc-500 mb-2">Description</label>
                <textarea required name="description" rows={4} className="w-full border border-zinc-200 p-3 text-sm focus:outline-none focus:border-black transition-colors rounded-sm" placeholder="Describe the fabric, fit, and feel..."></textarea>
              </div>

              {/* Sizes (Hidden checkboxes passed to the form) */}
              <div>
                 <label className="block text-[10px] uppercase tracking-widest text-zinc-500 mb-2">Available Sizes</label>
                 <div className="flex gap-3">
                   {['S', 'M', 'L', 'XL'].map(size => (
                     <label key={size} className="flex items-center gap-2 text-sm cursor-pointer">
                       <input type="checkbox" name="sizes" value={size} className="accent-black" />
                       {size}
                     </label>
                   ))}
                 </div>
              </div>
            </div>

            {/* Right Column: Cloudinary Image Upload */}
            <div>
              <div className="flex justify-between items-end mb-2">
                 <label className="block text-[10px] uppercase tracking-widest text-zinc-500">Product Images</label>
                 <span className="text-[9px] text-zinc-400">First image is the main cover</span>
              </div>
              
              {/* Hidden inputs to pass data to the Server Action */}
              <input type="hidden" name="image" value={images[0] || ""} required />
              {images.slice(1).map((img, i) => (
                <input key={i} type="hidden" name="gallery" value={img} />
              ))}

              <CldUploadWidget 
                uploadPreset="saaf_images"
                options={{ multiple: true }} 
                onSuccess={(result: any) => {
                  setImages((prev) => [...prev, result.info.secure_url]);
                }}
              >
                {({ open }) => (
                  <div className="space-y-4">
                    <div 
                      onClick={() => open()}
                      className="border-2 border-dashed border-zinc-200 hover:border-black transition-colors rounded-xl h-32 flex flex-col items-center justify-center cursor-pointer bg-zinc-50/50 group"
                    >
                      <span className="text-xl mb-1 text-zinc-300 group-hover:text-black transition-colors">+</span>
                      <span className="text-[10px] uppercase tracking-widest text-zinc-400 group-hover:text-black transition-colors">Upload Photos</span>
                    </div>

                    {/* Image Preview Grid */}
                    {images.length > 0 && (
                      <div className="grid grid-cols-2 gap-3">
                        {images.map((img, idx) => (
                          <div key={idx} className="relative aspect-[3/4] rounded-lg overflow-hidden group border border-zinc-200">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={img} alt="Uploaded" className="h-full w-full object-cover" />
                            {idx === 0 && (
                               <div className="absolute top-2 left-2 bg-black text-white text-[8px] uppercase tracking-widest px-2 py-1 rounded-sm">Cover</div>
                            )}
                            <button 
                               type="button"
                               onClick={() => setImages(images.filter((_, i) => i !== idx))}
                               className="absolute top-2 right-2 bg-white/90 text-red-500 w-6 h-6 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              ✕
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </CldUploadWidget>
            </div>
          </div>

          <div className="pt-6 border-t border-zinc-100 flex justify-end">
            <SubmitButton label="Save Product" />
          </div>

        </form>
      </div>
    </div>
  );
}