"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { gsap } from "gsap";
import { motion, AnimatePresence } from "framer-motion";

interface CinematicIntroProps {
  onComplete: () => void;
}

// HUD text lines
const HUD_SOURCE_LINES = [
  "INITIALIZING ECOSYSTEM...",
  "LOADING TECHNOLOGY ENGINE...",
  "LOADING EDUCATION ENGINE...",
  "ACTIVATING AI INFRASTRUCTURE...",
  "SYSTEM STATUS: ACTIVE // READY"
];

export default function CinematicIntro({ onComplete }: CinematicIntroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const portalValRef = useRef({ value: 0 });

  // States for text overlays
  const [showBrand, setShowBrand] = useState(false);
  const [hudLines, setHudLines] = useState<string[]>([]);
  const [showFlash, setShowFlash] = useState(false);
  const [portalActive, setPortalActive] = useState(false);

  useEffect(() => {
    // 1. Fetch and sample image points from /phoenix-icon.png
    const sampleImagePixels = (imageUrl: string, count: number): Promise<{ x: number; y: number }[]> => {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = imageUrl;
        img.crossOrigin = "anonymous";
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          if (!ctx) {
            resolve([]);
            return;
          }
          const size = 512;
          canvas.width = size;
          canvas.height = size;
          ctx.drawImage(img, 0, 0, size, size);
          
          const imgData = ctx.getImageData(0, 0, size, size).data;
          const points: { x: number; y: number }[] = [];
          
          for (let y = 0; y < size; y++) {
            for (let x = 0; x < size; x++) {
              const idx = (y * size + x) * 4;
              const alpha = imgData[idx + 3];
              // Sample points with sufficient transparency threshold
              if (alpha > 60) {
                points.push({
                  x: (x / size) - 0.5,
                  y: 0.5 - (y / size), // Invert Y for WebGL
                });
              }
            }
          }
          
          // Re-sample to exact count
          const result: { x: number; y: number }[] = [];
          if (points.length > 0) {
            for (let i = 0; i < count; i++) {
              const pt = points[Math.floor(Math.random() * points.length)];
              result.push({
                x: pt.x + (Math.random() - 0.5) * 0.001, // subtle scatter jitter
                y: pt.y + (Math.random() - 0.5) * 0.001,
              });
            }
          }
          resolve(result);
        };
        img.onerror = () => {
          // Fallback if image fails to load
          const fallbackPoints = [];
          for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2;
            const r = Math.random() * 0.4;
            fallbackPoints.push({
              x: Math.cos(angle) * r,
              y: Math.sin(angle) * r,
            });
          }
          resolve(fallbackPoints);
        };
      });
    };

    // 2. Initialize Three.js
    const canvas = canvasRef.current;
    if (!canvas) return;

    const width = window.innerWidth;
    const height = window.innerHeight;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050505, 0.015);

    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.z = 10;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    } catch (e) {
      console.error("WebGL Renderer initialization failed. WebGL may be disabled or unsupported in this browser.", e);
      // Fallback: Skip the introduction and proceed to home page immediately
      onComplete();
      return;
    }

    // Particle settings
    const particleCount = 8000;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);

    // Initial state: scattered randomly in space
    const scatteredCoords: THREE.Vector3[] = [];
    const swirlCoords: THREE.Vector3[] = [];
    let logoCoords: { x: number; y: number }[] = [];

    // Prepopulate scattered coordinates (Scene 1)
    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);
      const r = 8 + Math.random() * 12; // Far scatter sphere
      
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);
      scatteredCoords.push(new THREE.Vector3(x, y, z));

      // swirl coordinates: concentric spiral (Scene 2)
      const swirlAngle = Math.random() * Math.PI * 20; // spiral wind
      const swirlRadius = Math.random() * 6 + 0.1;
      const swirlX = Math.cos(swirlAngle) * swirlRadius;
      const swirlY = Math.sin(swirlAngle) * swirlRadius;
      const swirlZ = (Math.random() - 0.5) * 1.5;
      swirlCoords.push(new THREE.Vector3(swirlX, swirlY, swirlZ));

      // Setup colors: blend of brand orange (#ff5a1f) and brand amber (#ff8a00)
      const isOrange = Math.random() > 0.45;
      const color = new THREE.Color(isOrange ? 0xff5a1f : 0xff8a00);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;

      // Particle sizes
      sizes[i] = Math.random() * 2.5 + 0.5;
    }

    // Create geometries and materials
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    // Custom shader material for glowy particles
    const particleTexture = createCircleTexture();
    const material = new THREE.PointsMaterial({
      size: 0.15,
      map: particleTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      vertexColors: true,
      opacity: 0.8,
    });

    const particleSystem = new THREE.Points(geometry, material);
    scene.add(particleSystem);

    // Shockwave particles (Scene 4)
    const shockwaveCount = 1200;
    const shockwaveGeo = new THREE.BufferGeometry();
    const shockwavePos = new Float32Array(shockwaveCount * 3);
    const shockwaveColors = new Float32Array(shockwaveCount * 3);
    const shockwaveSpeeds = new Float32Array(shockwaveCount);
    const shockwaveAngles = new Float32Array(shockwaveCount);

    for (let i = 0; i < shockwaveCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      shockwaveAngles[i] = angle;
      shockwavePos[i * 3] = 0;
      shockwavePos[i * 3 + 1] = 0;
      shockwavePos[i * 3 + 2] = 0;

      const isOrange = Math.random() > 0.3;
      const color = new THREE.Color(isOrange ? 0xff5a1f : 0xff8a00);
      shockwaveColors[i * 3] = color.r;
      shockwaveColors[i * 3 + 1] = color.g;
      shockwaveColors[i * 3 + 2] = color.b;

      shockwaveSpeeds[i] = Math.random() * 6 + 4; // Velocity outward
    }

    shockwaveGeo.setAttribute("position", new THREE.BufferAttribute(shockwavePos, 3));
    shockwaveGeo.setAttribute("color", new THREE.BufferAttribute(shockwaveColors, 3));
    
    const shockwaveMaterial = new THREE.PointsMaterial({
      size: 0.22,
      map: particleTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      vertexColors: true,
      opacity: 0,
    });
    const shockwaveSystem = new THREE.Points(shockwaveGeo, shockwaveMaterial);
    scene.add(shockwaveSystem);

    // Dynamic animation parameters controlled by GSAP
    const animState = {
      sceneProgress: 0,       // 0 to 1: scatter -> swirl
      creationProgress: 0,    // 0 to 1: swirl -> logo shape
      expansionProgress: 0,   // 0 to 1: logo -> wings expanded
      shockwaveProgress: 0,   // 0 to 1: shockwave ring scale
      portalProgress: 0,      // 0 to 1: warp speed zoom
      cameraZ: 10,
      cameraY: 0,
      cameraRotationZ: 0,
      globalOpacity: 0.9,
      shockwaveOpacity: 0,
      ambientRotationSpeed: 0.15,
      wingsExpansionValue: 1.0,
    };

    // Load pixel coords, then launch GSAP timeline
    sampleImagePixels("/phoenix-icon.png", particleCount).then((sampledPoints) => {
      logoCoords = sampledPoints;
      startTimeline();
    });

    const startTimeline = () => {
      const tl = gsap.timeline({
        onComplete: () => {
          onComplete();
        }
      });
      timelineRef.current = tl;

      // Scene 1: Darkness (0.0s - 1.0s)
      tl.to(animState, {
        cameraZ: 9.2,
        duration: 1.0,
        ease: "sine.inOut"
      });

      // Scene 2: Energy Awakens (1.0s - 2.5s)
      tl.to(animState, {
        sceneProgress: 1.0,
        ambientRotationSpeed: 0.6,
        cameraZ: 8.5,
        duration: 1.5,
        ease: "power2.out",
      }, 1.0);

      // Scene 3: Phoenix Creation (2.5s - 4.0s)
      tl.to(animState, {
        creationProgress: 1.0,
        cameraZ: 7.2,
        ambientRotationSpeed: 0.2,
        duration: 1.5,
        ease: "power3.inOut",
      }, 2.5);

      // Scene 4: Wings Expansion & Shockwave (4.0s - 5.0s)
      tl.add(() => {
        setShowFlash(true);
        setTimeout(() => setShowFlash(false), 200);
      }, 4.0);

      tl.to(animState, {
        expansionProgress: 1.0,
        wingsExpansionValue: 1.4,
        cameraZ: 6.0,
        duration: 1.0,
        ease: "elastic.out(1, 0.75)",
      }, 4.0);

      // Animate shockwave system opacity & progress
      tl.to(animState, {
        shockwaveOpacity: 1.0,
        duration: 0.1,
      }, 4.0);

      tl.to(animState, {
        shockwaveProgress: 1.0,
        duration: 1.2,
        ease: "power2.out",
      }, 4.0);

      tl.to(animState, {
        shockwaveOpacity: 0.0,
        duration: 0.6,
        ease: "sine.in",
      }, 4.6);

      // Scene 5: Brand Reveal (5.0s - 6.2s)
      tl.add(() => {
        setShowBrand(true);
      }, 5.0);

      tl.to(animState, {
        cameraZ: 5.5,
        cameraY: -0.6, // tilt camera slightly to make space for text
        duration: 1.2,
        ease: "power1.out",
      }, 5.0);

      // Scene 6: HUD System Activation (6.2s - 7.2s)
      tl.add(() => {
        triggerHUDTyping();
      }, 6.2);

      tl.to(animState, {
        cameraZ: 5.3,
        duration: 1.0,
        ease: "sine.inOut"
      }, 6.2);

      // Scene 7: Portal Warp Transition (7.2s - 8.0s)
      tl.add(() => {
        setPortalActive(true);
      }, 7.2);

      // Morph CSS blur/scale variables directly on the canvas element for maximum 60fps performance
      tl.to(portalValRef.current, {
        value: 1,
        duration: 0.8,
        ease: "power3.in",
        onUpdate: () => {
          if (canvas) {
            const val = portalValRef.current.value;
            canvas.style.filter = `blur(${val * 16}px)`;
            canvas.style.transform = `scale(${1 + val * 1.5})`;
          }
        }
      }, 7.2);

      // WebGL camera rushes into portal
      tl.to(animState, {
        portalProgress: 1.0,
        cameraZ: 0.1,
        globalOpacity: 0.0,
        duration: 0.8,
        ease: "power4.in",
      }, 7.2);
    };

    // Sequentially type HUD logs
    const triggerHUDTyping = () => {
      let index = 0;
      const interval = setInterval(() => {
        if (index < HUD_SOURCE_LINES.length) {
          setHudLines((prev) => [...prev, HUD_SOURCE_LINES[index]]);
          index++;
        } else {
          clearInterval(interval);
        }
      }, 180);
    };

    // Render loop
    let animId: number;
    let time = 0;

    const tick = () => {
      time += 0.016;

      // Update camera position
      camera.position.z = animState.cameraZ;
      camera.position.y = animState.cameraY;
      
      // Slow rotation for cinematic breathing
      const angle = time * animState.ambientRotationSpeed;
      const cosA = Math.cos(angle);
      const sinA = Math.sin(angle);

      // Update primary particles positions
      const posAttr = geometry.attributes.position as THREE.BufferAttribute;
      const posArray = posAttr.array as Float32Array;

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        
        // 1. Scatter position
        const pScatter = scatteredCoords[i];

        // 2. Swirl position with rotation over time
        const pSwirlBase = swirlCoords[i];
        const swirlX = pSwirlBase.x * cosA - pSwirlBase.y * sinA;
        const swirlY = pSwirlBase.x * sinA + pSwirlBase.y * cosA;
        const swirlZ = pSwirlBase.z;

        // Interpolate Phase 1: Scatter to Swirl
        let x = THREE.MathUtils.lerp(pScatter.x, swirlX, animState.sceneProgress);
        let y = THREE.MathUtils.lerp(pScatter.y, swirlY, animState.sceneProgress);
        let z = THREE.MathUtils.lerp(pScatter.z, swirlZ, animState.sceneProgress);

        // 3. Logo position
        if (logoCoords.length > 0 && logoCoords[i]) {
          const pt = logoCoords[i];
          // Scale to fit on screen beautifully
          const scale = 5.2;
          const logoX = pt.x * scale;
          const logoY = pt.y * scale;
          const logoZ = (Math.random() - 0.5) * 0.15; // thin 3D layer

          // Interpolate Phase 2: Swirl to Logo
          x = THREE.MathUtils.lerp(x, logoX, animState.creationProgress);
          y = THREE.MathUtils.lerp(y, logoY, animState.creationProgress);
          z = THREE.MathUtils.lerp(z, logoZ, animState.creationProgress);

          // 4. Expanded Wings position
          const wingStretch = animState.wingsExpansionValue;
          // Apply horizontal expansion to simulate wings spreading
          const expX = logoX * (Math.abs(logoX) > 0.4 ? wingStretch : 1.0);
          const expY = logoY * 1.15;
          const expZ = logoZ * 1.5;

          // Interpolate Phase 3: Logo to Expanded Wings
          x = THREE.MathUtils.lerp(x, expX, animState.expansionProgress);
          y = THREE.MathUtils.lerp(y, expY, animState.expansionProgress);
          z = THREE.MathUtils.lerp(z, expZ, animState.expansionProgress);
        }

        // Scene 7: Portal zoom past camera (shoot Z coordinate towards viewer)
        if (animState.portalProgress > 0) {
          // Stretch particles along Z to create light streaks
          const portalStretch = animState.portalProgress * 40.0;
          z += portalStretch * (i % 2 === 0 ? 1 : 0.8);
        }

        // Apply a gentle floating motion to the logo in Scene 5 & 6
        if (animState.creationProgress > 0.8 && animState.portalProgress === 0) {
          const floatOffset = Math.sin(time * 1.5 + i * 0.001) * 0.05;
          y += floatOffset;
        }

        posArray[i3] = x;
        posArray[i3 + 1] = y;
        posArray[i3 + 2] = z;
      }
      posAttr.needsUpdate = true;

      // Update shockwave particles
      if (animState.shockwaveOpacity > 0) {
        const swPosAttr = shockwaveGeo.attributes.position as THREE.BufferAttribute;
        const swArray = swPosAttr.array as Float32Array;

        for (let i = 0; i < shockwaveCount; i++) {
          const i3 = i * 3;
          const sAngle = shockwaveAngles[i];
          const speed = shockwaveSpeeds[i];
          const radius = speed * animState.shockwaveProgress * 3.5;

          // Expand radial ring with small noise
          const ringNoiseX = (Math.random() - 0.5) * 0.25;
          const ringNoiseY = (Math.random() - 0.5) * 0.25;

          swArray[i3] = Math.cos(sAngle) * radius + ringNoiseX;
          swArray[i3 + 1] = Math.sin(sAngle) * radius + ringNoiseY;
          swArray[i3 + 2] = (Math.random() - 0.5) * 1.5;
        }
        swPosAttr.needsUpdate = true;
        shockwaveMaterial.opacity = animState.shockwaveOpacity * (1 - animState.shockwaveProgress);
      }

      // Fade out materials during portal transition
      material.opacity = animState.globalOpacity;

      renderer.render(scene, camera);
      animId = requestAnimationFrame(tick);
    };

    tick();

    // 3. Handle window resizing
    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animId);
      if (timelineRef.current) timelineRef.current.kill();
      if (renderer) renderer.dispose();
      geometry.dispose();
      material.dispose();
      shockwaveGeo.dispose();
      shockwaveMaterial.dispose();
    };
  }, [onComplete]);

  // Generate glowing dot texture programmatically
  function createCircleTexture() {
    const canvas = document.createElement("canvas");
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext("2d");
    if (!ctx) return new THREE.Texture();

    const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
    gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
    gradient.addColorStop(0.2, "rgba(255, 138, 0, 0.8)");
    gradient.addColorStop(0.5, "rgba(255, 90, 31, 0.3)");
    gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 32, 32);

    const texture = new THREE.CanvasTexture(canvas);
    return texture;
  }

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-full h-full bg-[#050505] z-[9999] overflow-hidden flex flex-col items-center justify-center select-none"
    >
      {/* 1. WebGL Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none transition-all duration-300"
      />

      {/* 2. Scene 4 Full-Screen Orange flash overlay */}
      <AnimatePresence>
        {showFlash && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.65 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-brand-orange z-50 pointer-events-none mix-blend-screen"
            transition={{ duration: 0.15 }}
          />
        )}
      </AnimatePresence>

      {/* Scanlines overlay for techy aesthetic */}
      <div className="absolute inset-0 scanlines opacity-10 pointer-events-none z-10" />

      {/* 3. Scene 5 Brand Typography Reveal */}
      <AnimatePresence>
        {showBrand && !portalActive && (
          <div className="absolute inset-x-0 bottom-[18%] flex flex-col items-center justify-center text-center pointer-events-none z-30 px-6">
            <motion.h1
              initial={{ opacity: 0, y: 15, letterSpacing: "0.2em" }}
              animate={{ opacity: 1, y: 0, letterSpacing: "0.45em" }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-white text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-[0.45em] font-sora drop-shadow-[0_0_20px_rgba(255,90,31,0.4)]"
            >
              DEVPHOENIX
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ duration: 1.2, delay: 0.4 }}
              className="text-white/60 text-[9px] sm:text-[11px] font-bold tracking-[0.3em] font-mono mt-4 uppercase max-w-lg"
            >
              BUILDING INTELLIGENT DIGITAL ECOSYSTEMS
            </motion.p>
          </div>
        )}
      </AnimatePresence>

      {/* 4. Scene 6 Futuristic Terminal HUD */}
      <AnimatePresence>
        {showBrand && !portalActive && (
          <div className="absolute bottom-[4%] left-1/2 -translate-x-1/2 w-full max-w-sm sm:max-w-md font-mono text-left z-30 px-6">
            <div className="border border-brand-orange/15 bg-black/60 rounded-xl p-3.5 backdrop-blur-md shadow-[0_4px_24px_rgba(0,0,0,0.8)]">
              {/* Header indicators */}
              <div className="flex items-center justify-between border-b border-brand-orange/10 pb-2 mb-2 text-[9px] text-brand-orange/40">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-orange animate-ping" />
                  PHOENIX OS v4.2.9
                </span>
                <span>SYS_SECURE // OK</span>
              </div>
              
              {/* Console Output */}
              <div className="flex flex-col gap-1 text-[10px] text-brand-orange/80 leading-relaxed font-semibold">
                {hudLines.filter(Boolean).map((line, idx) => {
                      const isReady = line?.includes("ACTIVE");
                  return (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -5 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.15 }}
                      className={isReady ? "text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.4)]" : ""}
                    >
                      <span className="text-brand-orange/30 mr-1.5">&gt;</span>
                      {line}
                    </motion.div>
                  );
                })}
                {hudLines.length < HUD_SOURCE_LINES.length && (
                  <div className="flex items-center gap-0.5 text-brand-orange">
                    <span className="text-brand-orange/30 mr-1.5">&gt;</span>
                    <span className="w-1.5 h-3.5 bg-brand-orange animate-[pulse_0.8s_infinite]" />
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* Ambient background grids / lighting inside preloader */}
      <div className="absolute w-[600px] h-[600px] rounded-full opacity-20 blur-[130px] pointer-events-none bg-gradient-to-tr from-brand-orange to-brand-amber/20 z-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
    </div>
  );
}
