"use client"

import GeneratedAvatar from "@/app/_components/dashboardComponents/generatedAvatar"
import { MeetingGetMany } from "@/types/type"
import { ColumnDef } from "@tanstack/react-table"

import {
    CircleCheckIcon,
    CircleXIcon,
    ClockArrowUpIcon,
    ClockFadingIcon,
    CornerDownRightIcon,
    LoaderIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"

import { format, formatDuration } from "date-fns"

import { Badge } from "@/components/ui/badge"



const statusIconMap = {
    upcoming: ClockArrowUpIcon,
    active: LoaderIcon,
    completed: CircleCheckIcon,
    cancelled: CircleXIcon,
    processing: LoaderIcon
}
const statusColorMap = {
    upcomming: "text-muted-foreground",
    active: "text-warning-foreground",
    completed: "text-success-foreground",
    cancelled: "text-error-foreground",
    processing: "text-warning-foreground"
}

export const columns: ColumnDef<MeetingGetMany[number]>[] = [
    {
        accessorKey: "name",
        header: "Agent name",
        cell: ({ row }) => {

            return (
                <div className="flex flex-col gap-2 max-w-105 ">
                    <span
                        className="font-semibold capitalize"
                    >{row.original.name}</span>
                    <div className="flex items-center gap-3">

                        <CornerDownRightIcon className="size-3 text-muted-foreground" />
                        <span className="text-sm leading-relaxed line-clamp-2 capitalize">
                            {row.original.agent.name}
                        </span>
                    </div>
                    <GeneratedAvatar
                        seed={row.original.agent.name}
                        variant="botttsNeutral"
                        className="h-10 w-10 rounded-full shrink-0"
                    />
                    <span>
                        {row.original.startedAt ? format(row.original.startedAt, "MMM d") : ""}
                    </span>
                </div>
            )
        },
    },
    {
        accessorKey: "status",
        header: "status",
        cell: ({ row }) => {
            const status = row.original.status?.toLowerCase()
            const Icon = statusIconMap[row.original.status as keyof typeof statusIconMap] ?? ClockFadingIcon

            return (

                <Badge
                    variant={"outline"}
                    className={cn(`capitalize
                           [&>svg]:size-4 text-muted-foreground`,
                        statusColorMap[row.original.status as keyof typeof statusColorMap]
                    )}
                >
                    <Icon
                        className={cn(status === "processing" ? "animate-spin" : "")}
                    />
                    {status}
                </Badge>
            )
        }
    },
    {
        accessorKey: "duration",
        header: "duration",
        cell: ({ row }) => {
            const hours = Math.floor(row.original.duration / 3600)
            const minutes = Math.floor((row.original.duration % 3600) / 60)
            const seconds = row.original.duration % 60
            return (
                <Badge
                    variant={"outline"}
                    className={cn(`capitalize
                           [&>svg]:size-4 text-muted-foreground`,
                    )}
                >
                    <ClockFadingIcon
                        className="text-blue-700 "
                    />
                    {
                        row.original.duration ? formatDuration({
                            hours,
                            minutes,
                            seconds
                        }) : "00:00:00"}

                </Badge>
            )
        }
    },

]
