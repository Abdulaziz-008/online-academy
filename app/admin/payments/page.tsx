'use client'
import { useState } from 'react'
import { Search, Download, RefreshCw, CheckCircle, XCircle, Clock, ArrowDownLeft } from 'lucide-react'
import { Card, Badge } from '@/components/ui'
import { mockPayments, formatCurrency } from '@/lib/data'
import { useTheme } from '@/lib/theme'
// import "../../globals.css"

const methodColors: Record<string, string> = {
  Payme: '#0ea5e9',
  Click: '#22c55e',
  Stripe: '#a855f7',
}

export default function PaymentsPage() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [payments, setPayments] = useState(mockPayments)
  const { t } = useTheme()

  const filtered = payments.filter(p => {
    const matchSearch = p.user.toLowerCase().includes(search.toLowerCase()) || p.id.toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter === 'all' || p.status === statusFilter
    return matchSearch && matchStatus
  })

  const totalSuccess = payments.filter(p => p.status === 'success').reduce((sum, p) => sum + p.amount, 0)
  const totalRefunded = payments.filter(p => p.status === 'refunded').reduce((sum, p) => sum + p.amount, 0)

  const handleRefund = (id: string) => {
    setPayments(prev => prev.map(p => p.id === id ? { ...p, status: 'refunded' } : p))
  }

  const statusIcon = (status: string) => {
    if (status === 'success') return <CheckCircle size={14} className="text-green-400" />
    if (status === 'failed') return <XCircle size={14} className="text-red-400" />
    if (status === 'pending') return <Clock size={14} className="text-yellow-400" />
    return <ArrowDownLeft size={14} className="text-gray-400" />
  }

const [showDropdown, setShowDropdown] = useState(false)

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Jami to\'lovlar', value: payments.length, color: '#0ea5e9', prefix: '' },
          { label: 'Muvaffaqiyatli', value: formatCurrency(totalSuccess), color: '#22c55e', prefix: '' },
          { label: 'Qaytarilgan', value: formatCurrency(totalRefunded), color: '#ef4444', prefix: '' },
          { label: 'Kutilmoqda', value: payments.filter(p => p.status === 'pending').length, color: '#eab308', prefix: '' },
        ].map(s => (
          <div key={s.label} className="glass rounded-xl px-4 py-3 flex items-center gap-3">
            <div className="w-2 h-8 rounded-full" style={{ background: s.color }} />
            <div className="min-w-0">
              <div className="text-lg font-display font-bold truncate" style={{color:'var(--color-text)'}}>{s.value}</div>
              <div className="text-xs text-gray-500">{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      <Card
        title={t('payments')}
        subtitle={`${filtered.length} ta tranzaksiya`}
        action={
          <button className="btn-secondary text-sm py-2 px-4">
            <Download size={15} /> Export
          </button>
        }
      >
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 px-5 py-4"
  style={{ borderBottom: '1px solid var(--color-border)' }}>
  
  {/* Search */}
  <div className="relative flex-1">
    <Search size={15} className="absolute top-1/2 -translate-y-1/2 pointer-events-none text-gray-500" style={{ left: 14 }} />
    <input
      placeholder="ID yoki ism bo'yicha qidiring..."
      value={search}
      onChange={e => setSearch(e.target.value)}
      style={{
        width: '100%',
        height: 38,
        paddingLeft: 40,
        paddingRight: 14,
        paddingTop: 8,
        paddingBottom: 8,
        background: 'rgba(255,255,255,0.05)',
        border: '1px solid var(--color-border)',
        borderRadius: 8,
        color: 'var(--color-text)',
        fontSize: 13,
        outline: 'none',
        fontFamily: 'inherit',
      }}
    />
  </div>

  {/* Katta ekran — tugmalar */}
  <div className="hidden sm:flex gap-1 p-1 rounded-xl"
    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
    {[
      { key: 'all', label: 'Barchasi' },
      { key: 'success', label: 'Muvaffaqiyatli' },
      { key: 'pending', label: 'Kutilmoqda' },
      { key: 'failed', label: 'Rad etildi' },
      { key: 'refunded', label: 'Qaytarilgan' },
    ].map(s => (
      <button
        key={s.key}
        onClick={() => setStatusFilter(s.key)}
        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap
          ${statusFilter === s.key ? 'bg-sky-500 text-white' : 'text-gray-400 hover:text-white'}`}
      >
        {s.label}
      </button>
    ))}
  </div>

  {/* Kichik ekran — custom select */}
  <div className="relative sm:hidden">
  <button
    onClick={() => setShowDropdown(!showDropdown)}
    style={{
      width: '100%',
      height: 38,
      paddingLeft: 12,
      paddingRight: 32,
      background: 'var(--color-surface-2)',
      border: '1px solid var(--color-border)',
      borderRadius: 8,
      color: 'var(--color-text)',
      fontSize: 13,
      fontWeight: 500,
      fontFamily: 'inherit',
      cursor: 'pointer',
      textAlign: 'left',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      boxSizing: 'border-box',
    }}
  >
    <span>
      {statusFilter === 'all' ? 'Barchasi' :
       statusFilter === 'success' ? 'Muvaffaqiyatli' :
       statusFilter === 'pending' ? 'Kutilmoqda' :
       statusFilter === 'failed' ? 'Rad etildi' : 'Qaytarilgan'}
    </span>
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
      style={{ flexShrink: 0, transform: showDropdown ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
      <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="1.5"
        strokeLinecap="round" strokeLinejoin="round"
        style={{ color: 'var(--color-text-muted)' }} />
    </svg>
  </button>

  {showDropdown && (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-10"
        onClick={() => setShowDropdown(false)}
      />
      {/* Options */}
      <div
        className="absolute left-0 right-0 z-20 mt-1 rounded-xl overflow-hidden shadow-xl"
        style={{
          background: 'var(--color-surface-2)',
          border: '1px solid var(--color-border)',
          width: '100%',
        }}
      >
        {[
          { key: 'all', label: 'Barchasi' },
          { key: 'success', label: 'Muvaffaqiyatli' },
          { key: 'pending', label: 'Kutilmoqda' },
          { key: 'failed', label: 'Rad etildi' },
          { key: 'refunded', label: 'Qaytarilgan' },
        ].map(s => (
          <button
            key={s.key}
            onClick={() => { setStatusFilter(s.key); setShowDropdown(false) }}
            style={{
              width: '100%',
              padding: '10px 14px',
              textAlign: 'left',
              fontSize: 13,
              fontWeight: statusFilter === s.key ? 600 : 400,
              fontFamily: 'inherit',
              cursor: 'pointer',
              background: statusFilter === s.key ? 'rgba(14,165,233,0.1)' : 'transparent',
              color: statusFilter === s.key ? '#0ea5e9' : 'var(--color-text)',
              border: 'none',
              borderBottom: '1px solid var(--color-border)',
              display: 'block',
            }}
            onMouseEnter={e => {
              if (statusFilter !== s.key)
                e.currentTarget.style.background = 'rgba(255,255,255,0.05)'
            }}
            onMouseLeave={e => {
              if (statusFilter !== s.key)
                e.currentTarget.style.background = 'transparent'
            }}
          >
            {s.label}
          </button>
        ))}
      </div>
    </>
  )}
</div>

</div>



        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                {[t('transactionId'), t('user'), t('course'), t('amount'), t('paymentMethod'), t('date'), t('status'), t('action')].map(h => (
                  <th key={h} className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wider" style={{ color: '#374151' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(payment => (
                <tr key={payment.id} className="table-row-hover" style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                  <td className="px-5 py-3.5">
                    <span className="font-mono text-xs text-sky-400">{payment.id}</span>
                  </td>
                  <td className="px-5 py-3.5 text-sm font-medium" style={{color:'var(--color-text)'}}>{payment.user}</td>
                  <td className="px-5 py-3.5 text-sm text-gray-400 max-w-[180px]">
                    <span className="truncate block">{payment.course}</span>
                  </td>
                  <td className="px-5 py-3.5 text-sm font-bold" style={{color:'var(--color-text)'}}>{formatCurrency(payment.amount)}</td>
                  <td className="px-5 py-3.5">
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full" style={{ background: `${methodColors[payment.method]}20`, color: methodColors[payment.method] }}>
                      {payment.method}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-xs text-gray-500">{payment.date}</td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-1.5">
                      {statusIcon(payment.status)}
                      <Badge variant={payment.status === 'success' ? 'success' : payment.status === 'pending' ? 'warning' : payment.status === 'failed' ? 'danger' : 'neutral'}>
                        {payment.status === 'success' ? t('success') : payment.status === 'pending' ? t('pending') : payment.status === 'failed' ? t('failed') : t('refunded')}
                      </Badge>
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    {payment.status === 'success' && (
                      <button onClick={() => handleRefund(payment.id)} className="text-xs text-orange-400 hover:text-orange-300 flex items-center gap-1 transition-colors">
                        <RefreshCw size={12} /> Refund
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="py-16 text-center">
              <div className="text-4xl mb-3">💳</div>
              <p className="text-gray-500 text-sm">To'lov topilmadi</p>
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}
