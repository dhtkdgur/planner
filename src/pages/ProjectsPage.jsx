import { useState } from 'react'
import { useProjects } from '../hooks/useProjects'
import { ProjectCard } from '../components/projects/ProjectCard'
import { ProjectForm } from '../components/projects/ProjectForm'
import { Modal } from '../components/shared/Modal'
import { Button } from '../components/shared/Button'
import { EmptyState } from '../components/shared/EmptyState'
import { LoadingSpinner } from '../components/shared/LoadingSpinner'

export function ProjectsPage() {
  const {
    projects,
    loading,
    addProject,
    deleteProject,
    addSubtask,
    toggleSubtask,
    deleteSubtask,
  } = useProjects()
  const [showForm, setShowForm] = useState(false)

  return (
    <div className="px-4 py-5">
      {/* 헤더 */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">프로젝트</h1>
          <p className="text-sm text-gray-400 dark:text-gray-500 mt-0.5">
            {projects.length > 0 ? `${projects.length}개 프로젝트` : '목표를 설정해보세요'}
          </p>
        </div>
        <Button size="sm" onClick={() => setShowForm(true)}>
          + 새 프로젝트
        </Button>
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : projects.length === 0 ? (
        <EmptyState icon="🎯" message="프로젝트가 없습니다" sub="새 프로젝트를 만들어 목표를 관리해보세요" />
      ) : (
        <div className="flex flex-col gap-3 pb-6">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onDelete={deleteProject}
              onAddSubtask={addSubtask}
              onToggleSubtask={toggleSubtask}
              onDeleteSubtask={deleteSubtask}
            />
          ))}
        </div>
      )}

      <Modal
        isOpen={showForm}
        onClose={() => setShowForm(false)}
        title="새 프로젝트"
      >
        <ProjectForm
          onAdd={addProject}
          onClose={() => setShowForm(false)}
        />
      </Modal>
    </div>
  )
}
