'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/lib/auth'
import { useTheme } from '@/lib/theme'
import {
  LayoutDashboard, Users, BookOpen, CreditCard,
  ClipboardList, BarChart3, Settings, LogOut,
  GraduationCap, X, ChevronRight, Zap
} from 'lucide-react'

const adminNav = [
  { key: 'dashboard', icon: LayoutDashboard, href: '/admin' },
  { key: 'users', icon: Users, href: '/admin/users' },
  { key: 'courses', icon: BookOpen, href: '/admin/courses' },
  { key: 'payments', icon: CreditCard, href: '/admin/payments' },
  { key: 'tests', icon: ClipboardList, href: '/admin/tests' },
  { key: 'analytics', icon: BarChart3, href: '/admin/analytics' },
  { key: 'settings', icon: Settings, href: '/admin/settings' },
]

const studentNav = [
  { key: 'dashboard', icon: LayoutDashboard, href: '/student/dashboard' },
  { key: 'courses', icon: BookOpen, href: '/student/courses' },
  { key: 'tests', icon: ClipboardList, href: '/student/tests' },
]

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { user, logout } = useAuth()
  const { t } = useTheme()
  const pathname = usePathname()
  const nav = user?.role === 'admin' ? adminNav : studentNav

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full z-50 flex flex-col
          transition-transform duration-300 ease-out
          lg:translate-x-0 lg:static lg:z-auto
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
        style={{
          width: '260px',
          background: 'linear-gradient(180deg, var(--color-surface) 0%, var(--color-bg) 100%)',
          borderRight: '1px solid var(--color-border)',
        }}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-6 py-5" style={{borderBottom:'1px solid rgba(255,255,255,0.06)'}}>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{background:'linear-gradient(135deg,#0284c7,#0ea5e9)'}}>
              <GraduationCap size={18} className="text-white" />
            </div>
            <div>
              <div className="font-display font-bold text-base leading-tight" style={{color:'var(--color-text)'}}>EduAdmin</div>
              <div className="text-xs text-gray-500">Online Academy</div>
            </div>
          </div>
          <button onClick={onClose} className="lg:hidden text-gray-500 hover:text-white transition-colors">
            <X size={18} />
          </button>
        </div>

        {/* User badge */}
        <div className="px-4 py-4">
          <div className="rounded-xl p-3 flex items-center gap-3" style={{background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.07)'}}>
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0"
              style={{background:'var(--color-surface-2)', border:'1px solid var(--color-border)'}}
            >
              {user?.name?.slice(0, 2).toUpperCase()}
            </div>
            <div className="min-w-0">
              <div className="text-sm font-semibold truncate" style={{color:'var(--color-text)'}}>{user?.name}</div>
              <div className="flex items-center gap-1.5 mt-0.5">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400"></div>
                <span className="text-xs capitalize" style={{color:'#6b7280'}}>
                  {user?.role === 'admin' ? 'Administrator' : 'Student'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-2 overflow-y-auto">
          <div className="text-xs font-semibold uppercase tracking-wider px-3 mb-2" style={{color:'var(--color-text-muted)'}}>
            {user?.role === 'admin' ? t('adminPanel') : t('myPage')}
          </div>
          <ul className="space-y-0.5">
            {nav.map((item) => {
              const isActive = pathname === item.href || (item.href !== '/admin' && item.href !== '/student/dashboard' && pathname.startsWith(item.href))
              const Icon = item.icon
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className={`
                      flex items-center justify-between px-3 py-2.5 rounded-xl group transition-all duration-200
                      ${isActive ? 'nav-item-active' : 'hover:bg-white/5'}
                    `}
                  >
                    <div className="flex items-center gap-3">
                      <Icon
                        size={17}
                        className={isActive ? 'text-sky-400' : 'text-gray-500 group-hover:text-gray-300 transition-colors'}
                      />
                      <span className={`text-sm font-medium transition-colors ${isActive ? 'text-sky-400' : ''}`}
                        style={!isActive ? {color:'var(--color-text-muted)'} : {}}>
                        {t(item.key)}
                      </span>
                    </div>
                    {isActive && <ChevronRight size={14} className="text-sky-500 opacity-60" />}
                  </Link>
                </li>
              )
            })}
          </ul>

          {user?.role === 'admin' && (
            <div className="mt-6">
              <div className="text-xs font-semibold uppercase tracking-wider px-3 mb-2" style={{color:'#374151'}}>
                Tezkor Harakatlar
              </div>
              <div className="mx-2 p-3 rounded-xl" style={{background:'rgba(249,115,22,0.08)', border:'1px solid rgba(249,115,22,0.2)'}}>
                <div className="flex items-center gap-2 mb-2">
                  <Zap size={14} className="text-orange-400" />
                  <span className="text-xs font-semibold text-orange-400">{t('proFeature')}</span>
                </div>
                <p className="text-xs leading-relaxed" style={{color:'#9ca3af'}}>AI tavsiyalar va avtomatik analytics yoqilgan</p>
              </div>
            </div>
          )}
        </nav>

        {/* Logout */}
        <div className="p-4" style={{borderTop:'1px solid rgba(255,255,255,0.06)'}}>
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group"
            style={{color:'#6b7280'}}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(239,68,68,0.08)'
              e.currentTarget.style.color = '#ef4444'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'transparent'
              e.currentTarget.style.color = '#6b7280'
            }}
          >
            <LogOut size={17} />
            <span className="text-sm font-medium">{t('logout')}</span>
          </button>
        </div>
      </aside>
    </>
  )
}
