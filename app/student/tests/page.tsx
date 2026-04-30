'use client'
import { useState } from 'react'
import { ClipboardList, Clock, CheckCircle, XCircle, Play, Award } from 'lucide-react'
import { Card, Badge, ProgressBar } from '@/components/ui'
import { useTheme } from '@/lib/theme'


const myTests = [
  { id: '1', title: 'React Hooks — Bilim tekshiruv', course: 'React.js', questions: 25, duration: '30 daqiqa', status: 'available', bestScore: null, attempts: 0, passScore: 70 },
  { id: '2', title: 'JavaScript Asoslari', course: 'React.js', questions: 30, duration: '40 daqiqa', status: 'completed', bestScore: 85, attempts: 2, passScore: 70 },
  { id: '3', title: 'Node.js Basics Quiz', course: 'Node.js', questions: 20, duration: '25 daqiqa', status: 'failed', bestScore: 55, attempts: 1, passScore: 70 },
  { id: '4', title: 'CSS & Flexbox Test', course: 'UI/UX Design', questions: 15, duration: '20 daqiqa', status: 'completed', bestScore: 92, attempts: 1, passScore: 70 },
  { id: '5', title: 'Express Middleware Test', course: 'Node.js', questions: 20, duration: '25 daqiqa', status: 'locked', bestScore: null, attempts: 0, passScore: 70 },
]

export default function StudentTestsPage() {
  const { t } = useTheme()
  const [activeTest, setActiveTest] = useState<typeof myTests[0] | null>(null)
  const [testState, setTestState] = useState<'idle' | 'running' | 'done'>('idle')
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [score, setScore] = useState(0)
  const [currentQ, setCurrentQ] = useState(0)

  const sampleQuestions = [
    { q: 'React\'da state\'ni boshqarish uchun qaysi hook ishlatiladi?', options: ['useEffect', 'useState', 'useRef', 'useCallback'], correct: 1 },
    { q: 'JSX nima?', options: ['JavaScript eXtended', 'JavaScript XML', 'Java Syntax Extension', 'JSON eXchange'], correct: 1 },
    { q: 'React\'da komponentlar orasida ma\'lumot uzatish uchun nima ishlatiladi?', options: ['state', 'props', 'ref', 'context'], correct: 1 },
    { q: 'useEffect hook qachon chaqiriladi?', options: ['Faqat render oldidan', 'Render keyin', 'Faqat birinchi render', 'Hech qachon'], correct: 1 },
    { q: 'Virtual DOM nima vazifani bajaradi?', options: ['Real DOM\'ni o\'chiradi', 'Performanceni yaxshilaydi', 'CSS ni qo\'llaydi', 'Serverga so\'rov yuboradi'], correct: 1 },
  ]

  const startTest = (test: typeof myTests[0]) => {
    setActiveTest(test)
    setTestState('running')
    setAnswers({})
    setCurrentQ(0)
    setScore(0)
  }

  const answerQuestion = (qIndex: number, aIndex: number) => {
    setAnswers(prev => ({ ...prev, [qIndex]: aIndex }))
    if (qIndex < sampleQuestions.length - 1) {
      setTimeout(() => setCurrentQ(qIndex + 1), 300)
    } else {
      const correct = Object.entries({ ...answers, [qIndex]: aIndex }).filter(([qi, ai]) => sampleQuestions[Number(qi)]?.correct === ai).length
      const finalScore = Math.round((correct / sampleQuestions.length) * 100)
      setScore(finalScore)
      setTestState('done')
    }
  }

  const statusInfo = (status: string) => {
    if (status === 'completed') return { label: t('completed'), variant: 'success' as const }
    if (status === 'failed') return { label: t('failed'), variant: 'danger' as const }
    if (status === 'available') return { label: t('available'), variant: 'info' as const }
    return { label: t('locked'), variant: 'neutral' as const }
  }

  if (testState === 'running' && activeTest) {
    const q = sampleQuestions[currentQ]
    return (
      <div className="max-w-2xl mx-auto animate-fade-in">
        <div className="glass rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-display font-bold text-lg text-white">{activeTest.title}</h2>
              <p className="text-sm text-gray-500 mt-0.5">{activeTest.course}</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-display font-bold text-sky-400">{currentQ + 1}/{sampleQuestions.length}</div>
              <div className="text-xs text-gray-500">savol</div>
            </div>
          </div>
          <ProgressBar value={currentQ + 1} max={sampleQuestions.length} color="#0ea5e9" />
          <div className="mt-6 mb-6 p-4 rounded-xl" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <p className="font-medium leading-relaxed" style={{color:'var(--color-text)'}}>{q.q}</p>
          </div>
          <div className="space-y-3">
            {q.options.map((opt, i) => (
              <button
                key={i}
                onClick={() => answerQuestion(currentQ, i)}
                className={`w-full text-left px-4 py-3.5 rounded-xl text-sm transition-all duration-200 ${answers[currentQ] === i ? 'border-sky-500 bg-sky-500/10 text-sky-400' : 'text-gray-300 hover:bg-white/5 hover:text-white'}`}
                style={{ border: `1px solid ${answers[currentQ] === i ? 'rgba(14,165,233,0.5)' : 'rgba(255,255,255,0.07)'}` }}
              >
                <span className="font-semibold mr-2 text-sky-500">{String.fromCharCode(65 + i)}.</span>
                {opt}
              </button>
            ))}
          </div>
          <button onClick={() => { setActiveTest(null); setTestState('idle') }} className="btn-secondary w-full justify-center mt-6 text-sm">
            Bekor qilish
          </button>
        </div>
      </div>
    )
  }

  if (testState === 'done') {
    const passed = score >= 70
    return (
      <div className="max-w-md mx-auto animate-fade-in">
        <div className="glass rounded-2xl p-8 text-center">
          <div className="text-6xl mb-4">{passed ? '🏆' : '😔'}</div>
          <h2 className="font-display font-bold text-2xl mb-2" style={{color:'var(--color-text)'}}>
            {passed ? t('congratulations') : t('failed')}
          </h2>
          <p className="text-gray-400 text-sm mb-6">
            {passed ? t('passed') : t('notPassed')}
          </p>
          <div className="w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-6"
            style={{ background: passed ? 'rgba(34,197,94,0.15)' : 'rgba(239,68,68,0.15)', border: `4px solid ${passed ? '#22c55e' : '#ef4444'}` }}>
            <span className="font-display font-bold text-4xl" style={{ color: passed ? '#22c55e' : '#ef4444' }}>{score}%</span>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.04)' }}>
              <div className="text-xs text-gray-500 mb-1">{t('bestScore')}</div>
              <div className="font-bold text-white">{Math.round(score / 100 * sampleQuestions.length)}/{sampleQuestions.length}</div>
            </div>
            <div className="p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.04)' }}>
              <div className="text-xs text-gray-500 mb-1">{t('passScore')}</div>
              <div className="font-bold text-white">70%</div>
            </div>
          </div>
          <div className="flex gap-3">
            {!passed && <button className="btn-primary flex-1 justify-center text-sm" onClick={() => startTest(activeTest!)}>{t('tryAgain')}</button>}
            <button className="btn-secondary flex-1 justify-center text-sm" onClick={() => { setTestState('idle'); setActiveTest(null) }}>{t('exit')}</button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: t('totalTests'), value: myTests.length, color: '#0ea5e9' },
          { label: t('activeTests'), value: myTests.filter(t => t.status === 'completed').length, color: '#22c55e' },
          { label: 'O\'rtacha ball', value: `${Math.round(myTests.filter(t => t.bestScore).reduce((s, t) => s + (t.bestScore || 0), 0) / myTests.filter(t => t.bestScore).length)}%`, color: '#f97316' },
          { label: 'Mavjud', value: myTests.filter(t => t.status === 'available').length, color: '#a855f7' },
        ].map(s => (
          <div key={s.label} className="glass rounded-xl px-4 py-3 flex items-center gap-3">
            <div className="w-2 h-8 rounded-full" style={{ background: s.color }} />
            <div>
              <div className="text-xl font-display font-bold text-white">{s.value}</div>
              <div className="text-xs text-gray-500">{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      <Card title={t('myTests')} subtitle="Kurslar bo'yicha testlar">
        <div className="p-5 grid grid-cols-1 lg:grid-cols-2 gap-4">
          {myTests.map(test => {
            const info = statusInfo(test.status)
            const isLocked = test.status === 'locked'
            return (
              <div
                key={test.id}
                className={`rounded-xl p-5 transition-all ${isLocked ? 'opacity-60' : 'hover:bg-white/5'}`}
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(14,165,233,0.1)' }}>
                      <ClipboardList size={18} className="text-sky-400" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold leading-snug" style={{color:'var(--color-text)'}}>{test.title}</h3>
                      <p className="text-xs text-gray-500">{test.course}</p>
                    </div>
                  </div>
                  <Badge variant={info.variant}>{info.label}</Badge>
                </div>

                <div className="grid grid-cols-3 gap-2 mb-4 text-center">
                  <div className="p-2 rounded-lg" style={{ background: 'rgba(255,255,255,0.04)' }}>
                    <div className="text-sm font-bold text-white">{test.questions}</div>
                    <div className="text-xs text-gray-600">Savol</div>
                  </div>
                  <div className="p-2 rounded-lg" style={{ background: 'rgba(255,255,255,0.04)' }}>
                    <div className="text-sm font-bold text-white">{test.duration.split(' ')[0]}</div>
                    <div className="text-xs text-gray-600">Daqiqa</div>
                  </div>
                  <div className="p-2 rounded-lg" style={{ background: 'rgba(255,255,255,0.04)' }}>
                    <div className="text-sm font-bold text-white">{test.attempts}</div>
                    <div className="text-xs text-gray-600">Urinish</div>
                  </div>
                </div>

                {test.bestScore !== null && (
                  <div className="mb-4">
                    <div className="flex justify-between text-xs text-gray-500 mb-1.5">
                      <span>Eng yaxshi natija</span>
                      <span className={test.bestScore >= 70 ? 'text-green-400' : 'text-red-400'}>{test.bestScore}%</span>
                    </div>
                    <ProgressBar value={test.bestScore} color={test.bestScore >= 70 ? '#22c55e' : '#ef4444'} />
                  </div>
                )}

                <button
                  disabled={isLocked}
                  onClick={() => !isLocked && startTest(test)}
                  className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                    isLocked ? 'text-gray-600 cursor-not-allowed' : 'btn-primary'
                  }`}
                  style={isLocked ? { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' } : {}}
                >
                  {isLocked ? `🔒 ${t('locked')}` : test.status === 'completed' ? <><Award size={14}/> {t('retake')}</> : <><Play size={14}/> {t('startTest')}</>}
                </button>
              </div>
            )
          })}
        </div>
      </Card>
    </div>
  )
}
