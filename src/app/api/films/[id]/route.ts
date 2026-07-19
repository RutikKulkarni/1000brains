import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Film from "@/models/Film";
import { auth } from "@/lib/auth";

// GET /api/films/[id] — Get single film
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await connectDB();
    const film = await Film.findById(id);
    if (!film) {
      return NextResponse.json({ error: "Film not found" }, { status: 404 });
    }
    return NextResponse.json(film);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch film" }, { status: 500 });
  }
}

// PUT /api/films/[id] — Update film (admin only)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    await connectDB();
    const body = await request.json();
    const film = await Film.findByIdAndUpdate(id, body, { new: true });
    if (!film) {
      return NextResponse.json({ error: "Film not found" }, { status: 404 });
    }
    return NextResponse.json(film);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update film" }, { status: 500 });
  }
}

// DELETE /api/films/[id] — Delete film (admin only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    await connectDB();
    const film = await Film.findByIdAndDelete(id);
    if (!film) {
      return NextResponse.json({ error: "Film not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Film deleted" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete film" }, { status: 500 });
  }
}
