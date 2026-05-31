"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { PORTFOLIO_HEADS } from "@/types";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { Film, FlaskConical, Globe, Sparkles, ArrowRight } from "lucide-react";

const headIcons = [Film, FlaskConical, Globe, Sparkles];
const headColors = [
  "from-rose-500 to-pink-600",
  "from-blue-500 to-cyan-600",
  "from-emerald-500 to-green-600",
  "from-amber-500 to-orange-600",
];

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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PORTFOLIO_HEADS.map((head, i) => {
            const Icon = headIcons[i];
            const color = headColors[i];
            return (
              <motion.div
                key={head.slug}
                initial={{ opacity: 0, y: 30 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.12 }}
              >
                <Link
                  href={`/${head.slug}`}
                  className="glass-card p-8 flex flex-col h-full group relative overflow-hidden"
                >
                  {/* Background gradient on hover */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-[0.04] transition-opacity duration-500`}
                  />

                  <div className="relative z-10">
                    <div
                      className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </div>

                    <h3 className="text-xl font-heading font-semibold mb-2 group-hover:text-accent transition-colors duration-200">
                      {head.title}
                    </h3>

                    <p className="text-muted text-sm mb-5 font-body leading-relaxed">
                      {head.subtitle}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-5">
                      {head.traits.map((trait) => (
                        <span
                          key={trait}
                          className="text-xs px-3 py-1 rounded-full bg-primary/8 text-primary font-body border border-primary/10"
                        >
                          {trait}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-2 text-sm text-accent font-body font-medium mt-auto">
                      <span>Explore</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
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
