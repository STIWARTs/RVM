import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import crypto from "crypto"

// This endpoint simulates QR generation from IoT device
export async function POST(request: Request) {
  try {
    const { userId, itemType, machineId, machineLocation } = await request.json()

    // Generate unique QR code
    const qrCode = `RVM-${machineId}-${crypto.randomBytes(8).toString('hex')}`

    // Calculate tokens based on item type
    const tokenMap: Record<string, number> = {
      PLASTIC_BOTTLE: 10,
      ALUMINUM_CAN: 15,
      GLASS_BOTTLE: 20,
      PAPER: 5,
    }

    const tokensEarned = tokenMap[itemType] || 10

    // Create transaction
    const transaction = await prisma.transaction.create({
      data: {
        userId,
        qrCode,
        machineId,
        machineLocation,
        itemType,
        tokensEarned,
        scanned: false,
      },
    })

    return NextResponse.json({ qrCode, transaction }, { status: 201 })
  } catch (error) {
    console.error("Generate QR error:", error)
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    )
  }
}
