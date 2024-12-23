import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Song } from "@/lib/types"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Clock, Heart, Music, User } from 'lucide-react'

interface SongDetailsProps {
  song: Song
  isOpen: boolean
  onClose: () => void
}

export function SongDetails({ song, isOpen, onClose }: SongDetailsProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[550px] max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-2xl">{song.title}</DialogTitle>
          <DialogDescription>{song.artist}</DialogDescription>
        </DialogHeader>
        <div className="flex-grow overflow-hidden">
          <ScrollArea className="h-full pr-4">
            <div className="space-y-6">
              <div className="flex items-center gap-6">
                <div className="relative h-32 w-32 rounded-lg overflow-hidden shadow-lg">
                  <Image
                    src={song.cover}
                    alt={song.title}
                    className="object-cover"
                    fill
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Music className="h-4 w-4 text-primary" />
                    <span className="text-sm text-muted-foreground">
                      {song.tags?.join(", ")}
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
                  {song.suitableFor?.map((patient, index) => (
                    <Badge key={index} variant="secondary">{patient}</Badge>
                  ))}
                </div>
              </div>

              <Separator />

              <div>
                <h4 className="font-semibold text-lg mb-2">情绪影响</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {song.emotionalImpact}
                </p>
              </div>

              <Separator />

              <div>
                <h4 className="font-semibold text-lg mb-2">曲式分析</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {song.musicalAnalysis}
                </p>
              </div>

              <Separator />

              <div>
                <h4 className="font-semibold text-lg mb-2">治疗建议</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {song.therapeuticSuggestions}
                </p>
              </div>
            </div>
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  )
}

