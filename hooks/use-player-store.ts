import { create } from 'zustand'
import { Music } from '@/lib/types'

interface PlayerState {
  currentMusic: Music | null
  isPlaying: boolean
  volume: number
  progress: number
  duration: number
  isShuffling: boolean
  isRepeating: boolean
  queue: Music[]
  setCurrentMusic: (Music: Music | null) => void
  setIsPlaying: (isPlaying: boolean) => void
  setVolume: (volume: number) => void
  setProgress: (progress: number) => void
  setDuration: (duration: number) => void
  setIsShuffling: (isShuffling: boolean) => void
  setIsRepeating: (isRepeating: boolean) => void
  setQueue: (queue: Music[]) => void
  playNext: () => void
  playPrevious: () => void
}

// 全局的音乐播放器状态管理
export const usePlayerStore = create<PlayerState>((set, get) => ({
  currentMusic: null,
  isPlaying: false,
  volume: 1,
  progress: 0,
  duration: 0,
  isShuffling: false,
  isRepeating: false,
  queue: [],
  setCurrentMusic: (Music) => set({ currentMusic: Music }),
  setIsPlaying: (isPlaying) => set({ isPlaying }),
  setVolume: (volume) => set({ volume }),
  setProgress: (progress) => set({ progress }),
  setDuration: (duration) => set({ duration }),
  setIsShuffling: (isShuffling) => set({ isShuffling }),
  setIsRepeating: (isRepeating) => set({ isRepeating }),
  setQueue: (queue) => set({ queue }),
  playNext: () => {
    const { queue, currentMusic, isShuffling, setCurrentMusic } = get()
    if (!currentMusic || queue.length === 0) return

    const currentIndex = queue.findIndex((Music) => Music.id === currentMusic.id)
    let nextIndex

    if (isShuffling) {
      nextIndex = Math.floor(Math.random() * queue.length)
    } else {
      nextIndex = (currentIndex + 1) % queue.length
    }

    setCurrentMusic(queue[nextIndex])
  },
  playPrevious: () => {
    const { queue, currentMusic, setCurrentMusic } = get()
    if (!currentMusic || queue.length === 0) return

    const currentIndex = queue.findIndex((Music) => Music.id === currentMusic.id)
    const previousIndex = (currentIndex - 1 + queue.length) % queue.length
    setCurrentMusic(queue[previousIndex])
  }
}))

