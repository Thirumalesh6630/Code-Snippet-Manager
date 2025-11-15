"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Code2, Heart, Copy, User, Calendar, Search } from 'lucide-react'
import { useState, useEffect } from "react"

interface Snippet {
  id: string
  title: string
  description?: string
  code: string
  language: string
  author: string
  likes: number
  views: number
  createdAt: string
  tags: string[]
  likes_count?: number
}

const LANGUAGES = [
  "javascript", "python", "react", "sql", "typescript", "java", "go", "rust",
  "php", "ruby", "swift", "kotlin"
]

export default function ExplorePage() {
  const [snippets, setSnippets] = useState<Snippet[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [selectedLanguage, setSelectedLanguage] = useState("")
  const [selectedTag, setSelectedTag] = useState("")

  useEffect(() => {
    fetchSnippets()
  }, [search, selectedLanguage, selectedTag])

  const fetchSnippets = async () => {
    try {
      const params = new URLSearchParams()
      if (search) params.append("search", search)
      if (selectedLanguage) params.append("language", selectedLanguage)
      if (selectedTag) params.append("tag", selectedTag)

      const response = await fetch(`/api/snippets/public?${params}`)
      if (response.ok) {
        const data = await response.json()
        setSnippets(data)
      }
    } catch (error) {
      console.error("Failed to fetch snippets:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Code2 className="w-8 h-8 text-primary" />
            <span className="font-bold text-xl">CodeVault</span>
          </Link>
          <div className="flex gap-3">
            <Button variant="ghost" asChild>
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild className="bg-primary hover:bg-primary/90">
              <Link href="/signup">Sign Up</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Search Section */}
      <div className="border-b border-border py-8 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-6">Explore Snippets</h1>
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search by language, tags, or content..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 bg-card border-border"
              />
            </div>
            <Button className="bg-primary hover:bg-primary/90">Search</Button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="border-b border-border py-6 bg-card/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-semibold mb-2">Languages</h3>
              <div className="flex gap-2 flex-wrap">
                <Button
                  variant={selectedLanguage === "" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedLanguage("")}
                  className={selectedLanguage === "" ? "bg-primary hover:bg-primary/90" : "border-border"}
                >
                  All
                </Button>
                {LANGUAGES.map(lang => (
                  <Button
                    key={lang}
                    variant={selectedLanguage === lang ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedLanguage(lang)}
                    className={selectedLanguage === lang ? "bg-primary hover:bg-primary/90" : "border-border"}
                  >
                    {lang}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-12 text-muted-foreground">Loading snippets...</div>
          ) : snippets.length === 0 ? (
            <Card className="p-12 bg-card border border-border text-center">
              <p className="text-muted-foreground mb-4">No snippets found</p>
              <Button asChild className="bg-primary hover:bg-primary/90">
                <Link href="/signup">Share your snippet</Link>
              </Button>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {snippets.map(snippet => (
                <Card key={snippet.id} className="p-6 bg-card border border-border hover:border-primary/50 transition flex flex-col">
                  <h3 className="font-semibold text-lg mb-2 text-balance line-clamp-2">{snippet.title}</h3>
                  {snippet.description && (
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{snippet.description}</p>
                  )}
                  
                  <div className="bg-background rounded p-3 mb-4 font-mono text-xs text-secondary overflow-auto max-h-32 flex-1">
                    <code className="whitespace-pre-wrap break-words">{snippet.code.substring(0, 200)}{snippet.code.length > 200 ? '...' : ''}</code>
                  </div>

                  <div className="flex gap-2 mb-4 flex-wrap">
                    <span className="px-2 py-1 bg-background text-xs rounded font-mono border border-border">
                      {snippet.language}
                    </span>
                    {snippet.tags?.slice(0, 2).map(tag => (
                      <span key={tag} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="space-y-2 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      {snippet.author}
                    </div>
                    <div className="flex gap-4">
                      <div className="flex items-center gap-1">
                        <Heart className="w-4 h-4" />
                        {snippet.likes || 0}
                      </div>
                      <div className="flex items-center gap-1">
                        <Copy className="w-4 h-4" />
                        {snippet.views || 0} views
                      </div>
                    </div>
                  </div>

                  <Button className="w-full bg-primary hover:bg-primary/90">
                    View Snippet
                  </Button>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
