"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Eye, MoreHorizontal, Pencil, Search, Star, Trash2, BookOpen } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useToast } from "@/components/ui/use-toast"

// Mock data for books
const mockBooks = [
  {
    id: 1,
    title: "The Lost City",
    coverImage: "/placeholder.svg?height=400&width=300&text=Book+1",
    genre: "Fantasy",
    status: "published",
    views: 1245,
    rating: 4.7,
    publishedDate: "2023-05-15",
  },
  {
    id: 2,
    title: "Midnight Shadows",
    coverImage: "/placeholder.svg?height=400&width=300&text=Book+2",
    genre: "Mystery",
    status: "published",
    views: 876,
    rating: 4.5,
    publishedDate: "2023-08-22",
  },
  {
    id: 3,
    title: "Beyond the Stars",
    coverImage: "/placeholder.svg?height=400&width=300&text=Book+3",
    genre: "Science Fiction",
    status: "draft",
    views: 0,
    rating: 0,
    publishedDate: "",
  },
  {
    id: 4,
    title: "The Art of Coding",
    coverImage: "/placeholder.svg?height=400&width=300&text=Book+4",
    genre: "Non-Fiction",
    status: "published",
    views: 532,
    rating: 4.8,
    publishedDate: "2023-11-10",
  },
  {
    id: 5,
    title: "Whispers in the Wind",
    coverImage: "/placeholder.svg?height=400&width=300&text=Book+5",
    genre: "Romance",
    status: "published",
    views: 921,
    rating: 4.6,
    publishedDate: "2024-01-05",
  },
]

export function BookList() {
  const [books, setBooks] = useState(mockBooks)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [genreFilter, setGenreFilter] = useState("all")
  const { toast } = useToast()

  const handleDeleteBook = (id: number) => {
    setBooks(books.filter((book) => book.id !== id))
    toast({
      title: "Book deleted",
      description: "The book has been successfully deleted.",
    })
  }

  const filteredBooks = books.filter((book) => {
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || book.status === statusFilter
    const matchesGenre = genreFilter === "all" || book.genre.toLowerCase() === genreFilter.toLowerCase()
    return matchesSearch && matchesStatus && matchesGenre
  })

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 md:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search books..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="published">Published</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
          </SelectContent>
        </Select>
        <Select value={genreFilter} onValueChange={setGenreFilter}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Filter by genre" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Genres</SelectItem>
            <SelectItem value="fantasy">Fantasy</SelectItem>
            <SelectItem value="mystery">Mystery</SelectItem>
            <SelectItem value="science fiction">Science Fiction</SelectItem>
            <SelectItem value="non-fiction">Non-Fiction</SelectItem>
            <SelectItem value="romance">Romance</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {filteredBooks.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
          <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
            <BookOpen className="h-10 w-10 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-semibold">No books found</h3>
            <p className="mb-4 mt-2 text-sm text-muted-foreground">
              {searchQuery || statusFilter !== "all" || genreFilter !== "all"
                ? "Try adjusting your search or filters"
                : "You haven't uploaded any books yet. Start by uploading your first book."}
            </p>
            {!searchQuery && statusFilter === "all" && genreFilter === "all" && (
              <Button asChild>
                <Link href="/dashboard/upload">Upload Book</Link>
              </Button>
            )}
          </div>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredBooks.map((book) => (
            <div key={book.id} className="flex flex-col overflow-hidden rounded-lg border bg-card shadow-sm">
              <div className="relative aspect-[3/4] bg-muted">
                <Image src={book.coverImage || "/placeholder.svg"} alt={book.title} fill className="object-cover" />
                {book.status === "draft" && (
                  <div className="absolute top-2 right-2 bg-background text-foreground px-2 py-1 rounded-md text-xs font-medium">
                    Draft
                  </div>
                )}
              </div>
              <div className="flex flex-col p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold line-clamp-1">{book.title}</h3>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Actions</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href={`/dashboard/books/${book.id}`}>View Details</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/dashboard/books/${book.id}/edit`}>
                          <Pencil className="mr-2 h-4 w-4" />
                          Edit Book
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete Book
                          </DropdownMenuItem>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will permanently delete your book and remove it from
                              our servers.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDeleteBook(book.id)}
                              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <p className="text-sm text-muted-foreground">{book.genre}</p>
                {book.status === "published" && (
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center">
                      <Eye className="mr-1 h-4 w-4 text-muted-foreground" />
                      <span>{book.views}</span>
                    </div>
                    <div className="flex items-center">
                      <Star className="mr-1 h-4 w-4 fill-primary text-primary" />
                      <span>{book.rating}</span>
                    </div>
                    <div className="text-muted-foreground">{new Date(book.publishedDate).toLocaleDateString()}</div>
                  </div>
                )}
                <div className="pt-2">
                  <Button variant="outline" size="sm" className="w-full" asChild>
                    <Link href={`/dashboard/books/${book.id}`}>View Details</Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

