import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Trait from "@/models/Trait";
import NavigationItem from "@/models/NavigationItem";

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

export async function GET() {
  try {
    await connectDB();

    let navCount = await NavigationItem.countDocuments();
    let traitsCount = await Trait.countDocuments();

    let seededNav = false;
    let seededTraits = false;

    if (navCount === 0) {
      await NavigationItem.create(DEFAULT_NAV);
      seededNav = true;
    }

    if (traitsCount === 0) {
      await Trait.create(DEFAULT_TRAITS);
      seededTraits = true;
    }

    return NextResponse.json({
      message: "Seeding complete!",
      navSeeded: seededNav,
      traitsSeeded: seededTraits,
      currentNavCount: await NavigationItem.countDocuments(),
      currentTraitsCount: await Trait.countDocuments(),
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
