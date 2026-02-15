import React from 'react'
import ResponsiveDialog from '@/components/dialog'


interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

const NewMeetingDialogBox = ({
    open,
    onOpenChange
}: Props) => {
    return (
        <ResponsiveDialog
            title='Create new meeting'
            description='This will create a new meeting'
            open={open} onOpenChange={onOpenChange}
        >
            TODO : responsive ness
        </ResponsiveDialog>
    )
}

export default NewMeetingDialogBox
