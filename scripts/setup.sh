#!/bin/bash

# BetGenie - Quick Setup Script
# This script automates the initial setup process

echo "🚀 BetGenie - Quick Setup Started"
echo "=================================="
echo ""

# Check Node.js
echo "✓ Checking Node.js..."
if ! command -v node &> /dev/null; then
    echo "❌ Node.js not found. Please install from https://nodejs.org/"
    exit 1
fi
echo "✓ Node.js $(node --version) found"

# Check npm
echo "✓ Checking npm..."
if ! command -v npm &> /dev/null; then
    echo "❌ npm not found"
    exit 1
fi
echo "✓ npm $(npm --version) found"

# Check PostgreSQL
echo "✓ Checking PostgreSQL..."
if ! command -v psql &> /dev/null; then
    echo "⚠️  PostgreSQL not found. Please install from https://www.postgresql.org/"
    echo "   Windows: https://www.postgresql.org/download/windows/"
    echo "   Mac: brew install postgresql"
    echo "   Linux: sudo apt-get install postgresql"
    exit 1
fi
echo "✓ PostgreSQL found"

# Install dependencies
echo ""
echo "📦 Installing dependencies..."
npm install

# Create .env.local if not exists
if [ ! -f .env.local ]; then
    echo ""
    echo "📝 Creating .env.local file..."
    cp .env.example .env.local
    echo "✓ .env.local created. Please update with your database credentials."
fi

# Generate Prisma Client
echo ""
echo "🔧 Generating Prisma Client..."
npx prisma generate

# Run migrations
echo ""
echo "🗄️  Setting up database..."
echo "Run the following commands in order:"
echo ""
echo "1. Create database and user (in PostgreSQL shell):"
echo "   psql -U postgres"
echo "   CREATE DATABASE betgenie_db;"
echo "   CREATE USER betgenie_user WITH PASSWORD 'SecurePassword123!';"
echo "   GRANT ALL PRIVILEGES ON DATABASE betgenie_db TO betgenie_user;"
echo "   \\q"
echo ""
echo "2. Then run database migrations:"
echo "   npm run db:push"
echo ""
echo "3. (Optional) Seed sample data:"
echo "   npm run db:seed"
echo ""
echo "4. Start the development server:"
echo "   npm run dev"
echo ""
echo "✅ Setup complete! Follow the commands above to finish configuration."
