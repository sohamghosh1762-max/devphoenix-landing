"use client";

import React from "react";
import { ArrowUpRight, Play, ArrowDown } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import BackgroundEffects from "../components/BackgroundEffects";
import ServiceCards from "../components/ServiceCards";
import TrustedCompanies from "../components/TrustedCompanies";
import EcosystemAdvantage from "../components/EcosystemAdvantage";
import InnovationInAction from "../components/InnovationInAction";
import BottomCTA from "../components/BottomCTA";
import PathSelection from "../components/PathSelection";
import AboutAndFooter from "../components/AboutAndFooter";

export default function Home() {
  // Reveal animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: custom * 0.15,
        ease: [0.16, 1, 0.3, 1] as const, // easeOutExpo
      },
    }),
  };

  return (
    <div className="relative min-h-screen w-full bg-[#050505] text-white flex flex-col justify-between select-none">
      {/* Fixed Header */}
      <Navbar />

      {/* Cyber-tech background layers */}
      <BackgroundEffects />

      {/* Main Content (Hero Section) */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-6 pt-24 md:pt-32 pb-12 flex flex-col justify-center relative z-10">
        
        {/* 2-Column Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center w-full">
          
          {/* Left Column (45% on desktop: lg:col-span-5) */}
          <div className="lg:col-span-5 flex flex-col justify-center text-left max-w-xl lg:max-w-none">
            
            {/* Tag Label */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              custom={1}
              className="flex items-center gap-2 mb-4 md:mb-6"
            >
              <span className="text-[10px] md:text-xs font-bold tracking-[0.24em] text-brand-orange font-mono">
                TECHNOLOGY • EDUCATION • INNOVATION
              </span>
            </motion.div>

            {/* Massive Heading */}
            <motion.h1
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              custom={2}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-[70px] xl:text-[76px] font-extrabold tracking-tight text-white leading-[1.05] font-sora mb-6"
            >
              BUILDING <br />
              INTELLIGENT <br />
              <span className="text-orange-glow bg-gradient-to-r from-brand-orange to-brand-amber bg-clip-text text-transparent">
                DIGITAL <br />
                ECOSYSTEMS
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              custom={3}
              className="text-white/60 text-sm md:text-base leading-relaxed mb-8 md:mb-10 font-sans max-w-[500px]"
            >
              We combine cutting-edge technology with future-ready education to help businesses scale, automate and succeed in the digital era — while empowering the next generation of innovators.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              custom={4}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-10 md:mb-14"
            >
              {/* Primary Button */}
              <motion.a
                href="#tech"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="relative px-8 py-4 rounded-xl text-sm font-bold tracking-wider uppercase text-white flex items-center justify-center gap-2 bg-gradient-to-r from-brand-orange to-brand-amber shadow-[0_0_30px_rgba(255,90,31,0.3)] hover:shadow-[0_0_40px_rgba(255,90,31,0.5)] transition-all duration-300 group"
              >
                <span>Explore Tech</span>
                <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
              </motion.a>

              {/* Secondary Button */}
              <motion.a
                href="#academy"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="relative px-8 py-4 rounded-xl text-sm font-bold tracking-wider uppercase text-white flex items-center justify-center gap-2 border border-brand-orange/30 bg-transparent hover:border-brand-orange hover:bg-brand-orange/5 transition-all duration-300 group"
              >
                <span>Explore Academy</span>
                <ArrowUpRight size={16} className="text-brand-orange group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
              </motion.a>
            </motion.div>

            {/* Hero Footer Actions */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              custom={5}
              className="flex items-center gap-6 text-white/50 text-xs md:text-sm font-medium border-t border-white/5 pt-6 w-fit"
            >
              {/* Watch Our Story */}
              <a 
                href="#story" 
                className="flex items-center gap-2 hover:text-white hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.4)] transition-all duration-300 group"
              >
                <div className="w-7 h-7 rounded-full border border-white/10 flex items-center justify-center bg-white/[0.02] group-hover:border-brand-orange/50 group-hover:bg-brand-orange/5 transition-all">
                  <Play size={10} className="fill-white/80 group-hover:fill-brand-orange text-transparent" />
                </div>
                <span>Watch Our Story</span>
              </a>

              {/* Vertical Divider */}
              <div className="h-4 w-[1px] bg-white/10" />

              {/* Scroll to Discover */}
              <a 
                href="#trusted" 
                className="flex items-center gap-1.5 hover:text-white transition-all duration-300"
              >
                <span>Scroll to Discover</span>
                <ArrowDown size={14} className="animate-bounce" />
              </a>
            </motion.div>

          </div>

          {/* Right Column (55% on desktop: lg:col-span-7) */}
          <div className="lg:col-span-7 w-full h-full flex items-center justify-center relative min-h-[600px] lg:min-h-[750px]">
            <ServiceCards />
          </div>

        </div>

      </main>

      {/* Trusted Companies bar */}
      <div id="trusted" className="w-full relative z-10">
        <TrustedCompanies />
      </div>

      {/* Path Selection Section */}
      <PathSelection />

      {/* Section 1: Ecosystem Advantage */}
      <EcosystemAdvantage />

      {/* Section 2: Innovation in Action */}
      <InnovationInAction />

      {/* Bottom CTA Banner */}
      <BottomCTA />

      {/* About Us & Footer Section */}
      <AboutAndFooter />
    </div>
  );
}
