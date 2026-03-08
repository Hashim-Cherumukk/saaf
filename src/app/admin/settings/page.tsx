import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { PrismaClient } from "@prisma/client"; // IDE refresh
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import Link from "next/link";
import SubmitButton from "@/components/SubmitButton";
import { updateStoreSettings } from "../actions";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

export default async function SettingsPage() {
    const session = await auth();
    if (!session) redirect("/login");

    // Fetch the current settings. If none exist, we'll use blank defaults in the form.
    const settings = await (prisma as any).storeSettings.findUnique({
        where: { id: "saaf-settings" },
    });

    return (
        <div className="min-h-screen bg-[#fafafa] text-zinc-900 font-sans p-6 md:p-12">
            <div className="max-w-2xl mx-auto">

                {/* Header */}
                <div className="mb-8">
                    <Link href="/admin" className="text-[10px] uppercase tracking-widest text-zinc-400 hover:text-black mb-4 inline-block transition-colors">
                        ← Back to Dashboard
                    </Link>
                    <h1 className="text-3xl font-serif">Store Settings</h1>
                    <p className="text-zinc-500 text-sm mt-2">Manage your global storefront variables.</p>
                </div>

                {/* The Settings Form */}
                <form action={updateStoreSettings} className="bg-white border border-zinc-200/60 rounded-xl p-8 shadow-sm space-y-8">

                    <div className="space-y-6">

                        {/* Announcement Bar Toggle */}
                        <div className="p-4 bg-zinc-50 border border-zinc-100 rounded-lg">
                            <label className="flex items-center gap-3 text-sm font-medium cursor-pointer">
                                <input
                                    type="checkbox"
                                    name="isAnnouncementOn"
                                    value="on"
                                    defaultChecked={settings?.isAnnouncementOn ?? true}
                                    className="accent-black w-4 h-4"
                                />
                                Show Announcement Bar on Storefront
                            </label>
                            <p className="text-[10px] uppercase tracking-widest text-zinc-400 mt-2 ml-7">
                                Uncheck to hide the top black bar entirely.
                            </p>
                        </div>

                        {/* Announcement Text */}
                        <div>
                            <label className="block text-[10px] uppercase tracking-widest text-zinc-500 mb-2">
                                Announcement Text
                            </label>
                            <input
                                required
                                type="text"
                                name="announcementText"
                                className="w-full border-b border-zinc-200 pb-2 text-sm focus:outline-none focus:border-black transition-colors"
                            />
                        </div>

                        {/* Free Shipping Goal */}
                        <div>
                            <label className="block text-[10px] uppercase tracking-widest text-zinc-500 mb-2">
                                Free Shipping Threshold (₹)
                            </label>
                            <input
                                type="number"
                                step="0.01"
                                name="freeShippingGoal"
                                className="w-full border-b border-zinc-200 pb-2 text-sm focus:outline-none focus:border-black transition-colors"
                            />
                            <p className="text-[10px] text-zinc-400 mt-2">
                                This automatically updates the math in your customer's shopping cart and checkout.
                            </p>
                        </div>

                    </div>

                    <div className="pt-6 border-t border-zinc-100 flex justify-end">
                        <SubmitButton label="Save Settings" />
                    </div>

                </form>
            </div>
        </div>
    );
}