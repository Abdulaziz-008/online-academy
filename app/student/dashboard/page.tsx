'use client'
import { useState } from 'react'
import { BookOpen, Clock, Award, TrendingUp, Play, CheckCircle, Lock, Star, ArrowRight } from 'lucide-react'
import { Card, ProgressBar, Badge } from '@/components/ui'
import { useAuth } from '@/lib/auth'
import { useTheme } from '@/lib/theme'


const enrolledCourses = [
  { id: '1', title: 'React.js — Boshlang\'ichdan Professional', image: '🎯', progress: 68, totalLessons: 48, completedLessons: 32, category: 'Frontend', lastLesson: 'React Hooks — useEffect', rating: 4.8 },
  { id: '2', title: 'Node.js & Express.js Backend', image: '⚡', progress: 35, totalLessons: 56, completedLessons: 20, category: 'Backend', lastLesson: 'REST API yaratish', rating: 4.9 },
  { id: '3', title: 'UI/UX Design Figma', image: '🎨', progress: 90, totalLessons: 36, completedLessons: 32, category: 'Design', lastLesson: 'Prototype yaratish', rating: 4.6 },
]

const recentActivity = [
  { type: 'lesson', text: 'React Hooks darsini yakunladingiz', time: '2 soat oldin', icon: '✅' },
  { type: 'test', text: 'JavaScript quiz\'da 85% natija oldingiz', time: 'Kecha', icon: '📝' },
  { type: 'course', text: 'Node.js kursiga yozildingiz', time: '3 kun oldin', icon: '📚' },
  { type: 'cert', text: 'HTML/CSS sertifikatini oldingiz', time: '1 hafta oldin', icon: '🏆' },
]

const upcomingTests = [
  { title: 'React Hooks — Bilim tekshiruv', course: 'React.js', date: 'Bugun 18:00', questions: 25 },
  { title: 'Express Middleware Test', course: 'Node.js', date: 'Ertaga 10:00', questions: 20 },
]

export default function StudentDashboard() {
  const { t } = useTheme()
  const { user } = useAuth()
  const avgProgress = Math.round(enrolledCourses.reduce((s, c) => s + c.progress, 0) / enrolledCourses.length)

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Welcome banner */}
      <div
        className="relative rounded-2xl p-6 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, rgba(14,165,233,0.15) 0%, rgba(249,115,22,0.1) 100%)', border: '1px solid rgba(14,165,233,0.2)' }}
      >
        <div className="absolute top-0 right-0 w-64 h-64 opacity-10" style={{ background: 'radial-gradient(circle, #0ea5e9 0%, transparent 70%)' }} />
        <div className="relative">
          <div className="text-sm text-sky-400 font-semibold mb-1">{t('welcomeBack')}</div>
          <h2 className="font-display font-bold text-2xl mb-2" style={{color:'var(--color-text)'}}>{user?.name}</h2>
          <p className="text-gray-400 text-sm mb-4">Bugun ham o'rganishni davom ettiring. Siz {avgProgress}% yo'lni bosib o'tgansiz!</p>
          <div className="flex items-center gap-4">
            <div className="flex-1 max-w-64">
              <div className="flex justify-between text-xs text-gray-400 mb-1.5">
                <span>{t('overallProgress')}</span>
                <span className="text-sky-400 font-semibold">{avgProgress}%</span>
              </div>
              <ProgressBar value={avgProgress} color="#0ea5e9" />
            </div>
            <button className="btn-primary text-sm py-2 px-4 flex-shrink-0">
              <Play size={14} /> {t('continueBtn')}
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: t('myCourses'), value: enrolledCourses.length, icon: <BookOpen size={18} />, color: '#0ea5e9' },
          { label: t('learnedHours'), value: '48h', icon: <Clock size={18} />, color: '#f97316' },
          { label: t('testsPassed'), value: '12', icon: <Award size={18} />, color: '#22c55e' },
          { label: t('streak'), value: '7🔥', icon: <TrendingUp size={18} />, color: '#a855f7' },
        ].map((s, i) => (
          <div key={i} className="glass rounded-2xl p-4">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-3" style={{ background: `${s.color}20`, color: s.color }}>
              {s.icon}
            </div>
            <div className="text-xl font-display font-bold" style={{color:'var(--color-text)'}}>{s.value}</div>
            <div className="text-xs text-gray-500 mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Enrolled courses */}
        <div className="lg:col-span-2">
          <Card
            title={t('myCourses')}
            subtitle="Davom etayotgan kurslar"
            action={<a href="/student/courses" className="text-xs text-sky-400 hover:text-sky-300 flex items-center gap-1">Barchasi <ArrowRight size={12} /></a>}
          >
            <div className="divide-y" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
              {enrolledCourses.map(course => (
                <div key={course.id} className="p-5 hover:bg-white/3 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0" style={{ background: 'rgba(255,255,255,0.06)' }}>
                      {course.image}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div>
                          <h3 className="text-sm font-semibold leading-snug" style={{color:'var(--color-text)'}}>{course.title}</h3>
                          <p className="text-xs text-gray-500 mt-0.5">{t('lastLesson')} {course.lastLesson}</p>
                        </div>
                        <span className="text-xs font-bold text-sky-400 flex-shrink-0">{course.progress}%</span>
                      </div>
                      <ProgressBar value={course.progress} color={course.progress >= 80 ? '#22c55e' : '#0ea5e9'} />
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-gray-500">{course.completedLessons}/{course.totalLessons} {t('lessons')}</span>
                        <button className="text-xs text-sky-400 hover:text-sky-300 flex items-center gap-1 transition-colors">
                          <Play size={11} /> Davom etish
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right column */}
        <div className="space-y-6">
          {/* Upcoming tests */}
          <Card title={t('upcomingTests')} subtitle={t('upcomingDesc')}>
            <div className="divide-y" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
              {upcomingTests.map((test, i) => (
                <div key={i} className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center text-lg flex-shrink-0" style={{ background: 'rgba(14,165,233,0.1)' }}>📝</div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-white leading-snug truncate">{test.title}</div>
                      <div className="text-xs text-gray-500 mt-0.5">{test.course} · {test.questions} savol</div>
                      <div className="text-xs text-orange-400 mt-1">{test.date}</div>
                    </div>
                  </div>
                </div>
              ))}
              <div className="p-4">
                <a href="/student/tests" className="text-xs text-sky-400 hover:text-sky-300 flex items-center gap-1">
                  Barcha testlar <ArrowRight size={12} />
                </a>
              </div>
            </div>
          </Card>

          {/* Recent activity */}
          <Card title={t('recentActivity')} subtitle={t('recentDesc')}>
            <div className="divide-y" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
              {recentActivity.map((item, i) => (
                <div key={i} className="px-4 py-3 flex items-start gap-3">
                  <span className="text-lg flex-shrink-0">{item.icon}</span>
                  <div>
                    <div className="text-xs leading-snug" style={{color:'var(--color-text)'}}>{item.text}</div>
                    <div className="text-xs text-gray-600 mt-0.5">{item.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
