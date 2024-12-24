'use client'

import { useEffect, useState } from 'react'
import { Edit, Plus, Trash2, Play, MoreHorizontal } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { MusicDetails } from '@/components/music-details'
import { usePlayerStore } from '@/hooks/use-player-store'

export interface MusicInLib {
    id: number
    title: string
    artist: string
    duration: number
    tags: string[]
}

export interface MusicDetial {
    emotionalImpact: string
    musicalAnalysis: string
    therapeuticSuggestions: string
}

export function LibraryContent() {
    //  列表状态管理
    const [musics, setMusics] = useState<MusicInLib[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    // 详情相关状态
    const [selectedDetailId, setSelectedDetailId] = useState<number | null>(null)

    // 音乐播放器状态管理
    const [musicIdSelectedToPlay, setMusicIdSelectedToPlay] = useState<number | null>(null)
    const { setCurrentMusic, setIsPlaying } = usePlayerStore()

    // 获取音乐列表, 只加载一次
    useEffect(()=>{
        async function fetchMusics(){
            try{
                setIsLoading(true)
                const { data, error } = await supabase
                    .from('music')
                    .select('id, title, artist, duration, tags')
                
                if (error) throw error
                setMusics(data || [])
                console.log("musics:", data)
            } catch (error) {
                setError('Failed to fetch music data')
                console.error('Failed to fetch music data:', error)
            } finally {
                setIsLoading(false)
            }
        }

        fetchMusics()
    }, [])

    // 获取准备播放的音乐
    useEffect(()=>{
        async function fetchMusic(){
            if (!musicIdSelectedToPlay) return
            const { data, error } = await supabase
                .from('music')
                .select('*')
                .eq('id', musicIdSelectedToPlay)
                .single()

            // TODO: 播放队列的实现
            setCurrentMusic(data)
            setIsPlaying(true)
            console.log("music:", data)
            if (error) throw error
        }
        fetchMusic()
    }, [musicIdSelectedToPlay])

    // TODO:处理 UI 交互
    const handleSelectMusic = (id: number) => {
        console.log('selected music id:', id)
        setSelectedDetailId(id)
    }

    const handlePlayMusic = (id: number) => {
        setMusicIdSelectedToPlay(id)
    }

    if (isLoading) {
        return (
            <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center">
                    <Skeleton className="h-8 w-32" />
                    <div className="flex gap-2">
                        <Skeleton className="h-9 w-24" />
                        <Skeleton className="h-9 w-24" />
                    </div>
                </div>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[50px]">选择</TableHead>
                            <TableHead>歌曲名称</TableHead>
                            <TableHead>艺术家</TableHead>
                            <TableHead>时长</TableHead>
                            <TableHead>标签</TableHead>
                            <TableHead className="w-[100px]">详情</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {[...Array(5)].map((_, index) => (
                            <TableRow key={index}>
                                <TableCell><Skeleton className="h-4 w-4" /></TableCell>
                                <TableCell><Skeleton className="h-4 w-32" /></TableCell>
                                <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                                <TableCell><Skeleton className="h-4 w-16" /></TableCell>
                                <TableCell><Skeleton className="h-4 w-40" /></TableCell>
                                <TableCell><Skeleton className="h-8 w-20" /></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        )
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center h-[400px] gap-4">
                <p className="text-destructive">{error}</p>
                <Button onClick={() => window.location.reload()}>重试</Button>
            </div>
        )
    }

    return (
        <div className="flex flex-col gap-4">
            {/* 操作栏 */}
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">曲库</h1>
                <div className="flex gap-2">
                    <Button variant="outline">
                        <Plus className="w-4 h-4 mr-2" />
                        批量添加
                    </Button>
                    <Button variant="destructive">
                        <Trash2 className="w-4 h-4 mr-2" />
                        批量删除
                    </Button>
                </div>
            </div>
            {/* 歌曲列表 */}
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[50px]">选择</TableHead>
                        <TableHead> 歌曲名称</TableHead>
                        <TableHead> 艺术家</TableHead>
                        <TableHead> 时长</TableHead>
                        <TableHead> 标签 </TableHead>
                        <TableHead className="w-[100px]"> 详情</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {musics.map((music) => (
                        <TableRow key={music.id}>
                            <TableCell className="w-[50px]">
                                <Checkbox />
                            </TableCell>
                            <TableCell>{music.title}</TableCell>
                            <TableCell>{music.artist}</TableCell>
                            <TableCell>{music.duration}</TableCell>
                            <TableCell>{music.tags?.join(', ')}</TableCell>
                            <TableCell className="flex gap-0">
                                <Button variant="ghost" onClick={() => handleSelectMusic(music.id)}>
                                    <MoreHorizontal className="w-4 h-4" />
                                </Button>
                                <Button variant="ghost" onClick={() => handlePlayMusic(music.id)}>
                                    <Play className="w-4 h-4" />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            {/* 音乐详情 */}
            {selectedDetailId && (
                <MusicDetails
                    MusicId={selectedDetailId}
                    isOpen={!!selectedDetailId}
                    onClose={() => setSelectedDetailId(null)}
                />
            )}
        </div>
    )
}
