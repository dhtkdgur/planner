import { useTheme } from '../../hooks/useTheme'
import { BottomNav } from './BottomNav'

export function AppShell({ children }) {
  const { isDark, toggleTheme } = useTheme()

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950">
      {/* 헤더 */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-md mx-auto flex items-center justify-between px-5 h-14">
          <span className="text-lg font-bold text-indigo-500 tracking-tight">Planner</span>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="다크모드 토글"
          >
            {isDark ? (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>
        </div>
      </header>

      {/* 메인 콘텐츠 */}
      <main className="max-w-md mx-auto pt-14 pb-20 min-h-screen">
        {children}
      </main>

      <BottomNav />
    </div>
  )
}
