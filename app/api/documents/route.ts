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

async function extractTextFromFile(file: File): Promise<string> {
  try {
    if (file.type === 'application/pdf') {
      const pdfToText = (await import('react-pdftotext')).default
      return await pdfToText(file)
    } else if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      const mammoth = await import('mammoth')
      const buffer = Buffer.from(await file.arrayBuffer())
      const result = await mammoth.extractRawText({ buffer })
      return result.value
    } else if (file.type === 'application/msword') {
      const mammoth = await import('mammoth')
      const buffer = Buffer.from(await file.arrayBuffer())
      const result = await mammoth.extractRawText({ buffer })
      return result.value
    } else if (file.type === 'text/plain' || file.type === 'text/markdown') {
      return await file.text()
    } else {
      throw new Error(`Unsupported file type: ${file.type}`)
    }
  } catch (error: any) {
    console.error('Error extracting text:', error)
    throw new Error(`Failed to extract text from ${file.name}: ${error.message}`)
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const businessId = formData.get('business_id') as string

    if (!businessId) {
      return NextResponse.json({ error: "business_id is required" }, { status: 400 })
    }

    // Check if this is a file upload (for DOC/DOCX) or pre-extracted content
    const file = formData.get('file') as File
    
    if (file) {
      // Server-side extraction for DOC/DOCX files
      const extractedText = await extractTextFromFile(file)

      const document = await createDocument({
        business_id: businessId,
        name: file.name,
        type: file.type,
        content: extractedText,
        size: file.size,
      })

      return NextResponse.json(document, { status: 201 })
    } else {
      // Pre-extracted content from client
      const fileName = formData.get('file_name') as string
      const fileType = formData.get('file_type') as string
      const fileSizeStr = formData.get('file_size') as string
      const content = formData.get('content') as string

      if (!fileName || !fileType || !fileSizeStr || !content) {
        return NextResponse.json({ error: "Missing required file information" }, { status: 400 })
      }

      const fileSize = parseInt(fileSizeStr, 10)
      if (isNaN(fileSize)) {
        return NextResponse.json({ error: "Invalid file size" }, { status: 400 })
      }

      const document = await createDocument({
        business_id: businessId,
        name: fileName,
        type: fileType,
        content: content,
        size: fileSize,
      })

      return NextResponse.json(document, { status: 201 })
    }
  } catch (error) {
    console.error("Error creating document:", error)
    return NextResponse.json({ 
      error: "Failed to upload document", 
      details: (error as Error).message 
    }, { status: 500 })
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
