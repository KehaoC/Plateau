'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { songs } from "@/lib/data"
import { Song } from "@/lib/types"
import { SongList } from "@/components/song-list"
export function DepartmentPersonalization() {
  const [department, setDepartment] = useState('')
  const [customPlaylist, setCustomPlaylist] = useState<Song[]>([])

  const generatePlaylist = () => {
    console.log('generatePlaylist', department)
    // This is a mock function to simulate generating a playlist
    // In a real application, this would call an API or use an AI model
    const shuffled = [...songs].sort(() => 0.5 - Math.random())
    setCustomPlaylist(shuffled.slice(0, 5))
  }

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 space-y-4">
        <h1 className="text-2xl font-bold">科室个性化</h1>
        <div className="flex gap-2">
          <Input
            type="text"
            placeholder="输入科室信息..."
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="max-w-sm"
          />
          <Button onClick={generatePlaylist} disabled={!department.trim()}>
            生成歌单
          </Button>
        </div>
      </div>
      <ScrollArea className="flex-1">
        <div className="p-4">
          {customPlaylist.length > 0 && (
            <>
              <h2 className="text-xl font-semibold mb-4">为 {department} 定制的歌单</h2>
              <SongList songs={customPlaylist} />
            </>
          )}
        </div>
      </ScrollArea>
    </div>
  )
}

