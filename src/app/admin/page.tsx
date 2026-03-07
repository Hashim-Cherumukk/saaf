import { auth, signOut } from "@/auth";
import { redirect } from "next/navigation";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import Link from "next/link";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

export default async function AdminDashboard() {
  const session = await auth();
  if (!session) redirect("/login");

  const products = await prisma.product.findMany({ orderBy: { createdAt: 'desc' } });
  const reviews = await prisma.review.findMany({ where: { status: 'pending' } });

  return (
    <div className="min-h-screen bg-[#fafafa] text-zinc-900 font-sans">
      {/* Premium Slim Header */}
      <nav className="sticky top-0 z-50 bg-white/70 backdrop-blur-xl border-b border-zinc-200/50 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <span className="text-lg font-serif tracking-tighter italic">Saaf</span>
          <div className="h-4 w-[1px] bg-zinc-200"></div>
          <span className="text-[10px] uppercase tracking-[0.3em] text-zinc-400">Management</span>
        </div>
        <form action={async () => { "use server"; await signOut(); }}>
          <button className="text-[10px] uppercase tracking-widest text-zinc-400 hover:text-black transition-all">Sign Out</button>
        </form>
      </nav>

      <main className="max-w-6xl mx-auto p-6 md:p-12">
        {/* Quick Actions Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
          <div>
            <h2 className="text-3xl font-serif mb-2">Morning, Admin</h2>
            <p className="text-zinc-400 text-sm italic font-serif">"Elegance is the only beauty that never fades."</p>
          </div>
          <div className="flex gap-3 w-full md:w-auto">
             <button className="flex-1 md:flex-none bg-black text-white px-8 py-3 text-[10px] uppercase tracking-widest hover:bg-zinc-800 transition-all">
               + Add Product
             </button>
          </div>
        </div>

        {/* Dynamic Grid for Sections */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Main Inventory Column */}
          <div className="md:col-span-2 space-y-8">
            <section className="bg-white border border-zinc-200/60 rounded-xl overflow-hidden shadow-sm">
              <div className="p-6 border-b border-zinc-100 flex justify-between items-center">
                <h3 className="text-xs uppercase tracking-widest font-semibold">Active Inventory</h3>
                <span className="text-[10px] bg-zinc-100 px-2 py-1 rounded-full">{products.length} Items</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <tbody className="divide-y divide-zinc-50">
                    {products.map((p) => (
                      <tr key={p.id} className="group hover:bg-zinc-50/50 transition-colors">
                        <td className="p-6">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-zinc-100 rounded-lg flex-shrink-0"></div>
                            <div>
                              <p className="text-sm font-medium">{p.name}</p>
                              <div className="flex gap-2 mt-1">
                                {p.isBestSeller && <span className="text-[8px] uppercase text-amber-600 font-bold">Best Seller</span>}
                                {p.isFeatured && <span className="text-[8px] uppercase text-blue-600 font-bold">Featured</span>}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="p-6 text-sm text-zinc-500">${p.price}</td>
                        <td className="p-6 text-right">
  <Link href={`/admin/edit/${p.id}`} className="text-[10px] uppercase tracking-widest text-zinc-300 hover:text-black cursor-pointer">
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

          {/* Sidebar for Storefront Controls */}
          <div className="space-y-8">
            <section className="bg-white p-6 border border-zinc-200/60 rounded-xl shadow-sm">
              <h3 className="text-xs uppercase tracking-widest font-semibold mb-6">Storefront Controls</h3>
              <div className="space-y-4">
                <button className="w-full text-left p-4 border border-zinc-100 rounded-lg hover:border-black transition-all text-sm flex justify-between items-center">
                   Instagram Gallery <span className="text-zinc-300">→</span>
                </button>
                <button className="w-full text-left p-4 border border-zinc-100 rounded-lg hover:border-black transition-all text-sm flex justify-between items-center">
                   Hero Banners <span className="text-zinc-300">→</span>
                </button>
                <button className="w-full text-left p-4 border border-zinc-100 rounded-lg hover:border-black transition-all text-sm flex justify-between items-center">
                   Manage Reviews ({reviews.length}) <span className="text-zinc-300">→</span>
                </button>
              </div>
            </section>

            <section className="bg-zinc-900 text-white p-6 rounded-xl">
               <h3 className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 mb-4">Quick Tip</h3>
               <p className="text-xs leading-relaxed text-zinc-300">
                 Toggling "Best Seller" will automatically push the product to the second row of your home page.
               </p>
            </section>
          </div>

        </div>
      </main>
    </div>
  );
}