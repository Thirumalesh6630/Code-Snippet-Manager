import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Code2, Zap, Share2, Lock, Copy, Sparkles } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
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
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-32">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-background" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-balance">
              Your Personal Code Snippet <span className="text-primary">Vault</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-balance">
              Save, organize, and share your code snippets with syntax highlighting, collections, and a vibrant developer community.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                <Link href="/signup">Get Started Free</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/explore">Explore Snippets</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12 text-center">Powerful Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="p-6 bg-card border border-border">
              <Sparkles className="w-8 h-8 text-primary mb-4" />
              <h3 className="font-semibold text-lg mb-2">Syntax Highlighting</h3>
              <p className="text-muted-foreground">Support for 50+ programming languages with beautiful syntax highlighting</p>
            </Card>
            <Card className="p-6 bg-card border border-border">
              <Copy className="w-8 h-8 text-primary mb-4" />
              <h3 className="font-semibold text-lg mb-2">Smart Organization</h3>
              <p className="text-muted-foreground">Create collections and use tags to organize your code efficiently</p>
            </Card>
            <Card className="p-6 bg-card border border-border">
              <Lock className="w-8 h-8 text-primary mb-4" />
              <h3 className="font-semibold text-lg mb-2">Privacy Control</h3>
              <p className="text-muted-foreground">Keep your snippets private or share them with the community</p>
            </Card>
            <Card className="p-6 bg-card border border-border">
              <Share2 className="w-8 h-8 text-primary mb-4" />
              <h3 className="font-semibold text-lg mb-2">Fork & Modify</h3>
              <p className="text-muted-foreground">Fork public snippets and modify them to suit your needs</p>
            </Card>
            <Card className="p-6 bg-card border border-border">
              <Zap className="w-8 h-8 text-primary mb-4" />
              <h3 className="font-semibold text-lg mb-2">Quick Search</h3>
              <p className="text-muted-foreground">Find snippets by language, tags, author, or content instantly</p>
            </Card>
            <Card className="p-6 bg-card border border-border">
              <Code2 className="w-8 h-8 text-primary mb-4" />
              <h3 className="font-semibold text-lg mb-2">Community</h3>
              <p className="text-muted-foreground">Discover, like, and learn from code shared by developers</p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 border-t border-border bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to organize your code?</h2>
          <p className="text-lg text-muted-foreground mb-8">Join thousands of developers managing their snippets with CodeVault</p>
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
            <Link href="/signup">Start For Free</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-muted-foreground">
          <p>&copy; 2025 CodeVault. Built with passion for developers.</p>
        </div>
      </footer>
    </div>
  )
}
