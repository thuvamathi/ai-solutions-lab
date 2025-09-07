// Database models and TypeScript interfaces
export interface User {
  id: string
  name: string
  email: string
  phone?: string
  createdAt: Date
  updatedAt: Date
}

export interface Appointment {
  id: string
  userId: string
  customerName: string
  customerEmail: string
  customerPhone: string
  serviceType: string
  date: string
  time: string
  duration: number
  status: "scheduled" | "confirmed" | "completed" | "cancelled"
  notes?: string
  createdAt: Date
  updatedAt: Date
}

export interface Document {
  id: string
  name: string
  type: string
  size: number
  content: string
  category: string
  uploadedAt: Date
  lastModified: Date
}

export interface Conversation {
  id: string
  sessionId: string
  messages: ChatMessage[]
  customerEmail?: string
  customerName?: string
  status: "active" | "resolved" | "escalated"
  createdAt: Date
  updatedAt: Date
}

export interface ChatMessage {
  id: string
  content: string
  sender: "user" | "assistant"
  timestamp: Date
  documentSources?: string[]
}

export interface BusinessSettings {
  id: string
  businessName: string
  businessHours: {
    [key: string]: { start: string; end: string; enabled: boolean }
  }
  services: Array<{
    name: string
    duration: number
    description: string
  }>
  emailTemplates: {
    confirmation: string
    reminder: string
    cancellation: string
  }
  chatSettings: {
    welcomeMessage: string
    fallbackMessage: string
    escalationTriggers: string[]
  }
}
