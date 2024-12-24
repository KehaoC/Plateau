import { NextResponse } from "next/server";
import Groq from "groq-sdk";

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json();
    console.log("prompt:", prompt)

    const groq = new Groq({
      apiKey: process.env.NEXT_PUBLIC_GROQ_API_KEY
    });

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant that improves music generation prompts. Your task is to make prompts more detailed and specific for better music generation, while keeping the original intent. Respond ONLY with the improved prompt, without any explanations or additional text."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      model: "llama3-8b-8192",
      temperature: 0.7,
    });

    const polishedPrompt = completion.choices[0]?.message?.content;
    
    return NextResponse.json({ polishedPrompt: polishedPrompt || prompt });
  } catch (error) {
    console.error("Error in polish route:", error);
    return NextResponse.json(
      { error: "Failed to polish prompt" },
      { status: 500 }
    );
  }
} 