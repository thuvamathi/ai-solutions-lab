"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { MessageSquare } from "lucide-react"
import { ChatHeader } from "./chat-header"
import { ChatMessages } from "./chat-messages"
import { ChatInput } from "./chat-input"
import { QuickActions } from "./quick-actions"
import { AppointmentBooking } from "../appointments/appointment-booking"
import { cn } from "@/lib/utils"

interface Message {
  id: string
  content: string
  sender: "user" | "ai"
  timestamp: Date
  sources?: string[]
}

type ChatMode = "chat" | "booking"

export function EnhancedChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [mode, setMode] = useState<ChatMode>("chat")
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Hello! I'm your AI receptionist. I have access to your business documents and can answer questions about your services, policies, and more. I can also help you book an appointment. How can I help you today?",
      sender: "ai",
      timestamp: new Date(),
    },
  ])
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setIsTyping(true)

    // Simulate AI response with document references
    setTimeout(() => {
      let aiResponse = ""
      let sources: string[] = []
      let shouldShowBooking = false

      // Simple keyword matching for demo purposes
      if (content.toLowerCase().includes("hours") || content.toLowerCase().includes("open")) {
        aiResponse =
          "According to our business information, we are open Monday through Friday from 9:00 AM to 6:00 PM, and Saturday from 10:00 AM to 4:00 PM. We are closed on Sundays and major holidays."
        sources = ["Business FAQ.pdf"]
      } else if (content.toLowerCase().includes("services") || content.toLowerCase().includes("offer")) {
        aiResponse =
          "We offer a comprehensive range of professional services including business consulting, strategic planning, market analysis, financial advisory, process optimization, and technology integration. Would you like more details about any specific service?"
        sources = ["Service Descriptions.docx", "Business FAQ.pdf"]
      } else if (content.toLowerCase().includes("price") || content.toLowerCase().includes("cost")) {
        aiResponse =
          "We offer flexible pricing options including hourly rates, project-based fees, and retainer agreements. Pricing depends on the specific services required and project complexity. We also offer payment plans for larger projects. Would you like to schedule a consultation for a customized quote?"
        sources = ["Pricing Information.md"]
      } else if (
        content.toLowerCase().includes("appointment") ||
        content.toLowerCase().includes("book") ||
        content.toLowerCase().includes("schedule")
      ) {
        aiResponse =
          "I'd be happy to help you book an appointment! We offer both in-person and virtual consultations. Initial consultations are complimentary and typically last 30 minutes. Let me show you our available time slots."
        sources = ["Business FAQ.pdf"]
        shouldShowBooking = true
      } else {
        aiResponse =
          "Thank you for your question. I'm processing your request using our business knowledge base. Based on the information available, I can help you with questions about our services, pricing, business hours, and scheduling appointments. Is there something specific you'd like to know more about?"
        sources = ["Business FAQ.pdf"]
      }

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: aiResponse,
        sender: "ai",
        timestamp: new Date(),
        sources,
      }
      setMessages((prev) => [...prev, aiMessage])
      setIsTyping(false)

      if (shouldShowBooking) {
        setTimeout(() => {
          setMode("booking")
        }, 1000)
      }
    }, 1500)
  }

  const handleQuickAction = (action: string) => {
    handleSendMessage(action)
  }

  const handleBackToChat = () => {
    setMode("chat")
  }

  const handleCloseBooking = () => {
    setMode("chat")
    const confirmationMessage: Message = {
      id: (Date.now() + 2).toString(),
      content:
        "Great! Your appointment has been booked successfully. You'll receive a confirmation email shortly with all the details. Is there anything else I can help you with today?",
      sender: "ai",
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, confirmationMessage])
  }

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          size="lg"
          className="rounded-full h-14 w-14 shadow-lg hover:shadow-xl transition-all duration-200 bg-primary hover:bg-primary/90"
        >
          <MessageSquare className="h-6 w-6" />
        </Button>
      </div>
    )
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Card
        className={cn(
          "shadow-2xl border-0 transition-all duration-300",
          isMinimized
            ? "h-14 w-80 md:w-96"
            : mode === "booking"
              ? "h-[600px] w-96 md:w-[500px]"
              : "h-[500px] w-80 md:w-96",
        )}
      >
        <ChatHeader
          onClose={() => setIsOpen(false)}
          onMinimize={() => setIsMinimized(!isMinimized)}
          isMinimized={isMinimized}
          title={mode === "booking" ? "Book Appointment" : "ReceptionistAI"}
          showBackButton={mode === "booking"}
          onBack={handleBackToChat}
        />

        {!isMinimized && (
          <>
            {mode === "chat" ? (
              <div className="flex-1 flex flex-col h-[400px]">
                <ChatMessages messages={messages} isTyping={isTyping} messagesEndRef={messagesEndRef} />

                <div className="p-4 border-t bg-muted/30">
                  <QuickActions onAction={handleQuickAction} />
                  <ChatInput onSendMessage={handleSendMessage} />
                </div>
              </div>
            ) : (
              <div className="p-4 h-[500px] overflow-y-auto">
                <AppointmentBooking onClose={handleCloseBooking} />
              </div>
            )}
          </>
        )}
      </Card>
    </div>
  )
}
