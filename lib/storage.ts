// Local storage utilities for data persistence
import type { Appointment, Document, Conversation, BusinessSettings } from "./types"
import { mockAppointments, mockDocuments, mockConversations, mockBusinessSettings } from "./mock-data"

class LocalStorage {
  private getKey(type: string): string {
    return `receptionist_ai_${type}`
  }

  // Appointments
  getAppointments(): Appointment[] {
    if (typeof window === "undefined") return mockAppointments
    const stored = localStorage.getItem(this.getKey("appointments"))
    return stored ? JSON.parse(stored) : mockAppointments
  }

  saveAppointment(appointment: Appointment): void {
    if (typeof window === "undefined") return
    const appointments = this.getAppointments()
    const existingIndex = appointments.findIndex((a) => a.id === appointment.id)

    if (existingIndex >= 0) {
      appointments[existingIndex] = appointment
    } else {
      appointments.push(appointment)
    }

    localStorage.setItem(this.getKey("appointments"), JSON.stringify(appointments))
  }

  deleteAppointment(id: string): void {
    if (typeof window === "undefined") return
    const appointments = this.getAppointments().filter((a) => a.id !== id)
    localStorage.setItem(this.getKey("appointments"), JSON.stringify(appointments))
  }

  // Documents
  getDocuments(): Document[] {
    if (typeof window === "undefined") return mockDocuments
    const stored = localStorage.getItem(this.getKey("documents"))
    return stored ? JSON.parse(stored) : mockDocuments
  }

  saveDocument(document: Document): void {
    if (typeof window === "undefined") return
    const documents = this.getDocuments()
    const existingIndex = documents.findIndex((d) => d.id === document.id)

    if (existingIndex >= 0) {
      documents[existingIndex] = document
    } else {
      documents.push(document)
    }

    localStorage.setItem(this.getKey("documents"), JSON.stringify(documents))
  }

  deleteDocument(id: string): void {
    if (typeof window === "undefined") return
    const documents = this.getDocuments().filter((d) => d.id !== id)
    localStorage.setItem(this.getKey("documents"), JSON.stringify(documents))
  }

  // Conversations
  getConversations(): Conversation[] {
    if (typeof window === "undefined") return mockConversations
    const stored = localStorage.getItem(this.getKey("conversations"))
    return stored ? JSON.parse(stored) : mockConversations
  }

  saveConversation(conversation: Conversation): void {
    if (typeof window === "undefined") return
    const conversations = this.getConversations()
    const existingIndex = conversations.findIndex((c) => c.id === conversation.id)

    if (existingIndex >= 0) {
      conversations[existingIndex] = conversation
    } else {
      conversations.push(conversation)
    }

    localStorage.setItem(this.getKey("conversations"), JSON.stringify(conversations))
  }

  // Business Settings
  getBusinessSettings(): BusinessSettings {
    if (typeof window === "undefined") return mockBusinessSettings
    const stored = localStorage.getItem(this.getKey("settings"))
    return stored ? JSON.parse(stored) : mockBusinessSettings
  }

  saveBusinessSettings(settings: BusinessSettings): void {
    if (typeof window === "undefined") return
    localStorage.setItem(this.getKey("settings"), JSON.stringify(settings))
  }
}

export const storage = new LocalStorage()
