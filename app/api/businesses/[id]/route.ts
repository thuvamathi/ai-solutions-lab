import { type NextRequest, NextResponse } from "next/server"
import { getBusiness, updateBusiness } from "@/lib/database"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const business = await getBusiness(params.id)
    if (!business) {
      return NextResponse.json({ error: "Business not found" }, { status: 404 })
    }
    return NextResponse.json(business)
  } catch (error) {
    console.error("Error fetching business:", error)
    return NextResponse.json({ error: "Failed to fetch business" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const business = await updateBusiness(params.id, body)
    if (!business) {
      return NextResponse.json({ error: "Business not found" }, { status: 404 })
    }
    return NextResponse.json(business)
  } catch (error) {
    console.error("Error updating business:", error)
    return NextResponse.json({ error: "Failed to update business" }, { status: 500 })
  }
}
