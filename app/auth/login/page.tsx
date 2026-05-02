'use client'
import { useState } from 'react'
import { useAuth } from '@/lib/auth'
import { useRouter } from 'next/navigation'
import { GraduationCap, Eye, EyeOff, Lock, Mail, Zap, Shield, Users } from 'lucide-react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { login } = useAuth()
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    const result = await login(email, password)
    setLoading(false)
    if (result.success) {
      const stored = localStorage.getItem('academy_user')
      if (stored) {
        const user = JSON.parse(stored)
        router.push(user.role === 'admin' ? '/admin' : '/student/dashboard')
      }
    } else {
      setError(result.error || 'Xatolik yuz berdi')
    }
  }


  return (
    <div className="min-h-screen flex relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #0f2027 0%, #203a43 40%, #2c5364 100%)' }}>

      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full opacity-40 blur-3xl"
          style={{ background: 'radial-gradient(circle, #38bdf8 0%, #0ea5e9 40%, transparent 70%)' }} />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full opacity-35 blur-3xl"
          style={{ background: 'radial-gradient(circle, #fb923c 0%, #f97316 40%, transparent 70%)' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full opacity-20 blur-3xl"
          style={{ background: 'radial-gradient(circle, #a78bfa 0%, transparent 70%)' }} />
        <div className="absolute inset-0"
          style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      </div>

      {/* Left branding — faqat katta ekranda */}
      <div className="hidden lg:flex flex-col justify-between flex-1 p-12 relative">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg,#0284c7,#0ea5e9)' }}>
            <GraduationCap size={20} className="text-white" />
          </div>
          <span className="font-display font-bold text-xl" style={{color:'#ffffff'}}>EduAdmin</span>
        </div>

        <div>
          <div className="mb-6">
            <span className="text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full"
              style={{ background: 'rgba(14,165,233,0.2)', color: '#7dd3fc' }}> 
              Online Academy Platform
            </span>
          </div>
          <h2 className="font-display font-bold text-5xl leading-tight mb-6" style={{color:'#ffffff'}}>
            Ta'limni boshqar,<br />
            <span className="gradient-text">kelajakni qur</span>
          </h2>
          <p className="text-blue-200 text-lg leading-relaxed max-w-md opacity-80">
            Markazlashgan boshqaruv tizimi bilan kurslar, studentlar va to'lovlarni osonlik bilan nazorat qiling.
          </p>

          <div className="grid grid-cols-3 gap-4 mt-10">
            {[
              { icon: <Users size={18} />, value: '3,847', label: 'Studentlar' },
              { icon: <Zap size={18} />, value: '42', label: 'Kurslar' },
              { icon: <Shield size={18} />, value: '99.9%', label: 'Uptime' },
            ].map((stat, i) => (
              <div key={i} className="rounded-xl p-4 text-center"
                style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)' }}>
                <div className="flex justify-center mb-2 text-sky-300">{stat.icon}</div>
                <div className="font-display font-bold text-xl" style={{color:'#ffffff'}}>{stat.value}</div>
                <div className="text-xs mt-0.5" style={{color:'rgba(255,255,255,0.55)'}}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-xs text-blue-300 opacity-40">© 2024 EduAdmin. Barcha huquqlar himoyalangan.</div>
      </div>

      {/* Right: Login form */}
      <div
        className="w-full lg:w-[480px] flex flex-col justify-center px-5 sm:px-10 lg:px-12 relative min-h-screen"
        style={{ background: 'rgba(10,10,20,0.6)', backdropFilter: 'blur(30px)', borderLeft: '1px solid rgba(255,255,255,0.07)' }}
      >
        {/* Mobile logo */}
        <div className="lg:hidden flex items-center gap-3 mb-8">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg,#0284c7,#0ea5e9)' }}>
            <GraduationCap size={17} className="text-white" />
          </div>
          <span className="font-display font-bold text-lg text-white">EduAdmin</span>
        </div>

        <div className="mb-8">
          <h1 className="font-display font-bold text-3xl" style={{color:'#ffffff'}}>Xush kelibsiz 👋</h1>
          <p style={{ color: 'rgba(255,255,255,0.5)' }}>Davom etish uchun hisobingizga kiring</p>
        </div>


        <form onSubmit={handleLogin} className="space-y-4">
          {/* Email */}
          <div>
            <label className="text-sm font-medium mb-1.5 block" style={{ color: 'rgba(255,255,255,0.6)' }}>
              Email manzil
            </label>
            <div className="relative">
              <Mail
                size={16}
                className="absolute top-1/2 -translate-y-1/2 pointer-events-none"
                style={{ left: 14, color: 'rgba(255,255,255,0.3)' }}
              />
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                placeholder="email@example.com"
                style={{
                  width: '100%',
                  paddingTop: 12,
                  paddingBottom: 12,
                  paddingLeft: 42,
                  paddingRight: 14,
                  background: 'rgba(255,255,255,0.07)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  borderRadius: 10,
                  color: '#ffffff',
                  fontSize: 14,
                  outline: 'none',
                  fontFamily: 'inherit',
                  transition: 'all 0.2s',
                }}
                onFocus={e => {
                  e.target.style.borderColor = 'rgba(14,165,233,0.6)'
                  e.target.style.background = 'rgba(14,165,233,0.08)'
                  e.target.style.boxShadow = '0 0 0 3px rgba(14,165,233,0.1)'
                }}
                onBlur={e => {
                  e.target.style.borderColor = 'rgba(255,255,255,0.12)'
                  e.target.style.background = 'rgba(255,255,255,0.07)'
                  e.target.style.boxShadow = 'none'
                }}
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-medium mb-1.5 block" style={{ color: 'rgba(255,255,255,0.6)' }}>
              Parol
            </label>
            <div className="relative">
              <Lock
                size={16}
                className="absolute top-1/2 -translate-y-1/2 pointer-events-none"
                style={{ left: 14, color: 'rgba(255,255,255,0.3)' }}
              />
              <input
                type={showPass ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                style={{
                  width: '100%',
                  paddingTop: 12,
                  paddingBottom: 12,
                  paddingLeft: 42,
                  paddingRight: 44,
                  background: 'rgba(255,255,255,0.07)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  borderRadius: 10,
                  color: '#ffffff',
                  fontSize: 14,
                  outline: 'none',
                  fontFamily: 'inherit',
                  transition: 'all 0.2s',
                }}
                onFocus={e => {
                  e.target.style.borderColor = 'rgba(14,165,233,0.6)'
                  e.target.style.background = 'rgba(14,165,233,0.08)'
                  e.target.style.boxShadow = '0 0 0 3px rgba(14,165,233,0.1)'
                }}
                onBlur={e => {
                  e.target.style.borderColor = 'rgba(255,255,255,0.12)'
                  e.target.style.background = 'rgba(255,255,255,0.07)'
                  e.target.style.boxShadow = 'none'
                }}
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute top-1/2 -translate-y-1/2 transition-colors"
                style={{ right: 14, color: 'rgba(255,255,255,0.3)' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.7)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.3)')}
              >
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="p-3 rounded-xl text-sm text-red-400"
              style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)' }}>
              {error}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-base text-white transition-all mt-2"
            style={{
              background: loading ? 'rgba(14,165,233,0.5)' : 'linear-gradient(135deg, #0284c7, #0ea5e9)',
              boxShadow: loading ? 'none' : '0 8px 25px rgba(14,165,233,0.35)',
            }}
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Kirish...
              </>
            ) : 'Kirish'}
          </button>
        </form>

        {/* Hint */}
        <div className="mt-6 p-4 rounded-xl"
          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
          <p className="text-xs font-semibold mb-2" style={{ color: 'rgba(255,255,255,0.4)' }}>
            Demo hisoblar:
          </p>
          <div className="space-y-1.5">
            {[
              { label: 'Admin', email: 'admin@academy.uz', password: 'admin123' },
              { label: 'Alisher', email: 'alisher@mail.uz', password: 'alisher123' },
              { label: 'Dilnoza', email: 'dilnoza@gmail.com', password: 'dilnoza123' },
              { label: 'Bobur', email: 'bobur@mail.uz', password: 'bobur123' },
              { label: 'Sarvinoz', email: 'sarvinoz@gmail.com', password: 'sarvinoz123' },
              { label: 'Jasur', email: 'jasur@mail.uz', password: 'jasur123' },
              { label: 'Malika', email: 'malika@gmail.com', password: 'malika123' },
              { label: 'Sherzod', email: 'sherzod@mail.uz', password: 'sherzod123' },
              { label: 'Nargiza', email: 'nargiza@gmail.com', password: 'nargiza123' },
            ].map((u, i) => (
              <button
                key={i}
                onClick={() => { setEmail(u.email); setPassword(u.password) }}
                className="w-full flex items-center justify-between px-3 py-1.5 rounded-lg transition-all text-left"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
                onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.03)'}
              >
                <span className="text-xs font-semibold" style={{ color: i === 0 ? '#0ea5e9' : '#f97316' }}>
                  {i === 0 ? '👑' : '👤'} {u.label}
                </span>
                <span className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>
                  {u.email}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}