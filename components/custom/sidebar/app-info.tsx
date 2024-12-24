import { SidebarContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { Cat } from "lucide-react";
import { IconMdiOwl } from "../owl-icon";
import Link from "next/link";

export function SidebarAppInfo() {
  return <SidebarMenu>
    <SidebarMenuItem>
      <Link href="/">
        <SidebarMenuButton
          size="lg"
        >
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg text-sidebar-primary-foreground">
            <IconMdiOwl className="size-7" />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">
              Ro-Owl
            </span>
            <span className="truncate text-xs">v0.0.1</span>
          </div>
        </SidebarMenuButton>
      </Link>
    </SidebarMenuItem>
  </SidebarMenu>
}