"use client";

import React from "react";
import { Cpu, Layers, Target, TrendingUp, Globe } from "lucide-react";
import { motion } from "framer-motion";

interface AdvantageCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  accent: "purple" | "orange";
  index: number;
}

const AdvantageCard: React.FC<AdvantageCardProps> = ({
  icon,
  title,
  description,
  accent,
  index,
}) => {
  const accentColorClass =
    accent === "purple"
      ? "text-purple-400 group-hover:text-purple-300"
      : "text-brand-orange group-hover:text-brand-amber";

  const glowColor =
    accent === "purple"
      ? "rgba(168, 85, 247, 0.15)"
      : "rgba(255, 90, 31, 0.15)";

  const borderColor =
    accent === "purple"
      ? "group-hover:border-purple-500/30"
      : "group-hover:border-brand-orange/30";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{ y: -8 }}
      className="relative flex flex-col justify-between h-[280px] p-6 rounded-[24px] border border-white/[0.06] bg-black/40 backdrop-blur-md group transition-all duration-300 overflow-hidden cursor-pointer"
      style={{
        boxShadow: "inset 0 1px 1px rgba(255,255,255,0.02)",
      }}
    >
      {/* Background Hover Glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none blur-xl rounded-[24px] -z-10"
        style={{
          background: `radial-gradient(circle at 50% 30%, ${glowColor} 0%, transparent 70%)`,
        }}
      />

      {/* Top Section: Icon and Title */}
      <div className="flex flex-col gap-4">
        {/* Glowing Icon Container */}
        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center bg-white/[0.02] border border-white/[0.08] transition-all duration-300 ${borderColor} group-hover:scale-110`}
          style={{
            boxShadow: `0 4px 20px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.03)`,
          }}
        >
          <div className={accentColorClass}>{icon}</div>
        </div>

        <h3 className="font-sora font-extrabold text-sm tracking-wider uppercase text-white group-hover:text-white transition-colors duration-300">
          {title}
        </h3>
      </div>

      {/* Bottom Section: Description */}
      <p className="text-white/60 text-xs leading-relaxed font-sans mt-2 group-hover:text-white/80 transition-colors duration-300">
        {description}
      </p>
    </motion.div>
  );
};

export default function EcosystemAdvantage() {
  const cards = [
    {
      icon: <Cpu className="w-5 h-5" />,
      title: "AI-First Approach",
      description: "Building intelligent solutions powered by AI, automation and data.",
      accent: "purple" as const,
    },
    {
      icon: <Layers className="w-5 h-5" />,
      title: "Two Powerful Divisions",
      description: "Technology solutions for businesses and future-ready education for the next generation.",
      accent: "orange" as const,
    },
    {
      icon: <Target className="w-5 h-5" />,
      title: "Practical & Impactful",
      description: "We focus on real-world problem solving through execution, projects and innovation.",
      accent: "purple" as const,
    },
    {
      icon: <TrendingUp className="w-5 h-5" />,
      title: "Industry Focused",
      description: "Solutions and programs designed around current industry needs and future trends.",
      accent: "orange" as const,
    },
    {
      icon: <Globe className="w-5 h-5" />,
      title: "Future Ready",
      description: "Empowering businesses and individuals to thrive in the AI-driven world.",
      accent: "purple" as const,
    },
  ];

  return (
    <section id="ecosystem" className="relative w-full bg-[#050505] text-white overflow-hidden py-24 z-20">
      {/* Thin futuristic divider line above section */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-60" />

      {/* Noise overlay */}
      <div
        className="absolute inset-0 opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Subtle background radial gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-orange/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 flex flex-col items-center">
        {/* Eyebrow label */}
        <motion.span
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-xs font-bold tracking-[0.3em] uppercase text-brand-orange font-mono mb-4 text-center block"
        >
          OUR ECOSYSTEM ADVANTAGE
        </motion.span>

        {/* Main Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-sora font-extrabold text-center text-white leading-tight mb-6 max-w-4xl text-3xl sm:text-4xl md:text-5xl lg:text-[64px]"
        >
          One Ecosystem. Two Engines. <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-brand-orange to-brand-amber bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(255,90,31,0.2)] font-extrabold">
            Infinite
          </span>{" "}
          Possibilities.
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-white/70 text-sm md:text-base text-center max-w-[720px] leading-relaxed mb-16 font-sans"
        >
          We combine the power of technology and education to create impact, drive innovation, and build a future-ready world.
        </motion.p>

        {/* Cards Grid - 5 equal columns on desktop, responsive stack below */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 w-full max-w-7xl">
          {cards.map((card, i) => (
            <AdvantageCard
              key={i}
              index={i}
              icon={card.icon}
              title={card.title}
              description={card.description}
              accent={card.accent}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
