import { Outlet } from 'react-router-dom'
import { Sidebar } from './Sidebar'
import { TopBar } from './TopBar'

export function MainLayout() {
  return (
    <div className="flex min-h-screen bg-background text-foreground selection:bg-cyan-500/30">
      <Sidebar />
      <div className="flex-1 flex flex-col items-stretch min-w-0">
        <TopBar />
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
