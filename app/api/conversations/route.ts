import { type NextRequest, NextResponse } from "next/server"
import { createConversation, getConversationsByBusiness, updateConversation } from "@/lib/database"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const businessId = searchParams.get("business_id")

    if (!businessId) {
      return NextResponse.json({ error: "business_id is required" }, { status: 400 })
    }

    const conversations = await getConversationsByBusiness(businessId)
    return NextResponse.json(conversations)
  } catch (error) {
    console.error("Error fetching conversations:", error)
    return NextResponse.json({ error: "Failed to fetch conversations" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const conversationData = await request.json()

    if (!conversationData.business_id) {
      return NextResponse.json({ error: "business_id is required" }, { status: 400 })
    }

    const conversation = await createConversation({
      business_id: conversationData.business_id,
      customer_name: conversationData.customer_name,
      customer_email: conversationData.customer_email,
      customer_phone: conversationData.customer_phone,
      status: conversationData.status || "active",
    })

    return NextResponse.json(conversation, { status: 201 })
  } catch (error) {
    console.error("Error creating conversation:", error)
    return NextResponse.json({ error: "Failed to create conversation" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { conversation_id, ...updates } = await request.json()

    if (!conversation_id) {
      return NextResponse.json({ error: "conversation_id is required" }, { status: 400 })
    }

    const updatedConversation = await updateConversation(conversation_id, updates)

    if (!updatedConversation) {
      return NextResponse.json({ error: "Conversation not found" }, { status: 404 })
    }

    return NextResponse.json(updatedConversation)
  } catch (error) {
    console.error("Error updating conversation:", error)
    return NextResponse.json({ error: "Failed to update conversation" }, { status: 500 })
  }
}
