"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, Calendar, FileText, BarChart3, Clock, CheckCircle, AlertCircle } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-[#f8f8f8]">
      <header className="flex items-center justify-between p-6 border-b border-gray-200 bg-white/30">
        <div className="flex items-center gap-4">
          <div className="flex space-x-2">
            <div className="h-2 w-2 rounded-full bg-black"></div>
            <div className="h-2 w-2 rounded-full bg-black"></div>
          </div>
          <span className="text-lg font-normal text-black">ReceptionistAI Dashboard</span>
        </div>
        <div className="flex items-center space-x-6">
          <Link href="/" className="text-sm text-black hover:underline">
            BACK TO SITE
          </Link>
          <Button variant="outline" className="bg-transparent border-black hover:bg-black hover:text-white">
            Sign Out
          </Button>
        </div>
      </header>

      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-light text-black mb-2">DASHBOARD</h1>
            <p className="text-gray-600">Manage your AI receptionist and monitor performance</p>
          </div>

          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="border-0 bg-white/50 backdrop-blur-sm shadow-sm">
              <CardHeader className="p-6">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-normal text-gray-600">CONVERSATIONS TODAY</CardTitle>
                  <MessageSquare className="h-4 w-4 text-black" />
                </div>
                <div className="text-2xl font-light text-black">127</div>
              </CardHeader>
            </Card>

            <Card className="border-0 bg-white/50 backdrop-blur-sm shadow-sm">
              <CardHeader className="p-6">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-normal text-gray-600">APPOINTMENTS BOOKED</CardTitle>
                  <Calendar className="h-4 w-4 text-black" />
                </div>
                <div className="text-2xl font-light text-black">23</div>
              </CardHeader>
            </Card>

            <Card className="border-0 bg-white/50 backdrop-blur-sm shadow-sm">
              <CardHeader className="p-6">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-normal text-gray-600">RESPONSE ACCURACY</CardTitle>
                  <BarChart3 className="h-4 w-4 text-black" />
                </div>
                <div className="text-2xl font-light text-black">94%</div>
              </CardHeader>
            </Card>

            <Card className="border-0 bg-white/50 backdrop-blur-sm shadow-sm">
              <CardHeader className="p-6">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-normal text-gray-600">ACTIVE DOCUMENTS</CardTitle>
                  <FileText className="h-4 w-4 text-black" />
                </div>
                <div className="text-2xl font-light text-black">12</div>
              </CardHeader>
            </Card>
          </div>

          {/* Main Content */}
          <Tabs defaultValue="conversations" className="space-y-6">
            <TabsList className="bg-white/50 border-0">
              <TabsTrigger
                value="conversations"
                className="text-black data-[state=active]:bg-black data-[state=active]:text-white"
              >
                Conversations
              </TabsTrigger>
              <TabsTrigger
                value="appointments"
                className="text-black data-[state=active]:bg-black data-[state=active]:text-white"
              >
                Appointments
              </TabsTrigger>
              <TabsTrigger
                value="documents"
                className="text-black data-[state=active]:bg-black data-[state=active]:text-white"
              >
                Documents
              </TabsTrigger>
              <TabsTrigger
                value="settings"
                className="text-black data-[state=active]:bg-black data-[state=active]:text-white"
              >
                Settings
              </TabsTrigger>
            </TabsList>

            <TabsContent value="conversations">
              <Card className="border-0 bg-white/50 backdrop-blur-sm shadow-sm">
                <CardHeader className="p-6">
                  <CardTitle className="text-xl font-normal text-black">Recent Conversations</CardTitle>
                  <CardDescription className="text-gray-600">Latest customer interactions</CardDescription>
                </CardHeader>
                <CardContent className="p-6 pt-0">
                  <div className="space-y-4">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div key={i} className="flex items-center justify-between p-4 bg-white/50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
                            <span className="text-white text-xs">U</span>
                          </div>
                          <div>
                            <p className="font-normal text-black">Customer #{i}</p>
                            <p className="text-sm text-gray-600">Asked about pricing and features</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="border-black text-black">
                            Resolved
                          </Badge>
                          <span className="text-sm text-gray-600">2 min ago</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="appointments">
              <Card className="border-0 bg-white/50 backdrop-blur-sm shadow-sm">
                <CardHeader className="p-6">
                  <CardTitle className="text-xl font-normal text-black">Upcoming Appointments</CardTitle>
                  <CardDescription className="text-gray-600">Scheduled meetings and consultations</CardDescription>
                </CardHeader>
                <CardContent className="p-6 pt-0">
                  <div className="space-y-4">
                    {[
                      { name: "John Smith", time: "2:00 PM", service: "Consultation", status: "confirmed" },
                      { name: "Sarah Johnson", time: "3:30 PM", service: "Follow-up", status: "pending" },
                      { name: "Mike Davis", time: "4:00 PM", service: "Initial Meeting", status: "confirmed" },
                    ].map((appointment, i) => (
                      <div key={i} className="flex items-center justify-between p-4 bg-white/50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Clock className="h-5 w-5 text-black" />
                          <div>
                            <p className="font-normal text-black">{appointment.name}</p>
                            <p className="text-sm text-gray-600">{appointment.service}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-black">{appointment.time}</span>
                          {appointment.status === "confirmed" ? (
                            <CheckCircle className="h-4 w-4 text-green-600" />
                          ) : (
                            <AlertCircle className="h-4 w-4 text-yellow-600" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="documents">
              <Card className="border-0 bg-white/50 backdrop-blur-sm shadow-sm">
                <CardHeader className="p-6">
                  <CardTitle className="text-xl font-normal text-black">Knowledge Base Documents</CardTitle>
                  <CardDescription className="text-gray-600">Manage your AI's knowledge sources</CardDescription>
                </CardHeader>
                <CardContent className="p-6 pt-0">
                  <div className="space-y-4">
                    <Button className="w-full bg-black text-white hover:bg-gray-800">Upload New Document</Button>
                    {[
                      "FAQ - General Questions.pdf",
                      "Service Pricing Guide.docx",
                      "Company Policies.pdf",
                      "Product Information.txt",
                    ].map((doc, i) => (
                      <div key={i} className="flex items-center justify-between p-4 bg-white/50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <FileText className="h-5 w-5 text-black" />
                          <span className="font-normal text-black">{doc}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="border-green-600 text-green-600">
                            Active
                          </Badge>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-black text-black hover:bg-black hover:text-white bg-transparent"
                          >
                            Edit
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings">
              <div className="grid gap-6">
                <Card className="border-0 bg-white/50 backdrop-blur-sm shadow-sm">
                  <CardHeader className="p-6">
                    <CardTitle className="text-xl font-normal text-black">Business Information</CardTitle>
                    <CardDescription className="text-gray-600">Update your business details</CardDescription>
                  </CardHeader>
                  <CardContent className="p-6 pt-0 space-y-4">
                    <div>
                      <label className="text-sm font-normal text-black">Business Name</label>
                      <input
                        className="w-full mt-1 p-2 border border-gray-200 rounded bg-white/50"
                        defaultValue="Your Business Name"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-normal text-black">Business Hours</label>
                      <input
                        className="w-full mt-1 p-2 border border-gray-200 rounded bg-white/50"
                        defaultValue="9 AM - 6 PM, Monday - Friday"
                      />
                    </div>
                    <Button className="bg-black text-white hover:bg-gray-800">Save Changes</Button>
                  </CardContent>
                </Card>

                <Card className="border-0 bg-white/50 backdrop-blur-sm shadow-sm">
                  <CardHeader className="p-6">
                    <CardTitle className="text-xl font-normal text-black">AI Configuration</CardTitle>
                    <CardDescription className="text-gray-600">Customize your AI assistant behavior</CardDescription>
                  </CardHeader>
                  <CardContent className="p-6 pt-0 space-y-4">
                    <div>
                      <label className="text-sm font-normal text-black">Response Tone</label>
                      <select className="w-full mt-1 p-2 border border-gray-200 rounded bg-white/50">
                        <option>Professional</option>
                        <option>Friendly</option>
                        <option>Casual</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-normal text-black">Greeting Message</label>
                      <textarea
                        className="w-full mt-1 p-2 border border-gray-200 rounded bg-white/50"
                        rows={3}
                        defaultValue="Hello! I'm your AI assistant. How can I help you today?"
                      />
                    </div>
                    <Button className="bg-black text-white hover:bg-gray-800">Update Configuration</Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
