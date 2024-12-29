'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Play } from 'lucide-react'
import Image from "next/image"
import { usePlayerStore } from "@/hooks/use-player-store"
import { Music } from "@/lib/types"
import { cn, getValidImageUrl } from "@/lib/utils"
import { MusicDetails } from "@/components/music-details"
interface MusicListProps {
  Musics: Music[]
}

export function MusicList({ Musics }: MusicListProps) {
  const { currentMusic, setCurrentMusic, setQueue, isPlaying, setIsPlaying } = usePlayerStore()
  const [selectedMusic, setSelectedMusic] = useState<Music | null>(null)

  const handlePlay = (Music: Music) => {
    if (currentMusic?.id === Music.id) {
      setIsPlaying(!isPlaying)
    } else {
      setCurrentMusic(Music)
      setQueue(Musics)
      setIsPlaying(true)
    }
  }

  const handleMusicClick = (Music: Music) => {
    setSelectedMusic(Music)
  }

  return (
    <div className="space-y-4">
      {Musics.map((Music, index) => (
        <div
          key={Music.id}
          className={cn(
            "flex items-center gap-4 p-2 rounded-lg hover:bg-secondary/50 cursor-pointer",
            currentMusic?.id === Music.id && "bg-secondary/50"
          )}
          onClick={() => handleMusicClick(Music)}
        >
          <span className="w-6 text-center font-mono text-muted-foreground">
            {String(index + 1).padStart(2, '0')}
          </span>
          <div className="relative h-12 w-12 rounded overflow-hidden">
            <Image
              src={getValidImageUrl(Music.cover_url)}
              alt={Music.title}
              className="object-cover"
              fill
            />
          </div>
          <div className="flex-1">
            <h3 className="font-medium">{Music.title}</h3>
            <p className="text-sm text-muted-foreground">{Music.artist}</p>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8"
            onClick={(e) => {
              e.stopPropagation()
              handlePlay(Music)
            }}
          >
            <Play className="h-4 w-4" />
          </Button>
        </div>
      ))}
      {selectedMusic && (
        <MusicDetails
          MusicId={selectedMusic.id}
          isOpen={!!selectedMusic}
          onClose={() => setSelectedMusic(null)}
        />
      )}
    </div>
  )
}

