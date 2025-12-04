"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Recycle, Coins, TrendingUp, Award, ArrowUpRight, Leaf, Zap, Droplets } from "lucide-react"
import { motion } from "framer-motion"
import { AnimatedCard } from "@/components/ui/animated-card"
import { AnimatedCounter } from "@/components/ui/animated-counter"

export default function DashboardPage() {
  const [stats, setStats] = useState({
    tokens: 0,
    totalBottles: 0,
    carbonSaved: 0,
    rank: 0,
  })

  useEffect(() => {
    // Fetch user stats - dummy data for now
    // Simulate loading
    setTimeout(() => {
      setStats({
        tokens: 450,
        totalBottles: 45,
        carbonSaved: 2.25,
        rank: 12,
      })
    }, 500)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  }

  return (
    <div className="p-4 md:p-8 space-y-8">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="max-w-7xl mx-auto"
      >
        <div className="flex justify-between items-center mb-8">
          <motion.h1
            variants={itemVariants}
            className="text-3xl md:text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent"
          >
            Dashboard Overview
          </motion.h1>
          <motion.div variants={itemVariants} className="text-sm text-gray-500 bg-white/50 px-4 py-2 rounded-full backdrop-blur-sm border border-white/20">
            Last updated: Just now
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <AnimatedCard delay={0.1} className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white border-none shadow-lg shadow-emerald-500/20">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                  <Coins className="w-6 h-6 text-white" />
                </div>
                <span className="text-xs font-medium bg-white/20 px-2 py-1 rounded text-white/90 flex items-center gap-1">
                  +12% <ArrowUpRight className="w-3 h-3" />
                </span>
              </div>
              <div className="space-y-1">
                <p className="text-emerald-100 text-sm font-medium">Total Tokens</p>
                <h3 className="text-3xl font-bold">
                  <AnimatedCounter value={stats.tokens} />
                </h3>
              </div>
            </div>
          </AnimatedCard>

          <AnimatedCard delay={0.2} className="bg-white border-emerald-100 shadow-sm hover:shadow-md hover:border-emerald-200">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Recycle className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-gray-500 text-sm font-medium">Bottles Recycled</p>
                <h3 className="text-3xl font-bold text-gray-900">
                  <AnimatedCounter value={stats.totalBottles} />
                </h3>
              </div>
            </div>
          </AnimatedCard>

          <AnimatedCard delay={0.3} className="bg-white border-emerald-100 shadow-sm hover:shadow-md hover:border-emerald-200">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-green-100 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-gray-500 text-sm font-medium">CO₂ Saved (kg)</p>
                <h3 className="text-3xl font-bold text-gray-900">
                  <AnimatedCounter value={stats.carbonSaved} />
                </h3>
              </div>
            </div>
          </AnimatedCard>

          <AnimatedCard delay={0.4} className="bg-gradient-to-br from-orange-400 to-pink-500 text-white border-none shadow-lg shadow-orange-500/20">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <span className="text-xs font-medium bg-white/20 px-2 py-1 rounded text-white/90">
                  Top 5%
                </span>
              </div>
              <div className="space-y-1">
                <p className="text-orange-100 text-sm font-medium">Global Rank</p>
                <h3 className="text-3xl font-bold">
                  #<AnimatedCounter value={stats.rank} />
                </h3>
              </div>
            </div>
          </AnimatedCard>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <AnimatedCard delay={0.5} className="glass border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Recycle className="w-5 h-5 text-emerald-600" />
                Recent Activity
              </CardTitle>
              <CardDescription>Your latest recycling transactions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <ActivityItem
                  title="Plastic Bottle"
                  tokens={10}
                  time="2 hours ago"
                  location="RVM Station - Mall Road"
                  icon={<Recycle className="w-4 h-4 text-blue-500" />}
                  bg="bg-blue-100"
                />
                <ActivityItem
                  title="Aluminum Can"
                  tokens={15}
                  time="1 day ago"
                  location="RVM Station - Park Street"
                  icon={<Recycle className="w-4 h-4 text-gray-500" />}
                  bg="bg-gray-100"
                />
                <ActivityItem
                  title="Plastic Bottle"
                  tokens={10}
                  time="2 days ago"
                  location="RVM Station - Mall Road"
                  icon={<Recycle className="w-4 h-4 text-blue-500" />}
                  bg="bg-blue-100"
                />
              </div>
            </CardContent>
          </AnimatedCard>

          <AnimatedCard delay={0.6} className="glass border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Leaf className="w-5 h-5 text-emerald-600" />
                Environmental Impact
              </CardTitle>
              <CardDescription>Your contribution to the planet</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <ImpactItem
                  icon={<Leaf className="w-5 h-5 text-green-600" />}
                  bg="bg-green-100"
                  title="Trees Saved"
                  value="0.5"
                  description="Equivalent trees protected"
                />
                <ImpactItem
                  icon={<Droplets className="w-5 h-5 text-blue-600" />}
                  bg="bg-blue-100"
                  title="Water Saved"
                  value="450L"
                  description="Liters of water conserved"
                />
                <ImpactItem
                  icon={<Zap className="w-5 h-5 text-yellow-600" />}
                  bg="bg-yellow-100"
                  title="Energy Saved"
                  value="1.2 kWh"
                  description="Energy conserved from recycling"
                />
              </div>
            </CardContent>
          </AnimatedCard>
        </div>
      </motion.div>
    </div>
  )
}

function ActivityItem({ title, tokens, time, location, icon, bg }: any) {
  return (
    <motion.div 
      whileHover={{ x: 5, backgroundColor: "rgba(255,255,255,0.5)" }}
      className="flex items-center justify-between p-3 rounded-xl transition-colors"
    >
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-lg ${bg}`}>
          {icon}
        </div>
        <div>
          <p className="font-medium text-gray-900">{title}</p>
          <p className="text-xs text-gray-500">{location}</p>
        </div>
      </div>
      <div className="text-right">
        <div className="text-emerald-600 font-bold">+{tokens}</div>
        <p className="text-xs text-gray-400">{time}</p>
      </div>
    </motion.div>
  )
}

function ImpactItem({ icon, title, value, description, bg }: any) {
  return (
    <motion.div 
      whileHover={{ scale: 1.02 }}
      className="flex items-center space-x-4 p-4 rounded-xl bg-white/40 border border-white/40 shadow-sm"
    >
      <div className={`p-3 rounded-full ${bg}`}>
        {icon}
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p className="text-xl font-bold text-gray-900">{value}</p>
        <p className="text-xs text-emerald-600">{description}</p>
      </div>
    </motion.div>
  )
}
