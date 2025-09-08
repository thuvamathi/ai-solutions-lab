import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, Calendar, Clock, Users, Zap, Shield, Check, Star } from "lucide-react"
import Link from "next/link"
// import { EnhancedChatWidget } from "@/components/chat/enhanced-chat-widget"
import Image from "next/image"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#dfe2e2]">
      <header className="flex items-center justify-between p-6">
        <div className="flex space-x-2">
          <div className="h-2 w-2 rounded-full bg-black" title="Decorative element"></div>
          <div className="h-2 w-2 rounded-full bg-black" title="Decorative element"></div>
        </div>
        <div className="flex items-center space-x-6">
          <button className="text-sm text-black">EN</button>
          <Link href="/contact" className="text-sm text-black hover:underline">
            CONTACT US
          </Link>
          <Link href="/signin" className="text-sm text-black hover:underline">
            SIGN IN
          </Link>
          <button className="flex flex-col space-y-1" title="Menu (decorative)">
            <span className="h-0.5 w-6 bg-black"></span>
            <span className="h-0.5 w-6 bg-black"></span>
          </button>
        </div>
      </header>

<main className="px-6 pt-12">
        {/* Hero Section - Side by side layout */}
        <div className="flex flex-col lg:flex-row lg:items-start gap-8">
          {/* Left Content - Hero Text */}
          <div className="flex-1 lg:max-w-xl">
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-light leading-tight tracking-tight text-black">
              YOUR SMART
              <br />
              DIGITAL
              <br />
              RECEPTIONIST.
            </h1>

            <div className="mt-8">
              <Link href="/setup">
                <Button
                  variant="outline"
                  className="rounded-full border-2 border-black px-8 bg-white text-black hover:bg-black hover:text-white"
                >
                  TRY IT FREE - NO SIGNUP
                </Button>
              </Link>
              <div className="mt-8 p-6 bg-gradient-to-br from-emerald-50 to-green-50 border border-emerald-200 rounded-2xl shadow-sm">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-2 h-2 bg-emerald-500 rounded-full mt-3"></div>
                  <div>
                    <p className="lg:text-base text-sm leading-relaxed text-gray-800 font-medium">
                      Your always-on AI assistant that engages customers, answers questions, 
                      and seamlessly books appointments. Perfect for dental offices, law firms, 
                      consultancy services, and any business that needs professional customer service.
                    </p>
                  </div>
                </div>
              </div>

              {/* Optional: Key Benefits Pills */}
              <div className="mt-6 flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-black text-white text-sm rounded-full">
                  24/7 Available
                </span>
                <span className="px-3 py-1 bg-gray-100 text-gray-800 text-sm rounded-full border">
                  No Setup Required
                </span>
                <span className="px-3 py-1 bg-gray-100 text-gray-800 text-sm rounded-full border">
                  Instant Booking
                </span>
              </div>
            </div>
          </div>

          {/* Right Content - Video (larger width on desktop) */}
          <div className="lg:flex-[1.2] lg:ml-8">
            <div className="relative w-full aspect-[4/3] max-w-md mx-auto lg:max-w-full">
              {/* Rectangular container with rounded corners */}
              <div className="relative w-full h-full rounded-[2rem] border-2 border-black p-2">
                <div className="relative w-full h-full rounded-[1.75rem] border-2 border-black overflow-hidden">
                  <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    className="absolute inset-0 w-full h-full object-cover"
                    poster="/chat2.png"
                  >
                    <source src="/chat-vid.mp4" type="video/mp4" />
                    {/* Fallback image for browsers that don't support video */}
                    <Image 
                      src="/chat2.png" 
                      alt="AI receptionist demonstration"
                      fill
                      className="object-cover"
                      priority
                    />
                  </video>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-light mb-16 max-w-2xl">
            EVERYTHING YOU NEED
            <br />
            FOR CUSTOMER SUCCESS.
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 bg-white/50 backdrop-blur-sm shadow-sm">
              <CardHeader className="p-8">
                <MessageSquare className="h-8 w-8 mb-6" />
                <CardTitle className="text-lg font-normal">Intelligent Chat Assistant</CardTitle>
                <CardDescription className="text-gray-600 leading-relaxed">
                  AI-powered conversations that understand your business and provide accurate answers from your
                  documents.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 bg-white/50 backdrop-blur-sm shadow-sm">
              <CardHeader className="p-8">
                <Calendar className="h-8 w-8 mb-6" />
                <CardTitle className="text-lg font-normal">Smart Appointment Booking</CardTitle>
                <CardDescription className="text-gray-600 leading-relaxed">
                  Seamlessly transition from chat to booking when customers need human assistance or consultations.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 bg-white/50 backdrop-blur-sm shadow-sm">
              <CardHeader className="p-8">
                <Clock className="h-8 w-8 mb-6" />
                <CardTitle className="text-lg font-normal">24/7 Availability</CardTitle>
                <CardDescription className="text-gray-600 leading-relaxed">
                  Never miss a potential customer. Your AI receptionist works around the clock, even when you're
                  sleeping.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 bg-white/50 backdrop-blur-sm shadow-sm">
              <CardHeader className="p-8">
                <Users className="h-8 w-8 mb-6" />
                <CardTitle className="text-lg font-normal">Multi-Business Ready</CardTitle>
                <CardDescription className="text-gray-600 leading-relaxed">
                  Perfect for healthcare, legal, consulting, and service-based businesses of all sizes.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 bg-white/50 backdrop-blur-sm shadow-sm">
              <CardHeader className="p-8">
                <Zap className="h-8 w-8 mb-6" />
                <CardTitle className="text-lg font-normal">Instant Setup</CardTitle>
                <CardDescription className="text-gray-600 leading-relaxed">
                  Upload your business documents and get your AI receptionist running in minutes, not hours.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 bg-white/50 backdrop-blur-sm shadow-sm">
              <CardHeader className="p-8">
                <Shield className="h-8 w-8 mb-6" />
                <CardTitle className="text-lg font-normal">Secure & Compliant</CardTitle>
                <CardDescription className="text-gray-600 leading-relaxed">
                  Enterprise-grade security with HIPAA compliance options for healthcare and sensitive industries.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-white/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-light mb-16">HOW IT WORKS.</h2>

          <div className="grid md:grid-cols-3 gap-12">
            <div>
              <div className="w-12 h-12 border border-black rounded-full flex items-center justify-center text-lg font-light mb-6">
                1
              </div>
              <h3 className="text-lg font-normal mb-4">Upload Your Documents</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Add your FAQs, service descriptions, policies, and any business information your AI should know.
              </p>
            </div>

            <div>
              <div className="w-12 h-12 border border-black rounded-full flex items-center justify-center text-lg font-light mb-6">
                2
              </div>
              <h3 className="text-lg font-normal mb-4">Customers Chat & Get Answers</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Visitors ask questions and receive instant, accurate responses based on your business knowledge.
              </p>
            </div>

            <div>
              <div className="w-12 h-12 border border-black rounded-full flex items-center justify-center text-lg font-light mb-6">
                3
              </div>
              <h3 className="text-lg font-normal mb-4">Seamless Appointment Booking</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                When needed, customers easily book appointments through an integrated calendar system.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-light mb-16">TRUSTED BY BUSINESSES.</h2>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-0 bg-white/50 backdrop-blur-sm shadow-sm">
              <CardHeader className="p-8">
                <div className="flex items-center gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-3 w-3 fill-black text-black" />
                  ))}
                </div>
                <CardDescription className="text-gray-600 leading-relaxed mb-6">
                  "ReceptionistAI has revolutionized our patient intake process. We're booking 40% more appointments."
                </CardDescription>
                <div>
                  <p className="font-normal text-sm">Dr. Sarah Chen</p>
                  <p className="text-xs text-gray-500">Smile Dental Practice</p>
                </div>
              </CardHeader>
            </Card>

            <Card className="border-0 bg-white/50 backdrop-blur-sm shadow-sm">
              <CardHeader className="p-8">
                <div className="flex items-center gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-3 w-3 fill-black text-black" />
                  ))}
                </div>
                <CardDescription className="text-gray-600 leading-relaxed mb-6">
                  "Our law firm handles complex cases, and ReceptionistAI perfectly captures our expertise in
                  responses."
                </CardDescription>
                <div>
                  <p className="font-normal text-sm">Michael Rodriguez</p>
                  <p className="text-xs text-gray-500">Rodriguez & Associates Law</p>
                </div>
              </CardHeader>
            </Card>

            <Card className="border-0 bg-white/50 backdrop-blur-sm shadow-sm">
              <CardHeader className="p-8">
                <div className="flex items-center gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-3 w-3 fill-black text-black" />
                  ))}
                </div>
                <CardDescription className="text-gray-600 leading-relaxed mb-6">
                  "The setup was incredibly easy. Our consultation bookings have tripled within hours."
                </CardDescription>
                <div>
                  <p className="font-normal text-sm">Emma Thompson</p>
                  <p className="text-xs text-gray-500">Thompson Business Consulting</p>
                </div>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-white/30">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-light mb-16">SIMPLE PRICING.</h2>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border border-gray-200 bg-white/70 backdrop-blur-sm flex flex-col">
              <CardHeader className="p-8 text-center">
                <CardTitle className="text-xl font-normal">Starter</CardTitle>
                <div className="mt-6">
                  <span className="text-3xl font-light">$29</span>
                  <span className="text-gray-600">/month</span>
                </div>
                <CardDescription className="mt-4 text-gray-600">Perfect for small businesses</CardDescription>
              </CardHeader>
              <div className="px-8 pb-8 flex-1 flex flex-col">
                <ul className="space-y-3 text-sm flex-1">
                  <li className="flex items-center gap-2">
                    <Check className="h-3 w-3" />
                    <span>500 conversations/month</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-3 w-3" />
                    <span>5 document uploads</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-3 w-3" />
                    <span>Basic appointment booking</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-3 w-3" />
                    <span>Email notifications</span>
                  </li>
                </ul>
                <Button
                  className="w-full mt-6 bg-white border border-black text-black hover:bg-black hover:text-white"
                  variant="outline"
                  asChild
                >
                  <Link href="/setup">Try It Free</Link>
                </Button>
              </div>
            </Card>

            <Card className="border-2 border-black bg-white/70 backdrop-blur-sm relative flex flex-col">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-black text-white">Most Popular</Badge>
              </div>
              <CardHeader className="p-8 text-center">
                <CardTitle className="text-xl font-normal">Professional</CardTitle>
                <div className="mt-6">
                  <span className="text-3xl font-light">$79</span>
                  <span className="text-gray-600">/month</span>
                </div>
                <CardDescription className="mt-4 text-gray-600">Ideal for growing businesses</CardDescription>
              </CardHeader>
              <div className="px-8 pb-8 flex-1 flex flex-col">
                <ul className="space-y-3 text-sm flex-1">
                  <li className="flex items-center gap-2">
                    <Check className="h-3 w-3" />
                    <span>2,000 conversations/month</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-3 w-3" />
                    <span>25 document uploads</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-3 w-3" />
                    <span>Advanced appointment booking</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-3 w-3" />
                    <span>Calendar integrations</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-3 w-3" />
                    <span>Analytics dashboard</span>
                  </li>
                </ul>
                <Button className="w-full mt-6 bg-black text-white hover:bg-gray-800" asChild>
                  <Link href="/setup">Try It Free</Link>
                </Button>
              </div>
            </Card>

            <Card className="border border-gray-200 bg-white/70 backdrop-blur-sm flex flex-col">
              <CardHeader className="p-8 text-center">
                <CardTitle className="text-xl font-normal">Enterprise</CardTitle>
                <div className="mt-6">
                  <span className="text-3xl font-light">$199</span>
                  <span className="text-gray-600">/month</span>
                </div>
                <CardDescription className="mt-4 text-gray-600">For large organizations</CardDescription>
              </CardHeader>
              <div className="px-8 pb-8 flex-1 flex flex-col">
                <ul className="space-y-3 text-sm flex-1">
                  <li className="flex items-center gap-2">
                    <Check className="h-3 w-3" />
                    <span>Unlimited conversations</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-3 w-3" />
                    <span>Unlimited documents</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-3 w-3" />
                    <span>Multi-location support</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-3 w-3" />
                    <span>Custom integrations</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-3 w-3" />
                    <span>White-label options</span>
                  </li>
                </ul>
                <Button
                  className="w-full mt-6 bg-white border border-black text-black hover:bg-black hover:text-white"
                  variant="outline"
                >
                  Contact Sales
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-light mb-8 leading-tight">
            READY TO TRANSFORM
            <br />
            YOUR CUSTOMER EXPERIENCE?
          </h2>
          <p className="text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            Join hundreds of businesses already using ReceptionistAI to provide better customer service and book more
            appointments.
          </p>
          <Button
            className="rounded-full border-2 border-black px-12 py-3 bg-white text-black hover:bg-black hover:text-white"
            asChild
          >
            <Link href="/setup">TRY IT FREE - NO SIGNUP REQUIRED</Link>
          </Button>
        </div>
      </section>

      <footer className="py-12 px-6 border-t border-gray-200 bg-white/30">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <div className="h-2 w-2 rounded-full bg-black"></div>
                <span className="text-lg font-normal">ReceptionistAI</span>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                The smart digital receptionist that transforms how businesses handle customer inquiries and
                appointments.
              </p>
            </div>

            <div>
              <h4 className="font-normal mb-4 text-sm">PRODUCT</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <Link href="#" className="hover:text-black transition-colors">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-black transition-colors">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-black transition-colors">
                    Integrations
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-black transition-colors">
                    API
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-normal mb-4 text-sm">COMPANY</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <Link href="/about" className="hover:text-black transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-black transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-black transition-colors">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-black transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-normal mb-4 text-sm">SUPPORT</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <Link href="#" className="hover:text-black transition-colors">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-black transition-colors">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-black transition-colors">
                    Status
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-black transition-colors">
                    Privacy
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-200 mt-12 pt-8 text-center text-sm text-gray-600">
            <p>&copy; 2024 ReceptionistAI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
