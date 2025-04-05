"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { BookOpen, Menu, Moon, Sun, User } from "lucide-react"
import { useTheme } from "next-themes"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function DashboardHeader() {
  const { setTheme, theme } = useTheme()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleLogout = () => {
    // In a real app, you would call your logout API here
    // await signOut()

    toast({
      title: "Logged out",
      description: "You have been logged out successfully.",
    })

    router.push("/")
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center space-x-2">
            <BookOpen className="h-6 w-6" />
            <span className="hidden font-bold sm:inline-block">BookHub</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
                <span className="sr-only">User menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/dashboard/profile">Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/dashboard/settings">Settings</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2 md:hidden">
          <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
          <Button variant="ghost" size="icon" onClick={toggleMenu}>
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "fixed inset-0 top-14 z-50 grid h-[calc(100vh-3.5rem)] grid-flow-row auto-rows-max overflow-auto p-6 pb-32 shadow-md animate-in md:hidden",
          isMenuOpen ? "slide-in-from-top-80" : "hidden",
          "bg-background",
        )}
      >
        <div className="flex flex-col space-y-4">
          <Link
            href="/dashboard"
            onClick={toggleMenu}
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            Dashboard
          </Link>
          <Link
            href="/dashboard/books"
            onClick={toggleMenu}
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            My Books
          </Link>
          <Link
            href="/dashboard/upload"
            onClick={toggleMenu}
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            Upload Book
          </Link>
          <Link
            href="/dashboard/profile"
            onClick={toggleMenu}
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            Profile
          </Link>
          <Link
            href="/dashboard/settings"
            onClick={toggleMenu}
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            Settings
          </Link>
          <Button variant="ghost" className="justify-start px-2" onClick={handleLogout}>
            Log out
          </Button>
        </div>
      </div>
    </header>
  )
}

