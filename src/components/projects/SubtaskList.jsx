import { SubtaskItem } from './SubtaskItem'
import { SubtaskForm } from './SubtaskForm'

export function SubtaskList({ subtasks, onToggle, onDelete, onAdd }) {
  return (
    <div className="px-1">
      {subtasks.length === 0 ? (
        <p className="text-sm text-gray-400 dark:text-gray-500 py-2">서브태스크가 없습니다</p>
      ) : (
        subtasks.map((st) => (
          <SubtaskItem
            key={st.id}
            subtask={st}
            onToggle={onToggle}
            onDelete={onDelete}
          />
        ))
      )}
      <SubtaskForm onAdd={onAdd} />
    </div>
  )
}
