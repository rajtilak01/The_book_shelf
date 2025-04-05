"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { Loader2 } from "lucide-react"
import Image from "next/image"

export function ProfileForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [profileImage, setProfileImage] = useState<File | null>(null)
  const { toast } = useToast()

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProfileImage(e.target.files[0])
    }
  }

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault()
    setIsLoading(true)

    try {
      // In a real app, you would update the profile via API
      // const formData = new FormData(event.target as HTMLFormElement)
      // if (profileImage) formData.append("profileImage", profileImage)
      // const response = await fetch("/api/profile", { method: "PUT", body: formData })

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="flex flex-col items-center sm:flex-row sm:items-start gap-4">
          <div className="relative w-24 h-24 rounded-full overflow-hidden bg-muted">
            {profileImage ? (
              <Image
                src={URL.createObjectURL(profileImage) || "/placeholder.svg"}
                alt="Profile preview"
                fill
                className="object-cover"
              />
            ) : (
              <Image
                src="/placeholder.svg?height=96&width=96&text=Profile"
                alt="Profile"
                fill
                className="object-cover"
              />
            )}
          </div>
          <div className="flex-1 space-y-2">
            <Label htmlFor="profileImage">Profile Picture</Label>
            <Input
              id="profileImage"
              type="file"
              accept="image/*"
              onChange={handleProfileImageChange}
              disabled={isLoading}
            />
            <p className="text-xs text-muted-foreground">Recommended: Square image, at least 300x300 pixels</p>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input id="name" name="name" defaultValue="John Doe" required disabled={isLoading} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="penName">Pen Name (optional)</Label>
          <Input id="penName" name="penName" placeholder="Your author pseudonym" disabled={isLoading} />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            defaultValue="john.doe@example.com"
            required
            disabled={isLoading}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone (optional)</Label>
          <Input id="phone" name="phone" type="tel" placeholder="+1 (555) 123-4567" disabled={isLoading} />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="bio">Biography</Label>
        <Textarea
          id="bio"
          name="bio"
          placeholder="Tell readers about yourself"
          rows={5}
          defaultValue="I'm a passionate writer with a love for storytelling. I've been writing for over 10 years and have published several books in various genres."
          disabled={isLoading}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="website">Website (optional)</Label>
          <Input id="website" name="website" type="url" placeholder="https://yourwebsite.com" disabled={isLoading} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="location">Location (optional)</Label>
          <Input
            id="location"
            name="location"
            placeholder="City, Country"
            defaultValue="New York, USA"
            disabled={isLoading}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Social Media (optional)</Label>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="twitter" className="text-xs">
              Twitter/X
            </Label>
            <Input id="twitter" name="twitter" placeholder="@username" disabled={isLoading} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="instagram" className="text-xs">
              Instagram
            </Label>
            <Input id="instagram" name="instagram" placeholder="@username" disabled={isLoading} />
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            "Save Changes"
          )}
        </Button>
      </div>
    </form>
  )
}

