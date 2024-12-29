'use client'

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play } from 'lucide-react'
import Image from "next/image"
import { MusicList, Music } from "@/lib/types"
import { usePlayerStore } from "@/hooks/use-player-store"
import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"

// 添加一个工具函数来验证 URL
const getValidImageUrl = (url: string | null | undefined): string => {
  if (!url || url.trim() === '') {
    return '/default.png'
  }
  return url
}

interface PlaylistCardProps {
  musicList: MusicList
}

export function PlaylistCard({ musicList }: PlaylistCardProps) {
  // 获取全局的播放器管理器
  const { setCurrentMusic, setQueue, setIsPlaying } = usePlayerStore()
  const [musicsFromList, setMusicsFromList] = useState<Music[]>([])

  // 初始化获得音乐列表
  useEffect(() => {
    const fetchMusicsId = async () => {
      const { data, error } = await supabase
        .from('list_music')
        .select(`
          music:music (
            id,
            title,
            artist,
            duration,
            audio_url,
            cover_url,
            tags,
            suitable_for,
            emotional_impact,
            musical_analysis,
            therapeutic_suggestions
          )
        `)
        .eq('list_id', musicList.id)
      
      if (error) {
        console.error('Error fetching music list:', error)
        return
      }

      // 直接提取 music 数组
      const musics = data.flatMap(item => item.music || [])
      setMusicsFromList(musics)
    }
    fetchMusicsId()
  }, [musicList])

  // 播放音乐
  const handlePlay = () => {
    if (musicsFromList.length > 0) {
      setCurrentMusic(musicsFromList[0])
      setQueue(musicsFromList)
      setIsPlaying(true)
    }
  }

  return (
    <Card className="group relative overflow-hidden">
      <CardContent className="p-0">
        <div className="aspect-square relative">
          <Image
            src={getValidImageUrl(musicList.cover_url)}
            alt={musicList.name || 'Playlist cover'}
            className="object-cover transition-transform group-hover:scale-105"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
          <h3 className="font-semibold">{musicList.name}</h3>
          <p className="text-sm text-muted-foreground">{musicList.description}</p>
        </div>
      </CardContent>
    </Card>
  )
}

