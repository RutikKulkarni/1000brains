import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Film from "@/models/Film";
import { auth } from "@/lib/auth";

// GET /api/films — List all films (public)
export async function GET() {
  try {
    await connectDB();
    const films = await Film.find().sort({ order: 1, createdAt: -1 });
    return NextResponse.json(films);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch films" },
      { status: 500 }
    );
  }
}

// POST /api/films — Create film (admin only)
export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const body = await request.json();
    const film = await Film.create(body);
    return NextResponse.json(film, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create film" },
      { status: 500 }
    );
  }
}
