"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import {
  MapPin, Phone, Clock, ChevronDown, Flame, Star, ArrowRight,
  Menu, X, Utensils, Egg, Leaf
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";

/* ─── Data ─────────────────────────────────────────────── */
const MENU = {
  "Roti & Paratha": {
    icon: <Utensils size={16} />,
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
    icon: <Egg size={16} />,
    color: "#F5A623",
    items: [
      { name: "Paneer Roll", price: 60 },
      { name: "Egg Roll", price: 50 },
      { name: "Veg. Roll", price: 40 },
      { name: "Egg Paratha", price: 40 },
      { name: "Boiled Egg", price: 10, note: "per pc" },
    ],
  },
  Snacks: {
    icon: <Flame size={16} />,
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
  Others: {
    icon: <Leaf size={16} />,
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
  { src: "/food7.jpg", alt: "Boondi Raita" },
];

/* ─── Navbar ─────────────────────────────────────────────── */
function Navbar({ menuOpen, setMenuOpen }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // Manually scroll to section then close the drawer
  const handleNavClick = (e, id) => {
    e.preventDefault();
    setMenuOpen(false);
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        const top = el.getBoundingClientRect().top + window.pageYOffset - 70;
        window.scrollTo({ top, behavior: "smooth" });
      }
    }, 280); // wait for drawer close animation
  };

  const close = () => setMenuOpen(false);

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0D0D0D]/95 backdrop-blur-md shadow-lg shadow-black/40"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#FF6B2B] flex items-center justify-center">
            <Flame size={18} className="text-white" />
          </div>
          <span
            className="text-white font-bold text-lg sm:text-xl tracking-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Aditi <span className="text-[#FF6B2B]">Fast Food</span>
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          {["Menu", "Gallery", "About", "Contact"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-white/70 hover:text-[#FF6B2B] transition-colors text-sm font-medium tracking-wide"
            >
              {item}
            </a>
          ))}
          <a
            href="/contact"
            className="bg-[#FF6B2B] text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-[#e55d1f] active:scale-95 transition-all"
          >
            Order Now
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-white p-2 rounded-lg bg-white/5 active:bg-white/10 transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          <AnimatePresence mode="wait" initial={false}>
            {menuOpen ? (
              <motion.span
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.18 }}
                style={{ display: "block" }}
              >
                <X size={22} />
              </motion.span>
            ) : (
              <motion.span
                key="open"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.18 }}
                style={{ display: "block" }}
              >
                <Menu size={22} />
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="md:hidden bg-[#0D0D0D]/98 border-t border-white/10 overflow-hidden"
          >
            <div className="flex flex-col px-6 py-6 gap-1">
              {["Menu", "Gallery", "About", "Contact"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={(e) => handleNavClick(e, item.toLowerCase())}
                  className="text-white/80 text-lg font-medium py-3 border-b border-white/5 last:border-b-0 transition-colors active:text-[#FF6B2B]"
                >
                  {item}
                </a>
              ))}
              <a
                href="tel:8814971116"
                onClick={close}
                className="mt-4 bg-[#FF6B2B] text-white px-5 py-4 rounded-full text-center font-bold text-base active:bg-[#e55d1f]"
              >
                📞 88149-71116
              </a>
              <a
                href="tel:8168963447"
                onClick={close}
                className="mt-2 border border-[#FF6B2B]/40 text-[#FF6B2B] px-5 py-3 rounded-full text-center font-semibold text-sm"
              >
                📞 81689-63447
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

/* ─── Hero ─────────────────────────────────────────────── */
function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative min-h-[100svh] flex items-center justify-center overflow-hidden bg-[#0D0D0D]"
    >
      {/* Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: [0, 10, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-40 -left-40 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, #FF6B2B 0%, transparent 70%)" }}
        />
        <motion.div
          animate={{ scale: [1, 1.3, 1], rotate: [0, -15, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute -bottom-40 -right-40 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] rounded-full"
          style={{ background: "radial-gradient(circle, #F5A623 0%, transparent 70%)", opacity: 0.15 }}
        />
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "linear-gradient(#FF6B2B 1px, transparent 1px), linear-gradient(90deg, #FF6B2B 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 text-center px-5 sm:px-6 max-w-5xl mx-auto pt-20 pb-16"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="inline-flex items-center gap-2 bg-[#FF6B2B]/15 border border-[#FF6B2B]/30 text-[#FF6B2B] px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold mb-6 sm:mb-8 tracking-wider uppercase"
        >
          <Flame size={13} /> Open 7 PM – 2 AM
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.7 }}
          className="text-white mb-4 leading-none"
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(2.6rem, 12vw, 7rem)",
            fontWeight: 900,
          }}
        >
          Aditi <span className="text-[#FF6B2B]">Fast Food</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-white/60 text-base sm:text-lg md:text-xl max-w-xl mx-auto mb-8 sm:mb-10 leading-relaxed"
          style={{ fontFamily: "'Lora', serif" }}
        >
          Freshly made rotis, parathas &amp; rolls — hot off the tawa every
          night at NIT Gate, Kurukshetra.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center"
        >
          <a
            href="/contact"
            className="group flex items-center justify-center gap-2 bg-[#FF6B2B] hover:bg-[#e55d1f] active:bg-[#e55d1f] active:scale-95 text-white px-7 py-4 rounded-full font-bold text-base sm:text-lg transition-all duration-300 shadow-lg shadow-[#FF6B2B]/30"
          >
            Order Food Now
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#menu"
            className="flex items-center justify-center gap-2 border border-white/20 hover:border-[#FF6B2B]/60 active:border-[#FF6B2B]/60 text-white/80 hover:text-white px-7 py-4 rounded-full font-semibold text-base sm:text-lg transition-all duration-300"
          >
            View Menu
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.6 }}
          className="mt-12 sm:mt-16 flex justify-center gap-8 sm:gap-12"
        >
          {[
            { value: "₹8", label: "Starting from" },
            { value: "7PM", label: "Opens daily" },
            { value: "2AM", label: "Late night" },
          ].map((s, i) => (
            <div key={i} className="text-center">
              <div
                className="text-[#FF6B2B] font-black text-xl sm:text-2xl"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {s.value}
              </div>
              <div className="text-white/40 text-[10px] sm:text-xs uppercase tracking-widest mt-1">
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/30"
      >
        <ChevronDown size={26} />
      </motion.div>
    </section>
  );
}

/* ─── Combo ─────────────────────────────────────────────── */
function ComboSection() {
  return (
    <section className="py-8 sm:py-10 bg-[#FF6B2B]">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-3 bg-black/20 rounded-2xl px-5 sm:px-8 py-4 sm:py-5">
            <Star size={20} className="text-yellow-300 fill-yellow-300 shrink-0" />
            <div>
              <div
                className="text-white font-black text-base sm:text-xl"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Combo Pack — ₹90/-
              </div>
              <div className="text-white/80 text-xs sm:text-sm mt-0.5">
                2 Paratha + 1 Cup Dahi + 1 Tea or Coffee
              </div>
            </div>
            <Star size={20} className="text-yellow-300 fill-yellow-300 shrink-0" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Menu ─────────────────────────────────────────────── */
function MenuSection() {
  const [active, setActive] = useState("Roti & Paratha");

  return (
    <section id="menu" className="py-16 sm:py-24 bg-[#0D0D0D]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10 sm:mb-16"
        >
          <p className="text-[#FF6B2B] uppercase tracking-[0.3em] text-xs sm:text-sm font-bold mb-3">
            What We Serve
          </p>
          <h2
            className="text-white text-4xl sm:text-5xl font-black"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Our Menu
          </h2>
          <div className="w-14 h-1 bg-[#FF6B2B] mx-auto mt-4 rounded-full" />
        </motion.div>

        {/* Category tabs — scrollable on mobile */}
        <div className="flex gap-2 sm:gap-3 mb-8 sm:mb-12 overflow-x-auto pb-2 sm:flex-wrap sm:justify-center scrollbar-hide">
          {Object.keys(MENU).map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`flex items-center gap-1.5 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full font-semibold text-xs sm:text-sm transition-all duration-300 whitespace-nowrap shrink-0 ${
                active === cat
                  ? "bg-[#FF6B2B] text-white shadow-lg shadow-[#FF6B2B]/30 scale-105"
                  : "bg-white/5 text-white/60 border border-white/10 hover:border-[#FF6B2B]/40 hover:text-white"
              }`}
            >
              {MENU[cat].icon} {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.28 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4"
          >
            {MENU[active].items.map((item, i) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                className="flex items-center justify-between bg-white/5 hover:bg-white/8 border border-white/10 hover:border-[#FF6B2B]/30 rounded-xl px-4 sm:px-5 py-3.5 sm:py-4 group transition-all duration-200"
              >
                <div className="pr-3">
                  <div className="text-white font-semibold text-sm sm:text-base group-hover:text-[#FF6B2B] transition-colors">
                    {item.name}
                  </div>
                  {item.note && (
                    <div className="text-white/40 text-xs mt-0.5">{item.note}</div>
                  )}
                </div>
                <div
                  className="font-black text-base sm:text-lg shrink-0"
                  style={{
                    color: MENU[active].color,
                    fontFamily: "'Playfair Display', serif",
                  }}
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
          className="text-center mt-10 sm:mt-12"
        >
          <a
            href="/contact"
            className="inline-flex items-center gap-2 bg-[#FF6B2B] hover:bg-[#e55d1f] active:bg-[#e55d1f] active:scale-95 text-white px-7 py-3.5 sm:py-4 rounded-full font-bold text-sm sm:text-base transition-all duration-300 hover:scale-105 shadow-lg shadow-[#FF6B2B]/30"
          >
            Order from this menu <ArrowRight size={16} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Gallery ─────────────────────────────────────────────── */
function GallerySection() {
  return (
    <section id="gallery" className="py-16 sm:py-24 bg-[#111111]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10 sm:mb-16"
        >
          <p className="text-[#FF6B2B] uppercase tracking-[0.3em] text-xs sm:text-sm font-bold mb-3">
            Fresh &amp; Hot
          </p>
          <h2
            className="text-white text-4xl sm:text-5xl font-black"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Food Gallery
          </h2>
          <div className="w-14 h-1 bg-[#FF6B2B] mx-auto mt-4 rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
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
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              {/* Caption always visible on mobile */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-4 sm:p-5 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-white font-semibold text-sm">{img.alt}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── About ─────────────────────────────────────────────── */
function AboutSection() {
  return (
    <section id="about" className="py-16 sm:py-24 bg-[#0D0D0D]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-[#FF6B2B] uppercase tracking-[0.3em] text-xs sm:text-sm font-bold mb-3">
              Our Story
            </p>
            <h2
              className="text-white text-3xl sm:text-4xl font-black mb-5 sm:mb-6"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Night Street Food,
              <br />
              Made with Love
            </h2>
            <p
              className="text-white/60 leading-relaxed mb-4 sm:mb-6 text-sm sm:text-base"
              style={{ fontFamily: "'Lora', serif" }}
            >
              Aditi Fast Food has been serving freshly made rotis and parathas
              to students, workers, and night owls at NIT Gate, Kurukshetra.
              Every item is prepared fresh to order — no shortcuts, just honest
              desi flavors.
            </p>
            <p
              className="text-white/60 leading-relaxed text-sm sm:text-base"
              style={{ fontFamily: "'Lora', serif" }}
            >
              Whether you want a simple butter roti or a loaded paneer paratha,
              we have got you covered from 7 PM till 2 in the morning.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-3 sm:gap-4"
          >
            {[
              { icon: <Clock size={20} />, title: "Open Late", desc: "7 PM to 2 AM, every day" },
              { icon: <Flame size={20} />, title: "Fresh Always", desc: "Made to order, every time" },
              { icon: <MapPin size={20} />, title: "Easy to Find", desc: "NIT Gate, Kurukshetra" },
              { icon: <Star size={20} />, title: "Great Value", desc: "Starting at just ₹8" },
            ].map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-5 hover:border-[#FF6B2B]/30 transition-colors"
              >
                <div className="text-[#FF6B2B] mb-2 sm:mb-3">{card.icon}</div>
                <div className="text-white font-bold text-sm sm:text-base mb-1">{card.title}</div>
                <div className="text-white/50 text-xs sm:text-sm">{card.desc}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ─── Contact ─────────────────────────────────────────────── */
function ContactSection() {
  return (
    <section id="contact" className="py-16 sm:py-24 bg-[#111111]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-[#FF6B2B] uppercase tracking-[0.3em] text-xs sm:text-sm font-bold mb-3">
            Get in Touch
          </p>
          <h2
            className="text-white text-4xl sm:text-5xl font-black mb-8 sm:mb-12"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Find Us &amp; Order
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-10 sm:mb-12">
            {[
              {
                icon: <MapPin size={26} />,
                title: "Location",
                lines: ["NIT Gate, Kurukshetra", "Haryana, India"],
                links: [null, null],
              },
              {
                icon: <Phone size={26} />,
                title: "Call to Order",
                lines: ["88149-71116", "81689-63447"],
                links: ["tel:8814971116", "tel:8168963447"],
              },
              {
                icon: <Clock size={26} />,
                title: "Timings",
                lines: ["7:00 PM – 2:00 AM", "Open daily"],
                links: [null, null],
              },
            ].map((c, i) => (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 hover:border-[#FF6B2B]/40 transition-colors"
              >
                <div className="text-[#FF6B2B] flex justify-center mb-3 sm:mb-4">{c.icon}</div>
                <div
                  className="text-white font-bold text-base sm:text-lg mb-2"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {c.title}
                </div>
                {c.lines.map((line, j) =>
                  c.links[j] ? (
                    <a
                      key={j}
                      href={c.links[j]}
                      className="block text-white/60 text-sm hover:text-[#FF6B2B] active:text-[#FF6B2B] transition-colors leading-relaxed"
                    >
                      {line}
                    </a>
                  ) : (
                    <p key={j} className="text-white/60 text-sm leading-relaxed">
                      {line}
                    </p>
                  )
                )}
              </motion.div>
            ))}
          </div>

          <a
            href="tel:8814971116"
            className="inline-flex items-center gap-3 bg-[#FF6B2B] hover:bg-[#e55d1f] active:bg-[#e55d1f] active:scale-95 text-white px-8 sm:px-10 py-4 sm:py-5 rounded-full font-bold text-lg sm:text-xl transition-all duration-300 hover:scale-105 shadow-2xl shadow-[#FF6B2B]/30"
          >
            <Phone size={20} /> Order Food Now
          </a>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Footer ─────────────────────────────────────────────── */
function Footer() {
  return (
    <footer className="bg-[#0A0A0A] border-t border-white/5 py-7 sm:py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-[#FF6B2B] flex items-center justify-center">
            <Flame size={13} className="text-white" />
          </div>
          <span
            className="text-white/60 text-sm"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Aditi Fast Food
          </span>
        </div>
        <p className="text-white/30 text-xs">© 2025 Aditi Fast Food. NIT Gate, Kurukshetra.</p>
        <div className="flex gap-4 text-white/30 text-xs">
          <a href="#menu" className="hover:text-white/60 transition-colors">Menu</a>
          <a href="/contact" className="hover:text-white/60 transition-colors">Order</a>
        </div>
      </div>
    </footer>
  );
}

/* ─── Page ─────────────────────────────────────────────── */
export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);

  // Close drawer when resizing to desktop
  useEffect(() => {
    const fn = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Lora:ital,wght@0,400;0,500;1,400&display=swap');
        html { scroll-behavior: smooth; }
        body { background: #0D0D0D; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
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