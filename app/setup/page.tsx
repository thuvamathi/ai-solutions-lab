"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { DocumentUpload } from "@/components/documents/document-upload"
import { ArrowRight, Building2, Palette, FileText } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function SetupPage() {
  const [step, setStep] = useState(1)
  const [businessData, setBusinessData] = useState({
    name: "",
    description: "",
    primaryColor: "#000000",
    logo: null as File | null,
  })
  const [chatId, setChatId] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleBusinessSubmit = async () => {
    if (businessData.name && businessData.description) {
      setIsLoading(true)
      try {
        const response = await fetch("/api/businesses", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: businessData.name,
            description: businessData.description,
            primary_color: businessData.primaryColor,
            secondary_color: "#f8f8f8",
          }),
        })

        if (response.ok) {
          const business = await response.json()
          setChatId(business.id)
          setStep(2)
        } else {
          console.error("Failed to create business")
        }
      } catch (error) {
        console.error("Error creating business:", error)
      } finally {
        setIsLoading(false)
      }
    }
  }

  const handleDocumentsComplete = () => {
    setStep(3)
  }

  const handleFinish = () => {
    router.push(`/chat/${chatId}`)
  }

  return (
    <div className="min-h-screen bg-[#f8f8f8]">
      <header className="flex items-center justify-between p-6">
        <div className="flex space-x-2">
          <div className="h-2 w-2 rounded-full bg-black"></div>
          <div className="h-2 w-2 rounded-full bg-black"></div>
        </div>
        <div className="flex items-center space-x-6">
          <Link href="/labs" className="text-sm text-black hover:underline">
            LABS
          </Link>
          <Link href="/" className="text-sm text-black hover:underline">
            BACK TO HOME
          </Link>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-light mb-4">SETUP YOUR AI RECEPTIONIST</h1>
          <p className="text-gray-600">Get your personalized chat assistant running in 3 simple steps</p>
        </div>

        {/* Progress indicator */}
        <div className="flex items-center justify-center mb-12">
          <div className="flex items-center space-x-4">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                step >= 1 ? "bg-black text-white" : "bg-gray-200 text-gray-500"
              }`}
            >
              1
            </div>
            <div className={`h-px w-12 ${step >= 2 ? "bg-black" : "bg-gray-200"}`}></div>
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                step >= 2 ? "bg-black text-white" : "bg-gray-200 text-gray-500"
              }`}
            >
              2
            </div>
            <div className={`h-px w-12 ${step >= 3 ? "bg-black" : "bg-gray-200"}`}></div>
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                step >= 3 ? "bg-black text-white" : "bg-gray-200 text-gray-500"
              }`}
            >
              3
            </div>
          </div>
        </div>

        {step === 1 && (
          <Card className="border-0 bg-white/50 backdrop-blur-sm shadow-sm">
            <CardHeader className="text-center p-8">
              <Building2 className="h-12 w-12 mx-auto mb-4" />
              <CardTitle className="text-2xl font-light">Tell Us About Your Business</CardTitle>
              <CardDescription className="text-gray-600">
                This information helps personalize your AI assistant
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8 pt-0 space-y-6">
              <div>
                <Label htmlFor="businessName" className="text-sm font-normal text-black">
                  Business Name
                </Label>
                <Input
                  id="businessName"
                  placeholder="e.g., Smith Dental Practice"
                  value={businessData.name}
                  onChange={(e) => setBusinessData((prev) => ({ ...prev, name: e.target.value }))}
                  className="mt-2 bg-white/50 border-gray-200"
                />
              </div>

              <div>
                <Label htmlFor="businessDescription" className="text-sm font-normal text-black">
                  Business Description
                </Label>
                <Textarea
                  id="businessDescription"
                  placeholder="Briefly describe what your business does and the services you offer..."
                  value={businessData.description}
                  onChange={(e) => setBusinessData((prev) => ({ ...prev, description: e.target.value }))}
                  className="mt-2 bg-white/50 border-gray-200"
                  rows={4}
                />
              </div>

              <div>
                <Label htmlFor="primaryColor" className="text-sm font-normal text-black">
                  Brand Color (Optional)
                </Label>
                <div className="flex items-center gap-4 mt-2">
                  <input
                    type="color"
                    id="primaryColor"
                    value={businessData.primaryColor}
                    onChange={(e) => setBusinessData((prev) => ({ ...prev, primaryColor: e.target.value }))}
                    className="w-12 h-12 rounded border border-gray-200"
                  />
                  <span className="text-sm text-gray-600">Choose your brand's primary color</span>
                </div>
              </div>

              <Button
                onClick={handleBusinessSubmit}
                disabled={!businessData.name || !businessData.description || isLoading}
                className="w-full bg-black text-white hover:bg-gray-800"
              >
                {isLoading ? "Creating..." : "Continue to Documents"} <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        )}

        {step === 2 && (
          <Card className="border-0 bg-white/50 backdrop-blur-sm shadow-sm">
            <CardHeader className="text-center p-8">
              <FileText className="h-12 w-12 mx-auto mb-4" />
              <CardTitle className="text-2xl font-light">Upload Your Business Documents</CardTitle>
              <CardDescription className="text-gray-600">
                Add FAQs, service descriptions, policies - anything your AI should know about your business
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8 pt-0">
              <DocumentUpload businessId={chatId} onUploadComplete={handleDocumentsComplete} />
              <div className="mt-6 text-center">
                <Button
                  variant="outline"
                  onClick={handleDocumentsComplete}
                  className="border-black text-black hover:bg-black hover:text-white bg-transparent"
                >
                  Skip for Now - Continue <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {step === 3 && (
          <Card className="border-0 bg-white/50 backdrop-blur-sm shadow-sm">
            <CardHeader className="text-center p-8">
              <Palette className="h-12 w-12 mx-auto mb-4" />
              <CardTitle className="text-2xl font-light">Your AI Receptionist is Ready!</CardTitle>
              <CardDescription className="text-gray-600">Here's your personalized chat assistant link</CardDescription>
            </CardHeader>
            <CardContent className="p-8 pt-0 space-y-6">
              <div className="bg-gray-100 p-4 rounded-lg">
                <Label className="text-sm font-normal text-black">Your Chat Assistant URL:</Label>
                <div className="flex items-center gap-2 mt-2">
                  <Input
                    value={`${window.location.origin}/chat/${chatId}`}
                    readOnly
                    className="bg-white border-gray-200"
                  />
                  <Button
                    variant="outline"
                    onClick={() => navigator.clipboard.writeText(`${window.location.origin}/chat/${chatId}`)}
                    className="border-black text-black hover:bg-black hover:text-white"
                  >
                    Copy
                  </Button>
                </div>
              </div>

              <div className="text-center space-y-4">
                <p className="text-sm text-gray-600">
                  Share this link with your customers or embed it on your website. Your AI assistant is customized with
                  your business information and branding.
                </p>

                <Button onClick={handleFinish} className="bg-black text-white hover:bg-gray-800">
                  Try Your AI Receptionist <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
