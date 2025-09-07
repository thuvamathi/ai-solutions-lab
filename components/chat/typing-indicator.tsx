import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { MessageSquare } from "lucide-react"

export function TypingIndicator() {
  return (
    <div className="flex gap-3 justify-start">
      <Avatar className="h-8 w-8 bg-primary">
        <AvatarFallback className="bg-primary text-primary-foreground">
          <MessageSquare className="h-4 w-4" />
        </AvatarFallback>
      </Avatar>

      <div className="bg-muted text-muted-foreground rounded-lg px-3 py-2 text-sm">
        <div className="flex items-center gap-1">
          <span>AI is typing</span>
          <div className="flex gap-1">
            <div
              className="w-1 h-1 bg-muted-foreground rounded-full animate-bounce"
              style={{ animationDelay: "0ms" }}
            />
            <div
              className="w-1 h-1 bg-muted-foreground rounded-full animate-bounce"
              style={{ animationDelay: "150ms" }}
            />
            <div
              className="w-1 h-1 bg-muted-foreground rounded-full animate-bounce"
              style={{ animationDelay: "300ms" }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
