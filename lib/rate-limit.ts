export const MAX_FREE_MESSAGES = 3

// Server-side rate limiting storage (in production, use Redis or database)
const serverMessageCounts = new Map<string, { count: number; resetTime: number }>()

export function getRemainingMessages(businessId: string): number {
  if (typeof window === 'undefined') return MAX_FREE_MESSAGES
  
  const key = `chat_count_${businessId}`
  const count = parseInt(localStorage.getItem(key) || '0')
  return Math.max(0, MAX_FREE_MESSAGES - count)
}

export function incrementMessageCount(businessId: string): void {
  if (typeof window === 'undefined') return
  
  const key = `chat_count_${businessId}`
  const count = parseInt(localStorage.getItem(key) || '0')
  localStorage.setItem(key, (count + 1).toString())
}

// Server-side functions
export function getServerRemainingMessages(sessionId: string, businessId: string): number {
  const key = `${sessionId}_${businessId}`
  const data = serverMessageCounts.get(key)
  
  if (!data) {
    return MAX_FREE_MESSAGES
  }
  
  // Reset count after 24 hours
  if (Date.now() > data.resetTime) {
    serverMessageCounts.delete(key)
    return MAX_FREE_MESSAGES
  }
  
  return Math.max(0, MAX_FREE_MESSAGES - data.count)
}

export function incrementServerMessageCount(sessionId: string, businessId: string): boolean {
  const key = `${sessionId}_${businessId}`
  const data = serverMessageCounts.get(key)
  
  const now = Date.now()
  const resetTime = now + (24 * 60 * 60 * 1000) // 24 hours
  
  if (!data) {
    serverMessageCounts.set(key, { count: 1, resetTime })
    return true
  }
  
  // Reset if expired
  if (now > data.resetTime) {
    serverMessageCounts.set(key, { count: 1, resetTime })
    return true
  }
  
  if (data.count >= MAX_FREE_MESSAGES) {
    return false
  }
  
  serverMessageCounts.set(key, { count: data.count + 1, resetTime: data.resetTime })
  return true
}

// Generate a session ID based on IP and user agent for basic rate limiting
export function generateSessionId(req: Request): string {
  const forwarded = req.headers.get('x-forwarded-for')
  const ip = forwarded ? forwarded.split(',')[0] : req.headers.get('x-real-ip') || 'unknown'
  const userAgent = req.headers.get('user-agent') || 'unknown'
  
  // Simple hash function
  let hash = 0
  const str = ip + userAgent
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash // Convert to 32-bit integer
  }
  
  return Math.abs(hash).toString(36)
}