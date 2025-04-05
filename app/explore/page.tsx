import type { Metadata } from "next"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ExploreBooks } from "@/components/explore-books"

export const metadata: Metadata = {
  title: "Explore Books",
  description: "Discover books from authors around the world",
}

export default function ExplorePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="container py-8 md:py-12">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Explore Books</h1>
              <p className="text-muted-foreground">Discover amazing books from authors around the world</p>
            </div>
          </div>
          <div className="mt-8">
            <ExploreBooks />
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}

