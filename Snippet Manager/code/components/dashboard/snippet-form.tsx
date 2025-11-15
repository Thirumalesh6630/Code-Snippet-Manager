"use client"

import { useState } from "react"
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { Loader2, X } from 'lucide-react'
import { getCurrentUser } from "@/lib/auth"
import * as storage from "@/lib/client-storage"

const LANGUAGES = [
  "javascript", "typescript", "python", "java", "c", "cpp", "csharp", "go", "rust",
  "php", "ruby", "swift", "kotlin", "sql", "html", "css", "jsx", "tsx", "vue", "svelte", "bash", "json"
]

interface SnippetFormProps {
  initialSnippet?: storage.Snippet
}

export function SnippetForm({ initialSnippet }: SnippetFormProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [tags, setTags] = useState<string[]>(initialSnippet?.tags || [])
  const [tagInput, setTagInput] = useState("")
  const [formData, setFormData] = useState({
    title: initialSnippet?.title || "",
    description: initialSnippet?.description || "",
    code: initialSnippet?.code || "",
    language: initialSnippet?.language || "javascript",
    is_public: initialSnippet?.is_public || false,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value
    }))
  }

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()])
      setTagInput("")
    }
  }

  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter(t => t !== tag))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const user = getCurrentUser()
      if (!user) {
        router.push("/login")
        return
      }

      if (initialSnippet) {
        storage.updateSnippet(initialSnippet.id, {
          title: formData.title,
          description: formData.description,
          code: formData.code,
          language: formData.language,
          tags,
          is_public: formData.is_public,
        })
        toast({
          title: "Success",
          description: "Snippet updated successfully",
        })
      } else {
        storage.createSnippet({
          id: `snippet-${Date.now()}`,
          user_id: user.id,
          title: formData.title,
          description: formData.description,
          code: formData.code,
          language: formData.language,
          tags,
          is_public: formData.is_public,
          created_at: new Date().toISOString(),
          views: 0,
          fork_count: 0,
        })
        toast({
          title: "Success",
          description: "Snippet created successfully",
        })
      }

      router.push("/dashboard/snippets")
      router.refresh()
    } catch (error) {
      console.error("[v0] Error saving snippet:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to save snippet",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card className="p-4 md:p-6 bg-card border border-border">
        <div className="space-y-4">
          <div>
            <Label htmlFor="title" className="text-foreground">Snippet Title *</Label>
            <Input
              id="title"
              name="title"
              placeholder="e.g., React useEffect Cleanup Pattern"
              value={formData.title}
              onChange={handleChange}
              required
              className="mt-2 bg-background border-border text-sm md:text-base"
            />
          </div>

          <div>
            <Label htmlFor="description" className="text-foreground">Description</Label>
            <textarea
              id="description"
              name="description"
              placeholder="Describe what this snippet does..."
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className="w-full mt-2 px-3 py-2 bg-background border border-border rounded-lg text-foreground resize-none text-sm md:text-base"
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="language" className="text-foreground">Language *</Label>
              <select
                id="language"
                name="language"
                value={formData.language}
                onChange={handleChange}
                className="w-full mt-2 px-3 py-2 bg-background border border-border rounded-lg text-foreground text-sm md:text-base"
              >
                {LANGUAGES.map(lang => (
                  <option key={lang} value={lang}>{lang}</option>
                ))}
              </select>
            </div>

            <div className="flex items-end">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="is_public"
                  checked={formData.is_public}
                  onChange={handleChange}
                  className="w-4 h-4 rounded"
                />
                <span className="text-foreground text-sm md:text-base">Make public</span>
              </label>
            </div>
          </div>

          <div>
            <Label className="text-foreground">Tags</Label>
            <div className="flex gap-2 mt-2 flex-col sm:flex-row">
              <Input
                placeholder="Add tags (e.g., react, hooks, best-practices)"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault()
                    handleAddTag()
                  }
                }}
                className="bg-background border-border text-sm md:text-base"
              />
              <Button type="button" onClick={handleAddTag} variant="outline" className="w-full sm:w-auto">
                Add
              </Button>
            </div>
            {tags.length > 0 && (
              <div className="flex gap-2 flex-wrap mt-3">
                {tags.map(tag => (
                  <div key={tag} className="flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-xs md:text-sm">
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="hover:opacity-75"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </Card>

      <Card className="p-4 md:p-6 bg-card border border-border">
        <Label htmlFor="code" className="text-foreground">Code *</Label>
        <textarea
          id="code"
          name="code"
          placeholder="Paste your code here..."
          value={formData.code}
          onChange={handleChange}
          required
          rows={15}
          className="w-full mt-2 px-3 py-2 bg-background border border-border rounded-lg text-foreground font-mono text-xs md:text-sm resize-none"
        />
      </Card>

      <div className="flex flex-col sm:flex-row gap-3">
        <Button type="submit" className="bg-primary hover:bg-primary/90 w-full sm:w-auto" disabled={loading}>
          {loading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Saving...</> : initialSnippet ? "Update Snippet" : "Create Snippet"}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.back()} className="w-full sm:w-auto">
          Cancel
        </Button>
      </div>
    </form>
  )
}
