"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { BookOpen, Home, PlusCircle, Settings, Upload, User } from "lucide-react"
import { Button } from "@/components/ui/button"

export function DashboardNav() {
  const pathname = usePathname()

  const routes = [
    {
      href: "/dashboard",
      label: "Overview",
      icon: Home,
      exact: true,
    },
    {
      href: "/dashboard/books",
      label: "My Books",
      icon: BookOpen,
    },
    {
      href: "/dashboard/upload",
      label: "Upload Book",
      icon: Upload,
    },
    {
      href: "/dashboard/profile",
      label: "Profile",
      icon: User,
    },
    {
      href: "/dashboard/settings",
      label: "Settings",
      icon: Settings,
    },
  ]

  return (
    <nav className="grid items-start gap-2 px-2 py-4">
      {routes.map((route) => {
        const isActive = route.exact ? pathname === route.href : pathname.startsWith(route.href)

        return (
          <Link
            key={route.href}
            href={route.href}
            className={cn(
              "group flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
              isActive ? "bg-accent text-accent-foreground" : "transparent",
            )}
          >
            <route.icon className="h-4 w-4" />
            <span>{route.label}</span>
          </Link>
        )
      })}
      <div className="mt-6">
        <Button asChild className="w-full justify-start gap-2">
          <Link href="/dashboard/upload">
            <PlusCircle className="h-4 w-4" />
            <span>Upload New Book</span>
          </Link>
        </Button>
      </div>
    </nav>
  )
}

