import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
  console.log("🌱 Starting database seeding...")

  // Create demo users
  const hashedPassword = await bcrypt.hash("password123", 10)

  const users = await Promise.all([
    prisma.user.create({
      data: {
        name: "Arjun Sharma",
        email: "arjun@example.com",
        password: hashedPassword,
        city: "Mumbai",
        tokens: 850,
        totalBottles: 85,
        carbonSaved: 4.25,
        role: "USER",
      },
    }),
    prisma.user.create({
      data: {
        name: "Priya Verma",
        email: "priya@example.com",
        password: hashedPassword,
        city: "Delhi",
        tokens: 720,
        totalBottles: 72,
        carbonSaved: 3.6,
        role: "USER",
      },
    }),
    prisma.user.create({
      data: {
        name: "Rahul Kumar",
        email: "rahul@example.com",
        password: hashedPassword,
        city: "Bangalore",
        tokens: 640,
        totalBottles: 64,
        carbonSaved: 3.2,
        role: "USER",
      },
    }),
    prisma.user.create({
      data: {
        name: "Sneha Patel",
        email: "sneha@example.com",
        password: hashedPassword,
        city: "Mumbai",
        tokens: 590,
        totalBottles: 59,
        carbonSaved: 2.95,
        role: "USER",
      },
    }),
    prisma.user.create({
      data: {
        name: "Vikram Singh",
        email: "vikram@example.com",
        password: hashedPassword,
        city: "Pune",
        tokens: 510,
        totalBottles: 51,
        carbonSaved: 2.55,
        role: "USER",
      },
    }),
    prisma.user.create({
      data: {
        name: "Admin User",
        email: "admin@revenac.com",
        password: hashedPassword,
        city: "Mumbai",
        tokens: 0,
        totalBottles: 0,
        carbonSaved: 0,
        role: "ADMIN",
      },
    }),
  ])

  console.log(`✅ Created ${users.length} users`)

  // Create rewards
  const rewards = await Promise.all([
    prisma.reward.create({
      data: {
        title: "₹100 Amazon Voucher",
        description: "Redeem this voucher on Amazon for any purchase",
        tokenCost: 500,
        category: "VOUCHER",
        stock: 50,
        isActive: true,
      },
    }),
    prisma.reward.create({
      data: {
        title: "Free Movie Ticket",
        description: "Get a free movie ticket at PVR Cinemas",
        tokenCost: 300,
        category: "VOUCHER",
        stock: 30,
        isActive: true,
      },
    }),
    prisma.reward.create({
      data: {
        title: "₹50 Swiggy Coupon",
        description: "₹50 off on your next Swiggy order",
        tokenCost: 200,
        category: "COUPON",
        stock: 100,
        isActive: true,
      },
    }),
    prisma.reward.create({
      data: {
        title: "20% Zomato Discount",
        description: "20% off on orders above ₹500",
        tokenCost: 250,
        category: "DISCOUNT",
        stock: 75,
        isActive: true,
      },
    }),
    prisma.reward.create({
      data: {
        title: "REVENAC T-Shirt",
        description: "Eco-friendly branded t-shirt (M/L/XL)",
        tokenCost: 600,
        category: "MERCHANDISE",
        stock: 20,
        isActive: true,
      },
    }),
    prisma.reward.create({
      data: {
        title: "Plant a Tree Donation",
        description: "We'll plant a tree in your name",
        tokenCost: 150,
        category: "DONATION",
        stock: 200,
        isActive: true,
      },
    }),
    prisma.reward.create({
      data: {
        title: "₹200 Flipkart Gift Card",
        description: "Use this gift card for Flipkart purchases",
        tokenCost: 800,
        category: "VOUCHER",
        stock: 25,
        isActive: true,
      },
    }),
    prisma.reward.create({
      data: {
        title: "Free Uber Ride (₹100)",
        description: "₹100 off on your next Uber ride",
        tokenCost: 400,
        category: "COUPON",
        stock: 40,
        isActive: true,
      },
    }),
  ])

  console.log(`✅ Created ${rewards.length} rewards`)

  // Create sample transactions for users
  const transactions = []
  for (let i = 0; i < 20; i++) {
    const randomUser = users[Math.floor(Math.random() * (users.length - 1))] // Exclude admin
    const itemTypes = ["PLASTIC_BOTTLE", "ALUMINUM_CAN", "GLASS_BOTTLE", "PAPER"]
    const randomItemType = itemTypes[Math.floor(Math.random() * itemTypes.length)]

    transactions.push(
      prisma.transaction.create({
        data: {
          userId: randomUser.id,
          qrCode: `QR-${Date.now()}-${i}`,
          machineId: `RVM-${Math.floor(Math.random() * 10) + 1}`,
          itemType: randomItemType,
          tokensEarned: 10,
          scanned: true,
        },
      })
    )
  }

  await Promise.all(transactions)
  console.log(`✅ Created ${transactions.length} sample transactions`)

  console.log("✨ Database seeding completed!")
}

main()
  .catch((e) => {
    console.error("❌ Error seeding database:", e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
