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
import { Avatar } from "@/components/ui/avatar"
import { LogOutIcon, SettingsIcon, UserIcon } from "lucide-react"
import GeneratedAvatar from "./generatedAvatar"
import { useRouter } from "next/navigation"
import { toast } from "sonner"


const DashBoardUserFooterComponent = () => {
    const router = useRouter()
    const { data, isPending } = authClient.useSession()
    console.log(data)
    if (isPending || !data?.user) return null

    const { user } = data
    const onLogout = async () => {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push("/sign-in")
                },
                onError: () => {
                    toast.error("Something went wrong")
                }
            }
        })
    }

    return (
        <DropdownMenu >
            <DropdownMenuTrigger asChild>
                <button
                    className="
                    mb-3
                    p-3
            group relative w-full rounded-lg
            border border-border/10
           
            flex items-center gap-3
            transition-all duration-300 ease-out
           
            hover:shadow-[0_0_14px_rgba(0,0,0,0.35)]
          "
                >
                    {/* Avatar */}
                    <Avatar className="h-9 w-9 overflow-hidden">
                        {user.image ? (
                            <img
                                src={user.image}
                                alt={user.name ?? "user"}
                                className="h-full w-full rounded-full object-cover"
                                referrerPolicy="no-referrer"
                            />
                        ) : <GeneratedAvatar
                            seed={data.user.name}
                            variant="initials"
                            className="size-9 mr-3"
                        />
                        }
                    </Avatar>


                    {/* User Info */}
                    <div className="flex-1 text-left leading-tight">
                        <p className="text-sm font-medium text-sidebar-foreground">
                            {user.name}
                        </p>
                        <p className="text-xs text-sidebar-foreground/60 truncate">
                            {user.email}
                        </p>
                    </div>

                    {/* Chevron */}
                    <span className="text-sidebar-foreground/60 transition-transform duration-300 group-hover:translate-y-[1px]">
                        ▾
                    </span>
                </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
                side="top"
                align="start"
                className="
          w-56 rounded-xl
          border border-border/20
          bg-sidebar
          shadow-xl
          backdrop-blur-md
        "
            >
                <DropdownMenuLabel className="text-xs text-muted-foreground">
                    Account
                </DropdownMenuLabel>

                <DropdownMenuItem className="gap-2">
                    <UserIcon className="h-4 w-4" />
                    <p className="text-white">Profile</p>
                </DropdownMenuItem>

                <DropdownMenuItem className="gap-2">
                    <SettingsIcon className="h-4 w-4" />
                    <p className="text-white">Billing</p>
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
