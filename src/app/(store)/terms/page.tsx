// src/app/terms/page.tsx
import Link from "next/link";

export default function TermsPage() {
  return (
    <main className="min-h-screen w-full bg-white pb-24 pt-6 md:pt-12">
      <div className="mx-auto max-w-[800px] px-6 md:px-12">
        
        {/* HEADER */}
        <div className="mb-16 md:mb-24">
          <h1 className="font-sans text-3xl font-bold uppercase tracking-widest text-black md:text-5xl">
            Terms of Service
          </h1>
          <p className="mt-6 font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-black/40">
            Last Updated: March 2026
          </p>
        </div>

        {/* CONTENT */}
        <div className="flex flex-col gap-12 font-sans text-sm leading-relaxed text-black/70 md:text-base">
          
          <section className="flex flex-col gap-4">
            <h2 className="font-sans text-xs font-bold uppercase tracking-widest text-black">
              1. Agreement to Terms
            </h2>
            <p>
              These Terms of Service constitute a legally binding agreement made between you, whether personally or on behalf of an entity ("you") and Saaf Couture ("we," "us," or "our"), concerning your access to and use of the website as well as any other media form, media channel, mobile website, or mobile application related, linked, or otherwise connected thereto.
            </p>
          </section>

          <section className="flex flex-col gap-4">
            <h2 className="font-sans text-xs font-bold uppercase tracking-widest text-black">
              2. Intellectual Property Rights
            </h2>
            <p>
              Unless otherwise indicated, the Site is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site (collectively, the "Content") and the trademarks, service marks, and logos contained therein (the "Marks") are owned or controlled by us or licensed to us.
            </p>
          </section>

          <section className="flex flex-col gap-4">
            <h2 className="font-sans text-xs font-bold uppercase tracking-widest text-black">
              3. Products and Pricing
            </h2>
            <p>
              We make every effort to display as accurately as possible the colors, features, specifications, and details of the products available on the Site. However, we do not guarantee that the colors, features, specifications, and details of the products will be accurate, complete, reliable, current, or free of other errors. All pricing is subject to change without notice.
            </p>
          </section>

          <section className="flex flex-col gap-4">
            <h2 className="font-sans text-xs font-bold uppercase tracking-widest text-black">
              4. Governing Law
            </h2>
            <p>
              These Terms shall be governed by and defined following the laws of our operating jurisdiction. Saaf Couture and yourself irrevocably consent that the courts of our operating jurisdiction shall have exclusive jurisdiction to resolve any dispute which may arise in connection with these terms.
            </p>
          </section>

        </div>

        <div className="mt-20 border-t border-black/10 pt-10">
          <Link href="/" className="font-sans text-[10px] font-bold uppercase tracking-widest text-black transition-opacity hover:opacity-60">
            &larr; Back to Home
          </Link>
        </div>

      </div>
    </main>
  );
}