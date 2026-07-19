"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TRAITS } from "@/types";
import * as LucideIcons from "lucide-react";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

export default function TraitsWheel() {
  const [ref, isVisible] = useIntersectionObserver<HTMLDivElement>({
    threshold: 0.1,
  });

  // Map icon names to Lucide Icon components
  const IconMap: { [key: string]: React.ComponentType<any> } = {
    Palette: LucideIcons.Palette,
    Film: LucideIcons.Film,
    Box: LucideIcons.Box,
    FlaskConical: LucideIcons.FlaskConical,
    GraduationCap: LucideIcons.GraduationCap,
    PenTool: LucideIcons.PenTool,
    Mic: LucideIcons.Mic,
    Music: LucideIcons.Music,
    Lightbulb: LucideIcons.Lightbulb,
    Brush: LucideIcons.Brush,
  };

  return (
    <section className="py-24 px-6 relative overflow-hidden" ref={ref}>
      {/* Background blueprint lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px)] bg-[size:100px] opacity-[0.02] pointer-events-none" />

      <div className="section-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4 tracking-tight">
            The <span className="gradient-text">10 Traits</span>
          </h2>
          <p className="text-muted font-body max-w-xl mx-auto text-sm md:text-base leading-relaxed">
            A constellation of multidisciplinary talents unified into one creative digital identity
          </p>
        </motion.div>

        {/* Responsive Bento Grid of Traits */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {TRAITS.map((trait, i) => {
            const IconComponent = IconMap[trait.icon] || LucideIcons.HelpCircle;
            return (
              <motion.div
                key={trait.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="relative overflow-hidden glass-card p-6 flex flex-col justify-between h-[210px] rounded-2xl cursor-pointer group transition-all duration-300 hover:shadow-lg hover:shadow-accent/5 hover:border-accent/40 hover:-translate-y-1.5"
              >
                {/* Blueprint grid effect in background */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:20px_20px] opacity-[0.04] group-hover:opacity-[0.08] transition-opacity duration-300" />
                
                {/* Radial glow effect */}
                <div className="absolute -right-20 -top-20 w-40 h-40 rounded-full bg-accent/5 blur-3xl group-hover:bg-accent/15 transition-all duration-300" />

                <div className="relative z-10">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-muted/50 font-semibold tracking-wider">
                      {String(trait.id).padStart(2, "0")}
                    </span>
                    <div className="w-9 h-9 rounded-xl bg-accent/5 border border-accent/10 flex items-center justify-center text-accent group-hover:bg-accent/15 group-hover:border-accent/25 group-hover:scale-110 transition-all duration-300">
                      <IconComponent className="w-4.5 h-4.5" />
                    </div>
                  </div>

                  <h3 className="font-heading font-bold text-lg md:text-xl mt-4 text-foreground group-hover:text-accent transition-colors duration-300">
                    {trait.name}
                  </h3>
                </div>

                <p className="relative z-10 text-xs text-muted leading-relaxed font-body group-hover:text-foreground/90 transition-colors duration-300 mt-2">
                  {trait.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
