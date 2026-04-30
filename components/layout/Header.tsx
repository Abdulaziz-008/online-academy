'use client'
import { useState } from 'react'
import { Menu, Bell, Search, Sun, Moon } from 'lucide-react'
import { useTheme } from '@/lib/theme'

interface HeaderProps {
  onMenuClick: () => void
  title: string
}

export default function Header({ onMenuClick, title }: HeaderProps) {
  const [showNotifs, setShowNotifs] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const { theme, toggleTheme, t } = useTheme()
  const notifications = [
  { id: 1, text: t('newNotif1'), time: '2 daqiqa oldin' },
  { id: 2, text: t('newNotif2'), time: '15 daqiqa oldin' },
  { id: 3, text: t('newNotif3'), time: '1 soat oldin' },
]
  return (
    <header
      className="flex items-center justify-between px-4 lg:px-6 sticky top-0 z-30"
      style={{
        height: '64px',
        background: theme === 'dark' ? 'rgba(10,10,15,0.8)' : 'rgba(240,244,248,0.9)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid var(--color-border)',
      }}
    >
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-lg hover:bg-white/5 transition-colors text-gray-400"
        >
          <Menu size={20} />
        </button>
        <h1 className="font-display font-bold text-lg" style={{color:'var(--color-text)'}}>{title}</h1>
      </div>

      <div className="flex items-center gap-2">
        {/* Search */}
        <div className="relative hidden md:block">
          {showSearch ? (
            <input
              autoFocus
              onBlur={() => setShowSearch(false)}
              className="input-base text-sm w-64"
              placeholder="Qidirish..."
              style={{height:'38px'}}
            />
          ) : (
            <button
              onClick={() => setShowSearch(true)}
              className="p-2 rounded-lg hover:bg-white/5 transition-colors text-gray-400 hover:text-white"
            >
              <Search size={18} />
            </button>
          )}
        </div>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifs(!showNotifs)}
            className="p-2 rounded-lg hover:bg-white/5 transition-colors text-gray-400 hover:text-white relative"
          >
            <Bell size={18} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-orange-500 rounded-full"></span>
          </button>

          {showNotifs && (
            <div
              className="absolute right-0 top-12 w-80 rounded-2xl shadow-2xl z-50 overflow-hidden animate-slide-up"
              style={{background:'var(--color-surface-2)', border:'1px solid var(--color-border)'}}
            >
              <div className="p-4 flex items-center justify-between" style={{borderBottom:'1px solid var(--color-border)'}}>
                <span className="font-semibold text-white text-sm" style={{ color: 'var(--color-text)' }}>{t('notifications')}</span>
                <span className="text-xs px-2 py-0.5 rounded-full" style={{background:'rgba(249,115,22,0.2)', color:'#f97316'}}>{notifications.length} {t('new')}</span>
              </div>
              <div className="divide-y" style={{borderColor:'rgba(255,255,255,0.04)'}}>
                {notifications.map(n => (
                  <div key={n.id} className="p-4 hover:bg-white/3 transition-colors cursor-pointer" style={{ borderBottom: '1px solid var(--color-border)' }}>
                    <div className="text-sm" style={{ color: 'var(--color-text)' }}>{n.text}</div>
                    <div className="text-xs text-gray-500 mt-1">{n.time}</div>
                  </div>
                ))}
              </div>
              <div className="p-3 text-center">
                <button className="text-xs text-sky-400 hover:text-sky-300 transition-colors">{t('seeAll')}</button>
              </div>
            </div>
          )}
        </div>

        {/* Theme (decorative) */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg transition-all text-gray-400 hover:text-white"
          style={{ background: theme === 'light' ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.06)' }}
          title={theme === 'dark' ? 'Yorug\' rejim' : 'Qorong\'u rejim'}
        >
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>
    </header>
  )
}
