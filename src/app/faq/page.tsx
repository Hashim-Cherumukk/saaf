// src/app/faq/page.tsx
"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    category: "Shipping & Delivery",
    questions: [
      {
        q: "Do you ship internationally?",
        a: "Yes, we ship worldwide. International orders are typically delivered within 5-10 business days, depending on customs processing in your country.",
      },
      {
        q: "When will my order be dispatched?",
        a: "All orders are processed and shipped from our atelier within 1-2 business days. You will receive a tracking link via email once your order has left our facility.",
      },
      {
        q: "Will I have to pay customs duties?",
        a: "For international orders, customs duties and local taxes may apply upon delivery. These charges are the responsibility of the customer and are not included in our shipping fees.",
      },
    ],
  },
  {
    category: "Returns & Exchanges",
    questions: [
      {
        q: "What is your return policy?",
        a: "We accept returns within 14 days of delivery. Items must be unworn, unwashed, and in their original packaging with all tags attached. Fragrances must be unopened and in their original sealed cellophane.",
      },
      {
        q: "How do I initiate an exchange?",
        a: "To initiate an exchange for a different size or style, please email our customer care team at info@saafcouture.com with your order number. We will provide you with a return label and further instructions.",
      },
    ],
  },
  {
    category: "Product & Sizing",
    questions: [
      {
        q: "How do I know my size for a Qamees?",
        a: "Our sizing is based on height and chest measurements. Please refer to the detailed size guide available on every product page. If you are between sizes, we recommend sizing up for a more relaxed, traditional drape.",
      },
      {
        q: "Are your fragrances long-lasting?",
        a: "Yes. We use Extrait de Parfum concentration, meaning our fragrances contain a very high percentage of pure perfume oils. You can expect 10-12 hours of longevity on the skin, and even longer on fabric.",
      },
    ],
  },
];

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-black/10">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between py-6 text-left transition-colors hover:text-black/70"
      >
        <span className="font-sans text-sm font-bold tracking-wide text-black md:text-base">
          {question}
        </span>
        <span className="ml-6 shrink-0 text-black">
          {isOpen ? <Minus size={18} /> : <Plus size={18} />}
        </span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-40 pb-6 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <p className="font-sans text-sm leading-relaxed text-black/60 md:text-base">
          {answer}
        </p>
      </div>
    </div>
  );
}

export default function FaqPage() {
  return (
    <main className="min-h-screen w-full bg-white pb-24 pt-6 md:pt-12">
      <div className="mx-auto max-w-[800px] px-6 md:px-12">
        
        {/* 1. HEADER */}
        <div className="mb-16 text-center md:mb-24">
          <h1 className="font-sans text-3xl font-bold uppercase tracking-widest text-black md:text-5xl">
            Client Services
          </h1>
          <p className="mt-4 font-sans text-sm font-medium text-black/50">
            Frequently asked questions regarding shipping, returns, and our atelier.
          </p>
        </div>

        {/* 2. FAQ CATEGORIES & QUESTIONS */}
        <div className="flex flex-col gap-16">
          {faqs.map((section, index) => (
            <div key={index} className="flex flex-col">
              <h2 className="mb-6 font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-black/40">
                {section.category}
              </h2>
              <div className="flex flex-col border-t border-black/10">
                {section.questions.map((faq, i) => (
                  <FaqItem key={i} question={faq.q} answer={faq.a} />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* 3. STILL NEED HELP? CTA */}
        <div className="mt-20 flex flex-col items-center border-t border-black/10 pt-16 text-center">
          <p className="font-sans text-sm font-medium text-black/60">
            Cannot find the answer you are looking for?
          </p>
          <a
            href="mailto:info@saafcouture.com"
            className="mt-6 border-b border-black pb-1 font-sans text-[11px] font-bold uppercase tracking-widest text-black transition-opacity hover:opacity-60"
          >
            Contact Customer Care
          </a>
        </div>

      </div>
    </main>
  );
}