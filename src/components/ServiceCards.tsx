"use client";

import React from "react";
import { Code, Cpu, Globe, Cloud, TrendingUp } from "lucide-react";
import PhoenixCenterpiece from "./PhoenixCenterpiece";

interface CardData {
  id: number;
  icon: React.ReactNode;
  title: string;
  text: string;
  positionClass: string;
  floatClass: string;
  anchorX: number; // for SVG line drawing
  anchorY: number;
}

export default function ServiceCards() {
  const cards: CardData[] = [
    {
      id: 1,
      icon: <Code className="w-5 h-5 text-brand-orange" />,
      title: "SOFTWARE DEVELOPMENT",
      text: "Scalable, secure and future-proof software built for impact.",
      positionClass: "lg:absolute lg:left-[5%] lg:top-[22%] w-full lg:w-[260px]",
      floatClass: "animate-float-slow",
      anchorX: 310,
      anchorY: 300,
    },
    {
      id: 2,
      icon: <Cpu className="w-5 h-5 text-brand-orange" />,
      title: "AI & AUTOMATION",
      text: "Intelligent solutions that automate and accelerate business growth.",
      positionClass: "lg:absolute lg:right-[15%] lg:top-[8%] w-full lg:w-[260px]",
      floatClass: "animate-float-medium",
      anchorX: 720,
      anchorY: 180,
    },
    {
      id: 3,
      icon: <Globe className="w-5 h-5 text-brand-orange" />,
      title: "WEB & APP DEVELOPMENT",
      text: "High-performance web and mobile experiences that engage and convert.",
      positionClass: "lg:absolute lg:left-[8%] lg:bottom-[18%] w-full lg:w-[260px]",
      floatClass: "animate-float-fast",
      anchorX: 340,
      anchorY: 620,
    },
    {
      id: 4,
      icon: <Cloud className="w-5 h-5 text-brand-orange" />,
      title: "CLOUD & DEVOPS",
      text: "Cloud infrastructure and DevOps for speed, reliability and scale.",
      positionClass: "lg:absolute lg:right-[3%] lg:top-[38%] w-full lg:w-[260px]",
      floatClass: "animate-float-slow",
      anchorX: 840,
      anchorY: 450,
    },
    {
      id: 5,
      icon: <TrendingUp className="w-5 h-5 text-brand-orange" />,
      title: "DIGITAL TRANSFORMATION",
      text: "End-to-end digital transformation for the modern enterprise.",
      positionClass: "lg:absolute lg:right-[8%] lg:bottom-[14%] w-full lg:w-[260px]",
      floatClass: "animate-float-medium",
      anchorX: 790,
      anchorY: 680,
    },
  ];

  return (
    <div className="relative w-full h-full min-h-[600px] lg:min-h-[750px] flex items-center justify-center">
      {/* Centerpiece in the absolute center */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none lg:pointer-events-auto z-10">
        <PhoenixCenterpiece />
      </div>

      {/* Interactive Glowing Circuitry Connection Lines (Desktop Only) */}
      <svg
        viewBox="0 0 1000 800"
        className="absolute inset-0 w-full h-full hidden lg:block pointer-events-none z-10"
        style={{ filter: "drop-shadow(0 0 8px rgba(255, 90, 31, 0.3))" }}
      >
        <defs>
          {/* Neon line gradient */}
          <linearGradient id="line-glow-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ff8a00" />
            <stop offset="50%" stopColor="#ff5a1f" />
            <stop offset="100%" stopColor="#ff5a1f" stopOpacity={0.1} />
          </linearGradient>
        </defs>

        {/* Base circuitry lines */}
        {/* Card 1: Software Dev */}
        <path
          d="M 500,640 L 440,640 L 440,300 L 310,300"
          fill="none"
          stroke="rgba(255, 90, 31, 0.15)"
          strokeWidth="1.5"
        />
        {/* Card 2: AI & Automation */}
        <path
          d="M 500,640 L 560,640 L 560,180 L 720,180"
          fill="none"
          stroke="rgba(255, 90, 31, 0.15)"
          strokeWidth="1.5"
        />
        {/* Card 3: Web & App Dev */}
        <path
          d="M 500,640 L 450,640 L 450,620 L 340,620"
          fill="none"
          stroke="rgba(255, 90, 31, 0.15)"
          strokeWidth="1.5"
        />
        {/* Card 4: Cloud & DevOps */}
        <path
          d="M 500,640 L 620,640 L 620,450 L 840,450"
          fill="none"
          stroke="rgba(255, 90, 31, 0.15)"
          strokeWidth="1.5"
        />
        {/* Card 5: Digital Transformation */}
        <path
          d="M 500,640 L 650,640 L 650,680 L 790,680"
          fill="none"
          stroke="rgba(255, 90, 31, 0.15)"
          strokeWidth="1.5"
        />

        {/* Animated pulse flows running through the circuits */}
        <path
          d="M 500,640 L 440,640 L 440,300 L 310,300"
          fill="none"
          stroke="url(#line-glow-grad)"
          strokeWidth="2"
          strokeDasharray="30 150"
          className="animate-[pulse-flow_4s_linear_infinite]"
        />
        <path
          d="M 500,640 L 560,640 L 560,180 L 720,180"
          fill="none"
          stroke="url(#line-glow-grad)"
          strokeWidth="2"
          strokeDasharray="30 150"
          className="animate-[pulse-flow_5s_linear_infinite]"
        />
        <path
          d="M 500,640 L 450,640 L 450,620 L 340,620"
          fill="none"
          stroke="url(#line-glow-grad)"
          strokeWidth="2"
          strokeDasharray="20 100"
          className="animate-[pulse-flow_3.5s_linear_infinite]"
        />
        <path
          d="M 500,640 L 620,640 L 620,450 L 840,450"
          fill="none"
          stroke="url(#line-glow-grad)"
          strokeWidth="2"
          strokeDasharray="30 150"
          className="animate-[pulse-flow_6s_linear_infinite]"
        />
        <path
          d="M 500,640 L 650,640 L 650,680 L 790,680"
          fill="none"
          stroke="url(#line-glow-grad)"
          strokeWidth="2"
          strokeDasharray="20 120"
          className="animate-[pulse-flow_4.5s_linear_infinite]"
        />
      </svg>

      {/* CSS Animation Keyframes for Line Flows */}
      <style jsx global>{`
        @keyframes pulse-flow {
          0% {
            stroke-dashoffset: 200;
          }
          100% {
            stroke-dashoffset: -200;
          }
        }
      `}</style>

      {/* Floating service cards container */}
      <div className="w-full h-full flex flex-col lg:block gap-6 z-20 px-4 md:px-0">
        {cards.map((card) => (
          <div
            key={card.id}
            className={`${card.positionClass} ${card.floatClass} transition-all duration-300`}
          >
            {/* Dark glassmorphic card body */}
            <div className="glass-card rounded-2xl p-5 border border-brand-orange/20 relative group">
              {/* Internal ambient corner glow */}
              <div className="absolute top-0 left-0 w-8 h-8 bg-brand-orange/10 rounded-tl-2xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="flex items-start gap-4">
                {/* Glowing icon container */}
                <div className="p-2 rounded-xl bg-brand-orange/10 border border-brand-orange/20 flex items-center justify-center shadow-[0_0_15px_rgba(255,90,31,0.05)] group-hover:shadow-[0_0_15px_rgba(255,90,31,0.2)] group-hover:border-brand-orange/40 transition-all duration-300">
                  {card.icon}
                </div>
                
                <div className="flex-1">
                  <h3 className="text-white font-sora font-semibold text-xs tracking-wider mb-2 group-hover:text-brand-orange transition-colors duration-300">
                    {card.title}
                  </h3>
                  <p className="text-white/60 text-[11px] leading-relaxed font-sans">
                    {card.text}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
