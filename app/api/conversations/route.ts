import { type NextRequest, NextResponse } from "next/server"
import { storage } from "@/lib/storage"
import type { Conversation } from "@/lib/types"

export async function GET() {
  try {
    const conversations = storage.getConversations()
    return NextResponse.json(conversations)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch conversations" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const conversationData = await request.json()

    const conversation: Conversation = {
      id: Date.now().toString(),
      ...conversationData,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    storage.saveConversation(conversation)

    return NextResponse.json(conversation, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to save conversation" }, { status: 500 })
  }
}
