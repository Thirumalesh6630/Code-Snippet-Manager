"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  FileText,
  Home,
  LayoutDashboard,
  Menu,
  Users,
  X,
  UserPlus,
  Stethoscope,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface NavItem {
  title: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  submenu?: {
    title: string
    href: string
  }[]
}

const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Patients",
    href: "/dashboard/patients",
    icon: Users,
    submenu: [
      {
        title: "All Patients",
        href: "/dashboard/patients",
      },
      {
        title: "Add Patient",
        href: "/dashboard/patients/add",
      },
      {
        title: "Patient Search",
        href: "/dashboard/patients/search",
      },
    ],
  },
  {
    title: "Staff",
    href: "/dashboard/staff",
    icon: UserPlus,
    submenu: [
      {
        title: "All Staff",
        href: "/dashboard/staff",
      },
      {
        title: "Add Staff",
        href: "/dashboard/staff/add",
      },
    ],
  },
  {
    title: "Appointments",
    href: "/dashboard/appointments",
    icon: Calendar,
  },
  {
    title: "Departments",
    href: "/dashboard/departments",
    icon: Home,
  },
  {
    title: "Medical Records",
    href: "/dashboard/records",
    icon: FileText,
  },
  {
    title: "Prescriptions",
    href: "/dashboard/prescriptions",
    icon: ClipboardList,
  },
  {
    title: "Treatments",
    href: "/dashboard/treatments",
    icon: Stethoscope,
  },
]

export function DashboardNav() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null)

  const toggleSubmenu = (title: string) => {
    if (openSubmenu === title) {
      setOpenSubmenu(null)
    } else {
      setOpenSubmenu(title)
    }
  }

  return (
    <>
      <Button
        variant="outline"
        size="icon"
        className="fixed left-4 top-4 z-40 md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        <span className="sr-only">Toggle Menu</span>
      </Button>

      <div
        className={cn("fixed inset-0 z-30 bg-background/80 backdrop-blur-sm md:hidden", isOpen ? "block" : "hidden")}
        onClick={() => setIsOpen(false)}
      />

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-30 flex w-64 flex-col border-r bg-background transition-all md:static",
          isCollapsed && "w-[70px]",
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
        )}
      >
        <div className="flex h-16 items-center justify-between border-b px-4">
          <Link href="/dashboard" className={cn("flex items-center gap-2", isCollapsed && "hidden")}>
            <span className="text-lg font-semibold text-emerald-700">Thirumal Hospital</span>
          </Link>
          <Button variant="ghost" size="icon" className="hidden md:flex" onClick={() => setIsCollapsed(!isCollapsed)}>
            {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            <span className="sr-only">Toggle Sidebar</span>
          </Button>
        </div>

        <nav className="flex-1 overflow-auto p-2">
          <ul className="grid gap-1">
            {navItems.map((item) => (
              <li key={item.href} className="space-y-1">
                {item.submenu ? (
                  <>
                    <button
                      onClick={() => toggleSubmenu(item.title)}
                      className={cn(
                        "flex w-full items-center justify-between gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                        pathname.startsWith(item.href) && "bg-accent text-accent-foreground",
                        isCollapsed && "justify-center px-2",
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <item.icon className={cn("h-5 w-5", isCollapsed && "h-6 w-6")} />
                        {!isCollapsed && <span>{item.title}</span>}
                      </div>
                      {!isCollapsed && (
                        <ChevronRight
                          className={cn("h-4 w-4 transition-transform", openSubmenu === item.title && "rotate-90")}
                        />
                      )}
                    </button>

                    {!isCollapsed && openSubmenu === item.title && (
                      <ul className="ml-6 mt-1 grid gap-1">
                        {item.submenu.map((subitem) => (
                          <li key={subitem.href}>
                            <Link
                              href={subitem.href}
                              className={cn(
                                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                                pathname === subitem.href && "bg-accent/50 text-accent-foreground",
                              )}
                            >
                              {subitem.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                      pathname === item.href && "bg-accent text-accent-foreground",
                      isCollapsed && "justify-center px-2",
                    )}
                  >
                    <item.icon className={cn("h-5 w-5", isCollapsed && "h-6 w-6")} />
                    {!isCollapsed && <span>{item.title}</span>}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  )
}
