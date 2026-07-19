"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import {
  Award,
  Download,
  GraduationCap,
  Mail,
  MapPin,
  Send,
  Globe,
  BookOpen,
  User,
  Building,
  CheckCircle,
} from "lucide-react";

const milestones = [
  { year: "2019", label: "edX Prize Finalist", icon: Award },
  { year: "2020", label: "Professor of Practice, IIT Gandhinagar", icon: GraduationCap },
  { year: "2021", label: "100,000+ MOOC Learners", icon: Globe },
  { year: "2023", label: "ICSSR Funded Research", icon: BookOpen },
];

const phdScholars = [
  {
    name: "Adithi Iyer",
    institution: "IIT Gandhinagar",
    topic: "Augmented Podcasts in MOOC Environments",
  },
  {
    name: "Devesh Kumar",
    institution: "IIT Gandhinagar",
    topic: "Visual Design Impact on Learning Outcomes",
  },
  {
    name: "Pyla Gangatathalli",
    institution: "IIT Gandhinagar",
    topic: "Scalable Pedagogical Frameworks for Digital Education",
  },
];

export default function AboutPage() {
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [refBio, isBioVisible] = useIntersectionObserver<HTMLDivElement>({ threshold: 0.2 });
  const [refTimeline, isTimelineVisible] = useIntersectionObserver<HTMLDivElement>({ threshold: 0.1 });
  const [refScholars, isScholarsVisible] = useIntersectionObserver<HTMLDivElement>({ threshold: 0.1 });
  const [refContact, isContactVisible] = useIntersectionObserver<HTMLDivElement>({ threshold: 0.1 });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Would POST to /api/contact in production
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 3000);
    setFormState({ name: "", email: "", message: "" });
  };

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
                About · Connect
              </p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-4">
                About <span className="gradient-text">Sameer</span>
              </h1>
            </motion.div>
          </div>
        </section>

        {/* Bio */}
        <section className="py-12 px-6" ref={refBio}>
          <div className="section-container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isBioVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="glass-card p-8 md:p-12"
            >
              <div className="flex flex-col md:flex-row gap-8">
                {/* Profile Image Placeholder */}
                <div className="flex-shrink-0">
                  <div className="w-40 h-40 md:w-48 md:h-48 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center border border-[var(--card-border)]">
                    <User className="w-16 h-16 text-primary/30" />
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl md:text-3xl font-heading font-bold mb-2">
                    Prof. Sameer Sahasrabudhe
                  </h2>
                  <p className="text-accent font-body font-medium mb-4">
                    Professor of Practice in Design · IIT Gandhinagar
                  </p>
                  <p className="text-muted font-body leading-relaxed mb-4">
                    A multidisciplinary creative professional with over 25 years
                    of experience spanning design, filmmaking, 3D animation,
                    educational technology, and research. With a BFA foundation
                    and ZICA-trained animation expertise, Prof. Sahasrabudhe
                    bridges the worlds of fine arts and technology to create
                    impactful educational experiences.
                  </p>
                  <p className="text-muted font-body leading-relaxed mb-6">
                    As a Professor of Practice at IIT Gandhinagar and an edX
                    Prize 2019 Finalist, he has reached over 100,000 learners
                    through MOOCs on NPTEL, SWAYAM, IITBombayX, and edX. His
                    ICSSR-funded research on augmented podcasts and the
                    Learner-Centric MOOC (LCM) framework are advancing the
                    frontiers of digital pedagogy.
                  </p>

                  <div className="flex flex-wrap gap-3">
                    <a
                      href="#contact"
                      className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-accent text-white font-body font-medium text-sm hover:bg-accent-dark transition-colors shadow-lg shadow-accent/20"
                    >
                      <Mail className="w-4 h-4" />
                      Get in Touch
                    </a>
                    <a
                      href="#"
                      className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] font-body font-medium text-sm hover:border-accent/40 transition-colors"
                    >
                      <Download className="w-4 h-4" />
                      Download CV
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Recognition Timeline */}
        <section className="py-20 px-6 bg-[var(--surface-alt)]" ref={refTimeline}>
          <div className="section-container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isTimelineVisible ? { opacity: 1, y: 0 } : {}}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-3">
                The <span className="gradient-text">Journey</span>
              </h2>
              <p className="text-muted font-body max-w-lg mx-auto">
                Key milestones in a career of creative excellence
              </p>
            </motion.div>

            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-[var(--border)] hidden md:block" />

              <div className="space-y-8">
                {milestones.map((milestone, i) => {
                  const Icon = milestone.icon;
                  return (
                    <motion.div
                      key={milestone.year}
                      initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                      animate={isTimelineVisible ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: i * 0.15 }}
                      className={`flex flex-col md:flex-row items-start md:items-center gap-4 ${
                        i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                      }`}
                    >
                      <div
                        className={`flex-1 ${
                          i % 2 === 0 ? "md:text-right" : "md:text-left"
                        }`}
                      >
                        <div className="glass-card p-5 inline-block">
                          <p className="text-accent font-heading font-bold text-lg mb-1">
                            {milestone.year}
                          </p>
                          <p className="text-foreground font-body font-medium">
                            {milestone.label}
                          </p>
                        </div>
                      </div>

                      <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center flex-shrink-0 shadow-lg shadow-accent/20 z-10">
                        <Icon className="w-5 h-5 text-white" />
                      </div>

                      <div className="flex-1 hidden md:block" />
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* PhD Scholars */}
        <section className="py-20 px-6" ref={refScholars}>
          <div className="section-container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isScholarsVisible ? { opacity: 1, y: 0 } : {}}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-3">
                PhD <span className="gradient-text">Scholars</span>
              </h2>
              <p className="text-muted font-body max-w-lg mx-auto">
                Guiding the next generation of researchers
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {phdScholars.map((scholar, i) => (
                <motion.div
                  key={scholar.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isScholarsVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: i * 0.1 }}
                  className="glass-card p-6 text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center mx-auto mb-4 border border-[var(--card-border)]">
                    <GraduationCap className="w-7 h-7 text-primary/50" />
                  </div>
                  <h3 className="font-heading font-semibold mb-1">
                    {scholar.name}
                  </h3>
                  <p className="text-xs text-accent font-body flex items-center justify-center gap-1 mb-2">
                    <Building className="w-3 h-3" />
                    {scholar.institution}
                  </p>
                  <p className="text-sm text-muted font-body">{scholar.topic}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section id="contact" className="py-20 px-6 bg-[var(--surface-alt)]" ref={refContact}>
          <div className="section-container max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isContactVisible ? { opacity: 1, y: 0 } : {}}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-3">
                Get in <span className="gradient-text">Touch</span>
              </h2>
              <p className="text-muted font-body max-w-lg mx-auto">
                Have a question, collaboration idea, or booking inquiry? Reach out.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isContactVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
              className="glass-card p-8"
            >
              {formSubmitted ? (
                <div className="text-center py-12">
                  <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
                  <h3 className="text-xl font-heading font-semibold mb-2">
                    Message Sent!
                  </h3>
                  <p className="text-muted font-body">
                    Thank you for reaching out. We&apos;ll get back to you soon.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-body font-medium mb-2"
                      >
                        Name
                      </label>
                      <input
                        id="name"
                        type="text"
                        required
                        value={formState.name}
                        onChange={(e) =>
                          setFormState({ ...formState, name: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--surface)] font-body text-sm text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition-all"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-body font-medium mb-2"
                      >
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        required
                        value={formState.email}
                        onChange={(e) =>
                          setFormState({ ...formState, email: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--surface)] font-body text-sm text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition-all"
                        placeholder="you@example.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-body font-medium mb-2"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={5}
                      value={formState.message}
                      onChange={(e) =>
                        setFormState({ ...formState, message: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--surface)] font-body text-sm text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition-all resize-none"
                      placeholder="Tell us about your inquiry..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 rounded-xl bg-accent text-white font-body font-medium text-sm hover:bg-accent-dark transition-colors shadow-lg shadow-accent/20"
                  >
                    <Send className="w-4 h-4" />
                    Send Message
                  </button>
                </form>
              )}
            </motion.div>

            {/* Social / Contact Info */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
              {[
                { icon: Mail, label: "Email", value: "sameer@iitgn.ac.in", href: "mailto:sameer@iitgn.ac.in" },
                { icon: MapPin, label: "Location", value: "IIT Gandhinagar, Gujarat", href: "#" },
                { icon: Globe, label: "Blog", value: "1000brains.wordpress.com", href: "#" },
              ].map(({ icon: Icon, label, value, href }) => (
                <a
                  key={label}
                  href={href}
                  className="glass-card p-4 flex items-center gap-3 hover:border-accent/30 transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent flex-shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-muted font-body">{label}</p>
                    <p className="text-sm font-body font-medium truncate">
                      {value}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
