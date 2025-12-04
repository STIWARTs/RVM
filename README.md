# 🌱 REVENAC - Smart Reverse Vending Machine Platform

**Turn Waste Into Rewards** | Built for SIH 2025

REVENAC is a comprehensive web-based platform that integrates with IoT Reverse Vending Machines (RVMs) to incentivize recycling through a token-based reward system. Users deposit recyclable items, earn tokens, and redeem them for real-world rewards while contributing to environmental sustainability.

![REVENAC Banner](https://img.shields.io/badge/Status-Production%20Ready-success?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-15.0-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=for-the-badge&logo=tailwind-css)

---

## ✨ Features

### 🔐 User Authentication
- Email + Password authentication
- Google OAuth integration (optional)
- Secure session management with NextAuth.js

### 📱 QR Code Scanning
- Built-in camera scanner for mobile devices
- Manual code entry fallback option
- Real-time token crediting

### 💰 Token Wallet System
- Track token balance and transaction history
- Earn tokens for each recycled item
- Transaction categorization (earned/redeemed)

### 🏆 Leaderboard
- City-wise and global rankings
- User profiles with avatars
- Gamified eco-warrior badges

### 🎁 Reward Redemption
- Diverse reward catalog (vouchers, coupons, merchandise)
- Real-time stock tracking
- Instant redemption processing

### 👤 User Profile
- Environmental impact statistics
- Total bottles recycled
- Carbon footprint reduction metrics
- Profile customization

### 📊 Admin Dashboard
- User management
- Reward inventory control
- RVM machine logs and analytics
- Real-time statistics

### 📱 Progressive Web App (PWA)
- Mobile-first responsive design
- Offline capability
- Install to home screen

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 15 (React 19)
- **Language**: TypeScript
- **Styling**: TailwindCSS + Custom eco-themed gradients
- **UI Components**: ShadCN UI (Radix UI primitives)
- **Animations**: Framer Motion
- **QR Scanner**: @yudiel/react-qr-scanner

### Backend
- **API**: Next.js API Routes
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: NextAuth.js v5

### Deployment
- **Platform**: Vercel
- **Database Hosting**: Supabase / Neon.tech

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- PostgreSQL database (local or cloud)
- npm or yarn package manager

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/yourusername/revenac.git
cd revenac
```

### 2️⃣ Install Dependencies
```bash
npm install
```

### 3️⃣ Configure Environment Variables
Create a `.env` file in the root directory:
```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/revenac?schema=public"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here-generate-with-openssl-rand-base64-32"

# Google OAuth (Optional)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

### 4️⃣ Setup Database
```bash
# Generate Prisma Client
npx prisma generate

# Run migrations
npx prisma db push

# (Optional) Seed database with dummy data
npx prisma db seed
```

### 5️⃣ Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Project Structure

```
revenac/
├── prisma/
│   └── schema.prisma          # Database schema
├── public/
│   └── manifest.json          # PWA manifest
├── src/
│   ├── app/
│   │   ├── api/               # API routes
│   │   │   ├── auth/          # Authentication endpoints
│   │   │   ├── qr/            # QR code operations
│   │   │   ├── rewards/       # Rewards catalog
│   │   │   └── leaderboard/   # User rankings
│   │   ├── dashboard/         # Protected dashboard pages
│   │   │   ├── scan/          # QR scanner
│   │   │   ├── wallet/        # Token wallet
│   │   │   ├── leaderboard/   # Rankings
│   │   │   ├── rewards/       # Rewards marketplace
│   │   │   └── profile/       # User profile
│   │   ├── login/             # Login page
│   │   ├── register/          # Registration page
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Landing page
│   ├── components/
│   │   └── ui/                # Reusable UI components
│   ├── lib/
│   │   ├── prisma.ts          # Prisma client
│   │   ├── auth.ts            # Auth configuration
│   │   └── utils.ts           # Utility functions
│   └── types/
│       └── next-auth.d.ts     # Type declarations
├── .env.example               # Environment template
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

---

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### QR Operations
- `POST /api/qr/generate` - Generate QR code (IoT device)
- `POST /api/qr/scan` - Scan and validate QR code

### Data Retrieval
- `GET /api/leaderboard` - Fetch user rankings
- `GET /api/rewards` - List available rewards
- `GET /api/user/[id]` - Get user profile

---

## 🎨 Design System

### Color Palette
- **Primary**: Emerald (#10b981)
- **Secondary**: Teal (#14b8a6)
- **Accent**: Cyan (#06b6d4)
- **Background**: Gradient eco-themed patterns

### Typography
- **Font Family**: Inter (Google Fonts)
- **Headings**: Bold, large scale
- **Body**: Regular, readable scale

---

## 🔄 Data Flow (IoT Integration)

### Current Implementation (Dummy Data)
```
User → Scan QR → API validates → Tokens credited
```

### Future Implementation (IoT Integration)
```
User deposits item → RVM generates QR → 
User scans QR → API validates → IoT confirms → 
Tokens credited → Environmental impact calculated
```

**Note**: Replace dummy QR generation with actual IoT device integration when hardware is ready.

---

## 🧪 Testing

```bash
# Run type checking
npm run type-check

# Run linting
npm run lint

# Build for production
npm run build
```

---

## 📈 Future Enhancements

- [ ] AI-based waste classification (image upload)
- [ ] Real-time IoT device integration
- [ ] Push notifications for rewards
- [ ] Social sharing features
- [ ] Multi-language support
- [ ] Blockchain-based token verification
- [ ] Carbon credit marketplace

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License. See `LICENSE` file for details.

---

## 🙏 Acknowledgments

- **SIH 2025** for the opportunity
- **Next.js Team** for the amazing framework
- **Vercel** for deployment platform
- **Open Source Community** for libraries and tools

---

## 📧 Contact

**Project Maintainer**: Your Name  
**Email**: your.email@example.com  
**GitHub**: [@yourusername](https://github.com/yourusername)

---

## 🌟 Show Your Support

If you find this project helpful, please give it a ⭐ on GitHub!

---

**Built with 💚 for a sustainable future**
