import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import NavigationItem from "@/models/NavigationItem";
import { auth } from "@/lib/auth";

export async function GET() {
  try {
    await connectDB();
    const navItems = await NavigationItem.find().sort({ order: 1 });
    return NextResponse.json(navItems);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch navigation items" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    await connectDB();
    const body = await request.json();
    const navItem = await NavigationItem.create(body);
    return NextResponse.json(navItem, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create navigation item" }, { status: 500 });
  }
}
