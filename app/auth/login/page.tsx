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

  const demoLogin = async (role: 'admin' | 'student') => {
    const creds = role === 'admin'
      ? { email: 'admin@academy.uz', password: 'admin123' }
      : { email: 'student@academy.uz', password: 'student123' }
    setEmail(creds.email)
    setPassword(creds.password)
    setLoading(true)
    const result = await login(creds.email, creds.password)
    setLoading(false)
    if (result.success) {
      router.push(role === 'admin' ? '/admin' : '/student/dashboard')
    }
  }

  return (
    <div className="min-h-screen flex relative overflow-hidden" style={{background:'linear-gradient(135deg, #0f2027 0%, #203a43 40%, #2c5364 100%)'}}>
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full opacity-40 blur-3xl" style={{background:'radial-gradient(circle, #38bdf8 0%, #0ea5e9 40%, transparent 70%)'}} />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full opacity-35 blur-3xl" style={{background:'radial-gradient(circle, #fb923c 0%, #f97316 40%, transparent 70%)'}} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full opacity-20 blur-3xl" style={{background:'radial-gradient(circle, #a78bfa 0%, transparent 70%)'}} />
        <div className="absolute inset-0" style={{backgroundImage:'radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)', backgroundSize:'40px 40px'}} />
      </div>

      {/* Left: Branding */}
      <div className="hidden lg:flex flex-col justify-between flex-1 p-12 relative">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{background:'linear-gradient(135deg,#0284c7,#0ea5e9)'}}>
            <GraduationCap size={20} className="text-white" />
          </div>
          <span className="font-display font-bold text-xl text-white">EduAdmin</span>
        </div>

        <div>
          <div className="mb-6">
            <span className="text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full" style={{background:'rgba(14,165,233,0.15)', color:'#0ea5e9'}}>
              Online Academy Platform
            </span>
          </div>
          <h2 className="font-display font-bold text-5xl text-white leading-tight mb-6">
            Ta'limni boshqar,<br />
            <span className="gradient-text">kelajakni qur</span>
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed max-w-md">
            Markazlashgan boshqaruv tizimi bilan kurslar, studentlar va to'lovlarni osonlik bilan nazorat qiling.
          </p>

          <div className="grid grid-cols-3 gap-4 mt-10">
            {[
              { icon: <Users size={18} />, value: '3,847', label: 'Studentlar' },
              { icon: <Zap size={18} />, value: '42', label: 'Kurslar' },
              { icon: <Shield size={18} />, value: '99.9%', label: 'Uptime' },
            ].map((stat, i) => (
              <div key={i} className="glass rounded-xl p-4 text-center">
                <div className="flex justify-center mb-2 text-sky-400">{stat.icon}</div>
                <div className="font-display font-bold text-xl text-white">{stat.value}</div>
                <div className="text-xs text-gray-500 mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-xs text-gray-700">© 2024 EduAdmin. Barcha huquqlar himoyalangan.</div>
      </div>

      {/* Right: Login form */}
      <div className="w-full lg:w-[480px] flex flex-col justify-center px-6 lg:px-12 relative" style={{borderLeft:'1px solid rgba(255,255,255,0.05)'}}>
        <div className="lg:hidden flex items-center gap-3 mb-8">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{background:'linear-gradient(135deg,#0284c7,#0ea5e9)'}}>
            <GraduationCap size={17} className="text-white" />
          </div>
          <span className="font-display font-bold text-lg text-white">EduAdmin</span>
        </div>

        <div className="mb-8">
          <h1 className="font-display font-bold text-3xl text-white mb-2">Xush kelibsiz 👋</h1>
          <p className="text-gray-500">Davom etish uchun hisobingizga kiring</p>
        </div>

        {/* Demo buttons */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <button
            onClick={() => demoLogin('admin')}
            disabled={loading}
            className="glass p-3 rounded-xl text-left hover:bg-white/5 transition-all group border border-sky-500/20 hover:border-sky-500/40"
          >
            <div className="text-xs text-sky-400 font-semibold mb-0.5">Demo Admin</div>
            <div className="text-xs text-gray-600">admin@academy.uz</div>
          </button>
          <button
            onClick={() => demoLogin('student')}
            disabled={loading}
            className="glass p-3 rounded-xl text-left hover:bg-white/5 transition-all group border border-orange-500/20 hover:border-orange-500/40"
          >
            <div className="text-xs text-orange-400 font-semibold mb-0.5">Demo Student</div>
            <div className="text-xs text-gray-600">student@academy.uz</div>
          </button>
        </div>

        <div className="flex items-center gap-3 mb-6">
          <div className="flex-1 h-px" style={{background:'rgba(255,255,255,0.08)'}}/>
          <span className="text-xs text-gray-600">yoki email bilan</span>
          <div className="flex-1 h-px" style={{background:'rgba(255,255,255,0.08)'}}/>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-sm text-gray-400 font-medium mb-1.5 block">Email manzil</label>
            <div className="relative">
              <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="input-base pl-10"
                placeholder="email@example.com"
                required
              />
            </div>
          </div>

          <div>
            <label className="text-sm text-gray-400 font-medium mb-1.5 block">Parol</label>
            <div className="relative">
              <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
              <input
                type={showPass ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="input-base pl-10 pr-10"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
              >
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {error && (
            <div className="p-3 rounded-xl text-sm text-red-400 animate-shake" style={{background:'rgba(239,68,68,0.1)', border:'1px solid rgba(239,68,68,0.2)'}}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full justify-center py-3 text-base mt-2"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Kirish...
              </>
            ) : 'Kirish'}
          </button>
        </form>

        <div className="mt-6 p-4 rounded-xl" style={{background:'rgba(255,255,255,0.02)', border:'1px solid rgba(255,255,255,0.06)'}}>
          <p className="text-xs text-gray-600 text-center">
            Admin: <span className="text-gray-400">admin@academy.uz / admin123</span><br/>
            Student: <span className="text-gray-400">student@academy.uz / student123</span>
          </p>
        </div>
      </div>
    </div>
  )
}
