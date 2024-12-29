import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatTime(seconds: number): string {
  if (!seconds || isNaN(seconds)) return "0:00"
  
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = Math.floor(seconds % 60)
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
}

export const getValidImageUrl = (url: string | null | undefined): string => {
  if (!url || url.trim() === '') {
    return '/default.png'
  }
  return url
}