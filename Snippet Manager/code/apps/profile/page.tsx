"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { ArrowLeft, Loader2, User, Mail } from 'lucide-react'

interface UserProfile {
  id: string
  username: string
  email: string
  bio?: string
  avatar?: string
  createdAt: string
}

export default function ProfilePage() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [formData, setFormData] = useState({
    username: "",
    bio: "",
  })

  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    try {
      const response = await fetch("/api/profile")
      if (response.ok) {
        const data = await response.json()
        setProfile(data)
        setFormData({
          username: data.username,
          bio: data.bio || "",
        })
      }
    } catch (error) {
      console.error("Failed to fetch profile:", error)
      toast({
        title: "Error",
        description: "Failed to load profile",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      const response = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || "Failed to update profile")
      }

      toast({
        title: "Success",
        description: "Profile updated successfully",
      })
      fetchProfile()
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to update profile",
        variant: "destructive",
      })
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <div className="p-6 text-center text-muted-foreground">Loading profile...</div>
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/dashboard">
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Profile Settings</h1>
      </div>

      <Card className="p-6 bg-card border border-border max-w-2xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-4 bg-background rounded-lg border border-border">
              <User className="w-5 h-5 text-primary" />
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">Username</p>
                <p className="font-semibold">{profile?.username}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-background rounded-lg border border-border">
              <Mail className="w-5 h-5 text-primary" />
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-semibold">{profile?.email}</p>
              </div>
            </div>

            <div>
              <Label htmlFor="bio" className="text-foreground">Bio</Label>
              <textarea
                id="bio"
                name="bio"
                placeholder="Tell us about yourself..."
                value={formData.bio}
                onChange={handleChange}
                rows={4}
                className="w-full mt-2 px-3 py-2 bg-background border border-border rounded-lg text-foreground resize-none"
              />
              <p className="text-xs text-muted-foreground mt-1">{formData.bio.length}/500 characters</p>
            </div>

            <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg">
              <p className="text-sm text-muted-foreground">
                <strong>Member since:</strong> {profile && new Date(profile.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <Button type="submit" className="bg-primary hover:bg-primary/90" disabled={saving}>
              {saving ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Saving...</> : "Save Changes"}
            </Button>
            <Button type="button" variant="outline" onClick={() => fetchProfile()}>
              Discard
            </Button>
          </div>
        </form>
      </Card>

      <Card className="p-6 bg-card border border-border max-w-2xl border-destructive/30">
        <h2 className="text-lg font-semibold mb-4 text-destructive">Danger Zone</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Once you delete your account, there is no going back. Please be certain.
        </p>
        <Button variant="destructive">Delete Account</Button>
      </Card>
    </div>
  )
}
