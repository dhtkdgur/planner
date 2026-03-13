import { EventItem } from './EventItem'
import { EmptyState } from '../shared/EmptyState'
import { LoadingSpinner } from '../shared/LoadingSpinner'

export function EventList({ events, loading, onDelete }) {
  if (loading) return <LoadingSpinner />
  if (events.length === 0) {
    return <EmptyState icon="📅" message="일정이 없습니다" sub="+ 일정 추가 버튼을 눌러보세요" />
  }

  return (
    <div className="flex flex-col gap-2">
      {events.map((event) => (
        <EventItem key={event.id} event={event} onDelete={onDelete} />
      ))}
    </div>
  )
}
