import React from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import {
    VideoIcon,
    BanIcon
} from "lucide-react"


interface Props {
    meetingId: string;
    onCancelMeeting: () => void;
    isCancelling: boolean;
}

const Upcomming = ({
    meetingId,
    onCancelMeeting,
    isCancelling
}: Props) => {
    return (
        <div className='bg-white 
    justify-center rounded-3xl px-4 
    py-5 flex flex-col gap-y-8 
    items-center'>
            the meeting have not stated yet
            <div className='flex flex-col-reverse lg:flex-row lg:justify-center items-center gap-2 w-full'>
                <Button
                    onClick={onCancelMeeting}
                    disabled={isCancelling}
                    variant='destructive'
                >
                    <BanIcon />
                    Cancel meeting
                </Button>
                <Button
                    disabled={isCancelling}
                    asChild
                    className=' lg:w-auto '>
                    <Link href={'/meetings/create'}>
                        <VideoIcon />
                        Join meeting
                    </Link>
                </Button>
            </div>
        </div>
    )
}

export default Upcomming
