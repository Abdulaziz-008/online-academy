'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { AuthProvider, useAuth } from '@/lib/auth'
// import { ThemeProvider } from '@/lib/theme'
import DashboardLayout from '@/components/layout/DashboardLayout'

function AdminGuard({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !user) router.push('/auth/login')
    if (!isLoading && user && user.role !== 'admin') router.push('/student/dashboard')
  }, [user, isLoading, router])

  if (isLoading || !user || user.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{background:'#0a0a0f'}}>
        <div className="w-8 h-8 border-2 border-sky-500 border-t-transparent rounded-full animate-spin"/>
      </div>
    )
  }
  return <DashboardLayout>{children}</DashboardLayout>
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      {/* <ThemeProvider> */}
        <AdminGuard>{children}</AdminGuard>
      {/* </ThemeProvider> */}
      
    </AuthProvider>
  )
}
