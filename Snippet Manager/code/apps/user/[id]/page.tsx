"use client"

import { useEffect, useState } from "react"
import { useParams } from 'next/navigation'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { User, Calendar, Code2, GitBranch, Eye } from 'lucide-react'

interface UserProfile {
  id: string
  username: string
  bio?: string
  createdAt: string
  snippets: number
  forks: number
  likes: number
}

interface UserSnippet {
  id: string
  title: string
  description?: string
  language: string
  views: number
  forkCount: number
}

export default function UserProfilePage() {
  const params = useParams()
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [snippets, setSnippets] = useState<UserSnippet[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchUserProfile()
  }, [params.id])

  const fetchUserProfile = async () => {
    try {
      const response = await fetch(`/api/users/${params.id}`)
      if (response.ok) {
        const data = await response.json()
        setProfile(data)
        setSnippets(data.publicSnippets || [])
      }
    } catch (error) {
      console.error("Failed to fetch user profile:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="p-6 text-center text-muted-foreground">Loading profile...</div>
  }

  if (!profile) {
    return <div className="p-6 text-center text-muted-foreground">User not found</div>
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-8">
          {/* Profile Header */}
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="w-10 h-10 text-primary" />
              </div>
            </div>
            <h1 className="text-3xl font-bold mb-2">{profile.username}</h1>
            {profile.bio && (
              <p className="text-lg text-muted-foreground mb-4">{profile.bio}</p>
            )}
            <p className="text-sm text-muted-foreground">
              Member since {new Date(profile.createdAt).toLocaleDateString()}
            </p>
          </div>

          {/* Stats */}
          <div className="grid sm:grid-cols-3 gap-4">
            <Card className="p-4 bg-card border border-border text-center">
              <p className="text-2xl font-bold">{profile.snippets}</p>
              <p className="text-sm text-muted-foreground">Public Snippets</p>
            </Card>
            <Card className="p-4 bg-card border border-border text-center">
              <p className="text-2xl font-bold">{profile.forks}</p>
              <p className="text-sm text-muted-foreground">Total Forks</p>
            </Card>
            <Card className="p-4 bg-card border border-border text-center">
              <p className="text-2xl font-bold">{profile.likes}</p>
              <p className="text-sm text-muted-foreground">Likes Received</p>
            </Card>
          </div>

          {/* Public Snippets */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Public Snippets</h2>
            {snippets.length === 0 ? (
              <Card className="p-8 bg-card border border-border text-center text-muted-foreground">
                No public snippets yet
              </Card>
            ) : (
              <div className="grid gap-4">
                {snippets.map(snippet => (
                  <Card key={snippet.id} className="p-4 bg-card border border-border hover:border-primary/50 transition">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <Link href={`/snippets/${snippet.id}`}>
                          <h3 className="font-semibold text-lg hover:text-primary">{snippet.title}</h3>
                        </Link>
                        {snippet.description && (
                          <p className="text-sm text-muted-foreground">{snippet.description}</p>
                        )}
                        <div className="flex gap-3 mt-2 text-sm text-muted-foreground">
                          <span className="px-2 py-1 bg-background text-xs rounded font-mono">
                            {snippet.language}
                          </span>
                          <div className="flex items-center gap-1">
                            <Eye className="w-4 h-4" />
                            {snippet.views}
                          </div>
                          <div className="flex items-center gap-1">
                            <GitBranch className="w-4 h-4" />
                            {snippet.forkCount}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
