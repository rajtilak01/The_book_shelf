"use client"

import type React from "react"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { BookOpen, Menu, Moon, Search, Sun, X } from "lucide-react"
import { useTheme } from "next-themes"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { AnimatedButton } from "@/components/ui/animated-button"

export function SiteHeader() {
  const { setTheme, theme } = useTheme()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
    }
  }

  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
  }

  const logoVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
  }

  return (
    <motion.header
      className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      initial="hidden"
      animate="visible"
      variants={navVariants}
    >
      <div className="container flex h-16 items-center justify-between">
        <motion.div className="flex items-center gap-2" variants={logoVariants}>
          <Link href="/" className="flex items-center space-x-2">
            <motion.div
              whileHover={{ rotate: 10, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300, damping: 10 }}
            >
              <BookOpen className="h-6 w-6" />
            </motion.div>
            <motion.span
              className="hidden font-bold sm:inline-block"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              BookHub
            </motion.span>
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <motion.nav className="hidden md:flex items-center gap-6" variants={navVariants}>
          <motion.div variants={itemVariants}>
            <Link href="/explore" className="text-sm font-medium hover:underline underline-offset-4">
              Explore
            </Link>
          </motion.div>
          <motion.div variants={itemVariants}>
            <Link href="/categories" className="text-sm font-medium hover:underline underline-offset-4">
              Categories
            </Link>
          </motion.div>
          <motion.div variants={itemVariants}>
            <Link href="/authors" className="text-sm font-medium hover:underline underline-offset-4">
              Authors
            </Link>
          </motion.div>
          <motion.div variants={itemVariants}>
            <Link href="/about" className="text-sm font-medium hover:underline underline-offset-4">
              About
            </Link>
          </motion.div>
        </motion.nav>

        {/* Desktop Search and Auth */}
        <motion.div className="hidden md:flex items-center gap-4" variants={navVariants}>
          <motion.form onSubmit={handleSearch} className="relative" variants={itemVariants}>
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search books..."
              className="w-[200px] pl-8 md:w-[200px] lg:w-[300px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </motion.form>
          <motion.div variants={itemVariants}>
            <motion.div whileHover={{ rotate: 180 }} transition={{ duration: 0.3 }}>
              <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
                <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </motion.div>
          </motion.div>
          <motion.div variants={itemVariants}>
            <Link href="/login">
              <AnimatedButton variant="ghost">Log in</AnimatedButton>
            </Link>
          </motion.div>
          <motion.div variants={itemVariants}>
            <Link href="/signup">
              <AnimatedButton>Sign up</AnimatedButton>
            </Link>
          </motion.div>
        </motion.div>

        {/* Mobile Menu Button */}
        <motion.div className="flex items-center gap-2 md:hidden" variants={navVariants}>
          <motion.div variants={itemVariants}>
            <motion.div whileHover={{ rotate: 180 }} transition={{ duration: 0.3 }}>
              <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
                <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </motion.div>
          </motion.div>
          <motion.div variants={itemVariants}>
            <Button variant="ghost" size="icon" onClick={toggleMenu}>
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className={cn(
              "fixed inset-0 top-16 z-50 grid h-[calc(100vh-4rem)] grid-flow-row auto-rows-max overflow-auto p-6 pb-32 shadow-md md:hidden",
              "bg-background",
            )}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex flex-col space-y-4">
              <form onSubmit={handleSearch} className="relative mb-4">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search books..."
                  className="w-full pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </form>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                <Link
                  href="/explore"
                  onClick={toggleMenu}
                  className="text-sm font-medium hover:underline underline-offset-4"
                >
                  Explore
                </Link>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <Link
                  href="/categories"
                  onClick={toggleMenu}
                  className="text-sm font-medium hover:underline underline-offset-4"
                >
                  Categories
                </Link>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                <Link
                  href="/authors"
                  onClick={toggleMenu}
                  className="text-sm font-medium hover:underline underline-offset-4"
                >
                  Authors
                </Link>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                <Link
                  href="/about"
                  onClick={toggleMenu}
                  className="text-sm font-medium hover:underline underline-offset-4"
                >
                  About
                </Link>
              </motion.div>
              <div className="flex flex-col gap-2 pt-4">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
                  <Link href="/login" onClick={toggleMenu}>
                    <Button variant="outline" className="w-full">
                      Log in
                    </Button>
                  </Link>
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
                  <Link href="/signup" onClick={toggleMenu}>
                    <Button className="w-full">Sign up</Button>
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

