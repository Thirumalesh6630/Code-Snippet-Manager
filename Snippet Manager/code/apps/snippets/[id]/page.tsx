"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from 'next/navigation'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Copy, Heart, Share2, GitBranch, User, Calendar, Eye, Code2 } from 'lucide-react'
import { useToast } from "@/hooks/use-toast"

interface SnippetDetail {
  id: string
  title: string
  description?: string
  code: string
  language: string
  tags: string[]
  author: string
  userId: string
  views: number
  isLiked: boolean
  likes: number
  forkCount: number
  forkedFrom?: string
  createdAt: string
}

export default function SnippetDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const [snippet, setSnippet] = useState<SnippetDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [liking, setLiking] = useState(false)

  useEffect(() => {
    fetchSnippet()
  }, [params.id])

  const fetchSnippet = async () => {
    try {
      const response = await fetch(`/api/snippets/${params.id}`)
      if (response.ok) {
        const data = await response.json()
        setSnippet(data)
      } else {
        router.push("/404")
      }
    } catch (error) {
      console.error("Failed to fetch snippet:", error)
      router.push("/404")
    } finally {
      setLoading(false)
    }
  }

  const handleLike = async () => {
    if (!snippet) return
    setLiking(true)

    try {
      const method = snippet.isLiked ? "DELETE" : "POST"
      const response = await fetch(`/api/snippets/${snippet.id}/like`, { method })

      if (response.ok) {
        setSnippet(prev => prev ? {
          ...prev,
          isLiked: !prev.isLiked,
          likes: prev.isLiked ? prev.likes - 1 : prev.likes + 1
        } : null)
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update like",
        variant: "destructive",
      })
    } finally {
      setLiking(false)
    }
  }

  const handleFork = async () => {
    try {
      const response = await fetch(`/api/snippets/${params.id}/fork`, { method: "POST" })
      if (response.ok) {
        const forked = await response.json()
        toast({
          title: "Success",
          description: "Snippet forked successfully",
        })
        router.push(`/dashboard/snippets/${forked.id}`)
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fork snippet",
        variant: "destructive",
      })
    }
  }

  const handleCopyCode = () => {
    if (!snippet) return
    navigator.clipboard.writeText(snippet.code)
    toast({
      title: "Copied",
      description: "Code copied to clipboard",
    })
  }

  if (loading) {
    return <div className="p-6 text-center text-muted-foreground">Loading snippet...</div>
  }

  if (!snippet) {
    return <div className="p-6 text-center text-muted-foreground">Snippet not found</div>
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Button variant="ghost" size="icon" asChild className="mb-6">
          <Link href="/explore">
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </Button>

        <div className="space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-4xl font-bold mb-3">{snippet.title}</h1>
            {snippet.description && (
              <p className="text-lg text-muted-foreground">{snippet.description}</p>
            )}
            <div className="flex flex-wrap gap-4 mt-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <User className="w-4 h-4" />
                <Link href={`/user/${snippet.userId}`} className="hover:text-primary">
                  {snippet.author}
                </Link>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {new Date(snippet.createdAt).toLocaleDateString()}
              </div>
              <div className="flex items-center gap-1">
                <Eye className="w-4 h-4" />
                {snippet.views} views
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="flex gap-2 flex-wrap">
            <span className="px-3 py-1 bg-background text-xs rounded font-mono border border-border">
              {snippet.language}
            </span>
            {snippet.tags.map(tag => (
              <span key={tag} className="px-3 py-1 bg-primary/10 text-primary text-xs rounded">
                {tag}
              </span>
            ))}
          </div>

          {/* Code Block */}
          <Card className="p-6 bg-card border border-border overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-mono text-muted-foreground">{snippet.language}</span>
              <Button size="sm" variant="ghost" onClick={handleCopyCode}>
                <Copy className="w-4 h-4 mr-2" />
                Copy
              </Button>
            </div>
            <pre className="bg-background rounded p-4 overflow-auto max-h-96 font-mono text-sm text-foreground">
              <code>{snippet.code}</code>
            </pre>
          </Card>

          {/* Actions */}
          <div className="flex gap-3 flex-wrap">
            <Button
              variant="outline"
              onClick={handleLike}
              disabled={liking}
              className={snippet.isLiked ? "border-destructive text-destructive" : ""}
            >
              <Heart className={`w-4 h-4 mr-2 ${snippet.isLiked ? 'fill-current' : ''}`} />
              {snippet.likes} Likes
            </Button>
            <Button variant="outline">
              <GitBranch className="w-4 h-4 mr-2" />
              {snippet.forkCount} Forks
            </Button>
            <Button variant="outline" onClick={handleFork}>
              <GitBranch className="w-4 h-4 mr-2" />
              Fork Snippet
            </Button>
            <Button variant="outline">
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
          </div>

          {/* Fork Info */}
          {snippet.forkedFrom && (
            <Card className="p-4 bg-primary/5 border border-primary/20">
              <p className="text-sm">
                This snippet was forked from another snippet.{" "}
                <Link href={`/snippets/${snippet.forkedFrom}`} className="text-primary hover:underline">
                  View original
                </Link>
              </p>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
