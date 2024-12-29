import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Clock, Heart, User, Tag, Music2, Stethoscope } from 'lucide-react'
import { supabase } from "@/lib/supabase"
import { useEffect, useState } from "react"
import { Music as MusicType } from "@/lib/types"
interface MusicDetailsProps {
  MusicId: number
  isOpen: boolean
  onClose: () => void
}

export function MusicDetails({ MusicId, isOpen, onClose }: MusicDetailsProps) {
  const [music, setMusic] = useState<MusicType | null>(null)
  const [imageLoading, setImageLoading] = useState(true)
  const [isLoading, setIsLoading] = useState(true)

  // 获取音乐详情
  useEffect(() => {
    async function fetchMusicDetail(){
      setIsLoading(true)
      const { data, error } = await supabase
        .from('music')
        .select('*')
        .eq('id', MusicId)
        .single()

      if (error) throw error
      setMusic(data || null)
      console.log("musicDetail:", data)
      setIsLoading(false)
    }

    fetchMusicDetail()
  }, [MusicId])

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[550px] max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            {isLoading ? (
              <div className="h-8 w-48 bg-muted animate-pulse rounded" />
            ) : (
              music?.title
            )}
          </DialogTitle>
          <DialogDescription>
            {isLoading ? (
              <span className="block h-4 w-32 bg-muted animate-pulse rounded mt-2" />
            ) : (
              music?.artist
            )}
          </DialogDescription>
        </DialogHeader>
        <div className="flex-grow overflow-hidden">
          <ScrollArea className="h-[calc(90vh-120px)]">
            {isLoading ? (
              <div className="space-y-6 pr-4">
                <div className="flex items-center gap-6">
                  <div className="h-32 w-32 bg-muted animate-pulse rounded-lg" />
                  <div className="space-y-4">
                    <div className="h-4 w-24 bg-muted animate-pulse rounded" />
                    <div className="h-4 w-20 bg-muted animate-pulse rounded" />
                    <div className="h-4 w-28 bg-muted animate-pulse rounded" />
                  </div>
                </div>
                <Separator />
                <div className="space-y-4">
                  <div className="h-6 w-32 bg-muted animate-pulse rounded" />
                  <div className="h-4 w-48 bg-muted animate-pulse rounded" />
                </div>
                <Separator />
                <div className="space-y-4">
                  <div className="h-6 w-32 bg-muted animate-pulse rounded" />
                  <div className="space-y-2">
                    <div className="h-4 w-full bg-muted animate-pulse rounded" />
                    <div className="h-4 w-3/4 bg-muted animate-pulse rounded" />
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-6 pr-4">
                <div className="flex items-center gap-6">
                  <div className="relative h-32 w-32 rounded-lg overflow-hidden shadow-lg">
                    {imageLoading && (
                      <div className="absolute inset-0 bg-muted animate-pulse" />
                    )}
                    <Image
                      src={music?.cover_url || "/default.png"}
                      alt={music?.title || 'Default music cover'}
                      className={`object-cover transition-opacity duration-300 ${
                        imageLoading ? 'opacity-0' : 'opacity-100'
                      }`}
                      fill
                      onLoadingComplete={() => setImageLoading(false)}
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Tag className="h-4 w-4 text-primary" />
                      <span className="text-sm text-muted-foreground">
                        {music?.tags?.join(", ")}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-primary" />
                      <span className="text-sm text-muted-foreground">3:45</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Heart className="h-4 w-4 text-primary" />
                      <span className="text-sm text-muted-foreground">1,234 likes</span>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="font-semibold text-lg mb-2 flex items-center gap-2">
                    <User className="h-5 w-5 text-primary" />
                    适合的患者
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {music?.suitable_for && (
                      <Badge variant="secondary">
                        {typeof music.suitable_for === 'string' 
                          ? (music.suitable_for as string).replace(/[{}]/g, '')
                          : music.suitable_for}
                      </Badge>
                    )}
                  </div>
                </div>

                <Separator />

                {music?.emotional_impact && (
                  <div>
                    <h4 className="font-semibold text-lg mb-2 flex items-center gap-2">
                      <Heart className="h-5 w-5 text-primary" />
                      情感影响
                    </h4>
                    <div className="whitespace-pre-line pl-4">
                      {music.emotional_impact.replace(/\t/g, '')}
                    </div>
                  </div>
                )}

                {music?.musical_analysis && (
                  <div>
                    <h4 className="font-semibold text-lg mb-2 flex items-center gap-2">
                      <Music2 className="h-5 w-5 text-primary" />
                      音乐分析
                    </h4>
                    <div className="whitespace-pre-line pl-4">
                      {music.musical_analysis.replace(/\t/g, '')}
                    </div>
                  </div>
                )}

                {music?.therapeutic_suggestions && (
                  <div>
                    <h4 className="font-semibold text-lg mb-2 flex items-center gap-2">
                      <Stethoscope className="h-5 w-5 text-primary" />
                      治疗建议
                    </h4>
                    <div className="whitespace-pre-line pl-4">
                      {music.therapeutic_suggestions.replace(/\t/g, '')}
                    </div>
                  </div>
                )}
              </div>
            )}
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  )
}

