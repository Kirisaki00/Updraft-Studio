"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Search, Map, Video, Edit, Truck } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Discovery",
    description:
      "We start by diving deep into your brand, audience, and goals. A thorough creative brief ensures every decision we make is intentional and aligned with your vision.",
    color: "#8b5cf6",
    accent: "rgba(139,92,246,0.2)",
  },
  {
    number: "02",
    icon: Map,
    title: "Planning",
    description:
      "From shot lists to wireframes, we map out every detail before a single camera is rolled or a pixel is placed. Perfect preparation prevents poor performance.",
    color: "#06b6d4",
    accent: "rgba(6,182,212,0.2)",
  },
  {
    number: "03",
    icon: Video,
    title: "Production",
    description:
      "This is where the magic happens. Our team executes with precision and creativity — capturing, designing, or building with the highest professional standards.",
    color: "#ec4899",
    accent: "rgba(236,72,153,0.2)",
  },
  {
    number: "04",
    icon: Edit,
    title: "Editing",
    description:
      "Raw becomes refined. We spend as much time in post as we do on set — color grading, retouching, animating, and polishing until the work is exceptional.",
    color: "#a78bfa",
    accent: "rgba(167,139,250,0.2)",
  },
  {
    number: "05",
    icon: Truck,
    title: "Delivery",
    description:
      "We hand over fully optimized files in every format you need, with clear documentation. Then we stay available for revisions and future campaigns.",
    color: "#22d3ee",
    accent: "rgba(34,211,238,0.2)",
  },
];

function StepCard({ step, index }: { step: (typeof steps)[0]; index: number }) {
  const Icon = step.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.34, 1.56, 0.64, 1] }}
      className="flex flex-col gap-6 relative"
    >
      {/* Connector line (not on last) */}
      {index < steps.length - 1 && (
        <div
          className="hidden lg:block absolute top-10 left-full w-full h-px z-0 pointer-events-none"
          style={{
            background: `linear-gradient(90deg, ${step.color}60, transparent)`,
            width: "calc(100% - 40px)",
            left: "calc(100% - 20px)",
          }}
        />
      )}

      {/* Card */}
      <div
        className="glass-light rounded-3xl p-8 flex flex-col gap-5 group hover:border-white/10 transition-all duration-500 relative z-10"
        style={{
          border: `1px solid ${step.color}20`,
        }}
      >
        {/* Number + Icon row */}
        <div className="flex items-start justify-between">
          <span
            className="font-space-grotesk font-bold text-5xl leading-none"
            style={{ color: `${step.color}20`, letterSpacing: "-0.05em" }}
          >
            {step.number}
          </span>
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center"
            style={{ background: step.accent, border: `1px solid ${step.color}30` }}
          >
            <Icon size={20} style={{ color: step.color }} />
          </div>
        </div>

        {/* Title */}
        <h3
          className="font-space-grotesk font-bold text-2xl"
          style={{ color: step.color }}
        >
          {step.title}
        </h3>

        {/* Description */}
        <p className="font-inter text-text-secondary text-sm leading-relaxed">
          {step.description}
        </p>

        {/* Bottom glow bar */}
        <div
          className="h-0.5 rounded-full mt-auto opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: `linear-gradient(90deg, ${step.color}, transparent)` }}
        />
      </div>
    </motion.div>
  );
}

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const progressWidth = useTransform(scrollYProgress, [0.1, 0.9], ["0%", "100%"]);

  return (
    <section
      id="process"
      ref={sectionRef}
      className="section py-36 lg:py-48 relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, #0a050f 0%, #050505 100%)" }}
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 40% at 50% 100%, rgba(139,92,246,0.08) 0%, transparent 60%)",
        }}
      />

      <div className="container-custom relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-3 mb-4"
          >
            <span className="w-8 h-px bg-gradient-to-r from-transparent to-purple" />
            <span
              className="font-space-grotesk text-xs tracking-[0.3em] uppercase font-medium"
              style={{
                background: "linear-gradient(135deg, #a78bfa, #22d3ee)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              How We Work
            </span>
            <span className="w-8 h-px bg-gradient-to-r from-cyan to-transparent" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-space-grotesk font-bold text-white mb-4"
            style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", letterSpacing: "-0.03em" }}
          >
            Our Creative Process
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-inter text-text-secondary max-w-lg mx-auto"
          >
            From the first conversation to the final delivery — a deliberate, proven process that produces exceptional results every time.
          </motion.p>
        </div>

        {/* Scroll progress bar */}
        <div className="relative mb-12">
          <div className="h-px w-full bg-white/5 rounded-full" />
          <motion.div
            className="absolute top-0 left-0 h-px rounded-full"
            style={{
              width: progressWidth,
              background: "linear-gradient(90deg, #8b5cf6, #06b6d4, #ec4899)",
            }}
          />
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 relative">
          {steps.map((step, i) => (
            <StepCard key={step.title} step={step} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
