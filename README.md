# EduAdmin — Online Academy Platform

Markazlashgan ta'lim boshqaruv tizimi (Frontend Only)

## 🚀 Ishga tushirish

```bash
npm install
npm run dev
```

Brauzerda oching: http://localhost:3000

## 🔐 Demo hisoblar

| Rol | Email | Parol |
|-----|-------|-------|
| Admin | admin@academy.uz | admin123 |
| Student | student@academy.uz | student123 |

## 📁 Sahifalar

### Admin Panel
- `/admin` — Dashboard (statistika, grafiklar)
- `/admin/users` — Foydalanuvchilar boshqaruvi
- `/admin/courses` — Kurslar boshqaruvi
- `/admin/payments` — To'lovlar monitoring
- `/admin/tests` — Test boshqaruvi
- `/admin/analytics` — Analitika va hisobotlar
- `/admin/settings` — Tizim sozlamalari

### Student Panel
- `/student/dashboard` — Student dashboard
- `/student/courses` — Kurslar ro'yxati
- `/student/tests` — Test topshirish

## 🛠 Texnologiyalar

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Recharts** (grafiklar)
- **Lucide React** (ikonalar)

## 📦 Papka strukturasi

```
online-academy/
├── app/
│   ├── admin/          # Admin sahifalari
│   ├── student/        # Student sahifalari
│   ├── auth/           # Login/Register
│   └── globals.css
├── components/
│   ├── layout/         # Sidebar, Header, DashboardLayout
│   └── ui/             # StatCard, Badge, Table, Modal va boshqalar
└── lib/
    ├── auth.tsx         # Auth context (localStorage)
    └── data.ts          # Mock ma'lumotlar
```

## 💡 Eslatma

Bu faqat frontend qismi. Backend ulash uchun:
1. `/lib/auth.tsx` faylida `login` funksiyasini API ga ulang
2. `/lib/data.ts` dagi mock ma'lumotlarni real API bilan almashtiring
