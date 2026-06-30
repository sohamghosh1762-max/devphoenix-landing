"use client";

import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, Sparkles, Users } from "lucide-react";
import Image from "next/image";
import { useConnectModal } from "../context/ConnectModalContext";

interface TeamViewProps {
  isMobile?: boolean;
  onExploreWork: () => void;
  onBackToHome: () => void;
}

export function TeamView({ isMobile = false, onExploreWork, onBackToHome }: TeamViewProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Network particles and grid canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animFrame: number;
    let width = (canvas.width = canvas.offsetWidth || window.innerWidth);
    let height = (canvas.height = canvas.offsetHeight || 600);

    interface TeamParticle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      alpha: number;
    }

    const particles: TeamParticle[] = [];
    const maxParticles = isMobile ? 15 : 40; // throttled for mobile

    for (let i = 0; i < maxParticles; i++) {
      const isOrange = Math.random() > 0.4;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * (isMobile ? 0.3 : 0.6),
        vy: (Math.random() - 0.5) * (isMobile ? 0.3 : 0.6),
        size: Math.random() * 2 + 0.5,
        color: isOrange ? "255, 90, 31" : "255, 138, 0",
        alpha: Math.random() * 0.4 + 0.1,
      });
    }

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth || window.innerWidth;
      height = canvas.height = canvas.offsetHeight || 600;
    };
    window.addEventListener("resize", handleResize);

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Draw subtle grid background
      const gridSize = 60;
      ctx.strokeStyle = "rgba(255, 90, 31, 0.015)";
      ctx.lineWidth = 1;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // 2. Draw floating particles
      for (let i = 0; i < maxParticles; i++) {
        const p = particles[i];
        ctx.fillStyle = `rgba(${p.color}, ${p.alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;
      }

      animFrame = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animFrame);
    };
  }, [isMobile]);

  // Framer Motion variants
  const contentVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut", staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <div className="relative w-full min-h-screen bg-[#050505] text-white flex flex-col justify-center items-center overflow-hidden px-6 py-12">
      {/* Background Particle Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" />

      {/* Background Glowing Orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] rounded-full bg-brand-orange/10 blur-[80px] sm:blur-[120px] pointer-events-none z-0 opacity-70" />

      <div className="relative z-10 w-full max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
        
        {/* Left Column: Team Information */}
        <motion.div 
          variants={contentVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-6 flex flex-col text-left max-w-xl lg:max-w-none mx-auto lg:mx-0 w-full"
        >
          {/* Coming Soon Premium Badge */}
          <motion.div 
            variants={itemVariants}
            className="w-fit flex items-center gap-2 px-3 py-1.5 rounded-full border border-brand-orange/20 bg-brand-orange/5 backdrop-blur-md mb-6"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-orange opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-orange"></span>
            </span>
            <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-brand-orange font-mono">
              Coming Soon
            </span>
          </motion.div>

          {/* Heading */}
          <motion.div variants={itemVariants}>
            <span className="text-[10px] sm:text-xs font-bold tracking-[0.25em] text-white/50 uppercase font-mono block mb-1">
              Building the Future
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight font-sora text-white leading-none mb-4">
              OUR <span className="bg-gradient-to-r from-brand-orange to-brand-amber bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(255,90,31,0.2)]">TEAM</span>
            </h1>
          </motion.div>
          <motion.h2 
            variants={itemVariants}
            className="text-lg sm:text-xl font-bold font-sora text-white/90 mb-4"
          >
            We&apos;re Building Something Extraordinary.
          </motion.h2>

          {/* Glassmorphism description card */}
          <motion.div 
            variants={itemVariants}
            className="p-5 sm:p-6 rounded-2xl border border-white/[0.05] bg-white/[0.02] backdrop-blur-xl mb-8 relative group"
          >
            <div className="absolute top-0 right-0 w-16 h-16 bg-brand-orange/[0.02] rounded-full blur-lg" />
            <p className="text-white/60 text-xs sm:text-sm leading-relaxed font-sans mb-4">
              At DEVPHOENIX, we believe great technology is built by great people. Our talented team of innovators, engineers, designers, and educators will be introduced shortly. Stay tuned as we prepare to showcase the brilliant minds behind DEVPHOENIX.
            </p>
            
            {/* Highlighted message */}
            <div className="flex items-center gap-2.5 text-brand-orange text-xs font-bold tracking-wide border-t border-white/5 pt-4">
              <Sparkles size={14} className="text-brand-orange animate-pulse" />
              <span>Meet the Minds Behind DEVPHOENIX — Coming Soon.</span>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full"
          >
            <button
              onClick={onExploreWork}
              className="relative px-7 py-3.5 rounded-xl text-xs font-bold tracking-wider uppercase text-white flex items-center justify-center gap-2 bg-gradient-to-r from-brand-orange to-brand-amber shadow-[0_0_25px_rgba(255,90,31,0.2)] hover:shadow-[0_0_35px_rgba(255,90,31,0.4)] transition-all duration-300 group cursor-pointer"
            >
              <span>Explore Our Work</span>
              <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform duration-300" />
            </button>
            <button
              onClick={onBackToHome}
              className="px-7 py-3.5 rounded-xl text-xs font-bold tracking-wider uppercase text-white/70 hover:text-white flex items-center justify-center gap-2 border border-white/10 bg-white/[0.02] hover:border-brand-orange/40 hover:bg-brand-orange/[0.04] transition-all duration-300 cursor-pointer"
            >
              <span>Back to Home</span>
            </button>
          </motion.div>
        </motion.div>

        {/* Right Column: Floating Phoenix Visual (hidden on small/medium screens if requested, but centered nicely in two-column grid) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 0.2, ease: "easeOut" }}
          className="lg:col-span-6 flex items-center justify-center w-full min-h-[300px] lg:min-h-[450px]"
        >
          <div className="relative w-full max-w-[280px] sm:max-w-[340px] aspect-square flex items-center justify-center pointer-events-none">
            
            {/* Pulsing energy rings */}
            <div className="absolute w-[80%] h-[80%] rounded-full border border-brand-orange/10 animate-[ping_6s_infinite_ease-in-out]" />
            <div className="absolute w-[60%] h-[60%] rounded-full border border-brand-amber/5 animate-[ping_4s_infinite_ease-in-out]" />
            
            {/* Center floating icon */}
            <motion.div
              animate={{
                y: isMobile ? [-8, 8, -8] : [-16, 16, -16],
                scale: [0.97, 1.03, 0.97]
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="relative w-44 sm:w-56 h-44 sm:h-56 flex items-center justify-center"
            >
              {/* Intense drop shadow glow behind the logo */}
              <div className="absolute inset-0 rounded-full blur-[50px] bg-brand-orange/30 opacity-80" />
              
              <Image
                src="/phoenix-icon.png"
                alt="DevPhoenix Team Logo"
                width={300}
                height={300}
                className="w-36 sm:w-44 h-36 sm:h-44 object-contain drop-shadow-[0_0_35px_rgba(255,90,31,0.8)]"
                priority
              />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default function TeamOverlay() {
  const { isTeamOpen, closeTeam } = useConnectModal();

  // Scroll to section helper
  const handleExploreWork = () => {
    closeTeam();
    // Scroll to #work section after transition
    setTimeout(() => {
      const workEl = document.getElementById("work");
      if (workEl) {
        workEl.scrollIntoView({ behavior: "smooth" });
      } else {
        window.location.hash = "#work";
      }
    }, 300);
  };

  return (
    <AnimatePresence>
      {isTeamOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] w-full h-full min-h-screen bg-[#050505] flex items-center justify-center overflow-y-auto"
        >
          {/* Top Close Button (Desktop style) */}
          <button
            onClick={closeTeam}
            className="absolute top-6 right-6 z-[110] p-3 rounded-full border border-white/10 bg-[#050505]/60 hover:bg-[#ff5a1f]/10 hover:border-[#ff5a1f]/30 text-white/70 hover:text-white transition-all cursor-pointer backdrop-blur-md"
            aria-label="Close Team Section"
          >
            <X size={20} />
          </button>

          {/* Overlay Content */}
          <div className="w-full h-full pt-16">
            <TeamView 
              isMobile={false}
              onExploreWork={handleExploreWork}
              onBackToHome={closeTeam}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
