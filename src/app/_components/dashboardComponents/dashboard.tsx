"use client"

import React from "react"
import {
    Sidebar,
    SidebarSeparator,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
} from "@/components/ui/sidebar"
import Link from "next/link"
import Image from "next/image"
import { BotIcon, StarIcon, VideoIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"
import DashBoardUserFooterComponent from "./DashBoardUserFooterComponent"

const upperSection = [
    { icon: VideoIcon, label: "Meetings", href: "/meetings" },
    { icon: BotIcon, label: "Agents", href: "/agents" },
]

const lowerSection = [
    { icon: StarIcon, label: "Upgrade", href: "/upgrade" },
]

export default function DashboardSideBar() {
    const pathname = usePathname()

    const renderItem = (item: any) => {
        const isActive = pathname === item.href

        return (
            <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                    asChild
                    onMouseMove={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect()
                        const x = ((e.clientX - rect.left) / rect.width) * 100
                        e.currentTarget.style.setProperty("--x", `${x}%`)
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "translateX(0px)"
                    }}
                    className={cn(
                        "relative h-10 overflow-hidden rounded-md",
                        "transition-all duration-300 ease-out",
                        "border border-transparent",

                        /* Hover gradient */
                        "before:absolute before:inset-0",
                        "before:bg-[linear-gradient(90deg,transparent,var(--sidebar-hover),transparent)]",
                        "before:opacity-0 hover:before:opacity-100",
                        "before:transition-opacity before:duration-300",
                        "before:[background-position:var(--x)_0%]",

                        /* Soft hover shadow */
                        "hover:shadow-[0_4px_14px_rgba(0,0,0,0.06)]",

                        /* Active (NO black) */
                        isActive &&
                        "bg-[linear-gradient(90deg,oklch(0.96_0.01_255),var(--sidebar-active))] border-blue-300/40 shadow-[0_6px_16px_rgba(59,130,246,0.25)]"
                    )}
                    isActive={isActive}
                >
                    <Link
                        href={item.href}
                        className="relative z-10 flex items-center gap-3 px-4 text-sm font-medium"
                    >
                        <item.icon className="h-4 w-4 opacity-90" />
                        <span>{item.label}</span>
                    </Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
        )
    }

    return (
        <Sidebar>
            {/* HEADER */}
            <SidebarHeader className="text-sidebar-accent-foreground">
                <Link href="/" className="flex items-center gap-2 px-3 py-2">
                    <Image src="/logo.svg" alt="logo" width={30} height={30} />
                    <span className="text-xl font-semibold">SekTalks</span>
                </Link>
            </SidebarHeader>

            <SidebarSeparator className="mx-2" />

            {/* TOP MENU */}
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>{upperSection.map(renderItem)}</SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarSeparator className="mx-2" />

            {/* BOTTOM MENU */}
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>{lowerSection.map(renderItem)}</SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            {/* FOOTER */}
            <SidebarFooter>
                <SidebarSeparator className="mx-2" />
                <SidebarContent>
                    <SidebarMenu>
                        <DashBoardUserFooterComponent />
                    </SidebarMenu>
                </SidebarContent>
            </SidebarFooter>
        </Sidebar>
    )
}
