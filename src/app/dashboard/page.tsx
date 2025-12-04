"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Recycle, Coins, TrendingUp, Award } from "lucide-react"
import { motion } from "framer-motion"

export default function DashboardPage() {
  const [stats, setStats] = useState({
    tokens: 0,
    totalBottles: 0,
    carbonSaved: 0,
    rank: 0,
  })

  useEffect(() => {
    // Fetch user stats - dummy data for now
    setStats({
      tokens: 450,
      totalBottles: 45,
      carbonSaved: 2.25,
      rank: 12,
    })
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
    <div className="p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.h1
            variants={itemVariants}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-8"
          >
            Welcome Back! 🌱
          </motion.h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <motion.div variants={itemVariants}>
              <StatsCard
                title="Total Tokens"
                value={stats.tokens}
                icon={<Coins className="w-8 h-8 text-emerald-600" />}
                gradient="from-emerald-500 to-teal-500"
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <StatsCard
                title="Bottles Recycled"
                value={stats.totalBottles}
                icon={<Recycle className="w-8 h-8 text-blue-600" />}
                gradient="from-blue-500 to-cyan-500"
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <StatsCard
                title="CO₂ Saved (kg)"
                value={stats.carbonSaved.toFixed(2)}
                icon={<TrendingUp className="w-8 h-8 text-green-600" />}
                gradient="from-green-500 to-emerald-500"
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <StatsCard
                title="Your Rank"
                value={`#${stats.rank}`}
                icon={<Award className="w-8 h-8 text-yellow-600" />}
                gradient="from-yellow-500 to-orange-500"
              />
            </motion.div>
          </div>

          <motion.div variants={itemVariants} className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your latest recycling transactions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <ActivityItem
                    title="Plastic Bottle"
                    tokens={10}
                    time="2 hours ago"
                    location="RVM Station - Mall Road"
                  />
                  <ActivityItem
                    title="Aluminum Can"
                    tokens={15}
                    time="1 day ago"
                    location="RVM Station - Park Street"
                  />
                  <ActivityItem
                    title="Plastic Bottle"
                    tokens={10}
                    time="2 days ago"
                    location="RVM Station - Mall Road"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Environmental Impact</CardTitle>
                <CardDescription>Your contribution to the planet</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <ImpactItem
                    icon="🌳"
                    title="Trees Saved"
                    value="0.5"
                    description="Equivalent trees protected"
                  />
                  <ImpactItem
                    icon="💧"
                    title="Water Saved"
                    value="450L"
                    description="Liters of water conserved"
                  />
                  <ImpactItem
                    icon="⚡"
                    title="Energy Saved"
                    value="1.2 kWh"
                    description="Energy conserved from recycling"
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

function StatsCard({ title, value, icon, gradient }: any) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600 mb-1">{title}</p>
            <p className="text-3xl font-bold text-gray-900">{value}</p>
          </div>
          <div className={`bg-gradient-to-br ${gradient} p-3 rounded-lg`}>
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function ActivityItem({ title, tokens, time, location }: any) {
  return (
    <div className="flex items-center justify-between py-2 border-b last:border-0">
      <div>
        <p className="font-medium text-gray-900">{title}</p>
        <p className="text-sm text-gray-500">{location}</p>
        <p className="text-xs text-gray-400">{time}</p>
      </div>
      <div className="text-emerald-600 font-semibold">+{tokens} tokens</div>
    </div>
  )
}

function ImpactItem({ icon, title, value, description }: any) {
  return (
    <div className="flex items-start space-x-3 py-2 border-b last:border-0">
      <div className="text-2xl">{icon}</div>
      <div className="flex-1">
        <p className="font-medium text-gray-900">{title}</p>
        <p className="text-2xl font-bold text-emerald-600">{value}</p>
        <p className="text-xs text-gray-500">{description}</p>
      </div>
    </div>
  )
}
