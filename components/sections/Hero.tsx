"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowDown, ArrowRight, Calendar } from "lucide-react";

const words = ["Your Vision.", "Our Creativity."];

function FloatingBlob({
  color,
  size,
  top,
  left,
  delay,
  duration,
}: {
  color: string;
  size: string;
  top: string;
  left: string;
  delay: number;
  duration: number;
}) {
  return (
    <div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: size,
        height: size,
        top,
        left,
        background: color,
        filter: "blur(80px)",
        opacity: 0.25,
        animation: `blobFloat ${duration}s ease-in-out ${delay}s infinite`,
        mixBlendMode: "screen",
      }}
    />
  );
}

// Particle canvas
function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let W = (canvas.width = window.innerWidth);
    let H = (canvas.height = window.innerHeight);

    const NUM = 120;
    const particles = Array.from({ length: NUM }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.5 + 0.3,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      alpha: Math.random() * 0.5 + 0.1,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = W;
        if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H;
        if (p.y > H) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${p.alpha})`;
        ctx.fill();
      }
      animId = requestAnimationFrame(draw);
    };

    draw();

    const onResize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ opacity: 0.4, zIndex: 1 }}
    />
  );
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const wordVariants = {
  hidden: { clipPath: "inset(0 0 100% 0)", y: 40, opacity: 0 },
  visible: {
    clipPath: "inset(0 0 0% 0)",
    y: 0,
    opacity: 1,
    transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] as [number, number, number, number] },
  },
};

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const handleMouseMove = (e: MouseEvent) => {
      const blobs = section.querySelectorAll<HTMLElement>(".parallax-blob");
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      const dx = (e.clientX - cx) / cx;
      const dy = (e.clientY - cy) / cy;

      blobs.forEach((blob, i) => {
        const factor = (i + 1) * 12;
        blob.style.transform = `translate(${dx * factor}px, ${dy * factor}px)`;
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const scrollToSection = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative w-full min-h-dvh flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "#050505" }}
    >
      {/* Aurora background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(139,92,246,0.15) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 80% 80%, rgba(6,182,212,0.1) 0%, transparent 60%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 50% 40% at 10% 70%, rgba(236,72,153,0.08) 0%, transparent 60%)",
          }}
        />
      </div>

      {/* Floating blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 1 }}>
        <div className="parallax-blob absolute" style={{ top: "10%", left: "5%", transition: "transform 0.8s ease-out" }}>
          <FloatingBlob color="rgba(139,92,246,1)" size="400px" top="0" left="0" delay={0} duration={8} />
        </div>
        <div className="parallax-blob absolute" style={{ top: "50%", right: "5%", transition: "transform 1s ease-out" }}>
          <FloatingBlob color="rgba(6,182,212,1)" size="350px" top="0" left="0" delay={2} duration={10} />
        </div>
        <div className="parallax-blob absolute" style={{ bottom: "10%", left: "30%", transition: "transform 1.2s ease-out" }}>
          <FloatingBlob color="rgba(236,72,153,1)" size="300px" top="0" left="0" delay={4} duration={9} />
        </div>
      </div>

      {/* Particles */}
      <ParticleCanvas />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          zIndex: 2,
        }}
      />

      {/* Main content */}
      <div
        className="relative container-custom flex flex-col items-center text-center gap-8 pt-24 pb-20"
        style={{ zIndex: 3 }}
      >
        {/* Pre-title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-center gap-3"
        >
          <span className="w-8 h-px bg-gradient-to-r from-purple to-cyan" />
          <span
            className="font-space-grotesk text-xs tracking-[0.3em] font-medium uppercase"
            style={{
              background: "linear-gradient(135deg, #a78bfa, #22d3ee)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Creative Studio
          </span>
          <span className="w-8 h-px bg-gradient-to-r from-cyan to-magenta" />
        </motion.div>

        {/* Main headline */}
        <div className="overflow-visible">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center gap-2"
            style={{ transitionDelay: "0.4s" }}
          >
            {words.map((word, i) => (
              <motion.h1
                key={i}
                variants={wordVariants}
                className="font-space-grotesk font-bold text-white leading-none"
                style={{
                  fontSize: "clamp(3rem, 8vw, 7rem)",
                  letterSpacing: "-0.03em",
                  display: "block",
                }}
              >
                {i === 1 ? (
                  <span
                    style={{
                      background: "linear-gradient(135deg, #a78bfa 0%, #22d3ee 50%, #f472b6 100%)",
                      backgroundSize: "200% 200%",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                      animation: "gradientShift 6s ease infinite",
                    }}
                  >
                    {word}
                  </span>
                ) : (
                  word
                )}
              </motion.h1>
            ))}
          </motion.div>
        </div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="font-inter text-text-secondary max-w-xl text-lg leading-relaxed"
        >
          We craft cinematic visuals, immersive digital experiences, and bold brand identities
          that make your business impossible to ignore.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="flex flex-col sm:flex-row items-center gap-4 mt-2"
        >
          <button
            onClick={() => scrollToSection("#portfolio")}
            className="btn-primary group"
            data-cursor-hover
          >
            <span>View Portfolio</span>
            <ArrowRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </button>
          <button
            onClick={() => scrollToSection("#contact")}
            className="btn-outline group"
            data-cursor-hover
          >
            <Calendar size={16} />
            <span>Book a Free Consultation</span>
          </button>
        </motion.div>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="flex items-center gap-8 mt-6 flex-wrap justify-center"
        >
          {[
            { label: "Premium Quality", icon: "✦" },
            { label: "Fast Delivery", icon: "✦" },
            { label: "Transparent Pricing", icon: "✦" },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-2 text-text-muted text-sm">
              <span
                className="text-xs"
                style={{
                  background: "linear-gradient(135deg, #a78bfa, #22d3ee)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {item.icon}
              </span>
              <span>{item.label}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={() => scrollToSection("#services")}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-text-muted hover:text-white transition-colors group"
        style={{ zIndex: 3 }}
      >
        <span className="font-space-grotesk text-xs tracking-[0.2em] uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={16} />
        </motion.div>
      </motion.button>
    </section>
  );
}
