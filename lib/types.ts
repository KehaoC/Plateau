export interface Music {
    id: number
    title: string
    artist: string
    cover_url: string
    audio_url: string
    duration: number
    tags?: string[]
    suitable_for?: string[]
    emotional_impact?: string
    musical_analysis?: string
    therapeutic_suggestions?: string
  }


  
export interface MusicList {
    id: number
    name: string
    description: string
    cover_url: string
    // Musics: Music[]
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