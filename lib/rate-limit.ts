export const MAX_FREE_MESSAGES = 3

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