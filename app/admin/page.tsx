'use client'
import { useState } from 'react'
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, BarChart, Bar, Legend
} from 'recharts'
import { Users, BookOpen, CreditCard, TrendingUp, Star, Clock, Award, ArrowUpRight } from 'lucide-react'
import { StatCard, Card, Badge, Avatar, ProgressBar } from '@/components/ui'
import { mockStats, revenueData, courseDistribution, mockUsers, mockCourses, weeklyActivity, formatCurrency, formatNumber } from '@/lib/data'
import { useTheme } from '@/lib/theme'

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-strong rounded-xl px-4 py-3 shadow-xl">
        <p className="text-xs text-gray-400 mb-1">{label}</p>
        {payload.map((p: any, i: number) => (
          <p key={i} className="text-sm font-semibold" style={{ color: p.color }}>
            {p.name}: {p.name === 'revenue' ? formatCurrency(p.value) : p.value}
          </p>
        ))}
      </div>
    )
  }
  return null
}

export default function AdminDashboard() {
  const [period, setPeriod] = useState<'week' | 'month' | 'year'>('year')
  const { t } = useTheme()
  const topCourses = mockCourses.filter(c => c.status === 'published').slice(0, 4)

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Period filter */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm">Umumiy ko'rsatkichlar va statistika</p>
        </div>
        <div className="flex gap-1 p-1 rounded-xl" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
          {(['week', 'month', 'year'] as const).map(p => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${period === p ? 'bg-sky-500 text-white' : 'hover:text-white'}`}
              style={period === p ? {color:'var(--color-text-muted)'} : {}}
            >
              {p === 'week' ? t('week') : p === 'month' ? t('month') : t('year')}
            </button>
          ))}
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title={t('totalRevenue')}
          value={formatCurrency(mockStats.totalRevenue)}
          change={18}
          icon={<CreditCard size={20} />}
          color="#0ea5e9"
          subtitle={t('allTime')}
        />
        <StatCard
          title={t('totalUsers')}
          value={formatNumber(mockStats.totalUsers)}
          change={12}
          icon={<Users size={20} />}
          color="#22c55e"
          subtitle={`${formatNumber(mockStats.activeUsers)} ${t('active')}`}
        />
        <StatCard
          title={t('totalCourses')}
          value={mockStats.totalCourses.toString()}
          change={5}
          icon={<BookOpen size={20} />}
          color="#f97316"
          subtitle={`${mockStats.activeCourses} faol`}
        />
        <StatCard
          title={t('compilationRate')}
          value={`${mockStats.completionRate}%`}
          change={3}
          icon={<TrendingUp size={20} />}
          color="#a855f7"
          subtitle={t('average')}
        />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue chart */}
        <div className="lg:col-span-2">
          <Card
            title={t('revenueDynamics')}
            subtitle={t('monthlyStats')}
            action={
              <span className="text-xs text-green-400 flex items-center gap-1 font-semibold">
                <TrendingUp size={12} /> +18% {t('growth')}
              </span>
            }
          >
            <div className="p-4 h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData}>
                  <defs>
                    <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                  <XAxis dataKey="month" tick={{ fill: '#4b5563', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#4b5563', fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={v => `${(v/1000000).toFixed(0)}M`} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="revenue" name="revenue" stroke="#0ea5e9" strokeWidth={2} fill="url(#revGrad)" dot={false} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        {/* Pie chart */}
        <Card title={t('courseDistribution')} subtitle={t('byCategory')}>
          <div className="p-4 h-64 flex flex-col items-center justify-center">
            <ResponsiveContainer width="100%" height={160}>
              <PieChart>
                <Pie data={courseDistribution} cx="50%" cy="50%" innerRadius={45} outerRadius={70} paddingAngle={3} dataKey="value">
                  {courseDistribution.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(v) => [`${v}%`, '']} contentStyle={{ background: '#1a1a2e', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8 }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 w-full mt-2">
              {courseDistribution.map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: item.color }} />
                  <span className="text-xs text-gray-400 truncate">{item.name}</span>
                  <span className="text-xs font-semibold text-gray-300 ml-auto">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* Weekly activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card title={t('weeklyActivity')} subtitle={t('sessionsTests')}>
          <div className="p-4 h-52">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyActivity} barSize={10} barGap={4}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
                <XAxis dataKey="day" tick={{ fill: '#4b5563', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#4b5563', fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: '#1a1a2e', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8 }} />
                <Bar dataKey="sessions" name={t('sessions')} fill="#0ea5e9" radius={[4, 4, 0, 0]} />
                <Bar dataKey="tests" name="Testlar" fill="#f97316" radius={[4, 4, 0, 0]} />
                <Legend wrapperStyle={{ fontSize: 11, color: '#6b7280' }} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Top courses */}
        <div className="lg:col-span-2">
          <Card
            title={t('topCourses')}
            subtitle={t('mostSold')}
            action={<a href="/admin/courses" className="text-xs text-sky-400 hover:text-sky-300 flex items-center gap-1">{t('seeAll2')} <ArrowUpRight size={12} /></a>}
          >
            <div className="divide-y" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
              {topCourses.map((course, i) => (
                <div key={course.id} className="px-5 py-4 flex items-center gap-4 hover:bg-white/3 transition-colors">
                  <div className="w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0"
                    style={{ background: i === 0 ? 'rgba(234,179,8,0.2)' : 'rgba(255,255,255,0.05)', color: i === 0 ? '#eab308' : '#6b7280' }}>
                    {i + 1}
                  </div>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                    style={{ background: 'rgba(255,255,255,0.05)' }}>
                    {course.image}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold truncate" style={{color:'var(--color-text)'}}>{course.title}</div>
                    <div className="flex items-center gap-3 mt-0.5">
                      <span className="text-xs text-gray-500">{course.students} {t('students')}</span>
                      <div className="flex items-center gap-1 text-xs text-yellow-400">
                        <Star size={10} fill="currentColor" />
                        {course.rating}
                      </div>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="text-sm font-bold" style={{color:'var(--color-text)'}}>{(course.price / 1000).toFixed(0)}K</div>
                    <div className="text-xs text-gray-600">so'm</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Recent users */}
      <Card
        title={t('recentUsers')}
        subtitle={t('newlyRegistered')}
        action={<a href="/admin/users" className="text-xs text-sky-400 hover:text-sky-300 flex items-center gap-1">{t('seeAll2')} <ArrowUpRight size={12} /></a>}
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                {[t('user'), t('email'), t('courses'), t('spent'), t('status')].map(h => (
                  <th key={h} className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wider" style={{ color: '#374151' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {mockUsers.slice(0, 5).map(user => (
                <tr key={user.id} className="table-row-hover" style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <Avatar name={user.name} size="sm" />
                      <span className="text-sm font-medium" style={{color:'var(--color-text)'}}>{user.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-sm text-gray-500">{user.email}</td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2">
                      <BookOpen size={13} className="text-gray-600" />
                      <span className="text-sm" style={{color:'var(--color-text)'}}>{user.courses}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-sm font-semibold" style={{color:'var(--color-text)'}}>{(user.spent / 1000).toFixed(0)}K so'm</td>
                  <td className="px-5 py-3.5">
                    <Badge variant={user.status === 'active' ? 'success' : user.status === 'blocked' ? 'danger' : 'neutral'}>
                      {user.status === 'active' ? t('active2') : user.status === 'blocked' ? t('blocked') : t('inactive')}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
