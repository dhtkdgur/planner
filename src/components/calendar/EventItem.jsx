export function EventItem({ event, onDelete }) {
  const formatTime = (t) => t ? t.slice(0, 5) : null
  const startTime = formatTime(event.start_time)
  const endTime = formatTime(event.end_time)

  return (
    <div className="flex items-start gap-3 px-4 py-3.5 bg-white dark:bg-gray-900 rounded-2xl shadow-sm">
      {/* 시간 표시 */}
      <div className="flex-shrink-0 w-14 text-center">
        {startTime ? (
          <div>
            <p className="text-xs font-semibold text-indigo-500">{startTime}</p>
            {endTime && <p className="text-xs text-gray-400 dark:text-gray-500">{endTime}</p>}
          </div>
        ) : (
          <p className="text-xs text-gray-400 dark:text-gray-500">종일</p>
        )}
      </div>

      {/* 이벤트 내용 */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-800 dark:text-gray-200 truncate">{event.title}</p>
        {event.memo && (
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5 line-clamp-2">{event.memo}</p>
        )}
      </div>

      {/* 삭제 */}
      <button
        onClick={() => onDelete(event.id)}
        className="flex-shrink-0 p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 dark:text-gray-500 transition-colors"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>
    </div>
  )
}
