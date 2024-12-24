export async function polishPrompt(prompt: string) {
    const response = await fetch("/api/polish", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
    });

    if (!response.ok) {
        throw new Error("Failed to polish prompt");
    }

    const result = await response.json();
    return result.polishedPrompt;
}

export async function generateMusic(prompt: string) {
    const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
    });

    if (!response.ok) {
        throw new Error("Failed to generate music");
    }

    return response.blob();
}