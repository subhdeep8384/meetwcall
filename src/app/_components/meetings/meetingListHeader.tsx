"use client"
import { Button } from '@/components/ui/button'
import { PlusIcon, } from 'lucide-react'
import NewMeetingDialogBox from './newMeetingDialogBox'
import { useState } from 'react'
import MeetingSearchFilter from './meetingSearchFilter'
import { StatusFilter } from './statusFilter'
import { AgentIdFilter } from './agentIdFilter'
import { useMeetingFilter } from '@/hooks/meeting/use-meeting-filter'
import { cn } from '@/lib/utils'


const MeetingListHeader = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [, setFilters] = useMeetingFilter()
    const [open, setOpen] = useState(true)
    return (
        <>
            <NewMeetingDialogBox
                open={isDialogOpen}
                onOpenChange={setIsDialogOpen}
            />
            <div className='py-4 px-4 md:px-8 flex flex-col gap-4 '>
                <div className='flex items-center justify-between'>
                    <h5 className='text-2xl font-bold'>My Meetings </h5>
                    <Button
                        onClick={() => { setIsDialogOpen(true) }}
                    >
                        <PlusIcon />
                        Create new meeting
                    </Button>
                </div>
            </div>

            <Button
                onClick={() => setOpen((value) => !value)}
                className={cn("sm:hidden", "w-25 h-10")}>
                {open ? "show Filters" : "hide Filters"}
            </Button >

            <div className={cn(open && 'hidden', 'sm:block')}>

                <div className="grid grid-cols-1 gap-4 p-5 md:grid-cols-3 lg:grid-cols-4">

                    <div className="md:col-span-1">
                        <MeetingSearchFilter />
                    </div>

                    <div className="flex flex-col gap-2 md:flex-row md:items-center">
                        <AgentIdFilter />
                        <StatusFilter />
                    </div>

                    <div className="md:col-span-1 flex md:justify-end">
                        <Button
                            className="w-full md:w-auto"
                            onClick={() => {
                                setFilters({
                                    search: "",
                                    agentId: "",
                                    status: undefined,
                                    page: 1
                                })
                            }}
                        >
                            Clear Filters
                        </Button>
                    </div>

                </div>
            </div>
        </>
    )
}

export default MeetingListHeader
