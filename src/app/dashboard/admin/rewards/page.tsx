"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Search, Plus, Edit, Trash2 } from "lucide-react"

interface Reward {
  id: string
  name: string
  description: string
  tokensRequired: number
  category: string
  stock: number
  createdAt: string
}

export default function AdminRewardsPage() {
  const [rewards, setRewards] = useState<Reward[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchRewards()
  }, [])

  const fetchRewards = async () => {
    try {
      const response = await fetch("/api/admin/rewards")
      const data = await response.json()
      setRewards(data)
    } catch (error) {
      console.error("Failed to fetch rewards:", error)
    } finally {
      setLoading(false)
    }
  }

  const filteredRewards = rewards.filter((reward) =>
    reward.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleDeleteReward = async (rewardId: string) => {
    if (!confirm("Are you sure you want to delete this reward?")) return

    try {
      const response = await fetch(`/api/admin/rewards/${rewardId}`, {
        method: "DELETE",
      })

      if (response.ok) {
        setRewards(rewards.filter((r) => r.id !== rewardId))
      }
    } catch (error) {
      console.error("Failed to delete reward:", error)
    }
  }

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      VOUCHER: "bg-purple-100 text-purple-800",
      GIFT_CARD: "bg-blue-100 text-blue-800",
      PRODUCT: "bg-green-100 text-green-800",
      DISCOUNT: "bg-orange-100 text-orange-800",
      CASHBACK: "bg-pink-100 text-pink-800",
    }
    return colors[category] || "bg-gray-100 text-gray-800"
  }

  if (loading) {
    return (
      <div className="p-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Rewards Management</h1>
          <p className="text-gray-600 mt-1">Manage rewards catalog</p>
        </div>
        <Button className="bg-green-600 hover:bg-green-700">
          <Plus className="mr-2 h-4 w-4" />
          Add Reward
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>All Rewards ({filteredRewards.length})</CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search rewards..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Tokens Required</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRewards.map((reward) => (
                <TableRow key={reward.id}>
                  <TableCell className="font-medium">{reward.name}</TableCell>
                  <TableCell className="max-w-xs truncate">
                    {reward.description}
                  </TableCell>
                  <TableCell>
                    <Badge className={getCategoryColor(reward.category)}>
                      {reward.category}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span className="font-semibold text-green-600">
                      ₹{reward.tokensRequired}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={reward.stock > 10 ? "default" : "destructive"}
                      className={
                        reward.stock > 10
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }
                    >
                      {reward.stock} units
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {new Date(reward.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteReward(reward.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
