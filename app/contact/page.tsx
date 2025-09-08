import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin } from "lucide-react"
import Link from "next/link"
// import { EnhancedChatWidget } from "@/components/chat/enhanced-chat-widget"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#f8f8f8]">
      <header className="flex items-center justify-between p-6">
        <div className="flex space-x-2">
          <div className="h-2 w-2 rounded-full bg-black"></div>
          <div className="h-2 w-2 rounded-full bg-black"></div>
        </div>
        <div className="flex items-center space-x-6">
          {/* <button className="text-sm text-black">EN</button> */}
          <Link href="/about" className="text-sm text-black hover:underline">
            ABOUT
          </Link>
          <Link href="/signin" className="text-sm text-black hover:underline">
            SIGN IN
          </Link>
          {/* <button className="flex flex-col space-y-1">
            <span className="h-0.5 w-6 bg-black"></span>
            <span className="h-0.5 w-6 bg-black"></span>
          </button> */}
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-light text-black mb-6">GET IN TOUCH</h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Have questions about ReceptionistAI? We're here to help you transform your customer experience.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="border-0 bg-white/50 backdrop-blur-sm shadow-sm">
              <CardHeader className="p-8">
                <CardTitle className="text-2xl font-normal text-black">Send us a message</CardTitle>
                <CardDescription className="text-gray-600">
                  Fill out the form below and we'll get back to you within 24 hours.
                </CardDescription>
              </CardHeader>
              <div className="px-8 pb-8">
                <form className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-normal text-black mb-2">
                        First Name
                      </label>
                      <Input id="firstName" placeholder="John" className="bg-white/50 border-gray-200" />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-normal text-black mb-2">
                        Last Name
                      </label>
                      <Input id="lastName" placeholder="Doe" className="bg-white/50 border-gray-200" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-normal text-black mb-2">
                      Email
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      className="bg-white/50 border-gray-200"
                    />
                  </div>
                  <div>
                    <label htmlFor="company" className="block text-sm font-normal text-black mb-2">
                      Company
                    </label>
                    <Input id="company" placeholder="Your Company Name" className="bg-white/50 border-gray-200" />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-normal text-black mb-2">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      placeholder="Tell us about your business and how we can help..."
                      rows={5}
                      className="bg-white/50 border-gray-200"
                    />
                  </div>
                  <Button className="w-full bg-black text-white hover:bg-gray-800">Send Message</Button>
                </form>
              </div>
            </Card>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-light text-black mb-6">OTHER WAYS TO REACH US</h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <Mail className="h-6 w-6 text-black mt-1" />
                    <div>
                      <h3 className="font-normal text-black mb-1">Email Support</h3>
                      <p className="text-gray-600">support@receptionistai.com</p>
                      <p className="text-sm text-gray-600">We typically respond within 2-4 hours</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Phone className="h-6 w-6 text-black mt-1" />
                    <div>
                      <h3 className="font-normal text-black mb-1">Phone Support</h3>
                      <p className="text-gray-600">+1 (555) 123-4567</p>
                      <p className="text-sm text-gray-600">Monday - Friday, 9 AM - 6 PM EST</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <MapPin className="h-6 w-6 text-black mt-1" />
                    <div>
                      <h3 className="font-normal text-black mb-1">Office</h3>
                      <p className="text-gray-600">
                        123 Innovation Drive
                        <br />
                        San Francisco, CA 94105
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <Card className="border-0 bg-white/50 backdrop-blur-sm shadow-sm">
                <CardHeader className="p-8">
                  <CardTitle className="text-lg font-normal text-black">Need immediate help?</CardTitle>
                  <CardDescription className="text-gray-600">
                    Check out our comprehensive help center with guides, tutorials, and frequently asked questions.
                  </CardDescription>
                  <Button
                    variant="outline"
                    className="w-fit mt-4 bg-transparent border-black hover:bg-black hover:text-white"
                  >
                    Visit Help Center
                  </Button>
                </CardHeader>
              </Card>

              <Card className="border-0 bg-black text-white shadow-sm">
                <CardHeader className="p-8">
                  <CardTitle className="text-lg font-normal">Ready to get started?</CardTitle>
                  <CardDescription className="text-white/80">
                    Start your free trial today and see how ReceptionistAI can transform your customer experience.
                  </CardDescription>
                  <Button
                    variant="outline"
                    className="w-fit mt-4 bg-transparent border-white text-white hover:bg-white hover:text-black"
                  >
                    Start Free Trial
                  </Button>
                </CardHeader>
              </Card>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
