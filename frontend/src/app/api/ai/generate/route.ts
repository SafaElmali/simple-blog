import OpenAI from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `You are an expert in writing educational tutorials. 
            Format your response in HTML instead of markdown.
            Use proper HTML tags like <h1>, <h2>, <p>, <code>, <pre>, etc.
            For code blocks, wrap them in <pre><code> tags.
            Make content engaging and educational.
            Keep the original content's intent but enhance it.`,
        },
        {
          role: "user",
          content: `Write a detailed tutorial about: ${prompt}`,
        },
      ],
    });

    const enhancedContent = completion.choices[0].message.content;

    return NextResponse.json({
      content: enhancedContent,
    });
  } catch (error) {
    console.error("AI Error:", error);
    return NextResponse.json(
      { error: "Failed to process content" },
      { status: 500 }
    );
  }
} 