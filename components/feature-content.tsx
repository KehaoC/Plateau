import { RefreshCw } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { PlaylistCard } from "@/components/playlist-card"
import { MusicList } from "@/components/music-list"
import { AllMusics } from "@/components/all-musics"
import { playlists, Musics } from "@/lib/data"

export function FeaturedContent() {
  return (
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
          <h2 className="text-2xl font-bold">Top Musics</h2>
        </div>
        <MusicList Musics={Musics.slice(0, 5)} />
      </section>

      <section>
        <AllMusics />
      </section>
    </>
  )
}