export function SubtaskItem({ subtask, onToggle, onDelete }) {
  return (
    <div className={`flex items-center gap-2.5 py-2 transition-opacity ${subtask.completed ? 'opacity-60' : ''}`}>
      <button
        onClick={() => onToggle(subtask.id, !subtask.completed)}
        className={`flex-shrink-0 w-5 h-5 rounded-md border-2 flex items-center justify-center transition-colors
          ${subtask.completed
            ? 'bg-emerald-500 border-emerald-500'
            : 'border-gray-300 dark:border-gray-600 hover:border-emerald-400'
          }`}
      >
        {subtask.completed && (
          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        )}
      </button>

      <span className={`flex-1 text-sm text-gray-700 dark:text-gray-300
        ${subtask.completed ? 'line-through text-gray-400 dark:text-gray-500' : ''}`}>
        {subtask.title}
      </span>

      <button
        onClick={() => onDelete(subtask.id)}
        className="flex-shrink-0 p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-300 dark:text-gray-600 transition-colors"
      >
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  )
}
