import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const { prompt } = await request.json();
        
        if (!prompt) {
            return NextResponse.json(
                { error: "Prompt is required" },
                { status: 400 }
            );
        }

        console.log("prompt:", prompt);
        
        const response = await fetch(
            "https://api-inference.huggingface.co/models/facebook/musicgen-stereo-small",
            {
                headers: {
                    Authorization: `Bearer ${process.env.HUGGINGFACE_TOKEN}`,
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify({ inputs: prompt }),
            }
        );

        if (!response.ok) {
            throw new Error(`API responded with status: ${response.status}`);
        }

        const result = await response.blob();
        return new NextResponse(result, {
            headers: {
                'Content-Type': 'audio/wav',
            },
        });
    } catch (error) {
        console.error("Error generating music:", error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : "Failed to generate music" },
            { status: 500 }
        );
    }
}