import type { Metadata } from "next"
import { BookUploadForm } from "@/components/book-upload-form"

export const metadata: Metadata = {
  title: "Upload Book",
  description: "Upload a new book to your BookHub account",
}

export default function UploadPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Upload Book</h2>
        <p className="text-muted-foreground">Share your book with readers around the world</p>
      </div>
      <div className="border rounded-lg p-4 md:p-6">
        <BookUploadForm />
      </div>
    </div>
  )
}

