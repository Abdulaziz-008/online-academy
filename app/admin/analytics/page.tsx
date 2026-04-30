'use client'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  AreaChart, Area, BarChart, Bar, RadarChart, Radar, PolarGrid, PolarAngleAxis, Legend
} from 'recharts'
import { TrendingUp, TrendingDown, Users, BookOpen, DollarSign, Award } from 'lucide-react'
import { Card, ProgressBar } from '@/components/ui'
import { revenueData, mockCourses, weeklyActivity, formatCurrency } from '@/lib/data'
import { useTheme } from '@/lib/theme'


const kpiData = [
  { month: 'Okt', newUsers: 98, churn: 12, retention: 88 },
  { month: 'Noy', newUsers: 124, churn: 18, retention: 86 },
  { month: 'Dek', newUsers: 156, churn: 14, retention: 91 },
  { month: 'Yan', newUsers: 143, churn: 22, retention: 85 },
  { month: 'Fev', newUsers: 189, churn: 16, retention: 92 },
  { month: 'Mar', newUsers: 212, churn: 19, retention: 90 },
]

const conversionData = [
  { stage: 'Tashrif', value: 10000 },
  { stage: 'Ro\'yxat', value: 3400 },
  { stage: 'Sinov', value: 1800 },
  { stage: 'Xarid', value: 842 },
  { stage: 'Qayta xarid', value: 312 },
]

const radarData = [
  { subject: 'Frontend', A: 90, fullMark: 100 },
  { subject: 'Backend', A: 75, fullMark: 100 },
  { subject: 'Mobile', A: 60, fullMark: 100 },
  { subject: 'Design', A: 70, fullMark: 100 },
  { subject: 'DevOps', A: 45, fullMark: 100 },
  { subject: 'Data', A: 30, fullMark: 100 },
]

export default function AnalyticsPage() {
  const { t } = useTheme()
  const topCourses = [...mockCourses].sort((a, b) => b.students - a.students).slice(0, 5)
  const maxStudents = topCourses[0]?.students || 1

  return (
    <div className="space-y-6 animate-fade-in">
      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: t('mrr'), value: '18.45M so\'m', change: 18, up: true, icon: <DollarSign size={18} />, color: '#0ea5e9' },
          { label: t('newUsers'), value: '212', change: 12, up: true, icon: <Users size={18} />, color: '#22c55e' },
          { label: t('courseCompletion'), value: '68%', change: 3, up: true, icon: <BookOpen size={18} />, color: '#f97316' },
          { label: t('retentionRate'), value: '90%', change: 2, up: true, icon: <Award size={18} />, color: '#a855f7' },
        ].map((kpi, i) => (
          <div key={i} className="glass rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${kpi.color}20` }}>
                <span style={{ color: kpi.color }}>{kpi.icon}</span>
              </div>
              <div className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${kpi.up ? 'text-green-400 bg-green-400/10' : 'text-red-400 bg-red-400/10'}`}>
                {kpi.up ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
                {kpi.change}%
              </div>
            </div>
            <div className="text-2xl font-display font-bold mb-1" style={{color:'var(--color-text)'}}>{kpi.value}</div>
            <div className="text-sm text-gray-500">{kpi.label}</div>
          </div>
        ))}
      </div>

      {/* Revenue & Users trend */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title={t('revenueDynamics')} subtitle="Oxirgi 12 oy dinamikasi">
          <div className="p-4 h-60">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="revAnalytics" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                <XAxis dataKey="month" tick={{ fill: '#4b5563', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#4b5563', fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={v => `${(v / 1000000).toFixed(0)}M`} />
                <Tooltip contentStyle={{ background: '#1a1a2e', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: '#e8e8f0' }} formatter={(v: any) => [formatCurrency(v), 'Daromad']} />
                <Area type="monotone" dataKey="revenue" stroke="#0ea5e9" strokeWidth={2} fill="url(#revAnalytics)" dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title={t('userMetrics')} subtitle="Yangi, chiqib ketgan, saqlangan">
          <div className="p-4 h-60">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={kpiData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                <XAxis dataKey="month" tick={{ fill: '#4b5563', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#4b5563', fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: '#1a1a2e', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: '#e8e8f0' }} />
                <Legend wrapperStyle={{ fontSize: 11, color: '#6b7280' }} />
                <Line type="monotone" dataKey="newUsers" name="Yangi" stroke="#22c55e" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="churn" name="Churn" stroke="#ef4444" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="retention" name="Saqlangan %" stroke="#0ea5e9" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Conversion funnel + Radar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card title="Konversiya quyrug'i" subtitle="Tashrif → Xarid jarayoni">
            <div className="p-5 space-y-3">
              {conversionData.map((item, i) => {
                const pct = (item.value / conversionData[0].value) * 100
                return (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-24 text-xs text-gray-400 text-right flex-shrink-0">{item.stage}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <div className="flex-1 h-8 rounded-lg overflow-hidden relative" style={{ background: 'rgba(255,255,255,0.04)' }}>
                          <div
                            className="h-full rounded-lg transition-all duration-700 flex items-center px-3"
                            style={{ width: `${pct}%`, background: `linear-gradient(90deg, #0ea5e9${Math.round(pct * 2.55).toString(16).padStart(2, '0')}, #0284c7${Math.round(pct * 2.55).toString(16).padStart(2, '0')}` }}
                          >
                            <span className="text-xs font-bold text-white whitespace-nowrap">{item.value.toLocaleString()}</span>
                          </div>
                        </div>
                        <span className="text-xs text-gray-500 w-10 text-right">{pct.toFixed(0)}%</span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </Card>
        </div>

        <Card title="Kategoriya analizi" subtitle="Kurs kategoriyalari nisbati">
          <div className="p-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid stroke="rgba(255,255,255,0.08)" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#6b7280', fontSize: 11 }} />
                <Radar name="Studentlar" dataKey="A" stroke="#0ea5e9" fill="#0ea5e9" fillOpacity={0.2} strokeWidth={2} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Top courses table */}
      <Card title="Eng yaxshi kurslar" subtitle="Studentlar soni bo'yicha reyting">
        <div className="p-5 space-y-4">
          {topCourses.map((course, i) => (
            <div key={course.id} className="flex items-center gap-4">
              <div className="w-6 text-center text-sm font-bold" style={{ color: i === 0 ? '#eab308' : '#4b5563' }}>{i + 1}</div>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center text-lg" style={{ background: 'rgba(255,255,255,0.06)' }}>{course.image}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm font-medium truncate mr-4" style={{color:'var(--color-text)'}}>{course.title}</span>
                  <span className="text-xs text-gray-400 flex-shrink-0">{course.students} student</span>
                </div>
                <ProgressBar value={course.students} max={maxStudents} color={['#0ea5e9', '#22c55e', '#f97316', '#a855f7', '#eab308'][i]} />
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
