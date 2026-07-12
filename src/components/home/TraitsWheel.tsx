"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TRAITS } from "@/types";
import * as LucideIcons from "lucide-react";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

export default function TraitsWheel() {
  const [activeTrait, setActiveTrait] = useState<number | null>(null);
  const [ref, isVisible] = useIntersectionObserver<HTMLDivElement>({
    threshold: 0.2,
  });

  const radius = 200;
  const centerX = 250;
  const centerY = 250;

  return (
    <section className="py-24 px-6" ref={ref}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-3">
            The <span className="gradient-text">10 Traits</span>
          </h2>
          <p className="text-muted font-body max-w-lg mx-auto">
            A constellation of multidisciplinary talents unified into one creative identity
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-12">
          {/* SVG Constellation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isVisible ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden md:block relative"
          >
            <svg
              width={500}
              height={500}
              viewBox="0 0 500 500"
              className="overflow-visible"
            >
              {/* Outer ring */}
              <circle
                cx={centerX}
                cy={centerY}
                r={radius + 30}
                fill="none"
                stroke="var(--card-border)"
                strokeWidth="1"
                strokeDasharray="4 6"
              />
              <circle
                cx={centerX}
                cy={centerY}
                r={radius - 20}
                fill="none"
                stroke="var(--card-border)"
                strokeWidth="0.5"
              />

              {/* Connection lines to center */}
              {TRAITS.map((_, i) => {
                const angle = (i * 360) / TRAITS.length - 90;
                const rad = (angle * Math.PI) / 180;
                const x = centerX + radius * Math.cos(rad);
                const y = centerY + radius * Math.sin(rad);
                return (
                  <motion.line
                    key={`line-${i}`}
                    x1={centerX}
                    y1={centerY}
                    x2={x}
                    y2={y}
                    stroke={activeTrait === i ? "var(--accent)" : "var(--card-border)"}
                    strokeWidth={activeTrait === i ? 1.5 : 0.5}
                    initial={{ pathLength: 0 }}
                    animate={isVisible ? { pathLength: 1 } : {}}
                    transition={{ duration: 0.8, delay: 0.3 + i * 0.08 }}
                  />
                );
              })}

              {/* Center brain icon */}
              <circle
                cx={centerX}
                cy={centerY}
                r={28}
                fill="var(--surface)"
                stroke="var(--accent)"
                strokeWidth="2"
              />
              <text
                x={centerX}
                y={centerY + 5}
                textAnchor="middle"
                className="text-xs font-heading font-bold fill-accent"
              >
                1000
              </text>

              {/* Trait nodes */}
              {TRAITS.map((trait, i) => {
                const angle = (i * 360) / TRAITS.length - 90;
                const rad = (angle * Math.PI) / 180;
                const x = centerX + radius * Math.cos(rad);
                const y = centerY + radius * Math.sin(rad);
                const isActive = activeTrait === i;

                return (
                  <g
                    key={trait.id}
                    onMouseEnter={() => setActiveTrait(i)}
                    onMouseLeave={() => setActiveTrait(null)}
                    className="cursor-pointer"
                  >
                    <motion.circle
                      cx={x}
                      cy={y}
                      r={isActive ? 32 : 26}
                      fill={isActive ? "var(--accent)" : "var(--surface)"}
                      stroke={isActive ? "var(--accent)" : "var(--card-border)"}
                      strokeWidth={isActive ? 2 : 1}
                      initial={{ scale: 0 }}
                      animate={isVisible ? { scale: 1 } : {}}
                      transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 15,
                        delay: 0.4 + i * 0.08,
                      }}
                    />
                    <text
                      x={x}
                      y={y + 1}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      className={`text-[10px] font-body font-semibold pointer-events-none ${
                        isActive ? "fill-white" : "fill-[var(--foreground)]"
                      }`}
                    >
                      {trait.id}
                    </text>
                    {/* Label */}
                    <text
                      x={x}
                      y={y + (angle > -90 && angle < 90 ? 44 : -38)}
                      textAnchor="middle"
                      className="text-[9px] font-body fill-muted pointer-events-none"
                    >
                      {trait.name}
                    </text>
                  </g>
                );
              })}
            </svg>
          </motion.div>

          {/* Mobile grid + Info panel */}
          <div className="w-full lg:w-[320px] shrink-0">
            {/* Mobile grid */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 md:hidden mb-6">
              {TRAITS.map((trait, i) => (
                <button
                  key={trait.id}
                  onClick={() => setActiveTrait(activeTrait === i ? null : i)}
                  className={`glass-card p-3 text-center text-xs font-body transition-all ${
                    activeTrait === i
                      ? "!bg-accent !text-white !border-accent"
                      : ""
                  }`}
                >
                  {trait.name}
                </button>
              ))}
            </div>

            {/* Info panel */}
            <AnimatePresence mode="wait">
              {activeTrait !== null && (
                <motion.div
                  key={activeTrait}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="glass-card p-6"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent font-heading font-bold text-lg">
                      {TRAITS[activeTrait].id}
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold text-lg">
                        {TRAITS[activeTrait].name}
                      </h3>
                    </div>
                  </div>
                  <p className="text-sm text-muted font-body leading-relaxed">
                    {TRAITS[activeTrait].description}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {activeTrait === null && (
              <div className="glass-card p-6 text-center hidden lg:block">
                <p className="text-sm text-muted font-body">
                  Hover over a trait to explore
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
