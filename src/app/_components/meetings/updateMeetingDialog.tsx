import React from 'react'
import ResponsiveDialog from '@/components/dialog'
import MeetingForm from './meetingForm';
import { MeetingGetOne } from '@/types/type';
interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    initialValues? : MeetingGetOne
}

const UpdateMeetingDialogBox = ({
    open,
    onOpenChange,
    initialValues ,
}: Props) => {
    return (
        <ResponsiveDialog
            title='update  meeting'
            description='This will update a new meeting'
            open={open} onOpenChange={onOpenChange}
        >
            <MeetingForm
                onSucess={() => {
                    onOpenChange(false)
                }}
                onCancel={() => onOpenChange(false)}
                initialValues={initialValues}
            />
        </ResponsiveDialog>
    )
}

export default UpdateMeetingDialogBox
