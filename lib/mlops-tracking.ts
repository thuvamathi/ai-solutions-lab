/**
 * MLOps Tracking Utilities
 * Lab 2: AI Lifecycle & MLOps Integration
 * 
 * This module provides utilities for tracking AI performance metrics
 * and sending them to the Flask MLOps service for analysis.
 * 
 * Key Learning Objectives:
 * - Understanding metrics collection in production AI systems
 * - Implementing non-blocking metrics tracking
 * - Calculating token usage and API costs
 * - Building observability into AI applications
 */

// Types for metrics data
export interface MetricsData {
  business_id: string;
  conversation_id?: string | undefined;
  session_id: string;
  
  // Performance metrics
  response_time_ms: number;
  success_rate: number;
  user_satisfaction?: number;
  
  // AI performance metrics
  tokens_used: number;
  prompt_tokens?: number;
  completion_tokens?: number;
  api_cost_usd: number;
  model_name: string;
  
  // Business metrics
  intent_detected: string;
  appointment_requested: boolean;
  human_handoff_requested: boolean;
  appointment_booked?: boolean;
  
  // Message metrics
  user_message_length: number;
  ai_response_length: number;
  response_type: string;
}

export interface TokenMetrics {
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
}

/**
 * Track metrics by storing in database and sending to MLOps service
 * This function is designed to be non-blocking - it won't delay user responses
 * 
 * @param metricsData - The metrics to track
 * @returns Promise that resolves when metrics are processed (or fails silently)
 */
export async function trackMetrics(metricsData: MetricsData): Promise<void> {
  try {
    // Import database function dynamically to avoid circular dependencies
    const { createAIMetrics } = await import('@/lib/database');
    
    // Store metrics in database first (for persistence/history)
    try {
      await createAIMetrics({
        business_id: metricsData.business_id,
        conversation_id: metricsData.conversation_id,
        session_id: metricsData.session_id,
        response_time_ms: metricsData.response_time_ms,
        success_rate: metricsData.success_rate,
        tokens_used: metricsData.tokens_used,
        prompt_tokens: metricsData.prompt_tokens,
        completion_tokens: metricsData.completion_tokens,
        api_cost_usd: metricsData.api_cost_usd,
        model_name: metricsData.model_name,
        intent_detected: metricsData.intent_detected,
        appointment_requested: metricsData.appointment_requested,
        human_handoff_requested: metricsData.human_handoff_requested,
        appointment_booked: metricsData.appointment_booked,
        user_message_length: metricsData.user_message_length,
        ai_response_length: metricsData.ai_response_length,
        response_type: metricsData.response_type
      });
    } catch (dbError) {
      console.error('Database storage failed (table may not exist):', dbError);
      console.log('💡 Run the SQL from scripts/create-metrics-table.sql in your Neon console');
      // Continue with MLOps service call even if database storage fails
    }

    // Send metrics to Flask MLOps service (for Prometheus monitoring)
    const mlopsServiceUrl = process.env.MLOPS_SERVICE_URL || 'http://localhost:5001';
    
    // First, send the metrics for immediate Prometheus update
    const response = await fetch(`${mlopsServiceUrl}/track`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(metricsData),
      // Set a timeout to prevent hanging
      signal: AbortSignal.timeout(5000), // 5 second timeout
    });

    if (!response.ok) {
      throw new Error(`MLOps service responded with status: ${response.status}`);
    }

    const result = await response.json();
    console.log('Metrics tracked successfully:', result.status);
    
    // Optionally trigger metrics refresh from database (for persistence)
    // This ensures Prometheus metrics are rebuilt from database on service restart
    try {
      await fetch(`${mlopsServiceUrl}/refresh-metrics`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ trigger: 'new_metrics' }),
        signal: AbortSignal.timeout(3000)
      });
    } catch (refreshError) {
      // Don't fail if refresh fails - it's not critical for user experience
      console.log('Metrics refresh skipped:', refreshError);
    }
    
  } catch (error) {
    // Log error but don't throw - we don't want metrics tracking to break the user experience
    console.error('Error tracking metrics:', error);
    
    // In a production system, you might want to:
    // 1. Store failed metrics locally for retry
    // 2. Send to a dead letter queue
    // 3. Use a circuit breaker pattern
    // For this lab, we'll just log the error
  }
}

/**
 * Calculate token usage for Gemini API calls
 * This is an estimation based on text length since we don't have direct access to token counts
 * 
 * @param systemPrompt - The system prompt sent to the AI
 * @param userMessage - The user's message
 * @param aiResponse - The AI's response
 * @returns Token usage breakdown
 */
export function calculateTokenUsage(
  systemPrompt: string, 
  userMessage: string, 
  aiResponse: string
): TokenMetrics {
  // Rough estimation: 1 token ≈ 4 characters for English text
  // This is an approximation - actual tokenization varies by model
  const CHARS_PER_TOKEN = 4;
  
  // Calculate tokens for each component
  const systemTokens = Math.ceil(systemPrompt.length / CHARS_PER_TOKEN);
  const userTokens = Math.ceil(userMessage.length / CHARS_PER_TOKEN);
  const responseTokens = Math.ceil(aiResponse.length / CHARS_PER_TOKEN);
  
  const promptTokens = systemTokens + userTokens;
  const completionTokens = responseTokens;
  const totalTokens = promptTokens + completionTokens;
  
  return {
    promptTokens,
    completionTokens,
    totalTokens
  };
}

/**
 * Estimate API cost based on token usage
 * Uses Gemini API pricing as of 2024
 * 
 * @param totalTokens - Total tokens used in the request
 * @returns Estimated cost in USD
 */
export function estimateApiCost(totalTokens: number): number {
  // Gemini 1.5 Flash pricing (as of 2024):
  // Input: $0.075 per 1M tokens
  // Output: $0.30 per 1M tokens
  // For simplicity, we'll use an average rate
  const COST_PER_MILLION_TOKENS = 0.1875; // Average of input/output costs
  
  const costUsd = (totalTokens / 1_000_000) * COST_PER_MILLION_TOKENS;
  
  // Round to 6 decimal places for precision
  return Math.round(costUsd * 1_000_000) / 1_000_000;
}

/**
 * Calculate success rate for a conversation
 * This can be used to track how well the AI is performing
 * 
 * @param wasSuccessful - Whether the interaction was successful
 * @param previousSuccessRate - Previous success rate (for running average)
 * @param totalInteractions - Total number of interactions so far
 * @returns Updated success rate
 */
export function calculateSuccessRate(
  wasSuccessful: boolean,
  previousSuccessRate: number = 1.0,
  totalInteractions: number = 1
): number {
  // Calculate running average success rate
  const currentSuccess = wasSuccessful ? 1 : 0;
  const newSuccessRate = ((previousSuccessRate * (totalInteractions - 1)) + currentSuccess) / totalInteractions;
  
  return Math.round(newSuccessRate * 10000) / 10000; // Round to 4 decimal places
}

/**
 * Determine if an interaction should trigger human handoff
 * This helps track when the AI needs human assistance
 * 
 * @param responseType - Type of AI response
 * @param userMessage - The user's message
 * @param aiResponse - The AI's response
 * @returns Whether human handoff should be triggered
 */
export function shouldTriggerHandoff(
  responseType: string,
  userMessage: string,
  aiResponse: string
): boolean {
  // Trigger handoff for explicit handoff responses
  if (responseType === 'human_handoff') {
    return true;
  }
  
  // Trigger handoff if AI response is very short (might indicate confusion)
  if (aiResponse.length < 20) {
    return true;
  }
  
  // Trigger handoff if user message contains frustration indicators
  const frustrationKeywords = ['frustrated', 'angry', 'terrible', 'awful', 'horrible', 'useless'];
  const userMessageLower = userMessage.toLowerCase();
  
  for (const keyword of frustrationKeywords) {
    if (userMessageLower.includes(keyword)) {
      return true;
    }
  }
  
  return false;
}

/**
 * Extract intent from user message for better categorization
 * This helps track what users are asking about most frequently
 * 
 * @param userMessage - The user's message
 * @param aiResponseType - The AI's response type
 * @returns Detected intent category
 */
export function detectIntent(userMessage: string, aiResponseType: string): string {
  const messageLower = userMessage.toLowerCase();
  
  // Check for appointment-related intents
  if (aiResponseType === 'appointment_booking' || 
      messageLower.includes('book') || 
      messageLower.includes('schedule') || 
      messageLower.includes('appointment')) {
    return 'appointment';
  }
  
  // Check for pricing intents
  if (messageLower.includes('price') || 
      messageLower.includes('cost') || 
      messageLower.includes('fee') || 
      messageLower.includes('charge')) {
    return 'pricing';
  }
  
  // Check for service information intents
  if (messageLower.includes('service') || 
      messageLower.includes('offer') || 
      messageLower.includes('do you') || 
      messageLower.includes('what')) {
    return 'services';
  }
  
  // Check for contact intents
  if (messageLower.includes('contact') || 
      messageLower.includes('phone') || 
      messageLower.includes('email') || 
      messageLower.includes('address')) {
    return 'contact';
  }
  
  // Default to general inquiry
  return 'general';
}