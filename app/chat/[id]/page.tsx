"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, Send, ArrowLeft } from "lucide-react"
import Link from "next/link"

interface BusinessData {
  name: string
  description: string
  primaryColor: string
  logo?: string
}

interface Message {
  id: string
  text: string
  sender: "user" | "ai"
  timestamp: Date
}

export default function ChatPage() {
  const params = useParams()
  const chatId = params.id as string
  const [businessData, setBusinessData] = useState<BusinessData | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)

  useEffect(() => {
    // Load business data from localStorage
    const savedData = localStorage.getItem(`business_${chatId}`)
    if (savedData) {
      const data = JSON.parse(savedData)
      setBusinessData(data)

      // Add welcome message
      setMessages([
        {
          id: "welcome",
          text: `Hello! I'm the AI assistant for ${data.name}. ${data.description} How can I help you today?`,
          sender: "ai",
          timestamp: new Date(),
        },
      ])
    }
  }, [chatId])

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateAIResponse(inputValue, businessData),
        sender: "ai",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, aiResponse])
      setIsTyping(false)
    }, 1500)
  }

  const generateAIResponse = (userInput: string, business: BusinessData | null): string => {
    const input = userInput.toLowerCase()

    if (input.includes("appointment") || input.includes("book") || input.includes("schedule")) {
      return "I'd be happy to help you schedule an appointment! Let me connect you with our booking system. What type of service are you interested in?"
    }

    if (input.includes("hours") || input.includes("open")) {
      return "Our typical business hours are Monday through Friday, 9 AM to 6 PM. However, I'd recommend checking our current schedule when booking an appointment as hours may vary."
    }

    if (input.includes("price") || input.includes("cost") || input.includes("fee")) {
      return "I'd be happy to discuss pricing with you! Our rates vary depending on the specific services you need. Would you like to schedule a consultation to get a personalized quote?"
    }

    if (input.includes("location") || input.includes("address")) {
      return "For our exact location and directions, I'd recommend scheduling a consultation where we can provide you with detailed location information and any specific instructions."
    }

    return `Thank you for your question about ${business?.name || "our services"}! Based on the information I have, I'd recommend scheduling a consultation where our team can provide you with detailed, personalized answers. Would you like me to help you book an appointment?`
  }

  if (!businessData) {
    return (
      <div className="min-h-screen bg-[#f8f8f8] flex items-center justify-center">
        <Card className="border-0 bg-white/50 backdrop-blur-sm shadow-sm p-8 text-center">
          <p className="text-gray-600">Loading your AI assistant...</p>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f8f8f8]">
      {/* Custom branded header */}
      <header className="p-6 border-b border-gray-200" style={{ backgroundColor: `${businessData.primaryColor}15` }}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-white text-lg font-normal"
              style={{ backgroundColor: businessData.primaryColor }}
            >
              {businessData.name.charAt(0)}
            </div>
            <div>
              <h1 className="text-lg font-normal text-black">{businessData.name}</h1>
              <p className="text-sm text-gray-600">AI Assistant</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Badge className="text-white" style={{ backgroundColor: businessData.primaryColor }}>
              Online
            </Badge>
            <Link href="/" className="text-sm text-black hover:underline">
              <ArrowLeft className="h-4 w-4 inline mr-1" />
              Back to ReceptionistAI
            </Link>
          </div>
        </div>
      </header>

      {/* Chat interface */}
      <div className="max-w-4xl mx-auto p-6">
        <Card className="border-0 bg-white/50 backdrop-blur-sm shadow-sm h-[600px] flex flex-col">
          <CardHeader className="p-6 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" style={{ color: businessData.primaryColor }} />
              <span className="font-normal">Chat with {businessData.name}</span>
            </div>
          </CardHeader>

          <CardContent className="flex-1 p-0 flex flex-col">
            {/* Messages area */}
            <div className="flex-1 p-6 overflow-y-auto space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.sender === "user" ? "text-white" : "bg-gray-100 text-black"
                    }`}
                    style={message.sender === "user" ? { backgroundColor: businessData.primaryColor } : {}}
                  >
                    <p className="text-sm">{message.text}</p>
                    <p className={`text-xs mt-1 ${message.sender === "user" ? "text-white/70" : "text-gray-500"}`}>
                      {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 p-3 rounded-lg">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input area */}
            <div className="p-6 border-t border-gray-200">
              <div className="flex gap-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={`Ask ${businessData.name} anything...`}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  className="flex-1 bg-white/50 border-gray-200"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim()}
                  className="text-white"
                  style={{ backgroundColor: businessData.primaryColor }}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
