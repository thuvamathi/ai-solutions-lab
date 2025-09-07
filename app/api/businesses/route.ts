import { type NextRequest, NextResponse } from "next/server"
import { createBusiness } from "@/lib/database"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const business = await createBusiness(body)
    return NextResponse.json(business)
  } catch (error) {
    console.error("Error creating business:", error)
    return NextResponse.json({ error: "Failed to create business" }, { status: 500 })
  }
}
