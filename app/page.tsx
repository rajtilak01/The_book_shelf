"use client"

import Link from "next/link"
import Image from "next/image"
import { BookOpen, Upload, Users, Star } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { motion } from "framer-motion"
import { AnimatedButton } from "@/components/ui/animated-button"
import { AnimatedText } from "@/components/ui/animated-text"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { PageTransition } from "@/components/ui/page-transition"
import { fadeIn, fadeInUp, staggerContainer, listItem, staggeredList } from "@/lib/framer-animations"

export default function Home() {
  return (
    <PageTransition>
      <div className="flex min-h-screen flex-col">
        <SiteHeader />
        <main className="flex-1">
          {/* Hero Section */}
          <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 overflow-hidden">
            <div className="container px-4 md:px-6">
              <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
                <motion.div
                  className="flex flex-col justify-center space-y-4"
                  initial="hidden"
                  animate="visible"
                  variants={fadeInUp}
                >
                  <div className="space-y-2">
                    <AnimatedText
                      text="Share Your Stories With The World"
                      className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none"
                      tag="h1"
                    />
                    <motion.p
                      className="max-w-[600px] text-muted-foreground md:text-xl"
                      variants={fadeIn}
                      initial="hidden"
                      animate="visible"
                      transition={{ delay: 0.4 }}
                    >
                      Upload your books, connect with readers, and discover new stories from authors around the world.
                    </motion.p>
                  </div>
                  <motion.div
                    className="flex flex-col gap-2 min-[400px]:flex-row"
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 0.6, staggerChildren: 0.1 }}
                  >
                    <motion.div variants={fadeInUp}>
                      <Link href="/signup">
                        <AnimatedButton size="lg">Get Started</AnimatedButton>
                      </Link>
                    </motion.div>
                    <motion.div variants={fadeInUp}>
                      <Link href="/explore">
                        <AnimatedButton size="lg" variant="outline">
                          Explore Books
                        </AnimatedButton>
                      </Link>
                    </motion.div>
                  </motion.div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="mx-auto aspect-video overflow-hidden rounded-xl sm:w-full lg:order-last"
                >
                  <Image
                    src="/placeholder.svg?height=550&width=550"
                    width={550}
                    height={550}
                    alt="BookHub Platform"
                    className="object-cover"
                    priority
                  />
                </motion.div>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
            <div className="container px-4 md:px-6">
              <ScrollReveal>
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                  <div className="space-y-2">
                    <AnimatedText
                      text="Features"
                      className="text-3xl font-bold tracking-tighter sm:text-5xl"
                      tag="h2"
                    />
                    <motion.p
                      className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed"
                      variants={fadeIn}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                    >
                      Everything you need to share and discover amazing books
                    </motion.p>
                  </div>
                </div>
              </ScrollReveal>

              <motion.div
                className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12"
                variants={staggeredList()}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <ScrollReveal direction="up" delay={0.1}>
                  <motion.div
                    className="flex flex-col justify-center space-y-4 rounded-lg border bg-background p-6 shadow-sm"
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  >
                    <motion.div
                      className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground"
                      whileHover={{ rotate: 5, scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 10 }}
                    >
                      <Upload className="h-6 w-6" />
                    </motion.div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold">Easy Uploads</h3>
                      <p className="text-muted-foreground">
                        Upload your books in multiple formats with just a few clicks.
                      </p>
                    </div>
                  </motion.div>
                </ScrollReveal>

                <ScrollReveal direction="up" delay={0.2}>
                  <motion.div
                    className="flex flex-col justify-center space-y-4 rounded-lg border bg-background p-6 shadow-sm"
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  >
                    <motion.div
                      className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground"
                      whileHover={{ rotate: -5, scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 10 }}
                    >
                      <BookOpen className="h-6 w-6" />
                    </motion.div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold">Reader-Friendly</h3>
                      <p className="text-muted-foreground">Beautiful reading experience optimized for all devices.</p>
                    </div>
                  </motion.div>
                </ScrollReveal>

                <ScrollReveal direction="up" delay={0.3}>
                  <motion.div
                    className="flex flex-col justify-center space-y-4 rounded-lg border bg-background p-6 shadow-sm"
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  >
                    <motion.div
                      className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground"
                      whileHover={{ rotate: 5, scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 10 }}
                    >
                      <Users className="h-6 w-6" />
                    </motion.div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold">Community</h3>
                      <p className="text-muted-foreground">
                        Connect with readers and authors who share your interests.
                      </p>
                    </div>
                  </motion.div>
                </ScrollReveal>
              </motion.div>
            </div>
          </section>

          {/* How It Works Section */}
          <section className="w-full py-12 md:py-24 lg:py-32">
            <div className="container px-4 md:px-6">
              <ScrollReveal>
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                  <div className="space-y-2">
                    <AnimatedText
                      text="How It Works"
                      className="text-3xl font-bold tracking-tighter sm:text-5xl"
                      tag="h2"
                    />
                    <motion.p
                      className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed"
                      variants={fadeIn}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                    >
                      Start sharing your books in three simple steps
                    </motion.p>
                  </div>
                </div>
              </ScrollReveal>

              <motion.div
                className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12"
                variants={staggeredList()}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <ScrollReveal direction="up" delay={0.1}>
                  <motion.div
                    className="flex flex-col items-center justify-center space-y-4 text-center"
                    variants={listItem}
                  >
                    <motion.div
                      className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-3xl font-bold text-primary-foreground"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300, damping: 10 }}
                    >
                      1
                    </motion.div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold">Create an Account</h3>
                      <p className="text-muted-foreground">Sign up for free and set up your author profile.</p>
                    </div>
                  </motion.div>
                </ScrollReveal>

                <ScrollReveal direction="up" delay={0.2}>
                  <motion.div
                    className="flex flex-col items-center justify-center space-y-4 text-center"
                    variants={listItem}
                  >
                    <motion.div
                      className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-3xl font-bold text-primary-foreground"
                      whileHover={{ scale: 1.1, rotate: -5 }}
                      transition={{ type: "spring", stiffness: 300, damping: 10 }}
                    >
                      2
                    </motion.div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold">Upload Your Book</h3>
                      <p className="text-muted-foreground">Add your book details, cover image, and upload your file.</p>
                    </div>
                  </motion.div>
                </ScrollReveal>

                <ScrollReveal direction="up" delay={0.3}>
                  <motion.div
                    className="flex flex-col items-center justify-center space-y-4 text-center"
                    variants={listItem}
                  >
                    <motion.div
                      className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-3xl font-bold text-primary-foreground"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300, damping: 10 }}
                    >
                      3
                    </motion.div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold">Share & Connect</h3>
                      <p className="text-muted-foreground">Share your book with the world and connect with readers.</p>
                    </div>
                  </motion.div>
                </ScrollReveal>
              </motion.div>
            </div>
          </section>

          {/* Featured Books Section */}
          <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
            <div className="container px-4 md:px-6">
              <ScrollReveal>
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                  <div className="space-y-2">
                    <AnimatedText
                      text="Featured Books"
                      className="text-3xl font-bold tracking-tighter sm:text-5xl"
                      tag="h2"
                    />
                    <motion.p
                      className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed"
                      variants={fadeIn}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                    >
                      Discover popular books from our community
                    </motion.p>
                  </div>
                </div>
              </ScrollReveal>

              <motion.div
                className="mx-auto grid max-w-5xl items-center gap-6 py-12 md:grid-cols-2 lg:grid-cols-3"
                variants={staggeredList(0.05)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
              >
                {[1, 2, 3, 4, 5, 6].map((book) => (
                  <motion.div
                    key={book}
                    variants={listItem}
                    whileHover={{
                      y: -10,
                      transition: { duration: 0.2 },
                    }}
                    className="flex flex-col overflow-hidden rounded-lg border bg-background shadow-sm"
                  >
                    <div className="aspect-[3/4] relative">
                      <motion.div className="w-full h-full" whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
                        <Image
                          src={`/placeholder.svg?height=400&width=300&text=Book+${book}`}
                          alt={`Book ${book}`}
                          fill
                          className="object-cover"
                        />
                      </motion.div>
                    </div>
                    <div className="flex flex-col space-y-1.5 p-4">
                      <h3 className="font-semibold">Book Title {book}</h3>
                      <p className="text-sm text-muted-foreground">Author Name</p>
                      <motion.div
                        className="flex items-center pt-2"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.2 * book }}
                      >
                        <motion.div whileHover={{ scale: 1.2 }}>
                          <Star className="h-4 w-4 fill-primary text-primary" />
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.2 }}>
                          <Star className="h-4 w-4 fill-primary text-primary" />
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.2 }}>
                          <Star className="h-4 w-4 fill-primary text-primary" />
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.2 }}>
                          <Star className="h-4 w-4 fill-primary text-primary" />
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.2 }}>
                          <Star className="h-4 w-4 text-muted-foreground" />
                        </motion.div>
                        <span className="ml-2 text-sm text-muted-foreground">(24 reviews)</span>
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
              <div className="flex justify-center">
                <Link href="/explore">
                  <AnimatedButton size="lg" variant="outline">
                    View All Books
                  </AnimatedButton>
                </Link>
              </div>
            </div>
          </section>

          {/* Testimonials Section */}
          <section className="w-full py-12 md:py-24 lg:py-32">
            <div className="container px-4 md:px-6">
              <ScrollReveal>
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                  <div className="space-y-2">
                    <AnimatedText
                      text="What Our Users Say"
                      className="text-3xl font-bold tracking-tighter sm:text-5xl"
                      tag="h2"
                    />
                    <motion.p
                      className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed"
                      variants={fadeIn}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                    >
                      Hear from authors and readers who love BookHub
                    </motion.p>
                  </div>
                </div>
              </ScrollReveal>

              <motion.div
                className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-2 lg:gap-12"
                variants={staggeredList()}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <ScrollReveal direction="left">
                  <motion.div
                    className="flex flex-col justify-between rounded-lg border bg-background p-6 shadow-sm"
                    whileHover={{ y: -5, boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}
                  >
                    <div className="space-y-4">
                      <p className="text-muted-foreground">
                        "BookHub has transformed how I share my writing with the world. The platform is intuitive, and
                        the community is incredibly supportive."
                      </p>
                    </div>
                    <div className="flex items-center space-x-4 pt-4">
                      <motion.div
                        className="h-10 w-10 rounded-full bg-muted"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                      ></motion.div>
                      <div>
                        <p className="text-sm font-medium">Sarah Johnson</p>
                        <p className="text-sm text-muted-foreground">Fantasy Author</p>
                      </div>
                    </div>
                  </motion.div>
                </ScrollReveal>

                <ScrollReveal direction="right">
                  <motion.div
                    className="flex flex-col justify-between rounded-lg border bg-background p-6 shadow-sm"
                    whileHover={{ y: -5, boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}
                  >
                    <div className="space-y-4">
                      <p className="text-muted-foreground">
                        "As a reader, I've discovered so many amazing indie authors through BookHub. The reading
                        experience is smooth, and I love being able to connect directly with authors."
                      </p>
                    </div>
                    <div className="flex items-center space-x-4 pt-4">
                      <motion.div
                        className="h-10 w-10 rounded-full bg-muted"
                        whileHover={{ scale: 1.1, rotate: -5 }}
                      ></motion.div>
                      <div>
                        <p className="text-sm font-medium">Michael Chen</p>
                        <p className="text-sm text-muted-foreground">Avid Reader</p>
                      </div>
                    </div>
                  </motion.div>
                </ScrollReveal>
              </motion.div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground overflow-hidden">
            <div className="container px-4 md:px-6">
              <motion.div
                className="flex flex-col items-center justify-center space-y-4 text-center"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="space-y-2">
                  <AnimatedText
                    text="Ready to Share Your Story?"
                    className="text-3xl font-bold tracking-tighter sm:text-5xl"
                    tag="h2"
                  />
                  <motion.p
                    className="max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed"
                    variants={fadeIn}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  >
                    Join thousands of authors who are sharing their books with readers around the world.
                  </motion.p>
                </div>
                <motion.div
                  className="flex flex-col gap-2 min-[400px]:flex-row"
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <motion.div variants={fadeInUp}>
                    <Link href="/signup">
                      <AnimatedButton size="lg" variant="secondary">
                        Get Started for Free
                      </AnimatedButton>
                    </Link>
                  </motion.div>
                  <motion.div variants={fadeInUp}>
                    <Link href="/explore">
                      <AnimatedButton
                        size="lg"
                        variant="outline"
                        className="bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
                      >
                        Explore Books
                      </AnimatedButton>
                    </Link>
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>
          </section>
        </main>
        <SiteFooter />
      </div>
    </PageTransition>
  )
}

