"use client"
import { Button } from '@/components/ui/button'
import { PlusIcon, } from 'lucide-react'
import NewMeetingDialogBox from './newMeetingDialogBox'
import { useState } from 'react'
import MeetingSearchFilter from './meetingSearchFilter'
import { StatusFilter } from './statusFilter'
import { AgentIdFilter } from './agentIdFilter'
import { useMeetingFilter } from '@/hooks/meeting/use-meeting-filter'


const MeetingListHeader = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [, setFilters] = useMeetingFilter()
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

            <div className='flex gap-12 p-5'>
                <div className='flex items-center gap-x-2 p-1 '>
                    <MeetingSearchFilter />
                </div>
                <div className='flex'>
                    <AgentIdFilter />
                    <StatusFilter />
                </div>
                <Button onClick={() => {
                    setFilters({
                        search: "",
                        agentId: "",
                        status: undefined,
                        page: 1
                    })
                }}>
                    clear filters
                </Button>
            </div>
        </>
    )
}

export default MeetingListHeader
