# BetGenie - AI-Powered Bet Prediction Platform

**Rub the Lamp. Win the Odds.**

A modern, premium betting prediction platform built with Next.js, TypeScript, Tailwind CSS, and PostgreSQL. Featuring AI-powered predictions, smart accumulators, community insights, and real-time bet tracking.

## 🎯 Project Overview

BetGenie is designed to provide Nigerian and global bettors with:
- ✨ Daily free AI tips with confidence scores
- 🎲 Smart accumulator builder with odds calculator
- 📊 Real-time match insights (form, H2H, injuries)
- 👥 Community leaderboards and social features
- 💰 Personalized VIP tier with elite predictions
- 📈 Portfolio tracking and analytics

## 🛠 Tech Stack

- **Frontend:** Next.js 14, React 18, TypeScript, Tailwind CSS
- **Backend:** Next.js API Routes
- **Database:** PostgreSQL with Prisma ORM
- **Authentication:** NextAuth.js
- **State Management:** Zustand
- **Charts:** Chart.js & React-ChartJS-2
- **Forms:** React Hook Form + Zod validation
- **UI Icons:** Lucide React

## 📦 Project Structure

```
betgenie/
├── src/
│   ├── app/                    # Next.js app directory
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Homepage
│   │   ├── auth/               # Auth pages (login, signup)
│   │   ├── dashboard/          # User dashboard
│   │   ├── predictions/        # Predictions detail
│   │   ├── accumulators/       # Accumulator builder
│   │   ├── community/          # Community features
│   │   ├── api/                # API routes
│   │   └── admin/              # Admin panel
│   ├── components/
│   │   ├── ui/                 # Reusable UI components
│   │   ├── sections/           # Homepage sections
│   │   └── dashboard/          # Dashboard components
│   ├── lib/
│   │   ├── auth.ts             # Authentication utilities
│   │   ├── db.ts               # Database client
│   │   └── utils.ts            # Helper functions
│   ├── hooks/                  # Custom React hooks
│   ├── types/                  # TypeScript type definitions
│   ├── styles/                 # Global styles
│   └── utils/                  # Utility functions
├── prisma/
│   ├── schema.prisma           # Database schema
│   └── seed.ts                 # Seed data
├── public/                     # Static assets
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.js
└── README.md
```

## 🎨 Design System

### Color Palette

- **Primary Navy:** `#0A1428` - Main background
- **Royal Blue:** `#0066FF` - Primary accents
- **Cyan:** `#00D4FF` - Glow effects
- **Gold:** `#FFD700` - Magical elements, wins
- **White:** `#FFFFFF` - Text on dark backgrounds

### Typography

- **Font:** Inter (400, 500, 600, 700 weights)
- **Headings:** Bold, modern sans-serif
- **Body:** Clean, readable at all sizes

### Animations

- `pulse-glow` - Subtle pulsing glow
- `drift` - Gentle floating motion
- `shimmer` - Loading shimmer effect

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- PostgreSQL 14+
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Frank56377/Betgenie.git
   cd Betgenie
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup environment variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your database URL and secrets
   ```

4. **Setup database**
   ```bash
   npm run db:push
   npm run db:seed
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📚 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:migrate` - Create database migration
- `npm run db:push` - Push schema changes to database
- `npm run db:seed` - Seed database with demo data
- `npm run type-check` - Run TypeScript type checking

## 🗄️ Database Schema

### Core Models

- **User** - User accounts with subscription tiers (FREE, PREMIUM, ELITE)
- **Team** - Football teams across leagues (EPL, NPFL, La Liga, etc.)
- **Match** - Individual matches with live data
- **Prediction** - AI tips with confidence scores and odds
- **Accumulator** - Multi-bet combinations
- **BetSlip** - User's placed bets for tracking
- **Community** - Comments, articles, leaderboards
- **Notifications** - Real-time user alerts

## 🔐 Authentication

Implemented with NextAuth.js supporting:
- Email/password signup & login
- JWT tokens
- Session management
- Role-based access (USER, ADMIN, MODERATOR)

## 📡 API Endpoints (to be built)

```
POST   /api/auth/signup
POST   /api/auth/login
GET    /api/predictions
GET    /api/predictions/:id
POST   /api/accumulators
GET    /api/matches
GET    /api/leaderboard
POST   /api/bets
GET    /api/user/profile
```

## 🎯 Roadmap

- [ ] Homepage with all sections
- [ ] Authentication system (signup/login)
- [ ] User dashboard
- [ ] AI predictions integration
- [ ] Accumulator builder
- [ ] Bet tracking system
- [ ] Community features
- [ ] Admin panel
- [ ] Mobile app (React Native)
- [ ] Notifications system
- [ ] Odds comparison with Nigerian bookies

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see LICENSE file for details.

## 📞 Support

For support, email support@betgenie.com or open an issue on GitHub.

## ⚠️ Responsible Gambling

BetGenie promotes responsible gambling. Please gamble within your means and seek help if you develop a gambling problem.

---

**Built with ❤️ by the BetGenie team**
