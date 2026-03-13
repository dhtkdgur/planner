import { useState, useEffect, useCallback } from 'react'
import { useAppStore } from '../store/appStore'
import { useEvents } from '../hooks/useEvents'
import { fetchEventCountsByRange, fetchTodoCountsByRange } from '../hooks/useEvents'
import { CalendarHeader } from '../components/calendar/CalendarHeader'
import { MonthGrid } from '../components/calendar/MonthGrid'
import { WeekStrip } from '../components/calendar/WeekStrip'
import { EventList } from '../components/calendar/EventList'
import { EventForm } from '../components/calendar/EventForm'
import { Modal } from '../components/shared/Modal'
import { Button } from '../components/shared/Button'
import { fromDateString, getMonthRange, getWeekRange } from '../utils/dateHelpers'

export function CalendarPage() {
  const { activeDate, setActiveDate, calendarView, setCalendarView } = useAppStore()

  const activeDateObj = fromDateString(activeDate)
  const [year, setYear] = useState(activeDateObj.getFullYear())
  const [month, setMonth] = useState(activeDateObj.getMonth())

  const { events, loading: eventsLoading, addEvent, deleteEvent } = useEvents(activeDate)
  const [showEventForm, setShowEventForm] = useState(false)

  const [todoCounts, setTodoCounts] = useState({})
  const [eventCounts, setEventCounts] = useState({})

  const loadDotCounts = useCallback(async () => {
    let range
    if (calendarView === 'month') {
      range = getMonthRange(year, month)
    } else {
      range = getWeekRange(activeDateObj)
    }
    const [tc, ec] = await Promise.all([
      fetchTodoCountsByRange(range.start, range.end),
      fetchEventCountsByRange(range.start, range.end),
    ])
    setTodoCounts(tc)
    setEventCounts(ec)
  }, [year, month, calendarView, activeDate])

  useEffect(() => {
    loadDotCounts()
  }, [loadDotCounts])

  const handlePrev = () => {
    if (calendarView === 'month') {
      if (month === 0) { setYear(y => y - 1); setMonth(11) }
      else setMonth(m => m - 1)
    } else {
      const prev = new Date(activeDateObj)
      prev.setDate(prev.getDate() - 7)
      setActiveDate(`${prev.getFullYear()}-${String(prev.getMonth() + 1).padStart(2, '0')}-${String(prev.getDate()).padStart(2, '0')}`)
      setYear(prev.getFullYear())
      setMonth(prev.getMonth())
    }
  }

  const handleNext = () => {
    if (calendarView === 'month') {
      if (month === 11) { setYear(y => y + 1); setMonth(0) }
      else setMonth(m => m + 1)
    } else {
      const next = new Date(activeDateObj)
      next.setDate(next.getDate() + 7)
      setActiveDate(`${next.getFullYear()}-${String(next.getMonth() + 1).padStart(2, '0')}-${String(next.getDate()).padStart(2, '0')}`)
      setYear(next.getFullYear())
      setMonth(next.getMonth())
    }
  }

  const handleSelectDate = (dateStr) => {
    setActiveDate(dateStr)
    const d = fromDateString(dateStr)
    setYear(d.getFullYear())
    setMonth(d.getMonth())
  }

  const handleAddEvent = async (data) => {
    const ok = await addEvent(data)
    if (ok) loadDotCounts()
    return ok
  }

  const handleDeleteEvent = async (id) => {
    await deleteEvent(id)
    loadDotCounts()
  }

  return (
    <div className="py-2">
      <CalendarHeader
        year={year}
        month={month}
        view={calendarView}
        onPrev={handlePrev}
        onNext={handleNext}
        onToggleView={() => setCalendarView(calendarView === 'month' ? 'week' : 'month')}
      />

      {/* 캘린더 뷰 */}
      {calendarView === 'month' ? (
        <MonthGrid
          year={year}
          month={month}
          selectedDate={activeDate}
          todoCounts={todoCounts}
          eventCounts={eventCounts}
          onSelectDate={handleSelectDate}
        />
      ) : (
        <WeekStrip
          baseDate={activeDateObj}
          selectedDate={activeDate}
          todoCounts={todoCounts}
          eventCounts={eventCounts}
          onSelectDate={handleSelectDate}
        />
      )}

      {/* 구분선 */}
      <div className="mx-4 my-4 border-t border-gray-100 dark:border-gray-800" />

      {/* 선택된 날짜의 일정 */}
      <div className="px-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
            {activeDate} 일정
          </h3>
          <Button
            size="sm"
            onClick={() => setShowEventForm(true)}
          >
            + 일정 추가
          </Button>
        </div>

        <EventList
          events={events}
          loading={eventsLoading}
          onDelete={handleDeleteEvent}
        />
      </div>

      {/* 일정 추가 모달 */}
      <Modal
        isOpen={showEventForm}
        onClose={() => setShowEventForm(false)}
        title="일정 추가"
      >
        <EventForm
          onAdd={handleAddEvent}
          onClose={() => setShowEventForm(false)}
        />
      </Modal>
    </div>
  )
}
