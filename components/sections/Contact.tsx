"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import emailjs from "@emailjs/browser";
import {
  Mail,
  Phone,
  MessageCircle,
  Send,
  CheckCircle,
} from "lucide-react";

// Instagram inline SVG (removed from this version of lucide-react)
const InstagramIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
);

type FormData = {
  name: string;
  email: string;
  service: string;
  message: string;
};

const contactMethods = [
  {
    icon: Mail,
    label: "Email Us",
    value: "updraftmedia.co@gmail.com",
    href: "mailto:updraftmedia.co@gmail.com",
    color: "#8b5cf6",
    description: "For inquiries and project briefs",
  },
  {
    icon: Phone,
    label: "Call Us",
    value: "+91 8299892539",
    href: "tel:+918299892539",
    color: "#06b6d4",
    description: "Mon – Fri, 9am to 6pm",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "Chat with us",
    href: "https://wa.me/918299892539",
    color: "#22c55e",
    description: "Quick questions, fast replies",
  },
  {
    icon: InstagramIcon,
    label: "Instagram",
    value: "@updraftmedia.co",
    href: "https://instagram.com/updraftmedia.co",
    color: "#ec4899",
    description: "Follow our latest work",
  },
];

function ContactCard({ method }: { method: (typeof contactMethods)[0] }) {
  const Icon = method.icon;
  return (
    <motion.a
      href={method.href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -4 }}
      className="glass-light rounded-2xl p-6 flex items-start gap-4 group transition-all duration-300"
      style={{ border: `1px solid ${method.color}15` }}
      data-cursor-hover
    >
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform"
        style={{ background: `${method.color}18`, border: `1px solid ${method.color}30` }}
      >
        <Icon size={20} style={{ color: method.color }} />
      </div>
      <div>
        <p className="font-inter text-text-muted text-xs mb-1">{method.label}</p>
        <p className="font-space-grotesk font-semibold text-white text-sm mb-0.5 whitespace-pre-line">{method.value}</p>
        <p className="font-inter text-text-muted text-xs">{method.description}</p>
      </div>
    </motion.a>
  );
}

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setLoading(true);

    try {
      await emailjs.send(
        "service_tgd42oy",
        "template_i5ps81m",
        {
          name: data.name,
          email: data.email,
          title: data.service,
          message: data.message,
        },
        "U8svgwWQyKDF1geML"
      );
      setSubmitted(true);
    } catch (error) {
      const err = error as { text?: string; message?: string };
      const errorMsg = err?.text || err?.message || "Unknown error";
      alert(`Failed to send: ${errorMsg}\n\nPlease check your EmailJS Service ID, Template ID, and Public Key.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className="section pt-36 pb-48 lg:pt-48 lg:pb-60 relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, #060510 0%, #050505 100%)" }}
    >
      {/* Background aurora */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 100%, rgba(139,92,246,0.12) 0%, transparent 60%)",
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
              Get In Touch
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
            Let's Work{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #a78bfa, #22d3ee, #f472b6)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Together
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-inter text-text-secondary max-w-lg mx-auto"
          >
            Ready to build something remarkable? Tell us about your project and we'll get back to you within 24 hours.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: contact cards + Calendly CTA */}
          <div className="flex flex-col gap-5">
            {/* Contact methods */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {contactMethods.map((m) => (
                <ContactCard key={m.label} method={m} />
              ))}
            </div>

          </div>

          {/* Right: contact form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="glass rounded-3xl px-10 py-9 relative overflow-hidden"
          >
            {/* Subtle top glow */}
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px"
              style={{
                background: "linear-gradient(90deg, transparent, rgba(139,92,246,0.5), transparent)",
              }}
            />

            {submitted ? (
              <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", damping: 15 }}
                >
                  <CheckCircle size={56} style={{ color: "#22c55e" }} />
                </motion.div>
                <h3 className="font-space-grotesk text-2xl font-bold text-white">
                  Message Sent!
                </h3>
                <p className="font-inter text-text-secondary max-w-xs">
                  Thanks for reaching out. We'll get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
                <h3 className="font-space-grotesk text-xl font-bold text-white text-center mb-2">
                  Send us a message
                </h3>

                {/* Name */}
                <div>
                  <input
                    {...register("name", { required: "Name is required" })}
                    placeholder="Your Name"
                    className="form-input"
                  />
                  {errors.name && (
                    <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <input
                    {...register("email", {
                      required: "Email is required",
                      pattern: { value: /^\S+@\S+$/i, message: "Invalid email" },
                    })}
                    placeholder="your@email.com"
                    type="email"
                    className="form-input"
                  />
                  {errors.email && (
                    <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>
                  )}
                </div>

                {/* Service */}
                <div>
                  <select
                    {...register("service", { required: "Please select a service" })}
                    className="form-input"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select a Service
                    </option>
                    {[
                      "Videography",
                      "Video Editing",
                      "Photography",
                      "Photo Editing",
                      "Web Design",
                      "Graphic Design",
                      "Brand Identity",
                      "Social Media Content",
                      "Motion Graphics",
                      "Full Package",
                    ].map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                  {errors.service && (
                    <p className="text-red-400 text-xs mt-1">{errors.service.message}</p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <textarea
                    {...register("message", { required: "Message is required" })}
                    placeholder="Tell us about your project..."
                    rows={5}
                    className="form-input"
                  />
                  {errors.message && (
                    <p className="text-red-400 text-xs mt-1">{errors.message.message}</p>
                  )}
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary justify-center w-full py-4"
                  data-cursor-hover
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <svg
                        className="animate-spin h-4 w-4"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                        />
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      Send Message
                      <Send size={16} />
                    </span>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
