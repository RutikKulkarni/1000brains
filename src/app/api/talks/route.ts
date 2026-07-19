import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Talk from "@/models/Talk";
import { auth } from "@/lib/auth";

export async function GET() {
  try {
    await connectDB();
    const talks = await Talk.find().sort({ date: -1 });
    return NextResponse.json(talks);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch talks" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    await connectDB();
    const body = await request.json();
    const talk = await Talk.create(body);
    return NextResponse.json(talk, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create talk" }, { status: 500 });
  }
}
