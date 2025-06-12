import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { polishPrompt, generateMusic } from "@/services/api";
import { MusicVisualizerCard } from "./MusicVisualizerCard";

export default function MusicGeneration() {

  // prompt 辅助加工
  const [prompt, setPrompt] = useState("");
  const [polishedPrompt, setPolishedPrompt] = useState<string | null>(null);
  const [isPolishing, setIsPolishing] = useState(false);

  // 生成音乐
  const [isGenerating, setIsGenerating] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  // 计时
  const [elapsedTime, setElapsedTime] = useState(0);
  let timerInterval: NodeJS.Timeout;

  // 辅助加工
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

  // 生成音乐
  const handleGenerate = async (textToUse: string) => {
    setAudioUrl(null);
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

  // 使用原始 prompt
  const handleUseOriginal = () => {
    setPolishedPrompt(null);
    handleGenerate(prompt);
  };

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>AI Music Generation</CardTitle>
          <CardDescription>
            Generate unique music using AI. Enter a description of the music you want to create.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex gap-2">
              <Input
                placeholder="Enter your prompt (e.g., liquid drum and bass, atmospheric synths, airy sounds)"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
              <Button onClick={handlePolish} disabled={isGenerating || isPolishing || !prompt}>
                {isPolishing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Polishing...
                  </>
                ) : (
                  "Polish Prompt"
                )}
              </Button>
            </div>

            <div className="mt-4 space-y-4">
              <div className="rounded-lg border p-4 bg-muted/50">
                <h3 className="font-medium mb-2">Polished Prompt:</h3>
                <p className="text-sm">
                  {polishedPrompt || "Your polished prompt will appear here..."}
                </p>
              </div>
              <div className="flex gap-2">
                <Button 
                  onClick={() => handleGenerate(polishedPrompt || prompt)} 
                  disabled={isGenerating || !prompt}
                  className="flex-1"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    polishedPrompt ? "Use Polished Prompt" : "Generate with Original Prompt"
                  )}
                </Button>
                {polishedPrompt && (
                  <Button 
                    onClick={handleUseOriginal} 
                    disabled={isGenerating}
                    variant="outline"
                    className="flex-1"
                  >
                    Use Original Prompt
                  </Button>
                )}
              </div>
            </div>

            {(isGenerating || isPolishing) && (
              <div className="text-sm text-muted-foreground">
                {isPolishing ? "Polishing prompt..." : `Generation time: ${elapsedTime}s`}
              </div>
            )}

            {(
              <MusicVisualizerCard
                audioUrl={audioUrl}
                isGenerating={isGenerating}
                elapsedTime={elapsedTime}
                prompt={prompt}
                polishedPrompt={polishedPrompt}
              />
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
