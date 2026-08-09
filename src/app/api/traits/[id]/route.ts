import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Trait from "@/models/Trait";
import { auth } from "@/lib/auth";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await connectDB();
    const trait = await Trait.findById(id);
    if (!trait) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(trait);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const { id } = await params;
    await connectDB();
    const body = await request.json();
    const trait = await Trait.findByIdAndUpdate(id, body, { new: true });
    if (!trait) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(trait);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const { id } = await params;
    await connectDB();
    const trait = await Trait.findByIdAndDelete(id);
    if (!trait) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ message: "Deleted" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}
