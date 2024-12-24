"use client"

import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { useRef, useState } from "react"
import { authClient } from "@/lib/auth-client"
import { Eye, EyeOff, Loader2 } from "lucide-react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

export function SignupForm() {
  const [requesting, setRequesting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const router = useRouter();

  const signUp = async () => {
    if (requesting) {
      return false;
    }

    const name = nameRef.current?.value || "";
    const email = emailRef.current?.value || "";
    const password = passwordRef.current?.value || "";

    const { data, error } = await authClient.signUp.email({
      email,
      password,
      name,
    }, {
      onRequest: () => {
        setRequesting(true);
      },
      onResponse: () => {
        setRequesting(false);
      },
      onSuccess: (ctx) => {
        toast.success("Successfully signed up!");
        router.push("/");
      },
      onError: (ctx) => {
        const msg = ctx?.error?.message || "Something went wrong";
        toast.error(msg);
      },
    });
  };

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Create an account</CardTitle>
        <CardDescription>
          Enter your email below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Name</Label>
            <Input
              id="name"
              placeholder="John Doe"
              required
              ref={nameRef}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="user@example.com"
              required
              ref={emailRef}
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
            </div>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                required
                ref={passwordRef}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2"
                onMouseDown={() => setShowPassword(true)}
                onMouseUp={() => setShowPassword(false)}
                onMouseLeave={() => setShowPassword(false)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4 text-gray-500" />
                ) : (
                  <Eye className="h-4 w-4 text-gray-500" />
                )}
              </button>
            </div>
          </div>
          <Button type="submit" className="w-full" onClick={signUp} disabled={requesting}>
            {requesting ? <Loader2 size={16} className="animate-spin" /> : "Create account"}
          </Button>
          <div className="relative my-4">
            <Separator />
            <span className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-2 text-xs text-muted-foreground">
              OR
            </span>
          </div>
          <Button variant="outline" className="w-full" disabled>
            Sign Up with Google
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          {"Already have an account? "}
          <Link href="/login" className="underline">
            Login
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
