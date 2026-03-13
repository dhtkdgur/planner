export function EmptyState({ icon, message, sub }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <span className="text-5xl mb-4">{icon || '📭'}</span>
      <p className="text-gray-500 dark:text-gray-400 font-medium">{message || '아직 항목이 없습니다'}</p>
      {sub && <p className="text-gray-400 dark:text-gray-500 text-sm mt-1">{sub}</p>}
    </div>
  )
}
