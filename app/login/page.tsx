import type { Metadata } from "next"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { LoginForm } from "@/components/login-form"

export const metadata: Metadata = {
  title: "Login",
  description: "Login to your BookHub account",
}

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 flex items-center justify-center py-12">
        <div className="w-full max-w-md px-4 sm:px-6">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold">Welcome back</h1>
            <p className="text-muted-foreground mt-2">Log in to your account to continue</p>
          </div>
          <div className="bg-card rounded-lg border shadow-sm p-6">
            <LoginForm />
            <div className="mt-4 text-center text-sm">
              <p className="text-muted-foreground">
                Don't have an account?{" "}
                <Link href="/signup" className="text-primary underline underline-offset-4 hover:text-primary/90">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}

