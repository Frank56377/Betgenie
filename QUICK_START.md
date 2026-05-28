# BetGenie - Quick Start Commands

## 📋 Prerequisites Checklist

```bash
# Check Node.js (must be v18+)
node --version

# Check npm
npm --version

# Check Git
git --version

# Check PostgreSQL (if installed locally)
psql --version
```

---

## 🚀 Fast Start (5 Minutes)

### 1️⃣ Clone & Install

```bash
git clone https://github.com/Frank56377/Betgenie.git
cd Betgenie
npm install
```

### 2️⃣ Setup PostgreSQL Database

**Windows (Command Prompt):**
```cmd
psql -U postgres
CREATE DATABASE betgenie_db;
CREATE USER betgenie_user WITH PASSWORD 'SecurePassword123!';
GRANT ALL PRIVILEGES ON DATABASE betgenie_db TO betgenie_user;
\q
```

**Mac (Terminal):**
```bash
brew install postgresql
brew services start postgresql
psql -U postgres
# (same SQL commands as above)
```

**Linux (Terminal):**
```bash
sudo apt-get update
sudo apt-get install postgresql postgresql-contrib
sudo systemctl start postgresql
sudo -u postgres psql
# (same SQL commands as above)
```

### 3️⃣ Configure Environment

```bash
# Create .env.local
cp .env.example .env.local

# Edit .env.local and update:
# DATABASE_URL="postgresql://betgenie_user:SecurePassword123!@localhost:5432/betgenie_db"
# NEXTAUTH_SECRET="your-secret-key"
```

### 4️⃣ Setup Database Schema

```bash
npx prisma migrate dev --name init
```

### 5️⃣ Start Application

```bash
npm run dev
```

Visit: **http://localhost:3000**

---

## 🔑 Key Commands

```bash
# Development
npm run dev              # Start dev server

# Database
npm run db:push         # Apply schema to database
npm run db:studio       # View database GUI at localhost:5555
npm run db:migrate      # Create new migration
npm run db:reset        # Reset database (⚠️ deletes all data)
npm run db:seed         # Add sample data

# Building
npm run build           # Build for production
npm start               # Start production server

# Prisma
npx prisma generate    # Generate Prisma Client
npx prisma format      # Format schema file
npx prisma validate    # Validate schema
```

---

## 📊 Database Setup Detailed

### Option 1: Local PostgreSQL (Recommended)

**Windows:**
1. Download from [postgresql.org](https://www.postgresql.org/download/windows/)
2. Install with default settings
3. Remember the password you set
4. Run commands above

**Mac (Homebrew):**
```bash
brew install postgresql@15
brew services start postgresql@15
brew services stop postgresql@15  # to stop
```

**Linux (Ubuntu):**
```bash
sudo apt-get install postgresql postgresql-contrib
sudo systemctl start postgresql
sudo systemctl enable postgresql  # auto-start on boot
```

### Option 2: Cloud PostgreSQL (Alternative)

**Free tier options:**
- [Supabase](https://supabase.com) - Free tier with 500MB
- [Railway](https://railway.app) - Free credits
- [Render](https://render.com) - Free PostgreSQL
- [Elephant SQL](https://www.elephantsql.com) - Free tier

**Steps:**
1. Sign up for free account
2. Create PostgreSQL database
3. Copy connection string
4. Paste in `.env.local` as `DATABASE_URL`
5. Run `npx prisma migrate deploy`

---

## 🔐 Authentication Setup

### NextAuth Configuration

Already included! Just need:

1. `.env.local` with `NEXTAUTH_SECRET`
2. Generate secret:
   ```bash
   openssl rand -base64 32
   ```
   or
   ```bash
   npx auth-secret
   ```

### Test Authentication

1. Go to http://localhost:3000/auth/signup
2. Create account:
   - Email: `test@betgenie.com`
   - Password: `Test123!`
   - Name: `Test User`
3. Go to http://localhost:3000/auth/login
4. Login with same credentials
5. You should see dashboard at http://localhost:3000/dashboard

---

## 🧪 Testing APIs with cURL

### Create User Account

```bash
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@betgenie.com",
    "password": "Test123!"
  }'
```

### Login

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@betgenie.com",
    "password": "Test123!"
  }'
```

### Get Predictions

```bash
curl http://localhost:3000/api/predictions
```

### Create Prediction

```bash
curl -X POST http://localhost:3000/api/predictions \
  -H "Content-Type: application/json" \
  -d '{
    "league": "EPL",
    "teams": "Man City vs Arsenal",
    "prediction": "Over 2.5 Goals",
    "confidence": 85,
    "odds": 1.95
  }'
```

---

## 🐛 Troubleshooting

### PostgreSQL Connection Failed

```bash
# Check PostgreSQL status
# Windows: Services > PostgreSQL
# Mac: brew services list
# Linux: sudo systemctl status postgresql

# Check connection
psql -U betgenie_user -d betgenie_db -h localhost

# If port 5432 is in use
# Change DATABASE_URL to port 5433:
# postgresql://user:pass@localhost:5433/betgenie_db
```

### Module Not Found

```bash
rm -rf node_modules
npm install
npx prisma generate
npm run dev
```

### Port 3000 Already in Use

```bash
npm run dev -- -p 3001
# or kill process using port 3000
```

### Cannot Find Database

```bash
# Verify database exists
psql -U betgenie_user -d betgenie_db

# If not, create it
psql -U postgres
CREATE DATABASE betgenie_db;
GRANT ALL PRIVILEGES ON DATABASE betgenie_db TO betgenie_user;
```

### Prisma Migration Issues

```bash
# Reset and recreate
npx prisma migrate reset --force

# Or check migration status
npx prisma migrate status

# Deploy existing migrations
npx prisma migrate deploy
```

---

## 📂 Project Structure

```
Betgenie/
├── src/
│   ├── app/
│   │   ├── api/               # API routes
│   │   ├── auth/              # Auth pages (login, signup)
│   │   ├── dashboard/         # User dashboard
│   │   ├── admin/             # Admin panel
│   │   └── page.tsx           # Homepage
│   ├── components/
│   │   ├── ui/                # UI components
│   │   └── sections/          # Page sections
│   └── lib/
│       ├── prisma.ts          # Database client
│       └── auth.ts            # NextAuth config
├── prisma/
│   ├── schema.prisma          # Database schema
│   └── seed.ts                # Sample data
├── .env.example               # Environment template
├── SETUP_GUIDE.md             # Detailed setup guide
└── package.json               # Dependencies
```

---

## 📱 Page URLs

| Page | URL |
|------|-----|
| Homepage | http://localhost:3000 |
| Sign Up | http://localhost:3000/auth/signup |
| Login | http://localhost:3000/auth/login |
| Forgot Password | http://localhost:3000/auth/forgot-password |
| Dashboard | http://localhost:3000/dashboard |
| Profile | http://localhost:3000/dashboard/profile |
| My Predictions | http://localhost:3000/dashboard/my-predictions |
| My Bets | http://localhost:3000/dashboard/my-bets |
| Admin Dashboard | http://localhost:3000/admin |
| Admin Users | http://localhost:3000/admin/users |

---

## 🚀 Next Steps

1. **Test locally** - Create accounts, make predictions
2. **Customize branding** - Update colors, logos
3. **Add real data** - Integrate football API
4. **Setup payments** - Add Stripe for subscriptions
5. **Deploy online** - Use Vercel, Railway, or AWS

---

## 💬 Need Help?

- Check `SETUP_GUIDE.md` for detailed instructions
- Review API route files in `src/app/api/`
- Check database schema in `prisma/schema.prisma`
- View environment variables in `.env.example`

---

**Happy Building! 🎉**
