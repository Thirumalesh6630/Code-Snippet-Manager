"use client"

import { useState } from "react"
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { Loader2 } from 'lucide-react'
import { signup } from "@/lib/auth"

export function SignupForm() {
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      })
      return
    }

    setLoading(true)

    try {
      await signup(formData.email, formData.password, formData.username)

      toast({
        title: "Success",
        description: "Account created successfully. Redirecting to dashboard...",
      })
      
      router.push("/dashboard")
    } catch (error) {
      console.error("[v0] Signup error:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Signup failed",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="username" className="text-foreground">Username</Label>
        <Input
          id="username"
          name="username"
          placeholder="devuser"
          value={formData.username}
          onChange={handleChange}
          required
          className="mt-2"
        />
      </div>
      <div>
        <Label htmlFor="email" className="text-foreground">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="you@example.com"
          value={formData.email}
          onChange={handleChange}
          required
          className="mt-2"
        />
      </div>
      <div>
        <Label htmlFor="password" className="text-foreground">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="••••••••"
          value={formData.password}
          onChange={handleChange}
          required
          className="mt-2"
        />
      </div>
      <div>
        <Label htmlFor="confirmPassword" className="text-foreground">Confirm Password</Label>
        <Input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          placeholder="••••••••"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
          className="mt-2"
        />
      </div>
      <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={loading}>
        {loading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Creating account...</> : "Create account"}
      </Button>
    </form>
  )
}
