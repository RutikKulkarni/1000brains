import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import SiteSettings from "@/models/SiteSettings";
import { auth } from "@/lib/auth";

// GET /api/settings — Get site settings (public)
export async function GET() {
  try {
    await connectDB();
    let settings = await SiteSettings.findOne();
    if (!settings) {
      // Return default settings if none exist
      settings = {
        bio: "Professor of Practice in Design at IIT Gandhinagar",
        tagline: "10 traits, 1 digital identity",
        profileImage: "",
        stats: { learners: 100000, blogVisits: 176181, yearsExperience: 25, phdScholars: 3 },
        socialLinks: { email: "sameer@iitgn.ac.in" },
        cvUrl: "",
        phdScholars: [
          { name: "Adithi Iyer", institution: "IIT Gandhinagar" },
          { name: "Devesh Kumar", institution: "IIT Gandhinagar" },
          { name: "Pyla Gangatathalli", institution: "IIT Gandhinagar" },
        ],
      };
    }
    return NextResponse.json(settings);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 });
  }
}

// PUT /api/settings — Update site settings (admin only, upsert)
export async function PUT(request: NextRequest) {
  try {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    await connectDB();
    const body = await request.json();
    const settings = await SiteSettings.findOneAndUpdate(
      {},
      body,
      { new: true, upsert: true }
    );
    return NextResponse.json(settings);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update settings" }, { status: 500 });
  }
}
