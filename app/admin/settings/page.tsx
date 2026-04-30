'use client'
import { useState } from 'react'
import { Save, Globe, Bell, Shield, CreditCard, Tag, Users, Zap, Sun, Moon } from 'lucide-react'
import { Card } from '@/components/ui'
import { useTheme } from '@/lib/theme'

export default function SettingsPage() {
  const [saved, setSaved] = useState(false)
  const { theme, toggleTheme, language, setLanguage, t } = useTheme()

  const [settings, setSettings] = useState({
    siteName: 'EduAdmin Online Academy',
    siteEmail: 'info@academy.uz',
    sitePhone: '+998 71 123 45 67',
    currency: 'UZS',
    language: 'uz',
    paymeEnabled: true,
    clickEnabled: true,
    stripeEnabled: false,
    emailNotifs: true,
    smsNotifs: false,
    pushNotifs: true,
    twoFactor: false,
    rateLimiting: true,
    promoCodesEnabled: true,
    referralEnabled: true,
    aiRecommendations: true,
    maxStudentsPerCourse: '1000',
    trialPeriodDays: '7',
  })

  const update = (key: string, value: any) => setSettings(p => ({ ...p, [key]: value }))

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const Toggle = ({ value, onChange }: { value: boolean; onChange: (v: boolean) => void }) => (
    <button
      onClick={() => onChange(!value)}
      className={`relative w-12 h-6 rounded-full transition-all duration-300 flex-shrink-0 ${value ? 'bg-sky-500' : 'bg-gray-700'}`}
    >
      <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all duration-300 ${value ? 'left-7' : 'left-1'}`} />
    </button>
  )

  const sections = [
    {
      icon: <Globe size={18} />,
      title: t('generalSettings'),
      color: '#0ea5e9',
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { label: 'Sayt nomi', key: 'siteName', type: 'text' },
              { label: 'Email', key: 'siteEmail', type: 'email' },
              { label: 'Telefon', key: 'sitePhone', type: 'text' },
            ].map(f => (
              <div key={f.key}>
                <label className="text-sm text-gray-400 font-medium mb-1.5 block">{f.label}</label>
                <input className="input-base" type={f.type} value={(settings as any)[f.key]} onChange={e => update(f.key, e.target.value)} />
              </div>
            ))}
            <div>
              <label className="text-sm text-gray-400 font-medium mb-1.5 block">Til / Language</label>
              <div className="flex gap-2">
                {([
                  { code: 'uz', label: "O'zbek", flag: '🇺🇿' },
                  { code: 'ru', label: 'Русский', flag: '🇷🇺' },
                  { code: 'en', label: 'English', flag: '🇬🇧' },
                ] as const).map(l => (
                  <button
                    key={l.code}
                    onClick={() => setLanguage(l.code)}
                    className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-1.5 ${
                      language === l.code
                        ? 'bg-sky-500 text-white'
                        : 'text-gray-400 hover:text-white'
                    }`}
                    style={{
                      border: language === l.code ? '1px solid #0ea5e9' : '1px solid rgba(255,255,255,0.1)',
                      background: language === l.code ? '#0ea5e9' : 'rgba(255,255,255,0.04)',
                    }}
                  >
                    {l.flag} {l.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* DARK / LIGHT MODE */}
          <div>
            <label className="text-sm text-gray-400 font-medium mb-2 block">Mavzu (Theme)</label>
            <div className="flex gap-3">
              <button
                onClick={() => theme !== 'dark' && toggleTheme()}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-semibold transition-all`}
                style={{
                  background: theme === 'dark' ? 'rgba(14,165,233,0.15)' : 'rgba(255,255,255,0.04)',
                  border: theme === 'dark' ? '1px solid rgba(14,165,233,0.5)' : '1px solid rgba(255,255,255,0.1)',
                  color: theme === 'dark' ? '#0ea5e9' : '#6b7280',
                }}
              >
                <Moon size={16} /> Qorong'u rejim
              </button>
              <button
                onClick={() => theme !== 'light' && toggleTheme()}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-semibold transition-all`}
                style={{
                  background: theme === 'light' ? 'rgba(249,115,22,0.15)' : 'rgba(255,255,255,0.04)',
                  border: theme === 'light' ? '1px solid rgba(249,115,22,0.5)' : '1px solid rgba(255,255,255,0.1)',
                  color: theme === 'light' ? '#f97316' : '#6b7280',
                }}
              >
                <Sun size={16} /> Yorug' rejim
              </button>
            </div>
          </div>
        </div>
      )
    },
    {
      icon: <CreditCard size={18} />,
      title: t('paymentSystems'),
      color: '#22c55e',
      content: (
        <div className="space-y-3">
          {[
            { key: 'paymeEnabled', label: 'Payme', desc: 'O\'zbekiston milliy to\'lov tizimi', color: '#0ea5e9' },
            { key: 'clickEnabled', label: 'Click', desc: 'Milliy mobil to\'lov tizimi', color: '#22c55e' },
            { key: 'stripeEnabled', label: 'Stripe', desc: 'Xalqaro karta to\'lovlari', color: '#6366f1' },
          ].map(item => (
            <div key={item.key} className="flex items-center justify-between p-4 rounded-xl" style={{ background: 'rgba(255,255,255,0.04)' }}>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold text-white" style={{ background: item.color }}>
                  {item.label[0]}
                </div>
                <div>
                  <div className="text-sm font-semibold" style={{ color: 'var(--color-text)' }}>{item.label}</div>
                  <div className="text-xs text-gray-500">{item.desc}</div>
                </div>
              </div>
              <Toggle value={(settings as any)[item.key]} onChange={v => update(item.key, v)} />
            </div>
          ))}
        </div>
      )
    },
    {
      icon: <Bell size={18} />,
      title: t('notificationsSection'),
      color: '#f97316',
      content: (
        <div className="space-y-3">
          {[
            { key: 'emailNotifs', label: 'Email bildirishnomalar', desc: 'To\'lov va kurs yangiliklari' },
            { key: 'smsNotifs', label: 'SMS bildirishnomalar', desc: 'Muhim xabarlar SMS orqali' },
            { key: 'pushNotifs', label: 'Push bildirishnomalar', desc: 'Brauzer orqali xabarnomalar' },
          ].map(item => (
            <div key={item.key} className="flex items-center justify-between p-4 rounded-xl" style={{ background: 'rgba(255,255,255,0.04)' }}>
              <div>
                <div className="text-sm font-semibold" style={{ color: 'var(--color-text)' }}>{item.label}</div>
                <div className="text-xs text-gray-500">{item.desc}</div>
              </div>
              <Toggle value={(settings as any)[item.key]} onChange={v => update(item.key, v)} />
            </div>
          ))}
        </div>
      )
    },
    {
      icon: <Shield size={18} />,
      title: t('security'),
      color: '#ef4444',
      content: (
        <div className="space-y-3">
          {[
            { key: 'twoFactor', label: '2 bosqichli autentifikatsiya', desc: 'Admin hisobi uchun qo\'shimcha himoya' },
            { key: 'rateLimiting', label: 'Rate Limiting', desc: 'API so\'rovlarini cheklash' },
          ].map(item => (
            <div key={item.key} className="flex items-center justify-between p-4 rounded-xl" style={{ background: 'rgba(255,255,255,0.04)' }}>
              <div>
                <div className="text-sm font-semibold" style={{ color: 'var(--color-text)' }}>{item.label}</div>
                <div className="text-xs text-gray-500">{item.desc}</div>
              </div>
              <Toggle value={(settings as any)[item.key]} onChange={v => update(item.key, v)} />
            </div>
          ))}
        </div>
      )
    },
    {
      icon: <Zap size={18} />,
      title: t('extras'),
      color: '#a855f7',
      content: (
        <div className="space-y-3">
          {[
            { key: 'promoCodesEnabled', label: 'Promo kodlar', desc: 'Chegirma kodlari tizimi' },
            { key: 'referralEnabled', label: 'Referal tizim', desc: 'Do\'st taklif qilish bonuslari' },
            { key: 'aiRecommendations', label: 'AI tavsiyalar', desc: 'Kurs tavsiya tizimi' },
          ].map(item => (
            <div key={item.key} className="flex items-center justify-between p-4 rounded-xl" style={{ background: 'rgba(255,255,255,0.04)' }}>
              <div>
                <div className="text-sm font-semibold" style={{ color: 'var(--color-text)' }}>{item.label}</div>
                <div className="text-xs text-gray-500">{item.desc}</div>
              </div>
              <Toggle value={(settings as any)[item.key]} onChange={v => update(item.key, v)} />
            </div>
          ))}
        </div>
      )
    },
  ]

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl">
      <div className="flex items-center justify-between">
        <p className="text-gray-500 text-sm">{t('manageSettings')}</p>
        <button onClick={handleSave} className="btn-primary text-sm py-2 px-5">
          <Save size={15} />
          {saved ? t('saved') : t('save')}
        </button>
      </div>

      {sections.map((section, i) => (
        <Card
          key={i}
          title={section.title}
          action={
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: `${section.color}20`, color: section.color }}>
              {section.icon}
            </div>
          }
        >
          <div className="p-5">{section.content}</div>
        </Card>
      ))}
    </div>
  )
}
