import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(req: NextRequest) {
  try {
    const { userId, rewardId } = await req.json()

    if (!userId || !rewardId) {
      return NextResponse.json(
        { error: "User ID and Reward ID are required" },
        { status: 400 }
      )
    }

    // Fetch user and reward
    const user = await prisma.user.findUnique({
      where: { id: userId },
    })

    const reward = await prisma.reward.findUnique({
      where: { id: rewardId },
    })

    if (!user || !reward) {
      return NextResponse.json(
        { error: "User or reward not found" },
        { status: 404 }
      )
    }

    // Validate user has enough tokens
    if (user.tokens < reward.tokenCost) {
      return NextResponse.json(
        { error: "Insufficient tokens" },
        { status: 400 }
      )
    }

    // Validate reward is available
    if (!reward.isActive || reward.stock <= 0) {
      return NextResponse.json(
        { error: "Reward is not available" },
        { status: 400 }
      )
    }

    // Create redemption and update user tokens in a transaction
    const result = await prisma.$transaction([
      // Create redemption record
      prisma.redemption.create({
        data: {
          userId,
          rewardId,
          tokensCost: reward.tokenCost,
          status: "PENDING",
        },
      }),
      // Deduct tokens from user
      prisma.user.update({
        where: { id: userId },
        data: {
          tokens: user.tokens - reward.tokenCost,
        },
      }),
      // Decrease reward stock
      prisma.reward.update({
        where: { id: rewardId },
        data: {
          stock: reward.stock - 1,
        },
      }),
    ])

    return NextResponse.json({
      message: "Reward redeemed successfully",
      redemption: result[0],
      newTokenBalance: result[1].tokens,
    })
  } catch (error) {
    console.error("Redemption error:", error)
    return NextResponse.json(
      { error: "Failed to redeem reward" },
      { status: 500 }
    )
  }
}
