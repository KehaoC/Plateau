'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function PatientPersonalization() {
  const [patientInfo, setPatientInfo] = useState({
    name: '',
    age: '',
    gender: '',
    condition: '',
    preferences: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setPatientInfo(prev => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (value: string) => {
    setPatientInfo(prev => ({ ...prev, gender: value }))
  }

  const isFormValid = Object.values(patientInfo).every(value => value.trim() !== '')

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 space-y-4">
        <h1 className="text-2xl font-bold">患者个性化</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">患者姓名</Label>
            <Input
              id="name"
              name="name"
              value={patientInfo.name}
              onChange={handleInputChange}
              placeholder="输入患者姓名"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="age">年龄</Label>
            <Input
              id="age"
              name="age"
              type="number"
              value={patientInfo.age}
              onChange={handleInputChange}
              placeholder="输入患者年龄"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="gender">性别</Label>
            <Select onValueChange={handleSelectChange} value={patientInfo.gender}>
              <SelectTrigger>
                <SelectValue placeholder="选择性别" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">男</SelectItem>
                <SelectItem value="female">女</SelectItem>
                <SelectItem value="other">其他</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="condition">健康状况</Label>
            <Input
              id="condition"
              name="condition"
              value={patientInfo.condition}
              onChange={handleInputChange}
              placeholder="输入患者健康状况"
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="preferences">音乐偏好</Label>
            <Textarea
              id="preferences"
              name="preferences"
              value={patientInfo.preferences}
              onChange={handleInputChange}
              placeholder="输入患者音乐偏好（如喜欢的流派、艺术家等）"
            />
          </div>
        </div>
        <Button disabled={!isFormValid}>
          保存患者信息
        </Button>
      </div>
    </div>
  )
}

