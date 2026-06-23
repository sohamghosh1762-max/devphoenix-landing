"use client";

import React from "react";
import { motion } from "framer-motion";

export default function TrustedCompanies() {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut" as const,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="w-full max-w-7xl mx-auto px-6 mt-16 md:mt-24 mb-12"
    >
      {/* Glass Panel Box */}
      <div className="glass-card rounded-2xl md:rounded-3xl border border-white/[0.06] p-8 md:p-10 flex flex-col lg:flex-row items-center justify-between gap-8 relative overflow-hidden group">
        {/* Subtle horizontal highlight line inside */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        
        {/* Left Side: Label */}
        <div className="flex-1 lg:max-w-xs text-center lg:text-left">
          <p className="font-sora font-bold text-xs md:text-sm tracking-wider leading-relaxed text-white/50">
            POWERED BY FORWARD-THINKING COMPANIES
          </p>
        </div>

        {/* Right Side: Logos Grid */}
        <div className="flex flex-wrap items-center justify-center lg:justify-end gap-10 md:gap-14 lg:gap-16 w-full lg:w-auto">
          
          {/* Microsoft */}
          <motion.div 
            variants={itemVariants} 
            className="flex items-center gap-2.5 text-white/45 hover:text-white transition-all duration-300 cursor-pointer hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.2)] group/logo"
          >
            <svg viewBox="0 0 23 23" className="h-[18px] fill-current">
              <rect x="0" y="0" width="10.5" height="10.5" />
              <rect x="11.5" y="0" width="10.5" height="10.5" />
              <rect x="0" y="11.5" width="10.5" height="10.5" />
              <rect x="11.5" y="11.5" width="10.5" height="10.5" />
            </svg>
            <span className="font-sans font-semibold text-lg tracking-tight">Microsoft</span>
          </motion.div>

          {/* AWS */}
          <motion.div 
            variants={itemVariants}
            className="flex items-center text-white/45 hover:text-white transition-all duration-300 cursor-pointer hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]"
          >
            <svg viewBox="0 0 75 30" className="h-[22px] fill-current">
              <path d="M12.2,21.5h-4.8l-1.1,3.4H1.3L7,8h5.6l5.7,16.9h-5L12.2,21.5z M8.5,17.8h2.6l-1.3-4L8.5,17.8z" />
              <path d="M32.5,8v16.9h-4.4l-3.3-10.2l-3.3,10.2h-4.4V8h4.2v10.5l2.9-9.1l3.2,9.1V8H32.5z" />
              <path d="M47.7,11.5c-0.8-0.9-1.9-1.4-3.2-1.4c-1.8,0-3,1-3,2.4c0,3.3,8.3,1.9,8.3,7.4c0,3.1-2.7,5.5-6.8,5.5c-2.4,0-4.6-0.9-5.9-2.6l2.9-2.5c0.8,1.1,1.9,1.7,3.1,1.7c1.7,0,2.6-0.8,2.6-2.1c0-3.3-8.3-2-8.3-7.4c0-3,2.7-5.5,6.5-5.5c2.3,0,4.1,0.8,5.3,2.3L47.7,11.5z" />
              <path d="M18.5,24.5c4.5,2.8,10.2,4.5,16,4.5c6.5,0,12.5-2.1,17-5.5l1.5,1.5c-4.9,3.8-11.5,6.1-18.5,6.1c-6.4,0-12.7-1.9-17.5-5L18.5,24.5z" />
              <path d="M51,23.5l3.5,3.5l0.5-5.5L51,23.5z" />
            </svg>
          </motion.div>

          {/* Google */}
          <motion.div 
            variants={itemVariants}
            className="flex items-center gap-2 text-white/45 hover:text-white transition-all duration-300 cursor-pointer hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]"
          >
            <svg viewBox="0 0 24 24" className="h-[20px] fill-current">
              <path d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.113-6.887 4.113-4.88 0-8.86-3.974-8.86-8.86 0-4.885 3.98-8.86 8.86-8.86 2.656 0 4.673 1.005 5.86 2.09l3.16-3.16C18.42 1.345 15.63 0 12.24 0 5.58 0 0 5.58 0 12.24s5.58 12.24 12.24 12.24c7.63 0 12.24-5.36 12.24-12.24 0-.825-.09-1.44-.225-1.955H12.24z"/>
            </svg>
            <span className="font-sora font-semibold text-lg tracking-tight">Google</span>
          </motion.div>

          {/* MongoDB */}
          <motion.div 
            variants={itemVariants}
            className="flex items-center text-white/45 hover:text-white transition-all duration-300 cursor-pointer hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]"
          >
            <svg viewBox="0 0 120 30" className="h-[22px] fill-current">
              {/* Leaf */}
              <path d="M9.5,2C9,1.8,7.5,3.1,6.5,4.7C5.3,6.6,4.6,9.1,4.6,11.8c0,5,2.1,8.3,4.9,10.6c0.5,0.4,1,0.5,1,0.7s-0.2,2.3-0.3,3.7c0,0.5,0.3,0.9,0.7,1c0.4,0.1,0.8-0.1,1-0.5c0.5-1.1,0.9-2.9,0.9-4.2c2.8-2.3,4.9-5.6,4.9-10.6C17.7,9.1,17,6.6,15.8,4.7C14.8,3.1,13.3,1.8,12.8,2C12.3,2.2,11.5,5.1,11.5,5.3S12,6.1,12.4,6.7c0.8,1.2,1.3,2.8,1.3,4.7c0,3.3-1.4,5.4-3.3,7.2C10.2,18.8,10,18.7,10,18.5S10,11.8,10,11.4C10,9.5,10.5,7.9,11.3,6.7C11.7,6.1,12.2,5.3,12.2,5.3S11.4,2.2,9.5,2z" />
              {/* MongoDB text */}
              <text x="23" y="21" fontFamily="var(--font-sora), sans-serif" fontWeight="bold" fontSize="16px">MongoDB</text>
            </svg>
          </motion.div>

          {/* Vercel */}
          <motion.div 
            variants={itemVariants}
            className="flex items-center text-white/45 hover:text-white transition-all duration-300 cursor-pointer hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]"
          >
            <svg viewBox="0 0 85 22" className="h-[18px] fill-current">
              <polygon points="9,2 18,18 0,18" />
              <text x="25" y="16" fontFamily="var(--font-sora), sans-serif" fontWeight="bold" fontSize="15px" letterSpacing="0.06em">Vercel</text>
            </svg>
          </motion.div>

        </div>
      </div>
    </motion.div>
  );
}
