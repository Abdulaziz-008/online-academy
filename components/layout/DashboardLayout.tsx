'use client'
import { useState, ReactNode } from 'react'
import Sidebar from './Sidebar'
import Header from './Header'
import { usePathname } from 'next/navigation'

const pageTitles: Record<string, string> = {
  '/admin': 'Dashboard',
  '/admin/users': 'Foydalanuvchilar',
  '/admin/courses': 'Kurslar',
  '/admin/payments': 'To\'lovlar',
  '/admin/tests': 'Testlar',
  '/admin/analytics': 'Analitika',
  '/admin/settings': 'Sozlamalar',
  '/student/dashboard': 'Dashboard',
  '/student/courses': 'Kurslarim',
  '/student/tests': 'Testlar',
}

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()
  const title = pageTitles[pathname] || 'EduAdmin'

  return (
    <div className="flex h-screen overflow-hidden" style={{background:'var(--color-bg)'}}>
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header onMenuClick={() => setSidebarOpen(true)} title={title} />
        <main className="flex-1 overflow-y-auto p-4 lg:p-6" style={{background:'var(--color-bg)'}}>
          {children}
        </main>
      </div>
    </div>
  )
}
