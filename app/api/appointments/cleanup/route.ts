import { type NextRequest, NextResponse } from "next/server"
import { sql } from "@vercel/postgres"

export async function DELETE(request: NextRequest) {
  try {
    // Get all appointments grouped by conversation_id, customer_email, and appointment_date
    const duplicates = await sql`
      WITH appointment_groups AS (
        SELECT 
          conversation_id,
          customer_email, 
          appointment_date,
          appointment_time,
          COUNT(*) as count,
          MIN(created_at) as first_created,
          ARRAY_AGG(id ORDER BY created_at) as ids
        FROM appointments 
        WHERE status = 'scheduled'
        GROUP BY conversation_id, customer_email, appointment_date, appointment_time
        HAVING COUNT(*) > 1
      )
      SELECT * FROM appointment_groups
    `

    let totalDeleted = 0

    for (const group of duplicates.rows) {
      const ids = group.ids as string[]
      // Keep the first appointment (oldest) and delete the rest
      const idsToDelete = ids.slice(1)
      
      if (idsToDelete.length > 0) {
        await sql`
          DELETE FROM appointments 
          WHERE id = ANY(${idsToDelete})
        `
        totalDeleted += idsToDelete.length
      }
    }

    return NextResponse.json({ 
      message: `Cleanup completed. Removed ${totalDeleted} duplicate appointments.`,
      duplicateGroups: duplicates.rows.length,
      appointmentsDeleted: totalDeleted
    })

  } catch (error) {
    console.error("Error cleaning up appointments:", error)
    return NextResponse.json({ error: "Failed to cleanup appointments" }, { status: 500 })
  }
}