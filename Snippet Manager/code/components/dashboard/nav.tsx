"use client"

import Link from "next/link"
import { usePathname } from 'next/navigation'
import { cn } from "@/lib/utils"
import { Code2, Folder, Heart, Share2, Settings } from 'lucide-react'

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: Code2 },
  { href: "/dashboard/snippets", label: "Snippets", icon: Code2 },
  { href: "/dashboard/collections", label: "Collections", icon: Folder },
  { href: "/dashboard/likes", label: "Liked Snippets", icon: Heart },
  { href: "/dashboard/shared", label: "Shared", icon: Share2 },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
]

export function DashboardNav() {
  const pathname = usePathname()

  return (
    <nav className="w-64 border-r border-border bg-card/30 p-4 space-y-2 hidden md:block">
      {navItems.map(item => {
        const Icon = item.icon
        const isActive = pathname === item.href
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-lg transition",
              isActive
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-card/50"
            )}
          >
            <Icon className="w-4 h-4" />
            {item.label}
          </Link>
        )
      })}
    </nav>
  )
}
