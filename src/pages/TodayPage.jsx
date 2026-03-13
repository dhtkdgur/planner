import { useAppStore } from '../store/appStore'
import { useTodos } from '../hooks/useTodos'
import { TodoList } from '../components/today/TodoList'
import { TodoForm } from '../components/today/TodoForm'
import { LoadingSpinner } from '../components/shared/LoadingSpinner'
import { formatDate, fromDateString } from '../utils/dateHelpers'

export function TodayPage() {
  const { activeDate } = useAppStore()
  const { todos, loading, addTodo, toggleTodo, deleteTodo } = useTodos(activeDate)

  const dateObj = fromDateString(activeDate)
  const dateLabel = formatDate(dateObj)

  return (
    <div className="px-4 py-5">
      {/* 날짜 헤더 */}
      <div className="mb-5">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{dateLabel}</h1>
        <p className="text-sm text-gray-400 dark:text-gray-500 mt-0.5">
          {todos.length > 0
            ? `${todos.filter((t) => t.completed).length}/${todos.length} 완료`
            : '할 일을 추가해보세요'}
        </p>
      </div>

      {/* 할 일 목록 */}
      {loading ? (
        <LoadingSpinner />
      ) : (
        <TodoList todos={todos} onToggle={toggleTodo} onDelete={deleteTodo} />
      )}

      {/* 입력 폼 (하단 고정) */}
      <div className="fixed bottom-[72px] left-0 right-0 px-4 pb-2 max-w-md mx-auto">
        <TodoForm onAdd={addTodo} />
      </div>
    </div>
  )
}
