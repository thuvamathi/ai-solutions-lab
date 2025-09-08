import { type NextRequest, NextResponse } from "next/server"
import { createMessage, getMessagesByConversation } from "@/lib/database"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const conversationId = searchParams.get("conversation_id")

    if (!conversationId) {
      return NextResponse.json({ error: "conversation_id is required" }, { status: 400 })
    }

    const messages = await getMessagesByConversation(conversationId)
    return NextResponse.json(messages)
  } catch (error) {
    console.error("Error fetching messages:", error)
    return NextResponse.json({ error: "Failed to fetch messages" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const messageData = await request.json()

    if (!messageData.conversation_id) {
      return NextResponse.json({ error: "conversation_id is required" }, { status: 400 })
    }

    const message = await createMessage({
      conversation_id: messageData.conversation_id,
      sender: messageData.sender,
      content: messageData.content,
      message_type: messageData.message_type || "text",
      metadata: messageData.metadata,
    })

    return NextResponse.json(message, { status: 201 })
  } catch (error) {
    console.error("Error creating message:", error)
    return NextResponse.json({ error: "Failed to create message" }, { status: 500 })
  }
}