import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import Link from "next/link";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

export default async function SubscribersPage() {
    const session = await auth();
    if (!session) redirect("/login");

    const subscribers = await (prisma as any).newsletter.findMany({
        orderBy: { createdAt: 'desc' }
    });

    return (
        <div className="min-h-screen bg-[#fafafa] p-6 md:p-12">
            <div className="max-w-3xl mx-auto">

                <div className="mb-8">
                    <Link href="/admin" className="text-[10px] uppercase tracking-widest text-zinc-400 hover:text-black mb-4 inline-block transition-colors">
                        ← Back to Dashboard
                    </Link>
                    <h1 className="text-3xl font-serif">Newsletter Subscribers</h1>
                    <p className="text-zinc-500 text-sm mt-2">These people want to hear from Saaf Couture.</p>
                </div>

                <div className="bg-white border border-zinc-200/60 rounded-xl overflow-hidden shadow-sm">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-zinc-50 border-b border-zinc-100">
                            <tr>
                                <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-zinc-400 font-bold">Email Address</th>
                                <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-zinc-400 font-bold text-right">Joined Date</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-50">
                            {subscribers.map((sub: any) => (
                                <tr key={sub.id} className="hover:bg-zinc-50 transition-colors">
                                    <td className="p-6 text-sm font-medium text-zinc-900">{sub.email}</td>
                                    <td className="p-6 text-sm text-zinc-500 text-right">
                                        {new Date(sub.createdAt).toLocaleDateString('en-IN', {
                                            day: 'numeric',
                                            month: 'short',
                                            year: 'numeric'
                                        })}
                                    </td>
                                </tr>
                            ))}
                            {subscribers.length === 0 && (
                                <tr>
                                    <td colSpan={2} className="p-12 text-center text-zinc-400 text-sm italic">
                                        No subscribers yet.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}