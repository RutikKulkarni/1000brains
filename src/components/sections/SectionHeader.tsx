"use client";

import { motion } from "framer-motion";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

interface SectionHeaderProps {
  title: string;
  highlight?: string;
  subtitle?: string;
  align?: "center" | "left";
}

export default function SectionHeader({
  title,
  highlight,
  subtitle,
  align = "center",
}: SectionHeaderProps) {
  const [ref, isVisible] = useIntersectionObserver<HTMLDivElement>({
    threshold: 0.3,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className={`mb-12 ${align === "center" ? "text-center" : ""}`}
    >
      <h2
        className={`text-3xl md:text-4xl font-heading font-bold mb-3 ${
          align === "center" ? "" : ""
        }`}
      >
        {title}{" "}
        {highlight && <span className="gradient-text">{highlight}</span>}
      </h2>
      {subtitle && (
        <p
          className={`text-muted font-body max-w-lg ${
            align === "center" ? "mx-auto" : ""
          }`}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
