'use client'

import { useState } from 'react'
import { MusicPlayer } from "@/components/music-player"
import { Sidebar } from "@/components/sidebar"
import { TopBar } from "@/components/top-bar"
import { MainContent } from "@/components/main-content"

export default function Page() {
  const [activeView, setActiveView] = useState<'all' | 'department' | 'patient'>('all')

  return (
    <div className="h-screen flex flex-col">
      <div className="flex-1 flex overflow-hidden">
        <Sidebar setActiveView={setActiveView} />
        <div className="flex-1 flex flex-col">
          <TopBar />
          <MainContent activeView={activeView} />
        </div>
      </div>
      <MusicPlayer />
    </div>
  )
}

