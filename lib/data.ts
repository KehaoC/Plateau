import { MusicList ,Music } from '@/lib/types'

export const Musics: Music[] = [
  {
    id: 1,
    title: "Butterfly",
    artist: "Grimes",
    cover_url: "/placeholder.svg?height=400&width=400",
    audio_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Music-1.mp3",
    duration: 205,
    tags: ["电子", "流行"],
    suitable_for: ["焦虑症患者", "失眠症患者", "抑郁症患者"],
    emotional_impact: "这首歌曲有助于缓解压力，提升心情。它的旋律舒缓，节奏平稳，可以帮助听者放松身心，减少焦虑感。歌词中充满希望和积极的信息，能够给予听者精神上的支持和鼓励。",
    musical_analysis: "这首歌采用了典型的流行音乐结构：前奏-主歌-副歌-主歌-副歌-桥段-副歌。它的和声进行简单直接，主要使用大调和弦，给人以温暖、积极的感觉。歌曲的节奏稳定，每分钟约100拍，这个速度既不会太快导致兴奋，也不会太慢引起沮丧，非常适合放松和冥想。",
    therapeutic_suggestions: "建议在患者感到焦虑或压力大时播放这首歌曲。可以在睡前或冥想时使用，帮助患者放松身心。对于抑郁症患者，可以在早晨起床时播放，帮助他们以积极的心态开始新的一天。"
  },
  {
    id: 2,
    title: "Genesis",
    artist: "Grimes",
    cover_url: "/placeholder.svg?height=400&width=400",
    audio_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Music-2.mp3",
    duration: 205,
    tags: ["电子", "实验"]
  },
  {
    id: 3,
    title: "Oblivion",
    artist: "Grimes",
    cover_url: "/placeholder.svg?height=400&width=400",
    audio_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Music-3.mp3",
    duration: 225,
    tags: ["电子", "流行"]
  },
  {
    id: 4,
    title: "Bohemian Rhapsody",
    artist: "Queen",
    cover_url: "/placeholder.svg?height=400&width=400",
    audio_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Music-4.mp3",
    duration: 225,
    tags: ["摇滚", "经典"]
  },
  {
    id: 5,
    title: "Stairway to Heaven",
    artist: "Led Zeppelin",
    cover_url: "/placeholder.svg?height=400&width=400",
    audio_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Music-5.mp3",
    duration: 225,
    tags: ["摇滚", "经典"]
  },
  {
    id: 6,
    title: "Imagine",
    artist: "John Lennon",
    cover_url: "/placeholder.svg?height=400&width=400",
    audio_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Music-6.mp3",
    duration: 225,
    tags: ["摇滚", "民谣"]
  },
  {
    id: 7,
    title: "Smells Like Teen Spirit",
    artist: "Nirvana",
    cover_url: "/placeholder.svg?height=400&width=400",
    audio_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Music-7.mp3",
    duration: 225,
    tags: ["摇滚", "垃圾"]
  },
  {
    id: 8,
    title: "Billie Jean",
    artist: "Michael Jackson",
    cover_url: "/placeholder.svg?height=400&width=400",
    audio_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Music-8.mp3",
    duration: 225,
    tags: ["流行", "R&B"]
  },
  {
    id: 9,
    title: "Like a Rolling Stone",
    artist: "Bob Dylan",
    cover_url: "/placeholder.svg?height=400&width=400",
    audio_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Music-9.mp3",
    duration: 225,
    tags: ["民谣", "摇滚"]
  },
  {
    id: 10,
    title: "Respect",
    artist: "Aretha Franklin",
    cover_url: "/placeholder.svg?height=400&width=400",
    audio_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Music-10.mp3",
    duration: 225,
    tags: ["R&B", "灵魂"]
  }
]

export const playlists: MusicList[] = [
  {
    id: 1,
    name: "Daily Mix",
    description: "Personalized playlist for you",
    cover_url: "/placeholder.svg?height=400&width=400",
  },
  {
    id: 2,
    name: "Top Hits 2024",
    description: "Popular tracks this year",
    cover_url: "/placeholder.svg?height=400&width=400",
  },
  {
    id: 3,
    name: "Chill Vibes",
    description: "Relaxing music collection",
    cover_url: "/placeholder.svg?height=400&width=400",
  },
  {
    id: 4,
    name: "New Releases",
    description: "Fresh music just for you",
    cover_url: "/placeholder.svg?height=400&width=400",
  }
]
