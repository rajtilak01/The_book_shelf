import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "BookHub - Share and Discover Books",
    template: "%s | BookHub",
  },
  description: "Upload, share and discover books from authors around the world",
  keywords: ["books", "reading", "authors", "literature", "ebooks", "publishing"],
  authors: [{ name: "BookHub" }],
  creator: "BookHub",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://bookhub.com",
    title: "BookHub - Share and Discover Books",
    description: "Upload, share and discover books from authors around the world",
    siteName: "BookHub",
  },
  twitter: {
    card: "summary_large_image",
    title: "BookHub - Share and Discover Books",
    description: "Upload, share and discover books from authors around the world",
    creator: "@bookhub",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("min-h-screen bg-background font-sans antialiased", inter.className)}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'