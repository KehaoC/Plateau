import { RefreshCw } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { PlaylistCard } from "@/components/playlist-card"
import { MusicList } from "@/components/music-list"
import { AllMusics } from "@/components/all-musics"
import { useEffect, useState } from 'react'
import { MusicList as MusicListType } from '@/lib/types'
import { supabase } from '@/lib/supabase'
import { Skeleton } from "@/components/ui/skeleton"

export function FeaturedContent() {
  const [musicLists, setMusicLists] = useState<MusicListType[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // 获取歌单列表
  useEffect(() => {
    const fetchMusicLists = async () => {
      setIsLoading(true)
      const { data, error } = await supabase.from('music_list').select('*')
      if (error) {
        console.error('Error fetching music lists:', error)
        return
      }
      
      try {
        setMusicLists(data)
      } catch (e) {
        console.error('Error processing music lists:', e)
      } finally {
        setIsLoading(false)
      }
    }
    fetchMusicLists()
  }, [])

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
          {isLoading ? (
            // Skeleton loading state
            Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="space-y-3">
                <Skeleton className="h-[200px] w-full rounded-xl" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[80%]" />
                  <Skeleton className="h-4 w-[60%]" />
                </div>
              </div>
            ))
          ) : (
            musicLists.map((musicList) => (
              <PlaylistCard key={musicList.id} musicList={musicList} />
            ))
          )}
        </div>
      </section>
      
      {/* <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Top Musics</h2>
        </div>
        <MusicList Musics={Musics.slice(0, 5)} />
      </section> */}

      <section>
        <AllMusics />
      </section>
    </>
  )
}