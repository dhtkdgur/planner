import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabase'

export function useEvents(dateStr) {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchEvents = useCallback(async () => {
    if (!dateStr) return
    setLoading(true)
    setError(null)
    const { data, error: err } = await supabase
      .from('events')
      .select('*')
      .eq('event_date', dateStr)
      .order('start_time', { ascending: true })

    if (err) setError(err.message)
    else setEvents(data || [])
    setLoading(false)
  }, [dateStr])

  useEffect(() => {
    fetchEvents()
  }, [fetchEvents])

  const addEvent = async ({ title, start_time, end_time, memo }) => {
    const { data, error: err } = await supabase
      .from('events')
      .insert({ title, event_date: dateStr, start_time, end_time, memo })
      .select()
      .single()

    if (err) {
      setError(err.message)
      return false
    }
    setEvents((prev) =>
      [...prev, data].sort((a, b) => {
        if (!a.start_time) return 1
        if (!b.start_time) return -1
        return a.start_time.localeCompare(b.start_time)
      })
    )
    return true
  }

  const deleteEvent = async (id) => {
    setEvents((prev) => prev.filter((e) => e.id !== id))
    const { error: err } = await supabase.from('events').delete().eq('id', id)
    if (err) {
      setError(err.message)
      fetchEvents()
    }
  }

  return { events, loading, error, addEvent, deleteEvent }
}

// 날짜 범위에 걸친 이벤트 수 조회 (캘린더 dot indicator용)
export async function fetchEventCountsByRange(start, end) {
  const { data } = await supabase
    .from('events')
    .select('event_date')
    .gte('event_date', start)
    .lte('event_date', end)

  const counts = {}
  ;(data || []).forEach((e) => {
    counts[e.event_date] = (counts[e.event_date] || 0) + 1
  })
  return counts
}

// 날짜 범위에 걸친 할 일 수 조회 (캘린더 dot indicator용)
export async function fetchTodoCountsByRange(start, end) {
  const { data } = await supabase
    .from('todos')
    .select('date')
    .gte('date', start)
    .lte('date', end)

  const counts = {}
  ;(data || []).forEach((t) => {
    counts[t.date] = (counts[t.date] || 0) + 1
  })
  return counts
}
