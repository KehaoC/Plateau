import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Bell, ChevronLeft, ChevronRight, Mic, Search, Settings } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function TopBar() {
  return (
    <div className="h-[52px] border-b px-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="flex gap-2">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex items-center gap-2 bg-secondary/20 rounded-full px-3 py-1.5">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input 
            type="search" 
            placeholder="Search..." 
            className="h-8 w-[300px] border-0 bg-transparent focus-visible:ring-0" 
          />
          <Mic className="h-4 w-4 text-muted-foreground" />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Bell className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Settings className="h-4 w-4" />
        </Button>
        <Avatar className="h-8 w-8">
          <AvatarImage src="/placeholder.svg" alt="User" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
      </div>
    </div>
  )
}

