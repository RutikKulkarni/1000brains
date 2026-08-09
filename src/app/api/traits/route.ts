import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Trait from "@/models/Trait";
import { auth } from "@/lib/auth";

export async function GET() {
  try {
    await connectDB();
    const traits = await Trait.find().sort({ order: 1 });
    return NextResponse.json(traits);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch traits" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    await connectDB();
    const body = await request.json();
    const trait = await Trait.create(body);
    return NextResponse.json(trait, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create trait" }, { status: 500 });
  }
}
