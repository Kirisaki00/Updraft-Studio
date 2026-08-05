"use client";

import { motion } from "framer-motion";
import {
  Lightbulb,
  MessageSquare,
  Cpu,
  Star,
  Eye,
  DollarSign,
  Palette,
  User,
} from "lucide-react";

const features = [
  {
    icon: Lightbulb,
    title: "Creative Solutions",
    description:
      "We approach every brief with fresh eyes and original thinking. No templates, no recycled ideas — only work made specifically for you.",
    color: "#8b5cf6",
  },
  {
    icon: MessageSquare,
    title: "Fast Communication",
    description:
      "We respond within hours, not days. Clear communication and regular updates keep you informed and in control throughout every project.",
    color: "#06b6d4",
  },
  {
    icon: Cpu,
    title: "Modern Technology",
    description:
      "Cinema-grade cameras, industry-leading software, and cutting-edge design tools ensure your work is built on the best foundation available.",
    color: "#ec4899",
  },
  {
    icon: Star,
    title: "Premium Quality",
    description:
      "We hold our work to the highest standard. If it's not exceptional, it doesn't leave our studio. Full stop.",
    color: "#a78bfa",
  },
  {
    icon: Eye,
    title: "Attention to Detail",
    description:
      "The difference between good and great lives in the details. We sweat every pixel, every frame, every word — because excellence is in the craft.",
    color: "#22d3ee",
  },
  {
    icon: DollarSign,
    title: "Transparent Pricing",
    description:
      "No hidden fees, no surprise invoices. You'll know exactly what you're getting and what it costs before we begin — always.",
    color: "#f472b6",
  },
  {
    icon: Palette,
    title: "Custom Designs",
    description:
      "Everything we produce is made from scratch for you. Your brand is unique, and your creative work should be too.",
    color: "#8b5cf6",
  },
  {
    icon: User,
    title: "Personalized Experience",
    description:
      "You work directly with our senior creatives — not account managers. Small team means big attention and genuine investment in your success.",
    color: "#06b6d4",
  },
];

function FeatureCard({ feature, index }: { feature: (typeof features)[0]; index: number }) {
  const Icon = feature.icon;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 30 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.6, delay: index * 0.07, ease: [0.34, 1.56, 0.64, 1] }}
      className="glow-card glass-light rounded-2xl p-6 group cursor-default relative overflow-hidden"
      style={
        {
          "--mouse-x": "50%",
          "--mouse-y": "50%",
          border: `1px solid rgba(255,255,255,0.05)`,
          transition: "border-color 0.3s ease, box-shadow 0.3s ease",
        } as React.CSSProperties
      }
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        e.currentTarget.style.setProperty("--mouse-x", `${x}%`);
        e.currentTarget.style.setProperty("--mouse-y", `${y}%`);
      }}
      whileHover={{ y: -4 }}
    >
      {/* Icon */}
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
        style={{
          background: `${feature.color}18`,
          border: `1px solid ${feature.color}25`,
        }}
      >
        <Icon size={18} style={{ color: feature.color }} />
      </div>

      {/* Title */}
      <h3 className="font-space-grotesk font-bold text-white text-base mb-2 group-hover:text-white/90">
        {feature.title}
      </h3>

      {/* Description */}
      <p className="font-inter text-text-secondary text-sm leading-relaxed">
        {feature.description}
      </p>

      {/* Animated bottom accent */}
      <div
        className="absolute bottom-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `linear-gradient(90deg, ${feature.color}, transparent)`,
        }}
      />
    </motion.div>
  );
}

export default function WhyUs() {
  return (
    <section
      id="why-us"
      className="section py-36 lg:py-48 relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, #050505 0%, #060510 100%)" }}
    >
      {/* Background radials */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 100% 50%, rgba(6,182,212,0.07) 0%, transparent 60%)",
        }}
      />

      <div className="container-custom relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-3 mb-4"
          >
            <span className="w-8 h-px bg-gradient-to-r from-transparent to-magenta" />
            <span
              className="font-space-grotesk text-xs tracking-[0.3em] uppercase font-medium"
              style={{
                background: "linear-gradient(135deg, #f472b6, #a78bfa)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Why Updraft
            </span>
            <span className="w-8 h-px bg-gradient-to-r from-purple to-transparent" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-space-grotesk font-bold text-white mb-4"
            style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", letterSpacing: "-0.03em" }}
          >
            Why Choose Us?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-inter text-text-secondary max-w-xl mx-auto"
          >
            We don't just promise quality — we build our entire process around delivering it, every single time.
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-7">
          {features.map((feature, i) => (
            <FeatureCard key={feature.title} feature={feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
