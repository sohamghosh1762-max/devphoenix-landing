"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Home as HomeIcon, 
  Cpu, 
  GraduationCap, 
  Briefcase, 
  Info, 
  Users, 
  ArrowUpRight, 
  Play, 
  ArrowDown, 
  Brain, 
  Code, 
  Globe, 
  Cloud, 
  TrendingUp, 
  Award, 
  Target, 
  User, 
  ChevronDown, 
  ChevronUp, 
  Mail, 
  Phone, 
  MapPin, 
  ArrowRight,
  Sparkles,
  ChevronRight,
  BookOpen,
  Lock,
  ExternalLink,
  ShieldCheck,
  Zap,
  CheckCircle2,
  Menu,
  X
} from "lucide-react";
import Image from "next/image";
import { useConnectModal } from "../context/ConnectModalContext";
import TrustedCompanies from "./TrustedCompanies";
import BackgroundEffects from "./BackgroundEffects";
import { TeamView } from "./TeamOverlay";

interface ServiceItem {
  id: number;
  title: string;
  icon: React.ReactNode;
  description: string;
  features: string[];
}

interface ProjectItem {
  id: number;
  category: string;
  tabs: string[];
  title: string;
  description: string;
  image: string;
  accent: "orange" | "purple";
  details: string[];
}

interface MobileAppProps {
  onPlayDesktopIntro: () => void;
}

export default function MobileApp({ onPlayDesktopIntro }: MobileAppProps) {
  const [activeTab, setActiveTab] = useState(0); // 0: Home, 1: Tech, 2: Academy, 3: Work, 4: Resources, 5: About
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { openModal } = useConnectModal();

  // Navigation Items (7 tabs: Home, Tech, Academy, Work, Team, Resources, About)
  const navItems = [
    { id: 0, label: "Home", icon: <HomeIcon size={16} /> },
    { id: 1, label: "Tech", icon: <Cpu size={16} /> },
    { id: 2, label: "Academy", icon: <GraduationCap size={16} /> },
    { id: 3, label: "Our Work", icon: <Briefcase size={16} /> },
    { id: 4, label: "Our Team", icon: <Users size={16} /> },
    { id: 5, label: "Resources", icon: <BookOpen size={16} /> },
    { id: 6, label: "About Us", icon: <Info size={16} /> },
  ];

  // Motion variants for tab change slide animation
  const slideVariants = {
    initial: (direction: number) => ({
      x: direction > 0 ? 80 : -80,
      opacity: 0,
    }),
    animate: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: "spring" as const, stiffness: 350, damping: 30 },
        opacity: { duration: 0.15 },
      },
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 80 : -80,
      opacity: 0,
      transition: {
        x: { type: "spring" as const, stiffness: 350, damping: 30 },
        opacity: { duration: 0.15 },
      },
    }),
  };

  const [prevTab, setPrevTab] = useState(0);
  const direction = activeTab - prevTab;

  const handleTabChange = (newTab: number) => {
    setPrevTab(activeTab);
    setActiveTab(newTab);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="relative min-h-screen bg-[#050505] text-white flex flex-col justify-between overflow-x-hidden select-none pb-24">
      {/* Background Glows and Grid */}
      <BackgroundEffects />

      {/* Sticky Premium Header */}
      <header className="sticky top-0 left-0 w-full z-45 bg-[#050505]/75 border-b border-brand-orange/15 shadow-[0_4px_30px_rgba(0,0,0,0.4)] backdrop-blur-md h-16 flex items-center justify-between px-6 pt-safe">
        <div className="flex items-center">
          <Image
            src="/logo.png"
            alt="DevPhoenix"
            width={190}
            height={48}
            priority
            className="h-11 w-auto object-contain"
          />
        </div>
        <button
          onClick={() => setIsMenuOpen(true)}
          className="p-2 text-white/80 hover:text-brand-orange transition-colors cursor-pointer flex items-center justify-center"
        >
          <Menu size={24} />
        </button>
      </header>

      {/* Full Screen Menu Overlay Drawer (matching user screenshot layout) */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed inset-0 z-50 bg-[#050505]/98 px-6 pt-safe pb-8 flex flex-col justify-between"
          >
            {/* Header in Overlay */}
            <div className="h-16 flex items-center justify-between border-b border-white/5">
              <Image
                src="/logo.png"
                alt="DevPhoenix"
                width={190}
                height={48}
                priority
                className="h-11 w-auto object-contain"
              />
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-2 text-white/80 hover:text-brand-orange transition-colors cursor-pointer"
              >
                <X size={24} />
              </button>
            </div>

            {/* Main Links */}
            <div className="flex-1 flex flex-col justify-start gap-7 pt-8 pl-2">
              <button
                onClick={() => {
                  handleTabChange(0);
                  setIsMenuOpen(false);
                }}
                className="text-left text-xl font-bold font-sora text-white hover:text-brand-orange transition-colors cursor-pointer"
              >
                Home
              </button>
              
              <a
                href="https://tech.devphoenix.com/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMenuOpen(false)}
                className="text-left text-xl font-bold font-sora text-white hover:text-brand-orange transition-colors cursor-pointer"
              >
                Tech
              </a>
              
              <a
                href="https://academy.devphoenix.com/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMenuOpen(false)}
                className="text-left text-xl font-bold font-sora text-white hover:text-brand-orange transition-colors cursor-pointer"
              >
                Academy
              </a>

              <button
                onClick={() => {
                  handleTabChange(3); // Our Work tab
                  setIsMenuOpen(false);
                }}
                className="text-left text-xl font-bold font-sora text-white hover:text-brand-orange transition-colors cursor-pointer"
              >
                Our Work
              </button>

              <button
                onClick={() => {
                  handleTabChange(4); // Our Team tab
                  setIsMenuOpen(false);
                }}
                className="text-left text-xl font-bold font-sora text-white hover:text-brand-orange transition-colors cursor-pointer"
              >
                Our Team
              </button>

              <button
                onClick={() => {
                  handleTabChange(6); // About Us tab
                  setIsMenuOpen(false);
                }}
                className="text-left text-xl font-bold font-sora text-white hover:text-brand-orange transition-colors cursor-pointer"
              >
                About Us
              </button>

              {/* Resources Divider */}
              <div className="border-t border-white/10 my-4" />

              {/* Resources Subsection */}
              <div className="flex flex-col gap-2">
                <span className="text-[10px] font-extrabold uppercase font-mono tracking-widest text-white/40">
                  Resources
                </span>
                
                <div className="grid grid-cols-2 gap-y-4 gap-x-2 pt-2">
                  <button
                    onClick={() => {
                      handleTabChange(5); // resources tab
                      setIsMenuOpen(false);
                    }}
                    className="text-left text-[13px] font-medium text-white/70 hover:text-brand-orange transition-colors cursor-pointer"
                  >
                    Blog & Insights
                  </button>
                  <button
                    onClick={() => {
                      handleTabChange(3); // work/case studies tab
                      setIsMenuOpen(false);
                    }}
                    className="text-left text-[13px] font-medium text-white/70 hover:text-brand-orange transition-colors cursor-pointer"
                  >
                    Case Studies
                  </button>
                  <button
                    onClick={() => {
                      handleTabChange(5); // resources tab
                      setIsMenuOpen(false);
                    }}
                    className="text-left text-[13px] font-medium text-white/70 hover:text-brand-orange transition-colors cursor-pointer"
                  >
                    Documentation
                  </button>
                  <button
                    onClick={() => {
                      handleTabChange(5); // resources tab
                      setIsMenuOpen(false);
                    }}
                    className="text-left text-[13px] font-medium text-white/70 hover:text-brand-orange transition-colors cursor-pointer"
                  >
                    Tech Academy Portal
                  </button>
                </div>
              </div>
            </div>

            {/* Let's Connect button at bottom */}
            <div className="pt-4">
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  openModal();
                }}
                className="w-full py-3.5 rounded-xl border border-brand-orange/30 bg-brand-orange/5 hover:bg-brand-orange/15 text-white font-bold text-center text-sm uppercase tracking-wider transition-all shadow-[0_4px_20px_rgba(255,90,31,0.05)] cursor-pointer"
              >
                Let&apos;s Connect
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scrollable Main View Container */}
      <main className="flex-1 w-full max-w-md mx-auto px-5 pt-4 pb-12 relative z-10 flex flex-col justify-start">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={activeTab}
            custom={direction}
            variants={slideVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="w-full flex-1 flex flex-col"
          >
            {activeTab === 0 && (
              <HomeView 
                onExploreTech={() => window.open("https://tech.devphoenix.com/", "_blank")}
                onExploreAcademy={() => window.open("https://academy.devphoenix.com/", "_blank")}
                onPlayIntro={onPlayDesktopIntro}
              />
            )}
            {activeTab === 1 && <TechView onConnect={() => openModal("client")} />}
            {activeTab === 2 && <AcademyView onConnect={() => openModal("student")} />}
            {activeTab === 3 && <WorkView />}
            {activeTab === 4 && (
              <TeamView 
                isMobile={true}
                onExploreWork={() => handleTabChange(3)}
                onBackToHome={() => handleTabChange(0)}
              />
            )}
            {activeTab === 5 && <ResourcesView />}
            {activeTab === 6 && (
              <AboutView 
                onPlayIntro={onPlayDesktopIntro}
                onConnect={() => openModal()}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Premium Horizontal Scrollable Bottom Navigation Bar */}
      <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[94%] max-w-sm z-50 rounded-full border border-brand-orange/20 bg-black/90 backdrop-blur-lg shadow-[0_8px_32px_rgba(0,0,0,0.85)] pb-safe overflow-hidden flex items-center">
        {/* Soft edge masking for scroll indicator */}
        <div className="absolute top-0 bottom-0 left-0 w-4 bg-gradient-to-r from-black to-transparent pointer-events-none z-10" />
        <div className="absolute top-0 bottom-0 right-0 w-4 bg-gradient-to-l from-black to-transparent pointer-events-none z-10" />
        
        <div className="flex items-center gap-1 overflow-x-auto scrollbar-none px-4 py-2 flex-nowrap w-full">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            
            // Redirect external Tech and Academy buttons on bottom navigation bar
            const isRedirectItem = item.id === 1 || item.id === 2;
            const redirectUrl = item.id === 1 ? "https://tech.devphoenix.com/" : "https://academy.devphoenix.com/";
            
            const handleClick = () => {
              if (isRedirectItem) {
                window.open(redirectUrl, "_blank");
              } else {
                handleTabChange(item.id);
              }
            };

            return (
              <button
                key={item.id}
                onClick={handleClick}
                className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all duration-300 flex-shrink-0 cursor-pointer"
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTabGlow"
                    className="absolute inset-0 rounded-full bg-brand-orange/10 border border-brand-orange/20 -z-10"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <div className={`transition-colors duration-300 ${isActive ? "text-brand-orange" : "text-white/40"}`}>
                  {item.icon}
                </div>
                <span className={`text-[10px] font-bold tracking-wider transition-colors duration-300 ${isActive ? "text-white" : "text-white/40"}`}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}

// ==========================================
// 1. HOME VIEW
// ==========================================
interface HomeViewProps {
  onExploreTech: () => void;
  onExploreAcademy: () => void;
  onPlayIntro: () => void;
}

function HomeView({ onExploreTech, onExploreAcademy, onPlayIntro }: HomeViewProps) {
  const advantages = [
    {
      title: "AI-First Approach",
      desc: "Building intelligent solutions powered by AI, automation, and graph intelligence.",
      color: "border-purple-500/20 bg-purple-500/[0.02]"
    },
    {
      title: "Two Powerful Engines",
      desc: "Tech solutions for enterprise scale and academy programs for upskilling developers.",
      color: "border-brand-orange/20 bg-brand-orange/[0.02]"
    },
    {
      title: "Practical & Impactful",
      desc: "We focus on solving commercial bottlenecks through execution, testing, and launch.",
      color: "border-purple-500/20 bg-purple-500/[0.02]"
    },
    {
      title: "Industry Focused",
      desc: "Programs and custom developments built around current market standards.",
      color: "border-brand-orange/20 bg-brand-orange/[0.02]"
    },
    {
      title: "Future Ready",
      desc: "Empowering businesses and developers to succeed in an AI-dominated ecosystem.",
      color: "border-purple-500/20 bg-purple-500/[0.02]"
    }
  ];

  return (
    <div className="flex flex-col gap-8 w-full">
      {/* Mini Tag Label */}
      <div className="flex justify-center mt-2">
        <span className="text-[9px] font-extrabold tracking-[0.2em] text-brand-orange font-mono bg-brand-orange/5 px-3 py-1 rounded-full border border-brand-orange/15 shadow-[0_0_10px_rgba(255,90,31,0.05)]">
          TECHNOLOGY • EDUCATION • INNOVATION
        </span>
      </div>

      {/* Main Heading */}
      <div className="text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-white leading-[1.1] font-sora">
          BUILDING <br />
          INTELLIGENT <br />
          <span className="text-orange-glow bg-gradient-to-r from-brand-orange to-brand-amber bg-clip-text text-transparent drop-shadow-[0_0_12px_rgba(255,90,31,0.3)]">
            DIGITAL <br />
            ECOSYSTEMS
          </span>
        </h1>
        <p className="text-white/60 text-xs sm:text-sm leading-relaxed mt-4 max-w-xs mx-auto font-sans">
          We combine cutting-edge technology with future-ready education to help businesses scale, automate, and succeed in the digital era.
        </p>
      </div>

      {/* Custom Floating Centersparkles Illustration */}
      <div className="relative w-full aspect-square max-w-[320px] mx-auto flex items-center justify-center pointer-events-none my-6">
        
        {/* Center icon container (enlarged and cleaned of background rings) */}
        <motion.div
          animate={{
            y: [-15, 15, -15],
            scale: [0.96, 1.04, 0.96]
          }}
          transition={{
            duration: 4.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="relative w-48 h-48 flex items-center justify-center"
        >
          {/* Intense drop shadow glow behind the enlarged logo */}
          <div className="absolute inset-0 rounded-full blur-[50px] bg-brand-orange/25 opacity-70" />
          
          <Image
            src="/phoenix-icon.png"
            alt="DevPhoenix Center"
            width={240}
            height={240}
            className="w-36 h-36 object-contain drop-shadow-[0_0_30px_rgba(255,90,31,0.75)]"
            priority
          />
        </motion.div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-3 w-full max-w-xs mx-auto">
        <button
          onClick={onExploreTech}
          className="w-full py-3.5 rounded-xl text-xs font-bold tracking-wider uppercase text-white flex items-center justify-center gap-2 bg-gradient-to-r from-brand-orange to-brand-amber shadow-[0_0_20px_rgba(255,90,31,0.25)] cursor-pointer"
        >
          <span>Explore Tech</span>
          <ArrowRight size={14} />
        </button>

        <button
          onClick={onExploreAcademy}
          className="w-full py-3.5 rounded-xl text-xs font-bold tracking-wider uppercase text-white flex items-center justify-center gap-2 border border-brand-orange/30 bg-brand-orange/5 cursor-pointer"
        >
          <span>Explore Academy</span>
          <ArrowRight size={14} className="text-brand-orange" />
        </button>
      </div>

      {/* Quick Interactive Video Story CTA */}
      <div className="flex items-center justify-center gap-6 text-white/50 text-[10px] font-bold border-t border-white/5 pt-5 max-w-xs mx-auto">
        <button 
          onClick={onPlayIntro} 
          className="flex items-center gap-1.5 hover:text-white transition-all cursor-pointer"
        >
          <div className="w-5 h-5 rounded-full border border-white/10 flex items-center justify-center bg-white/[0.02]">
            <Play size={8} className="fill-white/80 text-transparent translate-x-[0.5px]" />
          </div>
          <span>Watch Our Story</span>
        </button>

        <div className="h-3 w-[1px] bg-white/10" />

        <button 
          onClick={() => {
            const pathsSec = document.getElementById("mobile-paths");
            if (pathsSec) {
              pathsSec.scrollIntoView({ behavior: "smooth" });
            }
          }}
          className="flex items-center gap-1 hover:text-white transition-all animate-pulse cursor-pointer"
        >
          <span>Discover Services</span>
          <ArrowDown size={10} />
        </button>
      </div>

      {/* ================= CHOOSE YOUR PATH ================= */}
      <div id="mobile-paths" className="flex flex-col gap-4 mt-4">
        <div className="text-center">
          <span className="text-[8px] font-extrabold uppercase font-mono tracking-[0.3em] text-[#ff5a1f]">
            Two Paths. One Mission.
          </span>
          <h3 className="font-sora font-extrabold text-xl text-white mt-1">
            Choose Your Path
          </h3>
        </div>

        <div className="flex flex-col gap-4">
          {/* Tech Path Card */}
          <div className="p-5 rounded-2xl border border-brand-orange/20 bg-black/40 backdrop-blur-md relative overflow-hidden flex flex-col gap-3">
            <div className="absolute top-0 right-0 w-24 h-24 bg-brand-orange/[0.03] rounded-full blur-xl" />
            <div className="flex items-center gap-2">
              <Cpu size={16} className="text-brand-orange" />
              <h4 className="font-sora font-extrabold text-xs uppercase tracking-wider text-white">DevPhoenix Tech</h4>
            </div>
            <p className="text-white/60 text-[11px] leading-relaxed">
              We engineer scalable software, AI integrations, cloud pipelines, and automated architectures for commercial clients.
            </p>
            <button
              onClick={onExploreTech}
              className="mt-1 w-full py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider border border-brand-orange/40 bg-brand-orange/5 text-white flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Explore Tech Services</span>
              <ChevronRight size={12} />
            </button>
          </div>

          {/* Academy Path Card */}
          <div className="p-5 rounded-2xl border border-purple-500/20 bg-black/40 backdrop-blur-md relative overflow-hidden flex flex-col gap-3">
            <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/[0.03] rounded-full blur-xl" />
            <div className="flex items-center gap-2">
              <GraduationCap size={16} className="text-purple-400" />
              <h4 className="font-sora font-extrabold text-xs uppercase tracking-wider text-white">DevPhoenix Academy</h4>
            </div>
            <p className="text-white/60 text-[11px] leading-relaxed">
              We provide industrial training, internships, core cohorts, and referrals to prepare developers for commercial teams.
            </p>
            <button
              onClick={onExploreAcademy}
              className="mt-1 w-full py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider border border-purple-500/40 bg-purple-500/5 text-white flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Explore Academy</span>
              <ChevronRight size={12} className="text-purple-400" />
            </button>
          </div>
        </div>
      </div>

      {/* ================= ECOSYSTEM ADVANTAGE ================= */}
      <div className="flex flex-col gap-4 mt-4">
        <div className="text-center">
          <span className="text-[8px] font-extrabold uppercase font-mono tracking-[0.3em] text-[#ff5a1f]">
            Why Partner With Us?
          </span>
          <h3 className="font-sora font-extrabold text-xl text-white mt-1">
            Ecosystem Advantage
          </h3>
        </div>

        {/* Horizontal Scrolling Advantages */}
        <div className="flex gap-4 overflow-x-auto scrollbar-none py-2 -mx-5 px-5">
          {advantages.map((adv, idx) => (
            <div
              key={idx}
              className={`w-[220px] p-5 rounded-2xl border flex-shrink-0 flex flex-col gap-2 ${adv.color}`}
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 size={14} className="text-brand-orange" />
                <h4 className="font-sora font-extrabold text-xs uppercase tracking-wide text-white">
                  {adv.title}
                </h4>
              </div>
              <p className="text-white/60 text-[10px] leading-relaxed">
                {adv.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Trusted Companies */}
      <div className="w-full mt-4">
        <TrustedCompanies />
      </div>

      {/* Bottom CTA Banner */}
      <div className="w-full mt-4 pb-4">
        <HomeBottomCTA />
      </div>
    </div>
  );
}

function HomeBottomCTA() {
  const { openModal } = useConnectModal();
  return (
    <div className="p-6 rounded-2xl border border-white/[0.06] bg-black/60 backdrop-blur-md relative overflow-hidden flex flex-col gap-4 text-center">
      <div className="absolute top-0 right-0 w-28 h-28 bg-brand-orange/[0.03] rounded-full blur-xl" />
      <div className="mx-auto w-12 h-12 bg-brand-orange/5 border border-brand-orange/15 rounded-xl flex items-center justify-center">
        <Image
          src="/phoenix-icon.png"
          alt="DevPhoenix Icon"
          width={30}
          height={30}
          className="object-contain w-6 h-6"
        />
      </div>
      <div>
        <h4 className="font-sora font-extrabold text-sm text-white">
          Let&apos;s Build the Future Together
        </h4>
        <p className="text-[10px] text-white/50 leading-relaxed mt-1 max-w-xs mx-auto">
          Partner with us to automate, innovate and scale your business models. DevPhoenix is your partner in progress.
        </p>
      </div>

      <div className="flex flex-col gap-2.5 mt-1">
        <button
          onClick={() => openModal("client")}
          className="w-full py-3 rounded-xl text-[10px] font-extrabold tracking-wider uppercase text-white flex items-center justify-center gap-1.5 bg-gradient-to-r from-brand-orange to-brand-amber shadow-[0_0_20px_rgba(255,90,31,0.2)] cursor-pointer"
        >
          <span>Work With Us</span>
          <ArrowRight size={12} />
        </button>
        <button
          onClick={() => openModal("student")}
          className="w-full py-3 rounded-xl text-[10px] font-extrabold tracking-wider uppercase text-white flex items-center justify-center gap-1.5 border border-white/15 bg-white/[0.02] cursor-pointer"
        >
          <span>Start Your Journey</span>
          <ArrowRight size={12} className="text-brand-orange" />
        </button>
      </div>
    </div>
  );
}

// ==========================================
// 2. TECH SOLUTIONS VIEW
// ==========================================
function TechView({ onConnect }: { onConnect: () => void }) {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const services: ServiceItem[] = [
    {
      id: 1,
      title: "AI & Automation",
      icon: <Brain className="w-5 h-5" />,
      description: "Intelligent solutions that automate workflows, process data and accelerate growth.",
      features: [
        "Custom LLMs & Intelligent Chatbots",
        "Robotic Process Automation (RPA)",
        "Workflow Automation & APIs Integration",
        "Predictive Data Analytics Models"
      ]
    },
    {
      id: 2,
      title: "Software Development",
      icon: <Code className="w-5 h-5" />,
      description: "Scalable, secure, and future-proof custom codebases built to solve real enterprise needs.",
      features: [
        "Robust Microservices Architecture",
        "Custom API Engineering & Integrations",
        "High-performance Systems",
        "Enterprise Dashboard Systems"
      ]
    },
    {
      id: 3,
      title: "Web & App Development",
      icon: <Globe className="w-5 h-5" />,
      description: "High-performance web and mobile application experiences that engage users and scale.",
      features: [
        "Modern React/Next.js Custom Hubs",
        "Native/Cross-Platform iOS & Android Apps",
        "Real-time Data Streaming Dashboards",
        "Fully Managed E-Commerce Portals"
      ]
    },
    {
      id: 4,
      title: "Cloud & DevOps",
      icon: <Cloud className="w-5 h-5" />,
      description: "Cloud infrastructure setup and CI/CD automation for speed, reliability, and security.",
      features: [
        "Docker & Kubernetes Containerization",
        "AWS, GCP & Azure Managed Migration",
        "Automated CI/CD Deployment Pipelines",
        "High-Uptime (99.9%) Architecture"
      ]
    },
    {
      id: 5,
      title: "Digital Transformation",
      icon: <TrendingUp className="w-5 h-5" />,
      description: "Comprehensive audits and structural updates to transition operations to modern digital standards.",
      features: [
        "Operational Bottleneck Auditing",
        "Legacy Code & Stack Modernization",
        "Collaborative Digital Roadmapping",
        "Team Technical Support & Training"
      ]
    }
  ];

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Header Info */}
      <div className="text-center">
        <span className="text-[10px] font-bold tracking-[0.2em] text-[#ff5a1f] uppercase block mb-1">
          DEVPHOENIX TECH
        </span>
        <h2 className="text-2xl font-extrabold font-sora text-white">
          Intelligent Tech <br />
          For Digital Scale
        </h2>
        <p className="text-white/50 text-[11px] mt-2 max-w-xs mx-auto leading-relaxed">
          Tap each category below to explore details, features, and target business modules.
        </p>
      </div>

      {/* Expandable Accordion Services Cards */}
      <div className="flex flex-col gap-3 mt-2">
        {services.map((svc) => {
          const isExpanded = expandedId === svc.id;
          return (
            <div
              key={svc.id}
              className={`rounded-2xl border transition-all duration-300 bg-black/40 backdrop-blur-md overflow-hidden ${
                isExpanded 
                  ? "border-brand-orange/45 shadow-[0_0_20px_rgba(255,90,31,0.08)] bg-brand-orange/[0.01]" 
                  : "border-white/[0.06] hover:border-white/[0.12]"
              }`}
            >
              {/* Card Header Row */}
              <button
                onClick={() => setExpandedId(isExpanded ? null : svc.id)}
                className="w-full p-4 flex items-center justify-between text-left cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2.5 rounded-xl border flex items-center justify-center transition-all ${
                    isExpanded 
                      ? "border-brand-orange/30 bg-brand-orange/5 text-brand-orange" 
                      : "border-white/[0.08] bg-white/[0.02] text-white/60"
                  }`}>
                    {svc.icon}
                  </div>
                  <div>
                    <h3 className="font-sora font-bold text-xs uppercase tracking-wider text-white">
                      {svc.title}
                    </h3>
                    <span className="text-[9px] text-white/40 block mt-0.5">
                      {isExpanded ? "Active details" : "Tap to expand features"}
                    </span>
                  </div>
                </div>

                <div className="text-white/40">
                  {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </div>
              </button>

              {/* Expanded content */}
              <AnimatePresence initial={false}>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="border-t border-white/5"
                  >
                    <div className="p-4 bg-brand-orange/[0.005] flex flex-col gap-4">
                      {/* Description */}
                      <p className="text-white/70 text-xs leading-relaxed">
                        {svc.description}
                      </p>

                      {/* Bullet Features */}
                      <div className="flex flex-col gap-2">
                        <span className="text-[9px] uppercase font-bold text-brand-orange tracking-widest font-mono">
                          Key Offerings
                        </span>
                        <ul className="flex flex-col gap-1.5">
                          {svc.features.map((feat, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-[11px] text-white/60">
                              <Sparkles size={10} className="text-brand-orange mt-1 flex-shrink-0" />
                              <span>{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Connect Action */}
                      <button
                        onClick={onConnect}
                        className="mt-2 w-full py-2.5 rounded-xl border border-brand-orange/35 bg-brand-orange/5 hover:bg-brand-orange/10 text-white font-bold text-[10px] uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <span>Request Consult</span>
                        <ArrowUpRight size={12} className="text-brand-orange" />
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* Ecosystem Notice */}
      <div className="glass-card rounded-2xl border border-white/[0.06] bg-black/55 backdrop-blur-md p-4 text-center mt-4">
        <h4 className="font-sora font-extrabold text-[11px] text-white tracking-wider uppercase mb-1">
          Custom Corporate Integration
        </h4>
        <p className="text-[10px] text-white/50 leading-relaxed max-w-xs mx-auto">
          Need a custom architectural draft or audit? Let’s schedule a technical call to dissect your specifications.
        </p>
        <button
          onClick={onConnect}
          className="mt-3 text-[10px] font-bold text-brand-orange hover:text-brand-amber transition-colors flex items-center gap-1 mx-auto cursor-pointer"
        >
          <span>Schedule Tech Audit</span>
          <ArrowRight size={10} />
        </button>
      </div>
    </div>
  );
}

// ==========================================
// 3. ACADEMY DIVISION VIEW
// ==========================================
function AcademyView({ onConnect }: { onConnect: () => void }) {
  const programs = [
    {
      title: "Industrial Training",
      icon: <Briefcase className="w-4 h-4" />,
      desc: "6-month immersive industrial training designed for developers wishing to enter high-level production fields.",
      tags: ["Hands-On Devs", "Production Code"]
    },
    {
      title: "Internship Programs",
      icon: <User className="w-4 h-4" />,
      desc: "Join active developer groups in our tech division, coding solutions for real clients with technical code review.",
      tags: ["Real Projects", "Mentorship"]
    },
    {
      title: "Certification Courses",
      icon: <Award className="w-4 h-4" />,
      desc: "Specialized cohorts on Full-Stack Next.js architectures, AI integrations, Cloud Deployment, and DevOps systems.",
      tags: ["Cohorts", "Uptime & AI"]
    },
    {
      title: "Mentorship & Placement",
      icon: <Target className="w-4 h-4" />,
      desc: "1-on-1 career direction mapping, mock technical screens, resume optimizations, and direct developer referrals.",
      tags: ["Jobs Portals", "1-on-1 Refer"]
    }
  ];

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Header Info */}
      <div className="text-center">
        <span className="text-[10px] font-bold tracking-[0.2em] text-brand-orange uppercase block mb-1">
          DEVPHOENIX ACADEMY
        </span>
        <h2 className="text-2xl font-extrabold font-sora text-white">
          Upskill For The <br />
          Intelligent Future
        </h2>
        <p className="text-white/50 text-[11px] mt-2 max-w-xs mx-auto leading-relaxed">
          Future-ready curriculum and real-world experience engineered to close the gap between college and active tech hubs.
        </p>
      </div>

      {/* Program Blocks Grid */}
      <div className="flex flex-col gap-4 mt-2">
        {programs.map((prog, idx) => (
          <div
            key={idx}
            className="p-5 rounded-2xl border border-white/[0.06] bg-black/40 backdrop-blur-md relative overflow-hidden flex flex-col gap-3 group"
          >
            {/* Soft Ambient Glow */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-brand-orange/[0.02] rounded-full blur-xl pointer-events-none" />

            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl border border-white/[0.08] bg-white/[0.02] flex items-center justify-center text-brand-orange shadow-[0_4px_15px_rgba(0,0,0,0.3)]">
                {prog.icon}
              </div>
              <h3 className="font-sora font-bold text-xs uppercase tracking-wide text-white">
                {prog.title}
              </h3>
            </div>

            <p className="text-white/60 text-[11px] leading-relaxed">
              {prog.desc}
            </p>

            <div className="flex flex-wrap gap-1.5 mt-1">
              {prog.tags.map((tg, tIdx) => (
                <span
                  key={tIdx}
                  className="text-[8px] font-extrabold uppercase font-mono tracking-wider text-brand-orange/80 bg-brand-orange/[0.04] border border-brand-orange/15 px-2 py-0.5 rounded-md"
                >
                  {tg}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Academy CTA */}
      <div className="rounded-2xl bg-gradient-to-r from-brand-orange to-brand-amber p-[1px] mt-2">
        <div className="rounded-2xl bg-[#050505] p-5 flex flex-col items-center text-center gap-3">
          <h4 className="font-sora font-extrabold text-xs text-white">
            Ready to Accelerate Your Career?
          </h4>
          <p className="text-[10px] text-white/50 leading-relaxed max-w-xs">
            Submit your application details for our next industrial training or internship cohorts starting soon.
          </p>
          <button
            onClick={onConnect}
            className="w-full py-3 rounded-xl text-[10px] font-extrabold tracking-wider uppercase text-white flex items-center justify-center gap-1.5 bg-gradient-to-r from-brand-orange to-brand-amber shadow-[0_0_20px_rgba(255,90,31,0.2)] cursor-pointer"
          >
            <span>Apply For Academy</span>
            <ArrowRight size={12} />
          </button>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 4. PROJECTS (WORK) VIEW
// ==========================================
function WorkView() {
  const [selectedTab, setSelectedTab] = useState("All");
  const [activeProjectDetail, setActiveProjectDetail] = useState<ProjectItem | null>(null);

  const tabs = ["All", "AI & Automations", "Web & Mobile", "Academy"];

  const projects: ProjectItem[] = [
    {
      id: 1,
      category: "AI & AUTOMATION",
      tabs: ["AI & Automations"],
      title: "SentinelX Fraud Intelligence",
      description: "AI-powered fraud detection system using graph intelligence, anomaly detection and real-time risk scoring.",
      image: "/sentinelx.png",
      accent: "purple",
      details: [
        "Reduces fraud anomalies detection speed by 85%",
        "Implemented graph databases (Neo4j) and telemetry patterns",
        "Automated security rules and triggers on transaction engines",
        "Supports over 10,000 transactions/sec real-time scoring"
      ]
    },
    {
      id: 2,
      category: "MOBILE APP",
      tabs: ["Web & Mobile"],
      title: "SaveZo Smart Savings",
      description: "Gamified financial wellness platform helping users save, invest and track goals intelligently.",
      image: "/savezo.png",
      accent: "orange",
      details: [
        "Highly engaging user onboarding flow with custom animations",
        "Supports dynamic custom goals creation & automated savings rules",
        "Interactive micro-savings triggers with bank API connectors",
        "Over 120,000 active app users across major devices"
      ]
    },
    {
      id: 3,
      category: "WEB DEVELOPMENT",
      tabs: ["Web & Mobile"],
      title: "PropertyVerse Marketplace",
      description: "Modern real-estate marketplace connecting buyers, sellers and investors through AI-powered recommendations.",
      image: "/propertyverse.png",
      accent: "purple",
      details: [
        "Dynamic search filters using vector-based NLP capabilities",
        "Embedded virtual 3D tour components directly on web layout",
        "Secure payments integration and digital escrow flow support",
        "Full dashboard panel built in Next.js for seller tracking"
      ]
    },
    {
      id: 4,
      category: "AI AUTOMATION",
      tabs: ["AI & Automations"],
      title: "Workflow Nexus Engine",
      description: "Business automation platform reducing manual tasks through intelligent workflows and integrations.",
      image: "/workflownexus.png",
      accent: "orange",
      details: [
        "Custom workflow layout builder using React Flow",
        "Saves over 30+ manual engineering hours per work group",
        "Direct webhook bridges to Slack, Discord, Jira & Salesforce",
        "Autonomous schedule runner handling background cron cycles"
      ]
    },
    {
      id: 5,
      category: "IMPACT AREA",
      tabs: ["Academy"],
      title: "FutureTech Academy Hub",
      description: "Industry-aligned upskilling ecosystem preparing students for AI, data and software careers.",
      image: "/futuretech.png",
      accent: "orange",
      details: [
        "Automated grading and coding tests execution sandbox",
        "Includes custom placement tracking portal for referrals",
        "Over 8,000 students enrolled in our technical certification courses",
        "Direct recruitment dashboard for software client partners"
      ]
    },
    {
      id: 6,
      category: "HEALTHCARE AI",
      tabs: ["AI & Automations"],
      title: "MedIntel Analytics Engine",
      description: "AI-driven healthcare analytics platform for chronic disease prediction and patient risk assessment.",
      image: "/medintel.png",
      accent: "purple",
      details: [
        "Fully HIPAA-compliant secure telemetry architectures",
        "Uses predictive machine learning engines based on clinical trials",
        "Interactive dashboard presenting patient diagnostics visualizer",
        "Integrated with 14 hospital networks as testing sandbox"
      ]
    }
  ];

  const filteredProjects = selectedTab === "All" 
    ? projects 
    : projects.filter(p => p.tabs.includes(selectedTab));

  return (
    <div className="flex flex-col gap-5 w-full relative">
      {/* Header Info */}
      <div className="text-center">
        <span className="text-[10px] font-bold tracking-[0.2em] text-[#ff5a1f] uppercase block mb-1">
          INNOVATION IN ACTION
        </span>
        <h2 className="text-2xl font-extrabold font-sora text-white">
          Our Projects & <br />
          Case Studies
        </h2>
        <p className="text-white/50 text-[11px] mt-2 max-w-xs mx-auto leading-relaxed">
          Browse modern software systems, platforms and academy frameworks built by DevPhoenix.
        </p>
      </div>

      {/* Category selector tabs */}
      <div className="flex items-center gap-2 overflow-x-auto scrollbar-none py-2 -mx-5 px-5">
        {tabs.map((tab) => {
          const isSelected = selectedTab === tab;
          return (
            <button
              key={tab}
              onClick={() => setSelectedTab(tab)}
              className={`px-4 py-2 rounded-full text-[10px] font-bold tracking-wider uppercase whitespace-nowrap transition-all duration-300 border cursor-pointer ${
                isSelected 
                  ? "bg-brand-orange/10 border-brand-orange text-brand-orange shadow-[0_0_12px_rgba(255,90,31,0.15)]" 
                  : "border-white/[0.06] bg-[#050505]/40 text-white/50 hover:text-white"
              }`}
            >
              {tab}
            </button>
          );
        })}
      </div>

      {/* Projects List Grid */}
      <div className="flex flex-col gap-4 mt-1">
        {filteredProjects.map((p) => {
          const accentColor = p.accent === "purple" ? "text-purple-400 border-purple-500/25 bg-purple-500/5" : "text-brand-orange border-brand-orange/25 bg-brand-orange/5";
          return (
            <div
              key={p.id}
              className="rounded-2xl border border-white/[0.06] bg-black/40 backdrop-blur-md overflow-hidden flex flex-col transition-all hover:border-white/[0.12]"
            >
              {/* Image banner */}
              <div className="relative w-full h-[150px] bg-white/[0.01]">
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] to-transparent z-10" />
                <div className="absolute top-3 left-3 z-20">
                  <span className={`text-[8px] font-extrabold uppercase font-mono tracking-wider px-2 py-0.5 border rounded-md ${accentColor}`}>
                    {p.category}
                  </span>
                </div>
                {/* Simulated / Fallback Image representation if path isn't loadable, using clean gradients */}
                <div className="absolute inset-0 w-full h-full flex items-center justify-center overflow-hidden">
                  <div className={`absolute w-44 h-44 rounded-full blur-3xl opacity-20 -top-10 -right-10 ${
                    p.accent === "purple" ? "bg-purple-600" : "bg-brand-orange"
                  }`} />
                  <div className="relative z-10 w-full h-full opacity-60">
                    <Image
                      src={p.image}
                      alt={p.title}
                      fill
                      className="object-cover object-center"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Title & Desc */}
              <div className="px-5 pb-5 pt-2 flex flex-col gap-2">
                <h3 className="font-sora font-extrabold text-sm text-white uppercase tracking-wide">
                  {p.title}
                </h3>
                <p className="text-white/60 text-[11px] leading-relaxed">
                  {p.description}
                </p>
                <button
                  onClick={() => setActiveProjectDetail(p)}
                  className="mt-2 w-fit text-[10px] font-bold text-brand-orange hover:text-brand-amber transition-colors flex items-center gap-1 group cursor-pointer"
                >
                  <span>View Case Specifications</span>
                  <ChevronRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Case Specification Detail Drawer/Modal Overlay */}
      <AnimatePresence>
        {activeProjectDetail && (
          <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/85 backdrop-blur-sm p-4">
            <motion.div
              initial={{ y: 200, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 200, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
              className="w-full max-w-sm rounded-t-3xl border border-white/[0.08] bg-black p-6 flex flex-col gap-4 shadow-[0_-8px_32px_rgba(0,0,0,0.8)] pb-safe"
            >
              <div className="flex justify-between items-center">
                <span className="text-[9px] font-extrabold uppercase font-mono tracking-widest text-brand-orange bg-brand-orange/5 px-2 py-0.5 border border-brand-orange/20 rounded-md">
                  {activeProjectDetail.category}
                </span>
                <button 
                  onClick={() => setActiveProjectDetail(null)}
                  className="text-white/40 hover:text-white text-xs font-bold font-sans p-1 cursor-pointer"
                >
                  Close
                </button>
              </div>

              <h3 className="font-sora font-extrabold text-sm uppercase tracking-wide text-white border-b border-white/5 pb-2">
                {activeProjectDetail.title}
              </h3>

              <div className="flex flex-col gap-2 mt-1">
                <span className="text-[9px] uppercase font-bold text-white/40 tracking-wider">
                  Technical Breakthroughs
                </span>
                <ul className="flex flex-col gap-2.5">
                  {activeProjectDetail.details.map((detail, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-[11px] text-white/70">
                      <div className="w-1.5 h-1.5 rounded-full bg-brand-orange mt-1.5 flex-shrink-0" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => setActiveProjectDetail(null)}
                className="mt-4 w-full py-3 rounded-xl border border-white/10 bg-white/[0.02] text-white font-bold text-[10px] uppercase tracking-wider transition-all cursor-pointer"
              >
                Go Back
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ==========================================
// 5. RESOURCES PORTAL VIEW
// ==========================================
function ResourcesView() {
  const [activeTab, setActiveTab] = useState("blogs"); // blogs | docs | portal
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [portalStatus, setPortalStatus] = useState<string | null>(null);

  const blogs = [
    {
      tag: "AI AUTOMATION",
      readTime: "4 min read",
      title: "The Shift to Autonomous Workforces in 2026",
      desc: "How enterprises are shifting from copilot assistants to complete background software agents handling operations.",
      date: "June 24, 2026"
    },
    {
      tag: "FRONTEND TECH",
      readTime: "5 min read",
      title: "Optimizing Framer Motion on Low-Tier Viewports",
      desc: "Behind the scenes on throttling canvases, reducing layout recalculations, and setting spring constants.",
      date: "May 18, 2026"
    },
    {
      tag: "DEVOPS & CLOUD",
      readTime: "3 min read",
      title: "Achieving 99.9% Uptime with Automated Webhooks",
      desc: "A structural overview on setting up fallback container clusters and automatic telemetry alerts.",
      date: "April 02, 2026"
    }
  ];

  const docs = [
    { section: "GETTING STARTED", links: ["Ecosystem Guidelines", "DevPhoenix API Setup", "Token Key Authenticator"] },
    { section: "INTEGRATION SUITE", links: ["Workflow Webhook Setup", "LLM Fine-tuning Standards", "Next.js 15 Hub Setup"] },
    { section: "ACADEMY BLUEPRINTS", links: ["Student GitHub Guidelines", "Code Reviews Checklist", "Project Referrals Form"] }
  ];

  const handlePortalLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      setPortalStatus("Error: Please fill in all fields.");
      return;
    }
    setPortalStatus("Processing authentication...");
    setTimeout(() => {
      setPortalStatus("Portal Notice: Access locked. The DevPhoenix Academy Portal is undergoing maintenance for the Fall 2026 cohort. Please try again later.");
    }, 1200);
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Header Info */}
      <div className="text-center">
        <span className="text-[10px] font-bold tracking-[0.2em] text-[#ff5a1f] uppercase block mb-1">
          RESOURCES & DOCUMENTATION
        </span>
        <h2 className="text-2xl font-extrabold font-sora text-white">
          Developer Hub <br />
          & Portals
        </h2>
        <p className="text-white/50 text-[11px] mt-2 max-w-xs mx-auto leading-relaxed">
          Access insights, read case documents, view setup references, or log into the student portal.
        </p>
      </div>

      {/* Internal View selector pills */}
      <div className="flex items-center justify-between border-b border-white/5 pb-1 mt-2">
        <button
          onClick={() => { setActiveTab("blogs"); setPortalStatus(null); }}
          className={`pb-2.5 text-xs font-bold uppercase tracking-wider relative flex-1 text-center cursor-pointer ${
            activeTab === "blogs" ? "text-brand-orange" : "text-white/40"
          }`}
        >
          <span>Insights</span>
          {activeTab === "blogs" && (
            <motion.div layoutId="resActiveBorder" className="absolute bottom-0 left-0 right-0 h-[2px] bg-brand-orange" />
          )}
        </button>

        <button
          onClick={() => { setActiveTab("docs"); setPortalStatus(null); }}
          className={`pb-2.5 text-xs font-bold uppercase tracking-wider relative flex-1 text-center cursor-pointer ${
            activeTab === "docs" ? "text-brand-orange" : "text-white/40"
          }`}
        >
          <span>Docs</span>
          {activeTab === "docs" && (
            <motion.div layoutId="resActiveBorder" className="absolute bottom-0 left-0 right-0 h-[2px] bg-brand-orange" />
          )}
        </button>

        <button
          onClick={() => { setActiveTab("portal"); setPortalStatus(null); }}
          className={`pb-2.5 text-xs font-bold uppercase tracking-wider relative flex-1 text-center cursor-pointer ${
            activeTab === "portal" ? "text-brand-orange" : "text-white/40"
          }`}
        >
          <span>Academy Portal</span>
          {activeTab === "portal" && (
            <motion.div layoutId="resActiveBorder" className="absolute bottom-0 left-0 right-0 h-[2px] bg-brand-orange" />
          )}
        </button>
      </div>

      {/* View Switcher content */}
      <div className="mt-2 min-h-[300px]">
        {activeTab === "blogs" && (
          <div className="flex flex-col gap-4">
            {blogs.map((b, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl border border-white/[0.06] bg-black/40 backdrop-blur-md flex flex-col gap-2 relative overflow-hidden"
              >
                <div className="flex justify-between items-center text-[9px] font-extrabold uppercase font-mono tracking-wider">
                  <span className="text-brand-orange bg-brand-orange/5 px-2 py-0.5 border border-brand-orange/15 rounded-md">
                    {b.tag}
                  </span>
                  <span className="text-white/40">{b.readTime}</span>
                </div>
                <h3 className="font-sora font-extrabold text-xs uppercase tracking-wide text-white mt-1">
                  {b.title}
                </h3>
                <p className="text-white/60 text-[11px] leading-relaxed">
                  {b.desc}
                </p>
                <div className="flex items-center justify-between mt-1 pt-2 border-t border-white/5">
                  <span className="text-[9px] text-white/30">{b.date}</span>
                  <button className="text-[10px] font-bold text-brand-orange flex items-center gap-1 cursor-pointer">
                    <span>Read Article</span>
                    <ArrowRight size={10} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "docs" && (
          <div className="flex flex-col gap-5">
            {docs.map((doc, idx) => (
              <div key={idx} className="flex flex-col gap-2">
                <span className="text-[9px] font-extrabold tracking-widest font-mono text-brand-orange uppercase">
                  {doc.section}
                </span>
                <div className="flex flex-col border border-white/[0.06] bg-black/40 backdrop-blur-md rounded-2xl overflow-hidden divide-y divide-white/5">
                  {doc.links.map((lnk, lIdx) => (
                    <a
                      key={lIdx}
                      href={`#doc-${lnk.toLowerCase().replace(/\s+/g, "-")}`}
                      className="p-4 flex items-center justify-between text-xs text-white/80 hover:text-brand-orange hover:bg-brand-orange/[0.01] transition-all"
                    >
                      <span>{lnk}</span>
                      <ExternalLink size={12} className="text-white/30" />
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "portal" && (
          <div className="flex flex-col gap-4">
            {/* Mock Login Card */}
            <div className="p-5 rounded-2xl border border-white/[0.06] bg-black/40 backdrop-blur-md relative overflow-hidden flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-brand-orange/5 border border-brand-orange/20 flex items-center justify-center text-brand-orange">
                  <Lock size={16} />
                </div>
                <div>
                  <h3 className="font-sora font-extrabold text-xs uppercase tracking-wider text-white">
                    Developer Portal
                  </h3>
                  <span className="text-[9px] text-white/40 block mt-0.5">
                    Authorized Credentials Required
                  </span>
                </div>
              </div>

              <form onSubmit={handlePortalLogin} className="flex flex-col gap-3 mt-1">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[9px] uppercase font-bold tracking-wider text-white/40">Username / E-Mail</label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="student@devphoenix.com"
                    className="w-full px-3 py-2.5 rounded-lg border border-white/10 bg-[#050505] text-xs text-white placeholder-white/20 focus:border-brand-orange/50 focus:outline-none"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[9px] uppercase font-bold tracking-wider text-white/40">Portal Access Token</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full px-3 py-2.5 rounded-lg border border-white/10 bg-[#050505] text-xs text-white placeholder-white/20 focus:border-brand-orange/50 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="mt-2 w-full py-3 rounded-xl bg-gradient-to-r from-brand-orange to-brand-amber text-white font-bold text-[10px] uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(255,90,31,0.15)] flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Authenticate Portal</span>
                  <ShieldCheck size={12} />
                </button>
              </form>

              {/* Status Output */}
              {portalStatus && (
                <div className={`p-3.5 rounded-xl border text-[10px] leading-relaxed mt-1 animate-pulse ${
                  portalStatus.startsWith("Error") 
                    ? "border-red-500/30 bg-red-500/5 text-red-400" 
                    : portalStatus.startsWith("Process") 
                    ? "border-brand-orange/30 bg-brand-orange/5 text-brand-orange" 
                    : "border-brand-amber/30 bg-brand-amber/5 text-brand-amber"
                }`}>
                  {portalStatus}
                </div>
              )}
            </div>

            {/* Portal Features Summary */}
            <div className="p-5 rounded-2xl border border-white/[0.04] bg-white/[0.01] flex flex-col gap-3">
              <span className="text-[9px] font-extrabold tracking-widest font-mono text-white/40 uppercase">
                PORTAL SERVICES UTILITIES
              </span>
              <ul className="flex flex-col gap-2">
                <li className="flex items-center gap-2 text-[10px] text-white/70">
                  <Zap size={10} className="text-brand-orange" />
                  <span>Interactive coding sandbox execution logs</span>
                </li>
                <li className="flex items-center gap-2 text-[10px] text-white/70">
                  <Zap size={10} className="text-brand-orange" />
                  <span>Referrals pipeline tracking dashboard</span>
                </li>
                <li className="flex items-center gap-2 text-[10px] text-white/70">
                  <Zap size={10} className="text-brand-orange" />
                  <span>1-on-1 cohort booking calendar interfaces</span>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ==========================================
// 6. ABOUT & CONTACT VIEW
// ==========================================
interface AboutViewProps {
  onPlayIntro: () => void;
  onConnect: () => void;
}

function AboutView({ onPlayIntro, onConnect }: AboutViewProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Network particles effect locally on mobile About view
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animFrame: number;
    let width = (canvas.width = canvas.offsetWidth || window.innerWidth);
    let height = (canvas.height = canvas.offsetHeight || 500);

    interface LocalParticle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
    }

    const particles: LocalParticle[] = [];
    const count = 18; // throttled for mobile CPU efficiency
    const distLimit = 90;

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        radius: Math.random() * 1.2 + 0.4
      });
    }

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth || window.innerWidth;
      height = canvas.height = canvas.offsetHeight || 500;
    };
    window.addEventListener("resize", handleResize);

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw particle connections
      ctx.lineWidth = 0.5;
      for (let i = 0; i < count; i++) {
        for (let j = i + 1; j < count; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.hypot(dx, dy);

          if (dist < distLimit) {
            const alpha = (1 - dist / distLimit) * 0.08;
            ctx.strokeStyle = `rgba(255, 90, 31, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw particles
      for (let i = 0; i < count; i++) {
        const p = particles[i];
        ctx.fillStyle = `rgba(255, 90, 31, ${0.1 + (1 - p.y / height) * 0.2})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
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
  }, []);

  return (
    <div className="flex flex-col gap-6 w-full relative">
      {/* Local particle network canvas on About page */}
      <div className="absolute inset-0 w-full h-[500px] pointer-events-none z-0 overflow-hidden">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-60" />
      </div>

      {/* Header Info */}
      <div className="text-center relative z-10">
        <span className="text-[10px] font-bold tracking-[0.2em] text-[#ff5a1f] uppercase block mb-1">
          ABOUT DEVPHOENIX
        </span>
        <h2 className="text-2xl font-extrabold font-sora text-white leading-tight">
          Driven by Purpose. <br />
          Built for Impact.
        </h2>
        <p className="text-white/60 text-[11px] leading-relaxed mt-2 max-w-xs mx-auto">
          We build digital systems to support businesses and run educational cohorts that upskill developers.
        </p>
      </div>

      {/* Office reception image representation */}
      <div className="relative w-full h-[180px] rounded-2xl border border-white/[0.06] overflow-hidden shadow-xl my-1 bg-white/[0.01] z-10">
        <Image
          src="/office_reception.png"
          alt="DevPhoenix Corporate Office"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
      </div>

      {/* Core statistics grid (2x2 layout) */}
      <div className="grid grid-cols-2 gap-3 relative z-10">
        <div className="p-3 bg-black/40 border border-white/[0.06] rounded-xl flex flex-col items-center text-center">
          <span className="text-[9px] uppercase tracking-wider text-white/40 block">Founded</span>
          <span className="text-sm font-bold text-white mt-0.5">2026</span>
        </div>
        <div className="p-3 bg-black/40 border border-white/[0.06] rounded-xl flex flex-col items-center text-center">
          <span className="text-[9px] uppercase tracking-wider text-white/40 block">Approach</span>
          <span className="text-sm font-bold text-white mt-0.5">AI-First</span>
        </div>
        <div className="p-3 bg-black/40 border border-white/[0.06] rounded-xl flex flex-col items-center text-center">
          <span className="text-[9px] uppercase tracking-wider text-white/40 block">Ecosystem</span>
          <span className="text-sm font-bold text-white mt-0.5">Tech + Ed</span>
        </div>
        <div className="p-3 bg-black/40 border border-white/[0.06] rounded-xl flex flex-col items-center text-center">
          <span className="text-[9px] uppercase tracking-wider text-white/40 block">Headquarters</span>
          <span className="text-sm font-bold text-white mt-0.5">India</span>
        </div>
      </div>

      {/* Values Section */}
      <div className="flex flex-col gap-3 relative z-10">
        <span className="text-[9px] uppercase font-bold text-brand-orange tracking-widest font-mono">
          Core Values
        </span>
        <div className="flex flex-col gap-2.5">
          <div className="flex gap-3">
            <div className="w-5 h-5 rounded-full bg-brand-orange/10 border border-brand-orange/20 flex items-center justify-center text-brand-orange text-[9px] font-bold flex-shrink-0 mt-0.5">
              1
            </div>
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wide">Continuous Innovation</h4>
              <p className="text-[10px] text-white/50 leading-relaxed mt-0.5">We remain curious and adapt models to the latest technology standard.</p>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="w-5 h-5 rounded-full bg-brand-orange/10 border border-brand-orange/20 flex items-center justify-center text-brand-orange text-[9px] font-bold flex-shrink-0 mt-0.5">
              2
            </div>
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wide">Extreme Ownership</h4>
              <p className="text-[10px] text-white/50 leading-relaxed mt-0.5">Every code commit and technical decision is built to withstand high loads.</p>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="w-5 h-5 rounded-full bg-brand-orange/10 border border-brand-orange/20 flex items-center justify-center text-brand-orange text-[9px] font-bold flex-shrink-0 mt-0.5">
              3
            </div>
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wide">Empowering talent</h4>
              <p className="text-[10px] text-white/50 leading-relaxed mt-0.5">Our academy prepares candidates with active commercial production exposure.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Cinematic Replay Option */}
      <div className="p-4 rounded-xl border border-[#ff5a1f]/20 bg-brand-orange/[0.02] flex items-center justify-between mt-2 relative z-10">
        <div className="flex flex-col">
          <span className="text-[11px] font-extrabold text-white uppercase tracking-wide">Cinematic Intro</span>
          <span className="text-[9px] text-white/50 mt-0.5">Re-play our 3D opening sequence</span>
        </div>
        <button
          onClick={onPlayIntro}
          className="px-3.5 py-1.5 rounded-lg border border-brand-orange/30 bg-brand-orange/10 text-white font-bold text-[9px] uppercase tracking-wider flex items-center gap-1 hover:bg-brand-orange/20 cursor-pointer"
        >
          <Play size={10} className="fill-white/80 text-transparent" />
          <span>Play</span>
        </button>
      </div>

      {/* Contact card */}
      <div className="p-5 rounded-2xl border border-white/[0.06] bg-black/45 backdrop-blur-md flex flex-col gap-4 mt-2 relative z-10">
        <h3 className="font-sora font-extrabold text-xs text-white uppercase tracking-wider border-b border-white/5 pb-2">
          Contact Headquarters
        </h3>
        <div className="flex flex-col gap-3">
          <a href="mailto:devphoenix@zoho.in" className="flex items-center gap-3 text-[11px] text-white/70 hover:text-brand-orange transition-colors">
            <Mail size={14} className="text-brand-orange" />
            <span>devphoenix@zoho.in</span>
          </a>
          <a href="tel:+919734876490" className="flex items-center gap-3 text-[11px] text-white/70 hover:text-brand-orange transition-colors">
            <Phone size={14} className="text-brand-orange" />
            <span>+91 9734876490</span>
          </a>
          <div className="flex items-center gap-3 text-[11px] text-white/70">
            <MapPin size={14} className="text-brand-orange flex-shrink-0" />
            <a 
              href="https://www.google.com/maps/place/MALLICKPARA+POST+OFFICE/@22.7456917,88.3181451,15z/data=!4m10!1m2!2m1!1s59%2FD%2F5,+VIVEKANANDA,+SARANI,+SERAMPORE,+Mallickpara,+SERAMPORE,+Serampur+Uttarpara,+Hooghly-+712203,+West+Bengal,+India!3m6!1s0x39f89b92cb779425:0x4b2f34330d837358!8m2!3d22.7518135!4d88.3330685!15sCnc1OS9ELzUsIFZJVkVLQU5BTkRBLCBTQVJBTkksIFNFUkFNUE9SRSwgTWFsbGlja3BhcmEsIFNFUkFNUE9SRSwgU2VyYW1wdXIgVXR0YXJwYXJhLCBIb29naGx5LSA3MTIyMDMsIFdlc3QgQmVuZ2FsLCBJbmRpYZIBC3Bvc3Rfb2ZmaWNl4AEA!16s%2Fg%2F11j0jlrn67?entry=ttu&g_ep=EgoyMDI2MDYyMy4wIKXMDSoASAFQAw%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-brand-orange transition-colors duration-300 cursor-pointer"
            >
              Kolkata, West Bengal, India
            </a>
          </div>
        </div>

        <button
          onClick={onConnect}
          className="mt-1 w-full py-3 rounded-xl bg-gradient-to-r from-brand-orange to-brand-amber text-white font-bold text-[10px] uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(255,90,31,0.15)] flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <span>Connect Instantly</span>
          <ArrowRight size={12} />
        </button>
      </div>

      {/* Footer Details */}
      <div className="text-center text-[9px] text-white/30 font-sans tracking-wide mt-6 border-t border-white/5 pt-4 relative z-10">
        &copy; {new Date().getFullYear()} DevPhoenix. All rights reserved.
      </div>
    </div>
  );
}
