import { type NextRequest, NextResponse } from "next/server"
import { createAppointment, getAppointmentsByBusiness } from "@/lib/database"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const businessId = searchParams.get("business_id")

    if (!businessId) {
      return NextResponse.json({ error: "business_id is required" }, { status: 400 })
    }

    const appointments = await getAppointmentsByBusiness(businessId)
    return NextResponse.json(appointments)
  } catch (error) {
    console.error("Error fetching appointments:", error)
    return NextResponse.json({ error: "Failed to fetch appointments" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const appointmentData = await request.json()

    if (!appointmentData.business_id) {
      return NextResponse.json({ error: "business_id is required" }, { status: 400 })
    }

    const appointment = await createAppointment({
      business_id: appointmentData.business_id,
      conversation_id: appointmentData.conversation_id,
      customer_name: appointmentData.customer_name,
      customer_email: appointmentData.customer_email,
      customer_phone: appointmentData.customer_phone,
      service_type: appointmentData.service_type,
      appointment_date: appointmentData.appointment_date,
      appointment_time: appointmentData.appointment_time,
      duration: appointmentData.duration || 60,
      status: appointmentData.status || "scheduled",
      notes: appointmentData.notes,
    })

    return NextResponse.json(appointment, { status: 201 })
  } catch (error) {
    console.error("Error creating appointment:", error)
    return NextResponse.json({ error: "Failed to create appointment" }, { status: 500 })
  }
}
