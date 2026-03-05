"use client"

import { useMeetingFilter } from "@/hooks/meeting/use-meeting-filter"
import { useTRPC } from "@/trpc/client"
import { useState } from "react"
import { MeetingCommandSelect } from "./meetingCommandSelect"
import { useQuery } from "@tanstack/react-query"
import GeneratedAvatar from "../dashboardComponents/generatedAvatar"


export const AgentIdFilter = () => {
    const [filters, setFilters] = useMeetingFilter()
    const trpc = useTRPC()


    const [agentSearch, setAgentSearch] = useState("")
    const { data } = useQuery(
        trpc.agents.getMany.queryOptions({
            pageSize: 100,
            search: agentSearch
        })
    )
    return (
        <>
            <MeetingCommandSelect
                className="h-9 "
                placeholder="Agent"
                onSelect={(value) => setFilters({ agentId: value })}
                onSearch={(value) => setAgentSearch(value)}
                value={filters.agentId ?? ""}
                options={(data?.items ?? []).map((agent) => {
                    return ({
                        id: agent.id,
                        value: agent.id,
                        children: (
                            <div className="flex items-center gap-x-4">
                                <GeneratedAvatar
                                    seed={agent.name}
                                    variant="botttsNeutral"
                                    className="border size-8"
                                />
                                <span>{agent.name}</span>
                            </div>
                        )
                    })
                })}
            />
        </>
    )
}