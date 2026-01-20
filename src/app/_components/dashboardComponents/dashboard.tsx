"use client"
import React from 'react'
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
import Link from 'next/link'
import Image from 'next/image'
import { BotIcon, StarIcon, VideoIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'
import DashBoardUserFooterComponent from './DashBoardUserFooterComponent'

const upperSection = [
    {
        icon: VideoIcon,
        label: "Meetings",
        href: "/meetings",
    }, {
        icon: BotIcon,
        label: "Agents",
        href: "/agents",
    }
]

const lowerSection = [
    {
        icon: StarIcon,
        label: "Upgrade",
        href: "/upgrade",
    }
]

const DashboardSideBar = () => {
    const pathname = usePathname()
    return (
        <Sidebar>
            <SidebarHeader className='text-sidebar-accent-foreground'>
                <Link href={'/'} className='flex items-center gap-2 px-2 pt-2' >
                    <Image src={'/logo.svg'} alt={'logo'} width={30} height={30} />
                    <p className='text-2xl font-semibold'>SekTalks</p>
                </Link>
            </SidebarHeader>
            <div>
                <SidebarSeparator className=' px-2' />
            </div>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {upperSection.map((item) => (
                                <SidebarMenuItem key={item.href}>
                                    <SidebarMenuButton
                                        asChild
                                        onMouseMove={(e) => {
                                            const rect = e.currentTarget.getBoundingClientRect()
                                            const x = ((e.clientX - rect.left) / rect.width) * 100
                                            e.currentTarget.style.setProperty("--x", `${x}%`)
                                        }}
                                        className={cn(
                                            "relative h-10 overflow-hidden border border-transparent",
                                            "hover:border-amber-200/40 transition-all duration-300",
                                            "before:absolute before:inset-0 before:bg-[linear-gradient(90deg,transparent,var(--hover-color),transparent)]",
                                            "before:opacity-0 hover:before:opacity-100",
                                            "before:[background-position:var(--x)_0%] before:transition-opacity before:duration-300",
                                            pathname === item.href && "bg-linear-to-r/oklch border-slate-500"
                                        )}
                                        isActive={pathname === item.href}
                                    >
                                        <Link
                                            href={item.href}
                                            className="relative z-10 flex items-center gap-3 px-3"
                                        >
                                            <item.icon className="h-4 w-4 text-sidebar-accent-foreground" />
                                            <p className="text-sm font-medium tracking-tight">
                                                {item.label}
                                            </p>
                                        </Link>
                                    </SidebarMenuButton>

                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>


            <SidebarSeparator className='px-2' />

            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {lowerSection.map((item) => (
                                <SidebarMenuItem key={item.href}>
                                    <SidebarMenuButton
                                        asChild
                                        onMouseMove={(e) => {
                                            const rect = e.currentTarget.getBoundingClientRect()
                                            const x = ((e.clientX - rect.left) / rect.width) * 100
                                            e.currentTarget.style.setProperty("--x", `${x}%`)
                                        }}
                                        className={cn(
                                            "relative h-10 overflow-hidden border border-transparent",
                                            "hover:border-amber-200/40 transition-all duration-300",
                                            "before:absolute before:inset-0 before:bg-[linear-gradient(90deg,transparent,var(--hover-color),transparent)]",
                                            "before:opacity-0 hover:before:opacity-100",
                                            "before:[background-position:var(--x)_0%] before:transition-opacity before:duration-300",
                                            pathname === item.href && "bg-linear-to-r/oklch border-slate-500"
                                        )}
                                        isActive={pathname === item.href}
                                    >
                                        <Link
                                            href={item.href}
                                            className="relative z-10 flex items-center gap-3 px-3"
                                        >
                                            <item.icon className="h-4 w-4 text-sidebar-accent-foreground" />
                                            <p className="text-sm font-medium tracking-tight">
                                                {item.label}
                                            </p>
                                        </Link>
                                    </SidebarMenuButton>

                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <SidebarSeparator className='px-2' />
                <SidebarContent>
                    <SidebarMenu>
                        <DashBoardUserFooterComponent />
                    </SidebarMenu>
                </SidebarContent>
            </SidebarFooter>
        </Sidebar>
    )
}

export default DashboardSideBar
