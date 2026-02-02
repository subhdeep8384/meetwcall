import React from 'react'
import { SearchIcon } from "lucide-react"
import { Input } from '@/components/ui/input'
import { useAgentsFilters } from '@/hooks/agent/use-agents-flters'


const AgentSearchFilter = () => {

    const [filters, setFilters] = useAgentsFilters()
    return (
        <div className='relative px-5'>
            <Input
                placeholder='filter agents'
                className='h-9 bg-white w-50 pl-7 '
                value={filters.search}
                onChange={(e) => {
                    setFilters({
                        search: e.target.value
                    })
                }}
            />
            <SearchIcon
                className='size-4 absolute left-2 top-1/2 -translate-1/2 text-muted-foreground'
            />
        </div>
    )
}

export default AgentSearchFilter
