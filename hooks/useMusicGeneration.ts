import { useState } from "react";
import { polishPrompt, generateMusic } from "@/services/api";

export function useMusicGeneration() {
  const [prompt, setPrompt] = useState("");
  const [polishedPrompt, setPolishedPrompt] = useState<string | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPolishing, setIsPolishing] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  let timerInterval: NodeJS.Timeout;

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
      setElapsedTime(0);
      
      timerInterval = setInterval(() => {
        setElapsedTime(prev => prev + 1);
      }, 1000);

      const response = await generateMusic(textToUse);
      const url = URL.createObjectURL(response);
      setAudioUrl(url);
    } catch (error) {
      console.error("Error generating music:", error);
    } finally {
      clearInterval(timerInterval);
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