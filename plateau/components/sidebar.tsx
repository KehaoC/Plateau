'use client'

import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Home, Library, Radio, GamepadIcon, Heart, Clock, Mic2, Plus } from 'lucide-react'
import { LibraryIcon, Stethoscope, UserCircle } from 'lucide-react'
import Logo from "./logo";

export function Sidebar({ setActiveView }: { setActiveView: (view: 'all' | 'department' | 'patient') => void }) {

  return (
    <div className="w-60 border-r bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-[52px] items-center px-4 py-2">
        <div className="flex items-center gap-2">
            <div className="w-7 h-7">
              <Logo />
            </div>
            <span className="text-lg font-semibold"> Music Plateau </span>
        </div>
      </div>
      <ScrollArea className="h-[calc(100vh-52px)] px-2">
        <div className="space-y-4 py-4">
          <div className="px-3 py-2">
            <h2 className="mb-2 px-4 text-lg font-semibold"> 探索 </h2>
            <div className="space-y-1">
              <Button 
                variant="ghost" 
                className="w-full justify-start gap-2"
                onClick={() => setActiveView('all')}
              >
                <LibraryIcon className="h-4 w-4" />
                全部歌曲
              </Button>
              <Button 
                variant="ghost" 
                className="w-full justify-start gap-2"
                onClick={() => setActiveView('department')}
              >
                <Stethoscope className="h-4 w-4" />
                科室个性化
              </Button>
              <Button 
                variant="ghost" 
                className="w-full justify-start gap-2"
                onClick={() => setActiveView('patient')}
              >
                <UserCircle className="h-4 w-4" />
                患者个性化
              </Button>
            </div>
          </div>
          {/* TODO: 添加其他模块 */}
          {/* <div className="px-3 py-2">
            <h2 className="mb-2 px-4 text-lg font-semibold">Library</h2>
            <div className="space-y-1">
              <Button variant="ghost" className="w-full justify-start gap-2">
                <Heart className="h-4 w-4" />
                Liked Songs
              </Button>
              <Button variant="ghost" className="w-full justify-start gap-2">
                <Clock className="h-4 w-4" />
                Recent
              </Button>
              <Button variant="ghost" className="w-full justify-start gap-2">
                <Mic2 className="h-4 w-4" />
                Artists
              </Button>
            </div>
          </div> */}
          {/* <div className="px-3 py-2">
            <h2 className="mb-2 px-4 text-lg font-semibold flex items-center justify-between">
              Playlists
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Plus className="h-4 w-4" />
              </Button>
            </h2>
            <div className="space-y-1">
              <Button variant="ghost" className="w-full justify-start">
                Chill Vibes
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                Rock Classics
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                Jazz Collection
              </Button>
            </div>
          </div> */}
        </div>
      </ScrollArea>
    </div>
  )
}

