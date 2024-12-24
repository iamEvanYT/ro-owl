import { LoginForm } from "@/components/auth/login-form"
import { RedirectWithSession } from "@/components/auth/redirect-with-session"

export default function Page() {
  return <>
    <RedirectWithSession />
    <div className="flex h-screen w-full items-center justify-center px-4">
      <LoginForm />
    </div>
  </>
}
