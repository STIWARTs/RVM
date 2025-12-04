# REVENAC Setup Instructions
# Run this script step-by-step in PowerShell

Write-Host "🌱 REVENAC - Smart Reverse Vending Machine Setup" -ForegroundColor Green
Write-Host "=================================================" -ForegroundColor Green
Write-Host ""

# Step 1: Check Node.js
Write-Host "Step 1: Checking Node.js installation..." -ForegroundColor Cyan
$nodeVersion = node --version 2>$null
if ($nodeVersion) {
    Write-Host "✅ Node.js version: $nodeVersion" -ForegroundColor Green
} else {
    Write-Host "❌ Node.js not found. Please install Node.js 18+ from https://nodejs.org" -ForegroundColor Red
    exit 1
}

# Step 2: Install dependencies
Write-Host ""
Write-Host "Step 2: Installing dependencies..." -ForegroundColor Cyan
Write-Host "This may take 2-3 minutes..." -ForegroundColor Yellow
npm install
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Dependencies installed successfully" -ForegroundColor Green
} else {
    Write-Host "❌ Failed to install dependencies" -ForegroundColor Red
    exit 1
}

# Step 3: Environment variables
Write-Host ""
Write-Host "Step 3: Setting up environment variables..." -ForegroundColor Cyan
if (Test-Path .env) {
    Write-Host "⚠️  .env file already exists" -ForegroundColor Yellow
    $overwrite = Read-Host "Do you want to recreate it? (y/n)"
    if ($overwrite -eq "y") {
        Remove-Item .env
        Copy-Item .env.example .env
        Write-Host "✅ .env file created from template" -ForegroundColor Green
    }
} else {
    Copy-Item .env.example .env
    Write-Host "✅ .env file created from template" -ForegroundColor Green
}

# Step 4: Configure database
Write-Host ""
Write-Host "Step 4: Database configuration" -ForegroundColor Cyan
Write-Host "Please update the .env file with your database credentials:" -ForegroundColor Yellow
Write-Host "  1. DATABASE_URL - Your PostgreSQL connection string" -ForegroundColor White
Write-Host "  2. NEXTAUTH_SECRET - Generate with: [Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Maximum 256 }))" -ForegroundColor White
Write-Host ""
$configured = Read-Host "Have you configured the .env file? (y/n)"
if ($configured -ne "y") {
    Write-Host "⚠️  Please configure .env before proceeding" -ForegroundColor Yellow
    Write-Host "Opening .env file..." -ForegroundColor Cyan
    notepad .env
    $ready = Read-Host "Ready to continue? (y/n)"
    if ($ready -ne "y") {
        Write-Host "Setup paused. Run this script again when ready." -ForegroundColor Yellow
        exit 0
    }
}

# Step 5: Database setup
Write-Host ""
Write-Host "Step 5: Setting up database..." -ForegroundColor Cyan
Write-Host "Pushing schema to database..." -ForegroundColor Yellow
npm run db:push
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Database schema created" -ForegroundColor Green
} else {
    Write-Host "❌ Failed to create database schema" -ForegroundColor Red
    Write-Host "Please check your DATABASE_URL in .env" -ForegroundColor Yellow
    exit 1
}

# Step 6: Seed database
Write-Host ""
Write-Host "Step 6: Seeding database with dummy data..." -ForegroundColor Cyan
npm run db:seed
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Database seeded successfully" -ForegroundColor Green
} else {
    Write-Host "⚠️  Failed to seed database (this is optional)" -ForegroundColor Yellow
}

# Step 7: Success!
Write-Host ""
Write-Host "=================================================" -ForegroundColor Green
Write-Host "🎉 Setup complete! Your REVENAC app is ready!" -ForegroundColor Green
Write-Host "=================================================" -ForegroundColor Green
Write-Host ""
Write-Host "To start the development server:" -ForegroundColor Cyan
Write-Host "  npm run dev" -ForegroundColor White
Write-Host ""
Write-Host "Then open: http://localhost:3000" -ForegroundColor Cyan
Write-Host ""
Write-Host "Test login credentials:" -ForegroundColor Yellow
Write-Host "  Email: arjun@example.com" -ForegroundColor White
Write-Host "  Password: password123" -ForegroundColor White
Write-Host ""
Write-Host "Useful commands:" -ForegroundColor Cyan
Write-Host "  npm run dev       - Start development server" -ForegroundColor White
Write-Host "  npm run build     - Build for production" -ForegroundColor White
Write-Host "  npm run db:studio - Open database admin panel" -ForegroundColor White
Write-Host ""
Write-Host "Documentation:" -ForegroundColor Cyan
Write-Host "  README.md         - Project overview" -ForegroundColor White
Write-Host "  QUICKSTART.md     - Quick start guide" -ForegroundColor White
Write-Host "  DEPLOYMENT.md     - Deployment instructions" -ForegroundColor White
Write-Host ""
Write-Host "Happy coding! 🌱" -ForegroundColor Green
