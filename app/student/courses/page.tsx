'use client'
import { useState } from 'react'
import { Search, ShoppingCart, Star, Users, Clock, BookOpen, CheckCircle, Lock, Play, Youtube, ExternalLink } from 'lucide-react'
import { Card, ProgressBar } from '@/components/ui'
import { mockCourses, mockLessons, getYoutubeId, Lesson } from '@/lib/data'
import { useTheme } from '@/lib/theme'

const purchasedIds = ['1', '2', '4']
const progresses: Record<string, number> = { '1': 68, '2': 35, '4': 90 }

export default function StudentCoursesPage() {
  const { t } = useTheme()
  const [search, setSearch] = useState('')
  const [tab, setTab] = useState<'all' | 'my'>('my')
  const [expandedCourse, setExpandedCourse] = useState<string | null>(null)
  const [previewLesson, setPreviewLesson] = useState<Lesson | null>(null)

  const courses = mockCourses.filter(c => c.status === 'published')
  const filtered = courses.filter(c => {
    const matchSearch = c.title.toLowerCase().includes(search.toLowerCase())
    const matchTab = tab === 'all' || purchasedIds.includes(c.id)
    return matchSearch && matchTab
  })

  return (
    <div className="space-y-6 animate-fade-in">
      <Card
        title={tab === 'my' ? t('myCourses') : t('allCourses')}
        subtitle={`${filtered.length} ta kurs`}
      >
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 px-5 py-4" style={{ borderBottom: '1px solid var(--color-border)' }}>
          <div className="flex gap-1 p-1 rounded-xl" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
            <button
              onClick={() => setTab('my')}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${tab === 'my' ? 'bg-sky-500 text-white' : 'text-gray-400 hover:text-white'}`}
            >
              {t('myCourses')}
            </button>
            <button
              onClick={() => setTab('all')}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${tab === 'all' ? 'bg-sky-500 text-white' : 'text-gray-400 hover:text-white'}`}
            >
              {t('allCourses')}
            </button>
          </div>
          <div className="relative flex-1">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
            <input
              className="input-base pl-9 text-sm"
              style={{ height: 38 }}
              placeholder={t('searchCourse')}
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Course grid */}
        <div className="p-5 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map(course => {
            const owned = purchasedIds.includes(course.id)
            const progress = progresses[course.id] || 0
            const courseLessons = mockLessons
              .filter(l => l.courseId === course.id)
              .sort((a, b) => a.order - b.order)
            const isExpanded = expandedCourse === course.id

            return (
              <div
                key={course.id}
                className="rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: `1px solid ${owned ? 'rgba(14,165,233,0.2)' : 'rgba(255,255,255,0.07)'}`
                }}
              >
                {/* Course header */}
                <div className="h-28 flex items-center justify-center relative"
                  style={{ background: owned ? 'rgba(14,165,233,0.05)' : 'rgba(255,255,255,0.03)' }}>
                  <span className="text-5xl">{course.image}</span>
                  <div className="absolute top-3 right-3">
                    {owned ? (
                      <div className="w-7 h-7 rounded-full bg-green-500 flex items-center justify-center">
                        <CheckCircle size={14} className="text-white" />
                      </div>
                    ) : (
                      <div className="w-7 h-7 rounded-full bg-gray-700 flex items-center justify-center">
                        <Lock size={13} className="text-gray-400" />
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-4">
                  <div className="text-xs font-semibold text-sky-400 mb-1">{course.category}</div>
                  <h3 className="text-sm font-semibold leading-snug mb-3 line-clamp-2"
                    style={{ color: 'var(--color-text)' }}>
                    {course.title}
                  </h3>

                  {/* Progress */}
                  {owned && (
                    <div className="mb-3">
                      <div className="flex justify-between text-xs mb-1.5" style={{ color: 'var(--color-text-muted)' }}>
                        <span>{t('progress')}</span>
                        <span className="text-sky-400 font-semibold">{progress}%</span>
                      </div>
                      <ProgressBar value={progress} color={progress >= 80 ? '#22c55e' : '#0ea5e9'} />
                    </div>
                  )}

                  {/* Meta */}
                  <div className="flex items-center justify-between text-xs mb-4" style={{ color: 'var(--color-text-muted)' }}>
                    <span className="flex items-center gap-1"><BookOpen size={11} /> {courseLessons.length} {t('lessons')}</span>
                    <span className="flex items-center gap-1"><Clock size={11} /> {course.duration}</span>
                    <span className="flex items-center gap-1 text-yellow-400"><Star size={11} fill="currentColor" /> {course.rating}</span>
                  </div>

                  {/* Owned: darslar tugmasi */}
                  {owned ? (
                    <>
                      <button
                        onClick={() => setExpandedCourse(isExpanded ? null : course.id)}
                        className="w-full py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all"
                        style={{
                          background: 'rgba(14,165,233,0.08)',
                          border: '1px solid rgba(14,165,233,0.2)',
                          color: '#0ea5e9'
                        }}
                      >
                        <BookOpen size={13} />
                        {isExpanded ? 'Yopish' : `${courseLessons.length} ta darsni ko'rish`}
                      </button>

                      {/* Lessons list */}
                      {isExpanded && (
                        <div className="mt-3 rounded-xl overflow-hidden animate-fade-in"
                          style={{ border: '1px solid var(--color-border)' }}>
                          {courseLessons.length === 0 ? (
                            <div className="py-6 text-center text-xs" style={{ color: 'var(--color-text-muted)' }}>
                              Hozircha dars yo'q
                            </div>
                          ) : (
                            courseLessons.map(lesson => (
                              <div
                                key={lesson.id}
                                className="flex items-center gap-3 px-3 py-2.5 transition-colors"
                                style={{ borderBottom: '1px solid var(--color-border)' }}
                                onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.04)'}
                                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                              >
                                {/* Order */}
                                <div
                                  className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                                  style={{ background: 'rgba(14,165,233,0.15)', color: '#0ea5e9', fontSize: 10, fontWeight: 700 }}
                                >
                                  {lesson.order}
                                </div>

                                {/* Info */}
                                <div className="flex-1 min-w-0">
                                  <div className="text-xs font-medium truncate" style={{ color: 'var(--color-text)' }}>
                                    {lesson.title}
                                  </div>
                                  <div className="text-xs flex items-center gap-1 mt-0.5" style={{ color: 'var(--color-text-muted)' }}>
                                    <Clock size={9} /> {lesson.duration}
                                    {lesson.isFree && (
                                      <span className="ml-1 px-1 rounded text-green-400 font-semibold"
                                        style={{ background: 'rgba(34,197,94,0.1)', fontSize: 9 }}>
                                        BEPUL
                                      </span>
                                    )}
                                  </div>
                                </div>

                                {/* Actions */}
                                <div className="flex items-center gap-1 flex-shrink-0">
                                  {/* Sahifada ko'rish */}
                                  <button
                                    onClick={() => setPreviewLesson(lesson)}
                                    className="w-7 h-7 rounded-full flex items-center justify-center transition-all"
                                    style={{ background: 'rgba(239,68,68,0.85)' }}
                                    title="Sahifada ko'rish"
                                  >
                                    <Play size={10} className="text-white ml-0.5" fill="white" />
                                  </button>
                                  {/* YouTube da ochish */}
                                  <a
                                    href={lesson.youtubeUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-7 h-7 rounded-full flex items-center justify-center transition-all"
                                    style={{ background: 'rgba(255,255,255,0.06)' }}
                                    title="YouTube da ochish"
                                  ></a>
                                    <ExternalLink size={11} className="text-gray-400" />
                               
                                </div>
                              </div>
                            ))
                          )}
                        </div>
                      )}
                    </>
                  ) : (
                    /* Not owned: buy button */
                    <div className="flex items-center justify-between">
                      <span className="font-display font-bold" style={{ color: 'var(--color-text)' }}>
                        {(course.price / 1000).toFixed(0)}K so'm
                      </span>
                      <button className="btn-secondary text-xs py-1.5 px-3">
                        <ShoppingCart size={13} /> {t('buyCourse')}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </Card>

      {/* ===== VIDEO MODAL — card tashqarisida, bir dona ===== */}
      {previewLesson && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setPreviewLesson(null)}
          />
          <div
            className="relative w-full max-w-3xl rounded-2xl overflow-hidden shadow-2xl animate-slide-up"
            style={{ background: '#000' }}
          >
            {/* Modal header */}
            <div className="flex items-center justify-between px-4 py-3"
              style={{ background: 'rgba(0,0,0,0.9)' }}>
              <div>
                <h3 className="font-semibold text-white text-sm">{previewLesson.title}</h3>
                <p className="text-xs text-gray-400 mt-0.5">{previewLesson.description}</p>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={previewLesson.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
                  style={{ background: 'rgba(239,68,68,0.2)', color: '#ef4444', border: '1px solid rgba(239,68,68,0.3)' }}
                ></a>
                  <Youtube size={13} /> YouTube
                
                <button
                  onClick={() => setPreviewLesson(null)}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* YouTube iframe */}
            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
              <iframe
                key={previewLesson.id}
                className="absolute inset-0 w-full h-full"
                src={`https://www.youtube.com/embed/${getYoutubeId(previewLesson.youtubeUrl)}?autoplay=1`}
                title={previewLesson.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            {/* Modal footer */}
            <div className="px-4 py-3 flex items-center gap-4"
              style={{ background: 'rgba(0,0,0,0.9)' }}>
              <div className="flex items-center gap-1.5 text-xs text-gray-400">
                <Clock size={12} /> {previewLesson.duration}
              </div>
              {previewLesson.isFree
                ? <span className="text-xs text-green-400 font-semibold">🔓 Bepul dars</span>
                : <span className="text-xs text-orange-400 font-semibold">🔒 Pullik dars</span>
              }
            </div>
          </div>
        </div>
      )}
    </div>
  )
}