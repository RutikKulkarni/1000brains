"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TRAITS, type ITrait } from "@/types";
import * as LucideIcons from "lucide-react";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { useRouter } from "next/navigation";

function getStaticTraitUrl(name: string): string {
  const lowercase = name.toLowerCase();
  if (["animator", "film-maker", "designer", "calligrapher"].some((k) => lowercase.includes(k))) {
    return "/visual-narrative";
  }
  if (["edtech researcher"].some((k) => lowercase.includes(k))) {
    return "/edtech-lab";
  }
  if (["blogger"].some((k) => lowercase.includes(k))) {
    return "/global-classroom";
  }
  if (["professor"].some((k) => lowercase.includes(k))) {
    return "/about";
  }
  if (["percussionist", "ideator", "speaker"].some((k) => lowercase.includes(k))) {
    return "/interdisciplinary";
  }
  return "/";
}

export default function TraitsWheel() {
  const router = useRouter();
  const [traitsList, setTraitsList] = useState<ITrait[]>([]);
  const [selectedTrait, setSelectedTrait] = useState<ITrait | null>(null);
  const [ref, isVisible] = useIntersectionObserver<HTMLDivElement>({
    threshold: 0.1,
  });

  useEffect(() => {
    fetch("/api/traits")
      .then((r) => (r.ok ? r.json() : []))
      .then((data) => {
        if (data && data.length > 0) {
          setTraitsList(data);
        } else {
          setTraitsList(
            TRAITS.map((t) => ({
              ...t,
              targetUrl: getStaticTraitUrl(t.name),
            }))
          );
        }
      })
      .catch(() =>
        setTraitsList(
          TRAITS.map((t) => ({
            ...t,
            targetUrl: getStaticTraitUrl(t.name),
          }))
        )
      );
  }, []);

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

  const activeTraits = traitsList.length > 0 ? traitsList : TRAITS;

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
          {activeTraits.map((trait, i) => {
            const IconComponent = IconMap[trait.icon] || LucideIcons.HelpCircle;
            const indexDisplay = String((trait.id !== undefined && trait.id !== null) ? trait.id : i + 1).padStart(2, "0");
            return (
              <motion.div
                key={(trait as any)._id || trait.id || i}
                initial={{ opacity: 0, y: 30 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                onClick={() => setSelectedTrait(trait)}
                className="relative overflow-hidden glass-card p-6 flex flex-col justify-between h-[210px] rounded-2xl cursor-pointer group transition-all duration-300 hover:shadow-lg hover:shadow-accent/5 hover:border-accent/40 hover:-translate-y-1.5"
              >
                {/* Blueprint grid effect in background */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:20px_20px] opacity-[0.04] group-hover:opacity-[0.08] transition-opacity duration-300" />
                
                {/* Radial glow effect */}
                <div className="absolute -right-20 -top-20 w-40 h-40 rounded-full bg-accent/5 blur-3xl group-hover:bg-accent/15 transition-all duration-300" />

                <div className="relative z-10">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-muted/50 font-semibold tracking-wider">
                      {indexDisplay}
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

      {/* Trait Detail Modal */}
      <AnimatePresence>
        {selectedTrait && (() => {
          const IconComponent = IconMap[selectedTrait.icon] || LucideIcons.HelpCircle;
          
          const getTargetPageTitle = (url?: string): string => {
            if (!url) return "Home";
            if (url === "/visual-narrative") return "Visual Narrative & Design";
            if (url === "/edtech-lab") return "EdTech & Pedagogy Lab";
            if (url === "/global-classroom") return "The Global Classroom";
            if (url === "/interdisciplinary") return "Interdisciplinary Expression";
            if (url === "/about") return "About & Connect";
            return "Explore Section";
          };

          return (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md p-4"
              onClick={() => setSelectedTrait(null)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ duration: 0.3 }}
                className="glass-card w-full max-w-lg relative overflow-hidden bg-[var(--surface)] border border-[var(--border)] rounded-2xl shadow-2xl p-6 md:p-8"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedTrait(null)}
                  className="absolute top-4 right-4 text-muted hover:text-foreground transition-colors cursor-pointer"
                >
                  <LucideIcons.X className="w-5 h-5" />
                </button>

                {/* Header Icon Section */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
                    <IconComponent className="w-7 h-7" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-heading font-bold text-foreground">
                      {selectedTrait.name}
                    </h2>
                    <span className="text-[10px] text-muted font-mono uppercase tracking-wider">
                      Dynamic CMS Trait Profile
                    </span>
                  </div>
                </div>

                {/* Content description */}
                <div className="space-y-4">
                  <p 
                    className="text-sm md:text-base text-muted font-body leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: selectedTrait.description }}
                  />
                </div>

                {/* Call-to-action button */}
                {selectedTrait.targetUrl && (
                  <div className="mt-8 pt-6 border-t border-[var(--border)]">
                    <button
                      onClick={() => {
                        setSelectedTrait(null);
                        router.push(selectedTrait.targetUrl!);
                      }}
                      className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-accent text-white font-body text-sm font-semibold hover:bg-accent-dark transition-colors shadow-lg shadow-accent/20 cursor-pointer"
                    >
                      Explore {getTargetPageTitle(selectedTrait.targetUrl)}
                      <LucideIcons.ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </motion.div>
            </motion.div>
          );
        })()}
      </AnimatePresence>
    </section>
  );
}
