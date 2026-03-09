// src/app/returns/page.tsx
"use client";

import { useState } from "react";
import { ArrowRight, RefreshCcw, ShieldCheck, Truck, MessageCircle } from "lucide-react";

export default function ReturnsPage() {
  const [orderNumber, setOrderNumber] = useState("");
  const [email, setEmail] = useState("");

  const handleStartReturn = (e: React.FormEvent) => {
    e.preventDefault();
    // Logic to verify order would go here
    alert("Order found. Redirecting to return labels...");
  };

  const handleWhatsAppReturn = () => {
    const msg = `*RETURN REQUEST | SAAF COUTURE*%0A%0AOrder Number: ${orderNumber || "[Order #]"}%0AReason for return: `;
    window.open(`https://wa.me/+916235114104?text=${msg}`, "_blank");
  };

  return (
    <main className="min-h-screen bg-white pt-6 pb-20 px-12">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="font-sans text-2xl font-bold uppercase tracking-[0.3em] text-black mb-4">
            Returns & Exchanges
          </h1>
          <p className="font-sans text-[11px] uppercase tracking-widest text-black/50 max-w-md mx-auto leading-relaxed">
            We offer a seamless 14-day return policy for all unworn items in original packaging.
          </p>
        </div>

        {/* Policy Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {[
            { icon: <RefreshCcw size={20} />, title: "14-Day Window", desc: "Return within 14 days of delivery." },
            { icon: <ShieldCheck size={20} />, title: "Quality Check", desc: "Items must be unworn with tags." },
            { icon: <Truck size={20} />, title: "Easy Shipping", desc: "Print your label and drop it off." },
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center text-center p-8 border border-black/5 bg-gray-50/30">
              <div className="mb-4 text-black">{item.icon}</div>
              <h3 className="font-sans text-[10px] font-bold uppercase tracking-widest mb-2">{item.title}</h3>
              <p className="font-sans text-[10px] text-black/40 leading-relaxed uppercase tracking-wider">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* The Return Portal Container */}
        <div className="grid md:grid-cols-2 gap-12 items-start bg-white border border-black/10 p-8 md:p-12 shadow-sm">
          
          {/* Form Side */}
          <div>
            <h2 className="font-sans text-xs font-bold uppercase tracking-widest mb-6">Start a Return</h2>
            <form onSubmit={handleStartReturn} className="space-y-6">
              <div>
                <label className="block font-sans text-[9px] font-bold uppercase tracking-widest text-black/40 mb-2">Order Number</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. SAAF-1001"
                  className="w-full border-b border-black/10 py-3 font-sans text-xs focus:border-black outline-none transition-colors"
                  value={orderNumber}
                  onChange={(e) => setOrderNumber(e.target.value)}
                />
              </div>
              <div>
                <label className="block font-sans text-[9px] font-bold uppercase tracking-widest text-black/40 mb-2">Email Address</label>
                <input 
                  type="email" 
                  required
                  placeholder="The email used for purchase"
                  className="w-full border-b border-black/10 py-3 font-sans text-xs focus:border-black outline-none transition-colors"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <button 
                type="submit"
                className="w-full bg-black text-white py-4 font-sans text-[10px] font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:bg-black/90 transition-all"
              >
                Find My Order <ArrowRight size={14} />
              </button>
            </form>
          </div>

          {/* Contact/Help Side */}
          <div className="space-y-8 md:border-l md:border-black/5 md:pl-12">
            <div>
              <h2 className="font-sans text-xs font-bold uppercase tracking-widest mb-4">Need Immediate Help?</h2>
              <p className="font-sans text-[11px] text-black/60 leading-relaxed mb-6">
                Our concierge team is available via WhatsApp to assist with size exchanges or specific return inquiries.
              </p>
              <button 
                onClick={handleWhatsAppReturn}
                className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest border border-black px-6 py-4 hover:bg-black hover:text-white transition-all w-full justify-center"
              >
                <MessageCircle size={16} /> Chat with Concierge
              </button>
            </div>

            <div className="pt-6 border-t border-black/5">
              <h3 className="font-sans text-[10px] font-bold uppercase tracking-widest mb-2">Non-Returnable Items</h3>
              <ul className="font-sans text-[9px] text-black/40 uppercase tracking-widest space-y-1">
                <li>• Final Sale Items</li>
                <li>• Custom Tailored Qamees</li>
                <li>• Opened Fragrance Bottles</li>
              </ul>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}