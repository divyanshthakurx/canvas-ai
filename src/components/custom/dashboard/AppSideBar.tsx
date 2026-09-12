'use client'
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenuButton,
} from "@/components/ui/sidebar"
import { useUser } from "@clerk/nextjs";
import { Archive, LayoutGrid, Settings, Sparkle, Users } from 'lucide-react';
import Image from "next/image"
import { usePathname } from "next/navigation";

export function AppSidebar() {

  const path = usePathname();

  const user = useUser();

  return (
    <Sidebar>
      <SidebarHeader> 
        <div className="flex justify-center items-center gap-2 p-4">
          <Image src={"/logo.svg"} alt="Logo" width={40} height={40} />
          <div className="text-xl font-bold">Canvas AI</div>
        </div>
      </SidebarHeader>
      <SidebarContent>

        <SidebarGroup>
          <Button>Create New Canvas</Button>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>My Boards</SidebarGroupLabel>

          <SidebarMenuButton className="p-5" isActive={path === "/dashboard"}>
            <LayoutGrid />
            <span>All Files</span>
          </SidebarMenuButton>

          <SidebarMenuButton className="p-5 mt-2" isActive={path === "/shared-files"}>
            <Users />
            <span>Shared</span>
          </SidebarMenuButton>

          <SidebarMenuButton className="p-5 mt-2" isActive={path === "/archived"}>
            <Archive />
            <span>Archived</span>
          </SidebarMenuButton>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>
            Others
          </SidebarGroupLabel>

          <SidebarMenuButton className="p-5 mt-2" isActive={path === "/archived"}>
            <Sparkle />
            <span>AI Assistant</span>
          </SidebarMenuButton>

          <SidebarMenuButton className="p-5 mt-2" isActive={path === "/archived"}>
            <Settings />
            <span>Settings</span>
          </SidebarMenuButton>
        </SidebarGroup>

      </SidebarContent>

      <SidebarFooter>
        <Button>test</Button>
        <div className="p-3 border rounded-md">
          <div className="text-sm flex justify-between items-center">2 files created <span>Total 3</span></div>
          <Progress value={69} className={"h-2 mt-2"} />
        </div>

        <div className="p-3 flex justify-start items-center gap-2 border rounded-md">
          <Image className="rounded-full" src={user?.user?.imageUrl ?? ''} alt={"User Profile Icon"} width={40} height={40} />
          <div>{user.user?.fullName ?? ""}</div>
        </div>
      </SidebarFooter>

    </Sidebar>
  )
}