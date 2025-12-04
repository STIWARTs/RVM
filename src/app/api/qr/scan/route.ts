import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(request: Request) {
  try {
    const { userId, qrCode } = await request.json()

    // Find transaction by QR code
    const transaction = await prisma.transaction.findUnique({
      where: { qrCode },
    })

    if (!transaction) {
      return NextResponse.json(
        { message: "Invalid QR code" },
        { status: 404 }
      )
    }

    if (transaction.scanned) {
      return NextResponse.json(
        { message: "QR code already used" },
        { status: 400 }
      )
    }

    // Update transaction
    await prisma.transaction.update({
      where: { qrCode },
      data: {
        scanned: true,
        scannedAt: new Date(),
        userId, // Assign to scanning user
      },
    })

    // Update user tokens and stats
    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        tokens: { increment: transaction.tokensEarned },
        totalBottles: { increment: 1 },
        carbonSaved: { increment: 0.05 }, // 50g CO2 per bottle
      },
    })

    return NextResponse.json({
      message: "QR scanned successfully!",
      tokensEarned: transaction.tokensEarned,
      newBalance: user.tokens,
    })
  } catch (error) {
    console.error("Scan QR error:", error)
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    )
  }
}
