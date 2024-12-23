'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Play } from 'lucide-react'
import Image from "next/image"
import { usePlayerStore } from "@/hooks/use-player-store"
import { Song } from "@/lib/types"
import { cn } from "@/lib/utils"
import { SongDetails } from "./song-details"

interface SongListProps {
  songs: Song[]
}

export function SongList({ songs }: SongListProps) {
  const { currentSong, setCurrentSong, setQueue, isPlaying, setIsPlaying } = usePlayerStore()
  const [selectedSong, setSelectedSong] = useState<Song | null>(null)

  const handlePlay = (song: Song) => {
    if (currentSong?.id === song.id) {
      setIsPlaying(!isPlaying)
    } else {
      setCurrentSong(song)
      setQueue(songs)
      setIsPlaying(true)
    }
  }

  const handleSongClick = (song: Song) => {
    setSelectedSong(song)
  }

  return (
    <div className="space-y-4">
      {songs.map((song, index) => (
        <div
          key={song.id}
          className={cn(
            "flex items-center gap-4 p-2 rounded-lg hover:bg-secondary/50 cursor-pointer",
            currentSong?.id === song.id && "bg-secondary/50"
          )}
          onClick={() => handleSongClick(song)}
        >
          <span className="w-6 text-center font-mono text-muted-foreground">
            {String(index + 1).padStart(2, '0')}
          </span>
          <div className="relative h-12 w-12 rounded overflow-hidden">
            <Image
              src={song.cover}
              alt={song.title}
              className="object-cover"
              fill
            />
          </div>
          <div className="flex-1">
            <h3 className="font-medium">{song.title}</h3>
            <p className="text-sm text-muted-foreground">{song.artist}</p>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8"
            onClick={(e) => {
              e.stopPropagation()
              handlePlay(song)
            }}
          >
            <Play className="h-4 w-4" />
          </Button>
        </div>
      ))}
      {selectedSong && (
        <SongDetails
          song={selectedSong}
          isOpen={!!selectedSong}
          onClose={() => setSelectedSong(null)}
        />
      )}
    </div>
  )
}

