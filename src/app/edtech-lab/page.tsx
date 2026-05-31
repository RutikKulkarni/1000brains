"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import {
  FlaskConical,
  BookOpen,
  Users,
  FileText,
  ExternalLink,
  ArrowRight,
  Lightbulb,
  RefreshCw,
  MessageSquare,
  Compass,
} from "lucide-react";

// LCM Framework steps
const lcmSteps = [
  {
    id: "discovery",
    label: "Discovery",
    icon: Compass,
    color: "from-blue-500 to-indigo-500",
    description:
      "Learners explore new concepts through curiosity-driven engagement with multimedia content and real-world problems.",
  },
  {
    id: "interaction",
    label: "Interaction",
    icon: MessageSquare,
    color: "from-emerald-500 to-teal-500",
    description:
      "Collaborative dialogue, peer discussions, and teacher-guided conversations deepen understanding of concepts.",
  },
  {
    id: "creation",
    label: "Creation",
    icon: Lightbulb,
    color: "from-accent to-orange-500",
    description:
      "Learners synthesize knowledge by creating artifacts — projects, presentations, prototypes, or artworks.",
  },
  {
    id: "reflection",
    label: "Reflection",
    icon: RefreshCw,
    color: "from-purple-500 to-violet-500",
    description:
      "Critical self-assessment and metacognitive practice that feeds into the next discovery cycle.",
  },
];

const researchPapers = [
  {
    id: "1",
    title: "Augmented Podcasts as a Pedagogical Tool for Enhanced Learning in MOOCs",
    authors: ["S. Sahasrabudhe", "A. Iyer", "D. Kumar"],
    journal: "Journal of Educational Technology & Society",
    year: 2023,
    tags: ["EdTech", "Augmented Podcasts", "MOOCs"],
    status: "published",
    doi: "#",
  },
  {
    id: "2",
    title: "Learner-Centric MOOC Design: A Framework for Scalable Digital Pedagogy",
    authors: ["S. Sahasrabudhe", "P. Gangatathalli"],
    journal: "International Conference on Learning Sciences",
    year: 2022,
    tags: ["LCM", "MOOC Design", "Pedagogy"],
    status: "published",
    doi: "#",
  },
  {
    id: "3",
    title: "Impact of Visual Design on MOOC Completion Rates",
    authors: ["S. Sahasrabudhe", "Research Team"],
    journal: "ICSSR Funded Research",
    year: 2024,
    tags: ["ICSSR", "Visual Design", "Completion Rates"],
    status: "funded",
    fundingSource: "ICSSR",
  },
];

export default function EdtechLabPage() {
  const [activeLCM, setActiveLCM] = useState(0);
  const [refLCM, isLCMVisible] = useIntersectionObserver<HTMLDivElement>({ threshold: 0.2 });
  const [refResearch, isResearchVisible] = useIntersectionObserver<HTMLDivElement>({ threshold: 0.1 });

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
                EdTech Researcher · Professor
              </p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-4">
                EdTech & Pedagogy{" "}
                <span className="gradient-text">Lab</span>
              </h1>
              <p className="text-muted font-body max-w-2xl text-lg leading-relaxed">
                Innovating education through the Learner-Centric MOOC (LCM) framework, ICSSR-funded research, and leadership in the EdTech Society.
              </p>
            </motion.div>
          </div>
        </section>

        {/* LCM Framework */}
        <section className="py-20 px-6 bg-[var(--surface-alt)]" ref={refLCM}>
          <div className="section-container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isLCMVisible ? { opacity: 1, y: 0 } : {}}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-3">
                The <span className="gradient-text">LCM Framework</span>
              </h2>
              <p className="text-muted font-body max-w-lg mx-auto">
                A cyclical pedagogical model for learner-centric education
              </p>
            </motion.div>

            <div className="flex flex-col lg:flex-row items-center gap-12">
              {/* Interactive cycle diagram */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isLCMVisible ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative w-[320px] h-[320px] flex-shrink-0"
              >
                {lcmSteps.map((step, i) => {
                  const angle = (i * 360) / lcmSteps.length - 90;
                  const rad = (angle * Math.PI) / 180;
                  const x = 140 + 110 * Math.cos(rad);
                  const y = 140 + 110 * Math.sin(rad);
                  const Icon = step.icon;
                  const isActive = activeLCM === i;

                  return (
                    <motion.button
                      key={step.id}
                      onClick={() => setActiveLCM(i)}
                      className={`absolute w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                        isActive
                          ? `bg-gradient-to-br ${step.color} text-white shadow-xl scale-110`
                          : "bg-[var(--card-bg)] border border-[var(--card-border)] text-muted hover:text-foreground"
                      }`}
                      style={{
                        left: x - 32,
                        top: y - 32,
                      }}
                      whileHover={{ scale: isActive ? 1.1 : 1.05 }}
                    >
                      <Icon className="w-6 h-6" />
                    </motion.button>
                  );
                })}

                {/* Center label */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full border-2 border-dashed border-[var(--card-border)] flex items-center justify-center">
                    <span className="text-xs font-heading font-bold text-muted text-center leading-tight">
                      LCM<br />Cycle
                    </span>
                  </div>
                </div>

                {/* Connecting arcs */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 320 320">
                  <circle cx="160" cy="160" r="110" fill="none" stroke="var(--card-border)" strokeWidth="1" strokeDasharray="6 4" />
                </svg>
              </motion.div>

              {/* Step details */}
              <div className="flex-1 w-full">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {lcmSteps.map((step, i) => {
                    const Icon = step.icon;
                    const isActive = activeLCM === i;
                    return (
                      <motion.button
                        key={step.id}
                        onClick={() => setActiveLCM(i)}
                        initial={{ opacity: 0, y: 20 }}
                        animate={isLCMVisible ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.3 + i * 0.1 }}
                        className={`glass-card p-5 text-left transition-all duration-300 ${
                          isActive ? "ring-2 ring-accent/40 shadow-lg" : ""
                        }`}
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <div
                            className={`w-8 h-8 rounded-lg bg-gradient-to-br ${step.color} flex items-center justify-center`}
                          >
                            <Icon className="w-4 h-4 text-white" />
                          </div>
                          <h3 className="font-heading font-semibold">{step.label}</h3>
                        </div>
                        <p className="text-sm text-muted font-body leading-relaxed">
                          {step.description}
                        </p>
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* EdTech Society */}
        <section className="py-20 px-6">
          <div className="section-container">
            <div className="glass-card p-8 md:p-12 flex flex-col md:flex-row items-center gap-8">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center flex-shrink-0 shadow-lg">
                <Users className="w-10 h-10 text-white" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-heading font-bold mb-3">
                  EdTech Society
                </h2>
                <p className="text-muted font-body leading-relaxed max-w-2xl">
                  Leading institutional efforts to integrate technology into pedagogy. The EdTech Society fosters innovation in teaching methodologies, promotes best practices in digital education, and builds a community of forward-thinking educators committed to transforming learning experiences.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Research Feed */}
        <section className="py-20 px-6 bg-[var(--surface-alt)]" ref={refResearch}>
          <div className="section-container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isResearchVisible ? { opacity: 1, y: 0 } : {}}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-3">
                Live Research <span className="gradient-text">Feed</span>
              </h2>
              <p className="text-muted font-body max-w-lg mx-auto">
                Latest publications, funded projects, and ongoing research
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {researchPapers.map((paper, i) => (
                <motion.div
                  key={paper.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isResearchVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: i * 0.1 }}
                  className="glass-card p-6 flex flex-col"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span
                      className={`text-xs px-2.5 py-1 rounded-full font-body font-medium ${
                        paper.status === "published"
                          ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                          : paper.status === "funded"
                          ? "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                          : "bg-blue-500/10 text-blue-600 dark:text-blue-400"
                      }`}
                    >
                      {paper.status === "funded"
                        ? `Funded by ${paper.fundingSource}`
                        : paper.status.charAt(0).toUpperCase() + paper.status.slice(1)}
                    </span>
                    <span className="text-xs text-muted font-body">{paper.year}</span>
                  </div>

                  <h3 className="font-heading font-semibold mb-2 leading-snug">
                    {paper.title}
                  </h3>

                  <p className="text-sm text-muted font-body mb-2">
                    {paper.authors.join(", ")}
                  </p>

                  <p className="text-sm text-muted/70 font-body italic mb-4">
                    {paper.journal}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mt-auto">
                    {paper.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-0.5 rounded-full bg-primary/8 text-primary font-body"
                      >
                        {tag}
                      </span>
                    ))}
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
