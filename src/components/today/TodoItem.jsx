import { PriorityBadge } from './PriorityBadge'

export function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <div className={`flex items-center gap-3 px-4 py-3.5 bg-white dark:bg-gray-900 rounded-2xl shadow-sm
      transition-opacity ${todo.completed ? 'opacity-60' : ''}`}>
      {/* 체크박스 */}
      <button
        onClick={() => onToggle(todo.id, !todo.completed)}
        className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors
          ${todo.completed
            ? 'bg-indigo-500 border-indigo-500'
            : 'border-gray-300 dark:border-gray-600 hover:border-indigo-400'
          }`}
      >
        {todo.completed && (
          <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        )}
      </button>

      {/* 텍스트 영역 */}
      <div className="flex-1 min-w-0">
        <p className={`text-sm font-medium text-gray-800 dark:text-gray-200 truncate
          ${todo.completed ? 'line-through text-gray-400 dark:text-gray-500' : ''}`}>
          {todo.title}
        </p>
      </div>

      {/* 우선순위 배지 */}
      <PriorityBadge priority={todo.priority} />

      {/* 삭제 버튼 */}
      <button
        onClick={() => onDelete(todo.id)}
        className="flex-shrink-0 p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 dark:text-gray-500 transition-colors"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>
    </div>
  )
}
