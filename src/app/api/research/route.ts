import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Research from "@/models/Research";
import { auth } from "@/lib/auth";

export async function GET() {
  try {
    await connectDB();
    const papers = await Research.find().sort({ year: -1, createdAt: -1 });
    return NextResponse.json(papers);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch research" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    await connectDB();
    const body = await request.json();
    const paper = await Research.create(body);
    return NextResponse.json(paper, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create research" }, { status: 500 });
  }
}
