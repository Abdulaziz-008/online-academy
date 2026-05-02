'use client'
import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useRouter } from 'next/navigation'

interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'student'
  avatar?: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | null>(null)

const MOCK_USERS = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@academy.uz',
    password: 'admin123',
    role: 'admin' as const,
  },
  {
    id: '2',
    name: 'Alisher Karimov',
    email: 'alisher@mail.uz',
    password: 'alisher123',
    role: 'student' as const,
  },
  {
    id: '3',
    name: 'Dilnoza Yusupova',
    email: 'dilnoza@gmail.com',
    password: 'dilnoza123',
    role: 'student' as const,
  },
  {
    id: '4',
    name: 'Bobur Rahimov',
    email: 'bobur@mail.uz',
    password: 'bobur123',
    role: 'student' as const,
  },
  {
    id: '5',
    name: 'Sarvinoz Mirzaeva',
    email: 'sarvinoz@gmail.com',
    password: 'sarvinoz123',
    role: 'student' as const,
  },
  {
    id: '6',
    name: 'Jasur Toshmatov',
    email: 'jasur@mail.uz',
    password: 'jasur123',
    role: 'student' as const,
  },
  {
    id: '7',
    name: 'Malika Xolmatova',
    email: 'malika@gmail.com',
    password: 'malika123',
    role: 'student' as const,
  },
  {
    id: '8',
    name: 'Sherzod Nazarov',
    email: 'sherzod@mail.uz',
    password: 'sherzod123',
    role: 'student' as const,
  },
  {
    id: '9',
    name: 'Nargiza Abdullayeva',
    email: 'nargiza@gmail.com',
    password: 'nargiza123',
    role: 'student' as const,
  },
]

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const stored = localStorage.getItem('academy_user')
    if (stored) {
      try {
        setUser(JSON.parse(stored))
      } catch {}
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    await new Promise(r => setTimeout(r, 800))
    const found = MOCK_USERS.find(u => u.email === email && u.password === password)
    if (found) {
      const { password: _, ...userData } = found
      setUser(userData)
      localStorage.setItem('academy_user', JSON.stringify(userData))
      return { success: true }
    }
    return { success: false, error: 'Email yoki parol noto\'g\'ri' }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('academy_user')
    router.push('/auth/login')
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
