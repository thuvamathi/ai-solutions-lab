import { EmailService } from "@/components/email/email-service"

export default function EmailsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <EmailService />
      </div>
    </div>
  )
}
