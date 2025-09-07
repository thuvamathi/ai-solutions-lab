"use client"

import { Button } from "@/components/ui/button"
import { Calendar, Phone, Clock, HelpCircle } from "lucide-react"

interface QuickActionsProps {
  onAction: (action: string) => void
}

export function QuickActions({ onAction }: QuickActionsProps) {
  const quickActions = [
    {
      icon: Calendar,
      label: "Book Appointment",
      action: "I'd like to book an appointment",
    },
    {
      icon: Clock,
      label: "Business Hours",
      action: "What are your business hours?",
    },
    {
      icon: Phone,
      label: "Contact Info",
      action: "How can I contact you?",
    },
    {
      icon: HelpCircle,
      label: "Services",
      action: "What services do you offer?",
    },
  ]

  return (
    <div className="grid grid-cols-2 gap-2 mb-3">
      {quickActions.map((action, index) => {
        const Icon = action.icon
        return (
          <Button
            key={index}
            variant="outline"
            size="sm"
            onClick={() => onAction(action.action)}
            className="h-auto p-2 flex flex-col items-center gap-1 text-xs bg-transparent"
          >
            <Icon className="h-4 w-4" />
            <span>{action.label}</span>
          </Button>
        )
      })}
    </div>
  )
}
