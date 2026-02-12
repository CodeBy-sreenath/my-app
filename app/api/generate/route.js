import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db";
import Project from "@/app/lib/models/project";

export async function POST(req) {
  try {
    const { branch, skills, time } = await req.json();

    if (!branch || !skills || !time) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    await connectDB();

    const prompt = `
You are ProjectGenie, an expert AI software architect.

Generate a detailed project idea for:

Branch: ${branch}
Skills: ${skills}
Time Available: ${time}

Provide:
1. Project Title
2. Description
3. Features
4. Tech Stack
5. Architecture Overview
6. Resume Description
`;

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "http://localhost:3000", // required
        "X-Title": "ProjectGenie", // required
      },
      body: JSON.stringify({
        model: "mistralai/mistral-7b-instruct",
        messages: [
          { role: "user", content: prompt }
        ],
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error(data);
      return NextResponse.json(
        { error: "OpenRouter API error" },
        { status: 500 }
      );
    }

    const responseText = data.choices[0].message.content;

    const savedProject = await Project.create({
      branch,
      skills,
      time,
      result: responseText,
      createdAt: new Date(),
    });

    return NextResponse.json({
      success: true,
      project: savedProject,
    });

  } catch (error) {
    console.error("API ERROR:", error);

    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
