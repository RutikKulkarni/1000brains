"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import {
  Music,
  Lightbulb,
  Mic,
  Palette,
  Sparkles,
  Calendar,
  MapPin,
  ExternalLink,
  Play,
  ArrowRight,
} from "lucide-react";

const talks = [
  {
    id: "1",
    title: "Design Thinking for a Better Tomorrow",
    type: "keynote",
    event: "Design Thinking Summit 2024",
    venue: "IIT Gandhinagar",
    date: "March 2024",
    description:
      "A keynote exploring how design thinking methodologies can address complex societal challenges through creative problem-solving.",
  },
  {
    id: "2",
    title: "The Art of Visual Communication",
    type: "workshop",
    event: "National Design Conference",
    venue: "NID Ahmedabad",
    date: "January 2024",
    description:
      "A hands-on workshop on mastering visual communication for engineers, educators, and designers.",
  },
  {
    id: "3",
    title: "EdTech & The Future of Learning",
    type: "panel",
    event: "India EdTech Forum",
    venue: "New Delhi",
    date: "November 2023",
    description:
      "Panel discussion on the evolving landscape of educational technology and its impact on learner outcomes.",
  },
  {
    id: "4",
    title: "Creativity in STEM Education",
    type: "guest-lecture",
    event: "Faculty Development Programme",
    venue: "IIT Bombay",
    date: "August 2023",
    description:
      "Guest lecture on integrating creative methodologies into STEM curricula for enhanced learning engagement.",
  },
];

const typeStyles: Record<string, string> = {
  keynote: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  workshop: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  panel: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  "guest-lecture": "bg-purple-500/10 text-purple-600 dark:text-purple-400",
};

const intersections = [
  {
    title: "BFA → Technical Animation",
    description:
      "A Bachelor of Fine Arts foundation meets ZICA-trained 3D animation expertise — creating technically precise yet artistically compelling visual narratives.",
    icon: Palette,
    gradient: "from-rose-500 to-pink-600",
  },
  {
    title: "Design × HCI Research",
    description:
      "Where visual design sensibility meets human-computer interaction research — crafting educational interfaces that are both beautiful and scientifically effective.",
    icon: Sparkles,
    gradient: "from-blue-500 to-indigo-600",
  },
  {
    title: "Percussion ∩ Ideation",
    description:
      "Rhythmic patterns from tabla and percussion inform the ideation process — tempo, repetition, and improvisation as creative catalysts for design thinking.",
    icon: Music,
    gradient: "from-amber-500 to-orange-600",
  },
];

export default function InterdisciplinaryPage() {
  const [refHero, isHeroVisible] = useIntersectionObserver<HTMLDivElement>({ threshold: 0.2 });
  const [refPercussion, isPercussionVisible] = useIntersectionObserver<HTMLDivElement>({ threshold: 0.1 });
  const [refIntersection, isIntersectionVisible] = useIntersectionObserver<HTMLDivElement>({ threshold: 0.1 });
  const [refTalks, isTalksVisible] = useIntersectionObserver<HTMLDivElement>({ threshold: 0.1 });

  return (
    <>
      <Navbar />
      <main className="pt-24">
        {/* Hero */}
        <section className="py-16 px-6">
          <div className="section-container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <p className="text-accent text-sm font-body tracking-wider uppercase mb-3">
                Percussionist · Ideator · Speaker · Designer
              </p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-4">
                Interdisciplinary{" "}
                <span className="gradient-text">Expression</span>
              </h1>
              <p className="text-muted font-body max-w-2xl text-lg leading-relaxed">
                Where art meets science, rhythm meets design, and creative chaos
                becomes structured innovation.
              </p>
            </motion.div>
          </div>
        </section>

        {/* The Percussionist & Ideator */}
        <section className="py-20 px-6 bg-[var(--surface-alt)]" ref={refPercussion}>
          <div className="section-container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isPercussionVisible ? { opacity: 1, y: 0 } : {}}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-3">
                The Percussionist{" "}
                <span className="gradient-text">& Ideator</span>
              </h2>
              <p className="text-muted font-body max-w-lg mx-auto">
                Rhythm and creativity — two forces that drive innovation
              </p>
            </motion.div>

            {/* Audio wave visualization */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isPercussionVisible ? { opacity: 1 } : {}}
              transition={{ delay: 0.3 }}
              className="glass-card p-8 md:p-12 mb-8"
            >
              <div className="flex flex-col md:flex-row items-center gap-8">
                {/* Wave animation */}
                <div className="flex items-end gap-1 h-24 flex-shrink-0">
                  {Array.from({ length: 30 }).map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-1.5 rounded-full bg-gradient-to-t from-accent to-accent-light"
                      animate={{
                        height: [
                          `${20 + Math.sin(i * 0.5) * 40}%`,
                          `${60 + Math.cos(i * 0.7) * 30}%`,
                          `${20 + Math.sin(i * 0.5) * 40}%`,
                        ],
                      }}
                      transition={{
                        duration: 1.5 + (i % 3) * 0.3,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: i * 0.05,
                      }}
                    />
                  ))}
                </div>

                <div>
                  <h3 className="text-xl font-heading font-semibold mb-3">
                    Rhythm Meets Design
                  </h3>
                  <p className="text-muted font-body leading-relaxed">
                    The rhythmic patterns of percussion — tempo, repetition,
                    syncopation, improvisation — mirror the creative design
                    process. Just as a tabla player builds complexity from simple
                    bols, a designer builds solutions from fundamental
                    principles. This interdisciplinary lens fuels a unique
                    approach to creative problem-solving and ideation.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Academic Intersection */}
        <section className="py-20 px-6" ref={refIntersection}>
          <div className="section-container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isIntersectionVisible ? { opacity: 1, y: 0 } : {}}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-3">
                Academic <span className="gradient-text">Intersection</span>
              </h2>
              <p className="text-muted font-body max-w-lg mx-auto">
                BFA + Technical Animation + HCI — a unique bridge across disciplines
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {intersections.map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isIntersectionVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: i * 0.15 }}
                    className="relative overflow-hidden glass-card p-6 text-center group rounded-2xl transition-all duration-300 hover:shadow-lg hover:shadow-accent/5 hover:border-accent/40 hover:-translate-y-1.5"
                  >
                    {/* Blueprint grid effect in background */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:20px_20px] opacity-[0.04] group-hover:opacity-[0.08] transition-opacity duration-300" />
                    
                    {/* Glow effect */}
                    <div className="absolute -right-20 -top-20 w-40 h-40 rounded-full bg-accent/5 blur-3xl group-hover:bg-accent/10 transition-all duration-300" />

                    <div className="relative z-10">
                      <div className="w-14 h-14 rounded-2xl bg-accent/5 border border-accent/15 flex items-center justify-center mx-auto mb-5 group-hover:bg-accent/15 group-hover:border-accent/30 group-hover:scale-110 transition-all duration-300">
                        <Icon className="w-7 h-7 text-accent" />
                      </div>
                      <h3 className="font-heading font-bold text-lg mb-3 text-foreground group-hover:text-accent transition-colors duration-300">
                        {item.title}
                      </h3>
                      <p className="text-sm text-muted font-body leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Design Thinking Keynotes */}
        <section className="py-20 px-6 bg-[var(--surface-alt)]" ref={refTalks}>
          <div className="section-container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isTalksVisible ? { opacity: 1, y: 0 } : {}}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-3">
                Speaking & <span className="gradient-text">Workshops</span>
              </h2>
              <p className="text-muted font-body max-w-lg mx-auto">
                Design thinking keynotes, workshops, and guest lectures
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {talks.map((talk, i) => (
                <motion.div
                  key={talk.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isTalksVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: i * 0.1 }}
                  className="glass-card p-6 group"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span
                      className={`text-xs px-3 py-1 rounded-full font-body font-medium capitalize ${
                        typeStyles[talk.type] || ""
                      }`}
                    >
                      {talk.type.replace("-", " ")}
                    </span>
                  </div>

                  <h3 className="text-lg font-heading font-semibold mb-2 group-hover:text-accent transition-colors">
                    {talk.title}
                  </h3>

                  <p className="text-sm text-muted font-body leading-relaxed mb-4">
                    {talk.description}
                  </p>

                  <div className="flex flex-wrap gap-4 text-xs text-muted font-body">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      {talk.date}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5" />
                      {talk.venue}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Mic className="w-3.5 h-3.5" />
                      {talk.event}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
