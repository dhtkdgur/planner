const config = {
  high: { label: '높음', className: 'bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400' },
  medium: { label: '보통', className: 'bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400' },
  low: { label: '낮음', className: 'bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400' },
}

export function PriorityBadge({ priority }) {
  const c = config[priority] || config.medium
  return (
    <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-md ${c.className}`}>
      {c.label}
    </span>
  )
}
