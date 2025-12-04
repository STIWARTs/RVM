# 🚀 Quick Start Guide - REVENAC

This guide will help you get REVENAC up and running in under 10 minutes!

---

## ⚡ Fast Track Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Setup Database

**Quick Option: Use Supabase (Free)**

1. Go to https://supabase.com and sign up
2. Create a new project (select region closest to you)
3. Go to Project Settings > Database
4. Copy the "Connection string" under "Connection string" tab
5. Make sure to replace `[YOUR-PASSWORD]` with your actual password

### 3. Configure Environment

Create `.env` file:

```env
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-ID].supabase.co:5432/postgres"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="run-this-command-in-terminal-to-generate"
```

**Generate NEXTAUTH_SECRET:**

```powershell
# Run in PowerShell
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Maximum 256 }))
```

Copy the output and paste it in `.env`

### 4. Initialize Database

```bash
# Push schema to database
npm run db:push

# Add dummy data (users, rewards, transactions)
npm run db:seed
```

### 5. Run the App

```bash
npm run dev
```

Open http://localhost:3000

---

## 🎮 Test the App

### Login Credentials

**User Account:**
- Email: `arjun@example.com`
- Password: `password123`

**Admin Account:**
- Email: `admin@revenac.com`
- Password: `password123`

### Features to Test

1. **Login** - Use credentials above
2. **Dashboard** - View stats and recent activity
3. **Scan QR** - Use manual entry tab, enter: `QR-TEST-12345`
4. **Leaderboard** - See rankings (Arjun should be #1)
5. **Rewards** - Try redeeming rewards (Arjun has 850 tokens)
6. **Wallet** - View transaction history
7. **Profile** - Edit profile information

---

## 📱 Mobile Testing

### Test as PWA (Progressive Web App)

1. Open http://localhost:3000 in Chrome on your phone
2. In Chrome menu, tap "Add to Home Screen"
3. App installs as a native-like app!

### QR Scanner Testing

1. Go to Scan page
2. Grant camera permission
3. Generate a QR code online with text: `QR-TEST-67890`
4. Scan the QR code with your camera

---

## 🐛 Common Issues & Fixes

### Issue: "Cannot connect to database"

**Fix:**
```bash
# Check if DATABASE_URL is correct in .env
# Test connection:
npx prisma db pull
```

### Issue: "Module not found" errors

**Fix:**
```bash
# Delete node_modules and reinstall
Remove-Item -Recurse -Force node_modules
npm install
```

### Issue: "Prisma Client not generated"

**Fix:**
```bash
npx prisma generate
```

### Issue: Port 3000 already in use

**Fix:**
```bash
# Run on different port
$env:PORT=3001; npm run dev
```

---

## 🎨 Customization

### Change Theme Colors

Edit `tailwind.config.ts`:

```typescript
colors: {
  emerald: { /* your custom green shades */ },
}
```

### Add New Rewards

1. Open http://localhost:5555 (Prisma Studio)
```bash
npm run db:studio
```

2. Click on "Reward" model
3. Click "Add record"
4. Fill in the details and save

### Modify Token Values

Edit `/src/app/api/qr/scan/route.ts`:

```typescript
tokensEarned: 10, // Change to desired value
carbonSaved: 0.05, // Change environmental impact
```

---

## 📊 Database Management

### View/Edit Data Visually

```bash
npm run db:studio
```

Opens at http://localhost:5555

### Reset Database (⚠️ Deletes all data)

```bash
npx prisma migrate reset
npm run db:seed
```

### Backup Database

```bash
# Export data
npx prisma db pull

# Or use pg_dump for PostgreSQL
pg_dump your_database > backup.sql
```

---

## 🚀 Deploy to Production

### Option 1: Vercel (Recommended - Free)

1. Push code to GitHub
2. Go to https://vercel.com
3. Import your repository
4. Add environment variables (same as .env)
5. Deploy!

**Detailed guide:** See `DEPLOYMENT.md`

### Option 2: Other Platforms

- **Netlify:** Similar to Vercel
- **Railway:** Great for full-stack apps
- **Render:** Good free tier

---

## 📚 Project Structure

```
revenac/
├── src/
│   ├── app/                 # Pages & API routes
│   │   ├── api/            # Backend endpoints
│   │   ├── dashboard/      # Protected pages
│   │   ├── login/          # Auth pages
│   │   └── page.tsx        # Landing page
│   ├── components/         # Reusable components
│   ├── lib/                # Utilities & config
│   └── types/              # TypeScript types
├── prisma/
│   ├── schema.prisma       # Database schema
│   └── seed.ts            # Dummy data
├── public/                 # Static files
└── .env                    # Environment variables
```

---

## 🔗 Useful Commands

```bash
# Development
npm run dev              # Start dev server
npm run build           # Build for production
npm run start           # Start production server

# Database
npm run db:push         # Update database schema
npm run db:seed         # Add dummy data
npm run db:studio       # Visual database editor

# Code Quality
npm run lint            # Check code quality
npm run type-check      # Check TypeScript
```

---

## 🎯 Next Steps

After getting the app running:

- [ ] Customize branding and colors
- [ ] Add more rewards to the marketplace
- [ ] Test QR scanner with real QR codes
- [ ] Configure Google OAuth (optional)
- [ ] Deploy to Vercel
- [ ] Add custom domain
- [ ] Integrate with IoT devices (when hardware is ready)

---

## 🆘 Need Help?

1. **Check error in browser console** (F12)
2. **Read error messages carefully**
3. **Search the error on Google/StackOverflow**
4. **Check the FAQ section** in README.md

---

## 💡 Pro Tips

- Keep `.env` file secret (never commit to Git)
- Use Prisma Studio to visualize data
- Test on mobile device for best experience
- Enable dark mode in browser for eco-theme
- Check Vercel deployment logs for production issues

---

**Happy Coding! 🌱 Let's make recycling fun!**
