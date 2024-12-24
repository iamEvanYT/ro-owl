import { RedirectWithoutSession } from "@/components/auth/redirect-without-session"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Link from "next/link"

function QuickLogin() {
  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Quick Login (Recommended)</CardTitle>
        <CardDescription>
          Use the Roblox Quick Login Feature to Login
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <Link href="/profiles/login/quick-login" passHref>
            <Button className="w-full">
              Select
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

function CookieLogin() {
  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Cookie Login (Advanced)</CardTitle>
        <CardDescription>
          Manually enter your Roblox Cookie to Login
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <Button className="w-full cursor-not-allowed !pointer-events-auto" disabled>
            Coming Soon...
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default function Page() {
  return (
    <>
      <RedirectWithoutSession />
      <div className="flex flex-col h-screen w-full items-center justify-center px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Login Options</h1>
          <p className="text-gray-600">Select a login option for your Roblox account</p>
        </div>
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <QuickLogin />

          <div className="hidden md:block">
            <Separator orientation="vertical" className="h-64" />
          </div>
          <div className="md:hidden">
            <Separator className="w-64 my-4" />
          </div>

          <CookieLogin />
        </div>
      </div>
    </>
  )
}