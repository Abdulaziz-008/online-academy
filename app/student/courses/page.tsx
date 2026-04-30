'use client'
import { useState } from 'react'
import { Search, ShoppingCart, Star, Users, Clock, BookOpen, CheckCircle, Lock } from 'lucide-react'
import { Card, Badge, ProgressBar } from '@/components/ui'
import { mockCourses } from '@/lib/data'
import { useTheme } from '@/lib/theme'

const purchasedIds = ['1', '2', '4']


export default function StudentCoursesPage() {
  const { t } = useTheme()
  const [search, setSearch] = useState('')
  const [tab, setTab] = useState<'all' | 'my'>('my')

  const courses = mockCourses.filter(c => c.status === 'published')
  const filtered = courses.filter(c => {
    const matchSearch = c.title.toLowerCase().includes(search.toLowerCase())
    const matchTab = tab === 'all' || purchasedIds.includes(c.id)
    return matchSearch && matchTab
  })

  const progresses: Record<string, number> = { '1': 68, '2': 35, '4': 90 }

  return (
    <div className="space-y-6 animate-fade-in">
      <Card
        title={tab === 'my' ? t('myCourses') : t('allCourses')}
        subtitle={`${filtered.length} ta kurs`}
      >
        <div className="flex flex-col sm:flex-row gap-3 px-5 py-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
          <div className="flex gap-1 p-1 rounded-xl" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
            <button onClick={() => setTab('my')} className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${tab === 'my' ? 'bg-sky-500 text-white' : 'text-gray-400 hover:text-white'}`}>
              {t('myCourses')}
            </button>
            <button onClick={() => setTab('all')} className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${tab === 'all' ? 'bg-sky-500 text-white' : 'text-gray-400 hover:text-white'}`}>
              {t('allCourses')}
            </button>
          </div>
          <div className="relative flex-1">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
            <input className="input-base pl-9 text-sm" style={{ height: 38 }} placeholder={t('searchCourse')} value={search} onChange={e => setSearch(e.target.value)} />
          </div>
        </div>

        <div className="p-5 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map(course => {
            const owned = purchasedIds.includes(course.id)
            const progress = progresses[course.id] || 0
            return (
              <div
                key={course.id}
                className="rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid ${owned ? 'rgba(14,165,233,0.2)' : 'rgba(255,255,255,0.07)'}` }}
              >
                <div className="h-28 flex items-center justify-center relative" style={{ background: owned ? 'rgba(14,165,233,0.05)' : 'rgba(255,255,255,0.03)' }}>
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
                  <h3 className="text-sm font-semibold leading-snug mb-3 line-clamp-2" style={{color:'var(--color-text)'}}>{course.title}</h3>

                  {owned && (
                    <div className="mb-3">
                      <div className="flex justify-between text-xs text-gray-500 mb-1.5">
                        <span>{t('progress')}</span>
                        <span className="text-sky-400 font-semibold">{progress}%</span>
                      </div>
                      <ProgressBar value={progress} color={progress >= 80 ? '#22c55e' : '#0ea5e9'} />
                    </div>
                  )}

                  <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                    <span className="flex items-center gap-1"><BookOpen size={11} /> {course.lessons} {t('lessons')}</span>
                    <span className="flex items-center gap-1"><Clock size={11} /> {course.duration}</span>
                    <span className="flex items-center gap-1 text-yellow-400"><Star size={11} fill="currentColor" /> {course.rating}</span>
                  </div>

                  {owned ? (
                    <button className="btn-primary w-full justify-center text-sm py-2">
                      {t('continueCourse')}
                    </button>
                  ) : (
                    <div className="flex items-center justify-between">
                      <span className="font-display font-bold text-white">{(course.price / 1000).toFixed(0)}K so'm</span>
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
    </div>
  )
}
