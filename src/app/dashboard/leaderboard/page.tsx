"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Trophy, Medal, Award } from "lucide-react"
import { motion } from "framer-motion"

export default function LeaderboardPage() {
  const [users, setUsers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchLeaderboard()
  }, [])

  const fetchLeaderboard = async () => {
    try {
      const res = await fetch("/api/leaderboard")
      const data = await res.json()
      setUsers(data)
    } catch (error) {
      console.error("Failed to fetch leaderboard:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          Leaderboard 🏆
        </h1>
        <p className="text-gray-600 mb-8">
          Top eco-warriors making a difference
        </p>

        {/* Top 3 Podium */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          {users.slice(0, 3).map((user, index) => (
            <motion.div
              key={user.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <PodiumCard user={user} rank={index + 1} />
            </motion.div>
          ))}
        </div>

        {/* Rest of leaderboard */}
        <Card>
          <CardHeader>
            <CardTitle>All Rankings</CardTitle>
            <CardDescription>Complete list of all participants</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {users.slice(3).map((user, index) => (
                <LeaderboardRow key={user.id} user={user} rank={index + 4} />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function PodiumCard({ user, rank }: any) {
  const colors: any = {
    1: "from-yellow-400 to-yellow-600",
    2: "from-gray-300 to-gray-500",
    3: "from-orange-400 to-orange-600",
  }

  const icons: any = {
    1: <Trophy className="w-12 h-12 text-yellow-600" />,
    2: <Medal className="w-10 h-10 text-gray-600" />,
    3: <Award className="w-10 h-10 text-orange-600" />,
  }

  return (
    <Card className={`overflow-hidden ${rank === 1 ? "md:scale-110 z-10" : ""}`}>
      <div className={`h-2 bg-gradient-to-r ${colors[rank]}`} />
      <CardContent className="pt-6 text-center">
        <div className="flex justify-center mb-3">{icons[rank]}</div>
        <Avatar className="w-20 h-20 mx-auto mb-3">
          <AvatarImage src={user.image} />
          <AvatarFallback className="text-2xl bg-emerald-100 text-emerald-700">
            {user.name?.charAt(0) || "U"}
          </AvatarFallback>
        </Avatar>
        <h3 className="font-bold text-lg mb-1">{user.name || "Anonymous"}</h3>
        <p className="text-sm text-gray-500 mb-3">{user.city || "Unknown City"}</p>
        <div className="bg-emerald-50 rounded-lg p-3">
          <p className="text-3xl font-bold text-emerald-600">{user.tokens}</p>
          <p className="text-xs text-gray-600">Tokens</p>
        </div>
        <div className="mt-3 text-xs text-gray-500">
          {user.totalBottles} bottles recycled
        </div>
      </CardContent>
    </Card>
  )
}

function LeaderboardRow({ user, rank }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 transition"
    >
      <div className="flex items-center gap-4">
        <div className="w-8 text-center font-bold text-gray-600">#{rank}</div>
        <Avatar>
          <AvatarImage src={user.image} />
          <AvatarFallback className="bg-emerald-100 text-emerald-700">
            {user.name?.charAt(0) || "U"}
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="font-semibold text-gray-900">{user.name || "Anonymous"}</p>
          <p className="text-sm text-gray-500">{user.city || "Unknown City"}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="font-bold text-emerald-600">{user.tokens} tokens</p>
        <p className="text-xs text-gray-500">{user.totalBottles} bottles</p>
      </div>
    </motion.div>
  )
}
