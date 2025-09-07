import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-[#f8f8f8] flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="h-2 w-2 rounded-full bg-black"></div>
            <span className="text-lg font-normal text-black">ReceptionistAI</span>
          </div>
          <h1 className="text-2xl font-light text-black">Get started</h1>
          <p className="text-gray-600 text-sm mt-2">Create your account to begin</p>
        </div>

        <Card className="border-0 bg-white/70 backdrop-blur-sm shadow-sm">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-lg font-normal text-black">Create Account</CardTitle>
            <CardDescription className="text-gray-600">Start your free trial today</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-sm text-black">
                  First Name
                </Label>
                <Input id="firstName" placeholder="John" className="bg-white/50 border-gray-200" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-sm text-black">
                  Last Name
                </Label>
                <Input id="lastName" placeholder="Doe" className="bg-white/50 border-gray-200" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm text-black">
                Email
              </Label>
              <Input id="email" type="email" placeholder="john@example.com" className="bg-white/50 border-gray-200" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company" className="text-sm text-black">
                Company
              </Label>
              <Input id="company" placeholder="Your Company" className="bg-white/50 border-gray-200" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm text-black">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Create a password"
                className="bg-white/50 border-gray-200"
              />
            </div>
            <Button className="w-full bg-black text-white hover:bg-gray-800">Create Account</Button>
            <div className="text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link href="/signin" className="text-black hover:underline">
                Sign in
              </Link>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-6">
          <Link href="/" className="text-sm text-gray-600 hover:text-black">
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  )
}
