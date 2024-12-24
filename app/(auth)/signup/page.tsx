"use client"

import { RedirectWithSession } from "@/components/auth/redirect-with-session"
import { SignupForm } from "@/components/auth/signup-form"

export default function Page() {
  return <>
    <RedirectWithSession />
    <div className="flex h-screen w-full items-center justify-center px-4">
      <SignupForm />
    </div>
    </>
}