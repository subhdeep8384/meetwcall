"use client"
import { Button } from '@/components/ui/button'
import { PlusIcon, } from 'lucide-react'
import NewMeetingDialogBox from './newMeetingDialogBox'
import { useState } from 'react'


const MeetingListHeader = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false)
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

                <div className='flex items-center gap-x-2 p-1 '>


                </div>
            </div>
        </>
    )
}

export default MeetingListHeader
