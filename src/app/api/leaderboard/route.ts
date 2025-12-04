import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        city: true,
        tokens: true,
        totalBottles: true,
        carbonSaved: true,
        image: true,
      },
      orderBy: {
        tokens: 'desc'
      },
      take: 100,
    })

    return NextResponse.json(users)
  } catch (error) {
    console.error("Leaderboard error:", error)
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    )
  }
}
