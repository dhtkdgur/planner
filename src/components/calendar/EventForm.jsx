import { useState } from 'react'
import { Input } from '../shared/Input'
import { Button } from '../shared/Button'

export function EventForm({ onAdd, onClose }) {
  const [title, setTitle] = useState('')
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')
  const [memo, setMemo] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    if (!title.trim()) return
    if (startTime && endTime && endTime <= startTime) {
      setError('종료 시간은 시작 시간 이후여야 합니다')
      return
    }
    setError('')
    setLoading(true)
    const ok = await onAdd({
      title: title.trim(),
      start_time: startTime || null,
      end_time: endTime || null,
      memo: memo.trim() || null,
    })
    if (ok) onClose()
    setLoading(false)
  }

  return (
    <div className="flex flex-col gap-3">
      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="일정 제목"
        autoFocus
      />

      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="text-xs text-gray-500 dark:text-gray-400 mb-1 block">시작 시간</label>
          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700
              bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm
              focus:outline-none focus:ring-2 focus:ring-indigo-400 min-h-[44px]"
          />
        </div>
        <div>
          <label className="text-xs text-gray-500 dark:text-gray-400 mb-1 block">종료 시간</label>
          <input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700
              bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm
              focus:outline-none focus:ring-2 focus:ring-indigo-400 min-h-[44px]"
          />
        </div>
      </div>

      <textarea
        value={memo}
        onChange={(e) => setMemo(e.target.value)}
        placeholder="메모 (선택)"
        rows={3}
        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700
          bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
          placeholder-gray-400 dark:placeholder-gray-500
          focus:outline-none focus:ring-2 focus:ring-indigo-400
          text-sm resize-none"
      />

      {error && <p className="text-xs text-red-500">{error}</p>}

      <Button
        onClick={handleSubmit}
        disabled={!title.trim() || loading}
        className="w-full"
      >
        일정 추가
      </Button>
    </div>
  )
}
