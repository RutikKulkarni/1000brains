"use client";

import { motion } from "framer-motion";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { useAnimatedCounter } from "@/hooks/useAnimatedCounter";
import { Users, Eye, Clock, GraduationCap } from "lucide-react";
import { formatNumber } from "@/lib/utils";

const stats = [
  {
    label: "Learners Worldwide",
    value: 100000,
    suffix: "+",
    icon: Users,
  },
  {
    label: "Blog Visits",
    value: 176181,
    suffix: "",
    icon: Eye,
  },
  {
    label: "Years Experience",
    value: 25,
    suffix: "+",
    icon: Clock,
  },
  {
    label: "PhD Scholars",
    value: 3,
    suffix: "",
    icon: GraduationCap,
  },
];

function StatCard({
  label,
  value,
  suffix,
  icon: Icon,
  index,
  isVisible,
}: {
  label: string;
  value: number;
  suffix: string;
  icon: React.ElementType;
  index: number;
  isVisible: boolean;
}) {
  const animatedValue = useAnimatedCounter({
    end: value,
    duration: 2500,
    enabled: isVisible,
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="relative overflow-hidden glass-card p-6 md:p-8 text-center group rounded-2xl transition-all duration-300 hover:shadow-lg hover:shadow-accent/5 hover:border-accent/40 hover:-translate-y-1.5"
    >
      {/* Blueprint grid effect in background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:20px_20px] opacity-[0.04] group-hover:opacity-[0.08] transition-opacity duration-300" />
      
      {/* Glow effect */}
      <div className="absolute -right-20 -top-20 w-40 h-40 rounded-full bg-accent/5 blur-3xl group-hover:bg-accent/10 transition-all duration-300" />

      <div className="relative z-10">
        <div className="w-12 h-12 rounded-2xl bg-accent/5 border border-accent/15 flex items-center justify-center mx-auto mb-5 group-hover:bg-accent/15 group-hover:border-accent/30 group-hover:scale-110 transition-all duration-300">
          <Icon className="w-6 h-6 text-accent" />
        </div>
        <p className="text-3xl md:text-4xl font-heading font-bold gradient-text mb-2 tracking-tight">
          {formatNumber(animatedValue)}
          {suffix}
        </p>
        <p className="text-xs md:text-sm text-muted font-body font-medium uppercase tracking-wider">{label}</p>
      </div>
    </motion.div>
  );
}

export default function ImpactCounter() {
  const [ref, isVisible] = useIntersectionObserver<HTMLDivElement>({
    threshold: 0.2,
  });

  return (
    <section className="py-24 px-6 bg-[var(--surface-alt)]" ref={ref}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-3">
            Global <span className="gradient-text">Impact</span>
          </h2>
          <p className="text-muted font-body max-w-lg mx-auto">
            Numbers that reflect a lifetime of creative and educational excellence
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat, i) => (
            <StatCard key={stat.label} {...stat} index={i} isVisible={isVisible} />
          ))}
        </div>
      </div>
    </section>
  );
}
