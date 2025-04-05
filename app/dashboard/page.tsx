"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Eye, Star, TrendingUp, Users } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { AnimatedButton } from "@/components/ui/animated-button"
import { AnimatedCard } from "@/components/ui/animated-card"
import { PageTransition } from "@/components/ui/page-transition"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { AnimatedStatsCard } from "@/components/dashboard/animated-stats-card"
import { staggeredList, listItem } from "@/lib/framer-animations"

export default function DashboardPage() {
  return (
    <PageTransition>
      <div className="space-y-6">
        <motion.div
          className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <motion.h2
              className="text-2xl font-bold tracking-tight"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Dashboard
            </motion.h2>
            <motion.p
              className="text-muted-foreground"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Welcome back! Here's an overview of your books.
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Link href="/dashboard/upload">
              <AnimatedButton>
                <BookOpen className="mr-2 h-4 w-4" />
                Upload New Book
              </AnimatedButton>
            </Link>
          </motion.div>
        </motion.div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <AnimatedStatsCard title="Total Books" value={12} change="+2 from last month" icon={BookOpen} delay={0.1} />
          <AnimatedStatsCard title="Total Views" value={2350} change="+15% from last month" icon={Eye} delay={0.2} />
          <AnimatedStatsCard title="Followers" value={48} change="+8 from last month" icon={Users} delay={0.3} />
          <AnimatedStatsCard title="Average Rating" value={4.8} change="+0.2 from last month" icon={Star} delay={0.4} />
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <ScrollReveal className="lg:col-span-4" delay={0.3}>
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your books' performance in the last 30 days</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full">
                  <motion.div
                    className="flex items-center justify-center h-full bg-muted rounded-md"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                  >
                    <TrendingUp className="h-8 w-8 text-muted-foreground" />
                    <span className="ml-2 text-sm text-muted-foreground">Activity chart will appear here</span>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </ScrollReveal>

          <ScrollReveal className="lg:col-span-3" delay={0.4} direction="right">
            <Card>
              <CardHeader>
                <CardTitle>Popular Books</CardTitle>
                <CardDescription>Your most viewed books this month</CardDescription>
              </CardHeader>
              <CardContent>
                <motion.div className="space-y-4" variants={staggeredList(0.1)} initial="hidden" animate="visible">
                  {[1, 2, 3].map((book) => (
                    <motion.div
                      key={book}
                      className="flex items-center gap-4"
                      variants={listItem}
                      whileHover={{ y: -2, transition: { duration: 0.2 } }}
                    >
                      <motion.div
                        className="w-16 h-20 relative rounded-md overflow-hidden"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Image
                          src={`/placeholder.svg?height=80&width=64&text=Book+${book}`}
                          alt={`Book ${book}`}
                          fill
                          className="object-cover"
                        />
                      </motion.div>
                      <div className="flex-1 space-y-1">
                        <p className="font-medium">Book Title {book}</p>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Eye className="mr-1 h-3 w-3" />
                          <span>{320 * book} views</span>
                          <Star className="ml-3 mr-1 h-3 w-3" />
                          <span>4.{9 - book}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </CardContent>
            </Card>
          </ScrollReveal>
        </div>

        <div>
          <motion.h3
            className="text-lg font-medium mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            Recent Books
          </motion.h3>
          <motion.div
            className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
            variants={staggeredList(0.1)}
            initial="hidden"
            animate="visible"
          >
            {[1, 2, 3].map((book) => (
              <motion.div key={book} variants={listItem}>
                <AnimatedCard>
                  <CardContent className="p-0">
                    <div className="flex flex-col">
                      <div className="aspect-[3/2] relative">
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.3 }}
                          className="h-full w-full"
                        >
                          <Image
                            src={`/placeholder.svg?height=200&width=300&text=Book+${book}`}
                            alt={`Book ${book}`}
                            fill
                            className="object-cover rounded-t-lg"
                          />
                        </motion.div>
                      </div>
                      <div className="p-4 space-y-2">
                        <h4 className="font-semibold">Book Title {book}</h4>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          This is a short description of the book. It provides a brief overview of what readers can
                          expect.
                        </p>
                        <div className="flex justify-between items-center pt-2">
                          <div className="flex items-center">
                            <motion.div whileHover={{ scale: 1.2 }}>
                              <Star className="h-4 w-4 fill-primary text-primary" />
                            </motion.div>
                            <span className="ml-1 text-sm">4.{9 - book}</span>
                          </div>
                          <AnimatedButton variant="ghost" size="sm" asChild>
                            <Link href={`/dashboard/books/${book}`}>View Details</Link>
                          </AnimatedButton>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </AnimatedCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </PageTransition>
  )
}

