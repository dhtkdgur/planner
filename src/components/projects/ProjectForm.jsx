import { useState } from 'react'
import { Input } from '../shared/Input'
import { Button } from '../shared/Button'
import { colorKeys, colorHex } from '../../utils/colorMap'

export function ProjectForm({ onAdd, onClose }) {
  const [title, setTitle] = useState('')
  const [color, setColor] = useState('indigo')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    if (!title.trim()) return
    setLoading(true)
    const ok = await onAdd({
      title: title.trim(),
      color,
      start_date: startDate || null,
      end_date: endDate || null,
    })
    if (ok) onClose()
    setLoading(false)
  }

  return (
    <div className="flex flex-col gap-4">
      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="프로젝트 이름"
        autoFocus
      />

      {/* 색상 선택 */}
      <div>
        <label className="text-xs text-gray-500 dark:text-gray-400 mb-2 block">색상</label>
        <div className="flex gap-2 flex-wrap">
          {colorKeys.map((key) => (
            <button
              key={key}
              onClick={() => setColor(key)}
              style={{ backgroundColor: colorHex[key] }}
              className={`w-8 h-8 rounded-full transition-transform
                ${color === key ? 'ring-2 ring-offset-2 ring-gray-400 dark:ring-gray-600 scale-110' : 'hover:scale-105'}`}
            />
          ))}
        </div>
      </div>

      {/* 기간 */}
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="text-xs text-gray-500 dark:text-gray-400 mb-1 block">시작일</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700
              bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm
              focus:outline-none focus:ring-2 focus:ring-indigo-400 min-h-[44px]"
          />
        </div>
        <div>
          <label className="text-xs text-gray-500 dark:text-gray-400 mb-1 block">종료일</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700
              bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm
              focus:outline-none focus:ring-2 focus:ring-indigo-400 min-h-[44px]"
          />
        </div>
      </div>

      <Button
        onClick={handleSubmit}
        disabled={!title.trim() || loading}
        className="w-full"
      >
        프로젝트 생성
      </Button>
    </div>
  )
}
