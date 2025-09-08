import { type NextRequest, NextResponse } from "next/server"
import { createDocument, getDocumentsByBusiness, deleteDocument } from "@/lib/database"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const businessId = searchParams.get("business_id")

    if (!businessId) {
      return NextResponse.json({ error: "business_id is required" }, { status: 400 })
    }

    const documents = await getDocumentsByBusiness(businessId)
    return NextResponse.json(documents)
  } catch (error) {
    console.error("Error fetching documents:", error)
    return NextResponse.json({ error: "Failed to fetch documents" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const documentData = await request.json()

    if (!documentData.business_id) {
      return NextResponse.json({ error: "business_id is required" }, { status: 400 })
    }

    const document = await createDocument({
      business_id: documentData.business_id,
      name: documentData.name,
      type: documentData.type,
      content: documentData.content,
      file_url: documentData.file_url,
      size: documentData.size,
    })

    return NextResponse.json(document, { status: 201 })
  } catch (error) {
    console.error("Error creating document:", error)
    return NextResponse.json({ error: "Failed to upload document" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const documentId = searchParams.get("id")

    if (!documentId) {
      return NextResponse.json({ error: "document id is required" }, { status: 400 })
    }

    await deleteDocument(documentId)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting document:", error)
    return NextResponse.json({ error: "Failed to delete document" }, { status: 500 })
  }
}
