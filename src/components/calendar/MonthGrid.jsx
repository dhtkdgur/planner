import { getMonthDays } from '../../utils/dateHelpers'
import { DayCell } from './DayCell'

const DAY_LABELS = ['일', '월', '화', '수', '목', '금', '토']

export function MonthGrid({ year, month, selectedDate, todoCounts, eventCounts, onSelectDate }) {
  const days = getMonthDays(year, month)

  return (
    <div className="px-4">
      {/* 요일 헤더 */}
      <div className="grid grid-cols-7 mb-1">
        {DAY_LABELS.map((label, i) => (
          <div key={label} className={`text-center text-xs font-medium py-1
            ${i === 0 ? 'text-rose-400' : i === 6 ? 'text-blue-400' : 'text-gray-400 dark:text-gray-500'}`}>
            {label}
          </div>
        ))}
      </div>

      {/* 날짜 그리드 */}
      <div className="grid grid-cols-7 gap-0.5">
        {days.map((date, idx) => {
          const dateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
          const isCurrentMonth = date.getMonth() === month

          return (
            <DayCell
              key={idx}
              date={date}
              isCurrentMonth={isCurrentMonth}
              isSelected={selectedDate === dateStr}
              todoCount={todoCounts[dateStr] || 0}
              eventCount={eventCounts[dateStr] || 0}
              onClick={onSelectDate}
            />
          )
        })}
      </div>
    </div>
  )
}
