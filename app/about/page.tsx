import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Target, Award } from "lucide-react"
import Link from "next/link"
import { EnhancedChatWidget } from "@/components/chat/enhanced-chat-widget"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#f8f8f8]">
      <header className="flex items-center justify-between p-6">
        <div className="flex space-x-2">
          <div className="h-2 w-2 rounded-full bg-black"></div>
          <div className="h-2 w-2 rounded-full bg-black"></div>
        </div>
        <div className="flex items-center space-x-6">
          <button className="text-sm text-black">EN</button>
          <Link href="/contact" className="text-sm text-black hover:underline">
            CONTACT US
          </Link>
          <Link href="/signin" className="text-sm text-black hover:underline">
            SIGN IN
          </Link>
          <button className="flex flex-col space-y-1">
            <span className="h-0.5 w-6 bg-black"></span>
            <span className="h-0.5 w-6 bg-black"></span>
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-light text-black mb-6">REVOLUTIONIZING CUSTOMER SERVICE WITH AI</h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            We're on a mission to help businesses provide exceptional customer experiences through intelligent
            automation and seamless human connection.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-6 bg-white/30">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-light text-black mb-6">OUR MISSION</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Every business deserves to provide outstanding customer service, regardless of size or resources. We
                believe that AI should enhance human connection, not replace it.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                ReceptionistAI bridges the gap between instant customer support and meaningful human interaction,
                ensuring no customer inquiry goes unanswered while freeing up your team to focus on what matters most.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <Card className="border-0 bg-white/50 backdrop-blur-sm shadow-sm text-center">
                <CardHeader className="p-6">
                  <Users className="h-12 w-12 text-black mx-auto mb-4" />
                  <CardTitle className="text-2xl font-light text-black">500+</CardTitle>
                  <CardDescription className="text-gray-600">Businesses Served</CardDescription>
                </CardHeader>
              </Card>
              <Card className="border-0 bg-white/50 backdrop-blur-sm shadow-sm text-center">
                <CardHeader className="p-6">
                  <Target className="h-12 w-12 text-black mx-auto mb-4" />
                  <CardTitle className="text-2xl font-light text-black">1M+</CardTitle>
                  <CardDescription className="text-gray-600">Conversations Handled</CardDescription>
                </CardHeader>
              </Card>
              <Card className="border-0 bg-white/50 backdrop-blur-sm shadow-sm text-center">
                <CardHeader className="p-6">
                  <Award className="h-12 w-12 text-black mx-auto mb-4" />
                  <CardTitle className="text-2xl font-light text-black">95%</CardTitle>
                  <CardDescription className="text-gray-600">Customer Satisfaction</CardDescription>
                </CardHeader>
              </Card>
              <Card className="border-0 bg-white/50 backdrop-blur-sm shadow-sm text-center">
                <CardHeader className="p-6">
                  <Users className="h-12 w-12 text-black mx-auto mb-4" />
                  <CardTitle className="text-2xl font-light text-black">24/7</CardTitle>
                  <CardDescription className="text-gray-600">Support Available</CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-light text-black mb-4">OUR VALUES</h2>
            <p className="text-xl text-gray-600">The principles that guide everything we do</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-0 bg-white/50 backdrop-blur-sm shadow-sm">
              <CardHeader className="text-center p-8">
                <CardTitle className="text-xl font-normal text-black mb-4">Customer First</CardTitle>
                <CardDescription className="text-gray-600 leading-relaxed">
                  Every feature we build starts with understanding real customer needs. We're not just building
                  technology; we're solving real business problems.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 bg-white/50 backdrop-blur-sm shadow-sm">
              <CardHeader className="text-center p-8">
                <CardTitle className="text-xl font-normal text-black mb-4">Simplicity</CardTitle>
                <CardDescription className="text-gray-600 leading-relaxed">
                  Powerful doesn't have to mean complicated. We believe the best solutions are intuitive, accessible,
                  and easy to implement for businesses of all sizes.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 bg-white/50 backdrop-blur-sm shadow-sm">
              <CardHeader className="text-center p-8">
                <CardTitle className="text-xl font-normal text-black mb-4">Trust & Security</CardTitle>
                <CardDescription className="text-gray-600 leading-relaxed">
                  Your business data and customer information are sacred. We maintain the highest standards of security
                  and privacy protection in everything we do.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-white/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-light text-black mb-4">READY TO JOIN OUR MISSION?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Experience the future of customer service. Start your free trial today and see the difference AI can make
            for your business.
          </p>
          <Button className="rounded-full border-2 border-black px-8 py-3 bg-transparent hover:bg-black hover:text-white">
            START FREE TRIAL
          </Button>
        </div>
      </section>

      <EnhancedChatWidget />
    </div>
  )
}
