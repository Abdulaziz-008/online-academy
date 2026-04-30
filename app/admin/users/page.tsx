'use client'
import { useState } from 'react'
import { Search, Filter, UserPlus, MoreVertical, Ban, Trash2, Eye, Mail, Phone } from 'lucide-react'
import { Card, Badge, Avatar, Modal } from '@/components/ui'
import { mockUsers } from '@/lib/data'
import { useTheme } from '@/lib/theme'

type UserStatus = 'all' | 'active' | 'blocked' | 'inactive'

export default function UsersPage() {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<UserStatus>('all')
  const [selectedUser, setSelectedUser] = useState<typeof mockUsers[0] | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [users, setUsers] = useState(mockUsers)
  const [openMenu, setOpenMenu] = useState<string | null>(null)
  const { t } = useTheme()

  const filtered = users.filter(u => {
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase())
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
          { label: 'Jami', value: users.length, color: '#0ea5e9' },
          { label: t('active2'), value: stats.active, color: '#22c55e' },
          { label: t('blocked'), value: stats.blocked, color: '#ef4444' },
          { label: t('inactive'), value: stats.inactive, color: '#6b7280' },
        ].map(s => (
          <div key={s.label} className="glass rounded-xl px-4 py-3 flex items-center gap-3">
            <div className="w-2 h-8 rounded-full" style={{ background: s.color }} />
            <div>
              <div className="text-xl font-display font-bold" style={{color:'var(--color-text)'}}>{s.value}</div>
              <div className="text-xs" style={{color:'var(--color-text-muted)'}}>{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      <Card
        title={t('users')}
        subtitle={`${filtered.length} ta foydalanuvchi topildi`}
        action={
          <button className="btn-primary text-sm py-2 px-4">
            <UserPlus size={15} />
            Yangi user
          </button>
        }
      >
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 px-5 py-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
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
          <div className="flex gap-1 p-1 rounded-xl" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
            {(['all', 'active', 'blocked', 'inactive'] as const).map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${filter === f ? 'bg-sky-500 text-white' : 'text-gray-400 hover:text-white'}`}
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
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                {[t('user'), t('phone'), t('courses'), t('spent'), 'Qo\'shilgan', t('status'), ''].map(h => (
                  <th key={h} className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wider" style={{ color: '#374151' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(user => (
                <tr key={user.id} className="table-row-hover" style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <Avatar name={user.name} size="sm" />
                      <div>
                        <div className="text-sm font-semibold" style={{color:'var(--color-text)'}}>{user.name}</div>
                        <div className="text-xs" style={{color:'var(--color-text-muted)'}}>{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-sm text-gray-400">{user.phone}</td>
                  <td className="px-5 py-3.5">
                    <span className="text-sm font-semibold" style={{color:'var(--color-text)'}}>{user.courses}</span>
                    <span className="text-xs text-gray-600 ml-1">kurs</span>
                  </td>
                  <td className="px-5 py-3.5 text-sm font-semibold" style={{color:'var(--color-text)'}}>{(user.spent / 1000).toFixed(0)}K so'm</td>
                  <td className="px-5 py-3.5 text-sm text-gray-500">{user.joined}</td>
                  <td className="px-5 py-3.5">
                    <Badge variant={user.status === 'active' ? 'success' : user.status === 'blocked' ? 'danger' : 'neutral'}>
                      {user.status === 'active' ? t('active2') : user.status === 'blocked' ? t('blocked') : t('inactive')}
                    </Badge>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => { setSelectedUser(user); setShowModal(true) }}
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
                          <div
                            className="absolute right-0 top-8 w-44 rounded-xl shadow-xl z-20 overflow-hidden animate-slide-up"
                            style={{ background: '#1a1a2e', border: '1px solid rgba(255,255,255,0.1)' }}
                          >
                            <button
                              onClick={() => toggleBlock(user.id)}
                              className="w-full px-4 py-2.5 text-left text-sm flex items-center gap-2.5 hover:bg-white/5 transition-colors"
                              style={{ color: user.status === 'blocked' ? '#22c55e' : '#ef4444' }}
                            >
                              <Ban size={14} />
                              {user.status === 'blocked' ? 'Blokni ochish' : 'Bloklash'}
                            </button>
                            <button
                              onClick={() => deleteUser(user.id)}
                              className="w-full px-4 py-2.5 text-left text-sm flex items-center gap-2.5 hover:bg-white/5 transition-colors text-red-400"
                            >
                              <Trash2 size={14} />
                              O'chirish
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
              <p className="text-gray-500 text-sm">Foydalanuvchi topilmadi</p>
            </div>
          )}
        </div>
      </Card>

      {/* User Detail Modal */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Foydalanuvchi ma'lumotlari">
        {selectedUser && (
          <div className="space-y-5">
            <div className="flex items-center gap-4">
              <Avatar name={selectedUser.name} size="lg" />
              <div>
                <h3 className="font-display font-bold text-xl" style={{color:'var(--color-text)'}}>{selectedUser.name}</h3>
                <Badge variant={selectedUser.status === 'active' ? 'success' : selectedUser.status === 'blocked' ? 'danger' : 'neutral'}>
                  {selectedUser.status === 'active' ? 'Faol' : selectedUser.status === 'blocked' ? 'Bloklangan' : 'Nofaol'}
                </Badge>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: <Mail size={14} />, label: 'Email', value: selectedUser.email },
                { icon: <Phone size={14} />, label: 'Telefon', value: selectedUser.phone },
                { icon: null, label: 'Qo\'shilgan', value: selectedUser.joined },
                { icon: null, label: 'Kurslar', value: `${selectedUser.courses} ta` },
              ].map((item, i) => (
                <div key={i} className="p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.04)' }}>
                  <div className="text-xs text-gray-500 mb-1 flex items-center gap-1.5">{item.icon}{item.label}</div>
                  <div className="text-sm font-medium" style={{color:'var(--color-text)'}}>{item.value}</div>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-xl" style={{ background: 'rgba(14,165,233,0.08)', border: '1px solid rgba(14,165,233,0.2)' }}>
              <div className="text-xs text-sky-400 mb-1">Jami sarflagan</div>
              <div className="text-2xl font-display font-bold" style={{color:'var(--color-text)'}}>{(selectedUser.spent / 1000).toFixed(0)}K so'm</div>
            </div>

            <div className="flex gap-3">
              <button className="btn-danger flex-1 justify-center" onClick={() => { toggleBlock(selectedUser.id); setShowModal(false) }}>
                <Ban size={15} />
                {selectedUser.status === 'blocked' ? t('unblockUser') : t('blockUser')}
              </button>
              <button className="btn-secondary flex-1 justify-center" onClick={() => setShowModal(false)}>
                {t('close')}
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
