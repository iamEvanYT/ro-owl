import { Button } from "@/components/ui/button"
import { Frown, Home } from "lucide-react"
import { Metadata } from "next";
import Link from "next/link"

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The page you were looking for could not be found.",
};

export default function NotFound() {
  return (
    <div className="flex flex-col flex-1">
      <main className="flex-1 flex flex-col items-center justify-center p-4 text-center">
        <div className="space-y-4">
          <Frown className="w-24 h-24 mx-auto text-red-500 dark:text-red-400" />
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-gray-900 dark:text-gray-100">
            404 - Page Not Found
          </h1>
          <p className="max-w-[600px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Hoot! Oopsie! This page took a flight down the pipes. Our team is hooting it back to you—hang tight!
          </p>
          <div className="flex justify-center">
            <Link href="/">
              <Button>
                <Home className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}