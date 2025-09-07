"use client"

import { Button } from "@/components/ui/button"
import { MessageSquare, X, Minimize2, Maximize2, ArrowLeft } from "lucide-react"

interface ChatHeaderProps {
  onClose: () => void
  onMinimize: () => void
  isMinimized: boolean
  title?: string
  showBackButton?: boolean
  onBack?: () => void
}

export function ChatHeader({
  onClose,
  onMinimize,
  isMinimized,
  title = "ReceptionistAI",
  showBackButton = false,
  onBack,
}: ChatHeaderProps) {
  return (
    <div className="flex items-center justify-between p-4 border-b bg-primary text-primary-foreground rounded-t-lg">
      <div className="flex items-center gap-2">
        {showBackButton && onBack && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="h-8 w-8 p-0 text-primary-foreground hover:bg-primary-foreground/20"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
        )}
        <MessageSquare className="h-5 w-5" />
        <div>
          <h3 className="font-semibold text-sm">{title}</h3>
          <p className="text-xs opacity-90">
            {showBackButton ? "Select your preferred date and time" : "Online • Typically replies instantly"}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="sm"
          onClick={onMinimize}
          className="h-8 w-8 p-0 text-primary-foreground hover:bg-primary-foreground/20"
        >
          {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="h-8 w-8 p-0 text-primary-foreground hover:bg-primary-foreground/20"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
