-- Add unique constraint to prevent duplicate appointments
-- This will prevent multiple appointments for the same conversation, date, and time

-- First, let's add a unique constraint for same conversation, same date/time
-- This prevents a user from booking multiple appointments at the same time
ALTER TABLE appointments 
ADD CONSTRAINT unique_conversation_appointment 
UNIQUE (conversation_id, appointment_date, appointment_time);

-- Also add an index for better performance when checking for existing appointments
CREATE INDEX IF NOT EXISTS idx_appointments_conversation_status 
ON appointments (conversation_id, status);

CREATE INDEX IF NOT EXISTS idx_appointments_business_date 
ON appointments (business_id, appointment_date, appointment_time);