import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Code2 } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center">
      <div className="text-center space-y-6 px-4">
        <div>
          <Code2 className="w-20 h-20 mx-auto mb-4 text-muted-foreground" />
          <h1 className="text-6xl font-bold mb-2">404</h1>
          <p className="text-2xl font-semibold mb-2">Page not found</p>
          <p className="text-muted-foreground mb-8 max-w-md">Sorry, we couldn't find the page you're looking for. The snippet or page might have been moved or deleted.</p>
        </div>
        <div className="flex gap-4 justify-center flex-wrap">
          <Button asChild className="bg-primary hover:bg-primary/90">
            <Link href="/">Back to Home</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/explore">Browse Snippets</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
