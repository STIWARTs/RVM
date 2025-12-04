# 📜 NPM Scripts Reference

Quick reference for all available npm commands in REVENAC

---

## 🚀 Development Scripts

### `npm run dev`
Start the Next.js development server with hot reload.
```powershell
npm run dev
```
- Runs on: http://localhost:3000
- Hot reload enabled
- TypeScript type checking
- Console shows errors and warnings

---

## 🏗️ Build Scripts

### `npm run build`
Create an optimized production build.
```powershell
npm run build
```
- Compiles TypeScript
- Optimizes bundles
- Generates static pages
- Creates `.next` folder
- **Run before deployment**

### `npm run start`
Start the production server (requires build first).
```powershell
npm run build
npm run start
```
- Runs production build
- No hot reload
- Optimized performance
- Use for testing production build locally

---

## 🔍 Code Quality

### `npm run lint`
Check code for potential errors and style issues.
```powershell
npm run lint
```
- Runs ESLint
- Checks TypeScript files
- Shows warnings and errors
- **Run before committing code**

---

## 🗄️ Database Scripts

### `npm run db:push`
Push Prisma schema to database without migrations.
```powershell
npm run db:push
```
- Syncs schema with database
- Creates/updates tables
- **Use for development**
- ⚠️ Can cause data loss

### `npm run db:seed`
Populate database with dummy data.
```powershell
npm run db:seed
```
- Creates 6 demo users
- Creates 8 sample rewards
- Creates 20 transactions
- **Use after fresh database setup**

### `npm run db:studio`
Open Prisma Studio (visual database editor).
```powershell
npm run db:studio
```
- Opens at: http://localhost:5555
- Visual interface for data
- CRUD operations
- Browse relationships
- **Great for debugging**

---

## 🔧 Utility Scripts

### `npm run postinstall`
Automatically runs after `npm install`.
```powershell
# Runs automatically, but you can run manually:
npm run postinstall
```
- Generates Prisma Client
- Sets up types
- **Usually don't need to run manually**

---

## 📦 Installation

### `npm install`
Install all project dependencies.
```powershell
npm install
```
- Reads package.json
- Downloads all dependencies
- Creates node_modules folder
- Runs postinstall script
- **Run this first!**

### `npm install <package>`
Add a new package to the project.
```powershell
npm install package-name
```
- Adds to package.json
- Updates package-lock.json

### `npm install <package> --save-dev`
Add a development dependency.
```powershell
npm install package-name --save-dev
```
- Adds to devDependencies

---

## 🧪 Custom Scripts (Not in package.json yet)

### Type Checking
```powershell
npx tsc --noEmit
```
- Check TypeScript errors
- No output files
- **Good for CI/CD**

### Prisma Migrate
```powershell
npx prisma migrate dev --name migration-name
```
- Create migration files
- **Use for production**
- Better than db:push

### Prisma Studio
```powershell
npx prisma studio
```
- Same as `npm run db:studio`

### Format Code
```powershell
npx prettier --write .
```
- Format all files
- **Add to package.json if needed**

### Clear Next.js Cache
```powershell
Remove-Item -Recurse -Force .next
npm run dev
```
- Deletes .next folder
- Fresh build on next run
- **Use if weird errors occur**

---

## 🎯 Common Workflows

### First Time Setup
```powershell
# 1. Install dependencies
npm install

# 2. Setup database
npm run db:push

# 3. Add dummy data
npm run db:seed

# 4. Start dev server
npm run dev
```

### Daily Development
```powershell
# Start development
npm run dev

# View/edit database
npm run db:studio
```

### Before Committing
```powershell
# Check for errors
npm run lint

# Build to verify
npm run build
```

### Deploy Preparation
```powershell
# 1. Lint code
npm run lint

# 2. Build project
npm run build

# 3. Test production build
npm run start

# 4. Push to GitHub
git add .
git commit -m "Ready for deployment"
git push
```

### Reset Database
```powershell
# 1. Reset schema (⚠️ deletes data)
npx prisma migrate reset

# 2. Push schema again
npm run db:push

# 3. Re-seed data
npm run db:seed
```

---

## 🔄 Update Dependencies

### Check for Updates
```powershell
npm outdated
```

### Update All Packages
```powershell
npm update
```

### Update Specific Package
```powershell
npm install package-name@latest
```

### Update Next.js
```powershell
npm install next@latest react@latest react-dom@latest
```

---

## 🐛 Troubleshooting Scripts

### Fix npm Issues
```powershell
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json
npm install
```

### Fix Prisma Issues
```powershell
# Regenerate Prisma Client
npx prisma generate

# Check database connection
npx prisma db pull
```

### Fix Build Issues
```powershell
# Clear Next.js cache
Remove-Item -Recurse -Force .next

# Clear build artifacts
Remove-Item -Recurse -Force .next
Remove-Item -Recurse -Force out

# Fresh build
npm run build
```

---

## 📊 Useful Prisma Commands

### View Schema
```powershell
code prisma/schema.prisma
```

### Generate Client
```powershell
npx prisma generate
```

### Create Migration
```powershell
npx prisma migrate dev --name your-migration-name
```

### Deploy Migrations (Production)
```powershell
npx prisma migrate deploy
```

### Reset Database
```powershell
npx prisma migrate reset
```

### Pull Schema from Database
```powershell
npx prisma db pull
```

### Validate Schema
```powershell
npx prisma validate
```

---

## 🎨 Custom Scripts You Can Add

Add these to `package.json` under `"scripts"` if needed:

### Type Check
```json
"type-check": "tsc --noEmit"
```

### Format
```json
"format": "prettier --write ."
```

### Test
```json
"test": "jest",
"test:watch": "jest --watch"
```

### E2E Test
```json
"test:e2e": "playwright test"
```

### Clean
```json
"clean": "Remove-Item -Recurse -Force .next node_modules"
```

---

## 🚀 Production Scripts

### Build and Start
```powershell
npm run build && npm run start
```

### Deploy to Vercel
```powershell
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Production deployment
vercel --prod
```

---

## 💡 Pro Tips

1. **Use `db:studio` frequently** to visualize data changes
2. **Run `lint` before committing** to catch errors early
3. **Build locally** before deploying to catch issues
4. **Use `db:seed`** to quickly reset to demo state
5. **Keep dependencies updated** with `npm outdated`

---

## 📖 Quick Reference

| Command | Purpose | When to Use |
|---------|---------|-------------|
| `npm install` | Install deps | First time, after pulling |
| `npm run dev` | Dev server | Development |
| `npm run build` | Production build | Before deploy |
| `npm run lint` | Check code | Before commit |
| `npm run db:push` | Update schema | Schema changes |
| `npm run db:seed` | Add dummy data | Fresh database |
| `npm run db:studio` | Database GUI | View/edit data |

---

**Keep this file handy for quick reference! 📌**
