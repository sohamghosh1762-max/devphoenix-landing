"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useConnectModal } from "../context/ConnectModalContext";
import { 
  Calendar, 
  Cpu, 
  Layers, 
  MapPin, 
  Compass, 
  Lightbulb, 
  Shield, 
  Users, 
  TrendingUp, 
  Mail, 
  Phone, 
  ArrowRight
} from "lucide-react";

interface NetworkParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
}

export default function AboutAndFooter() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { openModal, openTeam } = useConnectModal();

  // Network particles effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth || window.innerWidth);
    let height = (canvas.height = canvas.offsetHeight || 900);

    const particles: NetworkParticle[] = [];
    const particleCount = 40;
    const connectionDistance = 120;

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 1.5 + 0.5,
      });
    }

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth || window.innerWidth;
      height = canvas.height = canvas.offsetHeight || 900;
    };

    window.addEventListener("resize", handleResize);

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw connections
      ctx.lineWidth = 0.5;
      for (let i = 0; i < particleCount; i++) {
        for (let j = i + 1; j < particleCount; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.hypot(dx, dy);

          if (dist < connectionDistance) {
            const alpha = (1 - dist / connectionDistance) * 0.08;
            ctx.strokeStyle = `rgba(255, 90, 31, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw particles
      for (let i = 0; i < particleCount; i++) {
        const p = particles[i];
        ctx.fillStyle = `rgba(255, 90, 31, ${0.15 + (1 - p.y / height) * 0.25})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();

        // Move particle
        p.x += p.vx;
        p.y += p.vy;

        // Bounce off edges
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Framer motion variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: custom * 0.15,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    }),
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
    hover: {
      y: -8,
      borderColor: "rgba(255, 90, 31, 0.3)",
      boxShadow: "0 15px 30px rgba(255, 90, 31, 0.08), inset 0 1px 1px rgba(255,255,255,0.03)",
      transition: {
        duration: 0.3,
        ease: "easeOut" as const,
      },
    },
  };

  const logoVariants = {
    hover: {
      scale: 1.05,
      filter: "brightness(1) drop-shadow(0 0 12px rgba(255,255,255,0.3))",
      opacity: 1,
      transition: { duration: 0.2 },
    },
  };

  return (
    <section id="about" className="relative w-full bg-[#050505] text-white overflow-hidden z-20">
      
      {/* Background elements */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-70" />

      {/* Grid overlay */}
      <div 
        className="absolute inset-0 opacity-[0.015] pointer-events-none z-0"
        style={{
          backgroundImage: `radial-gradient(rgba(255, 90, 31, 0.15) 1px, transparent 0), radial-gradient(rgba(255, 90, 31, 0.15) 1px, transparent 0)`,
          backgroundSize: "40px 40px",
          backgroundPosition: "0 0, 20px 20px"
        }}
      />

      {/* Noise layer */}
      <div
        className="absolute inset-0 opacity-[0.012] pointer-events-none z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Vignette */}
      <div className="absolute inset-0 pointer-events-none z-0 bg-[radial-gradient(circle_at_center,transparent_30%,#050505_95%)]" />

      {/* Ambient Orange Glow */}
      <div 
        className="absolute w-[600px] h-[600px] rounded-full opacity-[0.08] blur-[130px] pointer-events-none z-0"
        style={{
          top: "40%",
          right: "10%",
          background: "radial-gradient(circle, rgba(255,90,31,0.5) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
        
        {/* ================= ABOUT DEVPHOENIX SECTION ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center pt-[120px] pb-[80px]">
          
          {/* Left Column */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="flex flex-col items-start text-left"
          >
            {/* Eyebrow */}
            <motion.span
              variants={fadeInUp}
              custom={1}
              className="text-xs font-bold tracking-[0.3em] uppercase text-[#ff5a1f] mb-4"
            >
              ABOUT DEVPHOENIX
            </motion.span>

            {/* Main Heading */}
            <motion.h2
              variants={fadeInUp}
              custom={2}
              className="font-sora font-extrabold text-white leading-[1.08] mb-6 text-4xl sm:text-[58px] lg:text-[72px]"
            >
              Driven by Purpose. <br />
              Built for <span className="text-[#ff5a1f] drop-shadow-[0_0_15px_rgba(255,90,31,0.2)]">Impact</span>.
            </motion.h2>

            {/* Description 1 */}
            <motion.p
              variants={fadeInUp}
              custom={3}
              className="text-white/80 text-base sm:text-lg leading-relaxed mb-4 max-w-xl font-sans"
            >
              DevPhoenix is a technology and education company on a mission to build intelligent digital ecosystems and future-ready talent.
            </motion.p>

            {/* Description 2 */}
            <motion.p
              variants={fadeInUp}
              custom={4}
              className="text-white/70 text-sm sm:text-base leading-relaxed mb-8 max-w-xl font-sans"
            >
              On one hand, we help businesses innovate, automate and scale through cutting-edge technology solutions. On the other, we are building an education ecosystem that prepares the next generation with practical skills, real-world exposure and industry alignment.
            </motion.p>

            {/* Company Info Bar */}
            <motion.div
              variants={fadeInUp}
              custom={5}
              className="w-full glass-card rounded-[20px] border border-[#ff5a1f]/20 bg-black/45 backdrop-blur-md p-4 sm:p-5 grid grid-cols-2 sm:grid-cols-4 gap-4 items-center justify-between"
              style={{
                boxShadow: "inset 0 1px 1px rgba(255,255,255,0.02)",
              }}
            >
              {/* Item 1 */}
              <div className="flex items-center gap-3 border-r border-white/5 pr-2 sm:pr-4">
                <div className="w-8 h-8 rounded-lg bg-[#ff5a1f]/10 border border-[#ff5a1f]/20 flex items-center justify-center text-[#ff5a1f]">
                  <Calendar className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-white/40 block">Founded</span>
                  <span className="text-xs sm:text-sm font-bold text-white">2026</span>
                </div>
              </div>

              {/* Item 2 */}
              <div className="flex items-center gap-3 border-r border-white/5 pr-2 sm:pr-4 pl-1 sm:pl-2">
                <div className="w-8 h-8 rounded-lg bg-[#ff5a1f]/10 border border-[#ff5a1f]/20 flex items-center justify-center text-[#ff5a1f]">
                  <Cpu className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-white/40 block">Approach</span>
                  <span className="text-xs sm:text-sm font-bold text-white">AI-First</span>
                </div>
              </div>

              {/* Item 3 */}
              <div className="flex items-center gap-3 border-r border-white/5 pr-2 sm:pr-4 pl-1 sm:pl-2">
                <div className="w-8 h-8 rounded-lg bg-[#ff5a1f]/10 border border-[#ff5a1f]/20 flex items-center justify-center text-[#ff5a1f]">
                  <Layers className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-white/40 block">Ecosystem</span>
                  <span className="text-xs sm:text-sm font-bold text-white">Tech + Ed</span>
                </div>
              </div>

              {/* Item 4 */}
              <div className="flex items-center gap-3 pl-1 sm:pl-2">
                <div className="w-8 h-8 rounded-lg bg-[#ff5a1f]/10 border border-[#ff5a1f]/20 flex items-center justify-center text-[#ff5a1f]">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-white/40 block">Headquarters</span>
                  <span className="text-xs sm:text-sm font-bold text-white">India</span>
                </div>
              </div>

            </motion.div>
          </motion.div>

          {/* Right Column (Office Image) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="w-full relative rounded-[28px] overflow-hidden border border-white/[0.06] shadow-2xl cursor-pointer group"
          >
            <motion.div 
              whileHover={{ scale: 1.04 }} 
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full h-[400px] sm:h-[500px]"
            >
              <Image 
                src="/office_reception.png" 
                alt="DevPhoenix Corporate Office" 
                fill 
                className="object-cover object-center" 
                priority
              />
              {/* Subtle glass overlay glow on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 opacity-40 group-hover:opacity-20 transition-opacity duration-500" />
              <div className="absolute inset-0 bg-[#ff5a1f]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </motion.div>
          </motion.div>

        </div>

        {/* ================= VALUES SECTION ================= */}
        <div className="w-full flex flex-col items-center mt-12 mb-24">
          {/* Eyebrow */}
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-xs font-bold tracking-[0.3em] uppercase text-[#ff5a1f] mb-8 text-center"
          >
            OUR VALUES
          </motion.span>

          {/* Grid */}
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 w-full"
          >
            {/* Value 1 */}
            <motion.div
              variants={cardVariants}
              whileHover="hover"
              className="relative flex flex-col justify-between h-[220px] p-6 rounded-[20px] border border-white/[0.06] bg-black/45 backdrop-blur-md cursor-pointer transition-all duration-300"
              style={{
                boxShadow: "inset 0 1px 1px rgba(255,255,255,0.02)",
              }}
            >
              <div className="absolute top-0 left-0 w-8 h-8 bg-[#ff5a1f]/5 rounded-tl-[20px] blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="flex flex-col gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#ff5a1f]/10 border border-[#ff5a1f]/20 flex items-center justify-center text-[#ff5a1f]">
                  <Compass className="w-5 h-5" />
                </div>
                <h3 className="font-sora font-extrabold text-sm tracking-wide uppercase text-white">
                  Purpose-Driven
                </h3>
              </div>
              <p className="text-white/60 text-xs leading-relaxed font-sans mt-2">
                Everything we build is backed by a clear purpose and long-term vision.
              </p>
            </motion.div>

            {/* Value 2 */}
            <motion.div
              variants={cardVariants}
              whileHover="hover"
              className="relative flex flex-col justify-between h-[220px] p-6 rounded-[20px] border border-white/[0.06] bg-black/45 backdrop-blur-md cursor-pointer transition-all duration-300"
              style={{
                boxShadow: "inset 0 1px 1px rgba(255,255,255,0.02)",
              }}
            >
              <div className="flex flex-col gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#ff5a1f]/10 border border-[#ff5a1f]/20 flex items-center justify-center text-[#ff5a1f]">
                  <Lightbulb className="w-5 h-5" />
                </div>
                <h3 className="font-sora font-extrabold text-sm tracking-wide uppercase text-white">
                  Innovation First
                </h3>
              </div>
              <p className="text-white/60 text-xs leading-relaxed font-sans mt-2">
                We embrace emerging technologies to solve real world challenges.
              </p>
            </motion.div>

            {/* Value 3 */}
            <motion.div
              variants={cardVariants}
              whileHover="hover"
              className="relative flex flex-col justify-between h-[220px] p-6 rounded-[20px] border border-white/[0.06] bg-black/45 backdrop-blur-md cursor-pointer transition-all duration-300"
              style={{
                boxShadow: "inset 0 1px 1px rgba(255,255,255,0.02)",
              }}
            >
              <div className="flex flex-col gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#ff5a1f]/10 border border-[#ff5a1f]/20 flex items-center justify-center text-[#ff5a1f]">
                  <Shield className="w-5 h-5" />
                </div>
                <h3 className="font-sora font-extrabold text-sm tracking-wide uppercase text-white">
                  Integrity Always
                </h3>
              </div>
              <p className="text-white/60 text-xs leading-relaxed font-sans mt-2">
                We operate with honesty, transparency and accountability.
              </p>
            </motion.div>

            {/* Value 4 */}
            <motion.div
              variants={cardVariants}
              whileHover="hover"
              className="relative flex flex-col justify-between h-[220px] p-6 rounded-[20px] border border-white/[0.06] bg-black/45 backdrop-blur-md cursor-pointer transition-all duration-300"
              style={{
                boxShadow: "inset 0 1px 1px rgba(255,255,255,0.02)",
              }}
            >
              <div className="flex flex-col gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#ff5a1f]/10 border border-[#ff5a1f]/20 flex items-center justify-center text-[#ff5a1f]">
                  <Users className="w-5 h-5" />
                </div>
                <h3 className="font-sora font-extrabold text-sm tracking-wide uppercase text-white">
                  Impact Focused
                </h3>
              </div>
              <p className="text-white/60 text-xs leading-relaxed font-sans mt-2">
                We measure success by the value and impact we create for businesses and learners.
              </p>
            </motion.div>

            {/* Value 5 */}
            <motion.div
              variants={cardVariants}
              whileHover="hover"
              className="relative flex flex-col justify-between h-[220px] p-6 rounded-[20px] border border-white/[0.06] bg-black/45 backdrop-blur-md cursor-pointer transition-all duration-300"
              style={{
                boxShadow: "inset 0 1px 1px rgba(255,255,255,0.02)",
              }}
            >
              <div className="flex flex-col gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#ff5a1f]/10 border border-[#ff5a1f]/20 flex items-center justify-center text-[#ff5a1f]">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <h3 className="font-sora font-extrabold text-sm tracking-wide uppercase text-white">
                  Grow Together
                </h3>
              </div>
              <p className="text-white/60 text-xs leading-relaxed font-sans mt-2">
                We believe in collaboration, continuous learning and growing together.
              </p>
            </motion.div>

          </motion.div>
        </div>

        {/* ================= TRUSTED BY VISIONARIES ================= */}
        <div className="w-full border-t border-white/5 pt-12 pb-16 flex flex-col items-center">
          {/* Eyebrow */}
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-[10px] font-bold tracking-[0.35em] uppercase text-[#ff5a1f] mb-10 text-center"
          >
            POWERED BY VISIONARIES
          </motion.span>

          {/* Logo row */}
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-wrap items-center justify-center gap-10 sm:gap-14 md:gap-16 lg:gap-20 w-full"
          >
            
            {/* AWS */}
            <motion.div 
              variants={logoVariants}
              whileHover="hover"
              className="flex items-center text-white/45 hover:text-white transition-all duration-300 cursor-pointer"
            >
              <svg viewBox="0 0 75 30" className="h-[22px] fill-current">
                <path d="M12.2,21.5h-4.8l-1.1,3.4H1.3L7,8h5.6l5.7,16.9h-5L12.2,21.5z M8.5,17.8h2.6l-1.3-4L8.5,17.8z" />
                <path d="M32.5,8v16.9h-4.4l-3.3-10.2l-3.3,10.2h-4.4V8h4.2v10.5l2.9-9.1l3.2,9.1V8H32.5z" />
                <path d="M47.7,11.5c-0.8-0.9-1.9-1.4-3.2-1.4c-1.8,0-3,1-3,2.4c0,3.3,8.3,1.9,8.3,7.4c0,3.1-2.7,5.5-6.8,5.5c-2.4,0-4.6-0.9-5.9-2.6l2.9-2.5c0.8,1.1,1.9,1.7,3.1,1.7c1.7,0,2.6-0.8,2.6-2.1c0-3.3-8.3-2-8.3-7.4c0-3,2.7-5.5,6.5-5.5c2.3,0,4.1,0.8,5.3,2.3L47.7,11.5z" />
                <path d="M18.5,24.5c4.5,2.8,10.2,4.5,16,4.5c6.5,0,12.5-2.1,17-5.5l1.5,1.5c-4.9,3.8-11.5,6.1-18.5,6.1c-6.4,0-12.7-1.9-17.5-5L18.5,24.5z" />
                <path d="M51,23.5l3.5,3.5l0.5-5.5L51,23.5z" />
              </svg>
            </motion.div>

            {/* Azure */}
            <motion.div 
              variants={logoVariants}
              whileHover="hover"
              className="flex items-center gap-2 text-white/45 hover:text-white transition-all duration-300 cursor-pointer"
            >
              <svg viewBox="0 0 24 24" className="h-[20px] fill-current">
                <path d="M0 19L7 3h6.5l-5.5 11 5.5 5H0zm18.5 0l-5.5-6h11L18.5 19z" />
              </svg>
              <span className="font-sora font-semibold text-lg tracking-tight">Azure</span>
            </motion.div>

            {/* Google Cloud */}
            <motion.div 
              variants={logoVariants}
              whileHover="hover"
              className="flex items-center gap-2 text-white/45 hover:text-white transition-all duration-300 cursor-pointer"
            >
              <svg viewBox="0 0 24 24" className="h-[20px] fill-current">
                <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" />
              </svg>
              <span className="font-sora font-semibold text-lg tracking-tight">Google Cloud</span>
            </motion.div>

            {/* Meta */}
            <motion.div 
              variants={logoVariants}
              whileHover="hover"
              className="flex items-center gap-2.5 text-white/45 hover:text-white transition-all duration-300 cursor-pointer"
            >
              <svg viewBox="0 0 24 24" className="h-[18px] fill-current">
                <path d="M16.7 5c-2.3 0-4.3 1.2-5.4 3-1.1-1.8-3.1-3-5.4-3C2.6 5 0 7.7 0 11s2.6 6 5.9 6c2.3 0 4.3-1.2 5.4-3 1.1 1.8 3.1 3 5.4 3 3.3 0 5.9-2.7 5.9-6s-2.6-6-5.9-6zm-10.8 9.5C3.9 14.5 2 12.9 2 11s1.9-3.5 3.9-3.5c2 0 3.9 1.6 3.9 3.5s-1.9 3.5-3.9 3.5zm10.8 0c-2 0-3.9-1.6-3.9-3.5s1.9-3.5 3.9-3.5c2 0 3.9 1.6 3.9 3.5s-1.9 3.5-3.9 3.5z" />
              </svg>
              <span className="font-sans font-bold text-lg tracking-tight">Meta</span>
            </motion.div>

            {/* MongoDB */}
            <motion.div 
              variants={logoVariants}
              whileHover="hover"
              className="flex items-center text-white/45 hover:text-white transition-all duration-300 cursor-pointer"
            >
              <svg viewBox="0 0 120 30" className="h-[22px] fill-current">
                <path d="M9.5,2C9,1.8,7.5,3.1,6.5,4.7C5.3,6.6,4.6,9.1,4.6,11.8c0,5,2.1,8.3,4.9,10.6c0.5,0.4,1,0.5,1,0.7s-0.2,2.3-0.3,3.7c0,0.5,0.3,0.9,0.7,1c0.4,0.1,0.8-0.1,1-0.5c0.5-1.1,0.9-2.9,0.9-4.2c2.8-2.3,4.9-5.6,4.9-10.6C17.7,9.1,17,6.6,15.8,4.7C14.8,3.1,13.3,1.8,12.8,2C12.3,2.2,11.5,5.1,11.5,5.3S12,6.1,12.4,6.7c0.8,1.2,1.3,2.8,1.3,4.7c0,3.3-1.4,5.4-3.3,7.2C10.2,18.8,10,18.7,10,18.5S10,11.8,10,11.4C10,9.5,10.5,7.9,11.3,6.7C11.7,6.1,12.2,5.3,12.2,5.3S11.4,2.2,9.5,2z" />
                <text x="23" y="21" fontFamily="var(--font-sora), sans-serif" fontWeight="bold" fontSize="16px">MongoDB</text>
              </svg>
            </motion.div>

            {/* OpenAI */}
            <motion.div 
              variants={logoVariants}
              whileHover="hover"
              className="flex items-center gap-2 text-white/45 hover:text-white transition-all duration-300 cursor-pointer"
            >
              <svg viewBox="0 0 24 24" className="h-[20px] fill-current">
                <path d="M21.3 9.3c.2-.5.1-1.1-.1-1.5-.3-.4-.8-.7-1.3-.7-.2 0-.3 0-.5.1l-1.6.5c-.3-.4-.7-.7-1.1-.9l.4-1.6c.1-.5 0-1-.3-1.4-.3-.4-.8-.6-1.3-.6h-.6c-.5.1-.9.3-1.2.7l-1 1.3c-.5-.1-1-.1-1.5 0l-1-1.3c-.3-.4-.7-.6-1.2-.7H9c-.5 0-1 .2-1.3.6-.3.4-.4.9-.3 1.4l.4 1.6c-.4.2-.8.5-1.1.9l-1.6-.5c-.2 0-.3-.1-.5-.1-.5 0-1 .3-1.3.7-.2.4-.3 1-.1 1.5l.8 1.4c-.2.5-.3 1-.3 1.5l-.8 1.4c-.2.5-.1 1.1.1 1.5.3.4.8.7 1.3.7.2 0 .3 0 .5-.1l1.6-.5c.3.4.7.7 1.1.9l-.4 1.6c-.1.5 0 1 .3 1.4.3.4.8.6 1.3.6h.6c.5-.1.9-.3 1.2-.7l1-1.3c.5.1 1 .1 1.5 0l1 1.3c.3.4.7.6 1.2.7h.6c.5 0 1-.2 1.3-.6.3-.4.4-.9.3-1.4l-.4-1.6c.4-.2.8-.5 1.1-.9l1.6.5c.2 0 .3.1.5.1.5 0 1-.3 1.3-.7.2-.4.3-1 .1-1.5l-.8-1.4c.2-.5.3-1 .3-1.5l.8-1.4z" />
              </svg>
              <span className="font-sora font-semibold text-lg tracking-tight">OpenAI</span>
            </motion.div>

            {/* Stripe */}
            <motion.div 
              variants={logoVariants}
              whileHover="hover"
              className="flex items-center text-white/45 hover:text-white transition-all duration-300 cursor-pointer"
            >
              <span className="font-sora font-extrabold text-[22px] tracking-[0.06em]">STRIPE</span>
            </motion.div>

          </motion.div>
        </div>


        {/* ================= FOOTER SECTION ================= */}
        <footer className="w-full border-t border-white/5 pt-16 pb-8 z-10 relative">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-12">
            
            {/* Column 1: Brand */}
            <div className="col-span-2 md:col-span-3 lg:col-span-2 flex flex-col gap-6 text-left">
              <div className="relative h-10 w-44">
                <Image 
                  src="/logo.png" 
                  alt="DevPhoenix Official Logo" 
                  fill 
                  className="object-contain object-left" 
                />
              </div>
              <p className="text-white/60 text-xs sm:text-sm leading-relaxed max-w-sm font-sans">
                Empowering businesses with intelligent technology solutions and preparing individuals with future-ready skills to lead tomorrow.
              </p>
              
              {/* Social links */}
              <div className="flex items-center gap-3">
                <a href="https://www.linkedin.com/company/devphoenix/" title="LinkedIn" aria-label="LinkedIn" className="w-9 h-9 rounded-lg bg-white/[0.02] border border-white/10 flex items-center justify-center text-white/60 hover:text-[#ff5a1f] hover:border-[#ff5a1f]/30 hover:bg-[#ff5a1f]/5 transition-all duration-300">
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
                <a href="#twitter" title="Twitter" aria-label="Twitter" className="w-9 h-9 rounded-lg bg-white/[0.02] border border-white/10 flex items-center justify-center text-white/60 hover:text-[#ff5a1f] hover:border-[#ff5a1f]/30 hover:bg-[#ff5a1f]/5 transition-all duration-300">
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
                <a href="https://www.instagram.com/devphoenix.tech?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" title="Instagram" aria-label="Instagram" className="w-9 h-9 rounded-lg bg-white/[0.02] border border-white/10 flex items-center justify-center text-white/60 hover:text-[#ff5a1f] hover:border-[#ff5a1f]/30 hover:bg-[#ff5a1f]/5 transition-all duration-300">
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                </a>
                <a href="#youtube" title="YouTube" aria-label="YouTube" className="w-9 h-9 rounded-lg bg-white/[0.02] border border-white/10 flex items-center justify-center text-white/60 hover:text-[#ff5a1f] hover:border-[#ff5a1f]/30 hover:bg-[#ff5a1f]/5 transition-all duration-300">
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                    <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.525 3.545 12 3.545 12 3.545s-7.525 0-9.388.508a3.003 3.003 0 0 0-2.11 2.11C0 8.025 0 12 0 12s0 3.975.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.863.508 9.388.508 9.388.508s7.525 0 9.388-.508a3.003 3.003 0 0 0 2.11-2.11C24 15.975 24 12 24 12s0-3.975-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Column 2: Company */}
            <div className="flex flex-col items-start gap-4 text-left">
              <h4 className="font-sora font-extrabold text-xs tracking-wider uppercase text-white">Company</h4>
              <ul className="flex flex-col gap-2.5">
                <li><a href="#work" className="text-white/60 text-xs sm:text-sm hover:text-[#ff5a1f] transition-colors duration-200">Our Work</a></li>
                <li>
                  <a 
                    href="#team" 
                    onClick={(e) => {
                      e.preventDefault();
                      openTeam();
                    }}
                    className="text-white/60 text-xs sm:text-sm hover:text-[#ff5a1f] transition-colors duration-200"
                  >
                    Our Team
                  </a>
                </li>
                <li><a href="#about" className="text-white/60 text-xs sm:text-sm hover:text-[#ff5a1f] transition-colors duration-200">About Us</a></li>
                <li><a href="#mission" className="text-white/60 text-xs sm:text-sm hover:text-[#ff5a1f] transition-colors duration-200">Our Mission</a></li>
                <li><a href="#careers" className="text-white/60 text-xs sm:text-sm hover:text-[#ff5a1f] transition-colors duration-200">Careers</a></li>
                <li><a href="#blog" className="text-white/60 text-xs sm:text-sm hover:text-[#ff5a1f] transition-colors duration-200">Blog</a></li>
                <li><a href="#map" className="text-white/60 text-xs sm:text-sm hover:text-[#ff5a1f] transition-colors duration-200">Map</a></li>
              </ul>
            </div>

            {/* Column 3: Tech Solutions */}
            <div className="flex flex-col items-start gap-4 text-left">
              <h4 className="font-sora font-extrabold text-xs tracking-wider uppercase text-white">Tech Solutions</h4>
              <ul className="flex flex-col gap-2.5">
                <li><a href="#tech" className="text-white/60 text-xs sm:text-sm hover:text-[#ff5a1f] transition-colors duration-200">AI & Automation</a></li>
                <li><a href="#tech" className="text-white/60 text-xs sm:text-sm hover:text-[#ff5a1f] transition-colors duration-200">Web Development</a></li>
                <li><a href="#tech" className="text-white/60 text-xs sm:text-sm hover:text-[#ff5a1f] transition-colors duration-200">Mobile Development</a></li>
                <li><a href="#tech" className="text-white/60 text-xs sm:text-sm hover:text-[#ff5a1f] transition-colors duration-200">Cloud & DevOps</a></li>
                <li><a href="#tech" className="text-white/60 text-xs sm:text-sm hover:text-[#ff5a1f] transition-colors duration-200">Digital Transformation</a></li>
              </ul>
            </div>

            {/* Column 4: Academy */}
            <div className="flex flex-col items-start gap-4 text-left">
              <h4 className="font-sora font-extrabold text-xs tracking-wider uppercase text-white">Academy</h4>
              <ul className="flex flex-col gap-2.5">
                <li><a href="#academy" className="text-white/60 text-xs sm:text-sm hover:text-[#ff5a1f] transition-colors duration-200">Programs</a></li>
                <li><a href="#academy" className="text-white/60 text-xs sm:text-sm hover:text-[#ff5a1f] transition-colors duration-200">Curriculum</a></li>
                <li><a href="#academy" className="text-white/60 text-xs sm:text-sm hover:text-[#ff5a1f] transition-colors duration-200">Industry Connect</a></li>
                <li><a href="#academy" className="text-white/60 text-xs sm:text-sm hover:text-[#ff5a1f] transition-colors duration-200">Mentorship</a></li>
                <li><a href="#academy" className="text-white/60 text-xs sm:text-sm hover:text-[#ff5a1f] transition-colors duration-200">Resources</a></li>
              </ul>
            </div>

            {/* Column 5: Resources */}
            <div className="flex flex-col items-start gap-4 text-left">
              <h4 className="font-sora font-extrabold text-xs tracking-wider uppercase text-white">Resources</h4>
              <ul className="flex flex-col gap-2.5">
                <li><a href="#cases" className="text-white/60 text-xs sm:text-sm hover:text-[#ff5a1f] transition-colors duration-200">Case Studies</a></li>
                <li><a href="#whitepapers" className="text-white/60 text-xs sm:text-sm hover:text-[#ff5a1f] transition-colors duration-200">Whitepapers</a></li>
                <li><a href="#faq" className="text-white/60 text-xs sm:text-sm hover:text-[#ff5a1f] transition-colors duration-200">FAQs</a></li>
                <li><a href="#events" className="text-white/60 text-xs sm:text-sm hover:text-[#ff5a1f] transition-colors duration-200">Events</a></li>
                <li><a href="#newsroom" className="text-white/60 text-xs sm:text-sm hover:text-[#ff5a1f] transition-colors duration-200">Newsroom</a></li>
              </ul>
            </div>

            {/* Column 6: Get In Touch */}
            <div className="col-span-2 md:col-span-3 lg:col-span-2 xl:col-span-2 lg:pl-4 flex flex-col items-start gap-5 text-left border-l border-white/5">
              <h4 className="font-sora font-extrabold text-xs tracking-wider uppercase text-white">Get In Touch</h4>
              <div className="flex flex-col gap-4">

  <a
    href="mailto:devphoenix@zoho.in"
    className="flex items-center gap-3 text-white/70 hover:text-[#ff5a1f] text-xs sm:text-sm transition-colors group"
  >
    <Mail className="w-4 h-4 text-[#ff5a1f]/60 group-hover:text-[#ff5a1f]" />
    <span>devphoenix@zoho.in</span>
  </a>

  <a
    href="tel:+919734876490"
    className="flex items-center gap-3 text-white/70 hover:text-[#ff5a1f] text-xs sm:text-sm transition-colors group"
  >
    <Phone className="w-4 h-4 text-[#ff5a1f]/60 group-hover:text-[#ff5a1f]" />
    <span>+91 9734876490</span>
  </a>

{/* Headquarters */}
<div className="flex items-start gap-3 text-white/70 text-xs sm:text-sm">
  <MapPin className="w-4 h-4 text-[#ff5a1f] mt-1 flex-shrink-0" />
  <div>
    <p className="text-white font-semibold mb-1">
      Headquarters
    </p>

    <a
      href="https://www.google.com/maps/place/MALLICKPARA+POST+OFFICE/@22.7456917,88.3181451,15z/data=!4m10!1m2!2m1!1s59%2FD%2F5,+VIVEKANANDA,+SARANI,+SERAMPORE,+Mallickpara,+SERAMPORE,+Serampur+Uttarpara,+Hooghly-+712203,+West+Bengal,+India!3m6!1s0x39f89b92cb779425:0x4b2f34330d837358!8m2!3d22.7518135!4d88.3330685!15sCnc1OS9ELzUsIFZJVkVLQU5BTkRBLCBTQVJBTkksIFNFUkFNUE9SRSwgTWFsbGlja3BhcmEsIFNFUkFNUE9SRSwgU2VyYW1wdXIgVXR0YXJwYXJhLCBIb29naGx5LSA3MTIyMDMsIFdlc3QgQmVuZ2FsLCBJbmRpYZIBC3Bvc3Rfb2ZmaWNl4AEA!16s%2Fg%2F11j0jlrn67?entry=ttu&g_ep=EgoyMDI2MDYyMy4wIKXMDSoASAFQAw%3D%3D"
      target="_blank"
      rel="noopener noreferrer"
      className="hover:text-[#ff5a1f] transition-colors duration-300"
    >
      59/D/5, Vivekananda Sarani, Mallickpara, Serampore,
      Hooghly - 712203, West Bengal, India
    </a>
  </div>
</div>

  {/* Main Branch */}
  <div className="flex items-start gap-3 text-white/70 text-xs sm:text-sm">
    <MapPin className="w-4 h-4 text-[#ff8a00] mt-1 flex-shrink-0" />
    <div>
      <p className="text-white font-semibold mb-1">
        Main Branch
      </p>
      <a
      href="https://www.google.com/maps/place/Private+Rd,+Lakshminagar,+Dum+Dum,+West+Bengal+700074/@22.6247959,88.4048714,17z/data=!4m6!3m5!1s0x39f89e05c6b9da45:0xcc9b0c68cb59e493!8m2!3d22.6243602!4d88.4078111!16s%2Fg%2F11fht2lwpd?entry=ttu&g_ep=EgoyMDI2MDYyMS4wIKXMDSoASAFQAw%3D%3D"
      target="_blank"
      rel="noopener noreferrer"
      className="hover:text-[#ff5a1f] transition-colors duration-300"
    >
        Private road, dumdum ,Kolkata - 700028, West Bengal, India.
      </a>
    </div>
  </div>

</div>

              {/* Let's Connect CTA Button */}
              <motion.button
                onClick={() => openModal()}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full mt-2 py-3 px-5 rounded-xl text-xs sm:text-sm font-bold tracking-wider uppercase text-white bg-transparent border border-[#ff5a1f]/40 hover:border-[#ff5a1f] shadow-sm hover:shadow-[0_0_20px_rgba(255,90,31,0.25)] hover:bg-[#ff5a1f]/5 transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>Let&apos;s Connect</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
              </motion.button>
            </div>

            {/* Column 7: Map */}
            <div className="col-span-2 md:col-span-3 lg:col-span-4 w-full flex flex-col gap-4 text-left lg:pl-6 border-t border-white/5 lg:border-t-0 lg:border-l border-white/5 pt-8 lg:pt-0">
              <h4 className="font-sora font-extrabold text-xs tracking-wider uppercase text-white">Our Location</h4>
              <div className="relative w-full h-[300px] lg:h-[320px] rounded-2xl overflow-hidden border border-white/10 bg-white/[0.02] shadow-lg group">
                <iframe
                  src="https://maps.google.com/maps?width=520&amp;height=400&amp;hl=en&amp;q=59/D/5,%20VIVEKANANDA,%20SARANI,%20SERAMPORE,%20Mallickpara,%20SERAMPORE,%20Serampur%20Uttarpara,%20Hooghly-%20712203,%20West%20Bengal,%20India%20SERAMPORE+(DEVPHOENIX%20Headquarter)&amp;t=&amp;z=12&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  title="DevPhoenix Headquarter Map"
                  className="w-full h-full rounded-2xl filter invert-[0.9] hue-rotate-[180deg] brightness-[0.9] contrast-[1.2] opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                />
              </div>
            </div>

          </div>

          {/* Copyright bar */}
          <div className="w-full border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-white/40 text-xs sm:text-sm text-center sm:text-left">
              &copy; 2026 DevPhoenix. All rights reserved.
            </span>
            <div className="flex items-center gap-6">
              <a href="#privacy" className="text-white/40 text-xs sm:text-sm hover:text-white transition-colors duration-200">Privacy Policy</a>
              <a href="#terms" className="text-white/40 text-xs sm:text-sm hover:text-white transition-colors duration-200">Terms of Service</a>
              <a href="#refund" className="text-white/40 text-xs sm:text-sm hover:text-white transition-colors duration-200">Refund Policy</a>
            </div>
          </div>

        </footer>

      </div>
    </section>
  );
}
