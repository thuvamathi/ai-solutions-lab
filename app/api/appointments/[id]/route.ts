import { type NextRequest, NextResponse } from "next/server"
import { storage } from "@/lib/storage"

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const appointmentData = await request.json()
    const appointments = storage.getAppointments()
    const existingAppointment = appointments.find((a) => a.id === params.id)

    if (!existingAppointment) {
      return NextResponse.json({ error: "Appointment not found" }, { status: 404 })
    }

    const updatedAppointment = {
      ...existingAppointment,
      ...appointmentData,
      updatedAt: new Date(),
    }

    storage.saveAppointment(updatedAppointment)

    return NextResponse.json(updatedAppointment)
  } catch (error) {
    return NextResponse.json({ error: "Failed to update appointment" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    storage.deleteAppointment(params.id)
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete appointment" }, { status: 500 })
  }
}
