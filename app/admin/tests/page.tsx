'use client'
import { useState } from 'react'
import { Plus, ClipboardList, Users, Target, Clock, Edit2, Trash2 } from 'lucide-react'
import { Card, Badge, Modal, ProgressBar } from '@/components/ui'
import { mockTests } from '@/lib/data'
import { useTheme } from '@/lib/theme'

export default function TestsPage() {
  const [tests, setTests] = useState(mockTests)
  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState({ title: '', course: '', questions: '', duration: '', status: 'active' })
  const { t } = useTheme()


  const handleSave = () => {
    const newTest = {
      id: Date.now().toString(),
      title: form.title,
      course: form.course,
      questions: Number(form.questions),
      duration: form.duration,
      status: form.status,
      attempts: 0,
      avgScore: 0,
      passRate: 0,
    }
    setTests(prev => [...prev, newTest])
    setShowModal(false)
    setForm({ title: '', course: '', questions: '', duration: '', status: 'active' })
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: t('totalTests'), value: tests.length, color: '#0ea5e9' },
          { label: t('activeTests'), value: tests.filter(t => t.status === 'active').length, color: '#22c55e' },
          { label: t('totalAttempts'), value: tests.reduce((s, t) => s + t.attempts, 0), color: '#f97316' },
          { label: t('avgPass'), value: `${Math.round(tests.reduce((s, t) => s + t.passRate, 0) / tests.length)}%`, color: '#a855f7' },
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
        title={t('test')}
        subtitle={`${tests.length} ta test mavjud`}
        action={
          <button className="btn-primary text-sm py-2 px-4" onClick={() => setShowModal(true)}>
            <Plus size={15} /> Yangi test
          </button>
        }
      >
        <div className="p-5 grid grid-cols-1 lg:grid-cols-2 gap-4">
          {tests.map(test => (
            <div
              key={test.id}
              className="rounded-xl p-5 transition-all duration-300 hover:bg-white/5"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(14,165,233,0.15)', border: '1px solid rgba(14,165,233,0.2)' }}>
                    <ClipboardList size={18} className="text-sky-400" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold leading-snug" style={{color:'var(--color-text)'}}>{test.title}</h3>
                    <p className="text-xs text-gray-500 mt-0.5">{test.course}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={test.status === 'active' ? 'success' : 'warning'}>
                    {test.status === 'active' ? t('active2') : 'Qoralama'}
                  </Badge>
                  <button onClick={() => setTests(prev => prev.filter(t => t.id !== test.id))} className="p-1 text-gray-600 hover:text-red-400 transition-colors">
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 mb-4">
                {[
                  { icon: <ClipboardList size={12} />, label: t('questions'), val: test.questions },
                  { icon: <Users size={12} />, label: t('attempts'), val: test.attempts },
                  { icon: <Clock size={12} />, label: t('time'), val: test.duration },
                ].map((item, i) => (
                  <div key={i} className="text-center p-2 rounded-lg" style={{ background: 'rgba(255,255,255,0.04)' }}>
                    <div className="flex justify-center mb-1 text-gray-500">{item.icon}</div>
                    <div className="text-sm font-bold" style={{color:'var(--color-text)'}}>{item.val}</div>
                    <div className="text-xs text-gray-600">{item.label}</div>
                  </div>
                ))}
              </div>

              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs text-gray-500 mb-1.5">
                    <span>O'rtacha ball</span>
                    <span className="text-white font-semibold">{test.avgScore}%</span>
                  </div>
                  <ProgressBar value={test.avgScore} color="#0ea5e9" showLabel={false} />
                </div>
                <div>
                  <div className="flex justify-between text-xs text-gray-500 mb-1.5">
                    <span>O'tish darajasi</span>
                    <span className="text-white font-semibold">{test.passRate}%</span>
                  </div>
                  <ProgressBar value={test.passRate} color="#22c55e" showLabel={false} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Yangi test yaratish">
        <div className="space-y-4">
          <div>
            <label className="text-sm text-gray-400 font-medium mb-1.5 block">Test nomi</label>
            <input className="input-base" placeholder="Test nomini kiriting" value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} />
          </div>
          <div>
            <label className="text-sm text-gray-400 font-medium mb-1.5 block">Kurs</label>
            <input className="input-base" placeholder="Qaysi kurs uchun" value={form.course} onChange={e => setForm(p => ({ ...p, course: e.target.value }))} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-400 font-medium mb-1.5 block">Savollar soni</label>
              <input className="input-base" type="number" placeholder="20" value={form.questions} onChange={e => setForm(p => ({ ...p, questions: e.target.value }))} />
            </div>
            <div>
              <label className="text-sm text-gray-400 font-medium mb-1.5 block">Vaqt</label>
              <input className="input-base" placeholder="30 daqiqa" value={form.duration} onChange={e => setForm(p => ({ ...p, duration: e.target.value }))} />
            </div>
          </div>
          <div>
            <label className="text-sm text-gray-400 font-medium mb-1.5 block">Holat</label>
            <select className="input-base" value={form.status} onChange={e => setForm(p => ({ ...p, status: e.target.value }))}>
              <option value="active">Faol</option>
              <option value="draft">Qoralama</option>
            </select>
          </div>
          <div className="flex gap-3 pt-2">
            <button className="btn-primary flex-1 justify-center" onClick={handleSave}>Yaratish</button>
            <button className="btn-secondary flex-1 justify-center" onClick={() => setShowModal(false)}>Bekor qilish</button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
