"use client"

import type React from "react"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { Loader2, Upload, Check } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { motion, AnimatePresence } from "framer-motion"
import { AnimatedButton } from "@/components/ui/animated-button"
import Image from "next/image"

export function BookUploadForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [coverImage, setCoverImage] = useState<File | null>(null)
  const [bookFile, setBookFile] = useState<File | null>(null)
  const [formStep, setFormStep] = useState(0)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadSuccess, setUploadSuccess] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const coverInputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()
  const { toast } = useToast()

  const genres = [
    "Fiction",
    "Non-Fiction",
    "Science Fiction",
    "Fantasy",
    "Mystery",
    "Thriller",
    "Romance",
    "Horror",
    "Biography",
    "History",
    "Self-Help",
    "Business",
  ]

  const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCoverImage(e.target.files[0])
    }
  }

  const handleBookFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setBookFile(e.target.files[0])
    }
  }

  const nextStep = () => {
    setFormStep((prev) => prev + 1)
  }

  const prevStep = () => {
    setFormStep((prev) => prev - 1)
  }

  const simulateUpload = () => {
    setIsLoading(true)
    setUploadProgress(0)

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsLoading(false)
          setUploadSuccess(true)
          return 100
        }
        return prev + 5
      })
    }, 200)
  }

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault()
    simulateUpload()

    // In a real app, you would upload the files and form data to your API
    setTimeout(() => {
      toast({
        title: "Book uploaded!",
        description: "Your book has been successfully uploaded.",
      })

      setTimeout(() => {
        router.push("/dashboard/books")
      }, 1000)
    }, 4000)
  }

  const formVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3 },
    },
    exit: {
      opacity: 0,
      x: -20,
      transition: { duration: 0.3 },
    },
  }

  const progressVariants = {
    initial: { width: 0 },
    animate: (progress: number) => ({
      width: `${progress}%`,
      transition: { duration: 0.3 },
    }),
  }

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {formStep === 0 && (
          <motion.div key="step1" initial="hidden" animate="visible" exit="exit" variants={formVariants}>
            <form className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Book Title</Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="Enter the title of your book"
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Write a compelling description of your book"
                  rows={5}
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="genre">Genre</Label>
                  <Select name="genre" required disabled={isLoading}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a genre" />
                    </SelectTrigger>
                    <SelectContent>
                      {genres.map((genre) => (
                        <SelectItem key={genre} value={genre.toLowerCase()}>
                          {genre}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <Select name="language" required disabled={isLoading}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="english">English</SelectItem>
                      <SelectItem value="spanish">Spanish</SelectItem>
                      <SelectItem value="french">French</SelectItem>
                      <SelectItem value="german">German</SelectItem>
                      <SelectItem value="chinese">Chinese</SelectItem>
                      <SelectItem value="japanese">Japanese</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="tags">Tags (comma separated)</Label>
                <Input id="tags" name="tags" placeholder="adventure, fantasy, magic" disabled={isLoading} />
              </div>

              <div className="flex justify-end">
                <AnimatedButton type="button" onClick={nextStep}>
                  Continue
                </AnimatedButton>
              </div>
            </form>
          </motion.div>
        )}

        {formStep === 1 && (
          <motion.div key="step2" initial="hidden" animate="visible" exit="exit" variants={formVariants}>
            <form className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="coverImage">Cover Image</Label>
                <div className="flex items-center gap-4">
                  <motion.div
                    className="w-24 h-32 bg-muted rounded-md flex items-center justify-center overflow-hidden"
                    whileHover={{ scale: 1.05 }}
                    onClick={() => coverInputRef.current?.click()}
                  >
                    {coverImage ? (
                      <Image
                        src={URL.createObjectURL(coverImage) || "/placeholder.svg"}
                        alt="Cover preview"
                        width={96}
                        height={128}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <motion.span
                        className="text-xs text-muted-foreground text-center px-2"
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
                      >
                        Click to select image
                      </motion.span>
                    )}
                  </motion.div>
                  <div className="flex-1">
                    <Input
                      id="coverImage"
                      ref={coverInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleCoverImageChange}
                      required
                      disabled={isLoading}
                      className="cursor-pointer"
                    />
                    <p className="text-xs text-muted-foreground mt-1">Recommended size: 1200x1800 pixels (2:3 ratio)</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bookFile">Book File</Label>
                <motion.div
                  className={`border-2 border-dashed rounded-md p-6 text-center ${bookFile ? "border-primary" : "border-muted"}`}
                  whileHover={{ scale: 1.01 }}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Input
                    id="bookFile"
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.epub,.mobi"
                    onChange={handleBookFileChange}
                    required
                    disabled={isLoading}
                    className="hidden"
                  />

                  {bookFile ? (
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="flex flex-col items-center"
                    >
                      <div className="bg-primary/10 rounded-full p-3 mb-2">
                        <Check className="h-6 w-6 text-primary" />
                      </div>
                      <p className="font-medium">{bookFile.name}</p>
                      <p className="text-sm text-muted-foreground">{(bookFile.size / (1024 * 1024)).toFixed(2)} MB</p>
                    </motion.div>
                  ) : (
                    <div className="flex flex-col items-center">
                      <motion.div
                        className="bg-muted rounded-full p-3 mb-2"
                        animate={{ y: [0, -5, 0] }}
                        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
                      >
                        <Upload className="h-6 w-6 text-muted-foreground" />
                      </motion.div>
                      <p className="font-medium">Drop your file here or click to browse</p>
                      <p className="text-sm text-muted-foreground">Accepted formats: PDF, EPUB, MOBI (max 100MB)</p>
                    </div>
                  )}
                </motion.div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="isPublic" name="isPublic" defaultChecked />
                <Label htmlFor="isPublic" className="font-normal">
                  Make this book public and available for everyone to read
                </Label>
              </div>

              <div className="flex justify-between">
                <AnimatedButton type="button" variant="outline" onClick={prevStep}>
                  Back
                </AnimatedButton>
                <AnimatedButton type="button" onClick={nextStep}>
                  Continue
                </AnimatedButton>
              </div>
            </form>
          </motion.div>
        )}

        {formStep === 2 && (
          <motion.div key="step3" initial="hidden" animate="visible" exit="exit" variants={formVariants}>
            <form onSubmit={onSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="author">Author Name</Label>
                <Input id="author" name="author" placeholder="Your name or pen name" required disabled={isLoading} />
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Review Your Book</h3>
                <div className="rounded-lg border p-4 space-y-3">
                  <div className="flex items-start gap-4">
                    <div className="w-20 h-28 bg-muted rounded-md overflow-hidden">
                      {coverImage && (
                        <Image
                          src={URL.createObjectURL(coverImage) || "/placeholder.svg"}
                          alt="Cover preview"
                          width={80}
                          height={112}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">Book Details</h4>
                      <ul className="text-sm space-y-1 mt-2">
                        <li>
                          <span className="text-muted-foreground">File:</span> {bookFile?.name || "No file selected"}
                        </li>
                        <li>
                          <span className="text-muted-foreground">Size:</span>{" "}
                          {bookFile ? `${(bookFile.size / (1024 * 1024)).toFixed(2)} MB` : "N/A"}
                        </li>
                        <li>
                          <span className="text-muted-foreground">Visibility:</span> Public
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="termsAccepted" name="termsAccepted" required />
                <Label htmlFor="termsAccepted" className="font-normal">
                  I confirm that I have the rights to publish this book and agree to the{" "}
                  <a href="/terms" className="text-primary underline underline-offset-4 hover:text-primary/90">
                    Terms of Service
                  </a>
                </Label>
              </div>

              <div className="flex justify-between">
                <AnimatedButton type="button" variant="outline" onClick={prevStep} disabled={isLoading}>
                  Back
                </AnimatedButton>
                <AnimatedButton type="submit" disabled={isLoading || uploadSuccess}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Uploading...
                    </>
                  ) : uploadSuccess ? (
                    <>
                      <Check className="mr-2 h-4 w-4" />
                      Uploaded!
                    </>
                  ) : (
                    <>
                      <Upload className="mr-2 h-4 w-4" />
                      Upload Book
                    </>
                  )}
                </AnimatedButton>
              </div>

              {isLoading && (
                <motion.div className="w-full bg-muted rounded-full h-2.5 overflow-hidden">
                  <motion.div
                    className="bg-primary h-2.5 rounded-full"
                    custom={uploadProgress}
                    variants={progressVariants}
                    initial="initial"
                    animate="animate"
                  />
                </motion.div>
              )}

              {uploadSuccess && (
                <motion.div
                  className="flex items-center justify-center p-4 bg-primary/10 rounded-md text-primary"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <Check className="mr-2 h-5 w-5" />
                  Book uploaded successfully! Redirecting to your books...
                </motion.div>
              )}
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="mt-6 pt-6 border-t"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="flex justify-between">
          <div className="flex space-x-2">
            <motion.div
              className={`w-3 h-3 rounded-full ${formStep === 0 ? "bg-primary" : "bg-muted"}`}
              whileHover={{ scale: 1.2 }}
              onClick={() => setFormStep(0)}
            />
            <motion.div
              className={`w-3 h-3 rounded-full ${formStep === 1 ? "bg-primary" : "bg-muted"}`}
              whileHover={{ scale: 1.2 }}
              onClick={() => setFormStep(1)}
            />
            <motion.div
              className={`w-3 h-3 rounded-full ${formStep === 2 ? "bg-primary" : "bg-muted"}`}
              whileHover={{ scale: 1.2 }}
              onClick={() => setFormStep(2)}
            />
          </div>
          <p className="text-sm text-muted-foreground">Step {formStep + 1} of 3</p>
        </div>
      </motion.div>
    </div>
  )
}

