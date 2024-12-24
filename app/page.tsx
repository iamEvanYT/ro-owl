import { RedirectWithoutSession } from "@/components/auth/redirect-without-session"
import { HomeFriendsSection } from "@/components/custom/home/friends-section"
import { HomeTodaysPicks } from "@/components/custom/home/todays-picks"
import { HomeUserHeader } from "@/components/custom/home/user-header"

export default function HomePage() {
  return <>
    <RedirectWithoutSession />
    <div className="min-h-screen p-4 pl-6 w-full mx-auto space-y-8">
      <HomeUserHeader />
      <HomeFriendsSection />
      <HomeTodaysPicks />
      
      {/* Margin */}
      <div className="h-1 w-5"></div>
    </div>
  </>
}