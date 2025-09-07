"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { CheckCircle, Calendar, Clock, User, MessageSquare, Download, Mail } from "lucide-react"

interface BookingData {
  firstName: string
  lastName: string
  email: string
  phone: string
  serviceType: string
  notes: string
  date: Date
  time: string
}

interface BookingConfirmationProps {
  bookingData: BookingData
  onNewBooking: () => void
  onClose: () => void
}

export function BookingConfirmation({ bookingData, onNewBooking, onClose }: BookingConfirmationProps) {
  const serviceTypeLabels: Record<string, string> = {
    consultation: "Initial Consultation (30 min)",
    "business-planning": "Business Planning (60 min)",
    "financial-review": "Financial Review (45 min)",
    "strategy-session": "Strategy Session (90 min)",
    "follow-up": "Follow-up Meeting (30 min)",
  }

  const confirmationNumber = `APT-${Date.now().toString().slice(-6)}`

  useEffect(() => {
    // Simulate email sending
    const sendConfirmationEmail = async () => {
      console.log("[v0] Sending confirmation email to:", bookingData.email)
      console.log("[v0] Appointment details:", {
        confirmationNumber,
        customerName: `${bookingData.firstName} ${bookingData.lastName}`,
        date: bookingData.date.toLocaleDateString(),
        time: bookingData.time,
        service: serviceTypeLabels[bookingData.serviceType],
      })

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000))
      console.log("[v0] Confirmation email sent successfully")

      // Also send admin notification
      console.log("[v0] Sending admin notification email")
      await new Promise((resolve) => setTimeout(resolve, 500))
      console.log("[v0] Admin notification sent successfully")
    }

    sendConfirmationEmail()
  }, [bookingData, confirmationNumber, serviceTypeLabels])

  return (
    <Card>
      <CardHeader className="text-center">
        <div className="mx-auto mb-4 w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>
        <CardTitle className="text-2xl">Appointment Confirmed!</CardTitle>
        <CardDescription>
          Your appointment has been successfully booked. You'll receive a confirmation email shortly.
        </CardDescription>
        <Badge variant="secondary" className="w-fit mx-auto mt-2">
          Confirmation #{confirmationNumber}
        </Badge>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-muted/50 p-4 rounded-lg space-y-3">
          <div className="flex items-center gap-3">
            <Calendar className="h-5 w-5 text-primary" />
            <div>
              <p className="font-medium">
                {bookingData.date.toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <p className="text-sm text-muted-foreground">Date</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Clock className="h-5 w-5 text-primary" />
            <div>
              <p className="font-medium">{bookingData.time}</p>
              <p className="text-sm text-muted-foreground">Time</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <MessageSquare className="h-5 w-5 text-primary" />
            <div>
              <p className="font-medium">{serviceTypeLabels[bookingData.serviceType]}</p>
              <p className="text-sm text-muted-foreground">Service</p>
            </div>
          </div>
        </div>

        <Separator />

        <div className="space-y-3">
          <h4 className="font-medium flex items-center gap-2">
            <User className="h-4 w-4" />
            Contact Information
          </h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Name:</span>
              <span>
                {bookingData.firstName} {bookingData.lastName}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Email:</span>
              <span>{bookingData.email}</span>
            </div>
            {bookingData.phone && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Phone:</span>
                <span>{bookingData.phone}</span>
              </div>
            )}
          </div>
        </div>

        {bookingData.notes && (
          <>
            <Separator />
            <div className="space-y-2">
              <h4 className="font-medium">Additional Notes</h4>
              <p className="text-sm text-muted-foreground bg-muted/50 p-3 rounded">{bookingData.notes}</p>
            </div>
          </>
        )}

        <Separator />

        <div className="space-y-3">
          <h4 className="font-medium flex items-center gap-2">
            <Mail className="h-4 w-4" />
            Email Notifications
          </h4>
          <div className="space-y-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>Confirmation email sent to {bookingData.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>Admin notification sent</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-blue-500" />
              <span>Reminder email will be sent 24 hours before appointment</span>
            </div>
          </div>
        </div>

        <Separator />

        <div className="space-y-3">
          <h4 className="font-medium">What's Next?</h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• You'll receive a confirmation email with calendar invite</li>
            <li>• We'll send a reminder 24 hours before your appointment</li>
            <li>• If you need to reschedule, please contact us at least 24 hours in advance</li>
            <li>• Prepare any questions or materials you'd like to discuss</li>
          </ul>
        </div>

        <div className="flex gap-3 pt-4">
          <Button variant="outline" onClick={onNewBooking} className="flex-1 bg-transparent">
            Book Another
          </Button>
          <Button onClick={onClose} className="flex-1">
            Done
          </Button>
        </div>

        <Button variant="ghost" size="sm" className="w-full">
          <Download className="h-4 w-4 mr-2" />
          Add to Calendar
        </Button>
      </CardContent>
    </Card>
  )
}
