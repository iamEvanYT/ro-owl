import { QuickLoginCard } from "@/components/auth/quick-login/main";
import { RedirectWithoutSession } from "@/components/auth/redirect-without-session";

export default function Page() {
  return (
    <>
      <RedirectWithoutSession />
      <div className="flex h-screen w-full items-center justify-center px-4 pb-7">
        <QuickLoginCard />
      </div>
    </>
  )
}