import { google } from "@ai-sdk/google";
import { generateObject } from "ai";
import { z } from "zod";
import {
  getBusiness,
  getDocumentsByBusiness,
  createMessage,
} from "@/lib/database";
import {
  generateSessionId,
  getServerRemainingMessages,
  incrementServerMessageCount,
} from "@/lib/rate-limit";

// Lab 2: MLOps Integration
// Import metrics tracking utilities
import {
  trackMetrics,
  calculateTokenUsage,
  estimateApiCost,
} from "@/lib/mlops-tracking";

export async function POST(req: Request) {
  // Lab 2: Start timing for performance metrics
  const startTime = Date.now();

  // Declare variables outside try block so they're accessible in catch
  let businessId: string | undefined;
  let conversationId: string | undefined;

  try {
    const requestData = await req.json();
    businessId = requestData.businessId;
    conversationId = requestData.conversationId;
    const { messages } = requestData;

    // Validate required fields
    if (!businessId) {
      return Response.json(
        { error: "Business ID is required" },
        { status: 400 }
      );
    }

    // Server-side rate limiting
    const sessionId = generateSessionId(req);
    const remaining = getServerRemainingMessages(sessionId, businessId);

    if (remaining <= 0) {
      return Response.json(
        {
          error: "Free message limit reached",
          message:
            "You've reached the limit for free messages. Please sign up to continue chatting.",
          type: "rate_limit",
          remainingMessages: 0,
        },
        { status: 429 }
      );
    }

    // Get business and documents for context
    const business = await getBusiness(businessId);
    if (!business) {
      return Response.json({ error: "Business not found" }, { status: 400 });
    }

    const documents = await getDocumentsByBusiness(businessId);

    // Check if documents are available
    const hasDocuments = documents && documents.length > 0;
    const hasValidContent =
      hasDocuments &&
      documents.some((doc) => doc.content && doc.content.trim().length > 0);

    // Build comprehensive business context
    let knowledgeBaseSection = "";

    if (hasValidContent) {
      knowledgeBaseSection = `
BUSINESS KNOWLEDGE BASE:
${documents
  .filter((doc) => doc.content && doc.content.trim())
  .map(
    (doc) => `
Document: ${doc.name}
Content: ${doc.content?.trim() || ""}
`
  )
  .join("\n")}`;
    } else {
      knowledgeBaseSection = `
BUSINESS KNOWLEDGE BASE:
No specific business documents have been provided yet. You can only use the basic business information provided above.`;
    }

    const businessContext = `You are an AI receptionist for ${business.name}.

BUSINESS INFORMATION:
- Name: ${business.name}
- Description: ${business.description}
- Industry: ${business.industry || "Not specified"}
${knowledgeBaseSection}

YOUR ROLE:
1. Answer questions about ${
      business.name
    } using ONLY the provided business information and documents above
2. Help customers understand services, pricing, policies, and procedures ONLY if this information is explicitly provided
3. When customers need human assistance or want to book appointments, smoothly guide them toward scheduling
4. Be helpful, professional, and knowledgeable about the business within the bounds of provided information
5. If you don't have specific information, acknowledge this limitation and offer to connect them with a team member

CRITICAL RESTRICTIONS:
- DO NOT make assumptions about services, pricing, or policies not explicitly mentioned in the business information or documents
- DO NOT hallucinate or invent information about the business
- If asked about something not covered in the provided information, respond with: "I don't have specific information about that. Let me connect you with someone from our team who can help."
- ONLY use information explicitly stated in the business description or uploaded documents
- DO NOT suggest services, features, or capabilities not mentioned in the provided content

${
  !hasValidContent
    ? `
IMPORTANT: Since no business documents have been uploaded, you can only provide very basic information based on the business name and description. For any specific questions about services, pricing, policies, or procedures, you MUST direct customers to speak with a team member.
`
    : ""
}

CRITICAL: You MUST respond with ONLY valid JSON - no markdown, no explanation, no code blocks.

Return ONLY this JSON structure:
{
  "message": "your response text here",
  "type": "text",
  "intent": "general",
  "suggested_actions": ["action1", "action2"]
}

RESPONSE TYPES:
- type: "text" for normal responses
- type: "appointment_booking" for when user wants to book/schedule
- type: "human_handoff" for complex issues needing human help or when you lack specific information

APPOINTMENT TRIGGERS:
Use "appointment_booking" when user asks to book, schedule, meet, or requests consultation.

EXAMPLE RESPONSES (return exactly like this):
{"message": "Perfect! I'll help you book an appointment. Let me show you our available time slots.", "type": "appointment_booking", "intent": "appointment"}

${
  hasValidContent
    ? `{"message": "Based on our service information, we offer consulting services starting at $150/hour. Would you like to schedule a consultation?", "type": "text", "intent": "pricing", "suggested_actions": ["Book consultation", "Learn more about services"]}`
    : `{"message": "I don't have specific information about our pricing in my system yet. Let me connect you with a team member who can provide detailed pricing information and help you book a consultation.", "type": "human_handoff", "intent": "pricing", "suggested_actions": ["Book consultation", "Speak to team member"]}`
}

IMPORTANT GUIDELINES:
- Always respond in a friendly, professional tone
- Use ONLY the business knowledge base to provide accurate information
- When you lack specific details, acknowledge this limitation immediately and offer to connect them with a human
- For appointment requests, be encouraging and helpful in facilitating the booking process
- Stay focused on ${business.name} and its services
- Do not make any suggestions that are not explicitly covered in the provided business information

Remember: You represent ${
      business.name
    } - be their best digital receptionist within the limits of the information provided!`;

    // Store user message if we have conversation context
    if (conversationId && messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage.role === "user") {
        await createMessage({
          conversation_id: conversationId,
          sender: "user",
          content: lastMessage.content,
          message_type: "text",
        });
      }
    }

    // Define the response schema
    const responseSchema = z.object({
      message: z.string().describe("The response message to the user"),
      type: z
        .enum(["text", "appointment_booking", "human_handoff"])
        .describe("The type of response"),
      intent: z
        .enum(["general", "pricing", "services", "appointment", "contact"])
        .describe("The user intent"),
      suggested_actions: z
        .array(z.string())
        .optional()
        .describe("Optional suggested next steps for the user"),
    });

    // Generate structured response using generateObject
    const result = await generateObject({
      model: google("gemini-1.5-flash"),
      system: businessContext,
      messages,
      schema: responseSchema,
    });

    const parsedResponse = result.object;

    // Lab 2: Calculate performance metrics after AI response
    const endTime = Date.now();
    const responseTimeMs = endTime - startTime;

    // Get the last user message for metrics
    const lastUserMessage = messages[messages.length - 1];
    const userMessageLength = lastUserMessage?.content?.length || 0;
    const aiResponseLength = parsedResponse.message.length;

    // Calculate token usage and API costs
    const tokenMetrics = calculateTokenUsage(
      businessContext,
      lastUserMessage?.content || "",
      parsedResponse.message
    );
    const apiCost = estimateApiCost(tokenMetrics.totalTokens);

    // Increment server-side message count only after successful response
    incrementServerMessageCount(sessionId, businessId);

    // Store AI response in database
    if (conversationId) {
      await createMessage({
        conversation_id: conversationId,
        sender: "assistant",
        content: parsedResponse.message,
        message_type: "text",
      });
    }

    // Lab 2: Collect metrics for MLOps tracking
    const metricsData = {
      business_id: businessId, // businessId is guaranteed to be string at this point
      conversation_id: conversationId || undefined,
      session_id: sessionId,

      // Performance metrics
      response_time_ms: responseTimeMs,
      success_rate: 1.0, // Successful response

      // AI performance metrics
      tokens_used: tokenMetrics.totalTokens,
      prompt_tokens: tokenMetrics.promptTokens,
      completion_tokens: tokenMetrics.completionTokens,
      api_cost_usd: apiCost,
      model_name: "gemini-1.5-flash",

      // Business metrics
      intent_detected: parsedResponse.intent,
      appointment_requested: parsedResponse.type === "appointment_booking",
      human_handoff_requested: parsedResponse.type === "human_handoff",

      // Message metrics
      user_message_length: userMessageLength,
      ai_response_length: aiResponseLength,
      response_type: parsedResponse.type,
    };

    // Send metrics to MLOps service (non-blocking)
    // This runs in the background and won't delay the user response
    trackMetrics(metricsData).catch((error) => {
      console.error("Failed to track metrics:", error);
      // Don't fail the request if metrics tracking fails
    });

    // Add remaining messages to response
    const remainingAfterIncrement = getServerRemainingMessages(
      sessionId,
      businessId
    );

    return Response.json({
      ...parsedResponse,
      remainingMessages: remainingAfterIncrement,
    });
  } catch (error) {
    console.error("Error in chat API:", error);

    // Lab 2: Track failed requests for MLOps monitoring
    const endTime = Date.now();
    const responseTimeMs = endTime - startTime;

    const failureMetrics = {
      business_id: businessId || "unknown",
      conversation_id: conversationId || undefined,
      session_id: generateSessionId(req),
      response_time_ms: responseTimeMs,
      success_rate: 0.0, // Failed response
      tokens_used: 0,
      api_cost_usd: 0,
      model_name: "gemini-1.5-flash",
      intent_detected: "error",
      appointment_requested: false,
      human_handoff_requested: true, // Errors should trigger human handoff
      user_message_length: 0,
      ai_response_length: 0,
      response_type: "error",
    };

    // Track failure metrics (non-blocking)
    trackMetrics(failureMetrics).catch((metricsError) => {
      console.error("Failed to track failure metrics:", metricsError);
    });

    return Response.json(
      { error: "Error processing request" },
      { status: 500 }
    );
  }
}
