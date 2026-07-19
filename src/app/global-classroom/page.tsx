"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { useAnimatedCounter } from "@/hooks/useAnimatedCounter";
import { formatNumber } from "@/lib/utils";
import {
  Globe,
  BookOpen,
  Users,
  ExternalLink,
  Star,
  Quote,
  PenTool,
  ArrowRight,
} from "lucide-react";

// Demo MOOCs data
const courses = [
  {
    id: "1",
    title: "3D Visualization and Animation",
    platform: "NPTEL",
    enrollments: 45000,
    description:
      "A comprehensive course on 3D visualization techniques using industry-standard tools, covering modeling, texturing, lighting, and animation.",
    url: "#",
  },
  {
    id: "2",
    title: "Introduction to Design Thinking",
    platform: "SWAYAM",
    enrollments: 32000,
    description:
      "Learn the fundamentals of design thinking methodology — empathize, define, ideate, prototype, and test.",
    url: "#",
  },
  {
    id: "3",
    title: "Visual Communication for Engineers",
    platform: "IITBombayX",
    enrollments: 18000,
    description:
      "Bridge the gap between engineering precision and visual storytelling through effective communication design.",
    url: "#",
  },
  {
    id: "4",
    title: "Creative Multimedia Production",
    platform: "edX",
    enrollments: 12000,
    description:
      "Master the art of multimedia production — from storyboarding and filming to post-production and distribution.",
    url: "#",
  },
];

const platformColors: Record<string, string> = {
  NPTEL: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  SWAYAM: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  IITBombayX: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
  edX: "bg-red-500/10 text-red-600 dark:text-red-400",
};

const testimonials = [
  {
    id: "1",
    name: "Priya Sharma",
    role: "Student, NPTEL",
    content:
      "This course transformed my understanding of 3D visualization. Professor Sahasrabudhe's teaching style makes complex concepts accessible and engaging.",
    rating: 5,
    courseName: "3D Visualization and Animation",
  },
  {
    id: "2",
    name: "Rahul Verma",
    role: "Designer, IITBombayX",
    content:
      "The visual communication course bridged a critical gap in my skill set. The practical assignments were incredibly well-designed.",
    rating: 5,
    courseName: "Visual Communication for Engineers",
  },
  {
    id: "3",
    name: "Ananya Gupta",
    role: "Educator, SWAYAM",
    content:
      "As a fellow educator, I found the design thinking course to be a masterclass in pedagogy itself. Highly recommended for anyone in education.",
    rating: 5,
    courseName: "Introduction to Design Thinking",
  },
  {
    id: "4",
    name: "Vikram Singh",
    role: "Student, edX",
    content:
      "The multimedia production course gave me hands-on skills I use daily in my professional work. The quality of content is world-class.",
    rating: 4,
    courseName: "Creative Multimedia Production",
  },
];

// Blog post placeholders (would come from WordPress API)
const blogPosts = [
  {
    id: 1,
    title: "The Future of EdTech in India",
    excerpt: "Exploring how technology is reshaping the Indian education landscape...",
    date: "2024-12-15",
  },
  {
    id: 2,
    title: "Design Thinking in Education",
    excerpt: "Why every educator needs to embrace design thinking methodologies...",
    date: "2024-11-28",
  },
  {
    id: 3,
    title: "Lessons from 100K Learners",
    excerpt: "Key insights from teaching over 100,000 students through MOOCs...",
    date: "2024-10-20",
  },
];

function CourseStatCard({
  value,
  label,
  isVisible,
}: {
  value: number;
  label: string;
  isVisible: boolean;
}) {
  const animated = useAnimatedCounter({ end: value, duration: 2500, enabled: isVisible });
  return (
    <div className="text-center">
      <p className="text-3xl md:text-4xl font-heading font-bold gradient-text">
        {formatNumber(animated)}+
      </p>
      <p className="text-sm text-muted font-body mt-1">{label}</p>
    </div>
  );
}

export default function GlobalClassroomPage() {
  const [refCourses, isCoursesVisible] = useIntersectionObserver<HTMLDivElement>({
    threshold: 0.1,
  });
  const [refTestimonials, isTestimonialsVisible] =
    useIntersectionObserver<HTMLDivElement>({ threshold: 0.1 });
  const [refBlog, isBlogVisible] = useIntersectionObserver<HTMLDivElement>({
    threshold: 0.1,
  });
  const [refStats, isStatsVisible] = useIntersectionObserver<HTMLDivElement>({
    threshold: 0.3,
  });

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
                Blogger · Professor · Speaker
              </p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-4">
                The Global{" "}
                <span className="gradient-text">Classroom</span>
              </h1>
              <p className="text-muted font-body max-w-2xl text-lg leading-relaxed">
                Teaching the world one learner at a time — over 100,000 students
                reached through MOOCs on NPTEL, SWAYAM, IITBombayX, and edX.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Stats Banner */}
        <section className="py-12 px-6 bg-[var(--surface-alt)]" ref={refStats}>
          <div className="section-container">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <CourseStatCard value={100000} label="Learners Reached" isVisible={isStatsVisible} />
              <CourseStatCard value={4} label="MOOC Platforms" isVisible={isStatsVisible} />
              <CourseStatCard value={176181} label="Blog Visits" isVisible={isStatsVisible} />
              <CourseStatCard value={25} label="Years Teaching" isVisible={isStatsVisible} />
            </div>
          </div>
        </section>

        {/* MOOCs Hub */}
        <section className="py-20 px-6" ref={refCourses}>
          <div className="section-container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isCoursesVisible ? { opacity: 1, y: 0 } : {}}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-3">
                MOOCs <span className="gradient-text">Hub</span>
              </h2>
              <p className="text-muted font-body max-w-lg mx-auto">
                Courses that have reached learners across 50+ countries
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {courses.map((course, i) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isCoursesVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: i * 0.1 }}
                  className="glass-card p-6 flex flex-col group"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`text-xs px-3 py-1 rounded-full font-body font-medium ${
                        platformColors[course.platform] || "bg-gray-500/10 text-gray-500"
                      }`}
                    >
                      {course.platform}
                    </span>
                    <div className="flex items-center gap-1.5 text-muted">
                      <Users className="w-4 h-4" />
                      <span className="text-sm font-body">
                        {formatNumber(course.enrollments)}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-lg font-heading font-semibold mb-2 group-hover:text-accent transition-colors">
                    {course.title}
                  </h3>

                  <p className="text-sm text-muted font-body leading-relaxed mb-4 flex-1">
                    {course.description}
                  </p>

                  <a
                    href={course.url}
                    className="inline-flex items-center gap-2 text-sm text-accent font-body font-medium group/link"
                  >
                    <span>View Course</span>
                    <ExternalLink className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 transition-transform" />
                  </a>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 px-6 bg-[var(--surface-alt)]" ref={refTestimonials}>
          <div className="section-container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isTestimonialsVisible ? { opacity: 1, y: 0 } : {}}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-3">
                Learner <span className="gradient-text">Voices</span>
              </h2>
              <p className="text-muted font-body max-w-lg mx-auto">
                What students and educators say about the experience
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {testimonials.map((testimonial, i) => (
                <motion.div
                  key={testimonial.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isTestimonialsVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: i * 0.1 }}
                  className="glass-card p-6"
                >
                  <Quote className="w-8 h-8 text-accent/20 mb-3" />

                  <p className="text-foreground font-body leading-relaxed mb-4 italic">
                    &ldquo;{testimonial.content}&rdquo;
                  </p>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-heading font-semibold text-sm">
                        {testimonial.name}
                      </p>
                      <p className="text-xs text-muted font-body">
                        {testimonial.role}
                      </p>
                    </div>
                    <div className="flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, j) => (
                        <Star
                          key={j}
                          className={`w-3.5 h-3.5 ${
                            j < testimonial.rating
                              ? "text-amber-400 fill-amber-400"
                              : "text-muted/20"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Blog Integration */}
        <section className="py-20 px-6" ref={refBlog}>
          <div className="section-container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isBlogVisible ? { opacity: 1, y: 0 } : {}}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-3">
                From the <span className="gradient-text">Blog</span>
              </h2>
              <p className="text-muted font-body max-w-lg mx-auto">
                Thoughts, reflections, and insights from the 1000 Brains blog
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {blogPosts.map((post, i) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isBlogVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: i * 0.1 }}
                  className="glass-card p-6 group cursor-pointer"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <PenTool className="w-4 h-4 text-accent" />
                    <span className="text-xs text-muted font-body">{post.date}</span>
                  </div>
                  <h3 className="font-heading font-semibold mb-2 group-hover:text-accent transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-sm text-muted font-body mb-4">
                    {post.excerpt}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-sm text-accent font-body font-medium">
                    Read more
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
