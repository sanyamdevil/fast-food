"use client";

import { motion } from "framer-motion";
import { Phone, MapPin, Clock, Flame, ArrowLeft, MessageCircle } from "lucide-react";
import Link from "next/link";

export default function ContactPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Lora:ital,wght@0,400;0,500;1,400&display=swap');
        body { background: #0D0D0D; }
      `}</style>

      <div className="min-h-screen bg-[#0D0D0D] flex flex-col">
        {/* Header */}
        <div className="relative overflow-hidden bg-[#111111] border-b border-white/5 py-16 px-4">
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: "radial-gradient(circle at 20% 50%, #FF6B2B 0%, transparent 60%)",
            }}
          />
          <div className="max-w-3xl mx-auto relative z-10">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-white/50 hover:text-[#FF6B2B] transition-colors text-sm mb-8"
            >
              <ArrowLeft size={16} /> Back to home
            </Link>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-[#FF6B2B] flex items-center justify-center">
                <Flame size={20} className="text-white" />
              </div>
              <span className="text-white/60 font-medium">Aditi Fast Food</span>
            </div>
            <h1
              className="text-white text-5xl font-black mb-3"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Order & Contact
            </h1>
            <p className="text-white/50" style={{ fontFamily: "'Lora', serif" }}>
              Call us or visit — we are open every night at NIT Gate, Kurukshetra.
            </p>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 max-w-3xl mx-auto w-full px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">

            {/* Call to order */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-[#FF6B2B] rounded-3xl p-8"
            >
              <Phone size={32} className="text-white mb-4" />
              <h2 className="text-white text-2xl font-black mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
                Call to Order
              </h2>
              <p className="text-white/70 text-sm mb-6">Place your order on call — we will have it ready fresh!</p>
              <div className="flex flex-col gap-3">
                <a
                  href="tel:+918814971116"
                  className="flex items-center gap-3 bg-black/20 hover:bg-black/30 text-white px-5 py-3 rounded-2xl font-bold text-lg transition-colors"
                >
                  <Phone size={18} /> 88149-71116
                </a>
                <a
                  href="tel:+918168963447"
                  className="flex items-center gap-3 bg-black/20 hover:bg-black/30 text-white px-5 py-3 rounded-2xl font-bold text-lg transition-colors"
                >
                  <Phone size={18} /> 81689-63447
                </a>
              </div>
            </motion.div>

            {/* WhatsApp */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-[#1a1a1a] border border-white/10 rounded-3xl p-8"
            >
              <MessageCircle size={32} className="text-green-400 mb-4" />
              <h2 className="text-white text-2xl font-black mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
                WhatsApp Order
              </h2>
              <p className="text-white/50 text-sm mb-6">Send us a message with your order and we will confirm it.</p>
              <div className="flex flex-col gap-3">
                <a
                  href="https://wa.me/918814971116"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white px-5 py-3 rounded-2xl font-bold transition-colors"
                >
                  <MessageCircle size={18} /> WhatsApp 88149-71116
                </a>
                <a
                  href="https://wa.me/918168963447"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 bg-green-500/20 hover:bg-green-500/30 text-green-400 border border-green-500/30 px-5 py-3 rounded-2xl font-bold transition-colors"
                >
                  <MessageCircle size={18} /> WhatsApp 81689-63447
                </a>
              </div>
            </motion.div>
          </div>

          {/* Info cards row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-[#1a1a1a] border border-white/10 rounded-3xl p-6 flex gap-4 items-start"
            >
              <div className="text-[#FF6B2B] shrink-0 mt-1"><MapPin size={24} /></div>
              <div>
                <h3 className="text-white font-bold mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>Address</h3>
                <p className="text-white/50 text-sm leading-relaxed">NIT Gate, Kurukshetra<br />Haryana, India</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="bg-[#1a1a1a] border border-white/10 rounded-3xl p-6 flex gap-4 items-start"
            >
              <div className="text-[#FF6B2B] shrink-0 mt-1"><Clock size={24} /></div>
              <div>
                <h3 className="text-white font-bold mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>Timings</h3>
                <p className="text-white/50 text-sm leading-relaxed">
                  Open daily <br />
                  <span className="text-[#FF6B2B] font-semibold">7:00 PM – 2:00 AM</span>
                </p>
              </div>
            </motion.div>
          </div>

          {/* Quick menu reminder */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="bg-[#FF6B2B]/10 border border-[#FF6B2B]/20 rounded-3xl p-6 text-center"
          >
            <Flame size={24} className="text-[#FF6B2B] mx-auto mb-3" />
            <p className="text-white/70 text-sm" style={{ fontFamily: "'Lora', serif" }}>
              Not sure what to order?{" "}
              <Link href="/#menu" className="text-[#FF6B2B] font-semibold hover:underline">
                Check our full menu
              </Link>{" "}
              — starting from just ₹8!
            </p>
          </motion.div>

          {/* Developer credit */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 }}
            className="mt-10 text-center"
          >
            <p className="text-white/20 text-xs">
              Website developed by{" "}
              <a
                href="tel:+919466087812"
                className="text-white/30 hover:text-[#FF6B2B] transition-colors font-medium"
              >
                Sanyam · 94660-87812
              </a>
            </p>
          </motion.div>
        </div>

        {/* Footer */}
        <div className="border-t border-white/5 py-6 text-center">
          <p className="text-white/20 text-xs">© 2025 Aditi Fast Food · NIT Gate, Kurukshetra</p>
        </div>
      </div>
    </>
  );
}