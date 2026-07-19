"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { TRAITS } from "@/types";
import { ArrowDown } from "lucide-react";

export default function HeroSection() {
  const [typedText, setTypedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  const activeTraitIndex = loopNum % TRAITS.length;

  useEffect(() => {
    const fullText = TRAITS[activeTraitIndex].name;

    const handleType = () => {
      setTypedText(
        isDeleting
          ? fullText.substring(0, typedText.length - 1)
          : fullText.substring(0, typedText.length + 1)
      );

      if (!isDeleting && typedText === fullText) {
        setTimeout(() => setIsDeleting(true), 1500);
      } else if (isDeleting && typedText === "") {
        setIsDeleting(false);
        setLoopNum((prev) => prev + 1);
        setTypingSpeed(150);
      }
    };

    const timer = setTimeout(
      handleType,
      isDeleting ? 50 : typingSpeed
    );
    return () => clearTimeout(timer);
  }, [typedText, isDeleting, activeTraitIndex, typingSpeed]);

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
        className="relative z-10 w-full max-w-4xl flex flex-col items-center"
      >
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-muted text-xs sm:text-sm tracking-[0.3em] uppercase mb-8 font-body"
        >
          Professor of Practice in Design · IIT Gandhinagar
        </motion.p>

        {/* Mobile Layout (centered stacked, hidden on desktop/tablet) */}
        <div className="flex md:hidden flex-col items-center text-center px-4 mb-10 mx-auto font-heading font-bold">
          <div className="text-3xl sm:text-5xl leading-[0.95] text-foreground">
            <div className="gradient-text">Sameer</div>
            <div className="mt-2">Sahasrabudhe</div>
          </div>
          <div className="w-[2px] h-8 bg-muted/20 my-4" />
          <div className="text-2xl sm:text-4xl text-accent font-semibold leading-[0.95] min-h-[1.2em] flex items-center justify-center">
            <span>
              {typedText}
              <span className="inline-block w-[3px] h-[0.8em] ml-2 bg-accent animate-[pulse_1s_infinite] align-middle" />
            </span>
          </div>
        </div>

        {/* Desktop/Tablet Layout (centered horizontal divider, hidden on mobile) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          style={{ gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)" }}
          className="hidden md:grid w-full max-w-7xl px-4 mb-10 mx-auto font-heading font-bold"
        >
          {/* Left Column: Stacked right-aligned names with continuous right border */}
          <div className="text-right pr-6 md:pr-10 border-r-2 border-[var(--border)] flex flex-col items-end justify-center leading-[0.95] text-5xl lg:text-7xl xl:text-8xl">
            <span className="gradient-text">Sameer</span>
            <span className="text-foreground mt-3 md:mt-4">Sahasrabudhe</span>
          </div>

          {/* Right Column: Vertically centered typing traits with slightly smaller, balanced responsive font size to prevent overflow */}
          <div className="text-left pl-6 md:pl-10 flex items-center justify-start leading-[0.95] text-accent font-semibold text-4xl lg:text-6xl xl:text-7xl">
            <span className="whitespace-nowrap">
              {typedText}
              <span className="inline-block w-[3px] md:w-[5px] h-[0.8em] ml-2 bg-accent animate-[pulse_1s_infinite] align-middle" />
            </span>
          </div>
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
