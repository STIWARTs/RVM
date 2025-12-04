# Installation & Deployment Guide

## 📋 Prerequisites

- Node.js 18 or higher
- PostgreSQL database (local or cloud)
- npm or yarn
- Git

---

## 🛠️ Local Development Setup

### Step 1: Clone & Install

```bash
# Clone the repository
git clone https://github.com/yourusername/revenac.git
cd revenac

# Install dependencies
npm install
```

### Step 2: Database Setup

#### Option A: Local PostgreSQL

1. Install PostgreSQL on your machine
2. Create a new database:
```sql
CREATE DATABASE revenac;
```

3. Update `.env` file:
```env
DATABASE_URL="postgresql://postgres:yourpassword@localhost:5432/revenac?schema=public"
```

#### Option B: Cloud Database (Recommended)

**Using Supabase:**
1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Copy the database connection string from Settings > Database
4. Update `.env`:
```env
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres"
```

**Using Neon.tech:**
1. Go to [neon.tech](https://neon.tech)
2. Create a new project
3. Copy the connection string
4. Update `.env`

### Step 3: Environment Variables

Create `.env` file in the root directory:

```env
# Database
DATABASE_URL="your-postgres-connection-string"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="generate-with-command-below"

# Google OAuth (Optional)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

Generate `NEXTAUTH_SECRET`:
```bash
# On Linux/Mac
openssl rand -base64 32

# On Windows (PowerShell)
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Maximum 256 }))
```

### Step 4: Initialize Database

```bash
# Push schema to database
npm run db:push

# Seed with dummy data
npm run db:seed
```

### Step 5: Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

**Test credentials:**
- Email: `arjun@example.com`
- Password: `password123`

---

## 🚀 Deployment (Vercel)

### Step 1: Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/revenac.git
git push -u origin main
```

### Step 2: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Configure project:
   - Framework Preset: **Next.js**
   - Root Directory: `./`
   - Build Command: `npm run build`
   - Output Directory: `.next`

5. Add Environment Variables:
   - `DATABASE_URL` - Your production database URL
   - `NEXTAUTH_URL` - Your production URL (e.g., `https://revenac.vercel.app`)
   - `NEXTAUTH_SECRET` - Same as local or generate new one
   - `GOOGLE_CLIENT_ID` - (Optional)
   - `GOOGLE_CLIENT_SECRET` - (Optional)

6. Click **Deploy**

### Step 3: Setup Production Database

**Using Supabase (Recommended):**
1. Create a new Supabase project for production
2. Copy the connection string
3. Add it to Vercel environment variables
4. Redeploy

**Run migrations on production:**
```bash
# Install Vercel CLI
npm i -g vercel

# Run commands in production
vercel env pull .env.production
npx prisma db push --accept-data-loss
```

---

## 🔐 Google OAuth Setup (Optional)

### Step 1: Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project
3. Navigate to **APIs & Services > Credentials**
4. Click **Create Credentials > OAuth Client ID**
5. Application type: **Web application**
6. Authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google` (local)
   - `https://your-domain.vercel.app/api/auth/callback/google` (production)

### Step 2: Add Credentials

Copy **Client ID** and **Client Secret** to `.env`:
```env
GOOGLE_CLIENT_ID="your-client-id"
GOOGLE_CLIENT_SECRET="your-client-secret"
```

---

## 📱 PWA Installation

The app is configured as a Progressive Web App. Users can:

1. **On Mobile:**
   - Open the app in Chrome/Safari
   - Tap "Add to Home Screen"

2. **On Desktop:**
   - Open the app in Chrome
   - Click the install icon in the address bar

**Note:** Add custom icons:
- Place `icon-192x192.png` and `icon-512x512.png` in `/public`

---

## 🧪 Testing

```bash
# Type checking
npm run type-check

# Linting
npm run lint

# Build test
npm run build

# Database admin panel
npm run db:studio
```

---

## 🔧 Troubleshooting

### Database Connection Issues

```bash
# Test connection
npx prisma db pull

# Reset database (⚠️ deletes all data)
npx prisma migrate reset
```

### Build Errors

```bash
# Clear Next.js cache
rm -rf .next
npm run build
```

### Environment Variables Not Loading

```bash
# Restart dev server
# Ctrl+C then npm run dev
```

---

## 📊 Database Management

```bash
# Open Prisma Studio (visual database editor)
npm run db:studio

# Generate Prisma Client
npx prisma generate

# Create migration
npx prisma migrate dev --name migration-name

# Apply migrations to production
npx prisma migrate deploy
```

---

## 🔄 Updating Dependencies

```bash
# Check for updates
npm outdated

# Update all packages
npm update

# Update specific package
npm install package-name@latest
```

---

## 📈 Performance Optimization

1. **Image Optimization:**
   - Add images to `/public/images`
   - Use Next.js `<Image>` component

2. **Database Optimization:**
   - Add indexes to frequently queried fields
   - Use Prisma's `select` to fetch only needed fields

3. **Caching:**
   - Configure Next.js caching in `next.config.js`
   - Use Redis for session storage (optional)

---

## 🆘 Support

If you encounter issues:

1. Check the [troubleshooting section](#-troubleshooting)
2. Review error logs in browser console
3. Check Vercel deployment logs
4. Contact: your.email@example.com

---

## 🎯 Next Steps

After deployment:
- [ ] Add custom domain
- [ ] Set up analytics (Google Analytics/Vercel Analytics)
- [ ] Configure email notifications
- [ ] Integrate real IoT devices
- [ ] Set up monitoring (Sentry)
- [ ] Add backup strategy

---

**Deployed successfully? Share your REVENAC link! 🎉**
