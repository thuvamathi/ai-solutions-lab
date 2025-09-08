import { type NextRequest, NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"
import { createAppointment, getAppointmentsByBusiness, getAppointmentsByConversation, updateAppointment } from "@/lib/database"

const sql = neon(process.env.DATABASE_URL!)

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const businessId = searchParams.get("business_id")
    const conversationId = searchParams.get("conversation_id")

    if (conversationId) {
      // Get appointments for a specific conversation
      const appointments = await getAppointmentsByConversation(conversationId)
      return NextResponse.json(appointments)
    } else if (businessId) {
      // Get appointments for a business
      const appointments = await getAppointmentsByBusiness(businessId)
      return NextResponse.json(appointments)
    } else {
      return NextResponse.json({ error: "business_id or conversation_id is required" }, { status: 400 })
    }
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

    // Check for existing appointment with same conversation, date, and time
    if (appointmentData.conversation_id) {
      const existing = await sql`
        SELECT id FROM appointments 
        WHERE conversation_id = ${appointmentData.conversation_id}
        AND appointment_date = ${appointmentData.appointment_date}
        AND appointment_time = ${appointmentData.appointment_time}
        AND status = 'scheduled'
        LIMIT 1
      `
      
      if (existing.length > 0) {
        return NextResponse.json({ 
          error: "An appointment already exists for this time slot",
          existingAppointmentId: existing[0].id 
        }, { status: 409 })
      }
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
    
    // Handle unique constraint violation
    if (error instanceof Error && error.message.includes('unique_conversation_appointment')) {
      return NextResponse.json({ 
        error: "An appointment already exists for this time slot" 
      }, { status: 409 })
    }
    
    return NextResponse.json({ error: "Failed to create appointment" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { appointment_id, ...updates } = await request.json()

    if (!appointment_id) {
      return NextResponse.json({ error: "appointment_id is required" }, { status: 400 })
    }

    const updatedAppointment = await updateAppointment(appointment_id, updates)

    if (!updatedAppointment) {
      return NextResponse.json({ error: "Appointment not found" }, { status: 404 })
    }

    return NextResponse.json(updatedAppointment)
  } catch (error) {
    console.error("Error updating appointment:", error)
    return NextResponse.json({ error: "Failed to update appointment" }, { status: 500 })
  }
}
