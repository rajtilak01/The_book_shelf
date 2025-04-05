import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { BookList } from "@/components/book-list"
import Link from "next/link"
import { BookOpen } from "lucide-react"

export const metadata: Metadata = {
  title: "My Books",
  description: "Manage your uploaded books",
}

export default function BooksPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">My Books</h2>
          <p className="text-muted-foreground">Manage and track all your uploaded books</p>
        </div>
        <Button asChild>
          <Link href="/dashboard/upload">
            <BookOpen className="mr-2 h-4 w-4" />
            Upload New Book
          </Link>
        </Button>
      </div>

      <BookList />
    </div>
  )
}

