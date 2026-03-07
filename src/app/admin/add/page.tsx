"use client";

import { useState } from "react";
import { CldUploadWidget } from "next-cloudinary";
import { createProduct } from "../actions";
import Link from "next/link";

export default function AddProductPage() {
  const [imageUrl, setImageUrl] = useState<string>("");

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
                  <label className="block text-[10px] uppercase tracking-widest text-zinc-500 mb-2">Price ($)</label>
                  <input required type="number" step="0.01" name="price" className="w-full border-b border-zinc-200 pb-2 text-sm focus:outline-none focus:border-black transition-colors" placeholder="0.00" />
                </div>
                <div className="flex-1">
                  <label className="block text-[10px] uppercase tracking-widest text-zinc-500 mb-2">Category</label>
                  <select name="category" className="w-full border-b border-zinc-200 pb-2 text-sm focus:outline-none focus:border-black transition-colors bg-white">
                    <option value="clothing">Clothing</option>
                    <option value="perfumes">Perfumes</option>
                    <option value="accessories">Accessories</option>
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
              <label className="block text-[10px] uppercase tracking-widest text-zinc-500 mb-2">Product Image</label>
              
              {/* Hidden input to hold the URL so the form can submit it */}
              <input type="hidden" name="image" value={imageUrl} required />

              <CldUploadWidget 
                uploadPreset="saaf_images" // Matches your preset exactly
                onSuccess={(result: any) => {
                  setImageUrl(result.info.secure_url);
                }}
              >
                {({ open }) => (
                  <div 
                    onClick={() => open()}
                    className="border-2 border-dashed border-zinc-200 hover:border-black transition-colors rounded-xl h-64 flex flex-col items-center justify-center cursor-pointer bg-zinc-50/50 group"
                  >
                    {imageUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={imageUrl} alt="Uploaded" className="h-full w-full object-cover rounded-xl" />
                    ) : (
                      <>
                        <span className="text-2xl mb-2 text-zinc-300 group-hover:text-black transition-colors">📷</span>
                        <span className="text-[10px] uppercase tracking-widest text-zinc-400 group-hover:text-black transition-colors">Click to upload photo</span>
                      </>
                    )}
                  </div>
                )}
              </CldUploadWidget>
            </div>
          </div>

          <div className="pt-6 border-t border-zinc-100 flex justify-end">
            <button type="submit" className="bg-black text-white px-10 py-3 text-[10px] uppercase tracking-[0.2em] hover:bg-zinc-800 transition-all">
              Save Product
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}