import { useState } from 'react'
import { Input } from '../shared/Input'
import { Select } from '../shared/Select'
import { Button } from '../shared/Button'

const priorityOptions = [
  { value: 'high', label: '높음' },
  { value: 'medium', label: '보통' },
  { value: 'low', label: '낮음' },
]

export function TodoForm({ onAdd }) {
  const [title, setTitle] = useState('')
  const [priority, setPriority] = useState('medium')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    if (!title.trim()) return
    setLoading(true)
    await onAdd(title.trim(), priority)
    setTitle('')
    setPriority('medium')
    setLoading(false)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSubmit()
  }

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm px-4 py-3 flex gap-2">
      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="할 일 추가..."
        className="flex-1"
      />
      <Select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        options={priorityOptions}
        className="w-20"
      />
      <Button
        onClick={handleSubmit}
        disabled={!title.trim() || loading}
        size="icon"
        className="flex-shrink-0"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      </Button>
    </div>
  )
}
