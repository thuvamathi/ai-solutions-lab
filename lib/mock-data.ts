// Mock data for demonstration
import type { Appointment, Document, Conversation, BusinessSettings } from "./types"

export const mockAppointments: Appointment[] = [
  {
    id: "1",
    userId: "user1",
    customerName: "John Smith",
    customerEmail: "john@example.com",
    customerPhone: "+1-555-0123",
    serviceType: "Consultation",
    date: "2024-01-15",
    time: "10:00",
    duration: 60,
    status: "scheduled",
    notes: "First-time consultation",
    createdAt: new Date("2024-01-10"),
    updatedAt: new Date("2024-01-10"),
  },
  {
    id: "2",
    userId: "user2",
    customerName: "Sarah Johnson",
    customerEmail: "sarah@example.com",
    customerPhone: "+1-555-0124",
    serviceType: "Follow-up",
    date: "2024-01-16",
    time: "14:30",
    duration: 30,
    status: "confirmed",
    createdAt: new Date("2024-01-11"),
    updatedAt: new Date("2024-01-12"),
  },
]

export const mockDocuments: Document[] = [
  {
    id: "1",
    name: "Business FAQ.pdf",
    type: "application/pdf",
    size: 245760,
    content: "Frequently asked questions about our services...",
    category: "FAQ",
    uploadedAt: new Date("2024-01-01"),
    lastModified: new Date("2024-01-01"),
  },
  {
    id: "2",
    name: "Service Policies.docx",
    type: "application/docx",
    size: 156432,
    content: "Our service policies and procedures...",
    category: "Policies",
    uploadedAt: new Date("2024-01-02"),
    lastModified: new Date("2024-01-02"),
  },
]

export const mockConversations: Conversation[] = [
  {
    id: "1",
    sessionId: "session_123",
    messages: [
      {
        id: "1",
        content: "Hello! How can I help you today?",
        sender: "assistant",
        timestamp: new Date("2024-01-10T10:00:00"),
      },
      {
        id: "2",
        content: "I need to schedule an appointment",
        sender: "user",
        timestamp: new Date("2024-01-10T10:01:00"),
      },
    ],
    customerEmail: "customer@example.com",
    customerName: "Jane Doe",
    status: "resolved",
    createdAt: new Date("2024-01-10T10:00:00"),
    updatedAt: new Date("2024-01-10T10:15:00"),
  },
]

export const mockBusinessSettings: BusinessSettings = {
  id: "1",
  businessName: "Your Business Name",
  businessHours: {
    monday: { start: "09:00", end: "17:00", enabled: true },
    tuesday: { start: "09:00", end: "17:00", enabled: true },
    wednesday: { start: "09:00", end: "17:00", enabled: true },
    thursday: { start: "09:00", end: "17:00", enabled: true },
    friday: { start: "09:00", end: "17:00", enabled: true },
    saturday: { start: "10:00", end: "14:00", enabled: false },
    sunday: { start: "10:00", end: "14:00", enabled: false },
  },
  services: [
    { name: "Consultation", duration: 60, description: "Initial consultation meeting" },
    { name: "Follow-up", duration: 30, description: "Follow-up appointment" },
    { name: "Review", duration: 45, description: "Review session" },
  ],
  emailTemplates: {
    confirmation: "Thank you for booking an appointment...",
    reminder: "This is a reminder of your upcoming appointment...",
    cancellation: "Your appointment has been cancelled...",
  },
  chatSettings: {
    welcomeMessage: "Hello! How can I assist you today?",
    fallbackMessage: "I'm not sure about that. Would you like to schedule an appointment with our team?",
    escalationTriggers: ["speak to human", "talk to someone", "customer service"],
  },
}
