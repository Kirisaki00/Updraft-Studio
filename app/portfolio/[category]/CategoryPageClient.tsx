"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, X, ChevronLeft, ChevronRight, Monitor, Layers, Camera } from "lucide-react";
import { portfolioCategories, type FolderCategory, type ProjectItem } from "@/lib/portfolioData";

/* ─────────────── Project Modal ─────────────────── */
function ProjectModal({
  project,
  category,
  onClose,
  onPrev,
  onNext,
}: {
  project: ProjectItem;
  category: FolderCategory;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, onPrev, onNext]);

  return (
    <motion.div
      className="fixed inset-0 z-[99999] flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/95 backdrop-blur-2xl" />

      {/* Modal */}
      <motion.div
        className="relative z-10 w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-3xl"
        style={{
          background: "rgba(10,10,14,0.98)",
          border: `1px solid ${category.accentColor}30`,
          boxShadow: `0 40px 120px rgba(0,0,0,0.8), 0 0 60px ${category.accentColor}15`,
        }}
        initial={{ scale: 0.88, y: 40, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.92, y: 20, opacity: 0 }}
        transition={{ type: "spring", stiffness: 280, damping: 28 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Preview */}
        <div className="relative w-full overflow-hidden rounded-t-3xl" style={{ aspectRatio: "16/9" }}>
          <Image
            src={project.src}
            alt={project.title}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 80vw"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0" style={{ background: "linear-gradient(0deg, rgba(10,10,14,1) 0%, transparent 50%)" }} />

          {/* Accent bar */}
          <div
            className="absolute bottom-0 left-0 right-0 h-0.5"
            style={{ background: `linear-gradient(90deg, ${category.gradientFrom}, ${category.gradientTo})` }}
          />
        </div>

        {/* Content */}
        <div className="p-8 lg:p-10">
          <div className="flex items-start justify-between gap-6 mb-8">
            <div>
              <span
                className="text-xs font-space-grotesk font-semibold tracking-[0.25em] uppercase"
                style={{ color: category.accentColor }}
              >
                {project.category}
              </span>
              <h2 className="font-space-grotesk font-bold text-white mt-2 mb-3" style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)", letterSpacing: "-0.03em" }}>
                {project.title}
              </h2>
              <p className="font-inter text-white/50 text-base max-w-xl">{project.description}</p>
            </div>

            {/* Nav */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={onPrev}
                className="w-10 h-10 rounded-xl flex items-center justify-center text-white/60 hover:text-white transition-colors"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={onNext}
                className="w-10 h-10 rounded-xl flex items-center justify-center text-white/60 hover:text-white transition-colors"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          {/* Meta grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { icon: Monitor, label: "Software", items: project.software },
              { icon: Layers, label: "Services", items: project.services },
              { icon: Camera, label: "Category", items: [project.category] },
            ].map(({ icon: Icon, label, items }) => (
              <div
                key={label}
                className="rounded-2xl p-5"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <Icon size={14} style={{ color: category.accentColor }} />
                  <span className="text-xs font-space-grotesk tracking-widest uppercase text-white/30">{label}</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {items.map((item) => (
                    <span
                      key={item}
                      className="text-xs font-inter px-2.5 py-1 rounded-full text-white/70"
                      style={{ background: `${category.accentColor}15`, border: `1px solid ${category.accentColor}30` }}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-20 w-11 h-11 rounded-2xl flex items-center justify-center text-white/70 hover:text-white transition-colors"
        style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", backdropFilter: "blur(12px)" }}
      >
        <X size={18} />
      </button>
    </motion.div>
  );
}

/* ─────────────── Masonry Project Card ─────────────── */
function ProjectCard({
  project,
  category,
  onClick,
}: {
  project: ProjectItem;
  category: FolderCategory;
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="masonry-item"
    >
      <div
        className="relative rounded-2xl overflow-hidden cursor-pointer group"
        style={{
          transform: hovered ? "translateY(-6px)" : "translateY(0)",
          transition: "transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
          boxShadow: hovered ? `0 30px 60px rgba(0,0,0,0.6), 0 0 30px ${category.accentColor}20` : "0 10px 30px rgba(0,0,0,0.3)",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={onClick}
      >
        <div
          className="relative overflow-hidden"
          style={{ aspectRatio: project.tall ? "3/4" : project.wide ? "16/9" : "4/3" }}
        >
          <Image
            src={project.src}
            alt={project.title}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            style={{ transform: hovered ? "scale(1.07)" : "scale(1)", transition: "transform 0.7s ease" }}
          />

          {/* Hover overlay */}
          <div
            className="absolute inset-0 transition-opacity duration-400"
            style={{
              background: `linear-gradient(0deg, rgba(5,5,5,0.92) 0%, rgba(5,5,5,0.4) 50%, rgba(5,5,5,0.1) 100%)`,
              opacity: hovered ? 1 : 0,
            }}
          />

          {/* Accent glow top edge */}
          <motion.div
            className="absolute top-0 left-0 right-0 h-0.5"
            style={{ background: `linear-gradient(90deg, ${category.gradientFrom}, ${category.gradientTo})` }}
            animate={{ opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />

          {/* Info on hover */}
          <div
            className="absolute bottom-0 left-0 right-0 p-5 transition-all duration-400"
            style={{ transform: hovered ? "translateY(0)" : "translateY(12px)", opacity: hovered ? 1 : 0 }}
          >
            <span
              className="text-xs font-space-grotesk font-semibold tracking-[0.2em] uppercase mb-1 block"
              style={{ color: category.accentColor }}
            >
              {project.category}
            </span>
            <h3 className="font-space-grotesk font-bold text-white text-lg leading-tight">
              {project.title}
            </h3>
            <div className="mt-2 flex flex-wrap gap-1">
              {project.software.slice(0, 2).map((s) => (
                <span
                  key={s}
                  className="text-[10px] font-inter px-2 py-0.5 rounded-full text-white/60"
                  style={{ background: "rgba(255,255,255,0.08)" }}
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ─────────────── Category Page Client ─────────────── */
export default function CategoryPageClient({ category }: { category: FolderCategory }) {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState("All");
  const [modalIndex, setModalIndex] = useState<number | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const filters = ["All", ...Array.from(new Set(category.projects.map((p) => p.category)))];

  const filtered = category.projects.filter(
    (p) => activeFilter === "All" || p.category === activeFilter
  );

  const openModal = useCallback((i: number) => setModalIndex(i), []);
  const closeModal = useCallback(() => setModalIndex(null), []);
  const prevModal = useCallback(() => setModalIndex((i) => (i !== null ? (i - 1 + filtered.length) % filtered.length : null)), [filtered.length]);
  const nextModal = useCallback(() => setModalIndex((i) => (i !== null ? (i + 1) % filtered.length : null)), [filtered.length]);

  const otherCategories = portfolioCategories.filter((c) => c.slug !== category.slug);

  return (
    <>
      <div className="min-h-screen" style={{ background: "#050505" }}>

        {/* ── Navbar strip ── */}
        <div
          className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 lg:px-12 py-4"
          style={{ background: "rgba(5,5,5,0.85)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,0.04)" }}
        >
          {/* Back button — uses browser history, no full reload */}
          <motion.button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-white/60 hover:text-white transition-colors group"
            whileHover={{ x: -3 }}
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            <span className="font-inter text-sm">Back</span>
          </motion.button>

          {/* Breadcrumb */}
          <div className="hidden md:flex items-center gap-2 text-sm font-inter text-white/30">
            <span>Updraft</span>
            <span>/</span>
            <span>Portfolio</span>
            <span>/</span>
            <span style={{ color: category.accentColor }}>{category.label}</span>
          </div>

          {/* Logo pill */}
          <div
            className="px-4 py-1.5 rounded-full text-xs font-space-grotesk font-semibold tracking-widest uppercase"
            style={{ background: `${category.accentColor}15`, border: `1px solid ${category.accentColor}30`, color: category.accentColor }}
          >
            {category.icon} {category.label}
          </div>
        </div>

        {/* ── Hero ── */}
        <div ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
          {/* Animated background */}
          <motion.div className="absolute inset-0" style={{ y: heroY }}>
            <div
              className="absolute inset-0"
              style={{
                background: `radial-gradient(ellipse 80% 60% at 50% 50%, ${category.accentColor}18, transparent 70%), radial-gradient(ellipse 40% 40% at 20% 80%, ${category.gradientTo}10, transparent)`,
              }}
            />
            {/* Animated grid */}
            <div
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
                backgroundSize: "80px 80px",
              }}
            />
          </motion.div>

          {/* Content */}
          <motion.div className="relative text-center z-10 px-6" style={{ opacity: heroOpacity }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
              className="text-7xl lg:text-8xl mb-6"
            >
              {category.icon}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center justify-center gap-3 mb-5"
            >
              <span className="h-px w-8 bg-gradient-to-r from-transparent" style={{ background: `linear-gradient(90deg, transparent, ${category.accentColor})` }} />
              <span className="text-xs font-space-grotesk tracking-[0.3em] uppercase" style={{ color: category.accentColor }}>
                Creative Portfolio
              </span>
              <span className="h-px w-8" style={{ background: `linear-gradient(90deg, ${category.accentColor}, transparent)` }} />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="font-space-grotesk font-bold text-white mb-6"
              style={{ fontSize: "clamp(3rem, 8vw, 7rem)", letterSpacing: "-0.04em" }}
            >
              {category.label}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="font-inter text-white/50 max-w-xl mx-auto text-base lg:text-lg"
            >
              {category.longDescription}
            </motion.p>

            {/* Scroll cue */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-12 flex flex-col items-center gap-2"
            >
              <span className="text-xs font-inter tracking-widest uppercase text-white/20">Scroll to explore</span>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="w-5 h-8 rounded-full flex items-start justify-center pt-1.5"
                style={{ border: "1px solid rgba(255,255,255,0.15)" }}
              >
                <div className="w-1 h-2 rounded-full bg-white/40" />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* ── Gallery section ── */}
        <div className="relative z-10 py-24" style={{ background: "linear-gradient(180deg, #050505 0%, #060510 100%)" }}>
          <div className="container-custom">

            {/* Filter bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-wrap justify-center gap-2 mb-14"
            >
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className="relative px-5 py-2 rounded-full font-space-grotesk font-medium text-sm transition-all duration-300"
                  style={{
                    background: activeFilter === filter
                      ? `linear-gradient(135deg, ${category.gradientFrom}, ${category.gradientTo})`
                      : "rgba(255,255,255,0.04)",
                    color: activeFilter === filter ? "white" : "rgba(255,255,255,0.4)",
                    border: `1px solid ${activeFilter === filter ? "transparent" : "rgba(255,255,255,0.08)"}`,
                    boxShadow: activeFilter === filter ? `0 0 20px ${category.accentColor}30` : "none",
                  }}
                >
                  {filter}
                  {activeFilter === filter && (
                    <motion.span
                      layoutId="activeFilter"
                      className="absolute inset-0 rounded-full"
                      style={{ background: `linear-gradient(135deg, ${category.gradientFrom}, ${category.gradientTo})` }}
                      transition={{ type: "spring", stiffness: 400, damping: 35 }}
                    />
                  )}
                  <span className="relative z-10">{filter}</span>
                </button>
              ))}
            </motion.div>

            {/* Masonry grid */}
            <motion.div layout className="masonry-grid">
              <AnimatePresence mode="popLayout">
                {filtered.map((project, i) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    category={category}
                    onClick={() => openModal(i)}
                  />
                ))}
              </AnimatePresence>
            </motion.div>

            {filtered.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-24 text-white/20 font-inter"
              >
                No projects yet in this category. More coming soon.
              </motion.div>
            )}
          </div>
        </div>

        {/* ── Explore Other Categories ── */}
        <div className="py-24" style={{ background: "#050505", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
          <div className="container-custom">
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-space-grotesk font-bold text-white mb-10 text-2xl lg:text-3xl text-center"
              style={{ letterSpacing: "-0.03em" }}
            >
              Explore Other Categories
            </motion.h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {otherCategories.map((cat, i) => (
                <motion.div
                  key={cat.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                >
                  <Link href={`/portfolio/${cat.slug}`}>
                    <motion.div
                      className="relative rounded-2xl p-6 cursor-pointer overflow-hidden group"
                      style={{
                        background: "rgba(255,255,255,0.03)",
                        border: "1px solid rgba(255,255,255,0.06)",
                      }}
                      whileHover={{ y: -4, borderColor: `${cat.accentColor}40`, boxShadow: `0 20px 40px rgba(0,0,0,0.4), 0 0 30px ${cat.accentColor}15` }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    >
                      <div className="text-3xl mb-3">{cat.icon}</div>
                      <h4 className="font-space-grotesk font-bold text-white text-lg mb-1" style={{ letterSpacing: "-0.02em" }}>
                        {cat.label}
                      </h4>
                      <p className="font-inter text-white/30 text-xs">{cat.projects.length} Projects</p>

                      {/* Hover accent */}
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 h-0.5"
                        style={{ background: `linear-gradient(90deg, ${cat.gradientFrom}, ${cat.gradientTo})` }}
                        initial={{ scaleX: 0 }}
                        whileHover={{ scaleX: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    </motion.div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Back to home CTA ── */}
        <div className="py-16 text-center" style={{ background: "#050505" }}>
          <motion.button
            onClick={() => router.back()}
            className="btn-primary"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            <ArrowLeft size={16} />
            Back to Updraft
          </motion.button>
        </div>
      </div>

      {/* ── Modal ── */}
      <AnimatePresence>
        {modalIndex !== null && filtered[modalIndex] && (
          <ProjectModal
            project={filtered[modalIndex]}
            category={category}
            onClose={closeModal}
            onPrev={prevModal}
            onNext={nextModal}
          />
        )}
      </AnimatePresence>
    </>
  );
}
