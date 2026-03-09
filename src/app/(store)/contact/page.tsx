// src/app/contact/page.tsx
"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function ContactPage() {
  return (
    <main className="min-h-screen w-full bg-white pb-20 pt-6 md:pt-12">
      <div className="mx-auto max-w-[1200px] px-6 md:px-12">
        
        {/* 1. HEADER */}
        <div className="mb-16 md:mb-24">
          <h1 className="font-sans text-3xl font-bold uppercase tracking-widest text-black md:text-5xl">
            Contact Us
          </h1>
          <p className="mt-4 max-w-md font-sans text-sm font-medium leading-relaxed text-black/60">
            For inquiries regarding orders, sizing, or our atelier process, please reach out to our team. We aim to respond within 24 hours.
          </p>
        </div>

        {/* 2. CONTACT LAYOUT (Mobile: Stacked, Desktop: Side-by-Side) */}
        <div className="flex flex-col gap-16 md:flex-row md:gap-24">
          
          {/* LEFT: INFO COLUMN */}
          <div className="flex flex-col gap-10 md:w-1/3">
            
            {/* Contact Details */}
            <div className="flex flex-col gap-2">
              <h2 className="font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-black/40">
                Customer Care
              </h2>
              <a href="mailto:hayamperfume@gmail.com" className="font-sans text-sm font-medium text-black hover:underline underline-offset-4">
                hayamperfume@gmail.com
              </a>
              <a href="https://wa.me/+916235114104" target="_blank" rel="noopener noreferrer" className="font-sans text-sm font-medium text-black hover:underline underline-offset-4">
                +91 6235114104 (WhatsApp)
              </a>
            </div>

            {/* Atelier Location */}
            <div className="flex flex-col gap-2">
              <h2 className="font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-black/40">
                Atelier Location
              </h2>
              <a 
                href="https://maps.google.com/?q=Kozhikode,+Kerala" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="font-sans text-sm font-medium text-black leading-relaxed hover:underline underline-offset-4"
              >
                Saaf Couture<br />
                Vengara Oorakam,oppo. Malabar college of advanced studies<br />
                Malappuram Kerala 676304
              </a>
            </div>

            {/* Operating Hours */}
            <div className="flex flex-col gap-2">
              <h2 className="font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-black/40">
                Atelier Hours
              </h2>
              <p className="font-sans text-sm font-medium text-black">
                Monday – Friday <br />
                9:00 AM – 6:00 PM (IST)
              </p>
            </div>

            {/* Social Links */}
            <div className="flex flex-col gap-2">
              <h2 className="font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-black/40">
                Social
              </h2>
              <a href="https://www.instagram.com/saaf.couture/" target="_blank" rel="noopener noreferrer" className="font-sans text-sm font-medium text-black hover:underline underline-offset-4">
                Instagram (@Saaf.Couture)
              </a>
            </div>

          </div>

          {/* RIGHT: FORM COLUMN */}
          <div className="md:w-2/3">
            <form className="flex flex-col gap-8" onSubmit={(e) => e.preventDefault()}>
              
              {/* Name & Email Row */}
              <div className="flex flex-col gap-8 md:flex-row">
                <div className="flex flex-col gap-2 md:w-1/2">
                  <label htmlFor="name" className="font-sans text-[10px] font-bold uppercase tracking-widest text-black">
                    Name
                  </label>
                  <input 
                    type="text" 
                    id="name"
                    required
                    className="border-b border-black/20 bg-transparent py-3 font-sans text-sm text-black outline-none transition-colors focus:border-black"
                  />
                </div>
                
                <div className="flex flex-col gap-2 md:w-1/2">
                  <label htmlFor="email" className="font-sans text-[10px] font-bold uppercase tracking-widest text-black">
                    Email
                  </label>
                  <input 
                    type="email" 
                    id="email"
                    required
                    className="border-b border-black/20 bg-transparent py-3 font-sans text-sm text-black outline-none transition-colors focus:border-black"
                  />
                </div>
              </div>

              {/* Order Number (Optional) */}
              <div className="flex flex-col gap-2">
                <label htmlFor="order" className="font-sans text-[10px] font-bold uppercase tracking-widest text-black">
                  Order Number (Optional)
                </label>
                <input 
                  type="text" 
                  id="order"
                  className="border-b border-black/20 bg-transparent py-3 font-sans text-sm text-black outline-none transition-colors focus:border-black"
                />
              </div>

              {/* Message */}
              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="font-sans text-[10px] font-bold uppercase tracking-widest text-black">
                  Message
                </label>
                <textarea 
                  id="message"
                  required
                  rows={4}
                  className="resize-none border-b border-black/20 bg-transparent py-3 font-sans text-sm text-black outline-none transition-colors focus:border-black"
                ></textarea>
              </div>

              {/* Submit Button */}
              <button 
                type="submit" 
                className="group mt-4 flex w-fit items-center gap-4 border border-black px-10 py-4 font-sans text-[11px] font-bold uppercase tracking-widest text-black transition-colors hover:bg-black hover:text-white"
              >
                Send Message
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-2" />
              </button>
              
            </form>
          </div>

        </div>
      </div>
    </main>
  );
}