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

        {/* Horizontal Grid Name & Trait Typing Animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="grid grid-cols-[auto_auto_1fr] md:grid-cols-[1fr_auto_1fr] gap-x-3 md:gap-x-6 items-center max-w-full px-4 mb-10 mx-auto"
        >
          {/* Row 1 */}
          <div className="text-right">
            <span className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-heading font-bold gradient-text leading-[0.95] tracking-tight">
              Sameer
            </span>
          </div>
          <div className="text-center">
            <span className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-heading font-light text-muted/20 leading-[0.95]">
              |
            </span>
          </div>
          <div className="text-left flex items-center min-h-[1.2em]">
            <span className="text-lg sm:text-2xl md:text-4xl lg:text-5xl font-body font-semibold text-accent leading-[0.95] whitespace-nowrap tracking-tight">
              {typedText}
              <span className="inline-block w-[2px] md:w-[3px] h-[0.8em] ml-1 bg-accent animate-[pulse_1s_infinite]" />
            </span>
          </div>

          {/* Row 2 */}
          <div className="text-right mt-2">
            <span className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-heading font-bold text-foreground leading-[0.95] tracking-tight">
              Sahasrabudhe
            </span>
          </div>
          <div className="text-center mt-2">
            <span className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-heading font-light text-muted/20 leading-[0.95] mt-2">
              |
            </span>
          </div>
          <div className="mt-2" />
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
