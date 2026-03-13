export function ProgressBar({ progress, colorClass = 'bg-indigo-500' }) {
  const pct = Math.min(100, Math.max(0, Math.round(progress)))

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs text-gray-400 dark:text-gray-500">진행률</span>
        <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">{pct}%</span>
      </div>
      <div className="w-full h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${colorClass}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}
