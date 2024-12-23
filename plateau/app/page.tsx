'use client'

import { useState } from 'react'
import { MusicPlayer } from "@/components/music-player"
import { Sidebar } from "@/components/sidebar"
import { TopBar } from "@/components/top-bar"
import { MainContent } from "@/components/main-content"
import { ViewType } from '@/lib/types'

export default function Page() {
  const [activeView, setActiveView] = useState<ViewType>('featured')

  return (
    <div className="h-screen flex flex-col">
      <div className="flex-1 flex overflow-hidden">
        <Sidebar setActiveView={setActiveView} activeView={activeView} />
        <div className="flex-1 flex flex-col">
          <TopBar />
          <MainContent activeView={activeView} />
        </div>
      </div>
      <MusicPlayer />
    </div>
  )
}

