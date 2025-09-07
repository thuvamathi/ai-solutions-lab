import { type NextRequest, NextResponse } from "next/server"
import { storage } from "@/lib/storage"
import type { Appointment } from "@/lib/types"

export async function GET() {
  try {
    const appointments = storage.getAppointments()
    return NextResponse.json(appointments)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch appointments" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const appointmentData = await request.json()

    const appointment: Appointment = {
      id: Date.now().toString(),
      ...appointmentData,
      status: "scheduled",
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    storage.saveAppointment(appointment)

    return NextResponse.json(appointment, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create appointment" }, { status: 500 })
  }
}
