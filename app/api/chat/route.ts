import { google } from '@ai-sdk/google';
import { generateObject } from 'ai';
import { z } from 'zod';
import { 
  getBusiness, 
  getDocumentsByBusiness, 
  createMessage
} from '@/lib/database';
import { 
  generateSessionId, 
  getServerRemainingMessages, 
  incrementServerMessageCount
} from '@/lib/rate-limit';

export async function POST(req: Request) {
  try {
    const { messages, businessId, conversationId } = await req.json();

    // Server-side rate limiting
    const sessionId = generateSessionId(req);
    const remaining = getServerRemainingMessages(sessionId, businessId);
    
    if (remaining <= 0) {
      return Response.json({ 
        error: 'Free message limit reached', 
        message: "You've reached the limit for free messages. Please sign up to continue chatting.",
        type: "rate_limit",
        remainingMessages: 0
      }, { status: 429 });
    }

    // Get business and documents for context
    const business = await getBusiness(businessId);
    if (!business) {
      return Response.json({ error: 'Business not found' }, { status: 400 });
    }

    const documents = await getDocumentsByBusiness(businessId);
    
    // Check if documents are available
    const hasDocuments = documents && documents.length > 0;
    const hasValidContent = hasDocuments && documents.some(doc => doc.content && doc.content.trim().length > 0);
    
    // Build comprehensive business context
    let knowledgeBaseSection = '';
    
    if (hasValidContent) {
      knowledgeBaseSection = `
BUSINESS KNOWLEDGE BASE:
${documents.filter(doc => doc.content && doc.content.trim()).map(doc => `
Document: ${doc.name}
Content: ${doc.content?.trim() || ''}
`).join('\n')}`;
    } else {
      knowledgeBaseSection = `
BUSINESS KNOWLEDGE BASE:
No specific business documents have been provided yet. You can only use the basic business information provided above.`;
    }

    const businessContext = `You are an AI receptionist for ${business.name}.

BUSINESS INFORMATION:
- Name: ${business.name}
- Description: ${business.description}
- Industry: ${business.industry || 'Not specified'}
${knowledgeBaseSection}

YOUR ROLE:
1. Answer questions about ${business.name} using ONLY the provided business information and documents above
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

${!hasValidContent ? `
IMPORTANT: Since no business documents have been uploaded, you can only provide very basic information based on the business name and description. For any specific questions about services, pricing, policies, or procedures, you MUST direct customers to speak with a team member.
` : ''}

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

${hasValidContent 
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

Remember: You represent ${business.name} - be their best digital receptionist within the limits of the information provided!`;

    // Store user message if we have conversation context
    if (conversationId && messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage.role === 'user') {
        await createMessage({
          conversation_id: conversationId,
          sender: 'user',
          content: lastMessage.content,
          message_type: 'text',
        });
      }
    }

    // Define the response schema
    const responseSchema = z.object({
      message: z.string().describe('The response message to the user'),
      type: z.enum(['text', 'appointment_booking', 'human_handoff']).describe('The type of response'),
      intent: z.enum(['general', 'pricing', 'services', 'appointment', 'contact']).describe('The user intent'),
      suggested_actions: z.array(z.string()).optional().describe('Optional suggested next steps for the user')
    });

    // Generate structured response using generateObject
    const result = await generateObject({
      model: google('gemini-1.5-flash'),
      system: businessContext,
      messages,
      schema: responseSchema,
    });

    const parsedResponse = result.object;

    // Increment server-side message count only after successful response
    incrementServerMessageCount(sessionId, businessId);
    
    // Store AI response in database
    if (conversationId) {
      await createMessage({
        conversation_id: conversationId,
        sender: 'assistant',
        content: parsedResponse.message,
        message_type: 'text',
      });
    }

    // Add remaining messages to response
    const remainingAfterIncrement = getServerRemainingMessages(sessionId, businessId);
    
    return Response.json({
      ...parsedResponse,
      remainingMessages: remainingAfterIncrement
    });
  } catch (error) {
    console.error('Error in chat API:', error);
    return Response.json({ error: 'Error processing request' }, { status: 500 });
  }
}