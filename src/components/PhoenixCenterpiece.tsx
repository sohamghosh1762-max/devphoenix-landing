"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";

export default function PhoenixCenterpiece() {
  const containerRef = useRef<HTMLDivElement>(null);
  const particleCanvasRef = useRef<HTMLCanvasElement>(null);
  
  // Parallax / Hover tilt state
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 25, stiffness: 120 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-20, 20]), springConfig);
  const phoenixTranslateY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-10, 10]), springConfig);

  useEffect(() => {
    const container = containerRef.current;
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5; // range -0.5 to 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5; // range -0.5 to 0.5
      
      mouseX.set(x);
      mouseY.set(y);
    };

    const handleMouseLeave = () => {
      mouseX.set(0);
      mouseY.set(0);
    };

    window.addEventListener("mousemove", handleMouseMove);
    container?.addEventListener("mouseleave", handleMouseLeave);
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      container?.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [mouseX, mouseY]);

  // Sparkles emitter from the circular platform
  useEffect(() => {
    const canvas = particleCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const width = (canvas.width = 400);
    const height = (canvas.height = 500);

    interface Sparkle {
      x: number;
      y: number;
      radius: number;
      speedY: number;
      speedX: number;
      alpha: number;
      maxAlpha: number;
      decay: number;
      angle: number;
    }

    const sparkles: Sparkle[] = [];
    const maxSparkles = 40;

    const createSparkle = (): Sparkle => {
      // Spawn near the bottom platform center (x: 200, y: 440)
      const angle = Math.random() * Math.PI * 2;
      const r = Math.random() * 80; // random radius on the elliptical ring
      return {
        x: 200 + Math.cos(angle) * r,
        y: 440 + Math.sin(angle) * r * 0.25, // flattened Y due to 3D perspective
        radius: Math.random() * 1.5 + 0.5,
        speedY: -(Math.random() * 1.5 + 0.5),
        speedX: (Math.random() - 0.5) * 0.6,
        alpha: 0,
        maxAlpha: Math.random() * 0.6 + 0.3,
        decay: Math.random() * 0.015 + 0.005,
        angle: Math.random() * Math.PI * 2,
      };
    };

    const tick = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Spawn sparkles
      if (sparkles.length < maxSparkles && Math.random() > 0.3) {
        sparkles.push(createSparkle());
      }

      // Update and draw sparkles
      for (let i = sparkles.length - 1; i >= 0; i--) {
        const s = sparkles[i];
        
        // Move sparkle
        s.y += s.speedY;
        s.x += s.speedX + Math.sin(s.angle) * 0.2;
        s.angle += 0.05;
        
        // Fade in initially, then fade out
        if (s.alpha < s.maxAlpha && s.speedY < 0) {
          s.alpha += 0.05;
        } else {
          s.alpha -= s.decay;
        }

        // Draw sparkle with glowing glow radial gradient
        if (s.alpha > 0) {
          ctx.fillStyle = `rgba(255, 90, 31, ${s.alpha})`;
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
          ctx.fill();
        } else {
          sparkles.splice(i, 1);
        }
      }

      animId = requestAnimationFrame(tick);
    };

    tick();
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-square max-w-[600px] flex items-center justify-center select-none"
    >
      {/* 1. Volumetric light column behind the phoenix */}
      <div 
        className="absolute bottom-[60px] left-1/2 -translate-x-1/2 w-[80px] h-[380px] rounded-full pointer-events-none filter blur-[35px] animate-beam-pulse"
        style={{
          background: "linear-gradient(to top, rgba(255, 90, 31, 0.45) 0%, rgba(255, 138, 0, 0.15) 50%, rgba(5, 5, 5, 0) 100%)",
        }}
      />
      
      {/* 2. Platform reflection radial light */}
      <div 
        className="absolute bottom-[30px] left-1/2 -translate-x-1/2 w-[220px] h-[70px] rounded-full pointer-events-none filter blur-[15px] opacity-40"
        style={{
          background: "radial-gradient(ellipse, rgba(255, 90, 31, 0.6) 0%, rgba(5, 5, 5, 0) 70%)",
        }}
      />

      {/* 3. Local sparkles canvas */}
      <canvas
        ref={particleCanvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-10"
      />

      {/* 4. 3D holographic projection grid lines (behind Phoenix, rising up) */}
      <div className="absolute inset-0 opacity-15 overflow-hidden pointer-events-none flex justify-center">
        <div className="w-[300px] h-full relative">
          {/* Vertical code grid lines in the background */}
          <div className="absolute left-[20%] top-[10%] w-[1px] h-[70%] bg-gradient-to-b from-brand-orange/0 via-brand-orange/40 to-brand-orange/0" />
          <div className="absolute left-[50%] top-[5%] w-[1px] h-[80%] bg-gradient-to-b from-brand-orange/0 via-brand-orange/50 to-brand-orange/0" />
          <div className="absolute left-[80%] top-[15%] w-[1px] h-[65%] bg-gradient-to-b from-brand-orange/0 via-brand-orange/40 to-brand-orange/0" />
        </div>
      </div>

      {/* 5. Floating Interactive Phoenix Emblem (Framer Motion 3D Tilt) */}
      <motion.div
        style={{
          rotateX: rotateX,
          rotateY: rotateY,
          y: phoenixTranslateY,
          transformStyle: "preserve-3d",
          perspective: 1000,
        }}
        className="relative w-[500px] h-[500px] flex items-center justify-center z-20"
      >
        <motion.div
  animate={{
    y: [-20, 20, -20],
    scale: [1, 1.03, 1],
  }}
  transition={{
    duration: 6,
    repeat: Infinity,
    ease: "easeInOut",
  }}
  className="relative"
>
  <div
  className="absolute inset-0 rounded-full blur-[100px]"
  style={{
    background:
      "radial-gradient(circle, rgba(255,90,31,0.7) 0%, rgba(255,90,31,0.2) 40%, transparent 80%)",
  }}
/>
  <Image
    src="/phoenix-icon.png"
    alt="DevPhoenix Phoenix"
    width={500}
    height={500}
    priority
    className="w-[380px] h-auto object-contain drop-shadow-[0_0_80px_rgba(255,90,31,1)]"
  />
</motion.div>
      </motion.div>

      {/* 6. Floating concentric 3D platform with energy rings */}
      <div 
        className="absolute bottom-[20px] w-[320px] h-[90px] pointer-events-none z-10"
        style={{
          perspective: 1200,
          transformStyle: "preserve-3d",
        }}
      >
        <div
          className="w-full h-full relative"
          style={{
            transform: "rotateX(75deg)",
          }}
        >
          {/* Inner solid circular pad */}
          <div className="absolute inset-0 m-auto w-[120px] h-[120px] rounded-full border-2 border-brand-orange/70 bg-brand-orange/10 shadow-[0_0_30px_rgba(255,90,31,0.6),inset_0_0_15px_rgba(255,90,31,0.4)] animate-pulse" />
          
          {/* Middle spinning ring with dots (Clockwise) */}
          <div 
            className="absolute inset-0 m-auto w-[200px] h-[200px] rounded-full border border-dashed border-brand-orange/45 animate-spin-slow"
            style={{
              boxShadow: "0 0 20px rgba(255, 90, 31, 0.2)",
            }}
          />
          
          {/* Outer solid ring (Counter-Clockwise) */}
          <div 
            className="absolute inset-0 m-auto w-[260px] h-[260px] rounded-full border-2 border-brand-amber/30 animate-spin-reverse"
            style={{
              boxShadow: "0 0 40px rgba(255, 138, 0, 0.15)",
            }}
          />

          {/* Platform glowing base plate */}
          <div className="absolute inset-0 m-auto w-[290px] h-[290px] rounded-full border border-brand-orange/10 bg-[#050505] shadow-[0_0_60px_rgba(255,90,31,0.1),inset_0_0_30px_rgba(0,0,0,0.9)]" />
        </div>
      </div>
    </div>
  );
}
