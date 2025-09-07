"use client"

import { useState } from "react"
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

type BookingStep = "calendar" | "time" | "form" | "confirmation"

interface AppointmentBookingProps {
  onClose?: () => void
}

export function AppointmentBooking({ onClose }: AppointmentBookingProps) {
  const [currentStep, setCurrentStep] = useState<BookingStep>("calendar")
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [selectedTime, setSelectedTime] = useState<string>()
  const [bookingData, setBookingData] = useState<BookingData>()

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

  const renderStep = () => {
    switch (currentStep) {
      case "calendar":
        return <AppointmentCalendar selectedDate={selectedDate} onDateSelect={handleDateSelect} />
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
          />
        ) : null
      default:
        return null
    }
  }

  return <div className="w-full max-w-2xl mx-auto">{renderStep()}</div>
}
