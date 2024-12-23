import { create } from 'zustand'
import { Song } from '@/lib/types'

interface PlayerState {
  currentSong: Song | null
  isPlaying: boolean
  volume: number
  progress: number
  duration: number
  isShuffling: boolean
  isRepeating: boolean
  queue: Song[]
  setCurrentSong: (song: Song | null) => void
  setIsPlaying: (isPlaying: boolean) => void
  setVolume: (volume: number) => void
  setProgress: (progress: number) => void
  setDuration: (duration: number) => void
  setIsShuffling: (isShuffling: boolean) => void
  setIsRepeating: (isRepeating: boolean) => void
  setQueue: (queue: Song[]) => void
  playNext: () => void
  playPrevious: () => void
}

export const usePlayerStore = create<PlayerState>((set, get) => ({
  currentSong: null,
  isPlaying: false,
  volume: 1,
  progress: 0,
  duration: 0,
  isShuffling: false,
  isRepeating: false,
  queue: [],
  setCurrentSong: (song) => set({ currentSong: song }),
  setIsPlaying: (isPlaying) => set({ isPlaying }),
  setVolume: (volume) => set({ volume }),
  setProgress: (progress) => set({ progress }),
  setDuration: (duration) => set({ duration }),
  setIsShuffling: (isShuffling) => set({ isShuffling }),
  setIsRepeating: (isRepeating) => set({ isRepeating }),
  setQueue: (queue) => set({ queue }),
  playNext: () => {
    const { queue, currentSong, isShuffling, setCurrentSong } = get()
    if (!currentSong || queue.length === 0) return

    const currentIndex = queue.findIndex((song) => song.id === currentSong.id)
    let nextIndex

    if (isShuffling) {
      nextIndex = Math.floor(Math.random() * queue.length)
    } else {
      nextIndex = (currentIndex + 1) % queue.length
    }

    setCurrentSong(queue[nextIndex])
  },
  playPrevious: () => {
    const { queue, currentSong, setCurrentSong } = get()
    if (!currentSong || queue.length === 0) return

    const currentIndex = queue.findIndex((song) => song.id === currentSong.id)
    const previousIndex = (currentIndex - 1 + queue.length) % queue.length
    setCurrentSong(queue[previousIndex])
  }
}))

