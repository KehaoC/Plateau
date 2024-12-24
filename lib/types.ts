export interface Music {
    id: number
    title: string
    artist: string
    cover: string
    audio: string
    duration: number
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
    Musics: Music[]
  }

export type ViewType = 
  | 'featured' 
  | 'department' 
  | 'patient' 
  | 'library' 
  | 'music-generation'
  | 'music-prescription'
  | 'patient-management'
  | 'prescription-list'
  | 'prescription-player'