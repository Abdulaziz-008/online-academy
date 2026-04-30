'use client'
import { useState } from 'react'
import Link from 'next/link'
import { GraduationCap, Eye, EyeOff, Lock, Mail, User, Phone } from 'lucide-react'

export default function RegisterPage() {
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await new Promise(r => setTimeout(r, 1000))
    setLoading(false)
    alert('Demo rejimida ro\'yxatdan o\'tish mavjud emas. Login sahifasidagi demo hisoblardan foydalaning.')
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden" style={{ background: '#0a0a0f' }}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full opacity-15 blur-3xl" style={{ background: 'radial-gradient(circle, #0ea5e9 0%, transparent 70%)' }} />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl" style={{ background: 'radial-gradient(circle, #f97316 0%, transparent 70%)' }} />
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      </div>

      <div className="w-full max-w-md relative animate-slide-up">
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg,#0284c7,#0ea5e9)' }}>
              <GraduationCap size={20} className="text-white" />
            </div>
            <span className="font-display font-bold text-xl text-white">EduAdmin</span>
          </div>
        </div>

        <div className="glass-strong rounded-2xl p-8">
          <h1 className="font-display font-bold text-2xl text-white mb-1">Ro'yxatdan o'tish</h1>
          <p className="text-gray-500 text-sm mb-6">Yangi hisob yarating</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm text-gray-400 font-medium mb-1.5 block">To'liq ism</label>
              <div className="relative">
                <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                <input type="text" className="input-base pl-10" placeholder="Ism Familya" required />
              </div>
            </div>
            <div>
              <label className="text-sm text-gray-400 font-medium mb-1.5 block">Email</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                <input type="email" className="input-base pl-10" placeholder="email@example.com" required />
              </div>
            </div>
            <div>
              <label className="text-sm text-gray-400 font-medium mb-1.5 block">Telefon</label>
              <div className="relative">
                <Phone size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                <input type="tel" className="input-base pl-10" placeholder="+998 90 123 45 67" />
              </div>
            </div>
            <div>
              <label className="text-sm text-gray-400 font-medium mb-1.5 block">Parol</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                <input type={showPass ? 'text' : 'password'} className="input-base pl-10 pr-10" placeholder="••••••••" required minLength={6} />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300">
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-3 text-base mt-2">
              {loading ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Yuklanmoqda...</> : 'Ro\'yxatdan o\'tish'}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Hisobingiz bormi?{' '}
            <Link href="/auth/login" className="text-sky-400 hover:text-sky-300 font-medium transition-colors">
              Kirish
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
