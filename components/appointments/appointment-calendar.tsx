"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react"
import { cn } from "@/lib/utils"

interface CalendarDay {
  date: Date
  isCurrentMonth: boolean
  isToday: boolean
  isSelected: boolean
  isAvailable: boolean
  hasAppointments: boolean
}

interface AppointmentCalendarProps {
  selectedDate?: Date
  onDateSelect: (date: Date) => void
  availableDates?: Date[]
}

export function AppointmentCalendar({ selectedDate, onDateSelect, availableDates = [] }: AppointmentCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date())

  const today = new Date()
  const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1)
  const lastDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0)
  const firstDayOfWeek = firstDayOfMonth.getDay()
  const daysInMonth = lastDayOfMonth.getDate()

  const previousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))
  }

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))
  }

  const isDateAvailable = (date: Date) => {
    // Don't allow past dates
    if (date < today) return false

    // Don't allow weekends for demo (can be configured)
    const dayOfWeek = date.getDay()
    if (dayOfWeek === 0 || dayOfWeek === 6) return false

    return true
  }

  const generateCalendarDays = (): CalendarDay[] => {
    const days: CalendarDay[] = []

    // Previous month's trailing days
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      const date = new Date(firstDayOfMonth)
      date.setDate(date.getDate() - (i + 1))
      days.push({
        date,
        isCurrentMonth: false,
        isToday: false,
        isSelected: false,
        isAvailable: false,
        hasAppointments: false,
      })
    }

    // Current month's days
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
      const isToday = date.toDateString() === today.toDateString()
      const isSelected = selectedDate?.toDateString() === date.toDateString()
      const isAvailable = isDateAvailable(date)

      days.push({
        date,
        isCurrentMonth: true,
        isToday,
        isSelected,
        isAvailable,
        hasAppointments: Math.random() > 0.7, // Random for demo
      })
    }

    // Next month's leading days
    const remainingDays = 42 - days.length // 6 weeks * 7 days
    for (let day = 1; day <= remainingDays; day++) {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, day)
      days.push({
        date,
        isCurrentMonth: false,
        isToday: false,
        isSelected: false,
        isAvailable: false,
        hasAppointments: false,
      })
    }

    return days
  }

  const calendarDays = generateCalendarDays()
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Select Date
            </CardTitle>
            <CardDescription>Choose an available date for your appointment</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={previousMonth}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm font-medium min-w-[120px] text-center">
              {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
            </span>
            <Button variant="outline" size="sm" onClick={nextMonth}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-1 mb-4">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="text-center text-sm font-medium text-muted-foreground p-2">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {calendarDays.map((day, index) => (
            <Button
              key={index}
              variant="ghost"
              size="sm"
              onClick={() => day.isAvailable && day.isCurrentMonth && onDateSelect(day.date)}
              disabled={!day.isAvailable || !day.isCurrentMonth}
              className={cn(
                "h-10 p-0 font-normal relative",
                !day.isCurrentMonth && "text-muted-foreground/50",
                day.isToday && "bg-accent text-accent-foreground",
                day.isSelected && "bg-primary text-primary-foreground hover:bg-primary/90",
                day.isAvailable && day.isCurrentMonth && "hover:bg-accent hover:text-accent-foreground",
                !day.isAvailable && "cursor-not-allowed opacity-50",
              )}
            >
              {day.date.getDate()}
              {day.hasAppointments && day.isCurrentMonth && (
                <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full" />
              )}
            </Button>
          ))}
        </div>
        <div className="flex items-center gap-4 mt-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-primary rounded-full" />
            <span>Available</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-muted-foreground/50 rounded-full" />
            <span>Unavailable</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-accent rounded-full" />
            <span>Today</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
