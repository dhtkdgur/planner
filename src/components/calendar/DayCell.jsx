import { isSameDay, toDateString } from '../../utils/dateHelpers'

export function DayCell({ date, isCurrentMonth = true, isSelected, todoCount = 0, eventCount = 0, onClick }) {
  const today = new Date()
  const isToday = isSameDay(date, today)

  return (
    <button
      onClick={() => onClick(toDateString(date))}
      className={`flex flex-col items-center py-1.5 rounded-xl transition-colors min-h-[52px] w-full
        ${isSelected
          ? 'bg-indigo-500 text-white'
          : isToday
            ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400'
            : 'hover:bg-gray-100 dark:hover:bg-gray-800'
        }
        ${!isCurrentMonth ? 'opacity-30' : ''}`}
    >
      <span className={`text-sm font-medium leading-none
        ${isSelected ? 'text-white' : 'text-gray-800 dark:text-gray-200'}`}>
        {date.getDate()}
      </span>
      {/* dot indicators */}
      <div className="flex gap-0.5 mt-1.5">
        {todoCount > 0 && (
          <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-white/70' : 'bg-indigo-400'}`} />
        )}
        {eventCount > 0 && (
          <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-white/70' : 'bg-rose-400'}`} />
        )}
      </div>
    </button>
  )
}
