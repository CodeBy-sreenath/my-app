import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db";
import Project from "@/app/lib/models/project";

export async function GET() {
  try {
    await connectDB();

    const projects = await Project.find().sort({ createdAt: -1 });

    return NextResponse.json({ projects });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}
