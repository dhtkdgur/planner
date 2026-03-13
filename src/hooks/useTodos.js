import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabase'

export function useTodos(dateStr) {
  const [todos, setTodos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchTodos = useCallback(async () => {
    if (!dateStr) return
    setLoading(true)
    setError(null)
    const { data, error: err } = await supabase
      .from('todos')
      .select('*')
      .eq('date', dateStr)
      .order('position', { ascending: true })
      .order('created_at', { ascending: true })

    if (err) {
      setError(err.message)
    } else {
      // 완료된 항목은 뒤로
      const sorted = [...(data || [])].sort((a, b) => {
        if (a.completed !== b.completed) return a.completed ? 1 : -1
        return a.position - b.position
      })
      setTodos(sorted)
    }
    setLoading(false)
  }, [dateStr])

  useEffect(() => {
    fetchTodos()
  }, [fetchTodos])

  const addTodo = async (title, priority = 'medium') => {
    const position = todos.length
    const { data, error: err } = await supabase
      .from('todos')
      .insert({ title, date: dateStr, priority, position })
      .select()
      .single()

    if (err) {
      setError(err.message)
      return false
    }
    setTodos((prev) => [...prev, data])
    return true
  }

  const toggleTodo = async (id, completed) => {
    // Optimistic update
    setTodos((prev) =>
      prev
        .map((t) => (t.id === id ? { ...t, completed } : t))
        .sort((a, b) => {
          if (a.completed !== b.completed) return a.completed ? 1 : -1
          return a.position - b.position
        })
    )
    const { error: err } = await supabase
      .from('todos')
      .update({ completed })
      .eq('id', id)

    if (err) {
      // Rollback
      setError(err.message)
      fetchTodos()
    }
  }

  const deleteTodo = async (id) => {
    setTodos((prev) => prev.filter((t) => t.id !== id))
    const { error: err } = await supabase.from('todos').delete().eq('id', id)
    if (err) {
      setError(err.message)
      fetchTodos()
    }
  }

  return { todos, loading, error, addTodo, toggleTodo, deleteTodo }
}
