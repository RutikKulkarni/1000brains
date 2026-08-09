import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import NavigationItem from "@/models/NavigationItem";
import { auth } from "@/lib/auth";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await connectDB();
    const navItem = await NavigationItem.findById(id);
    if (!navItem) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(navItem);
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
    const navItem = await NavigationItem.findByIdAndUpdate(id, body, { new: true });
    if (!navItem) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(navItem);
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
    const navItem = await NavigationItem.findByIdAndDelete(id);
    if (!navItem) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ message: "Deleted" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}
