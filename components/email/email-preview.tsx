"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Eye, Send, X } from "lucide-react"
import {
  AppointmentConfirmationTemplate,
  AppointmentReminderTemplate,
  NewBookingNotificationTemplate,
} from "./email-templates"

interface EmailPreviewProps {
  onClose?: () => void
}

export function EmailPreview({ onClose }: EmailPreviewProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<string>("confirmation")

  const sampleData = {
    confirmationNumber: "APT-123456",
    customerName: "John Doe",
    customerEmail: "john.doe@example.com",
    customerPhone: "+1 (555) 123-4567",
    date: "Friday, December 15, 2024",
    time: "2:00 PM",
    serviceType: "Initial Consultation",
    duration: "30 minutes",
    notes: "Looking to discuss business expansion strategies and market analysis for the upcoming quarter.",
    businessName: "Professional Business Consulting",
    businessAddress: "123 Business Ave, Suite 100, San Francisco, CA 94105",
    businessPhone: "+1 (555) 987-6543",
    businessEmail: "info@businessconsulting.com",
  }

  const templates = {
    confirmation: {
      name: "Appointment Confirmation",
      description: "Sent to customers when they book an appointment",
      component: <AppointmentConfirmationTemplate appointmentData={sampleData} />,
    },
    reminder: {
      name: "Appointment Reminder",
      description: "Sent 24 hours before the appointment",
      component: <AppointmentReminderTemplate appointmentData={sampleData} />,
    },
    admin: {
      name: "Admin Notification",
      description: "Sent to business owners for new bookings",
      component: <NewBookingNotificationTemplate appointmentData={sampleData} />,
    },
  }

  const currentTemplate = templates[selectedTemplate as keyof typeof templates]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Email Template Preview</h2>
          <p className="text-muted-foreground">Preview and test your email templates with sample data</p>
        </div>
        {onClose && (
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      <div className="flex items-center gap-4">
        <div className="flex-1">
          <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
            <SelectTrigger>
              <SelectValue placeholder="Select template to preview" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="confirmation">Appointment Confirmation</SelectItem>
              <SelectItem value="reminder">Appointment Reminder</SelectItem>
              <SelectItem value="admin">Admin Notification</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button variant="outline" className="bg-transparent">
          <Send className="h-4 w-4 mr-2" />
          Send Test Email
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5" />
                {currentTemplate.name}
              </CardTitle>
              <CardDescription>{currentTemplate.description}</CardDescription>
            </div>
            <Badge variant="secondary">Preview Mode</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg overflow-hidden">
            <div className="bg-gray-100 p-3 border-b text-sm text-gray-600">
              <div className="flex items-center justify-between">
                <span>
                  <strong>From:</strong> Professional Business Consulting &lt;noreply@businessconsulting.com&gt;
                </span>
                <span>
                  <strong>To:</strong> {sampleData.customerEmail}
                </span>
              </div>
              <div className="mt-1">
                <strong>Subject:</strong>{" "}
                {selectedTemplate === "confirmation" && `Appointment Confirmation - ${sampleData.confirmationNumber}`}
                {selectedTemplate === "reminder" && `Appointment Reminder - Tomorrow at ${sampleData.time}`}
                {selectedTemplate === "admin" && `New Appointment Booked - ${sampleData.confirmationNumber}`}
              </div>
            </div>
            <div className="max-h-[600px] overflow-y-auto">{currentTemplate.component}</div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
