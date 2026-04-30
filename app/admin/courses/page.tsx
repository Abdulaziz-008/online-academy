'use client'
import { useState } from 'react'
import { Plus, Search, Star, Users, Clock, BookOpen, Edit2, Trash2, Eye, MoreVertical } from 'lucide-react'
import { Card, Badge, Modal } from '@/components/ui'
import { mockCourses } from '@/lib/data'
import { useTheme } from '@/lib/theme'

const categories = ['Barchasi', 'Frontend', 'Backend', 'Mobile', 'Design', 'DevOps']

export default function CoursesPage() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('Barchasi')
  const [courses, setCourses] = useState(mockCourses)
  const [showModal, setShowModal] = useState(false)
  const [editCourse, setEditCourse] = useState<typeof mockCourses[0] | null>(null)
  const [openMenu, setOpenMenu] = useState<string | null>(null)
  const [form, setForm] = useState({ title: '', category: 'Frontend', price: '', duration: '', status: 'draft' })
  const { t } = useTheme()

  const filtered = courses.filter(c => {
    const matchSearch = c.title.toLowerCase().includes(search.toLowerCase())
    const matchCat = category === 'Barchasi' || c.category === category
    return matchSearch && matchCat
  })

  const handleSave = () => {
    if (editCourse) {
      setCourses(prev => prev.map(c => c.id === editCourse.id ? { ...c, ...form, price: Number(form.price) } : c))
    } else {
      const newCourse = {
        id: Date.now().toString(),
        ...form,
        price: Number(form.price),
        students: 0,
        lessons: 0,
        rating: 0,
        image: '📚',
        instructor: 'Admin',
        created: new Date().toISOString().split('T')[0],
      }
      setCourses(prev => [...prev, newCourse])
    }
    setShowModal(false)
    setEditCourse(null)
    setForm({ title: '', category: 'Frontend', price: '', duration: '', status: 'draft' })
  }

  const openEdit = (course: typeof mockCourses[0]) => {
    setEditCourse(course)
    setForm({ title: course.title, category: course.category, price: course.price.toString(), duration: course.duration, status: course.status })
    setShowModal(true)
    setOpenMenu(null)
  }

  const deleteCourse = (id: string) => {
    setCourses(prev => prev.filter(c => c.id !== id))
    setOpenMenu(null)
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: t('totalCoursesLabel'), value: courses.length, color: '#0ea5e9' },
          { label: t('published'), value: courses.filter(c => c.status === 'published').length, color: '#22c55e' },
          { label: t('draft'), value: courses.filter(c => c.status === 'draft').length, color: '#f97316' },
          { label: t('totalStudents'), value: courses.reduce((s, c) => s + c.students, 0), color: '#a855f7' },
        ].map(s => (
          <div key={s.label} className="glass rounded-xl px-4 py-3 flex items-center gap-3">
            <div className="w-2 h-8 rounded-full" style={{ background: s.color }} />
            <div>
              <div className="text-xl font-display font-bold" style={{color:'var(--color-text)'}}>{s.value}</div>
              <div className="text-xs text-gray-500">{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      <Card
        title={t('courses')}
        subtitle={`${filtered.length} ta kurs`}
        action={
          <button className="btn-primary text-sm py-2 px-4" onClick={() => { setEditCourse(null); setForm({ title: '', category: 'Frontend', price: '', duration: '', status: 'draft' }); setShowModal(true) }}>
            <Plus size={15} /> {t('newCoursesBtn')}
          </button>
        }
      >
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 px-5 py-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
          <div className="relative flex-1">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
            <input className="input-base pl-9 text-sm" style={{ height: 38 }} placeholder="Kurs nomini qidiring..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <div className="flex gap-1 flex-wrap">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${category === cat ? 'bg-sky-500 text-white' : 'glass text-gray-400 hover:text-white'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="p-5 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map(course => (
            <div
              key={course.id}
              className="rounded-xl overflow-hidden group transition-all duration-300 hover:-translate-y-1"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
            >
              {/* Course header */}
              <div className="relative h-28 flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.04)' }}>
                <span className="text-5xl">{course.image}</span>
                <div className="absolute top-3 left-3">
                  <Badge variant={course.status === 'published' ? 'success' : 'warning'}>
                    {course.status === 'published' ? t('courseStatus_published') : t('courseStatus_draft')}
                  </Badge>
                </div>
                <div className="absolute top-2 right-2">
                  <div className="relative">
                    <button
                      onClick={() => setOpenMenu(openMenu === course.id ? null : course.id)}
                      className="p-1.5 rounded-lg text-gray-500 hover:text-white hover:bg-white/10 transition-all"
                    >
                      <MoreVertical size={15} />
                    </button>
                    {openMenu === course.id && (
                      <div className="absolute right-0 top-8 w-40 rounded-xl shadow-xl z-20 overflow-hidden animate-slide-up" style={{ background: '#1a1a2e', border: '1px solid rgba(255,255,255,0.1)' }}>
                        <button onClick={() => openEdit(course)} className="w-full px-4 py-2.5 text-left text-sm flex items-center gap-2 hover:bg-white/5 transition-colors text-sky-400">
                          <Edit2 size={13} /> Tahrirlash
                        </button>
                        <button onClick={() => deleteCourse(course.id)} className="w-full px-4 py-2.5 text-left text-sm flex items-center gap-2 hover:bg-white/5 transition-colors text-red-400">
                          <Trash2 size={13} /> O'chirish
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="p-4">
                <div className="text-xs font-semibold mb-1.5" style={{ color: '#0ea5e9' }}>{course.category}</div>
                <h3 className="font-semibold text-sm leading-snug mb-3 line-clamp-2" style={{color:'var(--color-text)'}}>{course.title}</h3>

                <div className="grid grid-cols-3 gap-2 mb-4">
                  {[
                    { icon: <Users size={11} />, val: course.students },
                    { icon: <BookOpen size={11} />, val: `${course.lessons} dars` },
                    { icon: <Clock size={11} />, val: course.duration },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-1 text-xs text-gray-500">
                      {item.icon} {item.val}
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-lg font-display font-bold" style={{color:'var(--color-text)'}}>{(course.price / 1000).toFixed(0)}K</span>
                    <span className="text-xs text-gray-500 ml-1">so'm</span>
                  </div>
                  {course.rating > 0 && (
                    <div className="flex items-center gap-1 text-xs text-yellow-400">
                      <Star size={12} fill="currentColor" /> {course.rating}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="col-span-3 py-16 text-center">
              <div className="text-4xl mb-3">📚</div>
              <p className="text-gray-500 text-sm">Kurs topilmadi</p>
            </div>
          )}
        </div>
      </Card>

      {/* Create/Edit Modal */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title={editCourse ? t('editCourse') : t('newCourse  ')}>
        <div className="space-y-4">
          <div>
            <label className="text-sm text-gray-400 font-medium mb-1.5 block">Kurs nomi</label>
            <input className="input-base" placeholder="Masalan: React.js Bootcamp" value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-400 font-medium mb-1.5 block">Kategoriya</label>
              <select className="input-base" value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value }))}>
                {categories.slice(1).map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="text-sm text-gray-400 font-medium mb-1.5 block">Narx (so'm)</label>
              <input className="input-base" type="number" placeholder="299000" value={form.price} onChange={e => setForm(p => ({ ...p, price: e.target.value }))} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-400 font-medium mb-1.5 block">Davomiyligi</label>
              <input className="input-base" placeholder="24 soat" value={form.duration} onChange={e => setForm(p => ({ ...p, duration: e.target.value }))} />
            </div>
            <div>
              <label className="text-sm text-gray-400 font-medium mb-1.5 block">Holat</label>
              <select className="input-base" value={form.status} onChange={e => setForm(p => ({ ...p, status: e.target.value }))}>
                <option value="draft">Qoralama</option>
                <option value="published">Nashr etish</option>
              </select>
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <button className="btn-primary flex-1 justify-center" onClick={handleSave}>
              {editCourse ? 'Saqlash' : 'Yaratish'}
            </button>
            <button className="btn-secondary flex-1 justify-center" onClick={() => setShowModal(false)}>
              Bekor qilish
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
