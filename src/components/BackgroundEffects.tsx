"use client";

import React, { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  opacity: number;
  color: string;
}

export default function BackgroundEffects() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Particle settings
    const particles: Particle[] = [];
    const maxParticles = 60;

    const createParticle = (initBottom = false): Particle => {
      const isOrange = Math.random() > 0.4;
      return {
        x: Math.random() * width,
        y: initBottom ? height + Math.random() * 20 : Math.random() * height,
        size: Math.random() * 1.5 + 0.5,
        speedY: -(Math.random() * 0.8 + 0.2),
        speedX: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.5 + 0.1,
        color: isOrange ? "255, 90, 31" : "255, 138, 0", // brand-orange or brand-amber
      };
    };

    // Initialize particles
    for (let i = 0; i < maxParticles; i++) {
      particles.push(createParticle());
    }

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.active = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    // Draw tech grid
    const drawGrid = (ctx: CanvasRenderingContext2D, time: number) => {
      ctx.strokeStyle = "rgba(255, 90, 31, 0.025)";
      ctx.lineWidth = 1;

      const gridSize = 80;
      const xOffset = (time * 10) % gridSize;
      const yOffset = (time * 5) % gridSize;

      // Draw vertical lines
      for (let x = xOffset; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();

        // Draw small crosses or dots at intersections
        if (mouseRef.current.active) {
          const dx = Math.abs(x - mouseRef.current.x);
          if (dx < 120) {
            ctx.strokeStyle = `rgba(255, 90, 31, ${0.08 * (1 - dx / 120)})`;
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, height);
            ctx.stroke();
            ctx.strokeStyle = "rgba(255, 90, 31, 0.025)";
          }
        }
      }

      // Draw horizontal lines
      for (let y = yOffset; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();

        if (mouseRef.current.active) {
          const dy = Math.abs(y - mouseRef.current.y);
          if (dy < 120) {
            ctx.strokeStyle = `rgba(255, 90, 31, ${0.08 * (1 - dy / 120)})`;
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(width, y);
            ctx.stroke();
            ctx.strokeStyle = "rgba(255, 90, 31, 0.025)";
          }
        }
      }

      // Draw nodes at grid intersections near mouse
      if (mouseRef.current.active) {
        const mx = mouseRef.current.x;
        const my = mouseRef.current.y;
        const radius = 150;

        ctx.fillStyle = "rgba(255, 90, 31, 0.25)";
        const startX = Math.floor((mx - radius) / gridSize) * gridSize + xOffset;
        const endX = Math.ceil((mx + radius) / gridSize) * gridSize + xOffset;
        const startY = Math.floor((my - radius) / gridSize) * gridSize + yOffset;
        const endY = Math.ceil((my + radius) / gridSize) * gridSize + yOffset;

        for (let x = startX; x <= endX; x += gridSize) {
          for (let y = startY; y <= endY; y += gridSize) {
            const dist = Math.hypot(x - mx, y - my);
            if (dist < radius) {
              const nodeOpacity = (1 - dist / radius) * 0.4;
              ctx.fillStyle = `rgba(255, 90, 31, ${nodeOpacity})`;
              ctx.beginPath();
              ctx.arc(x, y, 2.5, 0, Math.PI * 2);
              ctx.fill();
            }
          }
        }
      }
    };

    // Render loop
    const tick = (time: number) => {
      ctx.clearRect(0, 0, width, height);

      // Draw the digital tech grid
      drawGrid(ctx, time * 0.001);

      // Render & Update Particles
      particles.forEach((p, index) => {
        // Move particle
        p.y += p.speedY;
        p.x += p.speedX;

        // Fade out as it goes higher
        const lifeRatio = p.y / height;
        let opacity = p.opacity * Math.sin(lifeRatio * Math.PI);
        if (opacity < 0) opacity = 0;

        ctx.fillStyle = `rgba(${p.color}, ${opacity})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        // Mouse interaction: push particles slightly
        if (mouseRef.current.active) {
          const dx = p.x - mouseRef.current.x;
          const dy = p.y - mouseRef.current.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 100) {
            const force = (100 - dist) / 100;
            p.x += (dx / dist) * force * 1.5;
            p.y += (dy / dist) * force * 1.5;
          }
        }

        // Reset if offscreen
        if (p.y < 0 || p.x < 0 || p.x > width) {
          particles[index] = createParticle(true);
        }
      });

      animationFrameId = requestAnimationFrame(tick);
    };

    animationFrameId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
      {/* Canvas for Grid & Floating Particles */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Cyber-Tech Noise Texture Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Premium Cinematic Lighting & Ambient Glows */}
      {/* 1. Giant radial glow behind the center layout (Phoenix epicenter) */}
      <div 
        className="absolute w-[600px] md:w-[900px] h-[600px] md:h-[900px] rounded-full opacity-[0.25] blur-[140px] pointer-events-none animate-pulse-glow"
        style={{
          top: "40%",
          left: "65%",
          transform: "translate(-50%, -50%)",
          background: "radial-gradient(circle, rgba(255,90,31,0.4) 0%, rgba(255,138,0,0.1) 50%, rgba(5,5,5,0) 100%)",
        }}
      />

      {/* 2. Soft amber accent glow left center (behind typography) */}
      <div 
        className="absolute w-[400px] md:w-[600px] h-[400px] md:h-[600px] rounded-full opacity-[0.08] blur-[120px] pointer-events-none"
        style={{
          top: "30%",
          left: "15%",
          transform: "translate(-50%, -50%)",
          background: "radial-gradient(circle, rgba(255,138,0,0.3) 0%, rgba(255,90,31,0.05) 60%, rgba(5,5,5,0) 100%)",
        }}
      />

      {/* 3. Volumetric glowing streaks (Vertical light beams rising) */}
      <div className="absolute right-[20%] top-0 w-[1px] h-full bg-gradient-to-b from-brand-orange/0 via-brand-orange/10 to-brand-orange/0 opacity-30 shadow-[0_0_10px_rgba(255,90,31,0.2)]" />
      <div className="absolute right-[40%] top-0 w-[1px] h-full bg-gradient-to-b from-brand-orange/0 via-brand-orange/5 to-brand-orange/0 opacity-20" />
      <div className="absolute left-[30%] top-0 w-[1px] h-full bg-gradient-to-b from-brand-orange/0 via-brand-orange/5 to-brand-orange/0 opacity-20" />

      {/* Scanlines layer */}
      <div className="scanlines" />
    </div>
  );
}
