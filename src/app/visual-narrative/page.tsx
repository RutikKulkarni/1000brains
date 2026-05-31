"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SectionHeader from "@/components/sections/SectionHeader";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import {
  Film,
  Box,
  Brush,
  Play,
  Award,
  ExternalLink,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

// Static demo data — will be replaced by MongoDB data
const films = [
  {
    id: "1",
    title: "The Quest",
    subtitle: "Helsinki Education Film Festival Nominee",
    category: "documentary",
    year: 2019,
    awards: ["Helsinki Nominee", "National Science Film Festival Nominee"],
    description:
      "An award-nominated documentary exploring the intersection of education and technology in modern India.",
    thumbnail: "",
  },
  {
    id: "2",
    title: "Learning Reimagined",
    subtitle: "Educational Film on Digital Pedagogy",
    category: "educational",
    year: 2021,
    awards: ["Best Educational Film - EdTech Awards"],
    description:
      "A deep dive into how technology is transforming the traditional classroom experience.",
    thumbnail: "",
  },
  {
    id: "3",
    title: "Rhythms of Design",
    subtitle: "Short Film on Creative Process",
    category: "short",
    year: 2022,
    awards: [],
    description:
      "A visual exploration of how rhythm and percussion influence the design process.",
    thumbnail: "",
  },
];

const projects3D = [
  {
    id: "1",
    title: "Architectural Visualization",
    category: "3d-visualization",
    tools: ["Blender", "3ds Max"],
    description: "Photorealistic architectural renders for educational institutions.",
  },
  {
    id: "2",
    title: "Character Animation Series",
    category: "3d-visualization",
    tools: ["Maya", "ZBrush"],
    description: "Educational character animations for MOOC platform content.",
  },
  {
    id: "3",
    title: "Product Visualization",
    category: "3d-visualization",
    tools: ["Blender", "Substance Painter"],
    description: "High-fidelity product renders for design portfolio presentations.",
  },
];

const calligraphyWorks = [
  { id: "1", title: "Devanagari Script Series", description: "Traditional Indian calligraphy exploring form and rhythm." },
  { id: "2", title: "Modern Lettering", description: "Contemporary hand-lettering with a digital twist." },
  { id: "3", title: "Typography Experiments", description: "Experimental letterforms blending tradition with innovation." },
  { id: "4", title: "Festival Greetings Collection", description: "Handcrafted greeting designs for cultural celebrations." },
];

const tabs = [
  { id: "films", label: "Films Archive", icon: Film },
  { id: "3d", label: "3D Visualization", icon: Box },
  { id: "calligraphy", label: "Calligraphy", icon: Brush },
] as const;

type TabId = (typeof tabs)[number]["id"];

export default function VisualNarrativePage() {
  const [activeTab, setActiveTab] = useState<TabId>("films");
  const [selectedFilm, setSelectedFilm] = useState<string | null>(null);
  const [ref, isVisible] = useIntersectionObserver<HTMLDivElement>({ threshold: 0.1 });

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
                Animator · Film-maker · Designer · Calligrapher
              </p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-4">
                Visual Narrative{" "}
                <span className="gradient-text">& Design</span>
              </h1>
              <p className="text-muted font-body max-w-2xl text-lg leading-relaxed">
                Creating compelling stories through film, 3D visualization, and the timeless art of calligraphy — where every frame and stroke carries meaning.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Tabs */}
        <section className="px-6 sticky top-16 md:top-20 z-30 bg-[var(--background)]/80 backdrop-blur-xl border-b border-[var(--border)] py-3">
          <div className="section-container flex gap-2 overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-body font-medium whitespace-nowrap transition-all duration-200 ${
                    isActive
                      ? "bg-accent text-white shadow-lg shadow-accent/20"
                      : "text-muted hover:text-foreground hover:bg-[var(--surface-alt)]"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </section>

        {/* Content */}
        <div className="py-16 px-6" ref={ref}>
          <div className="section-container">
            <AnimatePresence mode="wait">
              {/* Films */}
              {activeTab === "films" && (
                <motion.div
                  key="films"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {films.map((film, i) => (
                      <motion.div
                        key={film.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="glass-card overflow-hidden group cursor-pointer"
                        onClick={() => setSelectedFilm(film.id)}
                      >
                        {/* Thumbnail placeholder */}
                        <div className="relative aspect-video bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                          <Film className="w-12 h-12 text-primary/30" />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                            <Play className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                          <span className="absolute top-3 right-3 px-2 py-1 rounded-lg bg-black/50 text-white text-xs font-body">
                            {film.year}
                          </span>
                        </div>
                        <div className="p-5">
                          <h3 className="font-heading font-semibold text-lg mb-1">
                            {film.title}
                          </h3>
                          <p className="text-sm text-muted font-body mb-3">
                            {film.subtitle}
                          </p>
                          {film.awards.length > 0 && (
                            <div className="flex flex-wrap gap-1.5">
                              {film.awards.map((award) => (
                                <span
                                  key={award}
                                  className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 font-body"
                                >
                                  <Award className="w-3 h-3" />
                                  {award}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* 3D Visualization */}
              {activeTab === "3d" && (
                <motion.div
                  key="3d"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects3D.map((project, i) => (
                      <motion.div
                        key={project.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="glass-card overflow-hidden group"
                      >
                        <div className="aspect-square bg-gradient-to-br from-primary/8 to-accent/8 flex items-center justify-center">
                          <Box className="w-16 h-16 text-primary/20 group-hover:text-primary/40 transition-colors" />
                        </div>
                        <div className="p-5">
                          <h3 className="font-heading font-semibold mb-2">
                            {project.title}
                          </h3>
                          <p className="text-sm text-muted font-body mb-3">
                            {project.description}
                          </p>
                          <div className="flex flex-wrap gap-1.5">
                            {project.tools.map((tool) => (
                              <span
                                key={tool}
                                className="text-xs px-2.5 py-1 rounded-full bg-primary/8 text-primary font-body"
                              >
                                {tool}
                              </span>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Calligraphy */}
              {activeTab === "calligraphy" && (
                <motion.div
                  key="calligraphy"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
                    {calligraphyWorks.map((work, i) => (
                      <motion.div
                        key={work.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="glass-card overflow-hidden break-inside-avoid group"
                      >
                        <div
                          className="bg-gradient-to-br from-primary/6 to-accent/6 flex items-center justify-center"
                          style={{
                            height: `${180 + (i % 3) * 60}px`,
                          }}
                        >
                          <Brush className="w-12 h-12 text-accent/20 group-hover:text-accent/40 transition-colors" />
                        </div>
                        <div className="p-5">
                          <h3 className="font-heading font-semibold mb-1">
                            {work.title}
                          </h3>
                          <p className="text-sm text-muted font-body">
                            {work.description}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
