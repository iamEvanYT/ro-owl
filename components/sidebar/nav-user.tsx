"use client"

import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CreditCard,
  LogIn,
  LogOut,
  Sparkles,
  UserPlus,
} from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { logout, useSession } from "@/lib/auth-client"
import { Skeleton } from "@/components/ui/skeleton"
import Link from "next/link"

function getInitials(name: string): string {
  const fallbackInitial = '?'

  // Trim any leading/trailing whitespace
  const trimmedName = name.trim();

  if (trimmedName.length === 0) {
    // If the input is empty, return '?'
    return fallbackInitial;
  }

  // Split the name by spaces
  const words = trimmedName.split(/\s+/);

  if (words.length > 1) {
    // If there are multiple words, take the first character of the first two words
    const initials = words.slice(0, 2).map(word => word.charAt(0).toUpperCase()).join('');
    return initials.length > 0 ? initials : '?';
  } else {
    // Single word case
    const capitals = trimmedName.match(/[A-Z]/g);
    if (capitals && capitals.length === 2) {
      // If exactly two capital letters, use them as initials
      return capitals.join('');
    } else if (capitals && capitals.length > 0) {
      // If more than two capitals, take the first two
      return capitals.slice(0, 2).join('');
    } else {
      // Otherwise, use the first character capitalized
      const firstChar = trimmedName.charAt(0).toUpperCase();
      return firstChar || fallbackInitial;
    }
  }
}

type User = {
  name: string
  email: string
  avatar?: string,
}

export function NavUser() {
  const { isMobile } = useSidebar()

  const {
    data,
    isPending,
    error
  } = useSession();

  if (!isPending && !error && !data) {
    // not logged in
    return (
      <SidebarMenu>
        <SidebarMenuItem className="flex flex-col gap-2">
          <SidebarMenuButton asChild className="border-neutral-400 border flex flex-row justify-between">
            <Link href="/signup">
              <UserPlus className="h-4 w-4" />
              Sign Up
            </Link>
          </SidebarMenuButton>
          <SidebarMenuButton asChild className="border-neutral-400 border flex flex-row justify-between">
            <Link href="/login">
              <LogIn className="h-4 w-4" />
              Login
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    )
  }

  const user: User = {
    name: data?.user?.name || '',
    email: data?.user?.email || '',
    avatar: data?.user?.image || '',
  }

  const initial = getInitials(user.name)

  if (isPending) {
    return (
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton size="lg" className="cursor-default">
            <Skeleton className="h-8 w-8 rounded-lg" />
            <div className="grid flex-1 gap-1">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-3 w-32" />
            </div>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    )
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="rounded-lg">{initial}</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{user.name}</span>
                <span className="truncate text-xs">{user.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="rounded-lg">{initial}</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{user.name}</span>
                  <span className="truncate text-xs">{user.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <BadgeCheck />
                Account
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logout}>
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
