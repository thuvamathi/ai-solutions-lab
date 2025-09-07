import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-[#f8f8f8] flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="h-2 w-2 rounded-full bg-black"></div>
            <span className="text-lg font-normal text-black">ReceptionistAI</span>
          </div>
          <h1 className="text-2xl font-light text-black">Welcome back</h1>
          <p className="text-gray-600 text-sm mt-2">Sign in to your account</p>
        </div>

        <Card className="border-0 bg-white/70 backdrop-blur-sm shadow-sm">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-lg font-normal text-black">Sign In</CardTitle>
            <CardDescription className="text-gray-600">Enter your credentials to access your dashboard</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm text-black">
                Email
              </Label>
              <Input id="email" type="email" placeholder="Enter your email" className="bg-white/50 border-gray-200" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm text-black">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                className="bg-white/50 border-gray-200"
              />
            </div>
            <div className="flex items-center justify-between text-sm">
              <Link href="/forgot-password" className="text-gray-600 hover:text-black">
                Forgot password?
              </Link>
            </div>
            <Button className="w-full bg-black text-white hover:bg-gray-800">Sign In</Button>
            <div className="text-center text-sm text-gray-600">
              Don't have an account?{" "}
              <Link href="/signup" className="text-black hover:underline">
                Sign up
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
