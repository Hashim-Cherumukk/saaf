"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Trash2, CheckCircle, XCircle, Star } from "lucide-react";
import { toggleReviewPublish, deleteReview, addReview } from "../actions";
import SubmitButton from "@/components/SubmitButton";

export default function ReviewsAdminPage() {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchReviews = () => {
    fetch('/api/reviews')
      .then(res => res.json())
      .then(data => {
        setReviews(data);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm("Permanently delete this review?")) {
      const formData = new FormData();
      formData.append("id", id);
      await deleteReview(formData);
      fetchReviews(); // Instantly refresh the list without reloading the whole page!
    }
  };

  const handleToggle = async (id: string, currentStatus: boolean) => {
    const formData = new FormData();
    formData.append("id", id);
    formData.append("currentStatus", currentStatus.toString());
    await toggleReviewPublish(formData);
    fetchReviews();
  };

  return (
    <div className="min-h-screen bg-[#fafafa] text-zinc-900 font-sans p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        
        <div className="mb-8">
          <Link href="/admin" className="hidden md:inline-block text-[10px] uppercase tracking-widest text-zinc-400 hover:text-black mb-4 transition-colors">
            ← Back to Dashboard
          </Link>
          <h1 className="text-3xl font-serif">Manage Reviews</h1>
          <p className="text-zinc-500 text-sm mt-2">Curate and publish client feedback to your storefront.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          <div className="lg:col-span-1">
            <form 
              action={async (formData) => {
                await addReview(formData);
                fetchReviews(); // Refresh list automatically
                (document.getElementById("review-form") as HTMLFormElement).reset(); // Clear form
              }} 
              id="review-form"
              className="bg-white border border-zinc-200/60 rounded-xl p-6 shadow-sm space-y-6 sticky top-24"
            >
              <h2 className="text-xs uppercase tracking-widest font-semibold mb-4">Add Manual Review</h2>
              
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-zinc-500 mb-2">Customer Name *</label>
                <input required type="text" name="name" placeholder="e.g., Ahmed K." className="w-full border-b border-zinc-200 pb-2 text-sm focus:outline-none focus:border-black transition-colors" />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-widest text-zinc-500 mb-2">Client Details (Optional)</label>
                <input type="text" name="productName" placeholder="e.g., Verified Buyer, or London, UK" className="w-full border-b border-zinc-200 pb-2 text-sm focus:outline-none focus:border-black transition-colors" />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-widest text-zinc-500 mb-2">Rating *</label>
                <select name="rating" required className="w-full border-b border-zinc-200 pb-2 text-sm focus:outline-none focus:border-black transition-colors bg-transparent">
                  <option value="5">5 Stars - Excellent</option>
                  <option value="4">4 Stars - Very Good</option>
                  <option value="3">3 Stars - Average</option>
                  <option value="2">2 Stars - Poor</option>
                  <option value="1">1 Star - Terrible</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-widest text-zinc-500 mb-2">Client Comment *</label>
                <textarea required name="comment" rows={4} placeholder="Type the client's feedback here..." className="w-full border-b border-zinc-200 pb-2 text-sm focus:outline-none focus:border-black transition-colors resize-none" />
              </div>

              <div className="pt-2">
                 <SubmitButton label="Publish Review" />
              </div>
            </form>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white border border-zinc-200/60 rounded-xl shadow-sm overflow-hidden">
              <div className="p-6 border-b border-zinc-100 flex justify-between items-center">
                <h2 className="text-xs uppercase tracking-widest font-semibold">Live Review Grid</h2>
                <span className="text-[10px] bg-zinc-100 px-3 py-1 rounded-full">{reviews.length} Total</span>
              </div>

              {loading ? (
                <div className="text-center py-12 text-sm text-zinc-400">Loading reviews...</div>
              ) : reviews.length === 0 ? (
                <div className="text-center py-16">
                  <p className="text-sm text-zinc-400">No reviews added yet.</p>
                </div>
              ) : (
                <div className="divide-y divide-zinc-100">
                  {reviews.map((review: any) => (
                    <div key={review.id} className={`p-6 flex flex-col xl:flex-row xl:items-center justify-between gap-6 transition-colors ${!review.isPublished ? "bg-amber-50/30" : "hover:bg-zinc-50"}`}>
                      
                      <div className="flex-1 space-y-3">
                        <div className="flex items-center gap-3">
                          <span className="font-sans text-xs font-bold uppercase tracking-widest text-black">
                            {review.name}
                          </span>
                          {review.productName && (
                            <span className="text-[10px] uppercase tracking-widest text-zinc-400">
                              • {review.productName}
                            </span>
                          )}
                          {!review.isPublished && (
                            <span className="bg-amber-100 text-amber-700 text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm ml-2">
                              Hidden
                            </span>
                          )}
                        </div>
                        
                        <div className="flex gap-1 text-black">
                          {[...Array(review.rating)].map((_, i) => (
                             <Star key={i} size={12} className="fill-black" />
                          ))}
                        </div>

                        <p className="text-sm text-zinc-600 leading-relaxed max-w-2xl">
                          "{review.comment}"
                        </p>
                      </div>

                      <div className="flex items-center gap-3">
                        <button 
                          onClick={() => handleToggle(review.id, review.isPublished)}
                          className={`flex items-center gap-2 px-4 py-2 border rounded-md text-[10px] font-bold uppercase tracking-widest transition-colors ${
                            review.isPublished 
                              ? "border-zinc-200 text-zinc-500 hover:border-black hover:text-black" 
                              : "border-[#25D366] bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366] hover:text-white"
                          }`}
                        >
                          {review.isPublished ? <XCircle size={14} /> : <CheckCircle size={14} />}
                          {review.isPublished ? "Hide" : "Publish"}
                        </button>

                        <button 
                          onClick={() => handleDelete(review.id)}
                          className="p-2 border border-red-200 text-red-500 rounded-md hover:bg-red-500 hover:text-white transition-colors"
                          title="Delete Review"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}