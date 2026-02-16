import React from 'react'
import ResponsiveDialog from '@/components/dialog'
import MeetingForm from './meetingForm';
import { useRouter } from 'next/navigation';


interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

const NewMeetingDialogBox = ({
    open,
    onOpenChange
}: Props) => {
    const router = useRouter()
    return (
        <ResponsiveDialog
            title='Create new meeting'
            description='This will create a new meeting'
            open={open} onOpenChange={onOpenChange}
        >
            <MeetingForm
                onSucess={(id) => {
                    onOpenChange(false)
                    router.push(`/meetings/${id}`)
                }}
                onCancel={() => onOpenChange(false)}
            />
        </ResponsiveDialog>
    )
}

export default NewMeetingDialogBox
