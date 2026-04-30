'use client'
import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

type Theme = 'dark' | 'light'
export type Language = 'uz' | 'ru' | 'en'

interface ThemeContextType {
  theme: Theme
  language: Language
  toggleTheme: () => void
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const ThemeContext = createContext<ThemeContextType | null>(null)

const translations: Record<Language, Record<string, string>> = {
  uz: {
    // Sidebar nav
    dashboard: 'Dashboard',
    users: 'Foydalanuvchilar',
    courses: 'Kurslar',
    payments: "To'lovlar",
    tests: 'Testlar',
    analytics: 'Analitika',
    settings: 'Sozlamalar',
    logout: 'Chiqish',
    adminPanel: 'Admin Panel',
    myPage: 'Mening Sahifam',
    proFeature: 'Pro Xususiyat',
    aiEnabled: 'AI tavsiyalar va avtomatik analytics yoqilgan',

    // Header
    notifications: 'Bildirishnomalar',
    newNotif1: "Yangi foydalanuvchi ro'yxatdan o'tdi",
    newNotif2: "PAY-008 to'lov muvaffaqiyatli",
    newNotif3: "React.js kursi 342 ta student",
    seeAll: 'Barchasini ko\'rish',
    new: 'yangi',
    search: 'Qidirish...',
    darkMode: "Qorong'u rejim",
    lightMode: "Yorug' rejim",
    transactionId: 'Tranzaksiya ID',
    course: 'Kurs', 
    amount: 'Miqdor', 
    paymentMethod: "To'lov usuli", 
    date: 'Sana', 
    action: 'Amal',
    success: 'Muvaffaqiyatli', 
    pending: 'Kutilmoqda', 
    failed: 'Rad etildi', 
    refunded: 'Qaytarildi',

    // Dashboard
    overallStats: 'Umumiy ko\'rsatkichlar va statistika',
    week: 'Hafta',
    month: 'Oy',
    year: 'Yil',
    totalRevenue: 'Jami daromad',
    allTime: 'Barcha vaqt',
    totalUsers: 'Foydalanuvchilar',
    active: 'faol',
    totalCourses: 'Kurslar',
    completionRate: 'Yakunlash darajasi',
    average: "O'rtacha",
    revenueDynamics: 'Daromad dinamikasi',
    monthlyStats: 'Oylik daromad va foydalanuvchilar soni',
    growth: "o'sish",
    courseDistribution: 'Kurs taqsimoti',
    byCategory: 'Kategoriyalar bo\'yicha',
    weeklyActivity: 'Haftalik faollik',
    sessionsTests: 'Sessiyalar va test topshirishlar',
    sessions: 'Sessiyalar',
    topCourses: 'Top Kurslar',
    mostSold: 'Eng ko\'p sotilgan kurslar',
    seeAll2: 'Barchasi',
    students: 'student',
    recentUsers: "So'nggi foydalanuvchilar",
    newlyRegistered: "Yangi ro'yxatdan o'tgan foydalanuvchilar",
    user: 'Foydalanuvchi',
    email: 'Email',
    spent: 'Sarflagan',
    status: 'Holat',
    active2: 'Faol',
    blocked: 'Bloklangan',
    inactive: 'Nofaol',
    totalTests: 'Jami testlar', 
    activeTests: 'Faol testlar', 
    totalAttempts: 'Jami urinishlar', 
    avgPass: "O'rtacha o'tish",
    draft: 'Qoralama', 
    questions: 'Savollar', 
    attempts: 'Urinishlar', 
    time: 'Vaqt', 
    avgScore: "O'rtacha ball", 
    passRate: "O'tish darajasi",

    // Settings
    generalSettings: 'Umumiy sozlamalar',
    siteName: 'Sayt nomi',
    phone: 'Telefon',
    language: 'Til / Language',
    theme: 'Mavzu (Theme)',
    paymentSystems: "To'lov tizimlari",
    notificationsSection: 'Bildirishnomalar',
    security: 'Xavfsizlik',
    extras: "Qo'shimcha imkoniyatlar",
    save: 'Saqlash',
    saved: 'Saqlandi ✓',
    manageSettings: 'Platforma sozlamalarini boshqaring',
    blockUser: 'Bloklash',
    unblockUser: 'Blokni ochish',
    close: 'Yopish',
    totalCoursesLabel: 'Jami kurslar',
    published: 'Nashr qilingan',
    totalStudents: 'Jami studentlar',
    editCourse: 'Kursni tahrirlash',
    newCourse: 'Yangi kurs yaratish',
    courseStatus_published: 'Faol',
    courseStatus_draft: 'Qoralama',
    newCourseBtn: 'Yangi kurs',


    mrr: 'MRR (Oylik)', 
    newUsers: 'Yangi foydalanuvchilar', 
    courseCompletion: 'Kurs yakunlash', 
    retentionRate: 'Saqlanish darajasi',

    userMetrics: "Foydalanuvchi ko'rsatkichlari", 
    conversionFunnel: "Konversiya quyrug'i", 
    categoryAnalysis: 'Kategoriya analizi', 
    bestCourses: 'Eng yaxshi kurslar',

    welcomeBack: 'Xush kelibsiz!', 
    myCourses: 'Kurslarim', 
    learnedHours: "O'rganilgan soatlar", 
    testsPassed: 'Testlar topshirildi', 
    streak: 'Streak (kun)', 
    continueBtn: 'Davom ettirish', 
    overallProgress: 'Umumiy progress', 
    upcomingTests: 'Testlar', 
    upcomingDesc: 'Kutilayotgan testlar', 
    recentActivity: 'Faollik', 
    recentDesc: "So'nggi harakatlar", 
    lastLesson: 'Oxirgi', 
    continueCourse: 'Davom etish', 
    lessons: 'dars',
    
    allCourses: 'Barcha kurslar', 
    searchCourse: 'Kurs qidirish...', 
    progress: 'Progress', 
    buyCourse: 'Sotib olish',

    myTests: 'Mening testlarim', 
    available: 'Mavjud', 
    completed: 'Topshirildi', 
    locked: 'Qulflangan', 
    startTest: 'Boshlash', 
    retake: 'Qayta topshirish', 
    question: 'savol', 
    minute: 'Daqiqa', 
    attempt: 'Urinish', 
    bestScore: 'Eng yaxshi natija', 
    passScore: "O'tish ball", 
    congratulations: 'Tabriklaymiz!', 
    tryAgain: 'Qayta urinish', 
    exit: 'Chiqish', 
    passed: 'Siz testni muvaffaqiyatli topshirdingiz!', 
    notPassed: "Qayta urinib ko'ring.",
  },
  ru: {
    dashboard: 'Панель',
    users: 'Пользователи',
    courses: 'Курсы',
    payments: 'Платежи',
    tests: 'Тесты',
    analytics: 'Аналитика',
    settings: 'Настройки',
    logout: 'Выйти',
    adminPanel: 'Панель Админа',
    myPage: 'Моя Страница',
    proFeature: 'Pro Функция',
    aiEnabled: 'AI рекомендации и автоматическая аналитика включены',

    notifications: 'Уведомления',
    newNotif1: 'Новый пользователь зарегистрировался',
    newNotif2: 'Платёж PAY-008 успешен',
    newNotif3: 'Курс React.js — 342 студента',
    seeAll: 'Смотреть все',
    new: 'новых',
    search: 'Поиск...',
    darkMode: 'Тёмный режим',
    lightMode: 'Светлый режим',
    transactionId: 'ID транзакции', 
    course: 'Курс', 
    amount: 'Сумма', 
    paymentMethod: 'Способ оплаты', 
    date: 'Дата', 
    action: 'Действие',
    success: 'Успешно', 
    pending: 'Ожидание', 
    failed: 'Отклонено', 
    refunded: 'Возвращено',

    overallStats: 'Общие показатели и статистика',
    week: 'Неделя',
    month: 'Месяц',
    year: 'Год',
    totalRevenue: 'Общий доход',
    allTime: 'За всё время',
    totalUsers: 'Пользователи',
    active: 'активных',
    totalCourses: 'Курсы',
    completionRate: 'Процент завершения',
    average: 'Среднее',
    revenueDynamics: 'Динамика дохода',
    monthlyStats: 'Ежемесячный доход и количество пользователей',
    growth: 'рост',
    courseDistribution: 'Распределение курсов',
    byCategory: 'По категориям',
    weeklyActivity: 'Недельная активность',
    sessionsTests: 'Сессии и прохождение тестов',
    sessions: 'Сессии',
    topCourses: 'Топ курсы',
    mostSold: 'Самые популярные курсы',
    seeAll2: 'Все',
    students: 'студентов',
    recentUsers: 'Последние пользователи',
    newlyRegistered: 'Недавно зарегистрированные',
    user: 'Пользователь',
    email: 'Email',
    spent: 'Потрачено',
    status: 'Статус',
    active2: 'Активен',
    blocked: 'Заблокирован',
    inactive: 'Неактивен',
    totalTests: 'Всего тестов', 
    activeTests: 'Активные тесты', 
    totalAttempts: 'Всего попыток', 
    avgPass: 'Средний проход',
    draft: 'Черновик', 
    questions: 'Вопросы', 
    attempts: 'Попытки', 
    time: 'Время', 
    avgScore: 'Средний балл', 
    passRate: 'Процент прохождения',

    generalSettings: 'Общие настройки',
    siteName: 'Название сайта',
    phone: 'Телефон',
    language: 'Язык / Language',
    theme: 'Тема',
    paymentSystems: 'Платёжные системы',
    notificationsSection: 'Уведомления',
    security: 'Безопасность',
    extras: 'Дополнительные функции',
    save: 'Сохранить',
    saved: 'Сохранено ✓',
    manageSettings: 'Управляйте настройками платформы',
    blockUser: 'Заблокировать',
    unblockUser: 'Разблокировать',
    close: 'Закрыть',
    totalCoursesLabel: 'Всего курсов',
    published: 'Опубликовано',
    totalStudents: 'Всего студентов',
    editCourse: 'Редактировать курс',
    newCourse: 'Новый курс',
    courseStatus_published: 'Активен',
    courseStatus_draft: 'Черновик',
    newCourseBtn: 'Новый курс',

    mrr: 'MRR (Ежемесячный)', 
    newUsers: 'Новые пользователи', 
    courseCompletion: 'Завершение курса', 
    retentionRate: 'Удержание',


    userMetrics: 'Метрики пользователей', 
    conversionFunnel: 'Воронка конверсии', 
    categoryAnalysis: 'Анализ категорий', 
    bestCourses: 'Лучшие курсы',

    welcomeBack: 'Добро пожаловать!', 
    myCourses: 'Мои курсы', 
    learnedHours: 'Часов обучения', 
    testsPassed: 'Тестов сдано', 
    streak: 'Серия (дней)', 
    continueBtn: 'Продолжить', 
    overallProgress: 'Общий прогресс', 
    upcomingTests: 'Тесты', 
    upcomingDesc: 'Предстоящие тесты', 
    recentActivity: 'Активность', 
    recentDesc: 'Последние действия', 
    lastLesson: 'Последнее', 
    continueCourse: 'Продолжить', 
    lessons: 'уроков',

    allCourses: 'Все курсы', 
    searchCourse: 'Поиск курса...', 
    progress: 'Прогресс', 
    buyCourse: 'Купить', 


    myTests: 'Мои тесты', 
    available: 'Доступен', 
    completed: 'Сдан', 
    locked: 'Заблокирован', 
    startTest: 'Начать', 
    retake: 'Пересдать', 
    question: 'вопрос', 
    minute: 'Минута', 
    attempt: 'Попытка', 
    bestScore: 'Лучший результат', 
    passScore: 'Проходной балл', 
    congratulations: 'Поздравляем!', 
    tryAgain: 'Попробовать снова', 
    exit: 'Выйти', 
    passed: 'Вы успешно прошли тест!', 
    notPassed: 'Попробуйте ещё раз.',
  },
  en: {
    dashboard: 'Dashboard',
    users: 'Users',
    courses: 'Courses',
    payments: 'Payments',
    tests: 'Tests',
    analytics: 'Analytics',
    settings: 'Settings',
    logout: 'Logout',
    adminPanel: 'Admin Panel',
    myPage: 'My Page',
    proFeature: 'Pro Feature',
    aiEnabled: 'AI recommendations and auto analytics enabled',

    notifications: 'Notifications',
    newNotif1: 'New user registered',
    newNotif2: 'Payment PAY-008 successful',
    newNotif3: 'React.js course — 342 students',
    seeAll: 'See all',
    new: 'new',
    search: 'Search...',
    darkMode: 'Dark Mode',
    lightMode: 'Light Mode',
    transactionId: 'Transaction ID', 
    course: 'Course', 
    amount: 'Amount', 
    paymentMethod: 'Payment Method', 
    date: 'Date', 
    action: 'Action',
    success: 'Success', 
    pending: 'Pending', 
    failed: 'Failed', 
    refunded: 'Refunded',

    overallStats: 'Overall stats and metrics',
    week: 'Week',
    month: 'Month',
    year: 'Year',
    totalRevenue: 'Total Revenue',
    allTime: 'All time',
    totalUsers: 'Users',
    active: 'active',
    totalCourses: 'Courses',
    completionRate: 'Completion Rate',
    average: 'Average',
    revenueDynamics: 'Revenue Dynamics',
    monthlyStats: 'Monthly revenue and user count',
    growth: 'growth',
    courseDistribution: 'Course Distribution',
    byCategory: 'By category',
    weeklyActivity: 'Weekly Activity',
    sessionsTests: 'Sessions and test submissions',
    sessions: 'Sessions',
    topCourses: 'Top Courses',
    mostSold: 'Most enrolled courses',
    seeAll2: 'All',
    students: 'students',
    recentUsers: 'Recent Users',
    newlyRegistered: 'Newly registered users',
    user: 'User',
    email: 'Email',
    spent: 'Spent',
    status: 'Status',
    active2: 'Active',
    blocked: 'Blocked',
    inactive: 'Inactive',
    totalTests: 'Total Tests', 
    activeTests: 'Active Tests', 
    totalAttempts: 'Total Attempts', 
    avgPass: 'Avg Pass Rate',
    draft: 'Draft', 
    questions: 'Questions', 
    attempts: 'Attempts', 
    time: 'Time', 
    avgScore: 'Avg Score', 
    passRate: 'Pass Rate',

    generalSettings: 'General Settings',
    siteName: 'Site Name',
    phone: 'Phone',
    language: 'Language',
    theme: 'Theme',
    paymentSystems: 'Payment Systems',
    notificationsSection: 'Notifications',
    security: 'Security',
    extras: 'Extra Features',
    save: 'Save',
    saved: 'Saved ✓',
    manageSettings: 'Manage platform settings',
    blockUser: 'Block',
    unblockUser: 'Unblock',
    close: 'Close',
    totalCoursesLabel: 'Total Courses',
    published: 'Published',
    totalStudents: 'Total Students',
    editCourse: 'Edit Course',
    newCourse: 'New Course',
    courseStatus_published: 'Active',
    courseStatus_draft: 'Draft',
    newCourseBtn: 'New Course',

    mrr: 'MRR (Monthly)', 
    newUsers: 'New Users', 
    courseCompletion: 'Course Completion', 
    retentionRate: 'Retention Rate',

    userMetrics: 'User Metrics', 
    conversionFunnel: 'Conversion Funnel', 
    categoryAnalysis: 'Category Analysis', 
    bestCourses: 'Best Courses',

    welcomeBack: 'Welcome back!', 
    myCourses: 'My Courses', 
    learnedHours: 'Hours Learned', 
    testsPassed: 'Tests Passed', 
    streak: 'Streak (days)', 
    continueBtn: 'Continue', 
    overallProgress: 'Overall Progress', 
    upcomingTests: 'Tests', 
    upcomingDesc: 'Upcoming tests', 
    recentActivity: 'Activity', 
    recentDesc: 'Recent actions', 
    lastLesson: 'Last', 
    continueCourse: 'Continue', 
    lessons: 'lessons',
    
    allCourses: 'All Courses', 
    searchCourse: 'Search course...', 
    progress: 'Progress', 
    buyCourse: 'Buy',

    myTests: 'My Tests', 
    available: 'Available', 
    completed: 'Completed', 
    locked: 'Locked', 
    startTest: 'Start', 
    retake: 'Retake', 
    question: 'question', 
    minute: 'Min', 
    attempt: 'Attempt', 
    bestScore: 'Best Score', 
    passScore: 'Pass Score', 
    congratulations: 'Congratulations!', 
    tryAgain: 'Try Again', 
    exit: 'Exit', 
    passed: 'You passed the test successfully!', 
    notPassed: 'Please try again.',
  },
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark')
  const [language, setLang] = useState<Language>('uz')

  useEffect(() => {
    const savedTheme = localStorage.getItem('academy_theme') as Theme
    const savedLang = localStorage.getItem('academy_lang') as Language
    if (savedTheme) setTheme(savedTheme)
    if (savedLang) setLang(savedLang)
  }, [])

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'light') {
      root.style.setProperty('--color-bg', '#f0f4f8')
      root.style.setProperty('--color-surface', '#ffffff')
      root.style.setProperty('--color-surface-2', '#e8edf3')
      root.style.setProperty('--color-border', 'rgba(0,0,0,0.1)')
      root.style.setProperty('--color-text', '#1a1a2e')
      root.style.setProperty('--color-text-muted', '#4b5563')
      root.style.setProperty('--color-hover', 'rgba(0,0,0,0.05)')
      root.classList.add('light')
      root.classList.remove('dark')
      document.body.style.background = '#f0f4f8'
      document.body.style.color = '#1a1a2e'
    } else {
      root.style.setProperty('--color-bg', '#0a0a0f')
      root.style.setProperty('--color-surface', '#111118')
      root.style.setProperty('--color-surface-2', '#1a1a2e')
      root.style.setProperty('--color-border', 'rgba(255,255,255,0.08)')
      root.style.setProperty('--color-text', '#e8e8f0')
      root.style.setProperty('--color-text-muted', '#6b7280')
      root.style.setProperty('--color-hover', 'rgba(255,255,255,0.05)')
      root.classList.add('dark')
      root.classList.remove('light')
      document.body.style.background = '#0a0a0f'
      document.body.style.color = '#e8e8f0'
    }
  }, [theme])

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    localStorage.setItem('academy_theme', next)
  }

  const setLanguage = (lang: Language) => {
    setLang(lang)
    localStorage.setItem('academy_lang', lang)
  }

  const t = (key: string): string => {
    return translations[language][key] ?? key
  }

  return (
    <ThemeContext.Provider value={{ theme, language, toggleTheme, setLanguage, t }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}