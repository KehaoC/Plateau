'use client'
import { useState } from "react"
import { ViewType } from "@/lib/types"
import { Sidebar } from "@/components/sidebar"
import { TopBar } from "@/components/top-bar"
import { MusicPlayer } from "@/components/music-player"
import { MainContent } from "@/components/main-content"

export default function Page() {
    const [activeView, setActiveView] = useState<ViewType>('featured')

    return (
        <div className="h-screen flex flex-col">
            <div className="flex-1 flex overflow-hidden">
                <Sidebar setActiveView={setActiveView} activeView={activeView} />
                <div className="flex-1 flex flex-col">
                    <TopBar />
                    <div className="flex-1 overflow-auto">
                        <MainContent activeView={activeView} />
                    </div>
                </div>
            </div>
            <MusicPlayer />
        </div>
    )
} 