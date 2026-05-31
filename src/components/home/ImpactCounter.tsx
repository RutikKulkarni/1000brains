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
    color: "from-blue-500 to-indigo-600",
  },
  {
    label: "Blog Visits",
    value: 176181,
    suffix: "",
    icon: Eye,
    color: "from-accent to-orange-500",
  },
  {
    label: "Years Experience",
    value: 25,
    suffix: "+",
    icon: Clock,
    color: "from-emerald-500 to-teal-600",
  },
  {
    label: "PhD Scholars",
    value: 3,
    suffix: "",
    icon: GraduationCap,
    color: "from-purple-500 to-violet-600",
  },
];

function StatCard({
  label,
  value,
  suffix,
  icon: Icon,
  color,
  index,
  isVisible,
}: {
  label: string;
  value: number;
  suffix: string;
  icon: React.ElementType;
  color: string;
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
      className="glass-card p-6 md:p-8 text-center group"
    >
      <div
        className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
      >
        <Icon className="w-6 h-6 text-white" />
      </div>
      <p className="text-3xl md:text-4xl font-heading font-bold gradient-text mb-2">
        {formatNumber(animatedValue)}
        {suffix}
      </p>
      <p className="text-sm text-muted font-body">{label}</p>
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
