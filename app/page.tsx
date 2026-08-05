"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

import LoadingScreen from "@/components/sections/LoadingScreen";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import Portfolio from "@/components/sections/Portfolio";
import About from "@/components/sections/About";
import Process from "@/components/sections/Process";
import WhyUs from "@/components/sections/WhyUs";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/layout/Footer";

import ScrollProgressBar from "@/components/ui/ScrollProgressBar";

export default function Home() {
  // On a real reload → loaded = false → show the animation.
  // When returning from a portfolio page → loaded = true → skip it.
  // We detect the return visit via a flag set just before navigating away.
  const [loaded, setLoaded] = useState(() => {
    if (typeof window !== "undefined") {
      const returning = sessionStorage.getItem("updraft_returning") === "true";
      if (returning) {
        // Clear it immediately so the next real reload shows the screen again
        sessionStorage.removeItem("updraft_returning");
      }
      return returning;
    }
    return false;
  });

  const handleLoadComplete = () => {
    setLoaded(true);
  };

  // Restore scroll position when returning from a portfolio category page
  useEffect(() => {
    if (loaded) {
      const savedScroll = sessionStorage.getItem("updraft_scroll");
      if (savedScroll) {
        sessionStorage.removeItem("updraft_scroll");
        // Small delay to let the page paint first
        requestAnimationFrame(() => {
          window.scrollTo({ top: parseInt(savedScroll), behavior: "instant" });
        });
      }
    }
  }, [loaded]);

  return (
    <main className="relative">
      <ScrollProgressBar />

      <AnimatePresence mode="wait">
        {!loaded && (
          <LoadingScreen onComplete={handleLoadComplete} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {loaded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <Navbar />
            <Hero />
            <Services />
            <Portfolio />
            <About />
            <Process />
            <WhyUs />
            <Contact />

            {/* ── Premium section divider: Contact → Footer ── */}
            <div className="relative h-[1px] overflow-visible" aria-hidden="true">
              {/* Animated glowing line */}
              <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                whileInView={{ scaleX: 1, opacity: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 origin-left"
                style={{
                  background:
                    "linear-gradient(90deg, transparent 0%, #8b5cf6 25%, #06b6d4 50%, #ec4899 75%, transparent 100%)",
                }}
              />
              {/* Animated aurora bloom below the line */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 1.6, delay: 0.3, ease: "easeOut" }}
                className="absolute left-1/2 -translate-x-1/2 -top-16 w-[60vw] max-w-2xl h-32 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(ellipse at 50% 100%, rgba(139,92,246,0.18) 0%, rgba(6,182,212,0.10) 40%, transparent 70%)",
                  filter: "blur(24px)",
                }}
              />
              {/* Animated moving shimmer */}
              <motion.div
                animate={{ x: ["0%", "100%", "0%"] }}
                transition={{ duration: 6, ease: "easeInOut", repeat: Infinity }}
                className="absolute top-0 w-1/4 h-[1px] pointer-events-none"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)",
                  filter: "blur(1px)",
                }}
              />
            </div>

            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
