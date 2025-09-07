import { type NextRequest, NextResponse } from "next/server"
import { storage } from "@/lib/storage"

export async function GET() {
  try {
    const settings = storage.getBusinessSettings()
    return NextResponse.json(settings)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const settingsData = await request.json()
    storage.saveBusinessSettings(settingsData)
    return NextResponse.json(settingsData)
  } catch (error) {
    return NextResponse.json({ error: "Failed to update settings" }, { status: 500 })
  }
}
