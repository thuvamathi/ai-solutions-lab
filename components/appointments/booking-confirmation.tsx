"use client"

import { useEffect, useState } from "react"
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
  businessId?: string
  conversationId?: string
  isRescheduling?: boolean
  existingAppointmentId?: string
}

const serviceTypeLabels: Record<string, string> = {
  consultation: "Initial Consultation (30 min)",
  "business-planning": "Business Planning (60 min)",
  "financial-review": "Financial Review (45 min)",
  "strategy-session": "Strategy Session (90 min)",
  "follow-up": "Follow-up Meeting (30 min)",
}

export function BookingConfirmation({ bookingData, onNewBooking, onClose, businessId, conversationId, isRescheduling, existingAppointmentId }: BookingConfirmationProps) {
  const [confirmationNumber, setConfirmationNumber] = useState<string>('')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string>('')
  const [hasAttemptedSave, setHasAttemptedSave] = useState(false)

  useEffect(() => {
    // Prevent multiple saves for the same booking data
    if (hasAttemptedSave) return
    
    const saveAppointmentAndSendEmails = async () => {
      try {
        setHasAttemptedSave(true)
        setIsLoading(true)
        setError('')

        // Save or update appointment in database
        if (businessId) {
          if (isRescheduling && existingAppointmentId) {
            // Update existing appointment
            const updateData = {
              appointment_id: existingAppointmentId,
              appointment_date: bookingData.date.toISOString().split('T')[0],
              appointment_time: bookingData.time,
              service_type: bookingData.serviceType,
              duration: getServiceDuration(bookingData.serviceType),
              updated_at: new Date().toISOString()
            }

            const response = await fetch('/api/appointments', {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(updateData)
            })

            if (response.ok) {
              const updatedAppointment = await response.json()
              setConfirmationNumber(`APT-${updatedAppointment.id.slice(-6).toUpperCase()}`)
            } else {
              throw new Error('Failed to reschedule appointment')
            }
          } else {
            // Create new appointment
            const appointmentData = {
              business_id: businessId,
              conversation_id: conversationId,
              customer_name: `${bookingData.firstName} ${bookingData.lastName}`,
              customer_email: bookingData.email,
              customer_phone: bookingData.phone || null,
              service_type: bookingData.serviceType,
              appointment_date: bookingData.date.toISOString().split('T')[0], // Format as YYYY-MM-DD
              appointment_time: bookingData.time,
              duration: getServiceDuration(bookingData.serviceType),
              status: 'scheduled',
              notes: bookingData.notes || null
            }

            const response = await fetch('/api/appointments', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(appointmentData)
            })

            if (response.ok) {
              const savedAppointment = await response.json()
              setConfirmationNumber(`APT-${savedAppointment.id.slice(-6).toUpperCase()}`)
            } else if (response.status === 409) {
              // Duplicate appointment - this is actually fine, just use existing
              const errorData = await response.json()
              if (errorData.existingAppointmentId) {
                setConfirmationNumber(`APT-${errorData.existingAppointmentId.slice(-6).toUpperCase()}`)
              } else {
                setConfirmationNumber(`APT-${Date.now().toString().slice(-6)}`)
              }
            } else {
              throw new Error('Failed to save appointment')
            }
          }
        } else {
          // Fallback confirmation number if no businessId
          setConfirmationNumber(`APT-${Date.now().toString().slice(-6)}`)
        }

        // Simulate email sending
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

      } catch (error) {
        console.error('Error saving appointment:', error)
        setError('Failed to save appointment. Please contact us directly.')
        setConfirmationNumber(`APT-${Date.now().toString().slice(-6)}`)
      } finally {
        setIsLoading(false)
      }
    }

    saveAppointmentAndSendEmails()
  }, [bookingData, businessId, conversationId, isRescheduling, existingAppointmentId, hasAttemptedSave])

  const getServiceDuration = (serviceType: string): number => {
    const durations: Record<string, number> = {
      consultation: 30,
      "business-planning": 60,
      "financial-review": 45,
      "strategy-session": 90,
      "follow-up": 30,
    }
    return durations[serviceType] || 60
  }

  return (
    <Card>
      <CardHeader className="text-center">
        <div className="mx-auto mb-4 w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>
        <CardTitle className="text-2xl">
          {isRescheduling ? 'Appointment Rescheduled!' : 'Appointment Confirmed!'}
        </CardTitle>
        <CardDescription>
          {isRescheduling 
            ? 'Your appointment has been successfully rescheduled. You\'ll receive an updated confirmation email shortly.'
            : 'Your appointment has been successfully booked. You\'ll receive a confirmation email shortly.'
          }
        </CardDescription>
        <Badge variant="secondary" className="w-fit mx-auto mt-2">
          {isLoading ? 'Processing...' : `Confirmation #${confirmationNumber}`}
        </Badge>
        {error && (
          <p className="text-sm text-red-600 mt-2">{error}</p>
        )}
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
