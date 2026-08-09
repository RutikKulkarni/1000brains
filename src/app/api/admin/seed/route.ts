import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Trait from "@/models/Trait";
import NavigationItem from "@/models/NavigationItem";
import Film from "@/models/Film";
import Project from "@/models/Project";
import Course from "@/models/Course";
import Research from "@/models/Research";
import Testimonial from "@/models/Testimonial";
import Talk from "@/models/Talk";

const DEFAULT_NAV = [
  { label: "Home", href: "/", order: 0, active: true },
  { label: "Visual Narrative", href: "/visual-narrative", order: 1, active: true },
  { label: "EdTech Lab", href: "/edtech-lab", order: 2, active: true },
  { label: "Global Classroom", href: "/global-classroom", order: 3, active: true },
  { label: "Interdisciplinary", href: "/interdisciplinary", order: 4, active: true },
  { label: "About", href: "/about", order: 5, active: true },
];

const DEFAULT_TRAITS = [
  { name: "Designer", description: "Visual/spatial design, BFA background", icon: "Palette", targetUrl: "/visual-narrative", order: 0 },
  { name: "Film-maker", description: "Award-nominated documentary & educational films", icon: "Film", targetUrl: "/visual-narrative", order: 1 },
  { name: "Animator", description: "3D visualization, ZICA-trained", icon: "Box", targetUrl: "/visual-narrative", order: 2 },
  { name: "EdTech Researcher", description: "ICSSR-funded research, augmented podcasts", icon: "FlaskConical", targetUrl: "/edtech-lab", order: 3 },
  { name: "Professor", description: "Professor of Practice in Design at IIT Gandhinagar", icon: "GraduationCap", targetUrl: "/about", order: 4 },
  { name: "Blogger", description: "1000 Brains blog — 176,181+ total visits", icon: "PenTool", targetUrl: "/global-classroom", order: 5 },
  { name: "Speaker", description: "Design thinking keynotes & workshops", icon: "Mic", targetUrl: "/interdisciplinary", order: 6 },
  { name: "Percussionist", description: "Rhythmic patterns intersecting design", icon: "Music", targetUrl: "/interdisciplinary", order: 7 },
  { name: "Ideator", description: "Creative chaos and concept ideation", icon: "Lightbulb", targetUrl: "/interdisciplinary", order: 8 },
  { name: "Calligrapher", description: "Fine arts & lettering", icon: "Brush", targetUrl: "/visual-narrative", order: 9 },
];

const DEFAULT_FILMS = [
  { title: "In Their Shoes", subtitle: "A documentary on design thinking", description: "Examines the role of empathy in creative solution-making, highlighting practitioners across design domains in India.", category: "documentary", year: 2021, featured: true, awards: ["Best Film - EdTech Awards 2021", "Official Selection Helsinki Docs"], thumbnail: "", videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" },
  { title: "Digital Design Basics", subtitle: "Educational animation series", description: "Visual guide to visual hierarchies, fonts, grids, and blueprint design principles for novice designers.", category: "educational", year: 2022, featured: true, awards: ["IITGN Pedagogy Innovation Grant"], thumbnail: "", videoUrl: "" },
  { title: "Calligraphy Masterclass", subtitle: "Short form art showcase", description: "Capturing the tactile strokes of Indian inks on handmade papers, showcasing the convergence of sound and letters.", category: "short", year: 2023, featured: false, awards: [], thumbnail: "", videoUrl: "" }
];

const DEFAULT_PROJECTS = [
  { title: "3D Temple Visualization", category: "3d-visualization", description: "Virtual reconstruction of architectural ruins using high-fidelity Blender renders and spatial animation guides.", tools: ["Blender", "Photoshop", "Unity"], featured: true },
  { title: "Ganesha Calligraphy Series", category: "calligraphy", description: "tactile letterforms integrating Sanskrit mantras and rhythmic patterns of classical percussion beats.", tools: ["Indian Ink", "Handmade Paper", "Brushes"], featured: true },
  { title: "Design Thinking Workshop Kits", category: "design", description: "Empathy maps, journey mapping templates, and brainstorm cards used by practice scholars globally.", tools: ["Figma", "Illustrator", "Miro"], featured: false }
];

const DEFAULT_COURSES = [
  { title: "Introduction to UX Design", platform: "SWAYAM", enrollments: 45000, description: "Core principles of user-centered design, prototyping, cognitive load, and human-computer interactions.", url: "https://swayam.gov.in", thumbnail: "", featured: true, order: 0 },
  { title: "3D Modeling Foundations", platform: "NPTEL", enrollments: 32000, description: "Poly modeling, texturing, rigging, and dynamic lighting layouts for spatial narratives.", url: "https://nptel.ac.in", thumbnail: "", featured: true, order: 1 }
];

const DEFAULT_RESEARCH = [
  { title: "Visual Thinking in EdTech Pedagogy", authors: ["S. Sahasrabudhe", "R. Kulkarni"], journal: "IEEE Transactions on Education", year: 2022, abstract: "This paper presents a framework for integrating visual and sketch note systems inside augmented video lectures to improve cognitive retention.", doi: "https://doi.org/10.1109/TE.2022.12345", pdfUrl: "", tags: ["EdTech", "Visual Thinking", "Pedagogy"], status: "published" },
  { title: "LCM Framework: Case Studies in Blended Learning", authors: ["S. Sahasrabudhe", "A. Iyer"], journal: "AERA Open", year: 2023, abstract: "A multi-institutional evaluation of the Learner-Centric MOOC (LCM) design framework on user persistence and active learning behaviors.", doi: "https://doi.org/10.1177/2332858423123456", pdfUrl: "", tags: ["LCM", "MOOCs", "Blended Learning"], status: "published" }
];

const DEFAULT_TESTIMONIALS = [
  { content: "Prof. Sameer's courses completely transformed my design perspective and understanding of user experience.", name: "Siddharth Mehta", role: "UX Lead at Google India", rating: 5, courseName: "Introduction to UX Design" },
  { content: "An inspiring mentor who bridges the gap between technology and fine arts seamlessly.", name: "Arundhati Sen", role: "PhD Scholar at IITGN", rating: 5, courseName: "Research Mentor" }
];

const DEFAULT_TALKS = [
  { title: "Keynote: Designing the Future of Learning", type: "keynote", event: "Design Summit 2023", venue: "IIT Bombay", date: new Date("2023-11-15"), description: "Reimagining educational delivery systems using design thinking, visual narrative tools, and learner agency.", slidesUrl: "", videoUrl: "", featured: true },
  { title: "Workshop: Interactive Calligraphy Practice", type: "workshop", event: "TypoDay 2022", venue: "IDC School of Design", date: new Date("2022-03-10"), description: "Hands-on calligraphy training exploring spatial geometry, stroke speed, and rhythmic patterns.", slidesUrl: "", videoUrl: "", featured: false }
];

export async function GET() {
  try {
    await connectDB();

    let navCount = await NavigationItem.countDocuments();
    let traitsCount = await Trait.countDocuments();
    let filmCount = await Film.countDocuments();
    let projectCount = await Project.countDocuments();
    let courseCount = await Course.countDocuments();
    let researchCount = await Research.countDocuments();
    let testimonialCount = await Testimonial.countDocuments();
    let talkCount = await Talk.countDocuments();

    let seededNav = false;
    let seededTraits = false;
    let seededFilms = false;
    let seededProjects = false;
    let seededCourses = false;
    let seededResearch = false;
    let seededTestimonials = false;
    let seededTalks = false;

    if (navCount === 0) {
      await NavigationItem.create(DEFAULT_NAV);
      seededNav = true;
    }

    if (traitsCount === 0) {
      await Trait.create(DEFAULT_TRAITS);
      seededTraits = true;
    }

    if (filmCount === 0) {
      await Film.create(DEFAULT_FILMS);
      seededFilms = true;
    }

    if (projectCount === 0) {
      await Project.create(DEFAULT_PROJECTS);
      seededProjects = true;
    }

    if (courseCount === 0) {
      await Course.create(DEFAULT_COURSES);
      seededCourses = true;
    }

    if (researchCount === 0) {
      await Research.create(DEFAULT_RESEARCH);
      seededResearch = true;
    }

    if (testimonialCount === 0) {
      await Testimonial.create(DEFAULT_TESTIMONIALS);
      seededTestimonials = true;
    }

    if (talkCount === 0) {
      await Talk.create(DEFAULT_TALKS);
      seededTalks = true;
    }

    return NextResponse.json({
      message: "Seeding complete!",
      status: {
        navigation: { seeded: seededNav, count: await NavigationItem.countDocuments() },
        traits: { seeded: seededTraits, count: await Trait.countDocuments() },
        films: { seeded: seededFilms, count: await Film.countDocuments() },
        projects: { seeded: seededProjects, count: await Project.countDocuments() },
        courses: { seeded: seededCourses, count: await Course.countDocuments() },
        research: { seeded: seededResearch, count: await Research.countDocuments() },
        testimonials: { seeded: seededTestimonials, count: await Testimonial.countDocuments() },
        talks: { seeded: seededTalks, count: await Talk.countDocuments() },
      }
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
