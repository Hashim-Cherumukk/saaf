"use client";

import { useState } from "react";
import { CldUploadWidget } from "next-cloudinary";
import SubmitButton from "@/components/SubmitButton";
import { addInstaPost } from "../actions";
import { ImagePlus, CheckCircle2 } from "lucide-react";

export default function GalleryForm() {
  const [imageUrl, setImageUrl] = useState("");

  return (
    <form action={addInstaPost} className="bg-white border border-zinc-200/60 rounded-xl p-6 shadow-sm space-y-6 sticky top-24">
      <h2 className="text-xs uppercase tracking-widest font-semibold mb-4">Add New Photo</h2>
      
      <div>
        <label className="block text-[10px] uppercase tracking-widest text-zinc-500 mb-2">
          Image Source (Paste link or upload) *
        </label>
        
        {/* Visible Input for Manual Links */}
        <input 
          required 
          type="url" 
          name="imageUrl" 
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder="Paste external image URL here..."
          className="w-full border-b border-zinc-200 pb-3 mb-4 text-sm focus:outline-none focus:border-black transition-colors" 
        />

        <div className="flex items-center gap-4 mb-4">
          <div className="h-px flex-1 bg-zinc-100"></div>
          <span className="text-[10px] uppercase tracking-widest text-zinc-400">OR</span>
          <div className="h-px flex-1 bg-zinc-100"></div>
        </div>

        {/* Cloudinary Upload Button */}
        <CldUploadWidget 
          uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "saaf_uploads"} 
          onSuccess={(result: any) => {
            setImageUrl(result.info.secure_url);
          }}
        >
          {({ open }) => (
            <button
              type="button"
              onClick={() => open()}
              className={`w-full flex items-center justify-center gap-2 border-2 border-dashed rounded-xl p-6 transition-colors ${
                imageUrl && imageUrl.includes("cloudinary") ? "border-[#25D366] bg-[#25D366]/5" : "border-zinc-200 hover:border-black hover:bg-zinc-50"
              }`}
            >
              {imageUrl && imageUrl.includes("cloudinary") ? (
                <>
                  <CheckCircle2 size={20} className="text-[#25D366]" />
                  <span className="font-sans text-xs font-bold text-[#25D366]">Uploaded via Computer</span>
                </>
              ) : (
                <>
                  <ImagePlus size={20} className="text-zinc-400" />
                  <span className="font-sans text-xs font-medium text-zinc-500">Upload from Computer</span>
                </>
              )}
            </button>
          )}
        </CldUploadWidget>
      </div>

      <div>
        <label className="block text-[10px] uppercase tracking-widest text-zinc-500 mb-2">
          Destination Link (Optional)
        </label>
        <input 
          type="url" 
          name="link" 
          placeholder="e.g., https://saafcouture.com/shop/123"
          className="w-full border-b border-zinc-200 pb-2 text-sm focus:outline-none focus:border-black transition-colors" 
        />
        <p className="text-[10px] text-zinc-400 mt-2">
          Where should the customer go when they click this photo?
        </p>
      </div>

      <div className="pt-4">
         <SubmitButton label="Add to Homepage Grid" />
      </div>
    </form>
  );
}