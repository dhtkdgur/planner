import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { toDateString } from '../utils/dateHelpers'

export const useAppStore = create(
  persist(
    (set) => ({
      activeTab: 'today',
      activeDate: toDateString(new Date()),
      calendarView: 'month',

      setActiveTab: (tab) => set({ activeTab: tab }),
      setActiveDate: (dateStr) => set({ activeDate: dateStr }),
      setCalendarView: (view) => set({ calendarView: view }),
    }),
    {
      name: 'planner-ui-state',
      partialize: (state) => ({
        calendarView: state.calendarView,
      }),
    }
  )
)
