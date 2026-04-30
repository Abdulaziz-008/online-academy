'use client'
import { useState } from 'react'
import { Search, Download, RefreshCw, CheckCircle, XCircle, Clock, ArrowDownLeft } from 'lucide-react'
import { Card, Badge } from '@/components/ui'
import { mockPayments, formatCurrency } from '@/lib/data'
import { useTheme } from '@/lib/theme'

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
        <div className="flex flex-col sm:flex-row gap-3 px-5 py-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
          <div className="relative flex-1">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
            <input className="input-base pl-9 text-sm" style={{ height: 38 }} placeholder="ID yoki ism bo'yicha qidiring..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <div className="flex gap-1 p-1 rounded-xl" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
            {['all', 'success', 'pending', 'failed', 'refunded'].map(s => (
              <button key={s} onClick={() => setStatusFilter(s)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${statusFilter === s ? 'bg-sky-500 text-white' : 'text-gray-400 hover:text-white'}`}>
                {s === 'all' ? 'Barchasi' : s === 'success' ? 'Muvaffaqiyatli' : s === 'pending' ? 'Kutilmoqda' : s === 'failed' ? 'Rad etilgan' : 'Qaytarilgan'}
              </button>
            ))}
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
