"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Code, 
  GraduationCap, 
  Brain, 
  Globe, 
  Cloud, 
  TrendingUp, 
  Briefcase, 
  User, 
  Award, 
  Target, 
  Users,
  ArrowRight
} from "lucide-react";

export default function PathSelection() {
  // Reveal animations
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
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

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  // Card hover animation variants
  const cardVariants = {
    hover: {
      y: -12,
      scale: 1.02,
      transition: {
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  const imageHoverVariants = {
    hover: {
      scale: 1.06,
      opacity: 0.4,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  // Tech card service items
  const techServices = [
    { name: "AI & Automation", icon: <Brain className="w-3.5 h-3.5" /> },
    { name: "Software Development", icon: <Code className="w-3.5 h-3.5" /> },
    { name: "Web & App Development", icon: <Globe className="w-3.5 h-3.5" /> },
    { name: "Cloud & DevOps", icon: <Cloud className="w-3.5 h-3.5" /> },
    { name: "Digital Transformation", icon: <TrendingUp className="w-3.5 h-3.5" /> },
  ];

  // Academy card program items
  const academyPrograms = [
    { name: "Industrial Training", icon: <Briefcase className="w-3.5 h-3.5" /> },
    { name: "Internship Programs", icon: <User className="w-3.5 h-3.5" /> },
    { name: "Certification Courses", icon: <Award className="w-3.5 h-3.5" /> },
    { name: "Mentorship & Placement", icon: <Target className="w-3.5 h-3.5" /> },
    { name: "Career Development", icon: <TrendingUp className="w-3.5 h-3.5" /> },
  ];

  return (
    <section id="path-selection" className="relative w-full bg-[#050505] text-white overflow-hidden py-[120px] pb-[80px] z-20 flex flex-col items-center">
      {/* 1. Thin futuristic divider line above section */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-60" />

      {/* 2. Soft grid overlay background */}
      <div 
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(rgba(255, 90, 31, 0.15) 1px, transparent 0), radial-gradient(rgba(255, 90, 31, 0.15) 1px, transparent 0)`,
          backgroundSize: "40px 40px",
          backgroundPosition: "0 0, 20px 20px"
        }}
      />

      {/* 3. Noise overlay */}
      <div
        className="absolute inset-0 opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* 4. Orange ambient glow behind content */}
      <div 
        className="absolute w-[800px] h-[800px] rounded-full opacity-[0.12] blur-[150px] pointer-events-none"
        style={{
          top: "30%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          background: "radial-gradient(circle, rgba(255,90,31,0.6) 0%, rgba(255,138,0,0.1) 60%, transparent 100%)",
        }}
      />

      {/* 5. Cinematic vignette overlay */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_20%,#050505_95%)]" />

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-[1400px] px-6 lg:px-12 flex flex-col items-center">
        
        {/* Eyebrow Label */}
        <motion.span
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={1}
          className="text-xs font-bold tracking-[0.35em] uppercase text-[#ff5a1f] mb-4 text-center block"
        >
          TWO PATHS. ONE MISSION.
        </motion.span>

        {/* Main Heading */}
        <motion.h2
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={2}
          className="font-sora font-extrabold text-center text-white leading-[1.1] mb-6 max-w-5xl text-4xl sm:text-[58px] lg:text-[72px]"
        >
          Choose Your Path. <br className="sm:hidden" />Shape the Future.
        </motion.h2>

        {/* Description */}
        <motion.p
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={3}
          className="text-white/70 text-base sm:text-lg md:text-xl text-center max-w-[760px] leading-relaxed mb-[60px]"
        >
          Whether you&apos;re a business ready to innovate or a learner ready to grow, DevPhoenix provides the ecosystem, expertise, and experience to help you rise.
        </motion.p>

        {/* Two Column Grid */}
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full mb-6"
        >
          
          {/* LEFT CARD – DEVPHOENIX TECH */}
          <motion.div
            variants={cardVariants}
            whileHover="hover"
            className="group relative h-[700px] rounded-[28px] border border-white/[0.06] bg-black/40 backdrop-blur-md overflow-hidden cursor-pointer flex flex-col justify-between p-8 sm:p-12 transition-all duration-300"
            style={{
              boxShadow: "0 20px 50px rgba(0, 0, 0, 0.4), inset 0 1px 1px rgba(255,255,255,0.02)",
            }}
          >
            {/* Background Image & Overlays */}
            <div className="absolute inset-0 z-0 overflow-hidden rounded-[28px]">
              <motion.img
                src="/tech_workstation.png"
                alt="Tech Workstation"
                className="absolute inset-0 w-full h-full object-cover object-right opacity-30 mix-blend-lighten"
                variants={imageHoverVariants}
              />
              {/* Purple Ambient Card Glow on Hover */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(168,85,247,0.15),transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
              
              {/* Edge Gradient Cover */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/75 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-[#050505]/10" />
            </div>

            {/* Glowing Border effect */}
            <div className="absolute inset-0 rounded-[28px] border border-purple-500/0 group-hover:border-purple-500/20 shadow-[0_0_0_1px_rgba(168,85,247,0)] group-hover:shadow-[0_0_30px_rgba(168,85,247,0.15)] transition-all duration-500 pointer-events-none" />

            {/* Top Section */}
            <div className="relative z-10 flex flex-col gap-6 items-start">
              
              {/* Header Badge */}
              <div className="w-12 h-12 rounded-xl flex items-center justify-center border border-purple-500/40 bg-white/[0.02] backdrop-blur-md shadow-[0_0_15px_rgba(168,85,247,0.15)] transition-all duration-300 group-hover:scale-105 group-hover:border-purple-500/60">
                <Code className="w-5 h-5 text-purple-400" />
              </div>

              {/* Title & Description Block */}
              <div>
                <span className="text-[10px] font-bold tracking-[0.25em] text-white/50 block mb-1">
                  DEVPHOENIX
                </span>
                <h3 className="font-sora font-extrabold text-white text-[72px] leading-none mb-3">
                  TECH
                </h3>
                <span className="font-sora font-semibold text-sm text-purple-400 tracking-wide uppercase block mb-4">
                  Intelligent Solutions for a Digital World
                </span>
                <p className="text-white/60 text-xs sm:text-sm leading-relaxed max-w-[380px]">
                  We build, automate and scale digital products that help businesses innovate, optimize and lead in the modern world.
                </p>
              </div>

            </div>

            {/* Middle Section (Service List) */}
            <div className="relative z-10 flex flex-col gap-3.5 my-6">
              {techServices.map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 group/item">
                  <div className="w-6 h-6 rounded-full border border-purple-500/30 flex items-center justify-center text-purple-400 bg-purple-500/5 shadow-[0_0_10px_rgba(168,85,247,0.1)] group-hover:border-purple-400 group-hover:text-purple-300 group-hover:bg-purple-500/10 transition-all duration-300">
                    {item.icon}
                  </div>
                  <span className="text-xs sm:text-sm text-white/70 font-medium group-hover:text-white transition-colors duration-300">
                    {item.name}
                  </span>
                </div>
              ))}
            </div>

            {/* Bottom CTA Button */}
            <div className="relative z-10 w-full pt-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 px-6 rounded-xl text-xs sm:text-sm font-bold tracking-wider uppercase text-white flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 shadow-[0_0_20px_rgba(124,58,237,0.2)] group-hover:shadow-[0_0_35px_rgba(124,58,237,0.45)] group-hover:from-purple-500 group-hover:to-indigo-500 transition-all duration-300"
              >
                <span>Explore Tech Solutions</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
              </motion.button>
            </div>

          </motion.div>

          {/* RIGHT CARD – DEVPHOENIX ACADEMY */}
          <motion.div
            variants={cardVariants}
            whileHover="hover"
            className="group relative h-[700px] rounded-[28px] border border-white/[0.06] bg-black/40 backdrop-blur-md overflow-hidden cursor-pointer flex flex-col justify-between p-8 sm:p-12 transition-all duration-300"
            style={{
              boxShadow: "0 20px 50px rgba(0, 0, 0, 0.4), inset 0 1px 1px rgba(255,255,255,0.02)",
            }}
          >
            {/* Background Image & Overlays */}
            <div className="absolute inset-0 z-0 overflow-hidden rounded-[28px]">
              <motion.img
                src="/academy_classroom.png"
                alt="Academy Classroom"
                className="absolute inset-0 w-full h-full object-cover object-right opacity-25 mix-blend-lighten"
                variants={imageHoverVariants}
              />
              {/* Orange Ambient Card Glow on Hover */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,90,31,0.15),transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
              
              {/* Edge Gradient Cover */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/75 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-[#050505]/10" />
            </div>

            {/* Glowing Border effect */}
            <div className="absolute inset-0 rounded-[28px] border border-[#ff5a1f]/0 group-hover:border-[#ff5a1f]/20 shadow-[0_0_0_1px_rgba(255,90,31,0)] group-hover:shadow-[0_0_30px_rgba(255,90,31,0.15)] transition-all duration-500 pointer-events-none" />

            {/* Top Section */}
            <div className="relative z-10 flex flex-col gap-6 items-start">
              
              {/* Header Badge */}
              <div className="w-12 h-12 rounded-xl flex items-center justify-center border border-[#ff5a1f]/40 bg-white/[0.02] backdrop-blur-md shadow-[0_0_15px_rgba(255,90,31,0.15)] transition-all duration-300 group-hover:scale-105 group-hover:border-[#ff5a1f]/60">
                <GraduationCap className="w-5 h-5 text-[#ff5a1f]" />
              </div>

              {/* Title & Description Block */}
              <div>
                <span className="text-[10px] font-bold tracking-[0.25em] text-white/50 block mb-1">
                  DEVPHOENIX
                </span>
                <h3 className="font-sora font-extrabold text-white text-[72px] leading-none mb-3">
                  ACADEMY
                </h3>
                <span className="font-sora font-semibold text-sm text-[#ff5a1f] tracking-wide uppercase block mb-4">
                  Education That Builds the Future
                </span>
                <p className="text-white/60 text-xs sm:text-sm leading-relaxed max-w-[380px]">
                  Industry-driven training, internships and mentorship programs designed to turn learners into future-ready professionals.
                </p>
              </div>

            </div>

            {/* Middle Section (Program List) */}
            <div className="relative z-10 flex flex-col gap-3.5 my-6">
              {academyPrograms.map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 group/item">
                  <div className="w-6 h-6 rounded-full border border-[#ff5a1f]/30 flex items-center justify-center text-[#ff5a1f] bg-[#ff5a1f]/5 shadow-[0_0_10px_rgba(255,90,31,0.1)] group-hover:border-[#ff5a1f] group-hover:text-brand-amber group-hover:bg-[#ff5a1f]/10 transition-all duration-300">
                    {item.icon}
                  </div>
                  <span className="text-xs sm:text-sm text-white/70 font-medium group-hover:text-white transition-colors duration-300">
                    {item.name}
                  </span>
                </div>
              ))}
            </div>

            {/* Bottom CTA Button */}
            <div className="relative z-10 w-full pt-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 px-6 rounded-xl text-xs sm:text-sm font-bold tracking-wider uppercase text-white flex items-center justify-center gap-2 bg-gradient-to-r from-[#ff5a1f] to-[#ff8a00] shadow-[0_0_20px_rgba(255,90,31,0.2)] group-hover:shadow-[0_0_35px_rgba(255,90,31,0.45)] group-hover:from-[#ff6e36] group-hover:to-[#ff9b24] transition-all duration-300"
              >
                <span>Explore Academy</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
              </motion.button>
            </div>

          </motion.div>

        </motion.div>

        {/* BOTTOM ECOSYSTEM STRIP */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={4}
          className="relative z-10 w-full min-h-[100px] p-6 sm:px-10 rounded-[24px] border border-white/[0.06] bg-black/40 backdrop-blur-md flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden"
          style={{
            boxShadow: "inset 0 1px 1px rgba(255,255,255,0.02)",
          }}
        >
          {/* Subtle overlay glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#ff5a1f]/5 to-transparent pointer-events-none" />

          {/* Left Side */}
          <div className="flex items-center gap-4 text-center md:text-left z-10">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center border border-white/[0.08] bg-white/[0.02] text-[#ff5a1f] shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-sora font-extrabold text-white text-sm sm:text-base tracking-wide uppercase">
                One Ecosystem. Endless Possibilities.
              </h4>
            </div>
          </div>

          {/* Center */}
          <div className="flex-1 max-w-[500px] text-center md:text-left z-10">
            <p className="text-white/70 text-xs sm:text-sm font-sans leading-relaxed">
              Technology drives innovation. Education builds talent. Together, we create impact that lasts.
            </p>
          </div>

          {/* Right Side */}
          <div className="z-10">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="py-3.5 px-6 rounded-xl text-xs sm:text-sm font-bold tracking-wider uppercase text-white bg-transparent border border-white/10 hover:border-[#ff5a1f] shadow-sm hover:shadow-[0_0_20px_rgba(255,90,31,0.25)] hover:bg-[#ff5a1f]/5 transition-all duration-300 flex items-center gap-2 group"
            >
              <span>See How We Work Together</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
            </motion.button>
          </div>

        </motion.div>

      </div>
    </section>
  );
}
