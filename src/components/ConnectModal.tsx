"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  GraduationCap,
  Briefcase,
  X,
  ArrowLeft,
  UploadCloud,
  Loader2,
  CheckCircle2,
  AlertTriangle,
  ChevronDown,
  Sparkles,
  Link as LinkIcon,
  Check,
} from "lucide-react";
import { useConnectModal } from "../context/ConnectModalContext";

// --- TYPES & INTERFACES ---
interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
}

// --- SCHEMA DEFINITIONS ---
const studentSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  collegeName: z.string().min(2, "College name must be at least 2 characters"),
  yearOfStudy: z.enum(["1st Year", "2nd Year", "3rd Year", "4th Year", "Graduate"], {
    message: "Select your current year of study",
  }),
  semester: z.enum(
    [
      "Semester 1",
      "Semester 2",
      "Semester 3",
      "Semester 4",
      "Semester 5",
      "Semester 6",
      "Semester 7",
      "Semester 8",
    ],
    { message: "Select your current semester" }
  ),
  domains: z.array(z.string()).min(1, "Select at least one domain of interest"),
  contactNumber: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .regex(/^\+?[0-9\s\-()]+$/, "Invalid phone number format"),
  email: z.string().email("Invalid email address"),
  linkedin: z
    .string()
    .url("Invalid LinkedIn URL")
    .or(z.literal(""))
    .optional(),
  resumeBase64: z.string().min(1, "Please upload your resume in PDF format"),
  resumeName: z.string().min(1, "Resume name is required"),
  agreeToContact: z.boolean().refine((val) => val === true, {
    message: "You must agree to proceed",
  }),
});

const clientSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  companyName: z.string().min(2, "Company name must be at least 2 characters"),
  designation: z.string().min(2, "Designation must be at least 2 characters"),
  contactNumber: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .regex(/^\+?[0-9\s\-()]+$/, "Invalid phone number format"),
  email: z.string().email("Invalid email address"),
  service: z.enum(
    [
      "AI & Automation",
      "Software Development",
      "Web Development",
      "Mobile App Development",
      "Cloud & DevOps",
      "Digital Transformation",
      "Enterprise Solutions",
    ],
    { message: "Select the service you require" }
  ),
  budgetRange: z.enum(
    ["Under ₹50K", "₹50K - ₹2L", "₹2L - ₹5L", "₹5L - ₹10L", "₹10L+"],
    { message: "Select your budget range" }
  ),
  projectDescription: z.string().min(10, "Project description must be at least 10 characters"),
});

type StudentFormValues = z.infer<typeof studentSchema>;
type ClientFormValues = z.infer<typeof clientSchema>;

export default function ConnectModal() {
  const { isOpen, initialFlow, closeModal } = useConnectModal();
  const [currentStep, setCurrentStep] = useState<"select" | "student" | "client" | "success">("select");
  const [submittedType, setSubmittedType] = useState<"student" | "client">("student");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Initialize step based on provider state
  useEffect(() => {
    if (isOpen) {
      setCurrentStep(initialFlow);
      setApiError(null);
    }
  }, [isOpen, initialFlow]);

  // Particles animation in background overlay
  useEffect(() => {
    if (!isOpen) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const particles: Particle[] = [];
    const count = 35;

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: Math.random() * 2 + 0.5,
        alpha: Math.random() * 0.5 + 0.1,
      });
    }

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        ctx.fillStyle = `rgba(255, 90, 31, ${p.alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();

        p.x += p.vx;
        p.y += p.vy;

        // Wrap particles
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isOpen]);

  // React Hook Form for Student
  const {
    register: registerStudent,
    handleSubmit: handleSubmitStudent,
    control: controlStudent,
    formState: { errors: errorsStudent },
    reset: resetStudent,
    setValue: setValueStudent,
  } = useForm<StudentFormValues>({
    resolver: zodResolver(studentSchema),
    defaultValues: {
      fullName: "",
      collegeName: "",
      domains: [],
      contactNumber: "",
      email: "",
      linkedin: "",
      resumeBase64: "",
      resumeName: "",
      agreeToContact: undefined,
    },
  });

  // React Hook Form for Client
  const {
    register: registerClient,
    handleSubmit: handleSubmitClient,
    formState: { errors: errorsClient },
    reset: resetClient,
  } = useForm<ClientFormValues>({
    resolver: zodResolver(clientSchema),
    defaultValues: {
      fullName: "",
      companyName: "",
      designation: "",
      contactNumber: "",
      email: "",
      projectDescription: "",
    },
  });

  const domainsList = [
    "AI & Machine Learning",
    "Data Science",
    "Web Development",
    "App Development",
    "UI/UX Design",
    "Cyber Security",
    "Cloud & DevOps",
    "Generative AI",
    "Software Development",
  ];

  const servicesList = [
    "AI & Automation",
    "Software Development",
    "Web Development",
    "Mobile App Development",
    "Cloud & DevOps",
    "Digital Transformation",
    "Enterprise Solutions",
  ];

  const budgetRanges = [
    "Under ₹50K",
    "₹50K - ₹2L",
    "₹2L - ₹5L",
    "₹5L - ₹10L",
    "₹10L+",
  ];

  // File Upload Helper
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      setFileError("Only PDF resumes are supported.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setFileError("Resume size must be under 5MB.");
      return;
    }

    setFileError(null);
    setSelectedFile(file);
    setValueStudent("resumeName", file.name, { shouldValidate: true });

    const reader = new FileReader();
    reader.onloadend = () => {
      setValueStudent("resumeBase64", reader.result as string, { shouldValidate: true });
    };
    reader.readAsDataURL(file);
  };

  // Submit Handlers
  const onStudentSubmit = async (data: StudentFormValues) => {
    setIsSubmitting(true);
    setApiError(null);
    try {
      const res = await fetch("/api/connect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "student", data }),
      });

      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.error || "Submission failed. Please try again.");
      }

      // Generate WhatsApp Text
      const text = `*NEW DEVPHOENIX ENQUIRY*\n\n*Name:* ${data.fullName}\n*Phone:* ${data.contactNumber}\n*Email:* ${data.email}\n*Type:* Academy Student Application\n\n*Submitted Details:*\n• *College:* ${data.collegeName}\n• *Year:* ${data.yearOfStudy}\n• *Semester:* ${data.semester}\n• *Domains:* ${data.domains.join(", ")}\n• *LinkedIn:* ${data.linkedin || "Not provided"}\n• *Resume:* ${data.resumeName}`;
      setSubmittedType("student");
      setCurrentStep("success");
      
      // Auto trigger WhatsApp redirect
      triggerWhatsApp(text);
      
      resetStudent();
      setSelectedFile(null);
    } catch (err) {
      const errMsg = err instanceof Error ? err.message : "An unexpected error occurred.";
      setApiError(errMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const onClientSubmit = async (data: ClientFormValues) => {
    setIsSubmitting(true);
    setApiError(null);
    try {
      const res = await fetch("/api/connect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "client", data }),
      });

      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.error || "Submission failed. Please try again.");
      }

      // Generate WhatsApp Text
      const text = `*NEW DEVPHOENIX ENQUIRY*\n\n*Name:* ${data.fullName}\n*Phone:* ${data.contactNumber}\n*Email:* ${data.email}\n*Type:* Client Consultation Request\n\n*Submitted Details:*\n• *Company:* ${data.companyName}\n• *Designation:* ${data.designation}\n• *Service Required:* ${data.service}\n• *Budget Range:* ${data.budgetRange}\n\n*Project Description:*\n${data.projectDescription}`;
      setSubmittedType("client");
      setCurrentStep("success");

      // Auto trigger WhatsApp redirect
      triggerWhatsApp(text);

      resetClient();
    } catch (err) {
      const errMsg = err instanceof Error ? err.message : "An unexpected error occurred.";
      setApiError(errMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const triggerWhatsApp = (text: string) => {
    const encodedText = encodeURIComponent(text);
    const whatsappUrl = `https://api.whatsapp.com/send?phone=919734876490&text=${encodedText}`;
    
    // Smooth delay before opening to allow user to see success UI
    setTimeout(() => {
      window.open(whatsappUrl, "_blank");
    }, 1500);
  };

  // Motion variants for overlay
  const overlayVariants = {
    closed: { opacity: 0 },
    open: { 
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" as const }
    }
  };

  // Motion variants for glass panel container
  const panelVariants = {
    initial: { scale: 0.95, opacity: 0, y: 20 },
    animate: { 
      scale: 1, 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }
    },
    exit: { 
      scale: 0.95, 
      opacity: 0, 
      y: -20,
      transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const }
    }
  };

  const cardVariants = {
    rest: { y: 0, scale: 1, borderColor: "rgba(255, 90, 31, 0.15)" },
    hover: { 
      y: -8, 
      scale: 1.02, 
      borderColor: "rgba(255, 90, 31, 0.55)",
      boxShadow: "0 0 35px rgba(255, 90, 31, 0.25), inset 0 0 15px rgba(255, 90, 31, 0.08)",
      transition: { duration: 0.3, ease: "easeOut" as const }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" as const }
    })
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        variants={overlayVariants}
        initial="closed"
        animate="open"
        exit="closed"
        className="fixed inset-0 z-[100] w-full h-full min-h-screen bg-[#050505]/95 backdrop-blur-xl flex items-center justify-center overflow-y-auto px-4 py-8 md:p-12 select-none"
      >
        {/* Particle Canvas */}
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-40" />

        {/* Cyber-tech background grids & glowing accents */}
        <div 
          className="absolute inset-0 opacity-[0.03] pointer-events-none z-0"
          style={{
            backgroundImage: `linear-gradient(rgba(255, 90, 31, 0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 90, 31, 0.15) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
            backgroundPosition: "center center"
          }}
        />

        <div className="absolute top-[10%] left-[20%] w-[350px] h-[350px] rounded-full opacity-[0.06] blur-[100px] pointer-events-none z-0 bg-[#ff5a1f]" />
        <div className="absolute bottom-[10%] right-[20%] w-[400px] h-[400px] rounded-full opacity-[0.04] blur-[120px] pointer-events-none z-0 bg-[#ff8a00]" />

        {/* Main Glass Panel Wrapper */}
        <motion.div
          variants={panelVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="relative z-10 w-full max-w-4xl glass-card rounded-[28px] border border-white/[0.08] bg-black/60 shadow-[0_24px_80px_rgba(0,0,0,0.8),0_0_50px_rgba(255,90,31,0.04)] p-6 md:p-10 flex flex-col gap-6 max-h-[90vh] overflow-y-auto scrollbar-thin"
        >
          {/* Header Action Bar */}
          <div className="flex items-center justify-between w-full border-b border-white/5 pb-5">
            {currentStep !== "select" && currentStep !== "success" ? (
              <button
                onClick={() => {
                  setApiError(null);
                  setCurrentStep("select");
                }}
                className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-white/50 hover:text-brand-orange transition-colors cursor-pointer group"
              >
                <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
                <span>Go Back</span>
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-brand-orange animate-pulse" />
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/40 font-mono">
                  Secure Connection Node
                </span>
              </div>
            )}

            <button
              onClick={closeModal}
              className="p-2 rounded-full bg-white/[0.03] border border-white/5 hover:border-brand-orange/40 hover:bg-brand-orange/5 text-white/70 hover:text-brand-orange transition-all duration-300 cursor-pointer"
              title="Close Portal"
            >
              <X size={18} />
            </button>
          </div>

          {/* Form / Choice Panels */}
          <div className="flex-1 w-full relative">
            <AnimatePresence mode="wait">
              
              {/* --- SCREEN 1: PATH SELECTION --- */}
              {currentStep === "select" && (
                <motion.div
                  key="select-screen"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col items-center text-center py-4"
                >
                  <motion.span 
                    variants={itemVariants} custom={0} initial="hidden" animate="visible"
                    className="text-xs font-extrabold tracking-[0.3em] uppercase text-brand-orange mb-3"
                  >
                    DEVPHOENIX CONNECT
                  </motion.span>
                  <motion.h2 
                    variants={itemVariants} custom={1} initial="hidden" animate="visible"
                    className="font-sora font-extrabold text-3xl md:text-5xl text-white mb-4 tracking-tight"
                  >
                    Choose Your Path
                  </motion.h2>
                  <motion.p 
                    variants={itemVariants} custom={2} initial="hidden" animate="visible"
                    className="text-white/60 text-sm md:text-base max-w-xl mb-10 leading-relaxed"
                  >
                    Tell us who you are and we&apos;ll connect you with the right DevPhoenix ecosystem.
                  </motion.p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl mt-4">
                    
                    {/* Card 1: Student */}
                    <motion.div
                      variants={cardVariants}
                      initial="rest"
                      whileHover="hover"
                      onClick={() => setCurrentStep("student")}
                      className="group flex flex-col justify-between p-8 rounded-2xl border bg-[#0a0a0a]/50 backdrop-blur-md cursor-pointer transition-all duration-300 text-left h-[280px]"
                    >
                      <div className="flex flex-col gap-4">
                        <div className="w-12 h-12 rounded-xl bg-brand-orange/10 border border-brand-orange/20 flex items-center justify-center text-brand-orange group-hover:bg-brand-orange group-hover:text-white transition-all duration-300 shadow-[0_0_15px_rgba(255,90,31,0.15)]">
                          <GraduationCap className="w-6 h-6 transition-transform group-hover:scale-110" />
                        </div>
                        <h3 className="font-sora font-extrabold text-lg text-white tracking-wide uppercase">
                          Are you a student?
                        </h3>
                        <p className="text-white/60 text-xs sm:text-sm leading-relaxed">
                          Apply for internships, industrial training, mentorship programs, certification programs and career opportunities through DevPhoenix Academy.
                        </p>
                      </div>

                      <button className="text-xs font-bold uppercase tracking-wider text-brand-orange flex items-center gap-1 mt-4 group-hover:translate-x-1 transition-all duration-300">
                        <span>Continue as Student</span>
                        <span>&rarr;</span>
                      </button>
                    </motion.div>

                    {/* Card 2: Client */}
                    <motion.div
                      variants={cardVariants}
                      initial="rest"
                      whileHover="hover"
                      onClick={() => setCurrentStep("client")}
                      className="group flex flex-col justify-between p-8 rounded-2xl border bg-[#0a0a0a]/50 backdrop-blur-md cursor-pointer transition-all duration-300 text-left h-[280px]"
                    >
                      <div className="flex flex-col gap-4">
                        <div className="w-12 h-12 rounded-xl bg-brand-orange/10 border border-brand-orange/20 flex items-center justify-center text-brand-orange group-hover:bg-brand-orange group-hover:text-white transition-all duration-300 shadow-[0_0_15px_rgba(255,90,31,0.15)]">
                          <Briefcase className="w-6 h-6 transition-transform group-hover:scale-110" />
                        </div>
                        <h3 className="font-sora font-extrabold text-lg text-white tracking-wide uppercase">
                          Are you a client?
                        </h3>
                        <p className="text-white/60 text-xs sm:text-sm leading-relaxed">
                          Partner with DevPhoenix for AI solutions, software development, automation, web applications, cloud solutions and digital transformation.
                        </p>
                      </div>

                      <button className="text-xs font-bold uppercase tracking-wider text-brand-orange flex items-center gap-1 mt-4 group-hover:translate-x-1 transition-all duration-300">
                        <span>Continue as Client</span>
                        <span>&rarr;</span>
                      </button>
                    </motion.div>

                  </div>
                </motion.div>
              )}

              {/* --- STUDENT APPLICATION FORM --- */}
              {currentStep === "student" && (
                <motion.div
                  key="student-form"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.3 }}
                  className="py-2"
                >
                  <div className="mb-8">
                    <span className="text-xs font-bold tracking-[0.25em] text-brand-orange uppercase">
                      Academy Ecosystem Connect
                    </span>
                    <h3 className="font-sora font-extrabold text-2xl md:text-3xl text-white mt-1">
                      Student Application Form
                    </h3>
                    <p className="text-white/50 text-xs sm:text-sm mt-1">
                      Join the DevPhoenix Academy ecosystem and unlock future-ready opportunities.
                    </p>
                  </div>

                  {apiError && (
                    <div className="mb-6 p-4 rounded-xl border border-red-500/20 bg-red-500/5 flex items-center gap-3 text-red-400 text-xs sm:text-sm">
                      <AlertTriangle className="flex-shrink-0 w-4 h-4 text-red-500" />
                      <span>{apiError}</span>
                    </div>
                  )}

                  <form onSubmit={handleSubmitStudent(onStudentSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      
                      {/* Full Name */}
                      <div className="flex flex-col gap-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-white/60">
                          Full Name <span className="text-brand-orange">*</span>
                        </label>
                        <input
                          type="text"
                          placeholder="E.g. Jane Doe"
                          {...registerStudent("fullName")}
                          className={`bg-black/40 border ${
                            errorsStudent.fullName ? "border-red-500/50" : "border-white/10"
                          } rounded-xl px-4 py-3 text-sm focus:border-brand-orange/50 focus:outline-none w-full text-white`}
                        />
                        {errorsStudent.fullName && (
                          <span className="text-[11px] text-red-400">{errorsStudent.fullName.message}</span>
                        )}
                      </div>

                      {/* College Name */}
                      <div className="flex flex-col gap-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-white/60">
                          College Name <span className="text-brand-orange">*</span>
                        </label>
                        <input
                          type="text"
                          placeholder="E.g. Stanford University"
                          {...registerStudent("collegeName")}
                          className={`bg-black/40 border ${
                            errorsStudent.collegeName ? "border-red-500/50" : "border-white/10"
                          } rounded-xl px-4 py-3 text-sm focus:border-brand-orange/50 focus:outline-none w-full text-white`}
                        />
                        {errorsStudent.collegeName && (
                          <span className="text-[11px] text-red-400">{errorsStudent.collegeName.message}</span>
                        )}
                      </div>

                      {/* Current Year of Study */}
                      <div className="flex flex-col gap-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-white/60">
                          Current Year of Study <span className="text-brand-orange">*</span>
                        </label>
                        <div className="relative">
                          <select
                            {...registerStudent("yearOfStudy")}
                            className={`appearance-none bg-black/45 border ${
                              errorsStudent.yearOfStudy ? "border-red-500/50" : "border-white/10"
                            } rounded-xl px-4 py-3 text-sm focus:border-brand-orange/50 focus:outline-none w-full text-white cursor-pointer`}
                          >
                            <option value="">Select Year</option>
                            <option value="1st Year">1st Year</option>
                            <option value="2nd Year">2nd Year</option>
                            <option value="3rd Year">3rd Year</option>
                            <option value="4th Year">4th Year</option>
                            <option value="Graduate">Graduate</option>
                          </select>
                          <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/45 pointer-events-none" />
                        </div>
                        {errorsStudent.yearOfStudy && (
                          <span className="text-[11px] text-red-400">{errorsStudent.yearOfStudy.message}</span>
                        )}
                      </div>

                      {/* Current Semester */}
                      <div className="flex flex-col gap-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-white/60">
                          Current Semester <span className="text-brand-orange">*</span>
                        </label>
                        <div className="relative">
                          <select
                            {...registerStudent("semester")}
                            className={`appearance-none bg-black/45 border ${
                              errorsStudent.semester ? "border-red-500/50" : "border-white/10"
                            } rounded-xl px-4 py-3 text-sm focus:border-brand-orange/50 focus:outline-none w-full text-white cursor-pointer`}
                          >
                            <option value="">Select Semester</option>
                            {Array.from({ length: 8 }).map((_, i) => (
                              <option key={i} value={`Semester ${i + 1}`}>
                                Semester {i + 1}
                              </option>
                            ))}
                          </select>
                          <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/45 pointer-events-none" />
                        </div>
                        {errorsStudent.semester && (
                          <span className="text-[11px] text-red-400">{errorsStudent.semester.message}</span>
                        )}
                      </div>
                    </div>

                    {/* Domain Applying For - Multi Select Tag Grid */}
                    <div className="flex flex-col gap-3">
                      <label className="text-xs font-bold uppercase tracking-wider text-white/60">
                        Domain Applying For <span className="text-brand-orange">*</span>
                      </label>
                      
                      <Controller
                        name="domains"
                        control={controlStudent}
                        render={({ field }) => (
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                            {domainsList.map((domain) => {
                              const isSelected = field.value.includes(domain);
                              return (
                                <button
                                  type="button"
                                  key={domain}
                                  onClick={() => {
                                    const newValue = isSelected
                                      ? field.value.filter((val) => val !== domain)
                                      : [...field.value, domain];
                                    field.onChange(newValue);
                                  }}
                                  className={`px-4 py-2.5 rounded-xl border text-xs text-left font-medium transition-all duration-300 flex items-center justify-between cursor-pointer ${
                                    isSelected
                                      ? "bg-brand-orange/10 border-brand-orange text-white shadow-[0_0_15px_rgba(255,90,31,0.1)]"
                                      : "bg-black/30 border-white/[0.06] hover:border-brand-orange/30 hover:bg-brand-orange/5 text-white/60 hover:text-white"
                                  }`}
                                >
                                  <span>{domain}</span>
                                  {isSelected && <Check size={12} className="text-brand-orange" />}
                                </button>
                              );
                            })}
                          </div>
                        )}
                      />
                      {errorsStudent.domains && (
                        <span className="text-[11px] text-red-400">{errorsStudent.domains.message}</span>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      
                      {/* Contact Number */}
                      <div className="flex flex-col gap-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-white/60">
                          Contact Number <span className="text-brand-orange">*</span>
                        </label>
                        <input
                          type="text"
                          placeholder="E.g. +91 98765 43210"
                          {...registerStudent("contactNumber")}
                          className={`bg-black/40 border ${
                            errorsStudent.contactNumber ? "border-red-500/50" : "border-white/10"
                          } rounded-xl px-4 py-3 text-sm focus:border-brand-orange/50 focus:outline-none w-full text-white`}
                        />
                        {errorsStudent.contactNumber && (
                          <span className="text-[11px] text-red-400">{errorsStudent.contactNumber.message}</span>
                        )}
                      </div>

                      {/* Email Address */}
                      <div className="flex flex-col gap-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-white/60">
                          Email Address <span className="text-brand-orange">*</span>
                        </label>
                        <input
                          type="email"
                          placeholder="jane.doe@example.com"
                          {...registerStudent("email")}
                          className={`bg-black/40 border ${
                            errorsStudent.email ? "border-red-500/50" : "border-white/10"
                          } rounded-xl px-4 py-3 text-sm focus:border-brand-orange/50 focus:outline-none w-full text-white`}
                        />
                        {errorsStudent.email && (
                          <span className="text-[11px] text-red-400">{errorsStudent.email.message}</span>
                        )}
                      </div>
                    </div>

                    {/* LinkedIn Profile */}
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-white/60">
                        <LinkIcon size={12} className="text-white/40" />
                        <label>LinkedIn Profile (Optional)</label>
                      </div>
                      <input
                        type="url"
                        placeholder="https://linkedin.com/in/username"
                        {...registerStudent("linkedin")}
                        className={`bg-black/40 border ${
                          errorsStudent.linkedin ? "border-red-500/50" : "border-white/10"
                        } rounded-xl px-4 py-3 text-sm focus:border-brand-orange/50 focus:outline-none w-full text-white`}
                      />
                      {errorsStudent.linkedin && (
                        <span className="text-[11px] text-red-400">{errorsStudent.linkedin.message}</span>
                      )}
                    </div>

                    {/* Resume Upload (PDF) */}
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-white/60">
                        Resume Upload (PDF) <span className="text-brand-orange">*</span>
                      </label>
                      
                      <div className="relative group/upload">
                        <input
                          type="file"
                          accept="application/pdf"
                          id="resume-upload"
                          onChange={handleFileChange}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                        />
                        <div
                          className={`border-2 border-dashed ${
                            errorsStudent.resumeBase64 || fileError
                              ? "border-red-500/30 bg-red-500/5"
                              : "border-white/10 bg-black/25 group-hover/upload:border-brand-orange/30 group-hover/upload:bg-brand-orange/5"
                          } rounded-2xl p-6 text-center transition-all duration-300 flex flex-col items-center justify-center gap-3`}
                        >
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            selectedFile ? "bg-brand-orange/20 text-brand-orange" : "bg-white/5 text-white/40 group-hover/upload:scale-105 transition-transform"
                          }`}>
                            <UploadCloud className="w-5 h-5" />
                          </div>
                          
                          {selectedFile ? (
                            <div>
                              <p className="text-sm font-semibold text-white truncate max-w-[280px]">
                                {selectedFile.name}
                              </p>
                              <p className="text-[11px] text-white/40 mt-0.5">
                                {(selectedFile.size / 1024 / 1024).toFixed(2)} MB • PDF Document
                              </p>
                            </div>
                          ) : (
                            <div>
                              <p className="text-sm font-medium text-white/80">
                                Click or drag resume to upload
                              </p>
                              <p className="text-[11px] text-white/40 mt-0.5">
                                Support PDF only. Max file size 5MB.
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {/* Custom errors */}
                      {(errorsStudent.resumeBase64 || fileError) && (
                        <span className="text-[11px] text-red-400">
                          {errorsStudent.resumeBase64?.message || fileError}
                        </span>
                      )}
                    </div>

                    {/* Agree Checkbox */}
                    <div className="flex flex-col gap-2">
                      <div className="flex items-start gap-3">
                        <input
                          type="checkbox"
                          id="agreeToContact"
                          {...registerStudent("agreeToContact")}
                          className="w-4.5 h-4.5 rounded border-white/10 bg-black/40 text-brand-orange focus:ring-brand-orange cursor-pointer mt-0.5"
                        />
                        <label htmlFor="agreeToContact" className="text-xs leading-normal text-white/60 cursor-pointer">
                          I agree to be contacted by DevPhoenix regarding training, internships and career opportunities.
                        </label>
                      </div>
                      {errorsStudent.agreeToContact && (
                        <span className="text-[11px] text-red-400">{errorsStudent.agreeToContact.message}</span>
                      )}
                    </div>

                    {/* Submit Button */}
                    <motion.button
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full mt-4 py-4 rounded-xl text-xs sm:text-sm font-bold tracking-wider uppercase text-white bg-gradient-to-r from-brand-orange to-brand-amber shadow-[0_0_25px_rgba(255,90,31,0.2)] hover:shadow-[0_0_35px_rgba(255,90,31,0.4)] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 size={16} className="animate-spin" />
                          <span>Submitting Node...</span>
                        </>
                      ) : (
                        <>
                          <Sparkles size={16} />
                          <span>Submit Application</span>
                        </>
                      )}
                    </motion.button>
                  </form>
                </motion.div>
              )}

              {/* --- CLIENT CONSULTATION FORM --- */}
              {currentStep === "client" && (
                <motion.div
                  key="client-form"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.3 }}
                  className="py-2"
                >
                  <div className="mb-8">
                    <span className="text-xs font-bold tracking-[0.25em] text-brand-orange uppercase">
                      Client Solutions Connect
                    </span>
                    <h3 className="font-sora font-extrabold text-2xl md:text-3xl text-white mt-1">
                      Client Consultation Request
                    </h3>
                    <p className="text-white/50 text-xs sm:text-sm mt-1">
                      Tell us about your business and we&apos;ll help build the future together.
                    </p>
                  </div>

                  {apiError && (
                    <div className="mb-6 p-4 rounded-xl border border-red-500/20 bg-red-500/5 flex items-center gap-3 text-red-400 text-xs sm:text-sm">
                      <AlertTriangle className="flex-shrink-0 w-4 h-4 text-red-500" />
                      <span>{apiError}</span>
                    </div>
                  )}

                  <form onSubmit={handleSubmitClient(onClientSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      
                      {/* Full Name */}
                      <div className="flex flex-col gap-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-white/60">
                          Full Name <span className="text-brand-orange">*</span>
                        </label>
                        <input
                          type="text"
                          placeholder="E.g. John Doe"
                          {...registerClient("fullName")}
                          className={`bg-black/40 border ${
                            errorsClient.fullName ? "border-red-500/50" : "border-white/10"
                          } rounded-xl px-4 py-3 text-sm focus:border-brand-orange/50 focus:outline-none w-full text-white`}
                        />
                        {errorsClient.fullName && (
                          <span className="text-[11px] text-red-400">{errorsClient.fullName.message}</span>
                        )}
                      </div>

                      {/* Company Name */}
                      <div className="flex flex-col gap-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-white/60">
                          Company Name <span className="text-brand-orange">*</span>
                        </label>
                        <input
                          type="text"
                          placeholder="E.g. Acme Corporation"
                          {...registerClient("companyName")}
                          className={`bg-black/40 border ${
                            errorsClient.companyName ? "border-red-500/50" : "border-white/10"
                          } rounded-xl px-4 py-3 text-sm focus:border-brand-orange/50 focus:outline-none w-full text-white`}
                        />
                        {errorsClient.companyName && (
                          <span className="text-[11px] text-red-400">{errorsClient.companyName.message}</span>
                        )}
                      </div>

                      {/* Designation */}
                      <div className="flex flex-col gap-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-white/60">
                          Designation <span className="text-brand-orange">*</span>
                        </label>
                        <input
                          type="text"
                          placeholder="E.g. Chief Technology Officer"
                          {...registerClient("designation")}
                          className={`bg-black/40 border ${
                            errorsClient.designation ? "border-red-500/50" : "border-white/10"
                          } rounded-xl px-4 py-3 text-sm focus:border-brand-orange/50 focus:outline-none w-full text-white`}
                        />
                        {errorsClient.designation && (
                          <span className="text-[11px] text-red-400">{errorsClient.designation.message}</span>
                        )}
                      </div>

                      {/* Contact Number */}
                      <div className="flex flex-col gap-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-white/60">
                          Contact Number <span className="text-brand-orange">*</span>
                        </label>
                        <input
                          type="text"
                          placeholder="E.g. +91 98765 43210"
                          {...registerClient("contactNumber")}
                          className={`bg-black/40 border ${
                            errorsClient.contactNumber ? "border-red-500/50" : "border-white/10"
                          } rounded-xl px-4 py-3 text-sm focus:border-brand-orange/50 focus:outline-none w-full text-white`}
                        />
                        {errorsClient.contactNumber && (
                          <span className="text-[11px] text-red-400">{errorsClient.contactNumber.message}</span>
                        )}
                      </div>

                      {/* Email Address */}
                      <div className="flex flex-col gap-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-white/60">
                          Email Address <span className="text-brand-orange">*</span>
                        </label>
                        <input
                          type="email"
                          placeholder="john.doe@acme.com"
                          {...registerClient("email")}
                          className={`bg-black/40 border ${
                            errorsClient.email ? "border-red-500/50" : "border-white/10"
                          } rounded-xl px-4 py-3 text-sm focus:border-brand-orange/50 focus:outline-none w-full text-white`}
                        />
                        {errorsClient.email && (
                          <span className="text-[11px] text-red-400">{errorsClient.email.message}</span>
                        )}
                      </div>

                      {/* Service Required */}
                      <div className="flex flex-col gap-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-white/60">
                          Service Required <span className="text-brand-orange">*</span>
                        </label>
                        <div className="relative">
                          <select
                            {...registerClient("service")}
                            className={`appearance-none bg-black/45 border ${
                              errorsClient.service ? "border-red-500/50" : "border-white/10"
                            } rounded-xl px-4 py-3 text-sm focus:border-brand-orange/50 focus:outline-none w-full text-white cursor-pointer`}
                          >
                            <option value="">Select Service</option>
                            {servicesList.map((service) => (
                              <option key={service} value={service}>
                                {service}
                              </option>
                            ))}
                          </select>
                          <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/45 pointer-events-none" />
                        </div>
                        {errorsClient.service && (
                          <span className="text-[11px] text-red-400">{errorsClient.service.message}</span>
                        )}
                      </div>

                      {/* Budget Range */}
                      <div className="flex flex-col gap-2 md:col-span-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-white/60">
                          Budget Range <span className="text-brand-orange">*</span>
                        </label>
                        <div className="relative">
                          <select
                            {...registerClient("budgetRange")}
                            className={`appearance-none bg-black/45 border ${
                              errorsClient.budgetRange ? "border-red-500/50" : "border-white/10"
                            } rounded-xl px-4 py-3 text-sm focus:border-brand-orange/50 focus:outline-none w-full text-white cursor-pointer`}
                          >
                            <option value="">Select Budget</option>
                            {budgetRanges.map((range) => (
                              <option key={range} value={range}>
                                {range}
                              </option>
                            ))}
                          </select>
                          <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/45 pointer-events-none" />
                        </div>
                        {errorsClient.budgetRange && (
                          <span className="text-[11px] text-red-400">{errorsClient.budgetRange.message}</span>
                        )}
                      </div>
                    </div>

                    {/* Project Description */}
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-white/60">
                        Project Description <span className="text-brand-orange">*</span>
                      </label>
                      <textarea
                        rows={4}
                        placeholder="Tell us about your project requirements, tech stack preference, or scope details..."
                        {...registerClient("projectDescription")}
                        className={`bg-black/40 border ${
                          errorsClient.projectDescription ? "border-red-500/50" : "border-white/10"
                        } rounded-xl px-4 py-3 text-sm focus:border-brand-orange/50 focus:outline-none w-full text-white resize-none`}
                      />
                      {errorsClient.projectDescription && (
                        <span className="text-[11px] text-red-400">{errorsClient.projectDescription.message}</span>
                      )}
                    </div>

                    {/* Submit Button */}
                    <motion.button
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full mt-4 py-4 rounded-xl text-xs sm:text-sm font-bold tracking-wider uppercase text-white bg-gradient-to-r from-brand-orange to-brand-amber shadow-[0_0_25px_rgba(255,90,31,0.2)] hover:shadow-[0_0_35px_rgba(255,90,31,0.4)] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 size={16} className="animate-spin" />
                          <span>Requesting Consultation...</span>
                        </>
                      ) : (
                        <>
                          <Sparkles size={16} />
                          <span>Request Consultation</span>
                        </>
                      )}
                    </motion.button>
                  </form>
                </motion.div>
              )}

              {/* --- SCREEN 3: SUCCESS STATE --- */}
              {currentStep === "success" && (
                <motion.div
                  key="success-screen"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col items-center text-center py-10 px-4"
                >
                  {/* Draws Checkmark Animation */}
                  <div className="w-20 h-20 rounded-full border-2 border-brand-orange bg-brand-orange/5 flex items-center justify-center shadow-[0_0_30px_rgba(255,90,31,0.25)] mb-8 relative">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: [0, 1.2, 1] }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                      className="text-brand-orange"
                    >
                      <CheckCircle2 className="w-12 h-12 stroke-[2.5]" />
                    </motion.div>
                    
                    {/* Glowing pulse rings */}
                    <div className="absolute -inset-2 rounded-full border border-brand-orange/15 animate-ping opacity-60 pointer-events-none" />
                  </div>

                  <h2 className="font-sora font-extrabold text-2xl md:text-3xl text-white mb-4 max-w-lg tracking-tight">
                    {submittedType === "student"
                      ? "Application Submitted Successfully"
                      : "Consultation Request Submitted Successfully"}
                  </h2>
                  
                  <p className="text-white/60 text-sm md:text-base max-w-md mb-2 leading-relaxed">
                    Thank you for connecting with DevPhoenix.
                  </p>
                  <p className="text-white/50 text-xs sm:text-sm max-w-sm mb-10">
                    Our team will review your submission and contact you shortly. A formatted WhatsApp message is being dispatched to the founder.
                  </p>

                  <div className="flex flex-col sm:flex-row items-center gap-4 w-full max-w-sm">
                    {/* Back to Home / Reset */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setApiError(null);
                        setCurrentStep("select");
                      }}
                      className="w-full py-3.5 rounded-xl border border-white/10 hover:border-brand-orange/40 bg-white/[0.02] hover:bg-brand-orange/5 text-white font-bold text-xs uppercase tracking-wider transition-all duration-300 cursor-pointer"
                    >
                      Back to Start
                    </motion.button>

                    {/* Close modal */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={closeModal}
                      className="w-full py-3.5 rounded-xl bg-gradient-to-r from-brand-orange to-brand-amber shadow-[0_0_20px_rgba(255,90,31,0.2)] text-white font-bold text-xs uppercase tracking-wider transition-all duration-300 cursor-pointer"
                    >
                      Close Window
                    </motion.button>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
