import { useState } from 'react'
import { ProgressBar } from './ProgressBar'
import { SubtaskList } from './SubtaskList'
import { colorMap, colorHex } from '../../utils/colorMap'

export function ProjectCard({ project, onDelete, onAddSubtask, onToggleSubtask, onDeleteSubtask }) {
  const [expanded, setExpanded] = useState(false)

  const subtasks = project.subtasks || []
  const total = subtasks.length
  const done = subtasks.filter((s) => s.completed).length
  const progress = total > 0 ? (done / total) * 100 : 0

  const colors = colorMap[project.color] || colorMap.indigo
  const hex = colorHex[project.color] || colorHex.indigo

  const formatDateRange = () => {
    if (!project.start_date && !project.end_date) return null
    if (project.start_date && project.end_date) {
      return `${project.start_date} ~ ${project.end_date}`
    }
    return project.start_date || project.end_date
  }
  const dateRange = formatDateRange()

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm overflow-hidden">
      {/* 색상 스트립 */}
      <div className="h-1.5 w-full" style={{ backgroundColor: hex }} />

      <div className="p-4">
        {/* 헤더 */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 truncate">{project.title}</h3>
            {dateRange && (
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{dateRange}</p>
            )}
          </div>
          <div className="flex items-center gap-1">
            <span className="text-xs text-gray-400 dark:text-gray-500">{done}/{total}</span>
            <button
              onClick={() => onDelete(project.id)}
              className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-300 dark:text-gray-600 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* 진행률 바 */}
        <div className="mt-3">
          <ProgressBar progress={progress} colorClass={colors.bg} />
        </div>

        {/* 펼치기 버튼 */}
        <button
          onClick={() => setExpanded((v) => !v)}
          className="flex items-center gap-1 mt-3 text-xs font-medium text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
        >
          <svg
            className={`w-4 h-4 transition-transform ${expanded ? 'rotate-90' : ''}`}
            fill="none" viewBox="0 0 24 24" stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          {expanded ? '접기' : `서브태스크 ${total}개`}
        </button>

        {/* 서브태스크 */}
        {expanded && (
          <div className="mt-2">
            <SubtaskList
              subtasks={subtasks}
              onToggle={(stId, completed) => onToggleSubtask(project.id, stId, completed)}
              onDelete={(stId) => onDeleteSubtask(project.id, stId)}
              onAdd={(title) => onAddSubtask(project.id, title)}
            />
          </div>
        )}
      </div>
    </div>
  )
}
