import { NextResponse } from "next/server";
import Groq from "groq-sdk";

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json();
    console.log("prompt:", prompt)

    const data = await fetch('http://127.0.0.1:8000/polish', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        text: prompt
      })
    })

    const polishedPrompt = await data.text()
    console.log("polishedPrompt:", polishedPrompt)
    
    return NextResponse.json({ polishedPrompt: polishedPrompt || prompt });
  } catch (error) {
    console.error("Error in polish route:", error);
    return NextResponse.json(
      { error: "Failed to polish prompt" },
      { status: 500 }
    );
  }
} 