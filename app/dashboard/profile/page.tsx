import type { Metadata } from "next"
import { ProfileForm } from "@/components/profile-form"

export const metadata: Metadata = {
  title: "Profile",
  description: "Manage your author profile",
}

export default function ProfilePage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Profile</h2>
        <p className="text-muted-foreground">Manage your author profile and personal information</p>
      </div>
      <div className="border rounded-lg p-4 md:p-6">
        <ProfileForm />
      </div>
    </div>
  )
}

