"use client"
import React from 'react'
import { useTRPC } from "@/trpc/client"
import { useSuspenseQuery } from "@tanstack/react-query"



const AgentView = () => {
    const trpc = useTRPC();
    const { data } = useSuspenseQuery(trpc.agents.getMany.queryOptions())
    return (
        <div>
            {JSON.stringify(data)}
        </div>
    )
}

export default AgentView
