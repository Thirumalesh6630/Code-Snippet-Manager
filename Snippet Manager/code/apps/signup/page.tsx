import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { SignupForm } from "@/components/auth/signup-form"
import { Code2 } from 'lucide-react'

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Code2 className="w-8 h-8 text-primary" />
            <span className="font-bold text-xl">CodeVault</span>
          </Link>
          <p className="text-muted-foreground">
            Already have an account? <Link href="/login" className="text-primary hover:underline font-semibold">Sign in</Link>
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <Card className="w-full max-w-md p-8 bg-card border border-border">
          <h1 className="text-3xl font-bold mb-2">Create account</h1>
          <p className="text-muted-foreground mb-8">Join CodeVault and start saving your snippets</p>
          <SignupForm />
          
          <div className="mt-6 text-center text-sm text-muted-foreground">
            <p>By creating an account, you agree to our Terms of Service and Privacy Policy</p>
          </div>
        </Card>
      </div>
    </div>
  )
}
