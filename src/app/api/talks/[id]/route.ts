import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Talk from "@/models/Talk";
import { auth } from "@/lib/auth";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await connectDB();
    const talk = await Talk.findById(id);
    if (!talk) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(talk);
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
    const talk = await Talk.findByIdAndUpdate(id, body, { new: true });
    if (!talk) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(talk);
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
    const talk = await Talk.findByIdAndDelete(id);
    if (!talk) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ message: "Deleted" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}
