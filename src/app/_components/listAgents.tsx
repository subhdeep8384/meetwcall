"use client"
import { Button } from '@/components/ui/button'
import { PlusIcon } from 'lucide-react'
import React, { useState } from 'react'
import NewAgantDialogBox from './newAgentDialogBox'

const ListAgents = () => {
    const [open, setOnOpen] = useState(false)
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
            </div>
        </>
    )
}

export default ListAgents
