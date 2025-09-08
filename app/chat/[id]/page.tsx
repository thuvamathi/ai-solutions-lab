"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, Send, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useChat } from "ai/react"
import { AppointmentBooking } from "@/components/appointments/appointment-booking"

interface AssistantResponse {
  message: string
  type: 'text' | 'appointment_booking' | 'human_handoff'
  intent: 'general' | 'pricing' | 'services' | 'appointment' | 'contact'
  suggested_actions?: string[]
}

type ChatMode = "chat" | "booking"

function AssistantMessage({ 
  content, 
  onTriggerBooking, 
  onSuggestedAction 
}: { 
  content: string, 
  onTriggerBooking?: () => void,
  onSuggestedAction?: (action: string) => void 
}) {
  try {
    const response: AssistantResponse = JSON.parse(content)
    
    // Trigger booking mode if response type is appointment_booking
    useEffect(() => {
      if (response.type === 'appointment_booking' && onTriggerBooking) {
        setTimeout(() => {
          onTriggerBooking()
        }, 1000) // Delay to let user read the message
      }
    }, [response.type, onTriggerBooking])
    
    return (
      <div>
        <p>{response.message}</p>
        
        {response.type === 'appointment_booking' && (
          <div className="mt-2 p-2 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-xs text-blue-600 font-medium">📅 Opening calendar...</p>
          </div>
        )}
        
        {response.type === 'human_handoff' && (
          <div className="mt-2 p-2 bg-yellow-50 rounded-lg border border-yellow-200">
            <p className="text-xs text-yellow-600 font-medium">👋 Connect with our team</p>
          </div>
        )}
        
        {response.suggested_actions && response.suggested_actions.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {response.suggested_actions.map((action, i) => (
              <button
                key={i}
                onClick={() => onSuggestedAction?.(action)}
                className="text-xs bg-blue-50 hover:bg-blue-100 text-blue-700 px-3 py-2 rounded-full border border-blue-200 hover:border-blue-300 transition-colors cursor-pointer"
              >
                {action}
              </button>
            ))}
          </div>
        )}
      </div>
    )
  } catch (error) {
    // Fallback for non-JSON responses
    return <p>{content}</p>
  }
}

interface BusinessData {
  id: string
  name: string
  description: string
  primary_color: string
  logo_url?: string
}

interface Message {
  id: string
  content: string
  sender: "user" | "assistant"
  created_at: string
}

export default function ChatPage() {
  const params = useParams()
  const businessId = params.id as string
  const [businessData, setBusinessData] = useState<BusinessData | null>(null)
  const [conversationId, setConversationId] = useState<string>("")
  const [isBusinessLoading, setIsBusinessLoading] = useState(true)
  const [mode, setMode] = useState<ChatMode>("chat")

  const [messages, setMessages] = useState<Array<{id: string, role: 'user' | 'assistant', content: string}>>([])
  const [input, setInput] = useState('')
  const [isChatLoading, setIsChatLoading] = useState(false)

  // Add initial greeting when business data is loaded
  useEffect(() => {
    if (businessData && messages.length === 0) {
      setMessages([{
        id: 'greeting',
        role: 'assistant',
        content: `Hello! Welcome to ${businessData.name}. I'm your AI assistant and I'm here to help you with any questions about our services. How can I assist you today?`
      }])
    }
  }, [businessData])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || !conversationId || isChatLoading) return

    const userMessage = {
      id: Date.now().toString(),
      role: 'user' as const,
      content: input.trim()
    }

    // Add user message immediately
    setMessages(prev => [...prev, userMessage])
    const currentInput = input
    setInput('')
    setIsChatLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage],
          businessId,
          conversationId,
        })
      })

      if (response.ok) {
        const aiResponse = await response.json()
        
        // Add AI response with streaming effect
        const aiMessage = {
          id: (Date.now() + 1).toString(),
          role: 'assistant' as const,
          content: JSON.stringify(aiResponse) // Store full JSON response
        }
        
        setMessages(prev => [...prev, aiMessage])
      } else {
        console.error('Chat API error:', response.status)
        // Add error message
        setMessages(prev => [...prev, {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: 'Sorry, I encountered an error. Please try again.'
        }])
      }
    } catch (error) {
      console.error('Chat error:', error)
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.'
      }])
    } finally {
      setIsChatLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }

  const handleTriggerBooking = () => {
    setMode("booking")
  }

  const handleBackToChat = () => {
    setMode("chat")
  }

  const handleBookingComplete = () => {
    setMode("chat")
    // Add a confirmation message back to the chat
    // This would need to be handled differently with useChat, but for now we'll just switch back
  }

  const handleSuggestedAction = (action: string) => {
    // When user clicks a suggested action, add it as their message
    setInput(action)
    // Or immediately send it
    const userMessage = {
      id: Date.now().toString(),
      role: 'user' as const,
      content: action
    }
    setMessages(prev => [...prev, userMessage])
    
    // Send the action as a message
    sendMessage(action)
  }

  const sendMessage = async (messageContent: string) => {
    if (!conversationId || isChatLoading) return

    setIsChatLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: messages,
          businessId,
          conversationId,
        })
      })

      if (response.ok) {
        const aiResponse = await response.json()
        
        const aiMessage = {
          id: (Date.now() + 1).toString(),
          role: 'assistant' as const,
          content: JSON.stringify(aiResponse)
        }
        
        setMessages(prev => [...prev, aiMessage])
      } else {
        console.error('Chat API error:', response.status)
        setMessages(prev => [...prev, {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: 'Sorry, I encountered an error. Please try again.'
        }])
      }
    } catch (error) {
      console.error('Chat error:', error)
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.'
      }])
    } finally {
      setIsChatLoading(false)
    }
  }

  useEffect(() => {
    let mounted = true

    async function loadBusinessAndConversation() {
      if (!mounted) return
      
      try {
        // Load business data from database
        const businessResponse = await fetch(`/api/businesses/${businessId}`)
        if (businessResponse.ok && mounted) {
          const business = await businessResponse.json()
          setBusinessData(business)

          // Check for existing conversation in localStorage
          const existingConversationId = localStorage.getItem(`conversation_${businessId}`)
          
          if (existingConversationId) {
            // Verify the conversation still exists in database
            const convResponse = await fetch(`/api/conversations?business_id=${businessId}`)
            if (convResponse.ok) {
              const conversations = await convResponse.json()
              const activeConv = conversations.find((c: any) => c.id === existingConversationId && c.status === 'active')
              
              if (activeConv && mounted) {
                setConversationId(activeConv.id)
                setIsBusinessLoading(false)
                return
              }
            }
          }

          // Create new conversation if none exists or previous one is invalid
          const conversationResponse = await fetch("/api/conversations", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              business_id: businessId,
              status: "active",
            }),
          })

          if (conversationResponse.ok && mounted) {
            const conversation = await conversationResponse.json()
            setConversationId(conversation.id)
            localStorage.setItem(`conversation_${businessId}`, conversation.id)
          }
        }
      } catch (error) {
        console.error("Error loading business data:", error)
      } finally {
        if (mounted) {
          setIsBusinessLoading(false)
        }
      }
    }

    if (businessId) {
      loadBusinessAndConversation()
    }

    return () => {
      mounted = false
    }
  }, [businessId])


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
      <header className="p-6 border-b border-gray-200" style={{ backgroundColor: `${businessData.primary_color}15` }}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-white text-lg font-normal"
              style={{ backgroundColor: businessData.primary_color }}
            >
              {businessData.name.charAt(0)}
            </div>
            <div>
              <h1 className="text-lg font-normal text-black">{businessData.name}</h1>
              <p className="text-sm text-gray-600">AI Assistant</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Badge className="text-white" style={{ backgroundColor: businessData.primary_color }}>
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
              {mode === "booking" && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleBackToChat}
                  className="mr-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              )}
              <MessageSquare className="h-5 w-5" style={{ color: businessData.primary_color }} />
              <span className="font-normal">
                {mode === "booking" ? "Book Appointment" : `Chat with ${businessData.name}`}
              </span>
            </div>
          </CardHeader>

          <CardContent className="flex-1 p-0 flex flex-col">
            {mode === "chat" ? (
              <>
                {/* Messages area */}
                <div className="flex-1 p-6 overflow-y-auto space-y-4">
                  {messages.map((message) => (
                    <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                      <div
                        className={`max-w-[80%] p-3 rounded-lg ${
                          message.role === "user" ? "text-white" : "bg-gray-100 text-black"
                        }`}
                        style={message.role === "user" ? { backgroundColor: businessData.primary_color } : {}}
                      >
                        <div className="text-sm">
                          {message.role === 'assistant' ? (
                            <AssistantMessage 
                              content={message.content} 
                              onTriggerBooking={handleTriggerBooking}
                              onSuggestedAction={handleSuggestedAction}
                            />
                          ) : (
                            <p>{message.content}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {/* Loading indicator */}
                  {isChatLoading && (
                    <div className="flex justify-start">
                      <div className="bg-gray-100 p-3 rounded-lg">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Input area */}
                <div className="p-6 border-t border-gray-200">
                  <form onSubmit={handleSubmit} className="flex gap-2">
                    <Input
                      value={input}
                      onChange={handleInputChange}
                      placeholder={`Ask ${businessData.name} anything...`}
                      className="flex-1 bg-white/50 border-gray-200"
                    />
                    <Button
                      type="submit"
                      disabled={!input.trim()}
                      className="text-white"
                      style={{ backgroundColor: businessData.primary_color }}
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </form>
                </div>
              </>
            ) : (
              <>
                {/* Booking area */}
                <div className="flex-1 p-6 overflow-y-auto">
                  <AppointmentBooking onClose={handleBookingComplete} />
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
