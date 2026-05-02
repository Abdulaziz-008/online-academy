'use client'
import { useState } from 'react'
import { Plus, Search, Star, Users, Clock, BookOpen, Edit2, Trash2, MoreVertical, Play, ChevronDown, ChevronUp, Lock, Youtube, GripVertical } from 'lucide-react'
import { Card, Badge, Modal } from '@/components/ui'
import { mockCourses, mockLessons, Lesson, getYoutubeId } from '@/lib/data'
import { useTheme } from '@/lib/theme'

const categories = ['Barchasi', 'Frontend', 'Backend', 'Mobile', 'Design', 'DevOps']

export default function CoursesPage() {
  const { t } = useTheme()
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('Barchasi')
  const [courses, setCourses] = useState(mockCourses)
  const [lessons, setLessons] = useState<Lesson[]>(mockLessons)
  const [showCourseModal, setShowCourseModal] = useState(false)
  const [showLessonModal, setShowLessonModal] = useState(false)
  const [editCourse, setEditCourse] = useState<typeof mockCourses[0] | null>(null)
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null)
  const [expandedCourse, setExpandedCourse] = useState<string | null>(null)
  const [openMenu, setOpenMenu] = useState<string | null>(null)
  const [previewLesson, setPreviewLesson] = useState<Lesson | null>(null)

  const [courseForm, setCourseForm] = useState({
    title: '', category: 'Frontend', price: '', duration: '', status: 'draft'
  })
  const [lessonForm, setLessonForm] = useState({
    title: '', description: '', youtubeUrl: '', duration: '', isFree: false
  })

  const filtered = courses.filter(c => {
    const matchSearch = c.title.toLowerCase().includes(search.toLowerCase())
    const matchCat = category === 'Barchasi' || c.category === category
    return matchSearch && matchCat
  })

  const getCourseLessons = (courseId: string) =>
    lessons.filter(l => l.courseId === courseId).sort((a, b) => a.order - b.order)

  const handleSaveCourse = () => {
    if (editCourse) {
      setCourses(prev => prev.map(c =>
        c.id === editCourse.id ? { ...c, ...courseForm, price: Number(courseForm.price) } : c
      ))
    } else {
      setCourses(prev => [...prev, {
        id: Date.now().toString(),
        ...courseForm,
        price: Number(courseForm.price),
        students: 0, lessons: 0, rating: 0,
        image: '📚', instructor: 'Admin',
        created: new Date().toISOString().split('T')[0],
      }])
    }
    setShowCourseModal(false)
    setEditCourse(null)
    setCourseForm({ title: '', category: 'Frontend', price: '', duration: '', status: 'draft' })
  }

  const handleSaveLesson = () => {
    if (!selectedCourseId) return
    const courseLesson = getCourseLessons(selectedCourseId)
    const newLesson: Lesson = {
      id: Date.now().toString(),
      courseId: selectedCourseId,
      title: lessonForm.title,
      description: lessonForm.description,
      youtubeUrl: lessonForm.youtubeUrl,
      duration: lessonForm.duration,
      order: courseLesson.length + 1,
      isFree: lessonForm.isFree,
    }
    setLessons(prev => [...prev, newLesson])
    setCourses(prev => prev.map(c =>
      c.id === selectedCourseId ? { ...c, lessons: c.lessons + 1 } : c
    ))
    setShowLessonModal(false)
    setLessonForm({ title: '', description: '', youtubeUrl: '', duration: '', isFree: false })
  }

  const deleteLesson = (lessonId: string, courseId: string) => {
    setLessons(prev => prev.filter(l => l.id !== lessonId))
    setCourses(prev => prev.map(c =>
      c.id === courseId ? { ...c, lessons: Math.max(0, c.lessons - 1) } : c
    ))
  }

  const openEdit = (course: typeof mockCourses[0]) => {
    setEditCourse(course)
    setCourseForm({
      title: course.title, category: course.category,
      price: course.price.toString(), duration: course.duration, status: course.status
    })
    setShowCourseModal(true)
    setOpenMenu(null)
  }

  const deleteCourse = (id: string) => {
    setCourses(prev => prev.filter(c => c.id !== id))
    setLessons(prev => prev.filter(l => l.courseId !== id))
    setOpenMenu(null)
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Stats */}
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
              <div className="text-xl font-display font-bold" style={{ color: 'var(--color-text)' }}>{s.value}</div>
              <div className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      <Card
        title={t('courses')}
        subtitle={`${filtered.length} ta kurs`}
        action={
          <button className="btn-primary text-sm py-2 px-4" onClick={() => {
            setEditCourse(null)
            setCourseForm({ title: '', category: 'Frontend', price: '', duration: '', status: 'draft' })
            setShowCourseModal(true)
          }}>
            <Plus size={15} /> {t('newCourseBtn')}
          </button>
        }
      >
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 px-5 py-4" style={{ borderBottom: '1px solid var(--color-border)' }}>
          <div className="relative flex-1">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
            <input className="input-base pl-9 text-sm" style={{ height: 38 }}
              placeholder="Kurs nomini qidiring..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <div className="flex gap-1 flex-wrap">
            {categories.map(cat => (
              <button key={cat} onClick={() => setCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${category === cat ? 'bg-sky-500 text-white' : 'glass text-gray-400 hover:text-white'}`}>
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Course list */}
        <div className="divide-y" style={{ borderColor: 'var(--color-border)' }}>
          {filtered.map(course => {
            const courseLessons = getCourseLessons(course.id)
            const isExpanded = expandedCourse === course.id

            return (
              <div key={course.id}>
                {/* Course row */}
                <div className="px-3 sm:px-5 py-4 flex items-center gap-2 sm:gap-4 flex-wrap hover:bg-white/3 transition-colors">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center text-xl sm:text-2xl flex-shrink-0"
                    style={{ background: 'rgba(255,255,255,0.06)' }}>
                    {course.image}
                  </div>

                  <div className="flex-1 min-w-0" style={{minWidth: 0}}>
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <h3 className="text-sm font-semibold truncate" style={{ color: 'var(--color-text)', maxWidth: '100%' }}>
                        {course.title}
                      </h3>
                      <Badge variant={course.status === 'published' ? 'success' : 'warning'}>
                        {course.status === 'published' ? t('courseStatus_published') : t('courseStatus_draft')}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-4 text-xs flex-wrap" style={{ color: 'var(--color-text-muted)' }}>
                      <span className="flex items-center gap-1"><Users size={11} /> {course.students}</span>
                      <span className="flex items-center gap-1"><BookOpen size={11} /> {courseLessons.length}</span>
                      <span className="flex items-center gap-1"><Clock size={11} /> {course.duration}</span>
                      {course.rating > 0 && (
                        <span className="flex items-center gap-1 text-yellow-400"><Star size={11} fill="currentColor" /> {course.rating}</span>
                      )}
                      <span className="font-semibold text-sky-400">{(course.price / 1000).toFixed(0)}K</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0 flex-wrap justify-end">
                    {/* Add lesson button */}
                    <button
                      onClick={() => { setSelectedCourseId(course.id); setShowLessonModal(true) }}
                      className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
                      style={{ background: 'rgba(249,115,22,0.1)', color: '#f97316', border: '1px solid rgba(249,115,22,0.2)' }}
                    >
                      <Youtube size={13} />
                      <span className="hidden sm:inline">Dars qo'sh</span>
                    </button>

                    {/* Expand lessons */}
                    <button
                      onClick={() => setExpandedCourse(isExpanded ? null : course.id)}
                      className="flex items-center gap-1 px-2 sm:px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
                      style={{ background: 'rgba(14,165,233,0.1)', color: '#0ea5e9', border: '1px solid rgba(14,165,233,0.2)' }}
                    >
                      {isExpanded ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                      <span className="hidden sm:inline">{courseLessons.length} dars</span>
                      <span className="sm:hidden">{courseLessons.length}</span>
                    </button>

                    {/* More menu */}
                    <div className="relative">
                      <button onClick={() => setOpenMenu(openMenu === course.id ? null : course.id)}
                        className="p-1.5 rounded-lg text-gray-500 hover:text-white hover:bg-white/10 transition-all">
                        <MoreVertical size={15} />
                      </button>
                      {openMenu === course.id && (
                        <div className="absolute right-0 top-8 w-40 rounded-xl shadow-xl z-20 overflow-hidden animate-slide-up"
                          style={{ background: 'var(--color-surface-2)', border: '1px solid var(--color-border)' }}>
                          <button onClick={() => openEdit(course)}
                            className="w-full px-4 py-2.5 text-left text-sm flex items-center gap-2 hover:bg-white/5 transition-colors text-sky-400">
                            <Edit2 size={13} /> {t('editCourse')}
                          </button>
                          <button onClick={() => deleteCourse(course.id)}
                            className="w-full px-4 py-2.5 text-left text-sm flex items-center gap-2 hover:bg-white/5 transition-colors text-red-400">
                            <Trash2 size={13} /> O'chirish
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Lessons list (expanded) */}
                {isExpanded && (
                  <div className="px-5 pb-4 animate-fade-in">
                    <div className="rounded-xl overflow-hidden" style={{ border: '1px solid var(--color-border)' }}>
                      {/* Lessons header */}
                      <div className="px-4 py-2.5 flex items-center justify-between"
                        style={{ background: 'rgba(14,165,233,0.06)', borderBottom: '1px solid var(--color-border)' }}>
                        <span className="text-xs font-semibold text-sky-400">Darslar ro'yxati</span>
                        <button
                          onClick={() => { setSelectedCourseId(course.id); setShowLessonModal(true) }}
                          className="text-xs text-orange-400 hover:text-orange-300 flex items-center gap-1 transition-colors font-semibold"
                        >
                          <Plus size={12} /> Yangi dars
                        </button>
                      </div>

                      {courseLessons.length === 0 ? (
                        <div className="py-8 text-center">
                          <Youtube size={24} className="mx-auto mb-2 text-gray-600" />
                          <p className="text-xs text-gray-500">Hozircha dars yo'q</p>
                          <button
                            onClick={() => { setSelectedCourseId(course.id); setShowLessonModal(true) }}
                            className="mt-2 text-xs text-sky-400 hover:text-sky-300 transition-colors"
                          >
                            Birinchi darsni qo'shing
                          </button>
                        </div>
                      ) : (
                        <div className="divide-y" style={{ borderColor: 'var(--color-border)' }}>
                          {courseLessons.map((lesson, idx) => (
                            <div key={lesson.id} className="px-4 py-3 flex items-center gap-3 hover:bg-white/3 transition-colors group">
                              {/* Order number */}
                              <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                                style={{ background: 'rgba(14,165,233,0.15)', color: '#0ea5e9' }}>
                                {lesson.order}
                              </div>

                              {/* Thumbnail */}
                              <div className="w-16 h-10 rounded-lg overflow-hidden flex-shrink-0 relative cursor-pointer"
                                style={{ background: '#000' }}
                                onClick={() => setPreviewLesson(lesson)}
                              >
                                <img
                                  src={`https://img.youtube.com/vi/${getYoutubeId(lesson.youtubeUrl)}/mqdefault.jpg`}
                                  alt={lesson.title}
                                  className="w-full h-full object-cover opacity-80"
                                />
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <div className="w-5 h-5 rounded-full bg-red-600 flex items-center justify-center">
                                    <Play size={8} className="text-white ml-0.5" fill="white" />
                                  </div>
                                </div>
                              </div>

                              {/* Info */}
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                  <span className="text-sm font-medium truncate" style={{ color: 'var(--color-text)' }}>
                                    {lesson.title}
                                  </span>
                                  {lesson.isFree && (
                                    <span className="text-xs px-1.5 py-0.5 rounded font-semibold flex-shrink-0"
                                      style={{ background: 'rgba(34,197,94,0.15)', color: '#22c55e' }}>
                                      Bepul
                                    </span>
                                  )}
                                  {!lesson.isFree && (
                                    <Lock size={11} className="text-gray-600 flex-shrink-0" />
                                  )}
                                </div>
                                <div className="text-xs mt-0.5 truncate" style={{ color: 'var(--color-text-muted)' }}>
                                  {lesson.description}
                                </div>
                              </div>

                              {/* Duration */}
                              <div className="flex items-center gap-1 text-xs flex-shrink-0" style={{ color: 'var(--color-text-muted)' }}>
                                <Clock size={11} />
                                {lesson.duration}
                              </div>

                              {/* Actions */}
                              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                                <button
                                  onClick={() => setPreviewLesson(lesson)}
                                  className="p-1.5 rounded-lg text-sky-400 hover:bg-sky-400/10 transition-all"
                                  title="Ko'rish"
                                >
                                  <Play size={13} />
                                </button>
                                <button
                                  onClick={() => deleteLesson(lesson.id, course.id)}
                                  className="p-1.5 rounded-lg text-red-400 hover:bg-red-400/10 transition-all"
                                  title="O'chirish"
                                >
                                  <Trash2 size={13} />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )
          })}

          {filtered.length === 0 && (
            <div className="py-16 text-center">
              <div className="text-4xl mb-3">📚</div>
              <p className="text-gray-500 text-sm">Kurs topilmadi</p>
            </div>
          )}
        </div>
      </Card>

      {/* Course Create/Edit Modal */}
      <Modal isOpen={showCourseModal} onClose={() => setShowCourseModal(false)}
        title={editCourse ? t('editCourse') : t('newCourse')}>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-1.5 block" style={{ color: 'var(--color-text-muted)' }}>Kurs nomi</label>
            <input className="input-base" placeholder="React.js Bootcamp"
              value={courseForm.title} onChange={e => setCourseForm(p => ({ ...p, title: e.target.value }))} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-1.5 block" style={{ color: 'var(--color-text-muted)' }}>Kategoriya</label>
              <select className="input-base" value={courseForm.category}
                onChange={e => setCourseForm(p => ({ ...p, category: e.target.value }))}>
                {categories.slice(1).map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block" style={{ color: 'var(--color-text-muted)' }}>Narx (so'm)</label>
              <input className="input-base" type="number" placeholder="299000"
                value={courseForm.price} onChange={e => setCourseForm(p => ({ ...p, price: e.target.value }))} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-1.5 block" style={{ color: 'var(--color-text-muted)' }}>Davomiyligi</label>
              <input className="input-base" placeholder="24 soat"
                value={courseForm.duration} onChange={e => setCourseForm(p => ({ ...p, duration: e.target.value }))} />
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block" style={{ color: 'var(--color-text-muted)' }}>Holat</label>
              <select className="input-base" value={courseForm.status}
                onChange={e => setCourseForm(p => ({ ...p, status: e.target.value }))}>
                <option value="draft">Qoralama</option>
                <option value="published">Nashr etish</option>
              </select>
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <button className="btn-primary flex-1 justify-center" onClick={handleSaveCourse}>
              {editCourse ? 'Saqlash' : 'Yaratish'}
            </button>
            <button className="btn-secondary flex-1 justify-center" onClick={() => setShowCourseModal(false)}>
              Bekor qilish
            </button>
          </div>
        </div>
      </Modal>

      {/* Add Lesson Modal */}
      <Modal isOpen={showLessonModal} onClose={() => setShowLessonModal(false)} title="Yangi dars qo'shish">
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-1.5 block" style={{ color: 'var(--color-text-muted)' }}>Dars nomi</label>
            <input className="input-base" placeholder="React Hooks darsi"
              value={lessonForm.title} onChange={e => setLessonForm(p => ({ ...p, title: e.target.value }))} />
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 block" style={{ color: 'var(--color-text-muted)' }}>Tavsif</label>
            <textarea className="input-base resize-none" rows={2} placeholder="Dars haqida qisqacha..."
              value={lessonForm.description} onChange={e => setLessonForm(p => ({ ...p, description: e.target.value }))} />
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 block" style={{ color: 'var(--color-text-muted)' }}>
              YouTube URL
            </label>
            <div className="relative">
              <Youtube size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-red-400 pointer-events-none" />
              <input className="input-base pl-10" placeholder="https://www.youtube.com/watch?v=..."
                value={lessonForm.youtubeUrl} onChange={e => setLessonForm(p => ({ ...p, youtubeUrl: e.target.value }))} />
            </div>
            {/* Preview thumbnail */}
            {lessonForm.youtubeUrl && getYoutubeId(lessonForm.youtubeUrl) && (
              <div className="mt-2 rounded-xl overflow-hidden relative h-32 w-full">
                <img
                  src={`https://img.youtube.com/vi/${getYoutubeId(lessonForm.youtubeUrl)}/mqdefault.jpg`}
                  alt="preview"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.3)' }}>
                  <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center">
                    <Play size={16} className="text-white ml-1" fill="white" />
                  </div>
                </div>
                <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded text-xs font-semibold text-white"
                  style={{ background: 'rgba(0,0,0,0.7)' }}>
                  YouTube
                </div>
              </div>
            )}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-1.5 block" style={{ color: 'var(--color-text-muted)' }}>Davomiyligi</label>
              <input className="input-base" placeholder="15:30"
                value={lessonForm.duration} onChange={e => setLessonForm(p => ({ ...p, duration: e.target.value }))} />
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block" style={{ color: 'var(--color-text-muted)' }}>Ko'rinish</label>
              <button
                onClick={() => setLessonForm(p => ({ ...p, isFree: !p.isFree }))}
                className={`w-full py-2.5 rounded-xl text-sm font-semibold transition-all ${lessonForm.isFree
                  ? 'text-green-400' : 'text-gray-400'}`}
                style={{
                  border: `1px solid ${lessonForm.isFree ? 'rgba(34,197,94,0.4)' : 'rgba(255,255,255,0.1)'}`,
                  background: lessonForm.isFree ? 'rgba(34,197,94,0.1)' : 'rgba(255,255,255,0.04)',
                }}
              >
                {lessonForm.isFree ? '🔓 Bepul (preview)' : '🔒 Pullik'}
              </button>
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <button className="btn-primary flex-1 justify-center" onClick={handleSaveLesson}>
              Qo'shish
            </button>
            <button className="btn-secondary flex-1 justify-center" onClick={() => setShowLessonModal(false)}>
              Bekor qilish
            </button>
          </div>
        </div>
      </Modal>

      {/* Video Preview Modal */}
      {previewLesson && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setPreviewLesson(null)} />
          <div className="relative w-full max-w-3xl rounded-2xl overflow-hidden shadow-2xl animate-slide-up"
            style={{ background: '#000' }}>
            <div className="flex items-center justify-between px-4 py-3" style={{ background: 'rgba(0,0,0,0.8)' }}>
              <div>
                <h3 className="font-semibold text-white text-sm">{previewLesson.title}</h3>
                <p className="text-xs text-gray-400 mt-0.5">{previewLesson.description}</p>
              </div>
              <button onClick={() => setPreviewLesson(null)}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all">
                ✕
              </button>
            </div>
            {/* YouTube embed */}
            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
              <iframe
                className="absolute inset-0 w-full h-full"
                src={`https://www.youtube.com/embed/${getYoutubeId(previewLesson.youtubeUrl)}?autoplay=1`}
                title={previewLesson.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="px-4 py-3 flex items-center gap-4" style={{ background: 'rgba(0,0,0,0.8)' }}>
              <div className="flex items-center gap-1.5 text-xs text-gray-400">
                <Clock size={12} /> {previewLesson.duration}
              </div>
              {previewLesson.isFree
                ? <span className="text-xs text-green-400 font-semibold">🔓 Bepul dars</span>
                : <span className="text-xs text-orange-400 font-semibold">🔒 Pullik dars</span>
              }
              <a href={previewLesson.youtubeUrl} target="_blank" rel="noopener noreferrer"
                className="ml-auto text-xs text-red-400 hover:text-red-300 flex items-center gap-1 transition-colors">
                <Youtube size={13} /> YouTube da ochish
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}