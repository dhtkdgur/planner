import { AppShell } from './components/layout/AppShell'
import { useAppStore } from './store/appStore'
import { TodayPage } from './pages/TodayPage'
import { CalendarPage } from './pages/CalendarPage'
import { ProjectsPage } from './pages/ProjectsPage'

export default function App() {
  const { activeTab } = useAppStore()

  return (
    <AppShell>
      {activeTab === 'today' && <TodayPage />}
      {activeTab === 'calendar' && <CalendarPage />}
      {activeTab === 'projects' && <ProjectsPage />}
    </AppShell>
  )
}
