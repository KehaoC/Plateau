import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { RefreshCw } from 'lucide-react'
import { PlaylistCard } from "@/components/playlist-card"
import { SongList } from "@/components/song-list"
import { AllSongs } from "@/components/all-songs"
import { DepartmentPersonalization } from "@/components/department-personalization"
import { PatientPersonalization } from "@/components/patient-personalization"
import { playlists, songs } from "@/lib/data"

export function MainContent({ activeView }: { activeView: 'all' | 'department' | 'patient' }) {
  return (
    <ScrollArea className="flex-1">
      <div className="p-6 space-y-6">
        {activeView === 'department' && <DepartmentPersonalization />}
        {activeView === 'patient' && <PatientPersonalization />}
        
        {activeView === 'all' && (
          <>
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">Featured Playlists</h2>
                <Button variant="ghost" size="sm" className="gap-2">
                  <RefreshCw className="h-4 w-4" />
                  Refresh
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {playlists.map((playlist) => (
                  <PlaylistCard key={playlist.id} playlist={playlist} />
                ))}
              </div>
            </section>
            
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">Top Songs</h2>
              </div>
              <SongList songs={songs.slice(0, 5)} />
            </section>

            <section>
              <AllSongs />
            </section>
          </>
        )}
      </div>
    </ScrollArea>
  )
}