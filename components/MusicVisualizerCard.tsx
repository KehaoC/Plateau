import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Music } from "@/lib/types";
import { useEffect, useState } from "react";

interface MusicVisualizerCardProps {
  audioUrl: string | null;
  isGenerating: boolean;
  elapsedTime: number;
  prompt: string;
  polishedPrompt: string | null;
}

interface StarStyle {
  width: number;
  height: number;
  top: string;
  left: string;
  delay: string;
  duration: string;
  opacity: number;
}

interface WaveStyle {
  width: string;
  delay: string;
  duration: string;
  scale: number;
}

interface ParticleStyle {
  width: number;
  height: number;
  top: string;
  left: string;
  delay: string;
  duration: string;
  scale: number;
  opacity: number;
}

export function MusicVisualizerCard({
  audioUrl,
  isGenerating,
  elapsedTime,
  prompt,
  polishedPrompt,
}: MusicVisualizerCardProps) {
  const [isMakingMusic, setIsMakingMusic] = useState(false);
  const [starStyles, setStarStyles] = useState<StarStyle[]>([]);
  const [waveStyles, setWaveStyles] = useState<WaveStyle[]>([]);
  const [particleStyles, setParticleStyles] = useState<ParticleStyle[]>([]);

  useEffect(() => {
    // Generate static styles on mount
    const stars = Array.from({ length: 100 }, () => ({
      width: Math.random() * 2 + 1,
      height: Math.random() * 2 + 1,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 5}s`,
      duration: `${1 + Math.random() * 4}s`,
      opacity: Math.random() * 0.7 + 0.3
    }));

    const waves = Array.from({ length: 8 }, () => ({
      width: `${20 + Math.random() * 80}%`,
      delay: `${Math.random() * 0.5}s`,
      duration: `${0.5 + Math.random() * 2}s`,
      scale: 1 + Math.random() * 0.5
    }));

    const particles = Array.from({ length: 20 }, () => ({
      width: Math.random() * 3,
      height: Math.random() * 3,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 7}s`,
      duration: `${4 + Math.random() * 6}s`,
      scale: 1 + Math.random(),
      opacity: Math.random() * 0.5 + 0.5
    }));

    setStarStyles(stars);
    setWaveStyles(waves);
    setParticleStyles(particles);
  }, []);

  function handleMakeMusic() {
    console.log("make music");
    setIsMakingMusic(true);
  }

  return (
    <Card className="mt-8 overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-stretch">
        {/* 左侧宇宙风格音乐可视化区域 */}
        <div className="w-1/3 bg-black p-8 relative overflow-hidden">
          {/* 星空背景效果 */}
          <div className="absolute inset-0 opacity-50">
            {starStyles.map((style, i) => (
              <div
                key={i}
                className="absolute bg-white rounded-full animate-twinkle"
                style={{
                  width: `${style.width}px`,
                  height: `${style.height}px`,
                  top: style.top,
                  left: style.left,
                  animationDelay: style.delay,
                  animationDuration: style.duration,
                  opacity: style.opacity
                }}
              />
            ))}
          </div>

          {/* 中央音乐可视化圆环 */}
          <div className="relative z-10">
            <div className="aspect-square w-full rounded-full bg-gradient-to-b from-white/10 to-transparent p-1 backdrop-blur-sm animate-pulse">
              <div className="w-full h-full rounded-full bg-black flex items-center justify-center relative">
                <div className="absolute inset-0 rounded-full border border-white/20 animate-pulse" />
                <div className="absolute inset-1 rounded-full border border-white/15 animate-ping [animation-duration:4s]" />
                <div className="absolute inset-2 rounded-full border border-white/10 animate-pulse [animation-delay:1s]" />
                <div className="absolute inset-3 rounded-full border border-white/25 animate-ping [animation-duration:3s]" />
                <div className="absolute inset-4 rounded-full border border-white/10 animate-pulse [animation-delay:0.5s]" />
                <div className="absolute inset-5 rounded-full border border-white/20 animate-ping [animation-duration:5s]" />
              </div>
            </div>

            {/* 底部音波效果 */}
            <div className="mt-8 space-y-1">
              {waveStyles.map((style, i) => (
                <div
                  key={i}
                  className="h-0.5 bg-white/20 rounded-full animate-pulse"
                  style={{
                    width: style.width,
                    animationDelay: style.delay,
                    animationDuration: style.duration,
                    transform: `scaleY(${style.scale})`
                  }}
                />
              ))}
            </div>
          </div>

          {/* 漂浮粒子效果 */}
          {particleStyles.map((style, i) => (
            <div
              key={i}
              className="absolute bg-white/20 rounded-full animate-float"
              style={{
                width: `${style.width}px`,
                height: `${style.height}px`,
                top: style.top,
                left: style.left,
                animationDelay: style.delay,
                animationDuration: style.duration,
                transform: `scale(${style.scale})`,
                opacity: style.opacity
              }}
            />
          ))}
        </div>

        {/* 右侧内容区域 */}
        <div className="flex-1 p-8 bg-gradient-to-br from-background to-muted/50">
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-semibold tracking-tight mb-2">
                {audioUrl ? 'Your Generated Music' : 'Ready to Generate'}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {audioUrl ? (polishedPrompt || prompt) : 'Enter a prompt above to generate your unique music...'}
              </p>
            </div>

            <div className="bg-background/80 backdrop-blur rounded-xl p-4 shadow-inner">
              {audioUrl ? (
                <audio controls className="w-full">
                  <source src={audioUrl} type="audio/wav" />
                  Your browser does not support the audio element.
                </audio>
              ) : (
                <div className="h-12 flex items-center justify-center text-sm text-muted-foreground">
                  Audio player will appear here
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
} 