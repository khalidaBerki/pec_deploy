import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function POST(req: Request) {
  try {
    const { name } = await req.json()
    if (!name) {
      return NextResponse.json({ error: "Missing ingredient name" }, { status: 400 })
    }

    const newEntry = await prisma.analysis.create({
      data: { name },
    })

    return NextResponse.json(newEntry, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function GET() {
  try {
    const missingIngredients = await prisma.analysis.findMany()
    return NextResponse.json(missingIngredients)
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

