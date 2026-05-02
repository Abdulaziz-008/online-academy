'use client'
import { useState } from 'react'
import { Search, UserPlus, MoreVertical, Ban, Trash2, Eye, Mail, Phone, BookOpen, CreditCard, Calendar, TrendingUp } from 'lucide-react'
import { Card, Badge, Avatar, Modal, ProgressBar } from '@/components/ui'
import { mockUsers, studentData, mockCourses } from '@/lib/data'
import { useTheme } from '@/lib/theme'

// user id mapping (mockUsers id → studentData id)
const userStudentMap: Record<string, string> = {
  '1': '2', '2': '3', '3': '4', '4': '5',
  '5': '6', '6': '7', '7': '8', '8': '9',
}

type UserStatus = 'all' | 'active' | 'blocked' | 'inactive'

export default function UsersPage() {
  const { t } = useTheme()
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<UserStatus>('all')
  const [selectedUser, setSelectedUser] = useState<typeof mockUsers[0] | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [users, setUsers] = useState(mockUsers)
  const [openMenu, setOpenMenu] = useState<string | null>(null)

  const filtered = users.filter(u => {
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
    const matchFilter = filter === 'all' || u.status === filter
    return matchSearch && matchFilter
  })

  const toggleBlock = (id: string) => {
    setUsers(prev => prev.map(u =>
      u.id === id ? { ...u, status: u.status === 'blocked' ? 'active' : 'blocked' } : u
    ))
    setOpenMenu(null)
  }

  const deleteUser = (id: string) => {
    setUsers(prev => prev.filter(u => u.id !== id))
    setOpenMenu(null)
    if (selectedUser?.id === id) setShowModal(false)
  }

  const openUserModal = (user: typeof mockUsers[0]) => {
    setSelectedUser(user)
    setShowModal(true)
    setOpenMenu(null)
  }

  const stats = {
    total: users.length,
    active: users.filter(u => u.status === 'active').length,
    blocked: users.filter(u => u.status === 'blocked').length,
    inactive: users.filter(u => u.status === 'inactive').length,
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Mini stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Jami', value: stats.total, color: '#0ea5e9' },
          { label: t('active2'), value: stats.active, color: '#22c55e' },
          { label: t('blocked'), value: stats.blocked, color: '#ef4444' },
          { label: t('inactive'), value: stats.inactive, color: '#6b7280' },
        ].map(s => (
          <div key={s.label} className="glass rounded-xl px-4 py-3 flex items-center gap-3">
            <div className="w-2 h-8 rounded-full" style={{ background: s.color }} />
            <div>
              <div className="text-xl font-display font-bold" style={{ color: 'var(--color-text)' }}>{s.value}</div>
              <div className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      <Card
        title={t('users')}
        subtitle={`${filtered.length} ta foydalanuvchi`}
        action={
          <button className="btn-primary text-sm py-2 px-4">
            <UserPlus size={15} /> Yangi user
          </button>
        }
      >
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 px-5 py-4"
          style={{ borderBottom: '1px solid var(--color-border)' }}>
          <div className="relative flex-1">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
            <input
              className="input-base pl-9 text-sm"
              style={{ height: 38 }}
              placeholder="Ism yoki email bo'yicha qidiring..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <div className="flex gap-1 p-1 rounded-xl"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
            {(['all', 'active', 'blocked', 'inactive'] as const).map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap
                  ${filter === f ? 'bg-sky-500 text-white' : 'text-gray-400 hover:text-white'}`}
              >
                {f === 'all' ? 'Barchasi' : f === 'active' ? t('active2') : f === 'blocked' ? t('blocked') : t('inactive')}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                {[t('user'), t('phone'), 'Kurslar', t('spent'), "Qo'shilgan", t('status'), ''].map(h => (
                  <th key={h} className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wider"
                    style={{ color: 'var(--color-text-muted)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(user => (
                <tr
                  key={user.id}
                  className="table-row-hover cursor-pointer"
                  style={{ borderBottom: '1px solid var(--color-border)' }}
                  onClick={() => openUserModal(user)}
                >
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <Avatar name={user.name} size="sm" />
                      <div>
                        <div className="text-sm font-semibold" style={{ color: 'var(--color-text)' }}>{user.name}</div>
                        <div className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-sm" style={{ color: 'var(--color-text-muted)' }}>{user.phone}</td>
                  <td className="px-5 py-3.5">
                    <span className="text-sm font-semibold" style={{ color: 'var(--color-text)' }}>{user.courses}</span>
                    <span className="text-xs ml-1" style={{ color: 'var(--color-text-muted)' }}>ta</span>
                  </td>
                  <td className="px-5 py-3.5 text-sm font-semibold" style={{ color: 'var(--color-text)' }}>
                    {(user.spent / 1000).toFixed(0)}K so'm
                  </td>
                  <td className="px-5 py-3.5 text-sm" style={{ color: 'var(--color-text-muted)' }}>{user.joined}</td>
                  <td className="px-5 py-3.5">
                    <Badge variant={user.status === 'active' ? 'success' : user.status === 'blocked' ? 'danger' : 'neutral'}>
                      {user.status === 'active' ? t('active2') : user.status === 'blocked' ? t('blocked') : t('inactive')}
                    </Badge>
                  </td>
                  <td className="px-5 py-3.5" onClick={e => e.stopPropagation()}>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => openUserModal(user)}
                        className="p-1.5 rounded-lg text-gray-500 hover:text-sky-400 hover:bg-sky-400/10 transition-all"
                        title="Ko'rish"
                      >
                        <Eye size={14} />
                      </button>
                      <div className="relative">
                        <button
                          onClick={() => setOpenMenu(openMenu === user.id ? null : user.id)}
                          className="p-1.5 rounded-lg text-gray-500 hover:text-white hover:bg-white/10 transition-all"
                        >
                          <MoreVertical size={14} />
                        </button>
                        {openMenu === user.id && (
                          <div className="absolute right-0 top-8 w-44 rounded-xl shadow-xl z-20 overflow-hidden animate-slide-up"
                            style={{ background: 'var(--color-surface-2)', border: '1px solid var(--color-border)' }}>
                            <button
                              onClick={() => toggleBlock(user.id)}
                              className="w-full px-4 py-2.5 text-left text-sm flex items-center gap-2.5 hover:bg-white/5 transition-colors"
                              style={{ color: user.status === 'blocked' ? '#22c55e' : '#ef4444' }}
                            >
                              <Ban size={14} />
                              {user.status === 'blocked' ? t('unblockUser') : t('blockUser')}
                            </button>
                            <button
                              onClick={() => deleteUser(user.id)}
                              className="w-full px-4 py-2.5 text-left text-sm flex items-center gap-2.5 hover:bg-white/5 transition-colors text-red-400"
                            >
                              <Trash2 size={14} /> O'chirish
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filtered.length === 0 && (
            <div className="py-16 text-center">
              <div className="text-4xl mb-3">👤</div>
              <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>Foydalanuvchi topilmadi</p>
            </div>
          )}
        </div>
      </Card>

      {/* User Detail Modal */}
      {selectedUser && (() => {
        const sId = userStudentMap[selectedUser.id]
        const sData = sId ? studentData[sId] : null
        const enrolledCourses = sData
          ? mockCourses.filter(c => sData.purchasedIds.includes(c.id))
          : []

        return (
          <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="O'quvchi ma'lumotlari">
            <div className="space-y-5">
              {/* Header */}
              <div className="flex items-center gap-4 p-4 rounded-xl"
                style={{ background: 'rgba(14,165,233,0.06)', border: '1px solid rgba(14,165,233,0.15)' }}>
                <Avatar name={selectedUser.name} size="lg" />
                <div>
                  <h3 className="font-display font-bold text-xl" style={{ color: 'var(--color-text)' }}>
                    {selectedUser.name}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant={selectedUser.status === 'active' ? 'success' : selectedUser.status === 'blocked' ? 'danger' : 'neutral'}>
                      {selectedUser.status === 'active' ? t('active2') : selectedUser.status === 'blocked' ? t('blocked') : t('inactive')}
                    </Badge>
                    <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                      {selectedUser.joined} dan beri
                    </span>
                  </div>
                </div>
              </div>

              {/* Contact info */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: <Mail size={14} />, label: 'Email', value: selectedUser.email },
                  { icon: <Phone size={14} />, label: 'Telefon', value: selectedUser.phone },
                  { icon: <Calendar size={14} />, label: "Qo'shilgan", value: selectedUser.joined },
                  { icon: <CreditCard size={14} />, label: 'Jami sarflagan', value: `${(selectedUser.spent / 1000).toFixed(0)}K so'm` },
                ].map((item, i) => (
                  <div key={i} className="p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.04)' }}>
                    <div className="text-xs flex items-center gap-1.5 mb-1" style={{ color: 'var(--color-text-muted)' }}>
                      {item.icon} {item.label}
                    </div>
                    <div className="text-sm font-semibold" style={{ color: 'var(--color-text)' }}>{item.value}</div>
                  </div>
                ))}
              </div>

              {/* Stats */}
              {sData && (
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: 'Kurslar', value: sData.purchasedIds.length, color: '#0ea5e9' },
                    { label: "O'rganilgan", value: sData.hoursLearned, color: '#f97316' },
                    { label: 'Testlar', value: sData.testsPassed, color: '#22c55e' },
                  ].map((s, i) => (
                    <div key={i} className="p-3 rounded-xl text-center"
                      style={{ background: `${s.color}10`, border: `1px solid ${s.color}25` }}>
                      <div className="text-lg font-display font-bold" style={{ color: s.color }}>{s.value}</div>
                      <div className="text-xs mt-0.5" style={{ color: 'var(--color-text-muted)' }}>{s.label}</div>
                    </div>
                  ))}
                </div>
              )}

              {/* Enrolled courses */}
              {enrolledCourses.length > 0 && (
                <div>
                  <div className="text-sm font-semibold mb-2 flex items-center gap-2" style={{ color: 'var(--color-text)' }}>
                    <BookOpen size={15} className="text-sky-400" />
                    Sotib olingan kurslar
                  </div>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {enrolledCourses.map(course => {
                      const progress = sData?.progresses[course.id] || 0
                      return (
                        <div key={course.id} className="flex items-center gap-3 p-2.5 rounded-xl"
                          style={{ background: 'rgba(255,255,255,0.04)' }}>
                          <span className="text-xl flex-shrink-0">{course.image}</span>
                          <div className="flex-1 min-w-0">
                            <div className="text-xs font-medium truncate" style={{ color: 'var(--color-text)' }}>
                              {course.title}
                            </div>
                            <div className="mt-1">
                              <ProgressBar value={progress} color={progress >= 80 ? '#22c55e' : '#0ea5e9'} showLabel />
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* Recent activity */}
              {sData && sData.recentActivity.length > 0 && (
                <div>
                  <div className="text-sm font-semibold mb-2 flex items-center gap-2" style={{ color: 'var(--color-text)' }}>
                    <TrendingUp size={15} className="text-orange-400" />
                    So'nggi faollik
                  </div>
                  <div className="space-y-1.5">
                    {sData.recentActivity.slice(0, 3).map((a, i) => (
                      <div key={i} className="flex items-center gap-2.5 p-2.5 rounded-xl"
                        style={{ background: 'rgba(255,255,255,0.03)' }}>
                        <span className="text-base">{a.icon}</span>
                        <div className="flex-1 min-w-0">
                          <div className="text-xs" style={{ color: 'var(--color-text)' }}>{a.text}</div>
                          <div className="text-xs mt-0.5" style={{ color: 'var(--color-text-muted)' }}>{a.time}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-3 pt-1">
                <button
                  className="btn-danger flex-1 justify-center"
                  onClick={() => { toggleBlock(selectedUser.id); setShowModal(false) }}
                >
                  <Ban size={15} />
                  {selectedUser.status === 'blocked' ? t('unblockUser') : t('blockUser')}
                </button>
                <button
                  className="btn-secondary flex-1 justify-center"
                  onClick={() => setShowModal(false)}
                >
                  {t('close')}
                </button>
              </div>
            </div>
          </Modal>
        )
      })()}
    </div>
  )
}