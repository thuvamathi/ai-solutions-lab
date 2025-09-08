import { google } from '@ai-sdk/google';
import { generateObject } from 'ai';
import { z } from 'zod';
import { 
  getBusiness, 
  getDocumentsByBusiness, 
  createMessage
} from '@/lib/database';

export async function POST(req: Request) {
  try {
    const { messages, businessId, conversationId } = await req.json();

    // Get business and documents for context
    const business = await getBusiness(businessId);
    if (!business) {
      return Response.json({ error: 'Business not found' }, { status: 400 });
    }

    const documents = await getDocumentsByBusiness(businessId);
    
    // Build comprehensive business context
    const businessContext = `You are an AI receptionist for ${business.name}.

BUSINESS INFORMATION:
- Name: ${business.name}
- Description: ${business.description}
- Industry: ${business.industry || 'Not specified'}

BUSINESS KNOWLEDGE BASE:
${documents.map(doc => `
Document: ${doc.name}
Content: ${doc.content || 'No content available'}
`).join('\n')}

YOUR ROLE:
1. Answer questions about ${business.name} using the provided business information and documents
2. Help customers understand services, pricing, policies, and procedures  
3. When customers need human assistance or want to book appointments, smoothly guide them toward scheduling
4. Be helpful, professional, and knowledgeable about the business
5. If you don't have specific information, offer to connect them with a team member

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
- type: "human_handoff" for complex issues needing human help

APPOINTMENT TRIGGERS:
Use "appointment_booking" when user asks to book, schedule, meet, or requests consultation.

EXAMPLE RESPONSES (return exactly like this):
{"message": "Perfect! I'll help you book an appointment. Let me show you our available time slots.", "type": "appointment_booking", "intent": "appointment"}

{"message": "We offer consulting services starting at $150/hour. Would you like to schedule a consultation?", "type": "text", "intent": "pricing", "suggested_actions": ["Book consultation", "Learn more about services"]}

IMPORTANT GUIDELINES:
- Always respond in a friendly, professional tone
- Use the business knowledge base to provide accurate information
- When uncertain about specific details, acknowledge limitations and offer to help connect with a human
- For appointment requests, be encouraging and helpful in facilitating the booking process
- Stay focused on ${business.name} and its services

Remember: You represent ${business.name} - be their best digital receptionist!`;

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

    // Store AI response in database
    if (conversationId) {
      await createMessage({
        conversation_id: conversationId,
        sender: 'assistant',
        content: parsedResponse.message,
        message_type: 'text',
      });
    }

    return Response.json(parsedResponse);
  } catch (error) {
    console.error('Error in chat API:', error);
    return Response.json({ error: 'Error processing request' }, { status: 500 });
  }
}