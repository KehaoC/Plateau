'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MusicList } from "@/components/music-list"
import { Musics } from "@/lib/data"

const tags = ["流行", "摇滚", "古典", "爵士", "电子", "民谣", "R&B", "嘻哈"]

export function AllMusics() {
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState('')

  const filteredMusics = Musics.filter(Music => 
    (selectedTags.length === 0 || selectedTags.some(tag => Music.tags?.includes(tag))) &&
    (Music.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
     Music.artist.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    )
  }

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 space-y-4">
        <h1 className="text-2xl font-bold">全部歌曲</h1>
        <Input
          type="search"
          placeholder="搜索歌曲或艺术家..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <div className="flex flex-wrap gap-2">
          {tags.map(tag => (
            <Button
              key={tag}
              variant={selectedTags.includes(tag) ? "default" : "outline"}
              size="sm"
              onClick={() => toggleTag(tag)}
            >
              {tag}
            </Button>
          ))}
        </div>
      </div>
      <ScrollArea className="flex-1">
        <div className="p-4">
          <MusicList Musics={filteredMusics} />
        </div>
      </ScrollArea>
    </div>
  )
}

