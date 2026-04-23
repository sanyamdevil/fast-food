"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import {
  MapPin, Phone, Clock, ChevronDown, Flame, Star, ArrowRight, Menu, X, Utensils, Egg, Leaf
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

/* ─── Data ─────────────────────────────────────────────── */
const MENU = {
  "Roti & Paratha": {
    icon: <Utensils size={18} />,
    color: "#FF6B2B",
    items: [
      { name: "Plain Roti", price: 8 },
      { name: "Butter Roti", price: 10 },
      { name: "Onion Roti", price: 15 },
      { name: "Payaz Paneer", price: 35 },
      { name: "Aaloo Paratha", price: 25 },
      { name: "Gobhi Paratha", price: 25 },
      { name: "Plain Paratha", price: 15 },
      { name: "Paneer Paratha", price: 45 },
      { name: "Aaloo Payaz Paratha", price: 30 },
      { name: "Mix Paratha", price: 30 },
    ],
  },
  "Rolls & Eggs": {
    icon: <Egg size={18} />,
    color: "#F5A623",
    items: [
      { name: "Paneer Roll", price: 60 },
      { name: "Egg Roll", price: 50 },
      { name: "Veg. Roll", price: 40 },
      { name: "Egg Paratha", price: 40 },
      { name: "Boiled Egg", price: 10, note: "per pc" },
    ],
  },
  "Snacks": {
    icon: <Flame size={18} />,
    color: "#E8340A",
    items: [
      { name: "Egg Maggi", price: 40 },
      { name: "Bread Omelette", price: 50 },
      { name: "Masala Omelette", price: 50 },
      { name: "Plain Omelette", price: 30 },
      { name: "Plain Maggi", price: 30 },
      { name: "Veg. Maggi", price: 50 },
      { name: "Paneer Maggi", price: 50 },
    ],
  },
  "Others": {
    icon: <Leaf size={18} />,
    color: "#4CAF50",
    items: [
      { name: "Plain Dahi", price: 30 },
      { name: "Boondi Raita", price: 30 },
      { name: "Water Bottle", price: null, note: "MRP" },
      { name: "Subzi + Roti", price: null, note: "Available on order" },
    ],
  },
};

const GALLERY = [
  { src: "/food5.jpg", alt: "Freshly made parathas" },
  { src: "/food6.jpg", alt: "Paneer parathas" },
  { src: "/food7.jpg", alt: "Boondi Raita " },
];

/* ─── Sub-components ────────────────────────────────────── */
function Navbar({ menuOpen, setMenuOpen }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-[#0D0D0D]/95 backdrop-blur-md shadow-lg shadow-black/40" : "bg-transparent"}`}
    >
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-full bg-[#FF6B2B] flex items-center justify-center">
            <Flame size={20} className="text-white" />
          </div>
          <span className="text-white font-bold text-xl tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
            Aditi <span className="text-[#FF6B2B]">Fast Food</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {["Menu", "Gallery", "About", "Contact"].map((item) => (
            <a
              key={item}
              href={item === "Contact" ? "/contact" : `#${item.toLowerCase()}`}
              className="text-white/70 hover:text-[#FF6B2B] transition-colors text-sm font-medium tracking-wide"
            >
              {item}
            </a>
          ))}
          <Link
            href="/contact"
            className="bg-[#FF6B2B] text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-[#e55d1f] transition-colors"
          >
            Order Now
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#0D0D0D]/98 border-t border-white/10"
          >
            <div className="flex flex-col px-6 py-6 gap-5">
              {["Menu", "Gallery", "About", "Contact"].map((item) => (
                <a
                  key={item}
                  href={item === "Contact" ? "/contact" : `#${item.toLowerCase()}`}
                  onClick={() => setMenuOpen(false)}
                  className="text-white/80 hover:text-[#FF6B2B] text-lg font-medium"
                >
                  {item}
                </a>
              ))}
              <Link
                href="/contact"
                onClick={() => setMenuOpen(false)}
                className="bg-[#FF6B2B] text-white px-5 py-3 rounded-full text-center font-semibold"
              >
                Order Now
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0D0D0D]">
      {/* Animated background blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: [0, 10, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, #FF6B2B 0%, transparent 70%)" }}
        />
        <motion.div
          animate={{ scale: [1, 1.3, 1], rotate: [0, -15, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full opacity-15"
          style={{ background: "radial-gradient(circle, #F5A623 0%, transparent 70%)" }}
        />
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: "linear-gradient(#FF6B2B 1px, transparent 1px), linear-gradient(90deg, #FF6B2B 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <motion.div style={{ y, opacity }} className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="inline-flex items-center gap-2 bg-[#FF6B2B]/15 border border-[#FF6B2B]/30 text-[#FF6B2B] px-4 py-1.5 rounded-full text-sm font-semibold mb-8 tracking-wider uppercase"
        >
          <Flame size={14} /> Open 7 PM – 2 AM
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.7 }}
          className="text-white mb-4 leading-none"
          style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(3rem, 10vw, 7rem)", fontWeight: 900 }}
        >
          Aditi{" "}
          <span
            className="relative inline-block"
            style={{ color: "#FF6B2B", WebkitTextStroke: "1px #FF6B2B" }}
          >
            Fast Food
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-white/60 text-lg md:text-xl max-w-xl mx-auto mb-10 leading-relaxed"
          style={{ fontFamily: "'Lora', serif" }}
        >
          Freshly made rotis, parathas & rolls — hot off the tawa every night at NIT Gate, Kurukshetra.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link
            href="/contact"
            className="group flex items-center gap-2 bg-[#FF6B2B] hover:bg-[#e55d1f] text-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 shadow-lg shadow-[#FF6B2B]/30 hover:shadow-[#FF6B2B]/50 hover:scale-105"
          >
            Order Food Now
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <a
            href="#menu"
            className="flex items-center gap-2 border border-white/20 hover:border-[#FF6B2B]/60 text-white/80 hover:text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300"
          >
            View Menu
          </a>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.6 }}
          className="mt-16 flex justify-center gap-12"
        >
          {[
            { value: "₹8", label: "Starting from" },
            { value: "7PM", label: "Opens daily" },
            { value: "2AM", label: "Late night" },
          ].map((s, i) => (
            <div key={i} className="text-center">
              <div className="text-[#FF6B2B] font-black text-2xl" style={{ fontFamily: "'Playfair Display', serif" }}>{s.value}</div>
              <div className="text-white/40 text-xs uppercase tracking-widest mt-1">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/30"
      >
        <ChevronDown size={28} />
      </motion.div>
    </section>
  );
}

function ComboSection() {
  return (
    <section className="py-10 bg-[#FF6B2B]">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-3 bg-black/20 rounded-2xl px-8 py-5">
            <Star size={24} className="text-yellow-300 fill-yellow-300" />
            <div>
              <div className="text-white font-black text-xl" style={{ fontFamily: "'Playfair Display', serif" }}>
                Combo Pack — ₹90/-
              </div>
              <div className="text-white/80 text-sm mt-0.5">2 Paratha + 1 Cup Dahi + 1 Tea or Coffee</div>
            </div>
            <Star size={24} className="text-yellow-300 fill-yellow-300" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function MenuSection() {
  const [active, setActive] = useState("Roti & Paratha");

  return (
    <section id="menu" className="py-24 bg-[#0D0D0D]">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-[#FF6B2B] uppercase tracking-[0.3em] text-sm font-bold mb-3">What We Serve</p>
          <h2 className="text-white text-5xl font-black" style={{ fontFamily: "'Playfair Display', serif" }}>
            Our Menu
          </h2>
          <div className="w-16 h-1 bg-[#FF6B2B] mx-auto mt-4 rounded-full" />
        </motion.div>

        {/* Category tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {Object.keys(MENU).map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 ${
                active === cat
                  ? "bg-[#FF6B2B] text-white shadow-lg shadow-[#FF6B2B]/30 scale-105"
                  : "bg-white/5 text-white/60 border border-white/10 hover:border-[#FF6B2B]/40 hover:text-white"
              }`}
            >
              {MENU[cat].icon} {cat}
            </button>
          ))}
        </div>

        {/* Menu items grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {MENU[active].items.map((item, i) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center justify-between bg-white/5 hover:bg-white/8 border border-white/10 hover:border-[#FF6B2B]/30 rounded-xl px-5 py-4 group transition-all duration-200"
              >
                <div>
                  <div className="text-white font-semibold group-hover:text-[#FF6B2B] transition-colors">
                    {item.name}
                  </div>
                  {item.note && (
                    <div className="text-white/40 text-xs mt-0.5">{item.note}</div>
                  )}
                </div>
                <div
                  className="font-black text-lg shrink-0"
                  style={{ color: MENU[active].color, fontFamily: "'Playfair Display', serif" }}
                >
                  {item.price ? `₹${item.price}` : item.note || "—"}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-[#FF6B2B] hover:bg-[#e55d1f] text-white px-8 py-4 rounded-full font-bold transition-all duration-300 hover:scale-105 shadow-lg shadow-[#FF6B2B]/30"
          >
            Order from this menu <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

function GallerySection() {
  return (
    <section id="gallery" className="py-24 bg-[#111111]">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-[#FF6B2B] uppercase tracking-[0.3em] text-sm font-bold mb-3">Fresh & Hot</p>
          <h2 className="text-white text-5xl font-black" style={{ fontFamily: "'Playfair Display', serif" }}>
            Food Gallery
          </h2>
          <div className="w-16 h-1 bg-[#FF6B2B] mx-auto mt-4 rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {GALLERY.map((img, i) => (
            <motion.div
              key={img.src}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              whileHover={{ y: -6 }}
              className="relative overflow-hidden rounded-2xl aspect-[4/3] bg-white/5 group"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
                <span className="text-white font-semibold">{img.alt}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section id="about" className="py-24 bg-[#0D0D0D]">
      <div className="max-w-5xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-[#FF6B2B] uppercase tracking-[0.3em] text-sm font-bold mb-3">Our Story</p>
            <h2 className="text-white text-4xl font-black mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
              Night Street Food,<br />Made with Love
            </h2>
            <p className="text-white/60 leading-relaxed mb-6" style={{ fontFamily: "'Lora', serif" }}>
              Aditi Fast Food has been serving freshly made rotis and parathas to students, workers, and night owls at NIT Gate, Kurukshetra. Every item is prepared fresh to order — no shortcuts, just honest desi flavors.
            </p>
            <p className="text-white/60 leading-relaxed" style={{ fontFamily: "'Lora', serif" }}>
              Whether you want a simple butter roti or a loaded paneer paratha, we have got you covered from 7 PM till 2 in the morning.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-4"
          >
            {[
              { icon: <Clock size={22} />, title: "Open Late", desc: "7 PM to 2 AM, every day" },
              { icon: <Flame size={22} />, title: "Fresh Always", desc: "Made to order, every time" },
              { icon: <MapPin size={22} />, title: "Easy to Find", desc: "NIT Gate, Kurukshetra" },
              { icon: <Star size={22} />, title: "Great Value", desc: "Starting at just ₹8" },
            ].map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:border-[#FF6B2B]/30 transition-colors"
              >
                <div className="text-[#FF6B2B] mb-3">{card.icon}</div>
                <div className="text-white font-bold mb-1">{card.title}</div>
                <div className="text-white/50 text-sm">{card.desc}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section id="contact" className="py-24 bg-[#111111]">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-[#FF6B2B] uppercase tracking-[0.3em] text-sm font-bold mb-3">Get in Touch</p>
          <h2 className="text-white text-5xl font-black mb-12" style={{ fontFamily: "'Playfair Display', serif" }}>
            Find Us & Order
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              {
                icon: <MapPin size={28} />,
                title: "Location",
                lines: ["NIT Gate, Kurukshetra", "Haryana, India"],
              },
              {
                icon: <Phone size={28} />,
                title: "Call to Order",
                lines: ["88149-71116", "81689-63447"],
              },
              {
                icon: <Clock size={28} />,
                title: "Timings",
                lines: ["7:00 PM – 2:00 AM", "Open daily"],
              },
            ].map((c, i) => (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-[#FF6B2B]/40 transition-colors"
              >
                <div className="text-[#FF6B2B] flex justify-center mb-4">{c.icon}</div>
                <div className="text-white font-bold text-lg mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>{c.title}</div>
                {c.lines.map((l, j) => (
                  <div key={j} className="text-white/60 text-sm">{l}</div>
                ))}
              </motion.div>
            ))}
          </div>

          <Link
            href="/contact"
            className="inline-flex items-center gap-3 bg-[#FF6B2B] hover:bg-[#e55d1f] text-white px-10 py-5 rounded-full font-bold text-xl transition-all duration-300 hover:scale-105 shadow-2xl shadow-[#FF6B2B]/30"
          >
            <Phone size={22} /> Order Food Now
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-[#0A0A0A] border-t border-white/5 py-8">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-[#FF6B2B] flex items-center justify-center">
            <Flame size={14} className="text-white" />
          </div>
          <span className="text-white/60 text-sm" style={{ fontFamily: "'Playfair Display', serif" }}>
            Aditi Fast Food
          </span>
        </div>
        <p className="text-white/30 text-xs">© 2025 Aditi Fast Food. NIT Gate, Kurukshetra.</p>
        <div className="flex gap-4 text-white/30 text-xs">
          <a href="#menu" className="hover:text-white/60">Menu</a>
          <Link href="/contact" className="hover:text-white/60">Order</Link>
        </div>
      </div>
    </footer>
  );
}

/* ─── Page ──────────────────────────────────────────────── */
export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* Google Fonts */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Lora:ital,wght@0,400;0,500;1,400&display=swap');
        html { scroll-behavior: smooth; }
        body { background: #0D0D0D; }
      `}</style>

      <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <HeroSection />
      <ComboSection />
      <MenuSection />
      <GallerySection />
      <AboutSection />
      <ContactSection />
      <Footer />
    </>
  );
}