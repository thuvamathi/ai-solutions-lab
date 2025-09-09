"use client"

import { useEffect, useState, useRef } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, Send, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { AppointmentBooking } from "@/components/appointments/appointment-booking"
import { getRemainingMessages, incrementMessageCount, MAX_FREE_MESSAGES } from '@/lib/rate-limit';

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
  onSuggestedAction,
  messageId 
}: { 
  content: string, 
  onTriggerBooking?: () => void,
  onSuggestedAction?: (action: string) => void,
  messageId: string 
}) {
  try {
    const response: AssistantResponse = JSON.parse(content)
    
    // No automatic booking trigger - let user decide
    
    return (
      <div>
        <p>{response.message}</p>
        
        {response.type === 'appointment_booking' && (
          <div className="mt-3 sm:mt-4 p-3 sm:p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-sm sm:text-lg">📅</span>
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-semibold text-blue-900">Ready to book your appointment?</p>
                  <p className="text-xs text-blue-600 hidden sm:block">Click below when you're ready to schedule</p>
                </div>
              </div>
              <button
                onClick={() => onTriggerBooking?.()}
                className="bg-blue-600 hover:bg-blue-700 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors hover:shadow-md"
              >
                Book Now
              </button>
            </div>
          </div>
        )}
        
        {response.type === 'human_handoff' && (
          <div className="mt-2 sm:mt-3 p-2 sm:p-3 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-100">
            <div className="flex items-center gap-2">
              <span className="text-sm sm:text-lg">👋</span>
              <p className="text-xs sm:text-sm text-amber-700 font-medium">Connect with our team</p>
            </div>
          </div>
        )}
        
        {response.suggested_actions && response.suggested_actions.length > 0 && (
          <div className="mt-3 sm:mt-4 flex flex-wrap gap-1.5 sm:gap-2">
            {response.suggested_actions.map((action, i) => (
              <button
                key={i}
                onClick={() => onSuggestedAction?.(action)}
                className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-gray-900 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full border border-gray-200 hover:border-gray-300 transition-all duration-200 cursor-pointer hover:shadow-sm font-medium"
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
  const [isEndingChat, setIsEndingChat] = useState(false)
  const [remainingMessages, setRemainingMessages] = useState(MAX_FREE_MESSAGES)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

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

  useEffect(() => {
    if (businessId) {
      setRemainingMessages(getRemainingMessages(businessId));
    }
  }, [businessId]);

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault()
    if (!input.trim() || !conversationId || isChatLoading) return

    // Check remaining messages
    if (remainingMessages <= 0) {
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: 'assistant',
        content: JSON.stringify({
          message: "You've reached the limit for free messages. Please sign up to continue chatting.",
          type: "text",
          intent: "general",
          suggested_actions: ["Sign up now", "Learn more about pricing"]
        })
      }]);
      return;
    }

    const userMessage = {
      id: Date.now().toString(),
      role: 'user' as const,
      content: input.trim()
    }

    // Add user message immediately
    setMessages(prev => [...prev, userMessage])
    const currentInput = input
    setInput('')
    
    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = '48px'
    }
    
    setIsChatLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json'
        },
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

        // Update remaining from server response (more accurate than client-side counting)
        if (typeof aiResponse.remainingMessages === 'number') {
          setRemainingMessages(aiResponse.remainingMessages);
        } else {
          // Fallback to client-side increment
          incrementMessageCount(businessId);
          setRemainingMessages(prev => prev - 1);
        }
      } else if (response.status === 429) {
        // Handle rate limiting
        const errorData = await response.json()
        setMessages(prev => [...prev, {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: JSON.stringify({
            message: errorData.message || "You've reached the limit for free messages. Please sign up to continue chatting.",
            type: "text",
            intent: "general",
            suggested_actions: ["Sign up now", "Learn more about pricing"]
          })
        }]);
        setRemainingMessages(0);
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

  const resizeTextarea = (textarea: HTMLTextAreaElement) => {
    textarea.style.height = 'auto'
    
    // Calculate max height (50% of viewport height)
    const maxHeight = window.innerHeight * 0.5
    const minHeight = 48 // minimum height in pixels
    
    let newHeight = Math.max(textarea.scrollHeight, minHeight)
    newHeight = Math.min(newHeight, maxHeight)
    
    textarea.style.height = `${newHeight}px`
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value)
    resizeTextarea(e.target)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // On mobile, allow Enter to create new lines naturally
    // Only submit on desktop with Enter (non-Shift)
    const isMobile = window.innerWidth < 640 // sm breakpoint
    
    if (e.key === 'Enter' && !isMobile && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  const handleTriggerBooking = () => {
    setMode("booking")
  }

  const handleBackToChat = () => {
    setMode("chat")
  }

  const handleBookingComplete = async () => {
    setMode("chat")
    
    // Send a booking confirmation message through the API to maintain rate limiting
    const confirmationUserMessage = {
      id: Date.now().toString(),
      role: 'user' as const,
      content: 'Appointment booked successfully'
    }

    setMessages(prev => [...prev, confirmationUserMessage])
    setIsChatLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          messages: [...messages, confirmationUserMessage],
          businessId,
          conversationId,
        })
      })

      if (response.ok) {
        const aiResponse = await response.json()
        
        // Override the AI response with our booking confirmation
        const confirmationMessage = {
          id: (Date.now() + 1).toString(),
          role: 'assistant' as const,
          content: JSON.stringify({
            message: "Perfect! Your appointment has been successfully booked. You'll receive a confirmation email shortly. Is there anything else I can help you with today?",
            type: 'text',
            intent: 'general',
            suggested_actions: ['Ask about services', 'Get contact information', 'End chat']
          })
        }
        
        setMessages(prev => [...prev, confirmationMessage])

        // Update remaining from server response
        if (typeof aiResponse.remainingMessages === 'number') {
          setRemainingMessages(aiResponse.remainingMessages);
        }
      } else if (response.status === 429) {
        // Handle rate limiting
        const errorData = await response.json()
        setMessages(prev => [...prev, {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: JSON.stringify({
            message: errorData.message || "You've reached the limit for free messages. Please sign up to continue chatting.",
            type: "text",
            intent: "general",
            suggested_actions: ["Sign up now", "Learn more about pricing"]
          })
        }]);
        setRemainingMessages(0);
      } else {
        // Fallback to local message if API fails
        const confirmationMessage = {
          id: (Date.now() + 1).toString(),
          role: 'assistant' as const,
          content: JSON.stringify({
            message: "Perfect! Your appointment has been successfully booked. You'll receive a confirmation email shortly. Is there anything else I can help you with today?",
            type: 'text',
            intent: 'general',
            suggested_actions: ['Ask about services', 'Get contact information', 'End chat']
          })
        }
        setMessages(prev => [...prev, confirmationMessage])
      }
    } catch (error) {
      console.error('Error sending confirmation:', error)
      // Fallback to local message
      const confirmationMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant' as const,
        content: JSON.stringify({
          message: "Perfect! Your appointment has been successfully booked. You'll receive a confirmation email shortly. Is there anything else I can help you with today?",
          type: 'text',
          intent: 'general',
          suggested_actions: ['Ask about services', 'Get contact information', 'End chat']
        })
      }
      setMessages(prev => [...prev, confirmationMessage])
    } finally {
      setIsChatLoading(false)
    }
  }

  const handleEndChat = async () => {
    setIsEndingChat(true)
    
    try {
      // Add farewell message
      const farewellMessage = {
        id: Date.now().toString(),
        role: 'user' as const,
        content: 'End chat'
      }
      
      const assistantFarewellMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant' as const,
        content: JSON.stringify({
          message: "Thank you for chatting with us! Have a great day. Redirecting you back to the homepage...",
          type: 'text',
          intent: 'general'
        })
      }
      
      // Add messages to chat
      setMessages(prev => [...prev, farewellMessage, assistantFarewellMessage])
      
      // Update conversation status to completed
      if (conversationId) {
        await fetch('/api/conversations', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            conversation_id: conversationId,
            status: 'completed'
          })
        })
        
        // Clear conversation from localStorage
        localStorage.removeItem(`conversation_${businessId}`)
      }
      
      // Redirect back to landing page after a delay
      setTimeout(() => {
        window.location.href = '/'
      }, 2000)
      
    } catch (error) {
      console.error('Error ending chat:', error)
      setIsEndingChat(false)
    }
  }

  const handleSuggestedAction = async (action: string) => {
    if (!conversationId || isChatLoading) return
    
    // Handle special actions
    if (action.toLowerCase().includes('end chat')) {
      await handleEndChat()
      return
    }
    
    // Handle booking-related actions
    if (action.toLowerCase().includes('book') || 
        action.toLowerCase().includes('appointment') || 
        action.toLowerCase().includes('schedule')) {
      handleTriggerBooking()
      return
    }

    // Check remaining messages before sending
    if (remainingMessages <= 0) {
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: 'assistant',
        content: JSON.stringify({
          message: "You've reached the limit for free messages. Please sign up to continue chatting.",
          type: "text",
          intent: "general",
          suggested_actions: ["Sign up now", "Learn more about pricing"]
        })
      }]);
      return;
    }
    
    // Create user message with the suggested action
    const userMessage = {
      id: Date.now().toString(),
      role: 'user' as const,
      content: action
    }
    
    // Add user message to chat immediately
    setMessages(prev => [...prev, userMessage])
    setIsChatLoading(true)

    try {
      // Send API request with current messages plus the new action message
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          messages: [...messages, userMessage],
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

        // Update remaining from server response
        if (typeof aiResponse.remainingMessages === 'number') {
          setRemainingMessages(aiResponse.remainingMessages);
        }
      } else if (response.status === 429) {
        // Handle rate limiting
        const errorData = await response.json()
        setMessages(prev => [...prev, {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: JSON.stringify({
            message: errorData.message || "You've reached the limit for free messages. Please sign up to continue chatting.",
            type: "text",
            intent: "general",
            suggested_actions: ["Sign up now", "Learn more about pricing"]
          })
        }]);
        setRemainingMessages(0);
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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="bg-white rounded-3xl shadow-xl p-12 text-center max-w-md mx-4">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mx-auto mb-6 flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Loading your AI assistant</h3>
          <p className="text-gray-500 text-sm">Please wait while we prepare your personalized experience...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100 relative">
      {/* Modern branded header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center text-white text-lg font-semibold shadow-lg"
                style={{ backgroundColor: businessData.primary_color }}
              >
                {businessData.name.charAt(0)}
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">{businessData.name}</h1>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <p className="text-sm text-gray-500">AI Assistant Online</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Badge 
                className="text-white font-medium px-3 py-1.5 shadow-sm" 
                style={{ backgroundColor: businessData.primary_color }}
              >
                <div className="w-1.5 h-1.5 bg-white rounded-full mr-2 animate-pulse"></div>
                Active
              </Badge>
              <Link 
                href="/" 
                className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors bg-white/60 px-4 py-2 rounded-xl hover:bg-white/80"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main chat container */}
      <div className="flex-1 flex flex-col max-w-5xl mx-auto w-full px-4 sm:px-6 py-4 sm:py-6">
        <div className="flex-1 bg-white rounded-2xl sm:rounded-3xl shadow-xl border border-gray-200/50 overflow-hidden flex flex-col">
          {/* Chat header */}
          <div className="bg-white/80 backdrop-blur-sm border-b border-gray-100 px-4 sm:px-6 py-3 sm:py-4">
            <div className="flex items-center gap-3">
              {mode === "booking" && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleBackToChat}
                  className="mr-2 hover:bg-gray-100 rounded-full"
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              )}
              <div className="p-2 rounded-full" style={{ backgroundColor: `${businessData.primary_color}15` }}>
                <MessageSquare className="h-5 w-5" style={{ color: businessData.primary_color }} />
              </div>
              <div>
                <h2 className="font-semibold text-gray-900">
                  {mode === "booking" ? "Book Appointment" : `Chat with ${businessData.name}`}
                </h2>
                <p className="text-xs text-gray-500">
                  {mode === "booking" ? "Schedule your appointment" : "Ask me anything about our services"}
                </p>
              </div>
            </div>
          </div>

          {/* Chat content */}
          <div className="flex-1 flex flex-col">
            {mode === "chat" ? (
              <>
                {/* Messages area */}
                <div className="flex-1 overflow-y-auto bg-gray-50/30">
                  <div className="p-4 sm:p-6 space-y-4 sm:space-y-6 min-h-full">
                    {messages.map((message) => (
                      <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                        <div className={`flex gap-3 max-w-[85%] ${message.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                          {/* Avatar */}
                          <div className={`flex-shrink-0 ${message.role === "user" ? "ml-2 sm:ml-3" : "mr-2 sm:mr-3"}`}>
                            {message.role === "user" ? (
                              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-xs sm:text-sm font-medium">
                                <span className="hidden sm:block">You</span>
                                <span className="block sm:hidden">U</span>
                              </div>
                            ) : (
                              <div 
                                className="w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-white text-xs sm:text-sm font-medium shadow-sm"
                                style={{ backgroundColor: businessData.primary_color }}
                              >
                                AI
                              </div>
                            )}
                          </div>
                          
                          {/* Message bubble */}
                          <div
                            className={`px-3 sm:px-4 py-2 sm:py-3 rounded-2xl shadow-sm ${
                              message.role === "user" 
                                ? "text-white rounded-br-lg" 
                                : "bg-white text-gray-900 rounded-bl-lg border border-gray-100"
                            }`}
                            style={message.role === "user" ? { 
                              backgroundColor: businessData.primary_color,
                              backgroundImage: `linear-gradient(135deg, ${businessData.primary_color}, ${businessData.primary_color}dd)`
                            } : {}}
                          >
                            <div className="text-xs sm:text-sm leading-relaxed">
                              {message.role === 'assistant' ? (
                                <AssistantMessage 
                                  content={message.content} 
                                  messageId={message.id}
                                  onTriggerBooking={handleTriggerBooking}
                                  onSuggestedAction={handleSuggestedAction}
                                />
                              ) : (
                                <p>{message.content}</p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    {/* Loading indicator */}
                    {isChatLoading && (
                      <div className="flex justify-start">
                        <div className="flex gap-3 max-w-[85%]">
                          <div 
                            className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium shadow-sm"
                            style={{ backgroundColor: businessData.primary_color }}
                          >
                            AI
                          </div>
                          <div className="bg-white px-4 py-3 rounded-2xl rounded-bl-lg shadow-sm border border-gray-100">
                            <div className="flex space-x-1">
                              <div className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: `${businessData.primary_color}60` }}></div>
                              <div className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: `${businessData.primary_color}60`, animationDelay: "0.1s" }}></div>
                              <div className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: `${businessData.primary_color}60`, animationDelay: "0.2s" }}></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Modern input area */}
                <div className="bg-white border-t border-gray-100 p-4 sm:p-6">
                  {/* Message counter - moved outside form for better mobile layout */}
                  <div className="flex justify-center mb-2 sm:mb-3">
                    <div className="px-3 py-1 bg-gray-100 rounded-full">
                      <span className="text-xs text-gray-500">
                        {remainingMessages} / {MAX_FREE_MESSAGES} messages left
                      </span>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="mb-3 sm:mb-4">
                    <div className="flex items-end gap-2 sm:gap-3">
                      <div className="flex-1">
                        <Textarea
                          ref={textareaRef}
                          value={input}
                          onChange={handleInputChange}
                          onKeyDown={handleKeyDown}
                          placeholder={`Ask ${businessData.name} anything...`}
                          className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-gray-50 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:border-transparent text-sm placeholder:text-gray-400 resize-none min-h-[48px] overflow-y-auto transition-all duration-200 ease-in-out"
                          style={{ 
                            '--tw-ring-color': businessData.primary_color,
                            height: '48px' // Initial height
                          } as React.CSSProperties}
                          rows={1}
                        />
                      </div>
                      <Button
                        type="submit"
                        disabled={!input.trim() || isChatLoading}
                        className={`px-4 sm:px-6 py-2 sm:py-3 rounded-2xl text-white font-medium shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0 ${
                          !input.trim() ? 'opacity-50' : 'hover:scale-105'
                        }`}
                        style={{ 
                          backgroundColor: businessData.primary_color,
                          backgroundImage: `linear-gradient(135deg, ${businessData.primary_color}, ${businessData.primary_color}dd)`
                        }}
                      >
                        {isChatLoading ? (
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                          <Send className="h-3 w-3 sm:h-4 sm:w-4" />
                        )}
                      </Button>
                    </div>
                  </form>
                  
                  {/* Footer actions */}
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-gray-400">
                      <span className="hidden sm:inline">Press Enter to send • Shift+Enter for new line</span>
                      <span className="sm:hidden">Tap send button or Enter for new line</span>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={handleEndChat}
                      disabled={isEndingChat}
                      className="text-xs text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full px-4 py-2 disabled:opacity-50"
                    >
                      {isEndingChat ? (
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                          Ending...
                        </div>
                      ) : (
                        "End Chat"
                      )}
                    </Button>
                  </div>

                  {remainingMessages === 0 && (
                    <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-xl">
                      <p className="text-sm text-amber-800">
                        You've reached the limit for free messages. 
                        <Link href="/signup" className="ml-2 font-medium underline">
                          Sign up now
                        </Link> to continue chatting.
                      </p>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                {/* Modern booking area */}
                <div className="flex-1 overflow-y-auto bg-gray-50/30">
                  <div className="p-6">
                    <AppointmentBooking 
                      onClose={handleBookingComplete}
                      businessId={businessId}
                      conversationId={conversationId}
                    />
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Loading overlay for ending chat */}
      {isEndingChat && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl shadow-2xl p-8 text-center max-w-sm mx-4">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
              <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Ending Chat Session</h3>
            <p className="text-sm text-gray-500">Thank you for chatting with us! Redirecting you back to the homepage...</p>
          </div>
        </div>
      )}
    </div>
  )
}
