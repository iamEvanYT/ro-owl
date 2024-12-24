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
import { Eye, EyeOff, Loader2 } from "lucide-react"
import { authClient } from "@/lib/auth-client"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

export function LoginForm() {
  const [requesting, setRequesting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const router = useRouter();

  const login = async () => {
    if (requesting) {
      return false;
    }

    const email = emailRef.current?.value || "";
    const password = passwordRef.current?.value || "";

    const { data, error } = await authClient.signIn.email({
      email: email,
			password: password,
			dontRememberMe: false,
    }, {
      onRequest: () => {
        setRequesting(true);
      },
      onResponse: () => {
        setRequesting(false);
      },
      onSuccess: (ctx) => {
        toast.success("Successfully logged in!");
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
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
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
              <Link href="#" className="ml-auto inline-block text-sm underline">
                Forgot your password?
              </Link>
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
          <Button type="submit" className="w-full" disabled={requesting} onClick={login}>
            {requesting ? <Loader2 size={16} className="animate-spin" /> : "Login"}
          </Button>
          <div className="relative my-4">
            <Separator />
            <span className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-2 text-xs text-muted-foreground">
              OR
            </span>
          </div>
          <Button variant="outline" className="w-full" disabled>
            Login with Google
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          {"Don't have an account? "}
          <Link href="/signup" className="underline">
            Sign up
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
