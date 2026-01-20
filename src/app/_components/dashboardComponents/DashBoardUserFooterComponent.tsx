"use client"

import React from "react"
import { authClient } from "@/lib/auth-client"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerFooter,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { Avatar } from "@/components/ui/avatar"
import { CreditCardIcon, LogOutIcon, SettingsIcon, UserIcon } from "lucide-react"
import GeneratedAvatar from "./generatedAvatar"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { useIsMobile } from "@/hooks/use-mobile"
import { Button } from "@/components/ui/button"

const triggerClasses = `
  mb-3 p-3 w-full rounded-lg
  border border-border/10
  flex items-center gap-3
  bg-white/5 hover:bg-white/10
  transition-all duration-300 ease-out
  hover:shadow-[0_0_14px_rgba(0,0,0,0.35)]
  group
`

const DashBoardUserFooterComponent = () => {
    const isMobile = useIsMobile()
    const router = useRouter()
    const { data, isPending } = authClient.useSession()

    if (isPending || !data?.user) return null
    const { user } = data

    const onLogout = async () => {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => router.push("/sign-in"),
                onError: () => toast.error("Something went wrong"),
            },
        })
    }

    const TriggerContent = (
        <>
            <Avatar className="h-9 w-9 overflow-hidden">
                {user.image ? (
                    <img
                        src={user.image}
                        alt={user.name ?? "user"}
                        className="h-full w-full rounded-full object-cover"
                        referrerPolicy="no-referrer"
                    />
                ) : (
                    <GeneratedAvatar
                        seed={user.name}
                        variant="initials"
                        className="size-9"
                    />
                )}
            </Avatar>

            <div className="flex-1 text-left leading-tight">
                <p className="text-sm font-medium text-sidebar-foreground">
                    {user.name}
                </p>
                <p className="text-xs text-sidebar-foreground/60 truncate">
                    {user.email}
                </p>
            </div>

            <span className="text-sidebar-foreground/60 transition-transform group-hover:translate-y-[1px]">
                ▾
            </span>
        </>
    )

    if (isMobile) {
        return (
            <Drawer>
                <DrawerTrigger asChild>
                    <button className={triggerClasses}>
                        {TriggerContent}
                    </button>
                </DrawerTrigger>

                <DrawerContent>
                    <DrawerHeader>
                        <DrawerTitle>{user.name}</DrawerTitle>
                        <DrawerDescription>{user.email}</DrawerDescription>
                    </DrawerHeader>

                    <DrawerFooter className="gap-2">
                        <Button variant="outline">
                            <CreditCardIcon className="h-4 w-4 mr-2" />
                            Billing
                        </Button>
                        <Button variant="outline" onClick={onLogout}>
                            <LogOutIcon className="h-4 w-4 mr-2" />
                            Sign out
                        </Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        )
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className={triggerClasses}>
                    {TriggerContent}
                </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
                side="top"
                align="start"
                className="w-56 rounded-xl border border-border/20 bg-sidebar hover:bg-sidebar-hover shadow-xl backdrop-blur-md"
            >
                <DropdownMenuLabel className="text-xs text-muted-foreground">
                    Account
                </DropdownMenuLabel>

                <DropdownMenuItem className="gap-2">
                    <UserIcon className="h-4 w-4" />
                    <p className="text-white hover:text-slate-950">Profile</p>
                </DropdownMenuItem>

                <DropdownMenuItem className="gap-2">
                    <SettingsIcon className="h-4 w-4" />
                    <p className="text-white hover:text-slate-950">Billing</p>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                    className="gap-2 text-red-500 focus:text-red-500"
                    onClick={onLogout}
                >
                    <LogOutIcon className="h-4 w-4" />
                    Sign out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default DashBoardUserFooterComponent
