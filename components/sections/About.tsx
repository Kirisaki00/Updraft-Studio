"use client";

import { motion } from "framer-motion";
import { Heart, Lightbulb, Target, Zap } from "lucide-react";

const beliefs = [
  {
    icon: Heart,
    title: "Passion-Driven",
    text: "We don't just execute briefs — we genuinely care about making your brand remarkable. Every project gets our full heart.",
  },
  {
    icon: Lightbulb,
    title: "Creative First",
    text: "Strategy without creativity is just a spreadsheet. We lead with bold ideas that make your audience feel something.",
  },
  {
    icon: Target,
    title: "Results Matter",
    text: "Beautiful work means nothing if it doesn't move the needle. We design with purpose, always keeping your goals in focus.",
  },
  {
    icon: Zap,
    title: "Always Evolving",
    text: "The creative world never stands still, and neither do we. We stay ahead of trends so your brand always feels fresh.",
  },
];

const paragraphs = [
  {
    label: "Who We Are",
    text: "Updraft is a creative agency built for brands that refuse to be ordinary. We are a small, focused team of directors, designers, and developers united by one shared obsession: creating work that stops people in their tracks.",
    color: "#a78bfa",
  },
  {
    label: "Why We Started",
    text: "We started Updraft because we were tired of seeing brilliant businesses go unnoticed due to generic, forgettable visuals. Every brand has a story worth telling — we exist to tell it in the most powerful way possible.",
    color: "#22d3ee",
  },
  {
    label: "Our Philosophy",
    text: "We believe great creative work isn't an expense — it's your most powerful growth tool. First impressions are permanent, and in a world of infinite scroll, you have seconds to make one. We make those seconds count.",
    color: "#f472b6",
  },
  {
    label: "Our Commitment",
    text: "When you work with Updraft, you get radical transparency, direct communication, and a team that treats your business like their own. No bloated processes, no empty promises — just honest creative partnership.",
    color: "#a78bfa",
  },
];

export default function About() {
  return (
    <section
      id="about"
      className="section py-36 lg:py-48 relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, #050505 0%, #080510 100%)" }}
    >
      {/* Background aurora */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 0% 50%, rgba(139,92,246,0.07) 0%, transparent 60%)",
        }}
      />

      <div className="container-custom relative z-10">
        {/* Section header */}
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-4"
          >
            <span className="w-8 h-px bg-gradient-to-r from-purple to-transparent" />
            <span
              className="font-space-grotesk text-xs tracking-[0.3em] uppercase font-medium"
              style={{
                background: "linear-gradient(135deg, #a78bfa, #f472b6)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Our Story
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-space-grotesk font-bold text-white"
            style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", letterSpacing: "-0.03em", maxWidth: "700px" }}
          >
            We are storytellers,{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #a78bfa, #22d3ee)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              builders,
            </span>{" "}
            and creatives.
          </motion.h2>
        </div>

        {/* Content grid */}
        <div className="grid lg:grid-cols-2 gap-20 lg:gap-24 items-start">
          {/* Left: paragraphs */}
          <div className="flex flex-col gap-14">
            {paragraphs.map((p, i) => (
              <motion.div
                key={p.label}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.34, 1.56, 0.64, 1] }}
                className="flex gap-5"
              >
                <div
                  className="w-0.5 rounded-full shrink-0 mt-1"
                  style={{
                    background: `linear-gradient(180deg, ${p.color}, transparent)`,
                    minHeight: "60px",
                  }}
                />
                <div>
                  <span
                    className="font-space-grotesk text-xs tracking-[0.2em] uppercase font-medium mb-2 block"
                    style={{ color: p.color }}
                  >
                    {p.label}
                  </span>
                  <p className="font-inter text-text-secondary leading-relaxed">{p.text}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right: animated visual + belief cards */}
          <div className="flex flex-col gap-10">
            {/* Abstract animated shape */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative rounded-3xl overflow-hidden"
              style={{
                height: "280px",
                background: "linear-gradient(135deg, rgba(139,92,246,0.1), rgba(6,182,212,0.1))",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              {/* Animated blobs inside */}
              <div
                className="absolute"
                style={{
                  width: "200px",
                  height: "200px",
                  top: "-40px",
                  left: "-40px",
                  borderRadius: "60% 40% 70% 30% / 50% 60% 40% 50%",
                  background:
                    "radial-gradient(circle, rgba(139,92,246,0.4) 0%, rgba(139,92,246,0) 70%)",
                  animation: "blobFloat 8s ease-in-out infinite",
                  filter: "blur(40px)",
                }}
              />
              <div
                className="absolute"
                style={{
                  width: "180px",
                  height: "180px",
                  bottom: "-30px",
                  right: "-30px",
                  background:
                    "radial-gradient(circle, rgba(6,182,212,0.4) 0%, rgba(6,182,212,0) 70%)",
                  animation: "blobFloatReverse 10s ease-in-out infinite",
                  filter: "blur(40px)",
                }}
              />
              <div
                className="absolute"
                style={{
                  width: "120px",
                  height: "120px",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%,-50%)",
                  background:
                    "radial-gradient(circle, rgba(236,72,153,0.3) 0%, transparent 70%)",
                  animation: "blobFloat 12s ease-in-out 4s infinite",
                  filter: "blur(30px)",
                }}
              />

              {/* Center content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                <div
                  className="font-space-grotesk text-7xl font-bold"
                  style={{
                    background: "linear-gradient(135deg, rgba(167,139,250,0.6), rgba(34,211,238,0.6))",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Updraft
                </div>
                <div className="font-inter text-text-muted text-sm tracking-[0.2em] uppercase">
                  Creative Studio
                </div>
              </div>
            </motion.div>

            {/* Belief cards */}
            <div className="grid grid-cols-2 gap-5">
              {beliefs.map((belief, i) => {
                const Icon = belief.icon;
                return (
                  <motion.div
                    key={belief.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                    className="glass-light rounded-2xl p-5 group hover:border-purple/30 transition-all"
                  >
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-3"
                      style={{ background: "rgba(139,92,246,0.15)" }}>
                      <Icon size={16} style={{ color: "#a78bfa" }} />
                    </div>
                    <h4 className="font-space-grotesk font-semibold text-white text-sm mb-1">
                      {belief.title}
                    </h4>
                    <p className="font-inter text-text-muted text-xs leading-relaxed">
                      {belief.text}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
