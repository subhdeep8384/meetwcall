"use client"
import React from "react"
import { useTRPC } from "@/trpc/client"
import { useSuspenseQuery } from "@tanstack/react-query"
import { DataTable } from "@/components/data-table/data-table"
import { columns } from "@/components/data-table/columns"
import { useAgentsFilters } from "@/hooks/agent/use-agents-flters"
import AgentViewPagination from "./pagination/agentViewPagination"
import { useRouter } from "next/navigation"

const AgentView = () => {
    const [filters, setFilters] = useAgentsFilters()
    const trpc = useTRPC()
    const inf = useSuspenseQuery(
        trpc.agents.getMany.queryOptions({
            ...filters
        })
    )
    const router = useRouter();
    return (
        <div className="flex-1 pb-4 px-4 md:px-1 flex-col gap-y-4 sm:overflow-hidden">
            <DataTable
                columns={columns}
                data={inf.data.items}
                onRowClick={(agent) => router.push(`agents/${agent.id}`)}
            />
            <AgentViewPagination
                page={filters.page}
                // setFilters={setFilters}
                totalPages={inf.data.totalPages}
                onPageChange={(page) => setFilters({ page })}
            />
        </div>
    )
}

export default AgentView
