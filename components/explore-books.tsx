"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Input } from "@/components/ui/input"
import { BookOpen, Search, Star } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { motion, AnimatePresence } from "framer-motion"
import { AnimatedButton } from "@/components/ui/animated-button"
import { AnimatedCard } from "@/components/ui/animated-card"
import { listItem } from "@/lib/framer-animations"

// Mock data for books
const mockBooks = Array.from({ length: 12 }).map((_, i) => ({
  id: i + 1,
  title: `Book Title ${i + 1}`,
  author: `Author Name ${i + 1}`,
  coverImage: `/placeholder.svg?height=400&width=300&text=Book+${i + 1}`,
  genre: ["Fiction", "Non-Fiction", "Science Fiction", "Fantasy", "Mystery", "Romance"][i % 6],
  rating: (4 + Math.random()).toFixed(1),
  reviews: Math.floor(Math.random() * 100) + 5,
}))

export function ExploreBooks() {
  const [searchQuery, setSearchQuery] = useState("")
  const [genreFilter, setGenreFilter] = useState("all")
  const [sortBy, setSortBy] = useState("popular")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  // Simulate filtering delay
  useEffect(() => {
    setIsLoading(true)
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [searchQuery, genreFilter, sortBy])

  const filteredBooks = mockBooks.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesGenre = genreFilter === "all" || book.genre.toLowerCase() === genreFilter.toLowerCase()
    return matchesSearch && matchesGenre
  })

  // Sort books based on selected option
  const sortedBooks = [...filteredBooks].sort((a, b) => {
    if (sortBy === "popular") {
      return b.reviews - a.reviews
    } else if (sortBy === "rating") {
      return Number.parseFloat(b.rating) - Number.parseFloat(a.rating)
    } else if (sortBy === "newest") {
      return b.id - a.id
    } else {
      return a.title.localeCompare(b.title)
    }
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  return (
    <div className="space-y-6">
      <motion.div
        className="flex flex-col gap-4 md:flex-row"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search by title or author..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={genreFilter} onValueChange={setGenreFilter}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Filter by genre" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Genres</SelectItem>
            <SelectItem value="fiction">Fiction</SelectItem>
            <SelectItem value="non-fiction">Non-Fiction</SelectItem>
            <SelectItem value="science fiction">Science Fiction</SelectItem>
            <SelectItem value="fantasy">Fantasy</SelectItem>
            <SelectItem value="mystery">Mystery</SelectItem>
            <SelectItem value="romance">Romance</SelectItem>
          </SelectContent>
        </Select>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="popular">Most Popular</SelectItem>
            <SelectItem value="rating">Highest Rated</SelectItem>
            <SelectItem value="newest">Newest</SelectItem>
            <SelectItem value="title">Title (A-Z)</SelectItem>
          </SelectContent>
        </Select>
      </motion.div>

      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <motion.div
                key={`skeleton-${i}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
              >
                <Card className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="aspect-[3/4] bg-muted animate-pulse" />
                    <div className="p-4 space-y-2">
                      <div className="h-5 bg-muted rounded animate-pulse" />
                      <div className="h-4 bg-muted rounded w-2/3 animate-pulse" />
                      <div className="flex items-center justify-between pt-2">
                        <div className="h-6 bg-muted rounded w-1/4 animate-pulse" />
                        <div className="h-6 bg-muted rounded w-1/3 animate-pulse" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        ) : sortedBooks.length === 0 ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center"
          >
            <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <BookOpen className="h-10 w-10 text-muted-foreground" />
              </motion.div>
              <motion.h3
                className="mt-4 text-lg font-semibold"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                No books found
              </motion.h3>
              <motion.p
                className="mb-4 mt-2 text-sm text-muted-foreground"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Try adjusting your search or filters to find what you're looking for.
              </motion.p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="results"
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0 }}
          >
            {sortedBooks.map((book) => (
              <motion.div key={book.id} variants={listItem} layout>
                <AnimatedCard className="overflow-hidden">
                  <CardContent className="p-0">
                    <Link href={`/books/${book.id}`} className="block">
                      <div className="aspect-[3/4] relative">
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.3 }}
                          className="h-full w-full"
                        >
                          <Image
                            src={book.coverImage || "/placeholder.svg"}
                            alt={book.title}
                            fill
                            className="object-cover"
                          />
                        </motion.div>
                      </div>
                      <div className="p-4 space-y-2">
                        <h3 className="font-semibold line-clamp-1">{book.title}</h3>
                        <p className="text-sm text-muted-foreground">{book.author}</p>
                        <div className="flex items-center justify-between">
                          <motion.span className="text-xs px-2 py-1 bg-muted rounded-md" whileHover={{ scale: 1.05 }}>
                            {book.genre}
                          </motion.span>
                          <motion.div className="flex items-center" whileHover={{ scale: 1.05 }}>
                            <Star className="h-4 w-4 fill-primary text-primary" />
                            <span className="ml-1 text-sm">{book.rating}</span>
                            <span className="ml-1 text-xs text-muted-foreground">({book.reviews})</span>
                          </motion.div>
                        </div>
                        <AnimatedButton variant="ghost" size="sm" className="w-full mt-2">
                          View Book
                        </AnimatedButton>
                      </div>
                    </Link>
                  </CardContent>
                </AnimatedCard>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {sortedBooks.length > 0 && !isLoading && (
        <motion.div
          className="flex justify-center pt-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <AnimatedButton variant="outline">Load More</AnimatedButton>
        </motion.div>
      )}
    </div>
  )
}

