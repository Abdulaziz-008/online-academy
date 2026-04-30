import { ReactNode } from 'react'
import { TrendingUp, TrendingDown } from 'lucide-react'

interface StatCardProps {
  title: string
  value: string
  change?: number
  icon: ReactNode
  color?: string
  subtitle?: string
}

export function StatCard({ title, value, change, icon, color = '#0ea5e9', subtitle }: StatCardProps) {
  return (
    <div className="glass rounded-2xl p-5 transition-all duration-300 animate-fade-in" style={{background:'var(--color-surface)'}}>
      <div className="flex items-start justify-between mb-4">
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: `${color}20`, border: `1px solid ${color}30` }}
        >
          <span style={{ color }}>{icon}</span>
        </div>
        {typeof change === 'number' && (
          <div
            className="flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full"
            style={{
              background: change >= 0 ? 'rgba(34,197,94,0.1)' : 'rgba(239,68,68,0.1)',
              color: change >= 0 ? '#22c55e' : '#ef4444',
            }}
          >
            {change >= 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
            {Math.abs(change)}%
          </div>
        )}
      </div>
      <div>
        <div className="text-2xl font-display font-bold mb-1" style={{color:'var(--color-text)'}}>{value}</div>
        <div className="text-sm" style={{color:'var(--color-text-muted)'}}>{title}</div>
        {subtitle && <div className="text-xs text-gray-600 mt-1">{subtitle}</div>}
      </div>
    </div>
  )
}

interface BadgeProps {
  variant: 'success' | 'warning' | 'danger' | 'info' | 'neutral'
  children: ReactNode
}

export function Badge({ variant, children }: BadgeProps) {
  return (
    <span className={`badge-${variant} text-xs font-semibold px-2.5 py-1 rounded-full inline-flex items-center gap-1.5`}>
      <span className={`w-1.5 h-1.5 rounded-full ${
        variant === 'success' ? 'bg-green-400' :
        variant === 'warning' ? 'bg-yellow-400' :
        variant === 'danger' ? 'bg-red-400' :
        variant === 'info' ? 'bg-sky-400' : 'bg-gray-400'
      }`}></span>
      {children}
    </span>
  )
}

interface TableProps {
  headers: string[]
  children: ReactNode
}

export function Table({ headers, children }: TableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
            {headers.map((h, i) => (
              <th
                key={i}
                className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider"
                style={{ color: 'var(--color-text-muted)' }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  )
}

interface CardProps {
  title?: string
  subtitle?: string
  children: ReactNode
  action?: ReactNode
  className?: string
}

export function Card({ title, subtitle, children, action, className = '' }: CardProps) {
  return (
    <div
      className={`rounded-2xl overflow-hidden animate-fade-in ${className}`} style={{background:'var(--color-surface)', border:'1px solid var(--color-border)'}}
    >
      {(title || action) && (
        <div
          className="flex items-center justify-between px-5 py-4"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
        >
          <div>
            {title && <h3 className="font-display font-bold" style={{color:'var(--color-text)'}}>{title}</h3>}
            {subtitle && <p className="text-xs mt-0.5" style={{color:'var(--color-text-muted)'}}>{subtitle}</p>}
          </div>
          {action && <div>{action}</div>}
        </div>
      )}
      {children}
    </div>
  )
}

interface ProgressProps {
  value: number
  max?: number
  color?: string
  showLabel?: boolean
}

export function ProgressBar({ value, max = 100, color = '#0ea5e9', showLabel = false }: ProgressProps) {
  const pct = Math.min((value / max) * 100, 100)
  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${pct}%`, background: `linear-gradient(90deg, ${color}, ${color}cc)` }}
        />
      </div>
      {showLabel && <span className="text-xs text-gray-500 w-8 text-right">{Math.round(pct)}%</span>}
    </div>
  )
}

export function Avatar({ name, size = 'md', color }: { name: string; size?: 'sm' | 'md' | 'lg'; color?: string }) {
  const sizes = { sm: 'w-8 h-8 text-xs', md: 'w-10 h-10 text-sm', lg: 'w-12 h-12 text-base' }
  const initials = name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
  const colors = ['#0284c7', '#0369a1', '#ea580c', '#16a34a', '#7c3aed', '#db2777']
  const bg = color || colors[name.charCodeAt(0) % colors.length]

  return (
    <div
      className={`${sizes[size]} rounded-xl flex items-center justify-center font-bold text-white flex-shrink-0`}
      style={{ background: bg }}
    >
      {initials}
    </div>
  )
}

export function Empty({ message = 'Ma\'lumot topilmadi', icon = '📭' }: { message?: string; icon?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="text-4xl mb-4">{icon}</div>
      <p className="text-gray-500 text-sm">{message}</p>
    </div>
  )
}

export function Modal({ isOpen, onClose, title, children }: { isOpen: boolean; onClose: () => void; title: string; children: ReactNode }) {
  if (!isOpen) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div
        className="relative w-full max-w-lg rounded-2xl shadow-2xl animate-slide-up"
        style={{ background: 'var(--color-surface-2)', border: '1px solid var(--color-border)' }}
      >
        <div className="flex items-center justify-between p-5" style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
          <h3 className="font-display font-bold text-lg" style={{color:'var(--color-text)'}}>{title}</h3>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all"
          >
            ✕
          </button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  )
}
