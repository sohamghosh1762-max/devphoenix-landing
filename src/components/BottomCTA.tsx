"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useConnectModal } from "../context/ConnectModalContext";

export default function BottomCTA() {
  const { openModal } = useConnectModal();
  return (
    <section className="relative w-full bg-[#050505] pb-24 px-6 z-20">
      {/* Noise overlay */}
      <div
        className="absolute inset-0 opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ y: -4 }}
          className="relative glass-card rounded-[24px] border border-white/[0.06] bg-black/60 backdrop-blur-lg p-8 md:p-12 overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8 group"
          style={{
            boxShadow: "inset 0 1px 1px rgba(255,255,255,0.02)",
          }}
        >
          {/* Futuristic ambient background glows */}
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-brand-orange/5 rounded-full blur-[100px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-brand-amber/5 rounded-full blur-[80px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

          {/* Left: DevPhoenix Phoenix Logo */}
          <div className="flex-shrink-0 flex items-center justify-center">
            <div className="relative w-16 h-16 md:w-20 md:h-20 bg-brand-orange/5 border border-brand-orange/15 rounded-2xl flex items-center justify-center group-hover:border-brand-orange/40 group-hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(255,90,31,0.05)] group-hover:shadow-[0_0_30px_rgba(255,90,31,0.2)]">
              <Image
                src="/phoenix-icon.png"
                alt="DevPhoenix Icon"
                width={80}
                height={80}
                className="object-contain w-11 h-11 md:w-14 md:h-14 drop-shadow-[0_0_8px_rgba(255,90,31,0.4)]"
              />
            </div>
          </div>

          {/* Center: Headings & Copy */}
          <div className="flex-1 text-center lg:text-left max-w-2xl">
            <h3 className="font-sora font-extrabold text-white text-xl sm:text-2xl md:text-3xl leading-tight mb-3">
              Let&apos;s Build the Future Together
            </h3>
            <p className="text-white/60 text-xs sm:text-sm leading-relaxed font-sans">
              Partner with us to innovate, grow and make a lasting impact. DevPhoenix is your partner in progress.
            </p>
          </div>

          {/* Right: Actions */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto flex-shrink-0">
            {/* Primary Button */}
            <motion.button
              onClick={() => openModal("client")}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="w-full sm:w-auto px-8 py-4 rounded-xl text-xs sm:text-sm font-bold tracking-wider uppercase text-white flex items-center justify-center gap-2 bg-gradient-to-r from-brand-orange to-brand-amber shadow-[0_0_30px_rgba(255,90,31,0.25)] hover:shadow-[0_0_40px_rgba(255,90,31,0.45)] transition-all duration-300 group/btn1 cursor-pointer"
            >
              <span>Work With Us</span>
              <ArrowRight
                size={16}
                className="group-hover/btn1:translate-x-1 transition-transform duration-300"
              />
            </motion.button>

            {/* Secondary Button */}
            <motion.button
              onClick={() => openModal("student")}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="w-full sm:w-auto px-8 py-4 rounded-xl text-xs sm:text-sm font-bold tracking-wider uppercase text-white flex items-center justify-center gap-2 border border-white/10 bg-white/[0.02] hover:border-brand-orange/50 hover:bg-brand-orange/[0.04] transition-all duration-300 group/btn2 cursor-pointer"
            >
              <span>Start Your Journey</span>
              <ArrowRight
                size={16}
                className="text-white/50 group-hover/btn2:text-brand-orange group-hover/btn2:translate-x-1 transition-all duration-300"
              />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
