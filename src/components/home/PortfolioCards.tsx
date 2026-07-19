"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { PORTFOLIO_HEADS } from "@/types";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { Film, FlaskConical, Globe, Sparkles, ArrowRight } from "lucide-react";

const headIcons = [Film, FlaskConical, Globe, Sparkles];

export default function PortfolioCards() {
  const [ref, isVisible] = useIntersectionObserver<HTMLDivElement>({
    threshold: 0.15,
  });

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
            Explore the <span className="gradient-text">Portfolio</span>
          </h2>
          <p className="text-muted font-body max-w-lg mx-auto">
            Four dimensions of a multidisciplinary creative practice
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {PORTFOLIO_HEADS.map((head, i) => {
            const Icon = headIcons[i];
            return (
              <motion.div
                key={head.slug}
                initial={{ opacity: 0, y: 30 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.12 }}
              >
                <Link
                  href={`/${head.slug}`}
                  className="glass-card p-8 flex flex-col h-full group relative overflow-hidden rounded-2xl transition-all duration-300 hover:shadow-lg hover:shadow-accent/5 hover:border-accent/40 hover:-translate-y-1.5"
                >
                  {/* Blueprint grid effect in background */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:24px_24px] opacity-[0.04] group-hover:opacity-[0.08] transition-opacity duration-500" />
                  
                  {/* Glow effect */}
                  <div className="absolute -right-24 -top-24 w-48 h-48 rounded-full bg-accent/5 blur-3xl group-hover:bg-accent/15 transition-all duration-500" />

                  <div className="relative z-10 flex flex-col h-full">
                    <div className="w-12 h-12 rounded-2xl bg-accent/5 border border-accent/15 flex items-center justify-center mb-6 group-hover:bg-accent/15 group-hover:border-accent/30 group-hover:scale-110 transition-all duration-300">
                      <Icon className="w-6 h-6 text-accent" />
                    </div>

                    <h3 className="text-xl md:text-2xl font-heading font-bold mb-3 text-foreground group-hover:text-accent transition-colors duration-300">
                      {head.title}
                    </h3>

                    <p className="text-muted text-sm mb-6 font-body leading-relaxed">
                      {head.subtitle}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {head.traits.map((trait) => (
                        <span
                          key={trait}
                          className="text-xs px-3 py-1 rounded-lg bg-accent/5 text-accent font-mono border border-accent/10 group-hover:bg-accent/10 transition-colors"
                        >
                          {trait}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-2 text-sm text-accent font-body font-semibold mt-auto group/btn">
                      <span>Explore Dimension</span>
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1.5 transition-transform duration-200" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
