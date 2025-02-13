import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function POST(req: Request) {
  console.log("POST /api/analyses called")
  try {
    const { missingProducts } = await req.json()
    console.log("Received missing products:", missingProducts)
    if (!missingProducts || !Array.isArray(missingProducts)) {
      return NextResponse.json({ error: "Invalid missing products data" }, { status: 400 })
    }

    const createdEntries = await Promise.all(
      missingProducts.map(async (name) => {
        return prisma.analysis.create({
          data: { name },
        })
      }),
    )

    console.log("Missing products added to analysis:", createdEntries)
    return NextResponse.json(createdEntries, { status: 201 })
  } catch (error) {
    console.error("Error posting missing products:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function GET() {
  try {
    const missingIngredients = await prisma.analysis.findMany()
    return NextResponse.json(missingIngredients)
  } catch (error) {
    console.error("Error fetching missing ingredients:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

