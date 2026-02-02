"use client"
import { Button } from '@/components/ui/button'
import { PlusIcon, XCircle } from 'lucide-react'
import React, { useState } from 'react'
import NewAgantDialogBox from './newAgentDialogBox'
import { useAgentsFilters } from '@/hooks/agent/use-agents-flters'
import AgentSearchFilter from './agentSearchFilter'
import { PAGE } from '@/defaults'

const ListAgents = () => {
    const [filters, setFilters] = useAgentsFilters();
    const [open, setOnOpen] = useState(false)
    const isAnyFilterApplied = !!filters.search

    const onClearFilters = () => {
        setFilters({
            search: "",
            page: PAGE
        })
    }
    return (
        <>
            <NewAgantDialogBox open={open} onOpenChange={setOnOpen} />
            <div className='py-4 px-4 md:px-8 flex flex-col gap-4 '>
                <div className='flex items-center justify-between'>
                    <h5 className='text-2xl font-bold'>My Agents</h5>
                    <Button
                        onClick={() => setOnOpen(val => !val)}
                    >
                        <PlusIcon />
                        Create new agent
                    </Button>
                </div>

                <div className='flex items-center gap-x-2 p-1 '>
                    <AgentSearchFilter />
                    {
                        isAnyFilterApplied && (
                            <Button
                                onClick={onClearFilters}
                                variant='ghost'
                                className='text-sm'
                            >
                                <XCircle />

                            </Button>
                        )
                    }
                </div>
            </div>
        </>
    )
}

export default ListAgents
