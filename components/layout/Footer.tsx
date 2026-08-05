"use client";

import { motion } from "framer-motion";
import { Mail, ExternalLink } from "lucide-react";
import Image from "next/image";

// Inline SVG brand icons
const InstagramIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <circle cx="12" cy="12" r="4"/>
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
  </svg>
);
const YoutubeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="currentColor" stroke="none"/>
  </svg>
);
const LinkedinIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect x="2" y="9" width="4" height="12"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

const quickLinks = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "About", href: "#about" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#contact" },
];

const services = [
  "Videography",
  "Photography",
  "Web Design",
  "Brand Identity",
  "Motion Graphics",
  "Social Media",
];

const socials = [
  { icon: InstagramIcon, href: "https://instagram.com/updraftmedia.co", label: "Instagram" },
  { icon: YoutubeIcon, href: "https://youtube.com/@updraft", label: "YouTube" },
  { icon: LinkedinIcon, href: "https://linkedin.com/company/updraft", label: "LinkedIn" },
  { icon: Mail, href: "mailto:updraftmedia.co@gmail.com", label: "Email" },
];

export default function Footer() {
  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer
      className="relative overflow-hidden pt-2"
      style={{ background: "#050505" }}
    >
      {/* Gradient divider */}
      <div
        className="relative h-px w-full"
        style={{
          background: "linear-gradient(90deg, transparent, #8b5cf6, #06b6d4, #ec4899, transparent)",
        }}
      />
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-24 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 50% 0%, rgba(139,92,246,0.15), transparent 70%)",
        }}
      />

      <div className="container-custom py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand column */}
          <div className="lg:col-span-1 flex flex-col gap-6">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="relative w-9 h-9 rounded-full overflow-hidden border border-white/20 shadow-[0_0_15px_rgba(139,92,246,0.3)]">
                <Image src="/Logo.jpeg" alt="Updraft Logo" fill className="object-cover" />
              </div>
              <span
                className="font-space-grotesk font-bold text-xl tracking-wider uppercase"
                style={{
                  background: "linear-gradient(135deg, #a78bfa, #22d3ee)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Updraft
              </span>
            </div>

            <p className="font-inter text-text-muted text-sm leading-relaxed">
              A premium creative agency crafting cinematic visuals, immersive experiences, and bold brand identities.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-3">
              {socials.map((social) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -3, scale: 1.1 }}
                    className="w-10 h-10 rounded-xl glass-light flex items-center justify-center text-text-secondary hover:text-white transition-colors"
                    aria-label={social.label}
                    data-cursor-hover
                  >
                    <Icon size={16} />
                  </motion.a>
                );
              })}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-space-grotesk font-semibold text-white text-sm mb-5 tracking-wide">
              Quick Links
            </h4>
            <ul className="flex flex-col gap-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="font-inter text-text-muted text-sm hover:text-white transition-colors duration-200 text-left flex items-center gap-1 group"
                  >
                    <span className="w-0 group-hover:w-3 h-px bg-purple transition-all duration-200 inline-block" />
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-space-grotesk font-semibold text-white text-sm mb-5 tracking-wide">
              Services
            </h4>
            <ul className="flex flex-col gap-3">
              {services.map((s) => (
                <li key={s}>
                  <button
                    onClick={() => scrollTo("#services")}
                    className="font-inter text-text-muted text-sm hover:text-white transition-colors duration-200 text-left flex items-center gap-1 group"
                  >
                    <span className="w-0 group-hover:w-3 h-px bg-cyan transition-all duration-200 inline-block" />
                    {s}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-space-grotesk font-semibold text-white text-sm mb-5 tracking-wide">
              Contact
            </h4>
            <div className="flex flex-col gap-4">
              {[
                { label: "Email", value: "updraftmedia.co@gmail.com", href: "mailto:updraftmedia.co@gmail.com" },
                { label: "Phone", value: "+91 8299892539", href: "tel:+918299892539" },
                { label: "Instagram", value: "@updraftmedia.co", href: "https://instagram.com/updraftmedia.co" },
              ].map((item) => (
                <div key={item.label}>
                  <p className="font-inter text-text-muted text-xs mb-0.5">{item.label}</p>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-inter text-text-secondary text-sm hover:text-white transition-colors flex items-center gap-1 group"
                  >
                    {item.value}
                    <ExternalLink
                      size={12}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                  </a>
                </div>
              ))}

              <motion.a
                href="#contact"
                onClick={(e) => { e.preventDefault(); scrollTo("#contact"); }}
                whileHover={{ scale: 1.02 }}
                className="mt-2 btn-primary text-sm py-2.5 px-5 inline-flex"
                data-cursor-hover
              >
                Book a Call
              </motion.a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-16 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-t"
          style={{ borderColor: "rgba(255,255,255,0.05)" }}
        >
          <p className="font-inter text-text-muted text-xs">
            © {new Date().getFullYear()} Updraft. All rights reserved.
          </p>
          <p className="font-inter text-text-muted text-xs">
            Crafted with passion by{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #a78bfa, #22d3ee)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Kirisaki
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
