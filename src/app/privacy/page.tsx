// src/app/privacy/page.tsx
import Link from "next/link";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen w-full bg-white pb-24 pt-6 md:pt-12">
      <div className="mx-auto max-w-[800px] px-6 md:px-12">
        
        {/* HEADER */}
        <div className="mb-16 md:mb-24">
          <h1 className="font-sans text-3xl font-bold uppercase tracking-widest text-black md:text-5xl">
            Privacy Policy
          </h1>
          <p className="mt-6 font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-black/40">
            Last Updated: March 2026
          </p>
        </div>

        {/* CONTENT */}
        <div className="flex flex-col gap-12 font-sans text-sm leading-relaxed text-black/70 md:text-base">
          
          <section className="flex flex-col gap-4">
            <h2 className="font-sans text-xs font-bold uppercase tracking-widest text-black">
              1. Introduction
            </h2>
            <p>
              Saaf Couture ("we," "our," or "us") respects your privacy and is committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website and tell you about your privacy rights.
            </p>
          </section>

          <section className="flex flex-col gap-4">
            <h2 className="font-sans text-xs font-bold uppercase tracking-widest text-black">
              2. Information We Collect
            </h2>
            <p>
              We may collect, use, store, and transfer different kinds of personal data about you which we have grouped together as follows:
            </p>
            <ul className="ml-4 list-disc space-y-2 text-black/60">
              <li><strong>Identity Data:</strong> includes first name, last name, username or similar identifier.</li>
              <li><strong>Contact Data:</strong> includes billing address, delivery address, email address, and telephone numbers.</li>
              <li><strong>Financial Data:</strong> includes payment card details (processed securely via our third-party payment gateways).</li>
              <li><strong>Transaction Data:</strong> includes details about payments to and from you and other details of products you have purchased from us.</li>
            </ul>
          </section>

          <section className="flex flex-col gap-4">
            <h2 className="font-sans text-xs font-bold uppercase tracking-widest text-black">
              3. How We Use Your Data
            </h2>
            <p>
              We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
            </p>
            <ul className="ml-4 list-disc space-y-2 text-black/60">
              <li>Where we need to perform the contract we are about to enter into or have entered into with you (e.g., processing your order).</li>
              <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
              <li>Where we need to comply with a legal obligation.</li>
            </ul>
          </section>

          <section className="flex flex-col gap-4">
            <h2 className="font-sans text-xs font-bold uppercase tracking-widest text-black">
              4. Contact Details
            </h2>
            <p>
              If you have any questions about this privacy policy or our privacy practices, please contact us at:
            </p>
            <p className="mt-2 font-medium text-black">
              Email: <a href="mailto:info@saafcouture.com" className="underline underline-offset-4">info@saafcouture.com</a>
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