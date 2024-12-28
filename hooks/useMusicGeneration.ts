import { useState, useEffect, useRef } from "react";
import { polishPrompt, generateMusic } from "@/services/api";

export function useMusicGeneration() {
  const [prompt, setPrompt] = useState("");
  const [polishedPrompt, setPolishedPrompt] = useState<string | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPolishing, setIsPolishing] = useState(false);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Cleanup audio URL on unmount
  useEffect(() => {
    return () => {
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }
    };
  }, [audioUrl]);

  useEffect(() => {
    if (isGenerating) {
      setElapsedTime(0);
      timerRef.current = setInterval(() => {
        setElapsedTime(prev => prev + 1);
      }, 1000);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isGenerating]);

  const handlePolish = async () => {
    try {
      setIsPolishing(true);
      const result = await polishPrompt(prompt);
      setPolishedPrompt(result);
    } catch (error) {
      console.error("Error in polishing:", error);
    } finally {
      setIsPolishing(false);
    }
  };

  const handleGenerate = async (textToUse: string) => {
    try {
      setIsGenerating(true);
      const blob = await generateMusic(textToUse);
      const url = URL.createObjectURL(blob);
      setAudioUrl(url);
    } catch (error) {
      console.error("Error generating music:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleUseOriginal = () => {
    setPolishedPrompt(null);
    handleGenerate(prompt);
  };

  return {
    prompt,
    setPrompt,
    polishedPrompt,
    audioUrl,
    isGenerating,
    isPolishing,
    elapsedTime,
    handlePolish,
    handleGenerate,
    handleUseOriginal,
  };
}