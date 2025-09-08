"use client"

import { useState, useEffect } from "react"
import { AppointmentCalendar } from "./appointment-calendar"
import { TimeSlotPicker } from "./time-slot-picker"
import { BookingForm } from "./booking-form"
import { BookingConfirmation } from "./booking-confirmation"

interface BookingFormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  serviceType: string
  notes: string
}

interface BookingData extends BookingFormData {
  date: Date
  time: string
}

interface ExistingAppointment {
  id: string
  customer_name: string
  customer_email: string
  appointment_date: string
  appointment_time: string
  service_type: string
  status: string
}

type BookingStep = "loading" | "existing" | "calendar" | "time" | "form" | "confirmation"

interface AppointmentBookingProps {
  onClose?: () => void
  businessId?: string
  conversationId?: string
}

export function AppointmentBooking({ onClose, businessId, conversationId }: AppointmentBookingProps) {
  const [currentStep, setCurrentStep] = useState<BookingStep>("loading")
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [selectedTime, setSelectedTime] = useState<string>()
  const [bookingData, setBookingData] = useState<BookingData>()
  const [existingAppointment, setExistingAppointment] = useState<ExistingAppointment | null>(null)
  const [isRescheduling, setIsRescheduling] = useState(false)

  // Check for existing appointments on component mount
  useEffect(() => {
    const checkExistingAppointments = async () => {
      if (!conversationId) {
        setCurrentStep("calendar")
        return
      }

      try {
        const response = await fetch(`/api/appointments?conversation_id=${conversationId}`)
        if (response.ok) {
          const appointments = await response.json()
          const activeAppointment = appointments.find((apt: ExistingAppointment) => apt.status === 'scheduled')
          
          if (activeAppointment) {
            setExistingAppointment(activeAppointment)
            setCurrentStep("existing")
          } else {
            setCurrentStep("calendar")
          }
        } else {
          setCurrentStep("calendar")
        }
      } catch (error) {
        console.error('Error checking existing appointments:', error)
        setCurrentStep("calendar")
      }
    }

    checkExistingAppointments()
  }, [conversationId])

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date)
    setCurrentStep("time")
  }

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time)
    setCurrentStep("form")
  }

  const handleFormSubmit = (formData: BookingFormData) => {
    if (selectedDate && selectedTime) {
      const booking: BookingData = {
        ...formData,
        date: selectedDate,
        time: selectedTime,
      }
      setBookingData(booking)
      setCurrentStep("confirmation")
    }
  }

  const handleBackToTime = () => {
    setCurrentStep("time")
  }

  const handleNewBooking = () => {
    setCurrentStep("calendar")
    setSelectedDate(undefined)
    setSelectedTime(undefined)
    setBookingData(undefined)
  }

  const handleReschedule = () => {
    setIsRescheduling(true)
    setCurrentStep("calendar")
  }

  const handleCancelReschedule = () => {
    setIsRescheduling(false)
    setCurrentStep("existing")
    setSelectedDate(undefined)
    setSelectedTime(undefined)
    setBookingData(undefined)
  }

  const renderStep = () => {
    switch (currentStep) {
      case "loading":
        return (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-sm text-muted-foreground">Checking existing appointments...</p>
            </div>
          </div>
        )
      case "existing":
        return existingAppointment ? (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-lg font-medium mb-2">You already have an appointment scheduled</h3>
              <p className="text-sm text-muted-foreground mb-6">
                You can reschedule your existing appointment or close this booking.
              </p>
            </div>
            
            <div className="bg-muted/50 p-4 rounded-lg space-y-3">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Date:</p>
                  <p className="font-medium">
                    {new Date(existingAppointment.appointment_date).toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">Time:</p>
                  <p className="font-medium">{existingAppointment.appointment_time}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Service:</p>
                  <p className="font-medium">{existingAppointment.service_type}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Status:</p>
                  <p className="font-medium capitalize">{existingAppointment.status}</p>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleReschedule}
                className="flex-1 bg-primary text-primary-foreground py-2 px-4 rounded-md hover:bg-primary/90 transition-colors"
              >
                Reschedule Appointment
              </button>
              <button
                onClick={onClose}
                className="flex-1 bg-muted text-muted-foreground py-2 px-4 rounded-md hover:bg-muted/80 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        ) : null
      case "calendar":
        return (
          <div>
            {isRescheduling && (
              <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-700">
                  <span className="font-medium">Rescheduling your appointment</span><br/>
                  Select a new date for your existing appointment.
                  <button 
                    onClick={handleCancelReschedule}
                    className="ml-2 text-blue-600 hover:underline"
                  >
                    Cancel
                  </button>
                </p>
              </div>
            )}
            <AppointmentCalendar selectedDate={selectedDate} onDateSelect={handleDateSelect} />
          </div>
        )
      case "time":
        return (
          <TimeSlotPicker selectedDate={selectedDate} selectedTime={selectedTime} onTimeSelect={handleTimeSelect} />
        )
      case "form":
        return (
          <BookingForm
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            onSubmit={handleFormSubmit}
            onBack={handleBackToTime}
          />
        )
      case "confirmation":
        return bookingData ? (
          <BookingConfirmation
            bookingData={bookingData}
            onNewBooking={handleNewBooking}
            onClose={onClose || (() => {})}
            businessId={businessId}
            conversationId={conversationId}
            isRescheduling={isRescheduling}
            existingAppointmentId={existingAppointment?.id}
          />
        ) : null
      default:
        return null
    }
  }

  return <div className="w-full max-w-2xl mx-auto">{renderStep()}</div>
}
