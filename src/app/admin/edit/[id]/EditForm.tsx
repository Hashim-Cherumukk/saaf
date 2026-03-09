"use client";

import { useState } from "react";
import { CldUploadWidget } from "next-cloudinary";
import { updateProduct, deleteProduct } from "../../actions";
import Link from "next/link";
import SubmitButton from "@/components/SubmitButton";

export default function EditForm({ product }: { product: any }) {
  // Pull the main image AND the gallery array from Neon to populate the grid
  const [images, setImages] = useState<string[]>([
    product.image,
    ...(product.gallery || [])
  ]);

  return (
    <div className="min-h-screen bg-[#fafafa] text-zinc-900 font-sans p-6 md:p-12">
      <div className="max-w-3xl mx-auto">
        
        <div className="mb-8">
          <Link href="/admin" className="text-[10px] uppercase tracking-widest text-zinc-400 hover:text-black mb-4 inline-block">
            ← Back to Inventory
          </Link>
          <h1 className="text-3xl font-serif">Edit: {product.name}</h1>
        </div>

        <form action={updateProduct} className="bg-white border border-zinc-200/60 rounded-xl p-8 shadow-sm space-y-8 mb-8">
          <input type="hidden" name="id" value={product.id} />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-zinc-500 mb-2">Product Name</label>
                <input required type="text" name="name" defaultValue={product.name} className="w-full border-b border-zinc-200 pb-2 text-sm focus:outline-none focus:border-black transition-colors" />
              </div>
              
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-[10px] uppercase tracking-widest text-zinc-500 mb-2">Price (₹)</label>
                  <input required type="number" step="0.01" name="price" defaultValue={product.price} className="w-full border-b border-zinc-200 pb-2 text-sm focus:outline-none focus:border-black transition-colors" />
                </div>
                <div className="flex-1">
                  <label className="block text-[10px] uppercase tracking-widest text-amber-600 mb-2">Original Price (₹)</label>
                  <input type="number" step="0.01" name="compareAtPrice" defaultValue={product.compareAtPrice || ''} className="w-full border-b border-zinc-200 pb-2 text-sm focus:outline-none focus:border-amber-600 transition-colors" placeholder="For sales" />
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-widest text-zinc-500 mb-2">Category</label>
                <select name="category" defaultValue={product.category} className="w-full border-b border-zinc-200 pb-2 text-sm focus:outline-none focus:border-black transition-colors bg-white">
                  <option value="clothing">Clothing</option>
                  <option value="perfumes">Perfumes</option>
                  <option value="others">Others</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-widest text-zinc-500 mb-2">Description</label>
                <textarea required name="description" rows={4} defaultValue={product.description} className="w-full border border-zinc-200 p-3 text-sm focus:outline-none focus:border-black transition-colors rounded-sm"></textarea>
              </div>

              {/* Storefront Display Toggles */}
              <div className="p-4 bg-zinc-50 border border-zinc-100 rounded-lg space-y-3">
                 <h3 className="text-[10px] uppercase tracking-widest text-zinc-500 mb-2">Storefront Visibility</h3>
                 
                 <label className="flex items-center gap-3 text-sm cursor-pointer">
                   {/* Explicitly added value="on" to ensure HTML sends it correctly */}
                   <input type="checkbox" name="inStock" value="on" defaultChecked={product.inStock} className="accent-black w-4 h-4" />
                   Product is In Stock
                 </label>

                 <label className="flex items-center gap-3 text-sm cursor-pointer">
                   <input type="checkbox" name="isBestSeller" value="on" defaultChecked={product.isBestSeller} className="accent-black w-4 h-4" />
                   Flag as "Best Seller"
                 </label>

                 <label className="flex items-center gap-3 text-sm cursor-pointer">
                   <input type="checkbox" name="isFeatured" value="on" defaultChecked={product.isFeatured} className="accent-black w-4 h-4" />
                   Show in Featured Section
                 </label>
              </div>

              {/* Sizes */}
              <div>
                 <label className="block text-[10px] uppercase tracking-widest text-zinc-500 mb-2">Available Sizes</label>
                 <div className="flex gap-3">
                   {['54', '56', '58'].map(size => (
                     <label key={size} className="flex items-center gap-2 text-sm cursor-pointer">
                       <input type="checkbox" name="sizes" value={size} defaultChecked={product.sizes.includes(size)} className="accent-black" />
                       {size}
                     </label>
                   ))}
                 </div>
              </div>
            </div>

            {/* Right Column: Multi-Image Cloudinary Upload */}
            <div>
              <div className="flex justify-between items-end mb-2">
                 <label className="block text-[10px] uppercase tracking-widest text-zinc-500">Product Images</label>
                 <span className="text-[9px] text-zinc-400">First image is the main cover</span>
              </div>
              
              <input type="hidden" name="image" value={images[0] || ""} required />
              {images.slice(1).map((img, i) => (
                <input key={i} type="hidden" name="gallery" value={img} />
              ))}

              <CldUploadWidget 
                uploadPreset="saaf_images" 
                options={{ multiple: true }}
                onSuccess={(result: any) => setImages((prev) => [...prev, result.info.secure_url])}
              >
                {({ open }) => (
                  <div className="space-y-4">
                    <div 
                      onClick={() => open()}
                      className="border-2 border-dashed border-zinc-200 hover:border-black transition-colors rounded-xl h-32 flex flex-col items-center justify-center cursor-pointer bg-zinc-50/50 group"
                    >
                      <span className="text-xl mb-1 text-zinc-300 group-hover:text-black transition-colors">+</span>
                      <span className="text-[10px] uppercase tracking-widest text-zinc-400 group-hover:text-black transition-colors">Add More Photos</span>
                    </div>

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
            <SubmitButton label="Save Changes" />
          </div>
        </form>

        <div className="border border-red-200 bg-red-50/30 rounded-xl p-8 flex justify-between items-center">
            <div>
                <h3 className="text-sm font-medium text-red-900 mb-1">Danger Zone</h3>
                <p className="text-xs text-red-700/70">Permanently remove this product from your inventory.</p>
            </div>
            <form action={deleteProduct}>
                <input type="hidden" name="id" value={product.id} />
                <SubmitButton label="Delete Product" loadingLabel="Deleting..." isDanger={true} />
            </form>
        </div>

      </div>
    </div>
  );
}