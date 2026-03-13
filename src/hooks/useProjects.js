import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabase'

export function useProjects() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchProjects = useCallback(async () => {
    setLoading(true)
    setError(null)
    const { data, error: err } = await supabase
      .from('projects')
      .select('*, subtasks(*)')
      .order('created_at', { ascending: false })

    if (err) setError(err.message)
    else setProjects(data || [])
    setLoading(false)
  }, [])

  useEffect(() => {
    fetchProjects()
  }, [fetchProjects])

  const addProject = async ({ title, color, start_date, end_date }) => {
    const { data, error: err } = await supabase
      .from('projects')
      .insert({ title, color, start_date, end_date })
      .select('*, subtasks(*)')
      .single()

    if (err) {
      setError(err.message)
      return false
    }
    setProjects((prev) => [data, ...prev])
    return true
  }

  const deleteProject = async (id) => {
    setProjects((prev) => prev.filter((p) => p.id !== id))
    const { error: err } = await supabase.from('projects').delete().eq('id', id)
    if (err) {
      setError(err.message)
      fetchProjects()
    }
  }

  const addSubtask = async (projectId, title) => {
    const project = projects.find((p) => p.id === projectId)
    const position = project ? project.subtasks.length : 0

    const { data, error: err } = await supabase
      .from('subtasks')
      .insert({ project_id: projectId, title, position })
      .select()
      .single()

    if (err) {
      setError(err.message)
      return false
    }
    setProjects((prev) =>
      prev.map((p) =>
        p.id === projectId ? { ...p, subtasks: [...p.subtasks, data] } : p
      )
    )
    return true
  }

  const toggleSubtask = async (projectId, subtaskId, completed) => {
    // Optimistic update
    setProjects((prev) =>
      prev.map((p) =>
        p.id === projectId
          ? {
              ...p,
              subtasks: p.subtasks.map((s) =>
                s.id === subtaskId ? { ...s, completed } : s
              ),
            }
          : p
      )
    )
    const { error: err } = await supabase
      .from('subtasks')
      .update({ completed })
      .eq('id', subtaskId)

    if (err) {
      setError(err.message)
      fetchProjects()
    }
  }

  const deleteSubtask = async (projectId, subtaskId) => {
    setProjects((prev) =>
      prev.map((p) =>
        p.id === projectId
          ? { ...p, subtasks: p.subtasks.filter((s) => s.id !== subtaskId) }
          : p
      )
    )
    const { error: err } = await supabase
      .from('subtasks')
      .delete()
      .eq('id', subtaskId)

    if (err) {
      setError(err.message)
      fetchProjects()
    }
  }

  return {
    projects,
    loading,
    error,
    addProject,
    deleteProject,
    addSubtask,
    toggleSubtask,
    deleteSubtask,
  }
}
