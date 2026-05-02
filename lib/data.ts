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


export interface Lesson {
  id: string
  courseId: string
  title: string
  description: string
  youtubeUrl: string
  duration: string
  order: number
  isFree: boolean
}

export const mockLessons: Lesson[] = [
  {
    id: 'l1', courseId: '1',
    title: 'React nima? Kirish darsi',
    description: 'Bu darsda React.js haqida umumiy ma\'lumot beramiz.',
    youtubeUrl: 'https://www.youtube.com/watch?v=Ke90Tje7VS0',
    duration: '12:34', order: 1, isFree: true,
  },
  {
    id: 'l2', courseId: '1',
    title: 'JSX va Komponentlar',
    description: 'JSX sintaksisi va komponentlar yaratish.',
    youtubeUrl: 'https://www.youtube.com/watch?v=SqcY0GlETPk',
    duration: '18:20', order: 2, isFree: true,
  },
  {
    id: 'l3', courseId: '1',
    title: 'Props va State',
    description: 'Ma\'lumot uzatish va state boshqarish.',
    youtubeUrl: 'https://www.youtube.com/watch?v=4UZrsTqkcW4',
    duration: '22:15', order: 3, isFree: false,
  },
  {
    id: 'l4', courseId: '1',
    title: 'useState Hook',
    description: 'useState hook bilan ishlash.',
    youtubeUrl: 'https://www.youtube.com/watch?v=O6P86uwfdR0',
    duration: '16:40', order: 4, isFree: false,
  },
  {
    id: 'l5', courseId: '1',
    title: 'useEffect Hook',
    description: 'useEffect va lifecycle metodlar.',
    youtubeUrl: 'https://www.youtube.com/watch?v=0ZJgIjIuY7U',
    duration: '20:10', order: 5, isFree: false,
  },
  {
    id: 'l6', courseId: '2',
    title: 'Node.js ga kirish',
    description: 'Node.js nima va qanday ishlaydi.',
    youtubeUrl: 'https://www.youtube.com/watch?v=TlB_eWDSMt4',
    duration: '14:22', order: 1, isFree: true,
  },
  {
    id: 'l7', courseId: '2',
    title: 'Express.js asoslari',
    description: 'Express.js bilan server yaratish.',
    youtubeUrl: 'https://www.youtube.com/watch?v=L72fhGm1tfE',
    duration: '25:18', order: 2, isFree: true,
  },
  {
    id: 'l8', courseId: '2',
    title: 'REST API yaratish',
    description: 'CRUD operatsiyalari va REST API.',
    youtubeUrl: 'https://www.youtube.com/watch?v=pKd0Rpw7O48',
    duration: '30:05', order: 3, isFree: false,
  },
  {
    id: 'l9', courseId: '3',
    title: 'Flutter ga kirish',
    description: 'Flutter va Dart tilini o\'rganamiz.',
    youtubeUrl: 'https://www.youtube.com/watch?v=1ukSR1GRtMU',
    duration: '19:30', order: 1, isFree: true,
  },
  {
    id: 'l10', courseId: '4',
    title: 'Figma interfeysi',
    description: 'Figma dasturini o\'rganamiz.',
    youtubeUrl: 'https://www.youtube.com/watch?v=FTFaQWZBqQ8',
    duration: '11:45', order: 1, isFree: true,
  },
]

export function getYoutubeId(url: string): string {
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/)
  return match ? match[1] : ''
}

export const studentData: Record<string, {
  purchasedIds: string[]
  progresses: Record<string, number>
  hoursLearned: string
  testsPassed: number
  streak: number
  recentActivity: { type: string; text: string; time: string; icon: string }[]
}> = {
  '2': { // Alisher Karimov
    purchasedIds: ['1', '2', '4'],
    progresses: { '1': 68, '2': 35, '4': 90 },
    hoursLearned: '48h',
    testsPassed: 12,
    streak: 7,
    recentActivity: [
      { type: 'lesson', text: 'React Hooks darsini yakunladingiz', time: '2 soat oldin', icon: '✅' },
      { type: 'test', text: 'JavaScript quiz\'da 85% natija oldingiz', time: 'Kecha', icon: '📝' },
      { type: 'course', text: 'Node.js kursiga yozildingiz', time: '3 kun oldin', icon: '📚' },
      { type: 'cert', text: 'HTML/CSS sertifikatini oldingiz', time: '1 hafta oldin', icon: '🏆' },
    ],
  },
  '3': { // Dilnoza Yusupova
    purchasedIds: ['2'],
    progresses: { '2': 55 },
    hoursLearned: '20h',
    testsPassed: 4,
    streak: 3,
    recentActivity: [
      { type: 'lesson', text: 'Express.js darsini yakunladingiz', time: '1 soat oldin', icon: '✅' },
      { type: 'test', text: 'Node.js quiz\'da 72% natija oldingiz', time: 'Kecha', icon: '📝' },
      { type: 'course', text: 'Node.js kursiga yozildingiz', time: '1 hafta oldin', icon: '📚' },
    ],
  },
  '4': { // Bobur Rahimov
    purchasedIds: ['1', '3', '4', '5', '6'],
    progresses: { '1': 100, '3': 45, '4': 80, '5': 20, '6': 60 },
    hoursLearned: '120h',
    testsPassed: 28,
    streak: 15,
    recentActivity: [
      { type: 'cert', text: 'React.js sertifikatini oldingiz', time: '1 kun oldin', icon: '🏆' },
      { type: 'lesson', text: 'Flutter darsini yakunladingiz', time: '3 soat oldin', icon: '✅' },
      { type: 'test', text: 'DevOps quiz\'da 91% natija oldingiz', time: '2 kun oldin', icon: '📝' },
    ],
  },
  '5': { // Sarvinoz Mirzaeva
    purchasedIds: ['4', '1'],
    progresses: { '4': 70, '1': 25 },
    hoursLearned: '32h',
    testsPassed: 7,
    streak: 5,
    recentActivity: [
      { type: 'lesson', text: 'Figma darsini yakunladingiz', time: '4 soat oldin', icon: '✅' },
      { type: 'test', text: 'Design quiz\'da 88% natija oldingiz', time: 'Kecha', icon: '📝' },
      { type: 'course', text: 'React.js kursiga yozildingiz', time: '5 kun oldin', icon: '📚' },
    ],
  },
  '6': { // Jasur Toshmatov
    purchasedIds: ['1', '2', '3', '6'],
    progresses: { '1': 90, '2': 75, '3': 30, '6': 50 },
    hoursLearned: '95h',
    testsPassed: 19,
    streak: 11,
    recentActivity: [
      { type: 'lesson', text: 'Docker darsini yakunladingiz', time: '2 soat oldin', icon: '✅' },
      { type: 'test', text: 'React quiz\'da 94% natija oldingiz', time: 'Kecha', icon: '📝' },
      { type: 'cert', text: 'Node.js sertifikatini oldingiz', time: '3 kun oldin', icon: '🏆' },
    ],
  },
  '7': { // Malika Xolmatova
    purchasedIds: ['4'],
    progresses: { '4': 15 },
    hoursLearned: '8h',
    testsPassed: 1,
    streak: 1,
    recentActivity: [
      { type: 'course', text: 'Figma kursiga yozildingiz', time: '2 kun oldin', icon: '📚' },
      { type: 'lesson', text: 'Birinchi darsni yakunladingiz', time: '1 kun oldin', icon: '✅' },
    ],
  },
  '8': { // Sherzod Nazarov
    purchasedIds: ['1', '2', '3', '4', '5', '6'],
    progresses: { '1': 100, '2': 100, '3': 85, '4': 100, '5': 60, '6': 75 },
    hoursLearned: '210h',
    testsPassed: 45,
    streak: 30,
    recentActivity: [
      { type: 'cert', text: 'Figma sertifikatini oldingiz', time: '2 soat oldin', icon: '🏆' },
      { type: 'lesson', text: 'Python darsini yakunladingiz', time: 'Kecha', icon: '✅' },
      { type: 'test', text: 'Flutter quiz\'da 96% natija oldingiz', time: '2 kun oldin', icon: '📝' },
      { type: 'cert', text: 'React.js sertifikatini oldingiz', time: '1 hafta oldin', icon: '🏆' },
    ],
  },
  '9': { // Nargiza Abdullayeva
    purchasedIds: ['1', '4'],
    progresses: { '1': 40, '4': 55 },
    hoursLearned: '28h',
    testsPassed: 6,
    streak: 4,
    recentActivity: [
      { type: 'lesson', text: 'React State darsini yakunladingiz', time: '3 soat oldin', icon: '✅' },
      { type: 'test', text: 'Figma quiz\'da 79% natija oldingiz', time: 'Kecha', icon: '📝' },
      { type: 'course', text: 'Figma kursiga yozildingiz', time: '1 hafta oldin', icon: '📚' },
    ],
  },
}