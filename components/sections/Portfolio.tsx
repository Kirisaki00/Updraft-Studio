"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRouter } from "next/navigation";
import { portfolioCategories, type FolderCategory } from "@/lib/portfolioData";

/* ─────────────────── Particle ─────────────────── */
function Particle({ x, y, color }: { x: number; y: number; color: string }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{ left: x, top: y, backgroundColor: color, width: 3, height: 3 }}
      initial={{ opacity: 0.8, scale: 1 }}
      animate={{ opacity: 0, scale: 0, y: -40, x: (Math.random() - 0.5) * 60 }}
      transition={{ duration: 0.8 + Math.random() * 0.4, ease: "easeOut" }}
    />
  );
}

/* ─────────────────── Folder Card ─────────────────── */
function FolderCard({
  folder,
  index,
  onOpen,
}: {
  folder: FolderCategory;
  index: number;
  onOpen: (folder: FolderCategory) => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [particles, setParticles] = useState<{ id: number; x: number; y: number }[]>([]);
  const particleId = useRef(0);

  /* 3D tilt */
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), { stiffness: 300, damping: 30 });
  const scale = useSpring(hovered ? 1.015 : 1, { stiffness: 300, damping: 30 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
      mouseY.set((e.clientY - rect.top) / rect.height - 0.5);

      /* Spawn occasional particle */
      if (Math.random() > 0.7) {
        const id = particleId.current++;
        setParticles((p) => [
          ...p.slice(-12),
          { id, x: e.clientX - rect.left, y: e.clientY - rect.top },
        ]);
      }
    },
    [mouseX, mouseY]
  );

  const handleMouseLeave = useCallback(() => {
    setHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  /* Preview thumbnail "files" */
  const previewImages = folder.projects.slice(0, 3).map((p) => p.src);

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        ref={cardRef}
        style={{ rotateX, rotateY, scale, transformStyle: "preserve-3d", perspective: 1200 }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleMouseLeave}
        onClick={() => onOpen(folder)}
        className="relative cursor-pointer select-none"
        data-cursor-hover
      >

        {/* ── Main folder body ── */}
        <div
          className="relative rounded-3xl overflow-hidden"
          style={{
            background: `linear-gradient(135deg, rgba(16,16,20,0.9) 0%, rgba(10,10,14,0.95) 100%)`,
            border: `1px solid ${folder.gradientFrom}30`,
            boxShadow: hovered
              ? `0 40px 80px rgba(0,0,0,0.7), 0 0 60px ${folder.accentColor}25, inset 0 1px 0 rgba(255,255,255,0.07)`
              : `0 15px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04)`,
            transition: "box-shadow 0.4s ease",
          }}
        >
          {/* ── Inline tab strip (replaces overflowing absolute tab) ── */}
          <div
            className="flex items-center gap-2 px-7 lg:px-9 py-3"
            style={{
              background: `linear-gradient(90deg, ${folder.gradientFrom}18, transparent)`,
              borderBottom: `1px solid ${folder.gradientFrom}20`,
            }}
          >
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: folder.accentColor }} />
            <span className="text-[10px] font-space-grotesk font-semibold tracking-[0.25em] uppercase" style={{ color: folder.accentColor + "99" }}>
              {folder.label}
            </span>
          </div>
          {/* Animated gradient border overlay */}
          <motion.div
            className="absolute inset-0 rounded-b-3xl rounded-tr-3xl pointer-events-none"
            style={{
              background: `linear-gradient(135deg, ${folder.gradientFrom}20, transparent 40%, ${folder.gradientTo}15)`,
              opacity: hovered ? 1 : 0,
              transition: "opacity 0.4s ease",
            }}
          />

          {/* Animated border glow */}
          <motion.div
            className="absolute inset-0 rounded-b-3xl rounded-tr-3xl pointer-events-none"
            animate={
              hovered
                ? { opacity: 1, boxShadow: `inset 0 0 0 1px ${folder.accentColor}50` }
                : { opacity: 0, boxShadow: "inset 0 0 0 1px transparent" }
            }
            transition={{ duration: 0.3 }}
          />

          {/* Inner content */}
          <div className="relative flex items-center justify-between gap-6 p-7 lg:p-9">
            {/* Left: icon + text */}
            <div className="flex items-center gap-6 lg:gap-8 min-w-0">
              {/* Folder icon orb */}
              <motion.div
                className="relative shrink-0 w-16 h-16 lg:w-20 lg:h-20 rounded-2xl flex items-center justify-center"
                style={{
                  background: `linear-gradient(135deg, ${folder.gradientFrom}30, ${folder.gradientTo}20)`,
                  border: `1px solid ${folder.gradientFrom}40`,
                  boxShadow: hovered ? `0 0 30px ${folder.accentColor}40` : "none",
                  transition: "box-shadow 0.4s ease",
                }}
                animate={hovered ? { scale: 1.08, rotate: -4 } : { scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                <span className="text-3xl lg:text-4xl" role="img">{folder.icon}</span>
                {/* Glint */}
                <div
                  className="absolute top-1.5 right-2 w-1.5 h-1.5 rounded-full bg-white/30"
                  style={{ display: hovered ? "block" : "none" }}
                />
              </motion.div>

              {/* Text */}
              <div className="min-w-0">
                <motion.div
                  className="text-xs font-space-grotesk font-semibold tracking-[0.25em] uppercase mb-2"
                  style={{ color: folder.accentColor }}
                >
                  Creative Category
                </motion.div>
                <h3
                  className="font-space-grotesk font-bold text-white leading-none mb-2 truncate"
                  style={{ fontSize: "clamp(1.4rem, 2.5vw, 2.1rem)", letterSpacing: "-0.03em" }}
                >
                  {folder.label}
                </h3>
                <p className="font-inter text-sm lg:text-base text-white/50 line-clamp-1">
                  {folder.description}
                </p>

                {/* Project count badge */}
                <motion.div
                  className="mt-3 inline-flex items-center gap-2"
                  animate={hovered ? { opacity: 1, y: 0 } : { opacity: 0.5, y: 3 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex gap-1">
                    {Array.from({ length: folder.projects.length }).map((_, i) => (
                      <motion.div
                        key={i}
                        className="h-1 rounded-full"
                        style={{ background: folder.accentColor, width: hovered ? 20 : 8 }}
                        animate={{ width: hovered ? 20 : 8, opacity: hovered ? 1 : 0.3 }}
                        transition={{ duration: 0.3, delay: i * 0.06 }}
                      />
                    ))}
                  </div>
                  <span className="text-xs font-inter text-white/40">
                    {folder.projects.length} {folder.projects.length === 1 ? "Project" : "Projects"}
                  </span>
                </motion.div>
              </div>
            </div>

            {/* Right: preview thumbnails + CTA */}
            <div className="flex items-center gap-4 shrink-0">
              {/* Stacked preview thumbnails */}
              <div className="relative hidden md:flex items-center h-16 lg:h-20">
                {previewImages.map((src, i) => (
                  <motion.div
                    key={i}
                    className="absolute rounded-xl overflow-hidden border border-white/10"
                    style={{
                      width: 60,
                      height: 64,
                      backgroundImage: `url(${src})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      right: 0,
                      zIndex: previewImages.length - i,
                    }}
                    animate={
                      hovered
                        ? { x: -(i * 52) - 8, y: i % 2 === 0 ? -4 : 4, rotate: (i - 1) * 5, scale: 1, opacity: 1 }
                        : { x: -(i * 12), y: 0, rotate: 0, scale: 0.92, opacity: i === 0 ? 0.9 : 0.5 }
                    }
                    transition={{ type: "spring", stiffness: 350, damping: 28, delay: i * 0.05 }}
                  />
                ))}
              </div>

              {/* Open arrow */}
              <motion.div
                className="shrink-0 flex items-center justify-center w-12 h-12 lg:w-14 lg:h-14 rounded-2xl"
                style={{
                  background: hovered
                    ? `linear-gradient(135deg, ${folder.gradientFrom}, ${folder.gradientTo})`
                    : "rgba(255,255,255,0.05)",
                  border: `1px solid ${hovered ? "transparent" : "rgba(255,255,255,0.08)"}`,
                  boxShadow: hovered ? `0 0 30px ${folder.accentColor}50` : "none",
                  transition: "background 0.3s ease, box-shadow 0.3s ease",
                }}
                animate={hovered ? { scale: 1.1, rotate: -5 } : { scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </motion.div>
            </div>
          </div>

          {/* Bottom progress/accent bar */}
          <motion.div
            className="absolute bottom-0 left-0 h-[2px] rounded-b-3xl"
            style={{ background: `linear-gradient(90deg, ${folder.gradientFrom}, ${folder.gradientTo})` }}
            animate={hovered ? { width: "100%", opacity: 1 } : { width: "30%", opacity: 0.3 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />

          {/* Noise texture */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.015] rounded-b-3xl rounded-tr-3xl"
            style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")", backgroundSize: "100px" }}
          />
        </div>

        {/* Particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
          <AnimatePresence>
            {hovered &&
              particles.map((p) => (
                <Particle key={p.id} x={p.x} y={p.y} color={folder.accentColor} />
              ))}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─────────────────── Cinematic Transition Overlay ─────────────────── */
function FolderOpenOverlay({
  folder,
  onDone,
}: {
  folder: FolderCategory;
  onDone: () => void;
}) {
  return (
    <motion.div
      className="fixed inset-0 z-[99999] flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onAnimationComplete={onDone}
    >
      {/* Deep blur backdrop */}
      <motion.div
        className="absolute inset-0"
        style={{ background: `radial-gradient(ellipse at center, ${folder.accentColor}15, #050505 60%)`, backdropFilter: "blur(40px)" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      />

      {/* Expanding circle */}
      <motion.div
        className="absolute rounded-full"
        style={{ background: `linear-gradient(135deg, ${folder.gradientFrom}, ${folder.gradientTo})` }}
        initial={{ width: 0, height: 0, opacity: 0.9 }}
        animate={{ width: "300vmax", height: "300vmax", opacity: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* Category label reveal */}
      <motion.div
        className="relative text-center z-10"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.35, delay: 0.1 }}
      >
        <div className="text-6xl mb-4">{folder.icon}</div>
        <h2
          className="font-space-grotesk font-bold text-white text-4xl lg:text-6xl"
          style={{ letterSpacing: "-0.04em" }}
        >
          {folder.label}
        </h2>
        <motion.div
          className="mt-4 h-0.5 mx-auto rounded-full"
          style={{ background: `linear-gradient(90deg, transparent, ${folder.accentColor}, transparent)` }}
          initial={{ width: 0 }}
          animate={{ width: 200 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        />
      </motion.div>
    </motion.div>
  );
}

/* ─────────────────── Main Portfolio Section ─────────────────── */
export default function Portfolio() {
  const router = useRouter();
  const [openingFolder, setOpeningFolder] = useState<FolderCategory | null>(null);

  const handleFolderOpen = useCallback((folder: FolderCategory) => {
    // Mark that we're navigating away so Back skips the loading screen
    sessionStorage.setItem("updraft_returning", "true");
    // Save scroll position so we can restore it when user presses Back
    sessionStorage.setItem("updraft_scroll", String(window.scrollY));
    setOpeningFolder(folder);
    setTimeout(() => {
      router.push(`/portfolio/${folder.slug}`);
    }, 700);
  }, [router]);

  return (
    <>
      <section
        id="portfolio"
        className="section py-36 lg:py-48"
        style={{ background: "linear-gradient(180deg, #060510 0%, #050505 50%, #060510 100%)" }}
      >
        {/* Ambient background orbs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-[0.06] blur-[120px]"
            style={{ background: "radial-gradient(circle, #8b5cf6, transparent)" }}
          />
          <div
            className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full opacity-[0.06] blur-[120px]"
            style={{ background: "radial-gradient(circle, #06b6d4, transparent)" }}
          />
        </div>

        <div className="container-custom relative z-10">
          {/* Header */}
          <div className="text-center mb-16 lg:mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center justify-center gap-3 mb-6"
            >
              <motion.span
                className="h-px bg-gradient-to-r from-transparent to-purple-500"
                initial={{ width: 0 }}
                whileInView={{ width: 32 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              />
              <span
                className="font-space-grotesk text-xs tracking-[0.35em] uppercase font-medium"
                style={{
                  background: "linear-gradient(135deg, #22d3ee, #f472b6)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Our Work
              </span>
              <motion.span
                className="h-px bg-gradient-to-r from-pink-500 to-transparent"
                initial={{ width: 0 }}
                whileInView={{ width: 32 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              />
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="font-space-grotesk font-bold text-white mb-5"
              style={{ fontSize: "clamp(2.8rem, 6vw, 5rem)", letterSpacing: "-0.04em" }}
            >
              Explore Our{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #a78bfa, #22d3ee, #f472b6)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Portfolio
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-inter text-white/50 max-w-md mx-auto text-base lg:text-lg"
            >
              Choose a creative category and step into our world.
            </motion.p>
          </div>

          {/* Folder cards */}
          <div className="flex flex-col gap-5 lg:gap-6">
            {portfolioCategories.map((folder, i) => (
              <FolderCard
                key={folder.slug}
                folder={folder}
                index={i}
                onOpen={handleFolderOpen}
              />
            ))}
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-16 text-center"
          >
            <p className="font-inter text-white/30 text-sm">
              Each folder opens a dedicated gallery — crafted to showcase our very best work.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Cinematic transition overlay */}
      <AnimatePresence>
        {openingFolder && (
          <FolderOpenOverlay
            folder={openingFolder}
            onDone={() => { }} /* navigation handled by setTimeout */
          />
        )}
      </AnimatePresence>
    </>
  );
}
