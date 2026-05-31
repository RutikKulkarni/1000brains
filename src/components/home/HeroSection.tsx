"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { TRAITS } from "@/types";
import { ArrowDown } from "lucide-react";

export default function HeroSection() {
  const [activeTraitIndex, setActiveTraitIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTraitIndex((prev) => (prev + 1) % TRAITS.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen px-6 text-center overflow-hidden">
      {/* Animated Background Circles */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {[500, 400, 300, 200].map((size, i) => (
          <motion.div
            key={size}
            className="absolute rounded-full border"
            style={{
              width: size,
              height: size,
              borderColor: i % 2 === 0 ? "var(--card-border)" : "rgba(196,115,68,0.12)",
            }}
            animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
            transition={{ duration: 60 + i * 20, repeat: Infinity, ease: "linear" }}
          />
        ))}
        {/* Glowing center dot */}
        <motion.div
          className="absolute w-3 h-3 rounded-full bg-accent"
          animate={{ scale: [1, 1.5, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10"
      >
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-muted text-xs sm:text-sm tracking-[0.3em] uppercase mb-6 font-body"
        >
          Professor of Practice in Design · IIT Gandhinagar
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-heading font-bold mb-6 leading-[0.95]"
        >
          <span className="gradient-text">Sameer</span>
          <br />
          <span className="text-foreground">Sahasrabudhe</span>
        </motion.h1>

        {/* Animated trait cycling */}
        <div className="h-10 flex items-center justify-center mb-8 overflow-hidden">
          <motion.p
            key={activeTraitIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="text-lg md:text-xl text-accent font-body font-medium"
          >
            {TRAITS[activeTraitIndex].name}
          </motion.p>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-base md:text-lg text-muted max-w-xl mx-auto mb-10 font-body leading-relaxed"
        >
          10 traits · 1 digital identity · 100,000+ learners worldwide
        </motion.p>

        {/* Trait pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="flex flex-wrap justify-center gap-2.5 max-w-3xl mx-auto"
        >
          {TRAITS.map((trait, i) => (
            <motion.span
              key={trait.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.1 + i * 0.06 }}
              className={`px-4 py-2 text-sm font-body rounded-full border backdrop-blur-sm cursor-default transition-all duration-300 ${
                i === activeTraitIndex
                  ? "bg-accent text-white border-accent shadow-lg shadow-accent/20"
                  : "border-[var(--card-border)] bg-[var(--card-bg)] text-primary hover:border-accent/40 hover:text-accent"
              }`}
            >
              {trait.name}
            </motion.span>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-8 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 text-muted/50"
        >
          <span className="text-xs font-body tracking-wider uppercase">Scroll</span>
          <ArrowDown className="w-4 h-4" />
        </motion.div>
      </motion.div>
    </section>
  );
}
