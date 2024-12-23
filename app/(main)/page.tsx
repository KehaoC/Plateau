'use client'
import { MainContent } from "@/components/main-content"
import { ViewType } from "@/lib/types"
import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { TopBar } from "@/components/top-bar"
import { MusicPlayer } from "@/components/music-player"

export default function Page() {
    const [activeView, setActiveView] = useState<ViewType>('featured')

    return (
        <div className="flex-1 flex overflow-hidden">
            <Sidebar setActiveView={setActiveView} activeView={activeView} />
            {/* flex-1 保证 TopBar 和 MainContent 占据剩余空间 */}
            <div className="flex-1 flex-col">
                <TopBar />
                <MainContent activeView={activeView} />
            </div>
            <MusicPlayer />
        </div>
    )
}
