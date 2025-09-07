import { type NextRequest, NextResponse } from "next/server"
import { storage } from "@/lib/storage"
import type { Document } from "@/lib/types"

export async function GET() {
  try {
    const documents = storage.getDocuments()
    return NextResponse.json(documents)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch documents" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const documentData = await request.json()

    const document: Document = {
      id: Date.now().toString(),
      ...documentData,
      uploadedAt: new Date(),
      lastModified: new Date(),
    }

    storage.saveDocument(document)

    return NextResponse.json(document, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to upload document" }, { status: 500 })
  }
}
