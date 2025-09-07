"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock } from "lucide-react"
import { cn } from "@/lib/utils"

interface TimeSlot {
  time: string
  available: boolean
  booked?: boolean
}

interface TimeSlotPickerProps {
  selectedDate?: Date
  selectedTime?: string
  onTimeSelect: (time: string) => void
}

export function TimeSlotPicker({ selectedDate, selectedTime, onTimeSelect }: TimeSlotPickerProps) {
  const generateTimeSlots = (): TimeSlot[] => {
    const slots: TimeSlot[] = []
    const startHour = 9 // 9 AM
    const endHour = 17 // 5 PM
    const slotDuration = 30 // 30 minutes

    for (let hour = startHour; hour < endHour; hour++) {
      for (let minute = 0; minute < 60; minute += slotDuration) {
        const time = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`
        const displayTime = new Date(`2000-01-01T${time}`).toLocaleTimeString([], {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        })

        // Simulate some slots being unavailable
        const available = Math.random() > 0.3
        const booked = !available && Math.random() > 0.5

        slots.push({
          time: displayTime,
          available,
          booked,
        })
      }
    }

    return slots
  }

  const timeSlots = generateTimeSlots()
  const morningSlots = timeSlots.filter((slot) => {
    const hour = Number.parseInt(slot.time.split(":")[0])
    const isPM = slot.time.includes("PM")
    return !isPM || (isPM && hour === 12)
  })
  const afternoonSlots = timeSlots.filter((slot) => {
    const hour = Number.parseInt(slot.time.split(":")[0])
    const isPM = slot.time.includes("PM")
    return isPM && hour !== 12
  })

  if (!selectedDate) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Select Time
          </CardTitle>
          <CardDescription>Please select a date first to see available time slots</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            <Clock className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>Choose a date to view available times</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Select Time
        </CardTitle>
        <CardDescription>
          Available times for{" "}
          {selectedDate.toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h4 className="font-medium mb-3 flex items-center gap-2">
            Morning
            <Badge variant="secondary" className="text-xs">
              {morningSlots.filter((slot) => slot.available).length} available
            </Badge>
          </h4>
          <div className="grid grid-cols-3 gap-2">
            {morningSlots.map((slot, index) => (
              <Button
                key={index}
                variant={selectedTime === slot.time ? "default" : "outline"}
                size="sm"
                onClick={() => slot.available && onTimeSelect(slot.time)}
                disabled={!slot.available}
                className={cn(
                  "text-xs",
                  !slot.available && "cursor-not-allowed",
                  slot.booked && "bg-destructive/10 text-destructive border-destructive/20",
                )}
              >
                {slot.time}
              </Button>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-medium mb-3 flex items-center gap-2">
            Afternoon
            <Badge variant="secondary" className="text-xs">
              {afternoonSlots.filter((slot) => slot.available).length} available
            </Badge>
          </h4>
          <div className="grid grid-cols-3 gap-2">
            {afternoonSlots.map((slot, index) => (
              <Button
                key={index}
                variant={selectedTime === slot.time ? "default" : "outline"}
                size="sm"
                onClick={() => slot.available && onTimeSelect(slot.time)}
                disabled={!slot.available}
                className={cn(
                  "text-xs",
                  !slot.available && "cursor-not-allowed",
                  slot.booked && "bg-destructive/10 text-destructive border-destructive/20",
                )}
              >
                {slot.time}
              </Button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs text-muted-foreground pt-4 border-t">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-primary rounded-full" />
            <span>Available</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-destructive rounded-full" />
            <span>Booked</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-muted-foreground/50 rounded-full" />
            <span>Unavailable</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
