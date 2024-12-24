import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface MusicVisualizerCardProps {
  audioUrl: string | null;
  isGenerating: boolean;
  elapsedTime: number;
  prompt: string;
  polishedPrompt: string | null;
}

export function MusicVisualizerCard({
  audioUrl,
  isGenerating,
  elapsedTime,
  prompt,
  polishedPrompt,
}: MusicVisualizerCardProps) {
  return (
    <Card className="mt-8 overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-stretch">
        {/* 左侧宇宙风格音乐可视化区域 */}
        <div className="w-1/3 bg-black p-8 relative overflow-hidden">
          {/* 星空背景效果 - 增加更多星星和大小变化 */}
          <div className="absolute inset-0 opacity-50">
            {[...Array(100)].map((_, i) => (
              <div
                key={i}
                className="absolute bg-white rounded-full animate-twinkle"
                style={{
                  width: `${Math.random() * 2 + 1}px`,
                  height: `${Math.random() * 2 + 1}px`,
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 5}s`,
                  animationDuration: `${1 + Math.random() * 4}s`,
                  opacity: Math.random() * 0.7 + 0.3
                }}
              />
            ))}
          </div>
          
          {/* 中央音乐可视化圆环 - 增加律动效果 */}
          <div className="relative z-10">
            <div className="aspect-square w-full rounded-full bg-gradient-to-b from-white/10 to-transparent p-1 backdrop-blur-sm animate-pulse">
              <div className="w-full h-full rounded-full bg-black flex items-center justify-center relative">
                {/* 多层动态圆环 - 增加更多层次 */}
                <div className="absolute inset-0 rounded-full border border-white/20 animate-pulse" />
                <div className="absolute inset-1 rounded-full border border-white/15 animate-ping [animation-duration:4s]" />
                <div className="absolute inset-2 rounded-full border border-white/10 animate-pulse [animation-delay:1s]" />
                <div className="absolute inset-3 rounded-full border border-white/25 animate-ping [animation-duration:3s]" />
                <div className="absolute inset-4 rounded-full border border-white/10 animate-pulse [animation-delay:0.5s]" />
                <div className="absolute inset-5 rounded-full border border-white/20 animate-ping [animation-duration:5s]" />
              </div>
            </div>

            {/* 底部音波效果 - 增加动态变化 */}
            <div className="mt-8 space-y-1">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="h-0.5 bg-white/20 rounded-full animate-pulse"
                  style={{
                    width: `${20 + Math.random() * 80}%`,
                    animationDelay: `${i * 0.1}s`,
                    animationDuration: `${0.5 + Math.random() * 2}s`,
                    transform: `scaleY(${1 + Math.random() * 0.5})`
                  }}
                />
              ))}
            </div>
          </div>

          {/* 漂浮粒子效果 - 增加更多粒子和变化 */}
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute bg-white/20 rounded-full animate-float"
              style={{
                width: `${Math.random() * 3}px`,
                height: `${Math.random() * 3}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 7}s`,
                animationDuration: `${4 + Math.random() * 6}s`,
                transform: `scale(${1 + Math.random()})`,
                opacity: Math.random() * 0.5 + 0.5
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

            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>{isGenerating ? `Generating: ${elapsedTime}s` : 'Ready to generate'}</span>
              </div>
              {audioUrl && (
                <Button 
                  variant="secondary"
                  size="sm"
                  className="hover:scale-105 transition-transform duration-200"
                  onClick={() => {
                    const a = document.createElement('a');
                    a.href = audioUrl;
                    a.download = 'generated-music.wav';
                    a.click();
                  }}
                >
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    />
                  </svg>
                  Download Track
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
} 