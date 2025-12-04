import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET(request: NextRequest) {
  try {
    const session = await auth()

    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get total users
    const totalUsers = await prisma.user.count()

    // Get total tokens distributed
    const tokenStats = await prisma.user.aggregate({
      _sum: {
        tokenBalance: true,
      },
    })

    // Get total transactions
    const totalTransactions = await prisma.transaction.count()

    // Get total redemptions
    const totalRedemptions = await prisma.redemption.count()

    // Get recent transactions
    const recentTransactions = await prisma.transaction.findMany({
      take: 10,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        user: {
          select: {
            name: true,
          },
        },
      },
    })

    const analytics = {
      totalUsers,
      totalTokens: tokenStats._sum.tokenBalance || 0,
      totalTransactions,
      totalRedemptions,
      userGrowth: 12.5, // Mock data - you can calculate this from actual data
      tokenGrowth: 8.3, // Mock data - you can calculate this from actual data
      recentTransactions: recentTransactions.map((t: any) => ({
        id: t.id,
        userName: t.user.name,
        tokensEarned: t.tokensEarned,
        createdAt: t.createdAt.toISOString(),
      })),
    }

    return NextResponse.json(analytics)
  } catch (error) {
    console.error("Failed to fetch analytics:", error)
    return NextResponse.json(
      { error: "Failed to fetch analytics" },
      { status: 500 }
    )
  }
}
