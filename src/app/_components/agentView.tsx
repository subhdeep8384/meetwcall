"use client"
import React from "react"
import { useTRPC } from "@/trpc/client"
import { useSuspenseQuery } from "@tanstack/react-query"

const AgentView = () => {
    const trpc = useTRPC()
    const { data } = useSuspenseQuery(
        trpc.agents.getMany.queryOptions()
    )

    return (
        <div className="w-full px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl rounded-lg border bg-background p-4 shadow-sm">
                <pre className="max-h-[60vh] overflow-auto whitespace-pre-wrap  text-sm sm:text-base">
                    {JSON.stringify(data, null, 2)}
                </pre>
            </div>
        </div>
    )
}

export default AgentView
