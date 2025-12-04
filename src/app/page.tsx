"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Recycle, QrCode, Trophy, Gift, Leaf, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import { AnimatedCard } from "@/components/ui/animated-card"
import { AnimatedCounter } from "@/components/ui/animated-counter"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 leaf-pattern overflow-hidden">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2"
          >
            <div className="bg-gradient-primary p-2 rounded-lg">
              <Recycle className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              REVENAC
            </span>
          </motion.div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/login" className="text-gray-600 hover:text-emerald-600 transition font-medium">
              Login
            </Link>
            <Link href="/register">
              <Button className="bg-gradient-primary hover:opacity-90 transition-opacity shadow-lg shadow-emerald-500/30">
                Get Started
              </Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 md:py-32 text-center relative">
        {/* Floating Elements */}
        <motion.div 
          animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 left-10 md:left-40 opacity-20 pointer-events-none"
        >
          <Leaf className="w-24 h-24 text-emerald-500" />
        </motion.div>
        <motion.div 
          animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-20 right-10 md:right-40 opacity-20 pointer-events-none"
        >
          <Recycle className="w-32 h-32 text-teal-500" />
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-emerald-100 text-emerald-700 text-sm font-semibold mb-4 border border-emerald-200">
              🌱 The Future of Recycling
            </span>
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent leading-tight pb-2">
              Turn Waste Into <br/> Real Rewards
            </h1>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto"
          >
            Recycle smarter with REVENAC. Deposit bottles, earn tokens, and make a real impact on the environment while getting paid.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link href="/register">
              <Button size="lg" className="bg-gradient-primary hover:opacity-90 text-lg px-8 py-6 rounded-full shadow-xl shadow-emerald-500/30 transition-all hover:scale-105">
                Start Recycling <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/login">
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 rounded-full border-emerald-600 text-emerald-600 hover:bg-emerald-50 transition-all hover:scale-105">
                Sign In
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
          <p className="text-gray-600 text-lg">Simple steps to start earning rewards</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <AnimatedCard delay={0.1} className="h-full">
            <div className="p-6 flex flex-col items-center text-center h-full">
              <div className="w-16 h-16 rounded-2xl bg-emerald-100 flex items-center justify-center mb-6 text-emerald-600">
                <QrCode className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">1. Scan QR Code</h3>
              <p className="text-gray-600">Deposit recyclables and scan the unique QR code generated by the RVM machine.</p>
            </div>
          </AnimatedCard>
          
          <AnimatedCard delay={0.2} className="h-full">
            <div className="p-6 flex flex-col items-center text-center h-full">
              <div className="w-16 h-16 rounded-2xl bg-teal-100 flex items-center justify-center mb-6 text-teal-600">
                <Leaf className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">2. Earn Tokens</h3>
              <p className="text-gray-600">Receive digital tokens instantly in your wallet for every item you recycle.</p>
            </div>
          </AnimatedCard>
          
          <AnimatedCard delay={0.3} className="h-full">
            <div className="p-6 flex flex-col items-center text-center h-full">
              <div className="w-16 h-16 rounded-2xl bg-cyan-100 flex items-center justify-center mb-6 text-cyan-600">
                <Trophy className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">3. Compete</h3>
              <p className="text-gray-600">Climb the city leaderboard and earn badges for your environmental impact.</p>
            </div>
          </AnimatedCard>
          
          <AnimatedCard delay={0.4} className="h-full">
            <div className="p-6 flex flex-col items-center text-center h-full">
              <div className="w-16 h-16 rounded-2xl bg-purple-100 flex items-center justify-center mb-6 text-purple-600">
                <Gift className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">4. Redeem</h3>
              <p className="text-gray-600">Exchange your hard-earned tokens for vouchers, coupons, and cash rewards.</p>
            </div>
          </AnimatedCard>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="container mx-auto px-4 py-20">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-gradient-primary rounded-3xl p-12 text-white shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern opacity-10"></div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 relative z-10">
            Our Environmental Impact
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 text-center relative z-10">
            <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20">
              <div className="text-4xl md:text-5xl font-bold mb-2 flex justify-center items-center">
                <AnimatedCounter value={1000000} />+
              </div>
              <div className="text-emerald-100 font-medium">Bottles Recycled</div>
            </div>
            
            <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20">
              <div className="text-4xl md:text-5xl font-bold mb-2 flex justify-center items-center">
                <AnimatedCounter value={50000} />+
              </div>
              <div className="text-emerald-100 font-medium">Active Users</div>
            </div>
            
            <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20">
              <div className="text-4xl md:text-5xl font-bold mb-2 flex justify-center items-center">
                <AnimatedCounter value={250000} />kg
              </div>
              <div className="text-emerald-100 font-medium">CO₂ Saved</div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 border-t border-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <div className="bg-emerald-600 p-1.5 rounded">
                <Recycle className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold">REVENAC</span>
            </div>
            <div className="flex gap-8 text-gray-400">
              <Link href="#" className="hover:text-emerald-400 transition">Privacy</Link>
              <Link href="#" className="hover:text-emerald-400 transition">Terms</Link>
              <Link href="#" className="hover:text-emerald-400 transition">Contact</Link>
            </div>
          </div>
          <div className="text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} REVENAC. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
