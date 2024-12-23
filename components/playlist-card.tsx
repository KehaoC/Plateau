'use client'

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play } from 'lucide-react'
import Image from "next/image"
import { Playlist } from "@/lib/types"
import { usePlayerStore } from "@/hooks/use-player-store"

interface PlaylistCardProps {
  playlist: Playlist
}

export function PlaylistCard({ playlist }: PlaylistCardProps) {
  const { setCurrentSong, setQueue, setIsPlaying } = usePlayerStore()

  const handlePlay = () => {
    if (playlist.songs.length > 0) {
      setCurrentSong(playlist.songs[0])
      setQueue(playlist.songs)
      setIsPlaying(true)
    }
  }

  return (
    <Card className="group relative overflow-hidden">
      <CardContent className="p-0">
        <div className="aspect-square relative">
          <Image
            src={playlist.cover}
            alt={playlist.title}
            className="object-cover transition-transform group-hover:scale-105"
            fill
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity" />
          <Button
            size="icon"
            className="absolute bottom-4 right-4 h-10 w-10 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={handlePlay}
          >
            <Play className="h-5 w-5" />
          </Button>
        </div>
        <div className="p-4">
          <h3 className="font-semibold">{playlist.title}</h3>
          <p className="text-sm text-muted-foreground">{playlist.description}</p>
        </div>
      </CardContent>
    </Card>
  )
}

