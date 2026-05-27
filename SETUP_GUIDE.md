# BetGenie - Complete Local Setup & Testing Guide

## Prerequisites

Before starting, ensure you have these installed on your system:

- **Node.js** (v18.17 or higher) - [Download](https://nodejs.org/)
- **npm** or **yarn** (comes with Node.js)
- **Git** - [Download](https://git-scm.com/)
- **PostgreSQL** (v14 or higher) - [Download](https://www.postgresql.org/download/)
- **VS Code** (recommended) - [Download](https://code.visualstudio.com/)

### Verify Installation

```bash
node --version    # Should be v18+
npm --version     # Should be 8+
git --version     # Should be installed
```

---

## Part 1: Clone & Setup Project

### Step 1: Clone Repository

```bash
# Clone the repository
git clone https://github.com/Frank56377/Betgenie.git

# Navigate into project
cd Betgenie

# Open in VS Code (optional)
code .
```

### Step 2: Install Dependencies

```bash
npm install
# or
yarn install
```

This will install:
- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Prisma ORM
- And all dependencies

**Installation time:** ~5-10 minutes (first time)

---

## Part 2: Database Setup (PostgreSQL)

### Step 1: Install PostgreSQL

#### **Windows:**
1. Download from [postgresql.org](https://www.postgresql.org/download/windows/)
2. Run installer, follow prompts
3. Set password (remember this!)
4. Port: 5432 (default)
5. Click "Finish"

#### **Mac (using Homebrew):**
```bash
brew install postgresql@15
brew services start postgresql@15
```

#### **Linux (Ubuntu/Debian):**
```bash
sudo apt-get update
sudo apt-get install postgresql postgresql-contrib
sudo systemctl start postgresql
```

### Step 2: Create Database & User

```bash
# Connect to PostgreSQL (Windows/Mac/Linux)
psql -U postgres

# Enter your password when prompted
```

Inside PostgreSQL shell:

```sql
-- Create database
CREATE DATABASE betgenie_db;

-- Create user
CREATE USER betgenie_user WITH PASSWORD 'SecurePassword123!';

-- Grant privileges
ALTER ROLE betgenie_user WITH CREATEDB;
GRANT ALL PRIVILEGES ON DATABASE betgenie_db TO betgenie_user;

-- Exit
\q
```

### Step 3: Verify Connection

```bash
# Test connection
psql -U betgenie_user -d betgenie_db -h localhost

# If successful, you'll see:
# betgenie_db=>

# Exit
\q
```

---

## Part 3: Environment Configuration

### Step 1: Create `.env.local` file

In your project root, create a file named `.env.local`:

```bash
# Windows (PowerShell)
New-Item -Path ".env.local" -ItemType File

# Mac/Linux
touch .env.local
```

### Step 2: Add Environment Variables

Open `.env.local` and add:

```env
# Database Connection
DATABASE_URL="postgresql://betgenie_user:SecurePassword123!@localhost:5432/betgenie_db"

# NextAuth Configuration
NEXTAUTH_SECRET="your-super-secret-key-change-this-12345"
NEXTAUTH_URL="http://localhost:3000"

# API Configuration
NEXT_PUBLIC_API_URL="http://localhost:3000/api"

# Email Service (Optional - for later)
# EMAIL_FROM="noreply@betgenie.com"
# RESEND_API_KEY="your-resend-key-here"
```

### Step 3: Generate NEXTAUTH_SECRET

```bash
# Generate a secure secret
openssl rand -base64 32

# Copy the output and paste in .env.local
# Or use this command to auto-generate:
npx auth-secret
```

---

## Part 4: Database Schema Setup

### Step 1: Run Prisma Migrations

```bash
# Create initial database tables
npx prisma migrate dev --name init

# You'll be prompted:
# ✔ What is the name of your migration? › init
# ✔ Generated Prisma Client and created migration folder(s)
```

### Step 2: View Database (Optional)

```bash
# Open Prisma Studio to visualize database
npx prisma studio

# Opens at http://localhost:5555
# You can view and manage data here
```

### Step 3: Seed Sample Data (Optional)

Create `prisma/seed.ts`:

```typescript
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Create sample user
  const user = await prisma.user.create({
    data: {
      email: "test@betgenie.com",
      name: "Test User",
      password: await bcrypt.hash("Test123!", 10),
      subscriptionTier: "PREMIUM",
    },
  });

  console.log("✅ Sample user created:", user.email);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
```

Run seed:
```bash
npx prisma db seed
```

---

## Part 5: Authentication Setup

### Step 1: Install NextAuth.js

```bash
npm install next-auth@beta bcryptjs
npm install --save-dev @types/bcryptjs
```

### Step 2: Create Auth Configuration

Create `src/lib/auth.ts`:

```typescript
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "./prisma";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials");
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) {
          throw new Error("No user found");
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password || ""
        );

        if (!isPasswordValid) {
          throw new Error("Invalid password");
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
};
```

### Step 3: Create NextAuth API Route

Create `src/app/api/auth/[...nextauth]/route.ts`:

```typescript
import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
```

### Step 4: Update Login API

Update `src/app/api/auth/login/route.ts`:

```typescript
import { NextRequest, NextResponse } from "next/server";
import { signIn } from "next-auth/react";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required" },
        { status: 400 }
      );
    }

    // In production, use NextAuth directly
    // For now, return success response
    return NextResponse.json(
      { message: "Login successful", user: { email } },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Login failed" },
      { status: 500 }
    );
  }
}
```

### Step 5: Update Signup API

Update `src/app/api/auth/signup/route.ts`:

```typescript
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
  try {
    const { name, email, password } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "Name, email, and password are required" },
        { status: 400 }
      );
    }

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        subscriptionTier: "FREE",
      },
    });

    return NextResponse.json(
      { message: "Account created successfully", user: { email: user.email, name: user.name } },
      { status: 201 }
    );
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { message: "Signup failed" },
      { status: 500 }
    );
  }
}
```

---

## Part 6: Running the Application

### Step 1: Start Development Server

```bash
npm run dev
```

You should see:
```
> next dev
  ▲ Next.js 14.0.0
  - Local:        http://localhost:3000
  - Environments: .env.local

✓ Ready in 2.5s
```

### Step 2: Access the Application

Open your browser and visit:

- **Homepage:** http://localhost:3000
- **Login:** http://localhost:3000/auth/login
- **Signup:** http://localhost:3000/auth/signup
- **Dashboard:** http://localhost:3000/dashboard (after login)
- **Admin:** http://localhost:3000/admin

### Step 3: Test Account Creation

1. Go to **Sign Up** (http://localhost:3000/auth/signup)
2. Fill in:
   - Name: `John Doe`
   - Email: `john@betgenie.com`
   - Password: `Test123!`
3. Click "Create Account"
4. You should be redirected to login

### Step 4: Test Login

1. Go to **Login** (http://localhost:3000/auth/login)
2. Enter:
   - Email: `john@betgenie.com`
   - Password: `Test123!`
3. Click "Sign In"
4. You should see the dashboard

---

## Part 7: Database Management

### View Data with Prisma Studio

```bash
npx prisma studio
```

This opens at `http://localhost:5555` where you can:
- View all users
- Create test data
- Edit/delete records
- Test queries

### Common Database Commands

```bash
# View schema
npx prisma format

# Reset database (WARNING: deletes all data)
npx prisma migrate reset

# Create new migration
npx prisma migrate dev --name add_new_field

# Check migrations
npx prisma migrate status

# View database URL
echo $DATABASE_URL
```

---

## Part 8: Troubleshooting

### Issue: Cannot connect to PostgreSQL

**Solution:**
```bash
# Check if PostgreSQL is running
# Windows:
Get-Service postgresql-x64-*

# Mac:
brew services list

# Linux:
sudo systemctl status postgresql

# Start if not running:
# Windows: services.msc > PostgreSQL > Start
# Mac: brew services start postgresql@15
# Linux: sudo systemctl start postgresql
```

### Issue: Port 5432 already in use

**Solution:**
```bash
# Change DATABASE_URL to different port:
DATABASE_URL="postgresql://user:password@localhost:5433/betgenie_db"
```

### Issue: Prisma Client not generated

**Solution:**
```bash
npm install @prisma/client
npx prisma generate
```

### Issue: Module not found errors

**Solution:**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Issue: Port 3000 already in use

**Solution:**
```bash
# Use different port
npm run dev -- -p 3001
# Or kill process using port 3000
```

---

## Part 9: Testing the APIs

### Using cURL or Postman

#### Sign Up

```bash
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Doe",
    "email": "jane@betgenie.com",
    "password": "Test123!"
  }'
```

#### Login

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "jane@betgenie.com",
    "password": "Test123!"
  }'
```

#### Get Predictions

```bash
curl http://localhost:3000/api/predictions
```

#### Create Prediction

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

## Part 10: Monitoring & Debugging

### Enable Debug Mode

Add to `.env.local`:
```env
DEBUG=*
```

### Check Server Logs

The console will show:
```
GET /api/predictions 200 45ms
POST /api/auth/login 401 32ms
```

### Debug Database

```typescript
// In any API route
import { prisma } from "@/lib/prisma";

// Enable query logging
const result = await prisma.$queryRaw`SELECT * FROM users`;
console.log("Users:", result);
```

---

## Part 11: Production Build

### Build for Production

```bash
npm run build
```

### Test Production Build

```bash
npm run start
```

Visit http://localhost:3000 (production mode)

---

## Summary Checklist

- [ ] Node.js & npm installed
- [ ] PostgreSQL installed & running
- [ ] Database & user created
- [ ] `.env.local` configured
- [ ] Dependencies installed (`npm install`)
- [ ] Database migrations run (`npx prisma migrate dev --name init`)
- [ ] Dev server started (`npm run dev`)
- [ ] Homepage loads at http://localhost:3000
- [ ] Can create account at http://localhost:3000/auth/signup
- [ ] Can login at http://localhost:3000/auth/login
- [ ] Dashboard visible after login
- [ ] Admin panel at http://localhost:3000/admin

---

## Next Steps

1. **Test all features locally** - Create bets, predictions, etc.
2. **Integrate payment system** - Add Stripe for Premium subscriptions
3. **Setup email service** - Use Resend or Mailgun
4. **Add real match data** - Integrate football API
5. **Deploy to production** - Use Vercel, AWS, or Railway

**Happy testing! 🚀**
