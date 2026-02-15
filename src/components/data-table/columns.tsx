"use client"

import GeneratedAvatar from "@/app/_components/dashboardComponents/generatedAvatar"
import { AgentGetOne } from "@/types/type"
import { ColumnDef } from "@tanstack/react-table"


export const columns: ColumnDef<AgentGetOne>[] = [
    {
        accessorKey: "name",
        header: "Agent name",
        cell: ({ row }) => {
            const { name, instructions } = row.original

            return (
                <div className="flex flex-col gap-2 max-w-105 ">

                    <div className="flex items-center gap-3">
                        <GeneratedAvatar
                            variant="botttsNeutral"
                            seed={name}
                            className="h-10 w-10 rounded-full shrink-0"
                        />

                        <p className="text-sm font-semibold text-foreground truncate">
                            {name}
                        </p>
                    </div>


                    {instructions && (
                        <div className="flex items-start gap-2 pl-12 text-muted-foreground">
                            {/* <CornerDownRight className="size-4 mt-0.5 shrink-0" /> */}
                            <span className="text-sm leading-relaxed line-clamp-2 capitalize">
                                {instructions}
                            </span>
                        </div>
                    )}
                </div>
            )
        },
    },
    {
        accessorKey: "meeting count",
        header: "Meeting count",
        cell: ({ row }) => {
            return <div className="flex items-center justify-end gap-2">
                <div className="flex h-12 w-12" >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25"><defs><style>.cls-1</style></defs><g id="meeting"><path className="cls-1" d="M22.5 3H21V2a1 1 0 0 0-1-1h-1a1 1 0 0 0-1 1v1h-4V2a1 1 0 0 0-1-1h-1a1 1 0 0 0-1 1v1H7V2a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v1H2.5A1.5 1.5 0 0 0 1 4.5v18A1.5 1.5 0 0 0 2.5 24h20a1.5 1.5 0 0 0 1.5-1.5v-18A1.5 1.5 0 0 0 22.5 3zM19 2h1v3h-1zm-7 0h1v3h-1zM5 2h1v3H5zM2.5 4H4v1a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1V4h4v1a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1V4h4v1a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1V4h1.5a.5.5 0 0 1 .5.5V8H2V4.5a.5.5 0 0 1 .5-.5zm20 19h-20a.5.5 0 0 1-.5-.5V9h21v13.5a.5.5 0 0 1-.5.5z" /><path className="cls-1" d="M12.5 17A3.5 3.5 0 1 0 9 13.5a3.5 3.5 0 0 0 3.5 3.5zm0-6a2.5 2.5 0 1 1-2.5 2.5 2.5 2.5 0 0 1 2.5-2.5zM15.45 18h-5.9A1.56 1.56 0 0 0 8 19.55v1.95a.5.5 0 0 0 1 0v-1.95a.55.55 0 0 1 .55-.55h5.9a.55.55 0 0 1 .55.55v1.95a.5.5 0 0 0 1 0v-1.95A1.56 1.56 0 0 0 15.45 18z" /></g></svg>
                </div>
                <p>{row.original?.meetingCount} {row.original.meetingCount == 1 ? "meeting" : "meetings"} </p>
            </div>
        }
    }
]
