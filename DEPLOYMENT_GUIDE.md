# BetGenie - Deployment Guide

## 🚀 Deployment Options

Choose your preferred hosting platform:

---

## Option 1: Vercel (Recommended - Free)

### Why Vercel?
- ✅ Optimized for Next.js
- ✅ Automatic deployments from GitHub
- ✅ Free tier covers most use cases
- ✅ Built-in analytics & monitoring
- ✅ Auto-scaling

### Step 1: Push to GitHub

```bash
git add .
git commit -m "Prepare for deployment"
git push origin main
```

### Step 2: Deploy on Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Select your GitHub repository
4. Click "Import"
5. Add environment variables:
   - `DATABASE_URL` - PostgreSQL connection string
   - `NEXTAUTH_SECRET` - Your secret key
   - `NEXTAUTH_URL` - Your production URL

6. Click "Deploy"

### Step 3: Setup Database

**Option A: Use Vercel Postgres (Built-in)**
- Included with Vercel
- Click "Data" → "Create Database"
- Update `DATABASE_URL` with provided URL

**Option B: Use External Database**
- Get PostgreSQL URL from [Supabase](https://supabase.com), [Railway](https://railway.app), or [Render](https://render.com)
- Add to Vercel environment variables

### Step 4: Configure Domain

1. In Vercel dashboard → Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed

**Your site is now live! 🎉**

---

## Option 2: Railway (Free - Recommended)

### Why Railway?
- ✅ Free tier with credits ($5/month)
- ✅ Easy database integration
- ✅ GitHub integration
- ✅ Easy to scale

### Step 1: Create Railway Account

1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub
3. Create new project

### Step 2: Add Services

1. Click "New" → "Database" → "PostgreSQL"
2. Wait for database to start
3. Click "New" → "GitHub Repo"
4. Select your repository

### Step 3: Configure Environment

In Railway project settings:
1. Go to your app service
2. Add variables:
   ```
   DATABASE_URL = ${{Postgres.DATABASE_URL}}
   NODE_ENV = production
   NEXTAUTH_SECRET = your-secret-key
   NEXTAUTH_URL = https://your-domain.railway.app
   ```

3. Go to PostgreSQL service → Data
4. Run migrations:
   ```bash
   npx prisma migrate deploy
   ```

### Step 4: Deploy

1. Connect to GitHub
2. Railway auto-deploys on push
3. View logs in "Deployments" tab

**Live at:** `https://your-app.railway.app`

---

## Option 3: Render (Free)

### Step 1: Create Account

1. Go to [render.com](https://render.com)
2. Sign up with GitHub
3. Click "New Web Service"

### Step 2: Configure Service

1. Select your repository
2. Set runtime: "Node"
3. Build command: `npm run build`
4. Start command: `npm start`

### Step 3: Add Database

1. Click "New" → "PostgreSQL"
2. Create database
3. Copy connection string

### Step 4: Add Environment Variables

In Render dashboard:
```
DATABASE_URL = your-postgres-url
NEXTAUTH_SECRET = your-secret
NEXTAUTH_URL = https://your-app.onrender.com
NODE_ENV = production
```

### Step 5: Deploy

Click "Create Web Service"

**Live at:** `https://your-app.onrender.com`

---

## Option 4: AWS (Scalable)

### Step 1: Setup EC2 Instance

```bash
# Connect to your instance
ssh -i your-key.pem ec2-user@your-instance-ip

# Install Node.js
curl -fsSL https://rpm.nodesource.com/setup_18.x | sudo bash -
sudo yum install -y nodejs

# Install PM2 (process manager)
sudo npm install -g pm2
```

### Step 2: Deploy Application

```bash
# Clone repository
git clone https://github.com/Frank56377/Betgenie.git
cd Betgenie

# Install dependencies
npm install

# Build
npm run build

# Start with PM2
pm2 start npm --name "betgenie" -- start
pm2 save
pm2 startup
```

### Step 3: Setup Database

Use **AWS RDS** for PostgreSQL:
1. Create RDS PostgreSQL instance
2. Get connection string
3. Add to environment variables

### Step 4: Setup NGINX Reverse Proxy

```bash
sudo yum install -y nginx

# Edit /etc/nginx/nginx.conf
sudo nano /etc/nginx/nginx.conf
```

Add:
```nginx
upstream betgenie {
    server localhost:3000;
}

server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://betgenie;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### Step 5: SSL Certificate (Let's Encrypt)

```bash
sudo yum install -y certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

---

## Environment Variables for Production

Create in your hosting platform:

```env
# Database
DATABASE_URL="postgresql://user:password@host:5432/betgenie_db"

# Authentication
NEXTAUTH_SECRET="generate-with-openssl-rand-base64-32"
NEXTAUTH_URL="https://your-domain.com"

# Application
NODE_ENV="production"
NEXT_PUBLIC_API_URL="https://your-domain.com/api"

# Email (Optional)
RESEND_API_KEY="your-resend-key"
EMAIL_FROM="noreply@your-domain.com"

# Stripe (Optional)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_live_..."
STRIPE_SECRET_KEY="sk_live_..."

# Football API (Optional)
FOOTBALL_API_KEY="your-api-key"
```

---

## Production Checklist

- [ ] Set `NODE_ENV=production`
- [ ] Use strong `NEXTAUTH_SECRET` (openssl rand -base64 32)
- [ ] Database backed up and secured
- [ ] SSL certificate installed
- [ ] Domain configured
- [ ] Email service setup (Resend/Mailgun)
- [ ] Error monitoring (Sentry)
- [ ] Performance monitoring
- [ ] Database URL uses connection pooling
- [ ] Secrets not in code/repo

---

## Performance Optimization

### Enable Caching

```bash
# Add to .env.production
NEXT_PUBLIC_REVALIDATE=60
```

### Database Connection Pooling

Add to PostgreSQL connection URL:
```
?schema=public&connection_limit=5
```

### CDN Configuration

Use Vercel's built-in CDN or:
- Cloudflare (free)
- AWS CloudFront
- Bunny CDN

---

## Monitoring & Logging

### Setup Error Tracking

1. Go to [sentry.io](https://sentry.io)
2. Create project for Next.js
3. Add Sentry SDK:
   ```bash
   npm install @sentry/nextjs
   ```

4. Initialize in `next.config.js`

### View Logs

**Vercel:** Deployments → Runtime Logs
**Railway:** Deployments → Logs
**Render:** Logs tab

---

## Domain Setup

### Point Domain to Hosting

**For Vercel/Railway/Render:**
1. Get nameservers or CNAME from platform
2. Update domain registrar DNS settings
3. Wait 24 hours for propagation

**Check DNS:**
```bash
nslookup your-domain.com
dig your-domain.com
```

---

## Continuous Deployment

### GitHub Actions (Automatic)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Deploy to Vercel
        run: |
          npm install -g vercel
          vercel --prod --token ${{ secrets.VERCEL_TOKEN }}
```

---

## Troubleshooting Deployment

### Build Fails

```bash
# Check build logs
npm run build

# Verify environment variables
echo $DATABASE_URL
```

### Database Connection Error

```bash
# Test connection
psql $DATABASE_URL -c "SELECT 1"

# Check URL format
postgresql://user:password@host:port/database
```

### Application Crashes

```bash
# View logs
pm2 logs betgenie

# Restart
pm2 restart betgenie
```

### Out of Memory

Increase Node.js memory:
```bash
NODE_OPTIONS="--max_old_space_size=2048" npm start
```

---

## Rollback Procedure

### Vercel
1. Deployments → Select previous version
2. Click "Redeploy"

### Railway/Render
1. Deployments → Select previous
2. Click "Redeploy"

### GitHub
```bash
git revert HEAD
git push origin main
```

---

## Cost Estimates

| Platform | Free Tier | Paid Tier |
|----------|-----------|-----------|
| **Vercel** | ✅ Good for starting | $20/month+ |
| **Railway** | ✅ $5 credits/month | $5+/month |
| **Render** | ⚠️ Limited | $7+/month |
| **AWS** | ⚠️ Limited free | Varies |

---

## Next Steps

1. **Choose platform** (recommend Vercel or Railway)
2. **Setup database** (PostgreSQL)
3. **Configure environment** variables
4. **Deploy** code
5. **Test** all features
6. **Setup monitoring** (Sentry)
7. **Configure domain** (optional)
8. **Setup CI/CD** (GitHub Actions)

---

**Your BetGenie is now production-ready! 🚀**
