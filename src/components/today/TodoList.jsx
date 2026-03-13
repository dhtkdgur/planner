import { TodoItem } from './TodoItem'
import { EmptyState } from '../shared/EmptyState'

export function TodoList({ todos, onToggle, onDelete }) {
  if (todos.length === 0) {
    return <EmptyState icon="✅" message="할 일이 없습니다" sub="아래에서 새로운 할 일을 추가해보세요" />
  }

  return (
    <div className="flex flex-col gap-2">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}
