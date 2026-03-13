import { useState } from 'react'

export function SubtaskForm({ onAdd }) {
  const [title, setTitle] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    if (!title.trim()) return
    setLoading(true)
    await onAdd(title.trim())
    setTitle('')
    setLoading(false)
  }

  return (
    <div className="flex items-center gap-2 mt-2 pt-2 border-t border-gray-100 dark:border-gray-800">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
        placeholder="서브태스크 추가..."
        disabled={loading}
        className="flex-1 text-sm px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700
          bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100
          placeholder-gray-400 dark:placeholder-gray-500
          focus:outline-none focus:ring-2 focus:ring-indigo-400 min-h-[40px]"
      />
      <button
        onClick={handleSubmit}
        disabled={!title.trim() || loading}
        className="p-2 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white disabled:opacity-50 min-h-[40px] min-w-[40px] flex items-center justify-center"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      </button>
    </div>
  )
}
