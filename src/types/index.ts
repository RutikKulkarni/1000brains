/* ============================================
   1000brains Portfolio — Shared TypeScript Types
   ============================================ */

// ---------- Film ----------
export interface IFilm {
  _id?: string;
  title: string;
  subtitle: string;
  description: string;
  category: "documentary" | "educational" | "short";
  thumbnail: string;
  videoUrl?: string;
  awards: string[];
  year: number;
  featured: boolean;
  order: number;
  createdAt: Date;
}

// ---------- Project (3D / Calligraphy / Design) ----------
export interface IProject {
  _id?: string;
  title: string;
  description: string;
  category: "3d-visualization" | "calligraphy" | "design";
  images: string[];
  tools: string[];
  featured: boolean;
  order: number;
  createdAt: Date;
}

// ---------- Course (MOOCs) ----------
export interface ICourse {
  _id?: string;
  title: string;
  platform: "SWAYAM" | "NPTEL" | "IITBombayX" | "edX" | "other";
  enrollments: number;
  description: string;
  url: string;
  thumbnail: string;
  featured: boolean;
  order: number;
  createdAt: Date;
}

// ---------- Research ----------
export interface IResearch {
  _id?: string;
  title: string;
  authors: string[];
  journal: string;
  year: number;
  abstract: string;
  doi?: string;
  pdfUrl?: string;
  tags: string[];
  status: "published" | "in-progress" | "funded";
  fundingSource?: string;
  createdAt: Date;
}

// ---------- Testimonial ----------
export interface ITestimonial {
  _id?: string;
  name: string;
  role: string;
  content: string;
  avatar?: string;
  rating?: number;
  courseName?: string;
  featured: boolean;
  createdAt: Date;
}

// ---------- Talk (Speaking Events / Workshops) ----------
export interface ITalk {
  _id?: string;
  title: string;
  type: "keynote" | "workshop" | "panel" | "guest-lecture";
  event: string;
  venue: string;
  date: Date;
  description: string;
  slidesUrl?: string;
  videoUrl?: string;
  featured: boolean;
  createdAt: Date;
}

// ---------- Site Settings (Singleton) ----------
export interface ISiteSettings {
  _id?: string;
  bio: string;
  tagline: string;
  profileImage: string;
  stats: {
    learners: number;
    blogVisits: number;
    yearsExperience: number;
    phdScholars: number;
  };
  socialLinks: {
    linkedin?: string;
    twitter?: string;
    youtube?: string;
    blog?: string;
    email: string;
  };
  cvUrl: string;
  phdScholars: Array<{
    name: string;
    institution: string;
    topic?: string;
  }>;
}

// ---------- The 10 Traits ----------
export interface ITrait {
  id: number;
  name: string;
  description: string;
  icon: string; // Lucide icon name
}

export const TRAITS: ITrait[] = [
  { id: 1, name: "Designer", description: "Visual/spatial design, BFA background", icon: "Palette" },
  { id: 2, name: "Film-maker", description: "Award-nominated documentary & educational films", icon: "Film" },
  { id: 3, name: "Animator", description: "3D visualization, ZICA-trained", icon: "Box" },
  { id: 4, name: "EdTech Researcher", description: "ICSSR-funded research, augmented podcasts", icon: "FlaskConical" },
  { id: 5, name: "Professor", description: "Professor of Practice in Design at IIT Gandhinagar", icon: "GraduationCap" },
  { id: 6, name: "Blogger", description: "1000 Brains blog — 176,181+ total visits", icon: "PenTool" },
  { id: 7, name: "Speaker", description: "Design thinking keynotes & workshops", icon: "Mic" },
  { id: 8, name: "Percussionist", description: "Rhythmic patterns intersecting design", icon: "Music" },
  { id: 9, name: "Ideator", description: "Creative chaos and concept ideation", icon: "Lightbulb" },
  { id: 10, name: "Calligrapher", description: "Fine arts & lettering", icon: "Brush" },
];

// ---------- Portfolio Heads ----------
export interface IPortfolioHead {
  slug: string;
  title: string;
  subtitle: string;
  traits: string[];
  description: string;
}

export const PORTFOLIO_HEADS: IPortfolioHead[] = [
  {
    slug: "visual-narrative",
    title: "Visual Narrative & Design",
    subtitle: "Creating stories through visuals",
    traits: ["Animator", "Film-maker", "Designer", "Calligrapher"],
    description: "Films Archive, 3D Visualization Portfolio, Calligraphy Gallery",
  },
  {
    slug: "edtech-lab",
    title: "EdTech & Pedagogy Lab",
    subtitle: "Innovating education through technology",
    traits: ["EdTech Researcher", "Professor"],
    description: "Pedagogical Framework (LCM), Institutional Leadership, Live Research Feed",
  },
  {
    slug: "global-classroom",
    title: "The Global Classroom",
    subtitle: "Teaching the world, one learner at a time",
    traits: ["Blogger", "Professor", "Speaker"],
    description: "MOOCs Hub (100,000+ learners), Blog Integration, Learner Testimonials",
  },
  {
    slug: "interdisciplinary",
    title: "Interdisciplinary Expression",
    subtitle: "Where art meets science",
    traits: ["Percussionist", "Ideator", "Speaker", "Designer"],
    description: "The Percussionist & Ideator, Academic Intersection, Design Thinking Keynotes",
  },
];

// ---------- WordPress Blog Post ----------
export interface IWordPressPost {
  id: number;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };
  date: string;
  link: string;
  _embedded?: {
    "wp:featuredmedia"?: Array<{ source_url: string }>;
  };
}

// ---------- Navigation ----------
export interface INavItem {
  label: string;
  href: string;
}

export const NAV_ITEMS: INavItem[] = [
  { label: "Home", href: "/" },
  { label: "Visual Narrative", href: "/visual-narrative" },
  { label: "EdTech Lab", href: "/edtech-lab" },
  { label: "Global Classroom", href: "/global-classroom" },
  { label: "Interdisciplinary", href: "/interdisciplinary" },
  { label: "About", href: "/about" },
];
