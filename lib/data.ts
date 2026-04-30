export const mockStats = {
  totalRevenue: 124580000,
  monthlyRevenue: 18450000,
  totalUsers: 3847,
  activeUsers: 2341,
  totalCourses: 42,
  activeCourses: 38,
  completionRate: 68,
  totalTests: 156,
}

export const revenueData = [
  { month: 'Yan', revenue: 8500000, users: 180 },
  { month: 'Fev', revenue: 11200000, users: 220 },
  { month: 'Mar', revenue: 9800000, users: 195 },
  { month: 'Apr', revenue: 14300000, users: 280 },
  { month: 'May', revenue: 13100000, users: 260 },
  { month: 'Iyn', revenue: 16800000, users: 340 },
  { month: 'Iyl', revenue: 15200000, users: 310 },
  { month: 'Avg', revenue: 19500000, users: 390 },
  { month: 'Sen', revenue: 17300000, users: 350 },
  { month: 'Okt', revenue: 21000000, users: 420 },
  { month: 'Noy', revenue: 18900000, users: 380 },
  { month: 'Dek', revenue: 24500000, users: 490 },
]

export const courseDistribution = [
  { name: 'Frontend', value: 35, color: '#0ea5e9' },
  { name: 'Backend', value: 25, color: '#f97316' },
  { name: 'Mobile', value: 20, color: '#22c55e' },
  { name: 'Design', value: 12, color: '#a855f7' },
  { name: 'DevOps', value: 8, color: '#eab308' },
]

export const mockUsers = [
  { id: '1', name: 'Alisher Karimov', email: 'alisher@mail.uz', phone: '+998901234567', courses: 3, status: 'active', joined: '2024-01-15', spent: 450000, avatar: 'AK' },
  { id: '2', name: 'Dilnoza Yusupova', email: 'dilnoza@gmail.com', phone: '+998907654321', courses: 1, status: 'active', joined: '2024-02-20', spent: 150000, avatar: 'DY' },
  { id: '3', name: 'Bobur Rahimov', email: 'bobur@mail.uz', phone: '+998901111111', courses: 5, status: 'blocked', joined: '2023-11-10', spent: 750000, avatar: 'BR' },
  { id: '4', name: 'Sarvinoz Mirzaeva', email: 'sarvinoz@gmail.com', phone: '+998902222222', courses: 2, status: 'active', joined: '2024-03-05', spent: 300000, avatar: 'SM' },
  { id: '5', name: 'Jasur Toshmatov', email: 'jasur@mail.uz', phone: '+998903333333', courses: 4, status: 'active', joined: '2024-01-30', spent: 600000, avatar: 'JT' },
  { id: '6', name: 'Malika Xolmatova', email: 'malika@gmail.com', phone: '+998904444444', courses: 1, status: 'inactive', joined: '2024-04-12', spent: 150000, avatar: 'MX' },
  { id: '7', name: 'Sherzod Nazarov', email: 'sherzod@mail.uz', phone: '+998905555555', courses: 6, status: 'active', joined: '2023-09-18', spent: 900000, avatar: 'SN' },
  { id: '8', name: 'Nargiza Abdullayeva', email: 'nargiza@gmail.com', phone: '+998906666666', courses: 2, status: 'active', joined: '2024-02-28', spent: 300000, avatar: 'NA' },
]

export const mockCourses = [
  { id: '1', title: 'React.js — Boshlang\'ichdan Professional', category: 'Frontend', price: 299000, students: 342, lessons: 48, duration: '24 soat', status: 'published', rating: 4.8, image: '🎯', instructor: 'Admin', created: '2024-01-10' },
  { id: '2', title: 'Node.js & Express.js Backend', category: 'Backend', price: 349000, students: 228, lessons: 56, duration: '30 soat', status: 'published', rating: 4.9, image: '⚡', instructor: 'Admin', created: '2024-02-05' },
  { id: '3', title: 'Flutter Mobile Development', category: 'Mobile', price: 399000, students: 156, lessons: 64, duration: '40 soat', status: 'published', rating: 4.7, image: '📱', instructor: 'Admin', created: '2024-03-15' },
  { id: '4', title: 'UI/UX Design Figma', category: 'Design', price: 249000, students: 189, lessons: 36, duration: '20 soat', status: 'published', rating: 4.6, image: '🎨', instructor: 'Admin', created: '2024-01-25' },
  { id: '5', title: 'Python & Django Full Stack', category: 'Backend', price: 379000, students: 98, lessons: 72, duration: '45 soat', status: 'draft', rating: 0, image: '🐍', instructor: 'Admin', created: '2024-04-01' },
  { id: '6', title: 'DevOps & Docker Kubernetes', category: 'DevOps', price: 449000, students: 67, lessons: 44, duration: '28 soat', status: 'published', rating: 4.5, image: '🚀', instructor: 'Admin', created: '2024-02-20' },
]

export const mockPayments = [
  { id: 'PAY-001', user: 'Alisher Karimov', course: 'React.js — Boshlang\'ichdan Professional', amount: 299000, method: 'Payme', status: 'success', date: '2024-12-15 14:32' },
  { id: 'PAY-002', user: 'Dilnoza Yusupova', course: 'Node.js & Express.js Backend', amount: 349000, method: 'Click', status: 'success', date: '2024-12-15 12:18' },
  { id: 'PAY-003', user: 'Bobur Rahimov', course: 'Flutter Mobile Development', amount: 399000, method: 'Stripe', status: 'pending', date: '2024-12-15 10:45' },
  { id: 'PAY-004', user: 'Sarvinoz Mirzaeva', course: 'UI/UX Design Figma', amount: 249000, method: 'Payme', status: 'success', date: '2024-12-14 18:22' },
  { id: 'PAY-005', user: 'Jasur Toshmatov', course: 'DevOps & Docker Kubernetes', amount: 449000, method: 'Click', status: 'refunded', date: '2024-12-14 15:10' },
  { id: 'PAY-006', user: 'Malika Xolmatova', course: 'React.js — Boshlang\'ichdan Professional', amount: 299000, method: 'Payme', status: 'failed', date: '2024-12-14 11:05' },
  { id: 'PAY-007', user: 'Sherzod Nazarov', course: 'Python & Django Full Stack', amount: 379000, method: 'Stripe', status: 'success', date: '2024-12-13 20:30' },
  { id: 'PAY-008', user: 'Nargiza Abdullayeva', course: 'Node.js & Express.js Backend', amount: 349000, method: 'Click', status: 'success', date: '2024-12-13 16:48' },
]

export const mockTests = [
  { id: '1', title: 'React Hooks — Bilim tekshiruv', course: 'React.js', questions: 25, attempts: 189, avgScore: 76, passRate: 82, duration: '30 daqiqa', status: 'active' },
  { id: '2', title: 'Node.js Asoslari Quiz', course: 'Node.js', questions: 20, attempts: 145, avgScore: 68, passRate: 74, duration: '25 daqiqa', status: 'active' },
  { id: '3', title: 'Flutter Widgets Test', course: 'Flutter', questions: 30, attempts: 98, avgScore: 71, passRate: 78, duration: '35 daqiqa', status: 'active' },
  { id: '4', title: 'Figma Basics Quiz', course: 'UI/UX Design', questions: 15, attempts: 134, avgScore: 84, passRate: 91, duration: '20 daqiqa', status: 'active' },
  { id: '5', title: 'Docker Fundamentals', course: 'DevOps', questions: 22, attempts: 56, avgScore: 62, passRate: 68, duration: '28 daqiqa', status: 'draft' },
]

export const weeklyActivity = [
  { day: 'Du', sessions: 145, tests: 32 },
  { day: 'Se', sessions: 189, tests: 45 },
  { day: 'Ch', sessions: 234, tests: 58 },
  { day: 'Pa', sessions: 198, tests: 41 },
  { day: 'Ju', sessions: 267, tests: 63 },
  { day: 'Sh', sessions: 312, tests: 78 },
  { day: 'Ya', sessions: 156, tests: 29 },
]

export function formatCurrency(amount: number): string {
  if (amount >= 1000000) {
    return `${(amount / 1000000).toFixed(1)}M so'm`
  }
  return `${amount.toLocaleString('uz-UZ')} so'm`
}

export function formatNumber(n: number): string {
  if (n >= 1000) return `${(n/1000).toFixed(1)}K`
  return n.toString()
}
