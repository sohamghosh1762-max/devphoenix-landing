"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ArrowRight, Menu, X } from "lucide-react";
import Image from "next/image";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "Tech", href: "#tech" },
    { name: "Academy", href: "#academy" },
    { name: "Our Work", href: "#work" },
    { name: "About Us", href: "#about" },
  ];

  const resourceItems = [
    { name: "Blog & Insights", href: "#blog" },
    { name: "Case Studies", href: "#cases" },
    { name: "Documentation", href: "#docs" },
    { name: "Tech Academy Portal", href: "#portal" },
  ];

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`fixed top-0 left-0 w-full z-50 h-20 transition-all duration-300 ${
        isScrolled
          ? "bg-[#050505]/75 border-b border-brand-orange/15 shadow-[0_4px_30px_rgba(0,0,0,0.4)] backdrop-blur-md"
          : "bg-transparent border-b border-white/[0.03]"
      }`}
    >
      <div className="max-w-[1500px] mx-auto h-full px-10 flex items-center justify-between">

        {/* Official DevPhoenix Logo */}
<a href="#home" className="flex items-center">
  <Image
    src="/logo.png"
    alt="DevPhoenix"
    width={450}
    height={110}
    priority
    className="h-14 w-auto object-contain transition-transform duration-300 hover:scale-105"
  />
</a>

        {/* Center: Menu (Desktop) */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="relative py-2 text-sm text-white/70 hover:text-white font-medium tracking-wide transition-colors duration-200 group"
            >
              {item.name}
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-brand-orange transition-all duration-300 group-hover:w-full" />
            </a>
          ))}

          {/* Resources Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsResourcesOpen(!isResourcesOpen)}
              onMouseEnter={() => setIsResourcesOpen(true)}
              onMouseLeave={() => setIsResourcesOpen(false)}
              className="flex items-center gap-1 py-2 text-sm text-white/70 hover:text-white font-medium tracking-wide transition-colors duration-200 cursor-pointer"
            >
              Resources
              <ChevronDown
                size={14}
                className={`transition-transform duration-300 ${
                  isResourcesOpen ? "rotate-180 text-brand-orange" : ""
                }`}
              />
            </button>

            {/* Dropdown Menu */}
            <AnimatePresence>
              {isResourcesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  onMouseEnter={() => setIsResourcesOpen(true)}
                  onMouseLeave={() => setIsResourcesOpen(false)}
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-48 glass-card border border-brand-orange/20 rounded-xl p-2 z-50"
                >
                  {resourceItems.map((res) => (
                    <a
                      key={res.name}
                      href={res.href}
                      className="block px-4 py-2.5 text-xs text-white/70 hover:text-brand-orange hover:bg-brand-orange/5 rounded-lg transition-all duration-200"
                    >
                      {res.name}
                    </a>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </nav>

        {/* Right Side: Let's Connect Button (Desktop) */}
        <div className="hidden md:block">
          <motion.a
            href="#connect"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="relative px-6 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase text-white overflow-hidden group flex items-center gap-2"
          >
            {/* Background glass and border */}
            <div className="absolute inset-0 rounded-full border border-white/10 group-hover:border-brand-orange/40 bg-white/[0.02] group-hover:bg-brand-orange/[0.04] transition-all duration-300" />
            
            {/* Subtle glow layer */}
            <div className="absolute -inset-px rounded-full bg-gradient-to-r from-brand-orange/0 via-brand-orange/30 to-brand-orange/0 opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-500" />

            <span className="relative z-10">Let&apos;s Connect</span>
            <ArrowRight size={14} className="relative z-10 text-white/70 group-hover:text-brand-orange group-hover:translate-x-1 transition-all duration-300" />
          </motion.a>
        </div>

        {/* Hamburger Menu Icon (Mobile) */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 text-white/80 hover:text-brand-orange transition-colors"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden fixed top-20 left-0 w-full bg-[#050505]/95 border-b border-brand-orange/15 backdrop-blur-lg overflow-hidden z-40"
          >
            <div className="px-6 py-6 flex flex-col gap-5">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-base font-medium text-white/80 hover:text-brand-orange transition-colors py-1"
                >
                  {item.name}
                </a>
              ))}
              <div className="border-t border-white/5 pt-3">
                <span className="text-[10px] uppercase font-bold tracking-widest text-white/40 block mb-2">
                  Resources
                </span>
                <div className="grid grid-cols-2 gap-3">
                  {resourceItems.map((res) => (
                    <a
                      key={res.name}
                      href={res.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-xs text-white/60 hover:text-brand-orange transition-colors"
                    >
                      {res.name}
                    </a>
                  ))}
                </div>
              </div>
              <motion.a
                href="#connect"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full text-center py-3 rounded-xl border border-brand-orange/20 bg-brand-orange/5 hover:bg-brand-orange/10 text-white font-semibold text-sm tracking-wide transition-all mt-2"
              >
                Let&apos;s Connect
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
