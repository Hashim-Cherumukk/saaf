import { auth, signOut } from "@/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";
import { LogOut, Image as ImageIcon, Megaphone, Star } from "lucide-react"; // IDE Refresh

export default async function AdminDashboard() {
  const session = await auth();
  if (!session) redirect("/login");

  const products = await prisma.product.findMany({ orderBy: { createdAt: 'desc' } });
  const pendingReviews = await (prisma as any).review.findMany({ where: { isPublished: false } });
  const subscribers = await (prisma as any).Newsletter.findMany({ orderBy: { createdAt: 'desc' } });

  // Dynamic Greeting Logic
  const hour = new Date().getHours();
  let greeting = "Good Evening";
  if (hour < 12) greeting = "Good Morning";
  else if (hour < 18) greeting = "Good Afternoon";

  return (
    <div className="min-h-screen bg-[#fafafa] text-zinc-900 font-sans">

      {/* Premium Slim Header */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-zinc-200/60 px-6 py-4 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-4">
          <span className="text-xl font-serif tracking-tighter italic">Saaf</span>
          <div className="h-4 w-[1px] bg-zinc-300"></div>
          <span className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 font-bold">Workspace</span>
        </div>

        {/* Upgraded Sign Out Button */}
        <form action={async () => { "use server"; await signOut(); }}>
          <button className="group flex items-center gap-2 px-4 py-2 bg-white border border-zinc-200 rounded-lg text-[10px] uppercase tracking-widest text-zinc-500 font-bold hover:border-black hover:text-black hover:bg-zinc-50 transition-all shadow-sm">
            <span>Sign Out</span>
            <LogOut size={14} className="text-zinc-400 group-hover:text-black transition-colors" />
          </button>
        </form>
      </nav>

      <main className="max-w-6xl mx-auto p-6 md:p-12">

        {/* Quick Actions Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
          <div>
            <h2 className="text-3xl font-serif mb-2">{greeting}, Admin</h2>
            <p className="text-zinc-500 text-sm italic font-serif">"Elegance is the only beauty that never fades."</p>
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <Link href="/admin/add" className="flex-1 md:flex-none bg-black text-white px-8 py-3.5 text-[10px] font-bold uppercase tracking-widest hover:bg-zinc-800 transition-all text-center block rounded-md shadow-md">
              + Add Product
            </Link>
          </div>
        </div>

        {/* Dynamic Grid for Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Sidebar for Storefront Controls - ORDER 1 ON MOBILE, ORDER 2 ON DESKTOP */}
          <div className="order-1 lg:order-2 space-y-6">
            <section className="bg-white p-6 border border-zinc-200/60 rounded-xl shadow-sm">
              <h3 className="text-xs uppercase tracking-widest font-bold mb-6">Storefront Controls</h3>
              <div className="space-y-3">

                <Link href="/admin/gallery" className="w-full text-left p-4 border border-zinc-100 rounded-xl hover:border-black hover:shadow-md transition-all flex items-center gap-4 group bg-zinc-50/50 hover:bg-white">
                  <div className="p-2 bg-zinc-100 rounded-lg group-hover:bg-black group-hover:text-white transition-colors">
                    <ImageIcon size={18} />
                  </div>
                  <span className="text-sm font-medium flex-1">Instagram Gallery</span>
                  <span className="text-zinc-300 group-hover:text-black transition-colors">→</span>
                </Link>

                <Link href="/admin/settings" className="w-full text-left p-4 border border-zinc-100 rounded-xl hover:border-black hover:shadow-md transition-all flex items-center gap-4 group bg-zinc-50/50 hover:bg-white">
                  <div className="p-2 bg-zinc-100 rounded-lg group-hover:bg-black group-hover:text-white transition-colors">
                    <Megaphone size={18} />
                  </div>
                  <span className="text-sm font-medium flex-1">Announcement Banner</span>
                  <span className="text-zinc-300 group-hover:text-black transition-colors">→</span>
                </Link>

                <Link href="/admin/reviews" className="w-full text-left p-4 border border-zinc-100 rounded-xl hover:border-black hover:shadow-md transition-all flex items-center gap-4 group bg-zinc-50/50 hover:bg-white">
                  <div className="p-2 bg-zinc-100 rounded-lg group-hover:bg-black group-hover:text-white transition-colors">
                    <Star size={18} />
                  </div>
                  <span className="text-sm font-medium">Manage Reviews</span>
                  {pendingReviews.length > 0 && (
                    <span className="ml-auto bg-red-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full animate-pulse">
                      {pendingReviews.length} New
                    </span>
                  )}
                  {pendingReviews.length === 0 && (
                    <span className="ml-auto text-zinc-300 group-hover:text-black transition-colors">→</span>
                  )}
                </Link>
                <Link href="/admin/subscribers" className="w-full text-left p-4 border border-zinc-100 rounded-xl hover:border-black hover:shadow-md transition-all flex items-center gap-4 group bg-zinc-50/50 hover:bg-white">
                  <div className="p-2 bg-zinc-100 rounded-lg group-hover:bg-black group-hover:text-white transition-colors">
                    <span className="text-sm font-bold">@</span>
                  </div>
                  <span className="text-sm font-medium flex-1">Newsletter List</span>
                  <span className="ml-auto bg-zinc-200 text-zinc-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
                    {subscribers.length}
                  </span>
                </Link>

              </div>
            </section>
          </div>

          {/* Main Inventory Column - ORDER 2 ON MOBILE, ORDER 1 ON DESKTOP */}
          <div className="order-2 lg:order-1 lg:col-span-2 space-y-8">
            <section className="bg-white border border-zinc-200/60 rounded-xl overflow-hidden shadow-sm">
              <div className="p-6 border-b border-zinc-100 flex justify-between items-center bg-zinc-50/50">
                <h3 className="text-xs uppercase tracking-widest font-bold">Active Inventory</h3>
                <span className="text-[10px] bg-white border border-zinc-200 px-3 py-1 rounded-full font-bold shadow-sm">{products.length} Items</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-white border-b border-zinc-100">
                    <tr>
                      <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-zinc-400 font-bold">Product</th>
                      <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-zinc-400 font-bold">Price</th>
                      <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-zinc-400 font-bold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-50">
                    {products.map((p) => (
                      <tr key={p.id} className="group hover:bg-zinc-50 transition-colors">
                        <td className="p-6">
                          <div className="flex items-center gap-5">
                            <div className="relative w-14 h-20 bg-zinc-100 rounded-lg flex-shrink-0 overflow-hidden border border-zinc-200/50 shadow-sm group-hover:shadow-md transition-shadow">
                              <Image src={p.image} alt={p.name} fill className="object-cover" />
                            </div>
                            <div>
                              <p className="text-sm font-bold text-zinc-900">{p.name}</p>
                              <div className="flex gap-2 mt-2 flex-wrap">
                                {!p.inStock && <span className="text-[9px] uppercase tracking-wider text-red-600 bg-red-50 border border-red-100 px-2 py-0.5 rounded-md font-bold">Out of Stock</span>}
                                {p.isBestSeller && <span className="text-[9px] uppercase tracking-wider text-amber-600 bg-amber-50 border border-amber-100 px-2 py-0.5 rounded-md font-bold">Best Seller</span>}
                                {p.isFeatured && <span className="text-[9px] uppercase tracking-wider text-blue-600 bg-blue-50 border border-blue-100 px-2 py-0.5 rounded-md font-bold">Featured</span>}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="p-6 text-sm font-medium text-zinc-500">
                          ₹{p.price.toFixed(2)}
                        </td>
                        <td className="p-6 text-right">
                          <Link href={`/admin/edit/${p.id}`} className="inline-block px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-zinc-500 hover:text-black border border-zinc-200 hover:border-black rounded-lg transition-colors bg-white shadow-sm hover:shadow-md">
                            Edit
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </div>

        </div>
      </main>
    </div>
  );
}