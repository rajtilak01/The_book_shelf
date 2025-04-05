import type { Metadata } from "next"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { SignupForm } from "@/components/signup-form"

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Create a new BookHub account",
}

export default function SignupPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 flex items-center justify-center py-12">
        <div className="w-full max-w-md px-4 sm:px-6">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold">Create an account</h1>
            <p className="text-muted-foreground mt-2">Join BookHub to share and discover amazing books</p>
          </div>
          <div className="bg-card rounded-lg border shadow-sm p-6">
            <SignupForm />
            <div className="mt-4 text-center text-sm">
              <p className="text-muted-foreground">
                Already have an account?{" "}
                <Link href="/login" className="text-primary underline underline-offset-4 hover:text-primary/90">
                  Log in
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

