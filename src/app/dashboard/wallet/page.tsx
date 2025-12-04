"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Coins, History, TrendingUp } from "lucide-react"
import { motion } from "framer-motion"

export default function WalletPage() {
  const [balance] = useState(450)
  const [transactions] = useState([
    { id: 1, type: "earn", amount: 10, description: "Plastic Bottle", date: "2 hours ago", location: "Mall Road RVM" },
    { id: 2, type: "earn", amount: 15, description: "Aluminum Can", date: "1 day ago", location: "Park Street RVM" },
    { id: 3, type: "redeem", amount: -100, description: "Plant a Tree", date: "2 days ago", location: "Rewards" },
    { id: 4, type: "earn", amount: 10, description: "Plastic Bottle", date: "3 days ago", location: "Mall Road RVM" },
    { id: 5, type: "earn", amount: 20, description: "Glass Bottle", date: "4 days ago", location: "Central Park RVM" },
  ])

  const totalEarned = transactions.filter(t => t.type === "earn").reduce((sum, t) => sum + t.amount, 0)
  const totalRedeemed = Math.abs(transactions.filter(t => t.type === "redeem").reduce((sum, t) => sum + t.amount, 0))

  return (
    <div className="p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          Token Wallet 💰
        </h1>
        <p className="text-gray-600 mb-8">
          Manage your eco-rewards
        </p>

        {/* Balance Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-8"
        >
          <Card className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white overflow-hidden">
            <CardContent className="pt-6 pb-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-emerald-100 mb-2">Current Balance</p>
                  <p className="text-5xl font-bold">{balance}</p>
                  <p className="text-emerald-100 mt-1">REVENAC Tokens</p>
                </div>
                <Coins className="w-24 h-24 text-emerald-200 opacity-50" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Stats */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="bg-green-100 p-3 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Earned</p>
                  <p className="text-2xl font-bold text-gray-900">{totalEarned} tokens</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <Coins className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Redeemed</p>
                  <p className="text-2xl font-bold text-gray-900">{totalRedeemed} tokens</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Transactions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <History className="w-5 h-5" />
              Transaction History
            </CardTitle>
            <CardDescription>All your earning and redemption activities</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all">
              <TabsList className="mb-4">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="earned">Earned</TabsTrigger>
                <TabsTrigger value="redeemed">Redeemed</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-3">
                {transactions.map((tx) => (
                  <TransactionItem key={tx.id} transaction={tx} />
                ))}
              </TabsContent>

              <TabsContent value="earned" className="space-y-3">
                {transactions.filter(t => t.type === "earn").map((tx) => (
                  <TransactionItem key={tx.id} transaction={tx} />
                ))}
              </TabsContent>

              <TabsContent value="redeemed" className="space-y-3">
                {transactions.filter(t => t.type === "redeem").map((tx) => (
                  <TransactionItem key={tx.id} transaction={tx} />
                ))}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function TransactionItem({ transaction }: any) {
  const isEarn = transaction.type === "earn"

  return (
    <div className="flex items-center justify-between p-4 rounded-lg border hover:bg-gray-50 transition">
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
          isEarn ? "bg-green-100" : "bg-red-100"
        }`}>
          {isEarn ? "📥" : "📤"}
        </div>
        <div>
          <p className="font-semibold text-gray-900">{transaction.description}</p>
          <p className="text-sm text-gray-500">{transaction.location}</p>
          <p className="text-xs text-gray-400">{transaction.date}</p>
        </div>
      </div>
      <div className={`font-bold text-lg ${isEarn ? "text-green-600" : "text-red-600"}`}>
        {isEarn ? "+" : ""}{transaction.amount}
      </div>
    </div>
  )
}
