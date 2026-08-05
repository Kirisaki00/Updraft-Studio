"use client";

import { useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import {
  Video,
  Scissors,
  Camera,
  ImageIcon,
  Globe,
  Pen,
  Layers,
  Share2,
  Sparkles,
} from "lucide-react";

const services = [
  {
    icon: Video,
    title: "Videography",
    short: "Cinematic storytelling through motion.",
    detail:
      "From concept to final cut, we capture your story with professional-grade cinema cameras, dynamic lighting, and a director's eye for detail.",
    gradient: "from-purple to-purple-light",
    glow: "rgba(139,92,246,0.3)",
  },
  {
    icon: Scissors,
    title: "Video Editing",
    short: "Transforming raw footage into magic.",
    detail:
      "Color grading, sound design, motion graphics, and precise cuts that keep audiences glued to the screen from first frame to last.",
    gradient: "from-cyan to-cyan-light",
    glow: "rgba(6,182,212,0.3)",
  },
  {
    icon: Camera,
    title: "Photography",
    short: "Moments frozen in perfection.",
    detail:
      "Product, portrait, event, and architectural photography that captures emotion, beauty, and your brand's unique character.",
    gradient: "from-magenta to-magenta-light",
    glow: "rgba(236,72,153,0.3)",
  },
  {
    icon: ImageIcon,
    title: "Photo Editing",
    short: "Where imperfect becomes iconic.",
    detail:
      "High-end retouching, color correction, background removal, and composite work that elevates every image to gallery quality.",
    gradient: "from-purple to-cyan",
    glow: "rgba(139,92,246,0.25)",
  },
  {
    icon: Globe,
    title: "Web Design",
    short: "Digital experiences worth clicking.",
    detail:
      "We design and develop websites that convert visitors into clients — fast, beautiful, and built to rank on Google.",
    gradient: "from-cyan to-magenta",
    glow: "rgba(6,182,212,0.25)",
  },
  {
    icon: Pen,
    title: "Graphic Design",
    short: "Visual communication, perfected.",
    detail:
      "Posters, banners, ads, and print materials designed with intention — every element placed to guide the eye and communicate your message.",
    gradient: "from-magenta to-purple",
    glow: "rgba(236,72,153,0.25)",
  },
  {
    icon: Layers,
    title: "Brand Identity",
    short: "More than a logo — a legacy.",
    detail:
      "Complete brand systems: logo design, typography, color palettes, style guides, and visual language that makes you instantly recognizable.",
    gradient: "from-purple-light to-cyan",
    glow: "rgba(167,139,250,0.3)",
  },
  {
    icon: Share2,
    title: "Social Media Content",
    short: "Feeds that stop the scroll.",
    detail:
      "Reels, stories, carousels, and static posts crafted for virality. Consistent, on-brand content that builds communities and drives engagement.",
    gradient: "from-cyan-light to-magenta",
    glow: "rgba(34,211,238,0.25)",
  },
  {
    icon: Sparkles,
    title: "Motion Graphics",
    short: "Design that breathes and moves.",
    detail:
      "Animated logos, explainer videos, kinetic typography, and data visualizations that add a dimension of wonder to your brand.",
    gradient: "from-magenta-light to-purple",
    glow: "rgba(244,114,182,0.3)",
  },
];

function ServiceCard({
  service,
  index,
}: {
  service: (typeof services)[0];
  index: number;
}) {
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });

    // 3D tilt
    const tiltX = ((e.clientY - rect.top) / rect.height - 0.5) * -16;
    const tiltY = ((e.clientX - rect.left) / rect.width - 0.5) * 16;
    card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateZ(8px)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current;
    if (card) {
      card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)";
    }
    setMousePos({ x: 50, y: 50 });
  }, []);

  const Icon = service.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.34, 1.56, 0.64, 1] }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="glow-card glass-light rounded-2xl p-6 cursor-default group relative overflow-hidden"
        style={{
          transition: "transform 0.15s ease, box-shadow 0.3s ease",
          "--mouse-x": `${mousePos.x}%`,
          "--mouse-y": `${mousePos.y}%`,
        } as React.CSSProperties}
      >
        {/* Glow border on hover */}
        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            boxShadow: `0 0 30px ${service.glow}`,
            border: `1px solid ${service.glow}`,
          }}
        />

        {/* Icon */}
        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 relative overflow-hidden`}
          style={{
            background: `linear-gradient(135deg, ${service.glow}, transparent)`,
            border: `1px solid ${service.glow}`,
          }}
        >
          <Icon
            size={22}
            className="text-white relative z-10 group-hover:scale-110 transition-transform duration-300"
          />
        </div>

        {/* Title */}
        <h3 className="font-space-grotesk font-bold text-lg text-white mb-3">
          {service.title}
        </h3>

        {/* Short description */}
        <p className="font-inter text-text-secondary text-sm leading-relaxed mb-4">
          {service.short}
        </p>

        {/* Full detail — always visible */}
        <p className="font-inter text-text-muted text-sm leading-relaxed pt-3 border-t border-white/5">
          {service.detail}
        </p>
      </div>
    </motion.div>
  );
}

export default function Services() {
  return (
    <section id="services" className="section py-36 lg:py-48" style={{ background: "linear-gradient(180deg, #050505 0%, #0a0a0f 100%)" }}>
      <div className="container-custom">
        {/* Section header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
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
              What We Do
            </span>
            <span className="w-8 h-px bg-gradient-to-r from-cyan to-transparent" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-space-grotesk font-bold text-white mb-4"
            style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", letterSpacing: "-0.03em" }}
          >
            Our Services
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-inter text-text-secondary max-w-xl mx-auto text-lg"
          >
            From raw concept to polished execution — everything your brand needs to stand out in a crowded world.
          </motion.p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 lg:gap-8">
          {services.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
