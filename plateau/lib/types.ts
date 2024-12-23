export interface Song {
    id: number
    title: string
    artist: string
    cover: string
    audio: string
    tags?: string[]
    suitableFor?: string[]
    emotionalImpact?: string
    musicalAnalysis?: string
    therapeuticSuggestions?: string
  }
  
export interface Playlist {
    id: number
    title: string
    description: string
    cover: string
    songs: Song[]
  }