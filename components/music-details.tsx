import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Clock, Heart, User, Tag, Music } from 'lucide-react'
import { supabase } from "@/lib/supabase"
import { useEffect, useState } from "react"
import { Music as MusicType } from "@/lib/types"
interface MusicDetailsProps {
  MusicId: number
  isOpen: boolean
  onClose: () => void
}

export function MusicDetails({ MusicId, isOpen, onClose }: MusicDetailsProps) {

  const [isLoadingDetail, setIsLoadingDetail] = useState(true)
  const [music, setMusic] = useState<MusicType | null>(null)
  const [imageLoading, setImageLoading] = useState(true)

  // 获取音乐详情
  useEffect(() => {
    async function fetchMusicDetail(){
      setIsLoadingDetail(true)
      const { data, error } = await supabase
        .from('music')
        .select('*')
        .eq('id', MusicId)
        .single()

      if (error) throw error
      setMusic(data || null)
      console.log("musicDetail:", data)
      setIsLoadingDetail(false)
    }

    fetchMusicDetail()
  }, [MusicId])

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[550px] max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-2xl">{music?.title}</DialogTitle>
          <DialogDescription>{music?.artist}</DialogDescription>
        </DialogHeader>
        <div className="flex-grow overflow-hidden">
          <ScrollArea className="h-full pr-4">
            <div className="space-y-6">
              <div className="flex items-center gap-6">
                <div className="relative h-32 w-32 rounded-lg overflow-hidden shadow-lg">
                  {imageLoading && (
                    <div className="absolute inset-0 bg-muted animate-pulse" />
                  )}
                  <Image
                    src={music?.cover || "/default.png"}
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
                  {music?.suitableFor?.map((patient, index) => (
                    <Badge key={index} variant="secondary">{patient}</Badge>
                  ))}
                </div>
              </div>

              <Separator />

              <div>
                <h4 className="font-semibold text-lg mb-2">情绪影响</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {music?.emotionalImpact}
                </p>
              </div>

              <Separator />

              <div>
                <h4 className="font-semibold text-lg mb-2">曲式分析</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {music?.musicalAnalysis}
                </p>
              </div>

              <Separator />

              <div>
                <h4 className="font-semibold text-lg mb-2">治疗建议</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {music?.therapeuticSuggestions}
                </p>
              </div>
            </div>
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  )
}

