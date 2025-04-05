import type { Metadata } from "next"
import { SettingsForm } from "@/components/settings-form"

export const metadata: Metadata = {
  title: "Settings",
  description: "Manage your account settings",
}

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">Manage your account settings and preferences</p>
      </div>
      <div className="border rounded-lg p-4 md:p-6">
        <SettingsForm />
      </div>
    </div>
  )
}

