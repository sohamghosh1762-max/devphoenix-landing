"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface Project {
  id: number;
  category: string;
  tabs: string[]; // which tabs this project belongs to
  title: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  image: string;
  accent: "orange" | "purple";
}

const projectsData: Project[] = [
  {
    id: 1,
    category: "AI & AUTOMATION",
    tabs: ["Tech Solutions", "AI & Automations"],
    title: "SentinelX Fraud Intelligence Platform",
    description: "AI-powered fraud detection system using graph intelligence, anomaly detection and real-time risk scoring.",
    ctaText: "View Case Study",
    ctaLink: "#case-sentinelx",
    image: "/sentinelx.png",
    accent: "purple",
  },
  {
    id: 2,
    category: "MOBILE APP",
    tabs: ["Tech Solutions", "Web & Mobile"],
    title: "SaveZo Smart Savings Platform",
    description: "Gamified financial wellness platform helping users save, invest and track goals intelligently.",
    ctaText: "View Case Study",
    ctaLink: "#case-savezo",
    image: "/savezo.png",
    accent: "orange",
  },
  {
    id: 3,
    category: "WEB DEVELOPMENT",
    tabs: ["Tech Solutions", "Web & Mobile"],
    title: "PropertyVerse Marketplace",
    description: "Modern real-estate marketplace connecting buyers, sellers and investors through AI-powered recommendations.",
    ctaText: "View Case Study",
    ctaLink: "#case-propertyverse",
    image: "/propertyverse.png",
    accent: "purple",
  },
  {
    id: 4,
    category: "AI AUTOMATION",
    tabs: ["Tech Solutions", "AI & Automations"],
    title: "Workflow Nexus Engine",
    description: "Business automation platform reducing manual tasks through intelligent workflows and integrations.",
    ctaText: "View Case Study",
    ctaLink: "#case-workflow",
    image: "/workflownexus.png",
    accent: "orange",
  },
  {
    id: 5,
    category: "IMPACT AREA",
    tabs: ["Impact Areas"],
    title: "FutureTech Academy",
    description: "Industry-aligned upskilling ecosystem preparing students for AI, data and software careers.",
    ctaText: "Explore Programs",
    ctaLink: "#academy-programs",
    image: "/futuretech.png",
    accent: "orange",
  },
  {
    id: 6,
    category: "HEALTHCARE AI",
    tabs: ["Tech Solutions", "AI & Automations"],
    title: "MedIntel Predictive Analytics",
    description: "AI-driven healthcare analytics platform for chronic disease prediction and patient risk assessment.",
    ctaText: "View Case Study",
    ctaLink: "#case-medintel",
    image: "/medintel.png",
    accent: "purple",
  },
];

const tabs = [
  "All",
  "Tech Solutions",
  "AI & Automations",
  "Web & Mobile",
  "Impact Areas",
];

export default function InnovationInAction() {
  const [activeTab, setActiveTab] = useState("All");
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Filter projects based on active tab
  const filteredProjects = projectsData.filter((project) => {
    if (activeTab === "All") return true;
    return project.tabs.includes(activeTab);
  });

  const checkScrollLimits = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 5);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 5);
    }
  };

  useEffect(() => {
    const carousel = carouselRef.current;
    if (carousel) {
      carousel.addEventListener("scroll", checkScrollLimits);
      // Run once initially and on resize
      checkScrollLimits();
      window.addEventListener("resize", checkScrollLimits);
    }
    return () => {
      if (carousel) {
        carousel.removeEventListener("scroll", checkScrollLimits);
      }
      window.removeEventListener("resize", checkScrollLimits);
    };
  }, [filteredProjects]);

  const scroll = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const scrollAmount = 360; // card width (320px) + gap (40px)
      const targetScroll =
        carouselRef.current.scrollLeft +
        (direction === "left" ? -scrollAmount : scrollAmount);

      carouselRef.current.scrollTo({
        left: targetScroll,
        behavior: "smooth",
      });
    }
  };

  return (
    <section id="work" className="relative w-full bg-[#050505] text-white py-24 z-20">
      {/* Noise overlay */}
      <div
        className="absolute inset-0 opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Subtle background radial glows */}
      <div className="absolute top-1/2 right-10 w-[500px] h-[500px] bg-brand-orange/[0.03] rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[450px] h-[450px] bg-purple-500/[0.03] rounded-full blur-[110px] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 flex flex-col items-center">
        {/* Eyebrow */}
        <motion.span
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-xs font-bold tracking-[0.3em] uppercase text-brand-orange font-mono mb-4 text-center block"
        >
          INNOVATION IN ACTION
        </motion.span>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-sora font-extrabold text-center text-white text-3xl sm:text-4xl md:text-5xl leading-tight mb-12"
        >
          Explore What We Build & Enable
        </motion.h2>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 md:gap-6 mb-16 border-b border-white/[0.04] pb-4 w-full max-w-4xl">
          {tabs.map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative px-4 py-2 text-sm font-medium tracking-wide transition-all duration-300 cursor-pointer ${
                  isActive ? "text-brand-orange font-semibold" : "text-white/60 hover:text-white"
                }`}
              >
                <span>{tab}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeTabUnderline"
                    className="absolute bottom-[-17px] left-0 right-0 h-[2px] bg-brand-orange shadow-[0_0_8px_rgba(255,90,31,0.8)]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Portfolio Showcase Carousel Container */}
        <div className="relative w-full max-w-7xl flex items-center justify-center">
          
          {/* Left Arrow Button */}
          <button
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            className={`absolute left-0 lg:-left-6 z-30 w-12 h-12 rounded-full border border-white/10 bg-black/60 backdrop-blur-md flex items-center justify-center cursor-pointer transition-all duration-300 hover:border-brand-orange hover:shadow-[0_0_15px_rgba(255,90,31,0.3)] disabled:opacity-20 disabled:pointer-events-none group`}
          >
            <ChevronLeft size={20} className="text-white group-hover:text-brand-orange transition-colors" />
          </button>

          {/* Carousel Scroll Wrapper */}
          <div
            ref={carouselRef}
            className="flex gap-8 overflow-x-auto py-6 px-12 md:px-6 w-full scrollbar-none snap-x snap-mandatory scroll-smooth"
            style={{
              scrollBehavior: "smooth",
            }}
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => {
                const accentColor =
                  project.accent === "purple"
                    ? "text-purple-400 border-purple-500/20 bg-purple-500/5 shadow-[0_0_12px_rgba(168,85,247,0.05)]"
                    : "text-brand-orange border-brand-orange/20 bg-brand-orange/5 shadow-[0_0_12px_rgba(255,90,31,0.05)]";

                const glowColor =
                  project.accent === "purple"
                    ? "group-hover:shadow-[0_0_30px_rgba(168,85,247,0.15)] group-hover:border-purple-500/30"
                    : "group-hover:shadow-[0_0_30px_rgba(255,90,31,0.15)] group-hover:border-brand-orange/30";

                return (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                    className={`flex-shrink-0 w-[320px] h-[420px] rounded-[20px] border border-white/[0.06] bg-black/40 backdrop-blur-md overflow-hidden flex flex-col justify-between p-5 snap-start group cursor-pointer transition-all duration-300 hover:scale-[1.02] ${glowColor}`}
                    style={{
                      boxShadow: "inset 0 1px 1px rgba(255,255,255,0.02)",
                    }}
                  >
                    {/* Top: Project Image */}
                    <div className="relative w-full h-[160px] rounded-xl overflow-hidden mb-4">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="320px"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    </div>

                    {/* Middle: Category Tag & Info */}
                    <div className="flex-1 flex flex-col justify-start">
                      <span
                        className={`text-[9px] font-bold tracking-[0.2em] px-2 py-0.5 border rounded-full w-fit mb-2.5 uppercase ${accentColor}`}
                      >
                        {project.category}
                      </span>
                      <h3 className="font-sora font-bold text-white text-base leading-snug mb-2 group-hover:text-brand-orange transition-colors duration-300">
                        {project.title}
                      </h3>
                      <p className="text-white/50 text-[11px] leading-relaxed font-sans line-clamp-3">
                        {project.description}
                      </p>
                    </div>

                    {/* Bottom: Action CTA */}
                    <div className="flex items-center gap-1.5 mt-4 pt-3 border-t border-white/5 group/cta">
                      <span className="text-xs font-bold uppercase tracking-wider text-white/80 group-hover:text-brand-orange transition-colors duration-300">
                        {project.ctaText}
                      </span>
                      <ArrowRight
                        size={14}
                        className="text-white/60 group-hover:text-brand-orange group-hover:translate-x-1 transition-all duration-300"
                      />
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Right Arrow Button */}
          <button
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            className={`absolute right-0 lg:-right-6 z-30 w-12 h-12 rounded-full border border-white/10 bg-black/60 backdrop-blur-md flex items-center justify-center cursor-pointer transition-all duration-300 hover:border-brand-orange hover:shadow-[0_0_15px_rgba(255,90,31,0.3)] disabled:opacity-20 disabled:pointer-events-none group`}
          >
            <ChevronRight size={20} className="text-white group-hover:text-brand-orange transition-colors" />
          </button>

        </div>
      </div>

      {/* Elegant thin divider line below Section 2 */}
      <div className="mt-20 w-full flex justify-center">
        <div className="w-[85%] max-w-7xl h-[1px] bg-white opacity-10" />
      </div>
    </section>
  );
}
