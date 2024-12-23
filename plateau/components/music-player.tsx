'use client'

import { useEffect, useRef, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Heart, ListMusic, Mic2, Pause, Play, Repeat, Shuffle, SkipBack, SkipForward, Volume2 } from 'lucide-react'
import Image from "next/image"
import { usePlayerStore } from '@/hooks/use-player-store'
import { formatTime } from '@/lib/utils'
import { SongDetails } from "@/components/song-details"

export function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const {
    currentSong,
    isPlaying,
    volume,
    progress,
    duration,
    isShuffling,
    isRepeating,
    setIsPlaying,
    setVolume,
    setProgress,
    setDuration,
    setIsShuffling,
    setIsRepeating,
    playNext,
    playPrevious
  } = usePlayerStore()
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play()
      } else {
        audioRef.current.pause()
      }
    }
  }, [isPlaying, currentSong])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume
    }
  }, [volume])

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setProgress(audioRef.current.currentTime)
      setDuration(audioRef.current.duration)
    }
  }

  const handleProgressChange = (value: number[]) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value[0]
      setProgress(value[0])
    }
  }

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0] / 100)
  }

  const handleEnded = () => {
    if (isRepeating) {
      if (audioRef.current) {
        audioRef.current.currentTime = 0
        audioRef.current.play()
      }
    } else {
      playNext()
    }
  }

  if (!currentSong) return null

  return (
    <>
      <audio
        ref={audioRef}
        src={currentSong.audio}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
      />
      <div className="h-[72px] border-t px-4 flex items-center justify-between">
        <div className="flex items-center gap-3 w-[30%]">
          <div 
            className="relative h-12 w-12 rounded overflow-hidden cursor-pointer"
            onClick={() => setIsDetailsOpen(true)}
          >
            <Image
              src={currentSong.cover}
              alt={`${currentSong.title} cover`}
              className="object-cover"
              fill
            />
          </div>
          <div className="flex flex-col">
            <span className="font-medium">{currentSong.title}</span>
            <span className="text-xs text-muted-foreground">{currentSong.artist}</span>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Heart className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Mic2 className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="flex flex-col items-center gap-1 w-[40%]">
          <div className="flex items-center gap-2">
            <Button 
              variant={isShuffling ? "default" : "ghost"} 
              size="icon" 
              className="h-8 w-8"
              onClick={() => setIsShuffling(!isShuffling)}
            >
              <Shuffle className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8"
              onClick={playPrevious}
            >
              <SkipBack className="h-4 w-4" />
            </Button>
            <Button 
              size="icon" 
              className="h-8 w-8"
              onClick={() => setIsPlaying(!isPlaying)}
            >
              {isPlaying ? (
                <Pause className="h-4 w-4" />
              ) : (
                <Play className="h-4 w-4" />
              )}
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8"
              onClick={playNext}
            >
              <SkipForward className="h-4 w-4" />
            </Button>
            <Button 
              variant={isRepeating ? "default" : "ghost"}
              size="icon" 
              className="h-8 w-8"
              onClick={() => setIsRepeating(!isRepeating)}
            >
              <Repeat className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex items-center gap-2 w-full">
            <span className="text-xs text-muted-foreground">{formatTime(progress)}</span>
            <Slider
              value={[progress]}
              max={duration}
              step={1}
              className="w-full"
              onValueChange={handleProgressChange}
            />
            <span className="text-xs text-muted-foreground">{formatTime(duration)}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2 w-[30%] justify-end">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ListMusic className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Volume2 className="h-4 w-4" />
          </Button>
          <Slider
            value={[volume * 100]}
            max={100}
            step={1}
            className="w-[100px]"
            onValueChange={handleVolumeChange}
          />
        </div>
      </div>
      {currentSong && (
        <SongDetails
          song={currentSong}
          isOpen={isDetailsOpen}
          onClose={() => setIsDetailsOpen(false)}
        />
      )}
    </>
  )
}

