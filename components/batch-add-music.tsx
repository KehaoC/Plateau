'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { supabase } from '@/lib/supabase'
import { Upload, Music2, X } from 'lucide-react'
import Image from 'next/image'

// 添加音乐文件信息接口
interface MusicFileInfo {
    file: File
    title: string
    artist: string
    tags: string[]
    cover?: File    // 可选的封面文件
    coverPreview?: string  // 用于预览的封面 URL
}

interface BatchAddMusicProps {
    isOpen: boolean
    onClose: () => void
    onSuccess: () => void
}

export function BatchAddMusic({ isOpen, onClose, onSuccess }: BatchAddMusicProps) {
    // 音乐文件信息
    const [musicFiles, setMusicFiles] = useState<MusicFileInfo[]>([])
    const [isLoading, setIsLoading] = useState(false)

    // 处理文件上传
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if (files) {
            const validFiles = Array.from(files).every(file => 
                file.type.startsWith('audio/') || file.name.endsWith('.mp3')
            )
            
            if (!validFiles) {
                alert("请只上传音频文件（如 MP3）")
                return
            }
            
            // 转换文件为 MusicFileInfo 数组
            const newMusicFiles = Array.from(files).map(file => ({
                file,
                title: file.name.replace(/\.[^/.]+$/, ""),
                artist: "未知艺术家",
                tags: ["未分类"]
            }))
            
            setMusicFiles(newMusicFiles)
        }
    }

    // 更新音乐文件信息
    const handleUpdateMusicInfo = (index: number, field: keyof MusicFileInfo, value: string) => {
        setMusicFiles(prev => prev.map((item, i) => 
            i === index 
                ? { ...item, [field]: field === 'tags' ? value.split(',') : value }
                : item
        ))
    }

    // 移除音乐文件
    const handleRemoveFile = (index: number) => {
        setMusicFiles(prev => prev.filter((_, i) => i !== index))
    }

    // 处理封面文件上传
    const handleCoverChange = async (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return
        
        // 验证文件类型
        if (!file.type.startsWith('image/')) {
            alert('请上传图片文件')
            return
        }

        // 创建预览 URL, 实时更新封面预览
        const previewUrl = URL.createObjectURL(file)
        
        setMusicFiles(prev => prev.map((item, i) => 
            i === index 
                ? { ...item, cover: file, coverPreview: previewUrl }
                : item
        ))
    }

    // 提交上传
    const handleSubmit = async () => {
        if (musicFiles.length === 0) return
        
        try {
            setIsLoading(true)
            
            // 遍历每一个音乐文件
            for (const musicInfo of musicFiles) {
                const audioPath = `${musicInfo.file.name}`
                let coverFileName = ''

                // 1. 如果有封面，使用与音乐文件相同的名称（但在 cover 目录下）
                if (musicInfo.cover) {
                    // 获取音乐文件名（不含扩展名）和封面文件扩展名
                    const musicName = musicInfo.file.name.replace(/\.[^/.]+$/, "")
                    const coverExt = musicInfo.cover.name.split('.').pop()
                    coverFileName = `${musicName}.${coverExt}`

                    console.log("coverFileName", coverFileName)


                    // 上传封面到 storage 中
                    const { error: coverError } = await supabase.storage
                        .from('musicBucket')
                        .upload(`cover/${coverFileName}`, musicInfo.cover)

                    if (coverError) throw coverError
                    console.log("上传封面成功")
                }

                // 2. 上传音频文件
                console.log("audioPath", audioPath)
                const { error: uploadError } = await supabase.storage
                    .from('musicBucket')
                    .upload(`audio/${audioPath}`, musicInfo.file)
                

                if (uploadError) throw uploadError
                console.log("上传音频文件成功")

                // 3. 创建数据库记录
                const { error: dbError } = await supabase
                    .from('music')
                    .insert({
                        title: musicInfo.title,
                        audio_url: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/musicBucket/audio/${audioPath}`,
                        cover_url: coverFileName ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/musicBucket/cover/${coverFileName}` : null,
                        duration: 0,
                        artist: musicInfo.artist,
                        tags: musicInfo.tags
                    })

                if (dbError) throw dbError
                console.log("创建数据库记录成功")
            }

            alert(`成功上传 ${musicFiles.length} 个文件`)
            onSuccess()
            onClose()
            setMusicFiles([])
        } catch (error) {
            console.error('Failed to upload music:', error)
            alert("文件上传过程中发生错误")
        } finally {

            // 关闭对话框
            setIsLoading(false)
        }
    }

    // 在组件卸载时清理预览 URL
    useEffect(() => {
        return () => {
            musicFiles.forEach(file => {
                if (file.coverPreview) {
                    URL.revokeObjectURL(file.coverPreview)
                }
            })
        }
    }, [musicFiles])

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[725px]">
                <DialogHeader>
                    <DialogTitle>批量添加音乐</DialogTitle>
                    <DialogDescription>
                        选择要上传的音乐文件并编辑信息
                    </DialogDescription>
                </DialogHeader>
                
                {musicFiles.length === 0 ? (
                    <div className="grid gap-4 py-4">
                        <div className="flex flex-col items-center justify-center gap-4 p-4 border-2 border-dashed rounded-lg">
                            <Music2 className="w-8 h-8 text-muted-foreground" />
                            <Input
                                type="file"
                                accept="audio/*,.mp3"
                                multiple
                                onChange={handleFileChange}
                                className="max-w-sm"
                            />
                            <p className="text-sm text-muted-foreground">
                                点击或拖拽文件到此处
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="grid gap-4 py-4 max-h-[400px] overflow-y-auto">
                        {musicFiles.map((musicInfo, index) => (
                            <div key={index} className="grid gap-2 p-4 border rounded-lg relative">
                                <Button 
                                    variant="ghost" 
                                    size="icon"
                                    className="absolute right-2 top-2"
                                    onClick={() => handleRemoveFile(index)}
                                >
                                    <X className="h-4 w-4" />
                                </Button>

                                <div className="grid gap-2">
                                    <Label>封面</Label>
                                    <div className="flex items-center gap-4">
                                        <div className="relative w-24 h-24 border rounded-lg overflow-hidden">
                                            {musicInfo.coverPreview ? (
                                                <Image
                                                    src={musicInfo.coverPreview}
                                                    alt="Cover preview"
                                                    fill
                                                    className="object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center bg-muted">
                                                    <Music2 className="w-8 h-8 text-muted-foreground" />
                                                </div>
                                            )}
                                        </div>
                                        <Input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => handleCoverChange(index, e)}
                                            className="max-w-[200px]"
                                        />
                                    </div>
                                </div>

                                <div className="grid gap-2">
                                    <Label>文件名</Label>
                                    <p className="text-sm text-muted-foreground">{musicInfo.file.name}</p>
                                </div>
                                <div className="grid gap-2">
                                    <Label>标题</Label>
                                    <Input
                                        value={musicInfo.title}
                                        onChange={(e) => handleUpdateMusicInfo(index, 'title', e.target.value)}
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label>艺术家</Label>
                                    <Input
                                        value={musicInfo.artist}
                                        onChange={(e) => handleUpdateMusicInfo(index, 'artist', e.target.value)}
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label>标签 (用逗号分隔)</Label>
                                    <Input
                                        value={musicInfo.tags.join(',')}
                                        onChange={(e) => handleUpdateMusicInfo(index, 'tags', e.target.value)}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                <DialogFooter>
                    <Button variant="outline" onClick={onClose}>
                        取消
                    </Button>
                    <Button onClick={handleSubmit} disabled={isLoading}>
                        {isLoading ? '上传中...' : '开始上传'}
                        {!isLoading && <Upload className="w-4 h-4 ml-2" />}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
} 