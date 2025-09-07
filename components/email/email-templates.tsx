"use client"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, User, MapPin, Phone, Mail } from "lucide-react"

interface AppointmentData {
  confirmationNumber: string
  customerName: string
  customerEmail: string
  customerPhone?: string
  date: string
  time: string
  serviceType: string
  duration: string
  notes?: string
  businessName: string
  businessAddress: string
  businessPhone: string
  businessEmail: string
}

interface EmailTemplateProps {
  appointmentData: AppointmentData
}

export function AppointmentConfirmationTemplate({ appointmentData }: EmailTemplateProps) {
  return (
    <div className="max-w-2xl mx-auto bg-[#f8f8f8] text-gray-900 font-sans">
      {/* Header */}
      <div className="bg-black text-white p-8 text-center">
        <h1 className="text-2xl font-light mb-2">APPOINTMENT CONFIRMED</h1>
        <p className="text-gray-300 text-sm">YOUR APPOINTMENT HAS BEEN SUCCESSFULLY BOOKED</p>
      </div>

      {/* Content */}
      <div className="p-8">
        <div className="mb-8">
          <p className="text-lg mb-4 font-light">Hello {appointmentData.customerName},</p>
          <p className="text-gray-600 leading-relaxed text-sm">
            THANK YOU FOR BOOKING AN APPOINTMENT WITH {appointmentData.businessName.toUpperCase()}. WE'RE LOOKING
            FORWARD TO MEETING WITH YOU. HERE ARE YOUR APPOINTMENT DETAILS:
          </p>
        </div>

        {/* Appointment Details */}
        <div className="bg-white/70 backdrop-blur-sm border border-gray-200 rounded-lg p-6 mb-8">
          <h2 className="text-lg font-normal mb-6 flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            APPOINTMENT DETAILS
          </h2>

          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Calendar className="h-4 w-4 text-gray-500" />
              <div>
                <span className="font-normal text-sm">DATE:</span>{" "}
                <span className="text-sm">{appointmentData.date}</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Clock className="h-4 w-4 text-gray-500" />
              <div>
                <span className="font-normal text-sm">TIME:</span>{" "}
                <span className="text-sm">
                  {appointmentData.time} ({appointmentData.duration})
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <User className="h-4 w-4 text-gray-500" />
              <div>
                <span className="font-normal text-sm">SERVICE:</span>{" "}
                <span className="text-sm">{appointmentData.serviceType}</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Badge className="bg-black text-white border-black text-xs">#{appointmentData.confirmationNumber}</Badge>
            </div>
          </div>

          {appointmentData.notes && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <span className="font-normal text-sm">NOTES:</span>
              <p className="text-gray-600 mt-2 text-sm">{appointmentData.notes}</p>
            </div>
          )}
        </div>

        {/* Business Information */}
        <div className="bg-white/50 backdrop-blur-sm border border-gray-200 rounded-lg p-6 mb-8">
          <h2 className="text-lg font-normal mb-4">CONTACT INFORMATION</h2>
          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-3">
              <MapPin className="h-4 w-4" />
              <span>{appointmentData.businessAddress}</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="h-4 w-4" />
              <span>{appointmentData.businessPhone}</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="h-4 w-4" />
              <span>{appointmentData.businessEmail}</span>
            </div>
          </div>
        </div>

        {/* What to Expect */}
        <div className="mb-8">
          <h2 className="text-lg font-normal mb-4">WHAT TO EXPECT</h2>
          <ul className="text-gray-600 space-y-2 text-sm">
            <li>• You'll receive a reminder email 24 hours before your appointment</li>
            <li>• Please arrive 10 minutes early to complete any necessary paperwork</li>
            <li>• If you need to reschedule, please contact us at least 24 hours in advance</li>
            <li>• Bring any relevant documents or questions you'd like to discuss</li>
          </ul>
        </div>

        {/* CTA Buttons */}
        <div className="flex gap-4 mb-8">
          <a
            href="#"
            className="bg-black text-white px-8 py-3 rounded-full font-normal text-sm hover:bg-gray-800 transition-colors"
          >
            ADD TO CALENDAR
          </a>
          <a
            href="#"
            className="border border-black text-black px-8 py-3 rounded-full font-normal text-sm hover:bg-black hover:text-white transition-colors"
          >
            RESCHEDULE
          </a>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-white/30 p-6 text-center text-xs text-gray-600">
        <p className="mb-2">
          This email was sent by {appointmentData.businessName}. If you have any questions, please contact us at{" "}
          {appointmentData.businessEmail}.
        </p>
        <p>
          <a href="#" className="hover:text-black transition-colors">
            Unsubscribe
          </a>{" "}
          |{" "}
          <a href="#" className="hover:text-black transition-colors">
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  )
}

export function AppointmentReminderTemplate({ appointmentData }: EmailTemplateProps) {
  return (
    <div className="max-w-2xl mx-auto bg-[#f8f8f8] text-gray-900 font-sans">
      {/* Header */}
      <div className="bg-gray-800 text-white p-8 text-center">
        <h1 className="text-2xl font-light mb-2">APPOINTMENT REMINDER</h1>
        <p className="text-gray-300 text-sm">YOUR APPOINTMENT IS COMING UP SOON</p>
      </div>

      {/* Content */}
      <div className="p-8">
        <div className="mb-8">
          <p className="text-lg mb-4 font-light">Hello {appointmentData.customerName},</p>
          <p className="text-gray-600 leading-relaxed text-sm">
            THIS IS A FRIENDLY REMINDER ABOUT YOUR UPCOMING APPOINTMENT WITH{" "}
            {appointmentData.businessName.toUpperCase()} TOMORROW.
          </p>
        </div>

        {/* Appointment Details */}
        <div className="bg-white/70 backdrop-blur-sm border border-gray-200 rounded-lg p-6 mb-8">
          <h2 className="text-lg font-normal mb-6 flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            TOMORROW'S APPOINTMENT
          </h2>

          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Calendar className="h-4 w-4 text-gray-500" />
              <div>
                <span className="font-normal text-sm">DATE:</span>{" "}
                <span className="text-sm">{appointmentData.date}</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Clock className="h-4 w-4 text-gray-500" />
              <div>
                <span className="font-normal text-sm">TIME:</span>{" "}
                <span className="text-sm">
                  {appointmentData.time} ({appointmentData.duration})
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <User className="h-4 w-4 text-gray-500" />
              <div>
                <span className="font-normal text-sm">SERVICE:</span>{" "}
                <span className="text-sm">{appointmentData.serviceType}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Preparation */}
        <div className="mb-8">
          <h2 className="text-lg font-normal mb-4">PLEASE REMEMBER</h2>
          <ul className="text-gray-600 space-y-2 text-sm">
            <li>• Arrive 10 minutes early</li>
            <li>• Bring any relevant documents</li>
            <li>• Prepare your questions in advance</li>
            <li>• Contact us if you need to reschedule</li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="bg-white/50 backdrop-blur-sm border border-gray-200 rounded-lg p-4 mb-8">
          <h3 className="font-normal mb-3 text-sm">NEED TO MAKE CHANGES?</h3>
          <p className="text-gray-600 text-xs mb-4">
            If you need to reschedule or cancel, please contact us at least 24 hours in advance.
          </p>
          <div className="flex items-center gap-6 text-xs">
            <span className="flex items-center gap-2">
              <Phone className="h-3 w-3" />
              {appointmentData.businessPhone}
            </span>
            <span className="flex items-center gap-2">
              <Mail className="h-3 w-3" />
              {appointmentData.businessEmail}
            </span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-white/30 p-6 text-center text-xs text-gray-600">
        <p>
          <a href="#" className="hover:text-black transition-colors">
            Unsubscribe
          </a>{" "}
          from appointment reminders
        </p>
      </div>
    </div>
  )
}

export function NewBookingNotificationTemplate({ appointmentData }: EmailTemplateProps) {
  return (
    <div className="max-w-2xl mx-auto bg-[#f8f8f8] text-gray-900 font-sans">
      {/* Header */}
      <div className="bg-gray-900 text-white p-8 text-center">
        <h1 className="text-2xl font-light mb-2">NEW APPOINTMENT BOOKED</h1>
        <p className="text-gray-300 text-sm">A CUSTOMER HAS SCHEDULED AN APPOINTMENT</p>
      </div>

      {/* Content */}
      <div className="p-8">
        <div className="mb-8">
          <p className="text-lg mb-4 font-light">New Appointment Alert</p>
          <p className="text-gray-600 leading-relaxed text-sm">
            A NEW APPOINTMENT HAS BEEN BOOKED THROUGH YOUR RECEPTIONISTAI SYSTEM. HERE ARE THE DETAILS:
          </p>
        </div>

        {/* Customer Details */}
        <div className="bg-white/70 backdrop-blur-sm border border-gray-200 rounded-lg p-6 mb-6">
          <h2 className="text-lg font-normal mb-6 flex items-center gap-2">
            <User className="h-5 w-5" />
            CUSTOMER INFORMATION
          </h2>

          <div className="space-y-3 text-sm">
            <div>
              <span className="font-normal">NAME:</span> {appointmentData.customerName}
            </div>
            <div>
              <span className="font-normal">EMAIL:</span> {appointmentData.customerEmail}
            </div>
            {appointmentData.customerPhone && (
              <div>
                <span className="font-normal">PHONE:</span> {appointmentData.customerPhone}
              </div>
            )}
          </div>
        </div>

        {/* Appointment Details */}
        <div className="bg-white/50 backdrop-blur-sm border border-gray-200 rounded-lg p-6 mb-6">
          <h2 className="text-lg font-normal mb-6 flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            APPOINTMENT DETAILS
          </h2>

          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Calendar className="h-4 w-4 text-gray-500" />
              <div>
                <span className="font-normal text-sm">DATE:</span>{" "}
                <span className="text-sm">{appointmentData.date}</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Clock className="h-4 w-4 text-gray-500" />
              <div>
                <span className="font-normal text-sm">TIME:</span>{" "}
                <span className="text-sm">
                  {appointmentData.time} ({appointmentData.duration})
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <User className="h-4 w-4 text-gray-500" />
              <div>
                <span className="font-normal text-sm">SERVICE:</span>{" "}
                <span className="text-sm">{appointmentData.serviceType}</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Badge className="bg-black text-white border-black text-xs">#{appointmentData.confirmationNumber}</Badge>
            </div>
          </div>

          {appointmentData.notes && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <span className="font-normal text-sm">CUSTOMER NOTES:</span>
              <p className="text-gray-600 mt-2 bg-yellow-50 p-4 rounded border-l-4 border-yellow-400 text-sm">
                {appointmentData.notes}
              </p>
            </div>
          )}
        </div>

        {/* Action Items */}
        <div className="bg-white/30 backdrop-blur-sm border border-gray-200 rounded-lg p-6 mb-6">
          <h2 className="text-lg font-normal mb-4">NEXT STEPS</h2>
          <ul className="text-gray-600 space-y-2 text-sm">
            <li>• Review the appointment details and customer notes</li>
            <li>• Prepare any materials needed for the consultation</li>
            <li>• The customer will receive automatic confirmation and reminder emails</li>
            <li>• Contact the customer directly if you need to make any changes</li>
          </ul>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-white/30 p-6 text-center text-xs text-gray-600">
        <p>
          This notification was sent by ReceptionistAI. Manage your notification preferences in your admin dashboard.
        </p>
      </div>
    </div>
  )
}
