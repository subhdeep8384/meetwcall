import React from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import {
    VideoIcon,
} from "lucide-react"


interface Props {
    meetingId: string;
}

const Active = ({
    meetingId,
}: Props) => {
    return (
        <div className='bg-white 
    justify-center rounded-3xl px-4 
    py-5 flex flex-col gap-y-8 
    items-center'>
            Meetign is active 
            <div className='flex flex-col-reverse lg:flex-row lg:justify-center items-center gap-2 w-full'>
                <Button
                    asChild
                    className=' lg:w-auto '>
                    <Link href={`${meetingId}/join`}>
                        <VideoIcon />
                        Join meeting
                    </Link>
                </Button>
            </div>
        </div>
    )
}

export default Active
