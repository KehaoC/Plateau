'use client'

import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { LibraryIcon, Stethoscope, UserCircle, MusicIcon, ClipboardList } from 'lucide-react'
import Logo from "./logo"
import { ViewType } from '@/lib/types'

interface NavSectionProps {
  title: string
  items: {
    label: string
    icon: React.ReactNode
    view: ViewType
    animate?: boolean
  }[]
  setActiveView: (view: ViewType) => void
  activeView: ViewType
}

const NavSection = ({ title, items, setActiveView, activeView }: NavSectionProps) => (
  <div className="px-3 py-2">
    <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">{title}</h2>
    <div className="space-y-1.5">
      {items.map((item) => (
        <Button 
          key={item.view}
          variant="ghost" 
          className={`w-full justify-start gap-2 group transition-all duration-300
            ${activeView === item.view 
              ? 'bg-primary/10 text-primary' 
              : 'hover:bg-primary/10'
            }`}
          onClick={() => setActiveView(item.view)}
        >
          <div className={`h-4 w-4 transition-colors
            ${activeView === item.view ? 'text-primary' : 'group-hover:text-primary'}
            ${item.animate ? 'animate-pulse' : ''}`}
          >
            {item.icon}
          </div>
          {item.label}
        </Button>
      ))}
    </div>
  </div>
)

export function Sidebar({ setActiveView, activeView }: { 
  setActiveView: (view: ViewType) => void
  activeView: ViewType
}) {
  const navSections = [
    {
      title: "探索",
      items: [
        { label: "精选", icon: <LibraryIcon />, view: "featured" },
        { label: "科室个性化", icon: <Stethoscope />, view: "department" },
        { label: "患者个性化", icon: <UserCircle />, view: "patient" },
      ]
    },
    {
      title: "曲库管理",
      items: [
        { label: "曲库管理", icon: <MusicIcon />, view: "library" },
        { label: "音乐生成", icon: <MusicIcon />, view: "music-generation", animate: true },
      ]
    },
    {
      title: "医生功能",
      items: [
        { label: "音乐处方", icon: <MusicIcon />, view: "music-prescription" },
        { label: "患者管理", icon: <UserCircle />, view: "patient-management" },
      ]
    },
    {
      title: "医护模块",
      items: [
        { label: "处方列表", icon: <ClipboardList />, view: "prescription-list" },
        { label: "处方播放", icon: <MusicIcon />, view: "prescription-player" },
      ]
    }
  ]

  return (
    <div className="w-60 border-r bg-gradient-to-b from-background/95 to-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all duration-300">
      <div className="flex h-[52px] items-center px-4 py-2 border-b border-border/40">
        <div className="flex items-center gap-2 hover:scale-[1.02] transition-transform duration-300">
          <div className="w-7 h-7">
            <Logo />
          </div>
          <span className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
            Music Plateau
          </span>
        </div>
      </div>
      <ScrollArea className="h-[calc(100vh-52px)] px-2">
        <div className="space-y-4 py-4">
          {navSections.map((section) => (
            <NavSection
              key={section.title}
              title={section.title}
              items={section.items as { label: string; icon: React.ReactNode; view: ViewType; animate?: boolean }[]}
              setActiveView={setActiveView}
              activeView={activeView}
            />
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}

