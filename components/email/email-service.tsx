"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Mail, Settings, Eye, Clock, CheckCircle, AlertCircle } from "lucide-react"

interface EmailSettings {
  fromName: string
  fromEmail: string
  replyTo: string
  enableConfirmations: boolean
  enableReminders: boolean
  enableAdminNotifications: boolean
  reminderHours: number
}

interface EmailLog {
  id: string
  type: "confirmation" | "reminder" | "admin_notification"
  recipient: string
  subject: string
  status: "sent" | "delivered" | "failed"
  sentAt: Date
  appointmentId: string
}

export function EmailService() {
  const [settings, setSettings] = useState<EmailSettings>({
    fromName: "ReceptionistAI",
    fromEmail: "noreply@receptionistai.com",
    replyTo: "support@receptionistai.com",
    enableConfirmations: true,
    enableReminders: true,
    enableAdminNotifications: true,
    reminderHours: 24,
  })

  const [emailLogs] = useState<EmailLog[]>([
    {
      id: "1",
      type: "confirmation",
      recipient: "john.doe@example.com",
      subject: "Appointment Confirmation - APT-123456",
      status: "delivered",
      sentAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
      appointmentId: "APT-123456",
    },
    {
      id: "2",
      type: "admin_notification",
      recipient: "admin@business.com",
      subject: "New Appointment Booked - APT-123456",
      status: "delivered",
      sentAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
      appointmentId: "APT-123456",
    },
    {
      id: "3",
      type: "reminder",
      recipient: "jane.smith@example.com",
      subject: "Appointment Reminder - Tomorrow at 2:00 PM",
      status: "sent",
      sentAt: new Date(Date.now() - 30 * 60 * 1000),
      appointmentId: "APT-789012",
    },
  ])

  const handleSettingsChange = (field: keyof EmailSettings, value: any) => {
    setSettings((prev) => ({ ...prev, [field]: value }))
  }

  const getStatusIcon = (status: EmailLog["status"]) => {
    switch (status) {
      case "sent":
        return <Clock className="h-4 w-4 text-blue-500" />
      case "delivered":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "failed":
        return <AlertCircle className="h-4 w-4 text-red-500" />
    }
  }

  const getStatusColor = (status: EmailLog["status"]) => {
    switch (status) {
      case "sent":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "delivered":
        return "bg-green-100 text-green-800 border-green-200"
      case "failed":
        return "bg-red-100 text-red-800 border-red-200"
    }
  }

  const getTypeLabel = (type: EmailLog["type"]) => {
    switch (type) {
      case "confirmation":
        return "Confirmation"
      case "reminder":
        return "Reminder"
      case "admin_notification":
        return "Admin Alert"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Email Notifications</h1>
          <p className="text-muted-foreground">
            Manage automated email notifications for appointments and customer communications.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="flex items-center gap-1">
            <Mail className="h-3 w-3" />
            {emailLogs.filter((log) => log.status === "delivered").length} Delivered Today
          </Badge>
        </div>
      </div>

      <Tabs defaultValue="settings" className="space-y-6">
        <TabsList>
          <TabsTrigger value="settings" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Settings
          </TabsTrigger>
          <TabsTrigger value="logs" className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            Email Logs
          </TabsTrigger>
          <TabsTrigger value="templates" className="flex items-center gap-2">
            <Eye className="h-4 w-4" />
            Templates
          </TabsTrigger>
        </TabsList>

        <TabsContent value="settings" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Email Configuration</CardTitle>
                <CardDescription>Configure your email sending settings and sender information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fromName">From Name</Label>
                  <Input
                    id="fromName"
                    value={settings.fromName}
                    onChange={(e) => handleSettingsChange("fromName", e.target.value)}
                    placeholder="Your Business Name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fromEmail">From Email</Label>
                  <Input
                    id="fromEmail"
                    type="email"
                    value={settings.fromEmail}
                    onChange={(e) => handleSettingsChange("fromEmail", e.target.value)}
                    placeholder="noreply@yourbusiness.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="replyTo">Reply-To Email</Label>
                  <Input
                    id="replyTo"
                    type="email"
                    value={settings.replyTo}
                    onChange={(e) => handleSettingsChange("replyTo", e.target.value)}
                    placeholder="support@yourbusiness.com"
                  />
                </div>

                <Button className="w-full">Save Configuration</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>Control which automated emails are sent to customers and admins</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Appointment Confirmations</Label>
                    <p className="text-sm text-muted-foreground">
                      Send confirmation emails when appointments are booked
                    </p>
                  </div>
                  <Switch
                    checked={settings.enableConfirmations}
                    onCheckedChange={(checked) => handleSettingsChange("enableConfirmations", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Appointment Reminders</Label>
                    <p className="text-sm text-muted-foreground">Send reminder emails before appointments</p>
                  </div>
                  <Switch
                    checked={settings.enableReminders}
                    onCheckedChange={(checked) => handleSettingsChange("enableReminders", checked)}
                  />
                </div>

                {settings.enableReminders && (
                  <div className="space-y-2 ml-4">
                    <Label htmlFor="reminderHours">Reminder Timing (hours before)</Label>
                    <Input
                      id="reminderHours"
                      type="number"
                      value={settings.reminderHours}
                      onChange={(e) => handleSettingsChange("reminderHours", Number.parseInt(e.target.value))}
                      min="1"
                      max="168"
                    />
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Admin Notifications</Label>
                    <p className="text-sm text-muted-foreground">Notify admins when new appointments are booked</p>
                  </div>
                  <Switch
                    checked={settings.enableAdminNotifications}
                    onCheckedChange={(checked) => handleSettingsChange("enableAdminNotifications", checked)}
                  />
                </div>

                <Button className="w-full">Save Settings</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="logs" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Email Activity Log</CardTitle>
              <CardDescription>Track all automated emails sent by the system</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {emailLogs.map((log) => (
                  <div key={log.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      {getStatusIcon(log.status)}
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium">{log.subject}</span>
                          <Badge variant="outline" className="text-xs">
                            {getTypeLabel(log.type)}
                          </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          To: {log.recipient} • {log.sentAt.toLocaleString()}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getStatusColor(log.status)}>{log.status}</Badge>
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates" className="space-y-6">
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Appointment Confirmation</CardTitle>
                <CardDescription>Sent immediately when a customer books an appointment</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-sm text-muted-foreground">
                    <p>• Appointment details</p>
                    <p>• Business contact information</p>
                    <p>• Calendar integration</p>
                    <p>• Preparation instructions</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                      <Eye className="h-4 w-4 mr-2" />
                      Preview
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                      Edit
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Appointment Reminder</CardTitle>
                <CardDescription>Sent 24 hours before the scheduled appointment</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-sm text-muted-foreground">
                    <p>• Upcoming appointment details</p>
                    <p>• Preparation checklist</p>
                    <p>• Contact information</p>
                    <p>• Reschedule options</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                      <Eye className="h-4 w-4 mr-2" />
                      Preview
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                      Edit
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Admin Notification</CardTitle>
                <CardDescription>Sent to business owners when new appointments are booked</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-sm text-muted-foreground">
                    <p>• Customer information</p>
                    <p>• Appointment details</p>
                    <p>• Customer notes</p>
                    <p>• Action items</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                      <Eye className="h-4 w-4 mr-2" />
                      Preview
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                      Edit
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
