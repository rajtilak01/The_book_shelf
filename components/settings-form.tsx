"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { Loader2 } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
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
import { useRouter } from "next/navigation"

export function SettingsForm() {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault()
    setIsLoading(true)

    try {
      // In a real app, you would update settings via API
      // const formData = new FormData(event.target as HTMLFormElement)
      // const response = await fetch("/api/settings", { method: "PUT", body: formData })

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Settings updated",
        description: "Your settings have been updated successfully.",
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

  const handleDeleteAccount = async () => {
    // In a real app, you would delete the account via API
    // await fetch("/api/account", { method: "DELETE" })

    toast({
      title: "Account deleted",
      description: "Your account has been deleted successfully.",
    })

    router.push("/")
  }

  return (
    <form onSubmit={onSubmit} className="space-y-8">
      <Accordion type="single" collapsible defaultValue="account" className="w-full">
        <AccordionItem value="account">
          <AccordionTrigger>Account Settings</AccordionTrigger>
          <AccordionContent className="pt-4 pb-2">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="emailNotifications">Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive email notifications about your account and books
                  </p>
                </div>
                <Switch id="emailNotifications" name="emailNotifications" defaultChecked disabled={isLoading} />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="marketingEmails">Marketing Emails</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive promotional emails and updates about new features
                  </p>
                </div>
                <Switch id="marketingEmails" name="marketingEmails" defaultChecked disabled={isLoading} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="language">Language</Label>
                <Select name="language" defaultValue="english" disabled={isLoading}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="english">English</SelectItem>
                    <SelectItem value="spanish">Spanish</SelectItem>
                    <SelectItem value="french">French</SelectItem>
                    <SelectItem value="german">German</SelectItem>
                    <SelectItem value="chinese">Chinese</SelectItem>
                    <SelectItem value="japanese">Japanese</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="appearance">
          <AccordionTrigger>Appearance</AccordionTrigger>
          <AccordionContent className="pt-4 pb-2">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="theme">Theme</Label>
                <Select name="theme" defaultValue="system" disabled={isLoading}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select theme" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="privacy">
          <AccordionTrigger>Privacy & Security</AccordionTrigger>
          <AccordionContent className="pt-4 pb-2">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="twoFactorAuth">Two-Factor Authentication</Label>
                  <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                </div>
                <Switch id="twoFactorAuth" name="twoFactorAuth" disabled={isLoading} />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="activityLog">Activity Log</Label>
                  <p className="text-sm text-muted-foreground">Track and monitor your account activity</p>
                </div>
                <Button variant="outline" size="sm" disabled={isLoading}>
                  View Log
                </Button>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="dataSharing">Data Sharing</Label>
                  <p className="text-sm text-muted-foreground">Allow us to use your data to improve our services</p>
                </div>
                <Switch id="dataSharing" name="dataSharing" defaultChecked disabled={isLoading} />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="danger">
          <AccordionTrigger className="text-destructive">Danger Zone</AccordionTrigger>
          <AccordionContent className="pt-4 pb-2">
            <div className="space-y-4">
              <div className="rounded-md border border-destructive/50 p-4">
                <div className="flex flex-col gap-2">
                  <h3 className="text-lg font-medium">Delete Account</h3>
                  <p className="text-sm text-muted-foreground">
                    Permanently delete your account and all of your content. This action cannot be undone.
                  </p>
                  <div className="pt-2">
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive" disabled={isLoading}>
                          Delete Account
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete your account and remove all of
                            your data from our servers.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={handleDeleteAccount}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                          >
                            Delete Account
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

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

