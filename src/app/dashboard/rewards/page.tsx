"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Gift, Coins, ShoppingBag } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { motion } from "framer-motion"
import Image from "next/image"

export default function RewardsPage() {
  const { toast } = useToast()
  const [rewards, setRewards] = useState<any[]>([])
  const [userTokens] = useState(450) // Replace with actual user data

  useEffect(() => {
    fetchRewards()
  }, [])

  const fetchRewards = async () => {
    try {
      const res = await fetch("/api/rewards")
      const data = await res.json()
      setRewards(data)
    } catch (error) {
      console.error("Failed to fetch rewards:", error)
    }
  }

  const handleRedeem = async (reward: any) => {
    if (userTokens < reward.tokenCost) {
      toast({
        title: "Insufficient Tokens",
        description: `You need ${reward.tokenCost - userTokens} more tokens to redeem this reward.`,
        variant: "destructive",
      })
      return
    }

    // TODO: Implement redemption API
    toast({
      title: "Reward Redeemed! 🎉",
      description: `You've successfully redeemed ${reward.title}`,
    })
  }

  return (
    <div className="p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Rewards Marketplace
            </h1>
            <p className="text-gray-600">
              Redeem your tokens for amazing rewards
            </p>
          </div>
          <div className="bg-emerald-100 px-6 py-3 rounded-lg">
            <div className="flex items-center gap-2">
              <Coins className="w-5 h-5 text-emerald-600" />
              <div>
                <p className="text-sm text-gray-600">Your Balance</p>
                <p className="text-2xl font-bold text-emerald-600">{userTokens}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              id: 1,
              title: "₹100 Amazon Voucher",
              description: "Shop anything on Amazon",
              tokenCost: 500,
              category: "VOUCHER",
              image: "🎁",
              stock: 50,
            },
            {
              id: 2,
              title: "₹50 Food Coupon",
              description: "Zomato/Swiggy voucher",
              tokenCost: 250,
              category: "COUPON",
              image: "🍕",
              stock: 100,
            },
            {
              id: 3,
              title: "20% Off Shopping",
              description: "Discount on partner stores",
              tokenCost: 150,
              category: "DISCOUNT",
              image: "🛍️",
              stock: 200,
            },
            {
              id: 4,
              title: "Plant a Tree",
              description: "Donate to environmental causes",
              tokenCost: 100,
              category: "DONATION",
              image: "🌳",
              stock: 1000,
            },
            {
              id: 5,
              title: "Eco Tote Bag",
              description: "Branded reusable bag",
              tokenCost: 300,
              category: "MERCHANDISE",
              image: "👜",
              stock: 75,
            },
            {
              id: 6,
              title: "₹200 Movie Ticket",
              description: "BookMyShow voucher",
              tokenCost: 600,
              category: "VOUCHER",
              image: "🎬",
              stock: 30,
            },
          ].map((reward, index) => (
            <motion.div
              key={reward.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <RewardCard
                reward={reward}
                canAfford={userTokens >= reward.tokenCost}
                onRedeem={() => handleRedeem(reward)}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

function RewardCard({ reward, canAfford, onRedeem }: any) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition h-full flex flex-col">
      <CardHeader className="pb-4">
        <div className="text-6xl text-center mb-4">{reward.image}</div>
        <CardTitle className="text-lg">{reward.title}</CardTitle>
        <CardDescription>{reward.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Badge variant="secondary">{reward.category}</Badge>
            <span className="text-sm text-gray-500">{reward.stock} left</span>
          </div>
          <div className="flex items-center gap-2 text-emerald-600 font-bold text-xl">
            <Coins className="w-5 h-5" />
            {reward.tokenCost} tokens
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          onClick={onRedeem}
          disabled={!canAfford}
          className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-300"
        >
          {canAfford ? (
            <>
              <ShoppingBag className="w-4 h-4 mr-2" />
              Redeem Now
            </>
          ) : (
            "Insufficient Tokens"
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}
