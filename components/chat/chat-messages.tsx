import type React from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { MessageSquare, User } from "lucide-react"
import { TypingIndicator } from "./typing-indicator"
import { cn } from "@/lib/utils"

interface Message {
  id: string
  content: string
  sender: "user" | "ai"
  timestamp: Date
}

interface ChatMessagesProps {
  messages: Message[]
  isTyping: boolean
  messagesEndRef: React.RefObject<HTMLDivElement>
}

export function ChatMessages({ messages, isTyping, messagesEndRef }: ChatMessagesProps) {
  return (
    <ScrollArea className="flex-1 p-4">
      <div className="space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn("flex gap-3", message.sender === "user" ? "justify-end" : "justify-start")}
          >
            {message.sender === "ai" && (
              <Avatar className="h-8 w-8 bg-primary">
                <AvatarFallback className="bg-primary text-primary-foreground">
                  <MessageSquare className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
            )}

            <div
              className={cn(
                "max-w-[80%] rounded-lg px-3 py-2 text-sm",
                message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground",
              )}
            >
              <p>{message.content}</p>
              <p
                className={cn(
                  "text-xs mt-1 opacity-70",
                  message.sender === "user" ? "text-primary-foreground" : "text-muted-foreground",
                )}
              >
                {message.timestamp.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>

            {message.sender === "user" && (
              <Avatar className="h-8 w-8 bg-secondary">
                <AvatarFallback className="bg-secondary text-secondary-foreground">
                  <User className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
            )}
          </div>
        ))}

        {isTyping && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>
    </ScrollArea>
  )
}
